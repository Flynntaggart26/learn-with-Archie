import { useMemo, useState, type ReactElement } from 'react';
import {
  getSubjectsByLevel,
  getTopLevelTopics,
  getSubtopics,
} from '../data/curriculum';
import type { ExamLevel, SubjectCategory, TopicNode } from '../types';
import { getMasteryDisplayPercent, masteryColor } from '../lib/studyStore';
import { CLASS_ICONS } from '../lib/plannerStore';

/** All subjects the user can pick from, with emoji labels. */
const ALL_SUBJECTS: { id: SubjectCategory; label: string }[] = [
  { id: 'Matematik', label: 'Matematik' },
  { id: 'Edebiyat', label: 'Edebiyat' },
  { id: 'Fizik', label: 'Fizik' },
  { id: 'Kimya', label: 'Kimya' },
  { id: 'Biyoloji', label: 'Biyoloji' },
  { id: 'Tarih', label: 'Tarih' },
  { id: 'Coğrafya', label: 'Coğrafya' },
  { id: 'Felsefe', label: 'Felsefe' },
  { id: 'Din', label: 'Din Kültürü' },
  { id: 'Geometri', label: 'Geometri' },
];

/** Difficulty label in Turkish. */
function difficultyLabel(d: number): string {
  if (d <= 1) return 'Kolay';
  if (d <= 2) return 'Orta';
  if (d <= 3) return 'Zor';
  if (d <= 4) return 'Çok Zor';
  return 'Uzman';
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RoadmapView(): ReactElement {
  // --- Selection state ---
  const [level, setLevel] = useState<ExamLevel>('TYT');
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | null>(null);
  const [selectedMainTopic, setSelectedMainTopic] = useState<TopicNode | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<TopicNode | null>(null);

  // --- Derived data ---

  /** Subjects that actually have topics at the current level. */
  const availableSubjects = useMemo(() => {
    const atLevel = getSubjectsByLevel(level);
    return ALL_SUBJECTS.filter((s) => atLevel.includes(s.id));
  }, [level]);

  /** Top-level topics for the selected subject + level. */
  const mainTopics = useMemo(() => {
    if (!selectedSubject) return [];
    return getTopLevelTopics(selectedSubject, level);
  }, [selectedSubject, level]);

  /** Subtopics of the selected main topic. */
  const subtopics = useMemo(() => {
    if (!selectedMainTopic) return [];
    return getSubtopics(selectedMainTopic.id);
  }, [selectedMainTopic]);

  /** The path nodes. Shows ALL subtopics when a main topic is selected,
   *  or just the main topic itself if it has no subtopics. */
  const pathNodes = useMemo(() => {
    if (!selectedMainTopic) return [];
    if (subtopics.length === 0) {
      return [selectedMainTopic];
    }
    return subtopics;
  }, [selectedMainTopic, subtopics]);

  // --- Reset helpers ---

  const resetSubject = (): void => {
    setSelectedSubject(null);
    setSelectedMainTopic(null);
    setSelectedSubtopic(null);
  };
  const resetMainTopic = (): void => {
    setSelectedMainTopic(null);
    setSelectedSubtopic(null);
  };

  // -------------------------------------------------------
  // Render helpers
  // -------------------------------------------------------

  /** Step 1 – TYT / AYT segmented control */
  const renderLevelSelector = (): ReactElement => (
    <div className="roadmap-section">
      <div className="roadmap-section-label">Seviye Seç</div>
      <div className="roadmap-level-tabs">
        {(['TYT', 'AYT'] as ExamLevel[]).map((lv) => (
          <button
            key={lv}
            type="button"
            className={`roadmap-level-tab ${level === lv ? 'active' : ''}`}
            onClick={() => {
              setLevel(lv);
              resetSubject();
            }}
          >
            {lv}
          </button>
        ))}
      </div>
    </div>
  );

  /** Step 2 – Ders Seç */
  const renderDersSec = (): ReactElement => (
    <div className="roadmap-section">
      <div className="roadmap-section-label">
        <span className="roadmap-section-num">1</span>
        Ders Seç
      </div>
      <div className="roadmap-bubbles">
        {availableSubjects.map((s) => {
          const isActive = selectedSubject === s.id;
          return (
            <button
              key={s.id}
              type="button"
              className={`roadmap-bubble ${isActive ? 'selected' : ''}`}
              onClick={() => {
                setSelectedSubject(s.id);
                resetMainTopic();
              }}
            >
              <span className="roadmap-bubble-emoji">
                {CLASS_ICONS[s.id]}
              </span>
              <span className="roadmap-bubble-name">{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  /** Step 3 – Konu Seç */
  const renderKonuSec = (): ReactElement | null => {
    if (!selectedSubject) return null;
    return (
      <div className="roadmap-section">
        <div className="roadmap-section-label">
          <span className="roadmap-section-num">2</span>
          Konu Seç
        </div>
        {mainTopics.length === 0 ? (
          <div className="roadmap-empty-box">
            Bu ders için konu bulunamadı.
          </div>
        ) : (
          <div className="roadmap-bubbles">
            {mainTopics.map((t) => {
              const pct = getMasteryDisplayPercent(t.id);
              const color = masteryColor(pct);
              const isActive = selectedMainTopic?.id === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`roadmap-bubble roadmap-bubble-topic ${isActive ? 'selected' : ''}`}
                  style={{ '--bubble-color': color } as React.CSSProperties}
                  onClick={() => {
                    setSelectedMainTopic(t);
                    setSelectedSubtopic(null);
                  }}
                >
                  <span className="roadmap-bubble-name">{t.name}</span>
                  <span
                    className="roadmap-bubble-mastery"
                    style={{ color, borderColor: color }}
                  >
                    {pct > 0 ? `${pct}%` : '—'}
                  </span>
                  <span className="roadmap-bubble-meta">
                    ⏱ {t.estimatedMinutes} dk · {difficultyLabel(t.difficulty)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  /** Step 4 – Alt Başlık Seç */
  const renderAltBaslikSec = (): ReactElement | null => {
    if (!selectedMainTopic) return null;
    return (
      <div className="roadmap-section">
        <div className="roadmap-section-label">
          <span className="roadmap-section-num">3</span>
          Alt Başlık Seç
        </div>
        {subtopics.length === 0 ? (
          <div className="roadmap-empty-box">
            Bu konunun alt başlığı bulunmamaktadır.
          </div>
        ) : (
          <div className="roadmap-bubbles">
            {subtopics.map((s) => {
              const pct = getMasteryDisplayPercent(s.id);
              const color = masteryColor(pct);
              const isActive = selectedSubtopic?.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`roadmap-bubble roadmap-bubble-sub ${isActive ? 'selected' : ''}`}
                  style={{ '--bubble-color': color } as React.CSSProperties}
                  onClick={() => setSelectedSubtopic(s)}
                >
                  <span className="roadmap-bubble-name">{s.name}</span>
                  <span
                    className="roadmap-bubble-mastery"
                    style={{ color, borderColor: color }}
                  >
                    {pct > 0 ? `${pct}%` : '—'}
                  </span>
                  <span className="roadmap-bubble-meta">
                    ⏱ {s.estimatedMinutes} dk · {difficultyLabel(s.difficulty)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  /** Screenshot-style two-column roadmap with central spine */
  const renderRoadmapPath = (): ReactElement | null => {
    if (pathNodes.length === 0) return null;

    const cardFor = (node: TopicNode): ReactElement => {
      const pct = getMasteryDisplayPercent(node.id);
      const isMastered = pct >= 70;
      const isStarted = pct > 0;
      const isWeak = pct > 0 && pct < 40;
      const state = isMastered ? 'done' : isStarted ? 'active' : 'locked';
      const pill = isMastered ? 'Tamamlandı' : isStarted ? 'Devam Ediyor' : 'Kilitli 🔒';
      const bar = state === 'locked' ? 0 : Math.max(pct, isMastered ? 100 : pct);
      return (
        <button
          key={node.id}
          type="button"
          className={`rm-card ${state}`}
          onClick={() => setSelectedSubtopic(node)}
          title={node.name}
        >
          <div className="rm-card-top">
            <span className="rm-ico">{CLASS_ICONS[node.subject] ?? '📚'}</span>
            <span className="rm-name">{node.name}</span>
            <span className="rm-pill">{pill}</span>
          </div>
          <div className="rm-bar"><i style={{ width: `${bar}%` }} /></div>
          <div className="rm-foot">
            <span>Test Bankası • ⏱ {node.estimatedMinutes} dk</span>
            <span className="rm-foot-right">
              {isMastered ? `${pct}/100` : `1/${pathNodes.length}`}
              {isWeak ? <b className="rm-dot-sm wrong">✕</b> : isMastered ? <b className="rm-dot-sm done">●</b> : <b className="rm-dot-sm missing">●</b>}
            </span>
          </div>
        </button>
      );
    };

    const rows: TopicNode[][] = [];
    for (let i = 0; i < pathNodes.length; i += 2) {
      rows.push(pathNodes.slice(i, i + 2));
    }

    return (
      <div className="rm-wrap">
        <div className="rm-legend">
          <span><i className="rm-lg done">✓</i>Tamamlandı</span>
          <span><i className="rm-lg active">●</i>Devam Ediyor</span>
          <span><i className="rm-lg locked">●</i>Kilitli</span>
          <span><i className="rm-lg missing">●</i>Eksik</span>
          <span><i className="rm-lg wrong">✕</i>Yanlış</span>
        </div>
        <div className="rm-flow">
          {rows.map((pair, r) => {
            const leftPct = getMasteryDisplayPercent(pair[0].id);
            const spineDone = leftPct >= 70;
            const spineActive = leftPct > 0 && !spineDone;
            return (
              <div key={r} className="rm-row">
                <div className="rm-cell">{cardFor(pair[0])}</div>
                <div className="rm-spine">
                  <span className={`rm-dot ${spineDone ? 'done' : spineActive ? 'active' : 'locked'}`}>
                    {spineDone ? '✓' : '›'}
                  </span>
                </div>
                <div className="rm-cell">{pair[1] ? cardFor(pair[1]) : null}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // -------------------------------------------------------
  // Main render
  // -------------------------------------------------------

  return (
    <div className="roadmap-view">
      <div className="roadmap-container rm-bg">
        {/* Page header — matches screenshot */}
        <div className="rm-header">
          <span className="rm-header-icon">🗺️</span>
          <div>
            <div className="rm-header-title">
              Yol Haritası{selectedSubject ? ` - ${selectedSubject}` : ''} ({level})
            </div>
            <div className="rm-header-sub">
              {level} {selectedSubject ?? 'Matematik'} Başarısına Adım Adım Yolculuğunuz - Konu ve İlerleme Takibi
            </div>
          </div>
        </div>

        {/* Selection steps */}
        {renderLevelSelector()}
        {renderDersSec()}
        {renderKonuSec()}
        {renderAltBaslikSec()}

        {/* Duolingo-style path */}
        {pathNodes.length > 0 && renderRoadmapPath()}

        {/* Empty state */}
        {!selectedSubject && (
          <div className="roadmap-empty-state">
            <div className="roadmap-empty-icon">🎯</div>
            <h3>Yolculuğa Başla</h3>
            <p>
              Yukarıdan bir <strong>ders</strong> seç, kişisel yol haritanı
              oluştur.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
