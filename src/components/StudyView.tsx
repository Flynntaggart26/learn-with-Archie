import { useMemo, useState, type ReactElement } from 'react';
import {
  curriculumNodes,
  getTopicById,
  getTopLevelTopics,
  getSubtopics,
  getSubjectsByLevel,
  getPrerequisites,
} from '../data/curriculum';
import type { ExamLevel, SubjectCategory, TopicNode } from '../types';
import {
  accuracyToQuality,
  formatReviewDate,
  getAllReviews,
  getMasteryDisplayPercent,
  getMasteryLabel,
  masteryColor,
  recordAttempt,
  recordReview,
} from '../lib/studyStore';
import { CLASS_ICONS } from '../lib/plannerStore';

interface StudyViewProps {
  onMascotState?: (state: 'idle' | 'focus' | 'success' | 'warning') => void;
}

interface QuizQuestion {
  prompt: string;
  options: string[];
  answerIndex: number;
}

// Lightweight per-topic question bank so the quiz can run fully offline.
const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  'ayt-turev': [
    {
      prompt: 'f(x) = x³ ise f\'(x) nedir?',
      options: ['3x²', 'x²', '3x', 'x³/3'],
      answerIndex: 0,
    },
    {
      prompt: 'Sabit sayının türevi kaçtır?',
      options: ['1', '0', 'Kendisi', 'Tanımsız'],
      answerIndex: 1,
    },
    {
      prompt: 'f(x) = 5x ise f\'(x) nedir?',
      options: ['0', '5', '5x', 'x'],
      answerIndex: 1,
    },
    {
      prompt: 'Türevin geometrik anlamı nedir?',
      options: ['Alan', 'Teğet doğrusunun eğimi', 'Hacim', 'Uzunluk'],
      answerIndex: 1,
    },
    {
      prompt: 'f(x) = x² + 2x ise f\'(2) kaçtır?',
      options: ['6', '4', '8', '2'],
      answerIndex: 0,
    },
  ],
  'ayt-integral': [
    {
      prompt: '∫x² dx ifadesi aşağıdakilerden hangisidir?',
      options: ['x³/3 + C', 'x³ + C', '2x + C', 'x + C'],
      answerIndex: 0,
    },
    {
      prompt: '∫1 dx ifadesi nedir?',
      options: ['x + C', '0', '1', 'ln(x) + C'],
      answerIndex: 0,
    },
    {
      prompt: 'Türevi f(x) olan fonksiyona ne denir?',
      options: ['İntegral', 'Limit', 'Türev', 'Belirsiz integral'],
      answerIndex: 3,
    },
    {
      prompt: 'Belirli integral hangi kavramı hesaplar?',
      options: ['Alan', 'Eğim', 'Hız', 'Türev'],
      answerIndex: 0,
    },
    {
      prompt: '∫(2x) dx ifadesi nedir?',
      options: ['x² + C', '2x² + C', 'x + C', '2 + C'],
      answerIndex: 0,
    },
  ],
  'ayt-polinomlar': [
    {
      prompt: 'P(x) = 2x + 3 ise P(1) kaçtır?',
      options: ['5', '4', '6', '3'],
      answerIndex: 0,
    },
    {
      prompt: 'Bir polinomun derecesi 3 ise en yüksek üssü kaçtır?',
      options: ['3', '2', '1', '4'],
      answerIndex: 0,
    },
    {
      prompt: 'P(x) = x² - 4 polinomunun kökleri nelerdir?',
      options: ['±2', '±4', '0 ve 2', '2 ve 4'],
      answerIndex: 0,
    },
    {
      prompt: 'P(x) polinomunda x yerine yazılan değer hangi kavramı verir?',
      options: ['Polinom değeri', 'Türev', 'İntegral', 'Limit'],
      answerIndex: 0,
    },
    {
      prompt: 'Kalan teoremi hangi konuyla ilgilidir?',
      options: ['Polinom bölme', 'İntegral', 'Trigonometri', 'Logaritma'],
      answerIndex: 0,
    },
  ],
  'tyt-fonksiyonlar': [
    {
      prompt: 'f(x) = 2x + 3 ise f(5) kaçtır?',
      options: ['13', '10', '15', '8'],
      answerIndex: 0,
    },
    {
      prompt: 'Hangisi bir fonksiyondur?',
      options: [
        'Her x için iki farklı değer döndüren',
        'Her x için tek değer döndüren',
        'Hiç değer döndürmeyen',
        'Sadece bir x için tanımlanan',
      ],
      answerIndex: 1,
    },
    {
      prompt: 'f(x) = x² ise f(-3) kaçtır?',
      options: ['9', '-9', '6', '3'],
      answerIndex: 0,
    },
    {
      prompt: 'Bileşik fonksiyonda (f∘g)(x) neyi ifade eder?',
      options: ['f(g(x))', 'g(f(x))', 'f(x)+g(x)', 'f(x)·g(x)'],
      answerIndex: 0,
    },
    {
      prompt: 'f(x) = 3x - 1 ise f⁻¹(x) nedir?',
      options: ['(x+1)/3', '3x+1', '(x-1)/3', 'x/3 - 1'],
      answerIndex: 0,
    },
  ],
};

const FALLBACK_QUESTIONS: QuizQuestion[] = [
  {
    prompt: 'Hangisi bir fonksiyondur?',
    options: [
      'Her x için iki değer döndüren',
      'Her x için tek değer döndüren',
      'Değer döndürmeyen',
      'Sadece bir x için tanımlanan',
    ],
    answerIndex: 1,
  },
  {
    prompt: 'Bir konunun ön koşulu tamamlanmadan o konuya geçilirse ne olur?',
    options: ['Zayıf kalınır', 'Her şey iyi gider', 'Konu kolaylaşır', 'Fark etmez'],
    answerIndex: 0,
  },
];

const QUALITIES = [
  { q: 0, label: 'Tamamen unuttum' },
  { q: 1, label: 'Zor hatırladım' },
  { q: 2, label: 'Kısmen hatırladım' },
  { q: 3, label: 'Hatırladım ama zorlandım' },
  { q: 4, label: 'İyi hatırladım' },
  { q: 5, label: 'Mükemmel hatırladım' },
];

// The 9 subjects the user requested for the bubble selector.
const STUDY_SUBJECTS: SubjectCategory[] = [
  'Matematik',
  'Edebiyat',
  'Tarih',
  'Coğrafya',
  'Fizik',
  'Kimya',
  'Biyoloji',
  'Din',
  'Felsefe',
];

function getQuestionsForTopic(topicId: string): QuizQuestion[] {
  return QUESTION_BANK[topicId] ?? FALLBACK_QUESTIONS;
}

function masteryMatrixData(): { tyt: TopicNode[]; ayt: TopicNode[] } {
  const tyt = curriculumNodes.filter((node) => node.level === 'TYT');
  const ayt = curriculumNodes.filter((node) => node.level === 'AYT');
  return { tyt, ayt };
}

/**
 * Builds a Duolingo-style learning path for a given main topic.
 * Returns nodes in topological order (prerequisites first) with their
 * depth level and the list of prerequisite topic IDs for edge drawing.
 */
function buildLearningPath(mainTopic: TopicNode): {
  nodes: TopicNode[];
  levels: number[];
} {
  const visited = new Set<string>();
  const ordered: TopicNode[] = [];
  const levels: number[] = [];

  function traverse(node: TopicNode, depth: number): void {
    if (visited.has(node.id)) {
      return;
    }
    visited.add(node.id);

    // Visit prerequisites first (depth-first)
    const prereqs = getPrerequisites(node.id);
    for (const prereq of prereqs) {
      traverse(prereq, depth + 1);
    }

    ordered.push(node);
    levels.push(depth);
  }

  traverse(mainTopic, 0);

  return { nodes: ordered, levels };
}

export function StudyView({ onMascotState }: StudyViewProps): ReactElement {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('ayt-turev');
  const [level, setLevel] = useState<ExamLevel>('AYT');
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | null>(
    null,
  );
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [selectedMainTopic, setSelectedMainTopic] = useState<TopicNode | null>(
    null,
  );
  const [selectedSubtopic, setSelectedSubtopic] = useState<TopicNode | null>(
    null,
  );
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<'setup' | 'quiz' | 'result'>('setup');
  const [suggestedQuality, setSuggestedQuality] = useState(0);
  const [reviewResult, setReviewResult] = useState<{
    date: string;
    intervalDays: number;
    quality: number;
  } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const matrix = useMemo(masteryMatrixData, []);
  const reviews = useMemo(() => getAllReviews(), [refreshKey]);

  const activeTopic = getTopicById(selectedTopicId);
  const activeLevel = activeTopic?.level ?? level;

  const levelTopics = useMemo(
    () => curriculumNodes.filter((node) => node.level === level),
    [level],
  );

  // Subjects available for the current level
  const availableSubjects = useMemo(
    () => getSubjectsByLevel(level),
    [level],
  );

  // Main topics for the selected subject at the current level
  const mainTopics = useMemo(() => {
    if (!selectedSubject) {
      return [];
    }
    return getTopLevelTopics(selectedSubject, level);
  }, [selectedSubject, level]);

  // Subtopics for the selected main topic
  const subtopics = useMemo(() => {
    if (!selectedMainTopic) {
      return [];
    }
    return getSubtopics(selectedMainTopic.id);
  }, [selectedMainTopic]);

  // Build the learning path when a main topic is selected
  const learningPath = useMemo(() => {
    if (!selectedMainTopic) {
      return null;
    }
    return buildLearningPath(selectedMainTopic);
  }, [selectedMainTopic]);

  const startQuiz = (topicId?: string): void => {
    const id = topicId ?? selectedTopicId;
    onMascotState?.('focus');
    setSelectedTopicId(id);
    setQuestions(getQuestionsForTopic(id));
    setCurrentIndex(0);
    setSelectedOption(null);
    setCorrectCount(0);
    setReviewResult(null);
    setPhase('quiz');
  };

  const chooseTopic = (topicId: string): void => {
    const node = getTopicById(topicId);
    setSelectedTopicId(topicId);
    if (node) {
      setLevel(node.level);
    }
  };

  const selectOption = (index: number): void => {
    if (selectedOption !== null) {
      return;
    }
    setSelectedOption(index);
    if (index === questions[currentIndex].answerIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const nextQuestion = (): void => {
    if (currentIndex + 1 >= questions.length) {
      finishQuiz();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
  };

  const finishQuiz = (): void => {
    const total = questions.length;
    const accuracy = Math.round((correctCount / total) * 100);
    // Persist the attempt for the mastery matrix.
    recordAttempt(selectedTopicId, correctCount >= total / 2, accuracy);
    setSuggestedQuality(accuracyToQuality(accuracy));
    // Refresh mastery matrix so it reflects the new attempt immediately.
    setRefreshKey((v) => v + 1);
    setPhase('result');
  };

  const submitQuality = (quality: number): void => {
    const result = recordReview(selectedTopicId, quality);
    setReviewResult({
      date: result.nextReviewDate,
      intervalDays: result.intervalDays,
      quality: result.quality,
    });
    onMascotState?.('success');
    setRefreshKey((v) => v + 1);
  };

  // Handle subject bubble click
  const handleSubjectClick = (subject: SubjectCategory): void => {
    setSelectedSubject(subject);
    setShowTopicSelector(true);
    setSelectedMainTopic(null);
    setSelectedSubtopic(null);
  };

  // Handle main topic selection
  const handleMainTopicClick = (topic: TopicNode): void => {
    setSelectedMainTopic(topic);
    setSelectedSubtopic(null);
  };

  // Handle subtopic selection
  const handleSubtopicClick = (topic: TopicNode): void => {
    setSelectedSubtopic(topic);
    setSelectedTopicId(topic.id);
    setLevel(topic.level);
  };

  // Start quiz on the selected subtopic (or main topic if no subtopic)
  const startQuizFromTree = (): void => {
    const topicToQuiz = selectedSubtopic ?? selectedMainTopic;
    if (!topicToQuiz) {
      return;
    }
    startQuiz(topicToQuiz.id);
  };

  const renderSetup = (): ReactElement => (
    <div className="study-panel">
      <div className="study-panel-title">📚 Konu Seç ve Quiz'e Başla</div>

      {/* Subject bubbles - shown when a subject is selected */}
      {selectedSubject && (
        <div className="study-subject-bubble-bar">
          <span className="study-subject-bubble-label">Seçilen Ders:</span>
          <span className="study-subject-bubble-selected">
            {CLASS_ICONS[selectedSubject]} {selectedSubject}
          </span>
          <button
            type="button"
            className="study-topic-select-btn"
            onClick={() => setShowTopicSelector(!showTopicSelector)}
          >
            {showTopicSelector ? '🔼 Gizle' : '🔽 Konuları Göster'}
          </button>
        </div>
      )}

      {/* Main topic selection - bubble style */}
      {selectedSubject && showTopicSelector && (
        <div className="study-topic-tree">
          <div className="study-topic-tree-title">
            {CLASS_ICONS[selectedSubject]} {selectedSubject} - Büyük Konular
          </div>
          <div className="study-main-topics-bubbles">
            {mainTopics.map((topic) => {
              const percent = getMasteryDisplayPercent(topic.id);
              const color = masteryColor(percent);
              const isSelected = selectedMainTopic?.id === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  className={`study-main-topic-bubble ${isSelected ? 'selected' : ''}`}
                  style={{
                    '--topic-color': color,
                  } as React.CSSProperties}
                  onClick={() => handleMainTopicClick(topic)}
                >
                  <span className="study-main-topic-bubble-name">{topic.name}</span>
                  {topic.estimatedMinutes && (
                    <span className="study-main-topic-bubble-meta">
                      ⏱️ {topic.estimatedMinutes} dk
                    </span>
                  )}
                  <span
                    className="study-main-topic-bubble-mastery"
                    style={{ color, borderColor: color }}
                  >
                    {getMasteryLabel(percent)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subtopic selection - bubble style */}
          {selectedMainTopic && (
            <div className="study-subtopic-section">
              <div className="study-subtopic-title">
                {selectedMainTopic.name} - Alt Başlıklar
              </div>
              <div className="study-subtopics-bubbles">
                {subtopics.length > 0 ? (
                  subtopics.map((sub) => {
                    const percent = getMasteryDisplayPercent(sub.id);
                    const color = masteryColor(percent);
                    const isSelected = selectedSubtopic?.id === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        className={`study-subtopic-bubble ${isSelected ? 'selected' : ''}`}
                        style={{
                          '--subtopic-color': color,
                        } as React.CSSProperties}
                        onClick={() => handleSubtopicClick(sub)}
                      >
                        <span className="study-subtopic-bubble-name">{sub.name}</span>
                        <span
                          className="study-subtopic-bubble-mastery"
                          style={{ color, borderColor: color }}
                        >
                          {getMasteryLabel(percent)}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="study-empty-subtopics">
                    Bu konunun alt başlığı bulunmamaktadır.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Start quiz button */}
          {(selectedSubtopic || selectedMainTopic) && (
            <button
              type="button"
              className="study-start-btn"
              onClick={startQuizFromTree}
            >
              🎯 {selectedSubtopic
                ? `${selectedSubtopic.name} - Quiz'i Başlat`
                : `${selectedMainTopic?.name} - Quiz'i Başlat`}
            </button>
          )}
        </div>
      )}

      {/* Duolingo-style learning path roadmap */}
      {selectedMainTopic && learningPath && (
        <div className="study-roadmap">
          <div className="study-roadmap-title">
            🗺️ {selectedMainTopic.name} - Yol Haritası
          </div>
          <div className="study-roadmap-subtitle">
            Konuyu öğrenmek için sırayla ilerle. Bağlantılar ön koşulları gösterir.
          </div>
          <div className="study-roadmap-graph">
            {renderRoadmap(learningPath)}
          </div>
        </div>
      )}

      {/* Fallback: show all topics if no subject is selected */}
      {!selectedSubject && (
        <>
          <div className="study-topic-grid">
            {levelTopics.map((topic) => {
              const percent = getMasteryDisplayPercent(topic.id);
              const color = masteryColor(percent);
              return (
                <button
                  key={topic.id}
                  type="button"
                  className={`study-topic-card ${
                    selectedTopicId === topic.id ? 'selected' : ''
                  }`}
                  onClick={() => chooseTopic(topic.id)}
                >
                  <span className="study-topic-name">{topic.name}</span>
                  <span
                    className="study-topic-mastery"
                    style={{ color, borderColor: color }}
                  >
                    {getMasteryLabel(percent)}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="study-start-btn"
            onClick={() => startQuiz()}
          >
            🎯 Quiz'i Başlat
          </button>
        </>
      )}
    </div>
  );

  // Render the Duolingo-style roadmap with nodes and connecting lines
  function renderRoadmap(path: { nodes: TopicNode[]; levels: number[] }): ReactElement {
    const { nodes, levels } = path;
    const maxLevel = Math.max(...levels, 0);

    // Group nodes by level for vertical column layout
    const levelGroups: TopicNode[][] = [];
    for (let i = 0; i <= maxLevel; i++) {
      levelGroups.push([]);
    }
    nodes.forEach((node, idx) => {
      const lvl = levels[idx];
      levelGroups[lvl].push(node);
    });

    // Build a map of node id -> {x, y} positions for SVG line drawing
    const nodePositions = new Map<string, { x: number; y: number }>();

    // Calculate completion stats
    const completedCount = nodes.filter(n => getMasteryDisplayPercent(n.id) >= 70).length;
    const totalCount = nodes.length;
    const completionPercent = Math.round((completedCount / totalCount) * 100);

    return (
      <div className="study-roadmap-container">
        {/* Progress Header */}
        <div className="study-roadmap-progress-header">
          <div className="study-roadmap-progress-bar">
            <div
              className="study-roadmap-progress-fill"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <div className="study-roadmap-progress-stats">
            <span className="study-roadmap-completed">{completedCount}/{totalCount} konu tamamlandı</span>
            <span className="study-roadmap-percent">{completionPercent}%</span>
          </div>
        </div>

        {/* Node columns with SVG overlay */}
        <div className="study-roadmap-wrapper">
          {/* SVG for connecting lines */}
          <svg
            className="study-roadmap-svg"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          >
            {nodes.map((node, idx) => {
              const lvl = levels[idx];
              const group = levelGroups[lvl];
              const groupIdx = group.indexOf(node);
              const x = lvl * (100 / Math.max(maxLevel, 1));
              const y =
                group.length > 1
                  ? (groupIdx / (group.length - 1)) * 100
                  : 50;
              nodePositions.set(node.id, { x, y });
              return null;
            })}

            {/* Draw edges from prerequisites to dependents */}
            {nodes.map((node) => {
              const prereqs = getPrerequisites(node.id);
              return prereqs.map((prereq) => {
                const from = nodePositions.get(prereq.id);
                const to = nodePositions.get(node.id);
                if (!from || !to) {
                  return null;
                }
                const prereqPercent = getMasteryDisplayPercent(prereq.id);
                const isPrereqComplete = prereqPercent >= 70;
                return (
                  <line
                    key={`${prereq.id}-${node.id}`}
                    x1={`${from.x}%`}
                    y1={`${from.y}%`}
                    x2={`${to.x}%`}
                    y2={`${to.y}%`}
                    className={`study-roadmap-edge ${isPrereqComplete ? 'complete' : ''}`}
                  />
                );
              });
            })}
          </svg>

          {/* Node columns */}
          <div className="study-roadmap-columns">
            {levelGroups.map((group, lvl) => (
              <div
                key={lvl}
                className="study-roadmap-column"
                style={{
                  '--column-index': lvl,
                } as React.CSSProperties}
              >
                <div className="study-roadmap-column-label">
                  {lvl === 0 ? 'Başlangıç' : lvl === 1 ? 'Temel' : lvl === 2 ? 'İleri' : `Seviye ${lvl + 1}`}
                </div>
                {group.map((node) => {
                  const percent = getMasteryDisplayPercent(node.id);
                  const color = masteryColor(percent);
                  const isSolved = percent > 0;
                  const isMastered = percent >= 70;
                  const isSelected = selectedTopicId === node.id;
                  const prereqs = getPrerequisites(node.id);
                  const prereqsMet = prereqs.every(p => getMasteryDisplayPercent(p.id) >= 70);
                  const isLocked = !isSolved && prereqs.length > 0 && !prereqsMet;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      className={`study-roadmap-node ${isSelected ? 'selected' : ''} ${isMastered ? 'mastered' : ''} ${isLocked ? 'locked' : ''}`}
                      style={{
                        '--node-color': color,
                        '--node-text-color': isSolved ? 'var(--canvas)' : 'var(--text)',
                      } as React.CSSProperties}
                      onClick={() => {
                        if (!isLocked) {
                          setSelectedTopicId(node.id);
                          setSelectedSubtopic(node);
                          setLevel(node.level);
                        }
                      }}
                      disabled={isLocked}
                      title={isLocked ? `Ön koşul tamamlanmalı: ${prereqs.map(p => p.name).join(', ')}` : ''}
                    >
                      <div className="study-roadmap-node-icon">
                        {isMastered ? '✓' : isSolved ? `${percent}%` : isLocked ? '🔒' : '○'}
                      </div>
                      <span className="study-roadmap-node-name">{node.name}</span>
                      {isMastered && <span className="study-roadmap-node-badge">Mast. oldu</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderQuiz = (): ReactElement => {
    const question = questions[currentIndex];
    return (
      <div className="study-panel">
        <div className="study-progress">
          <span className="study-progress-text">
            Soru {currentIndex + 1} / {questions.length}
          </span>
          <div className="study-progress-bar">
            <div
              className="study-progress-fill"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className="study-question">{question.prompt}</div>
        <div className="study-options">
          {question.options.map((option, index) => {
            let className = 'study-option';
            if (selectedOption !== null) {
              if (index === question.answerIndex) {
                className += ' correct';
              } else if (index === selectedOption) {
                className += ' wrong';
              } else {
                className += ' dimmed';
              }
            }
            return (
              <button
                key={option}
                type="button"
                className={className}
                onClick={() => selectOption(index)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            );
          })}
        </div>
        {activeTopic && (
          <div className="study-topic-context">
            {activeTopic.subject} • {activeTopic.name}
          </div>
        )}
        {selectedOption !== null && (
          <button
            type="button"
            className="study-next-btn"
            onClick={nextQuestion}
          >
            {currentIndex + 1 >= questions.length
              ? '🏁 Sonucu Gör'
              : '▶️ Sonraki Soru'}
          </button>
        )}
      </div>
    );
  };

  const renderResult = (): ReactElement => {
    const accuracy = Math.round((correctCount / questions.length) * 100);
    const topicName = activeTopic ? activeTopic.name : selectedTopicId;

    return (
      <div className="study-panel study-result">
        <div className="study-result-icon">
          {accuracy >= 70 ? '🏆' : accuracy >= 40 ? '👍' : '📚'}
        </div>
        <h3 className="study-result-title">
          {accuracy >= 70
            ? 'Harikasın!'
            : accuracy >= 40
              ? 'İyi gidiyor!'
              : 'Tekrar etmelisin!'}
        </h3>
        <p className="study-result-text">
          {topicName} konusunda {correctCount}/{questions.length} doğru yaptın
          ({accuracy}%).
        </p>

        {reviewResult ? (
          <div className="study-review-summary">
            <div className="study-review-badge">📅 SM-2 Tekrar Planı</div>
            <p className="study-review-date">
              Bu konuyu <strong>{formatReviewDate(reviewResult.date)}</strong>{' '}
              tarihinde tekrar etmelisin.
            </p>
            <p className="study-review-meta">
              Kalite: {reviewResult.quality}/5 • Aralık:{' '}
              {reviewResult.intervalDays} gün
            </p>
          </div>
        ) : (
          <>
            <div className="quality-label">
              Bu konuyu ne kadar iyi hatırladığını değerlendir (SM-2 kalite,
              önerilen: {suggestedQuality}):
            </div>
            <div className="quality-options">
              {QUALITIES.map(({ q, label }) => (
                <button
                  key={q}
                  type="button"
                  className={`quality-option ${
                    q === suggestedQuality ? 'suggested' : ''
                  }`}
                  onClick={() => submitQuality(q)}
                >
                  <span className="quality-value">{q}</span>
                  <span className="quality-label">{label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <button
          type="button"
          className="study-start-btn"
          onClick={() => startQuiz(selectedTopicId)}
        >
          🔄 Tekrar Çöz
        </button>
        <button
          type="button"
          className="study-new-btn"
          onClick={() => {
            setPhase('setup');
            setSelectedSubject(null);
            setShowTopicSelector(false);
            setSelectedMainTopic(null);
            setSelectedSubtopic(null);
          }}
        >
          Konu Seç
        </button>
      </div>
    );
  };

  const renderScheduler = (): ReactElement => (
    <div className="study-panel">
      <div className="study-panel-title">📅 Yaklaşan Tekrarlar (SM-2)</div>
      {reviews.length === 0 ? (
        <p className="study-empty">
          Henüz tekrar planın yok. Bir quiz çözüp kalite derecelendirmesi yap,
          SM-2 sana tam tekrar tarihini söylesin.
        </p>
      ) : (
        <div className="study-scheduler-list">
          {reviews
            .slice()
            .sort(
              (a, b) =>
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
            )
            .map((card) => {
              const node = getTopicById(card.topicId);
              const days = Math.ceil(
                (new Date(card.dueDate).getTime() - Date.now()) /
                  (24 * 60 * 60 * 1000),
              );
              const dueLabel =
                days <= 0
                  ? 'Bugün!'
                  : days === 1
                    ? 'Yarın'
                    : `${days} gün sonra`;
              return (
                <div key={card.topicId} className="study-scheduler-item">
                  <div className="study-scheduler-info">
                    <span className="study-scheduler-name">
                      {node ? node.name : card.topicId}
                    </span>
                    <span className="study-scheduler-date">
                      {formatReviewDate(card.dueDate)}
                    </span>
                  </div>
                  <span
                    className={`study-scheduler-badge ${
                      days <= 1 ? 'due' : ''
                    }`}
                  >
                    {dueLabel}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );

  const renderMatrix = (): ReactElement => (
    <div className="study-panel">
      <div className="study-panel-title">🗺️ Konu Ustalık Matrisi</div>
      <div className="mastery-legend">
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#ff5864' }} />
          0-39% Zayıf
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#ffc800' }} />
          40-69% Gelişiyor
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#4ade80' }} />
          70-100% Güçlü
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#1f3a5f' }} />
          Çözülmedi
        </span>
      </div>
      {(['TYT', 'AYT'] as ExamLevel[]).map((lv) => (
        <div key={lv} className="mastery-section">
          <div className="mastery-section-title">{lv} Konuları</div>
          <div className="mastery-row">
            {matrix[lv === 'TYT' ? 'tyt' : 'ayt'].map((node) => {
              const percent = getMasteryDisplayPercent(node.id);
              const isSolved = percent > 0;
              const color = isSolved ? masteryColor(percent) : '#1f3a5f';
              const textColor = isSolved ? 'var(--canvas)' : '#f8fafc';
              return (
                <button
                  key={node.id}
                  type="button"
                  className="mastery-cell"
                  style={{ background: color, color: textColor }}
                  title={`${node.name}: ${isSolved ? `${percent}%` : 'Çözülmedi'}`}
                  onClick={() => {
                    chooseTopic(node.id);
                    setPhase('setup');
                    setSelectedSubject(null);
                    setShowTopicSelector(false);
                    setSelectedMainTopic(null);
                    setSelectedSubtopic(null);
                  }}
                >
                  <span className="mastery-cell-name">{node.name}</span>
                  <span className="mastery-cell-pct">
                    {isSolved ? `${percent}%` : '—'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  // Render subject bubbles for the right sidebar
  const renderSubjectBubbles = (): ReactElement => (
    <div className="study-subject-sidebar">
      <div className="study-subject-sidebar-title">📖 Dersler</div>
      <div className="study-subject-bubbles">
        {STUDY_SUBJECTS.map((subject) => {
          const isSelected = selectedSubject === subject;
          const hasTopics = availableSubjects.includes(subject);
          return (
            <button
              key={subject}
              type="button"
              className={`study-subject-bubble ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSubjectClick(subject)}
              disabled={!hasTopics}
            >
              <span className="study-subject-bubble-icon">
                {CLASS_ICONS[subject]}
              </span>
              <span className="study-subject-bubble-name">{subject}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="study-view">
      {/* TYT/AYT selection at the top */}
      <div className="study-level-bar">
        <div className="study-level-tabs">
          {(['TYT', 'AYT'] as ExamLevel[]).map((lv) => (
            <button
              key={lv}
              type="button"
              className={`study-level-tab ${level === lv ? 'active' : ''}`}
              onClick={() => {
                setLevel(lv);
                setSelectedSubject(null);
                setShowTopicSelector(false);
                setSelectedMainTopic(null);
                setSelectedSubtopic(null);
                setPhase('setup');
              }}
            >
              {lv}
            </button>
          ))}
        </div>
        <div className="study-active-topic">
          Aktif konu: {activeTopic ? `${activeTopic.subject} • ${activeTopic.name} (${activeLevel})` : '—'}
        </div>
      </div>

      <div className="study-view-grid">
        {/* Main content (left) */}
        <div className="study-view-main">
          <div className="study-view-header">
            <h2>Çalışma & Tekrar</h2>
            <span className="study-view-sub">
              {selectedSubject
                ? `${selectedSubject} dersine göre konular gösteriliyor`
                : 'Bir ders seçin veya yol haritasından konu seçin'}
            </span>
          </div>
          {phase === 'setup' && renderSetup()}
          {phase === 'quiz' && renderQuiz()}
          {phase === 'result' && renderResult()}
        </div>

        {/* Subject bubbles (middle, right side of dashboard) */}
        <div className="study-view-subjects">
          {renderSubjectBubbles()}
        </div>

        {/* Roadmap (right) */}
        <div className="study-view-side">
          {renderScheduler()}
          {renderMatrix()}
        </div>
      </div>
    </div>
  );
}
