import { useMemo, useState, type ReactElement } from 'react';
import { getSubjectsByLevel, getTopLevelTopics, getPrerequisites, getTopicById } from '../data/curriculum';
import type { ExamLevel, SubjectCategory, TopicNode } from '../types';
import { CLASS_ICONS } from '../lib/plannerStore';

interface MindFlowNodeData {
  id: string;
  name: string;
  state: 'mastered' | 'misconception' | 'missing';
  errors?: string[];
}

interface MindFlowUnitData {
  unitId: string;
  unitName: string;
  nodes: MindFlowNodeData[];
}

interface MindFlowSubjectData {
  subject: SubjectCategory;
  units: MindFlowUnitData[];
}

interface MindFlowLevelData {
  level: ExamLevel;
  subjects: MindFlowSubjectData[];
}

interface MindFlowData {
  tyt: MindFlowLevelData;
  ayt: MindFlowLevelData;
}

const MIND_FLOW_KEY = 'mindflow_data';

const DEFAULT_MIND_FLOW_DATA: MindFlowData = {
  tyt: {
    level: 'TYT',
    subjects: [
      {
        subject: 'Matematik',
        units: [
          {
            unitId: 'tyt-fonksiyonlar',
            unitName: 'Fonksiyonlar',
            nodes: [
              { id: 'tyt-fonksiyonlar-tanim', name: 'Fonksiyon Tanımı ve Özellikleri', state: 'mastered' },
              { id: 'tyt-fonksiyonlar-cesitler', name: 'Fonksiyon Çeşitleri', state: 'misconception', errors: ['Bileşke fonksiyonda değişme özelliği olduğunu iddia etti.', 'Fonksiyon tanım kümesi ile değer kümesini karıştırdı.'] },
              { id: 'tyt-fonksiyonlar-bilesik', name: 'Bileşik Fonksiyonlar', state: 'missing' },
            ],
          },
          {
            unitId: 'tyt-denklemler',
            unitName: 'Denklemler',
            nodes: [
              { id: 'tyt-denklemler-tek-degisken', name: 'Tek Değişkenli Denklemler', state: 'mastered' },
              { id: 'tyt-denklemler-cok-degisken', name: 'Çok Değişkenli Denklemler', state: 'missing' },
            ],
          },
        ],
      },
      {
        subject: 'Fizik',
        units: [
          {
            unitId: 'tyt-hareket',
            unitName: 'Hareket',
            nodes: [
              { id: 'tyt-hareket-hizi', name: 'Hız ve Hızlanma', state: 'mastered' },
              { id: 'tyt-hareket-grafikler', name: 'Grafikler', state: 'misconception', errors: ['Hız-grafik eğiminin hızlanma olduğunu sanıyor.', 'Alan hesabını yaparken grafiğin altındaki alanı hesaplamadı.'] },
              { id: 'tyt-hareket-serbest', name: 'Serbest Düşme', state: 'missing' },
            ],
          },
        ],
      },
    ],
  },
  ayt: {
    level: 'AYT',
    subjects: [
      {
        subject: 'Matematik',
        units: [
          {
            unitId: 'ayt-turev',
            unitName: 'Türev',
            nodes: [
              { id: 'ayt-turev-tanim', name: 'Türev Tanımı', state: 'mastered' },
              { id: 'ayt-turev-kurallar', name: 'Türev Kuralları', state: 'misconception', errors: ['Zincir kuralını uygularken iç fonksiyonun türevini almayı unuttu.', 'Çarpım kuralında sıralamayı yanlış yaptı.'] },
              { id: 'ayt-turev-uygulama', name: 'Türevin Uygulamaları', state: 'missing' },
            ],
          },
          {
            unitId: 'ayt-integral',
            unitName: 'İntegral',
            nodes: [
              { id: 'ayt-integral-tanim', name: 'İntegral Tanımı', state: 'mastered' },
              { id: 'ayt-integral-kurallar', name: 'İntegral Kuralları', state: 'missing' },
              { id: 'ayt-integral-alan', name: 'İntegralin Alan Uygulamaları', state: 'missing' },
            ],
          },
        ],
      },
      {
        subject: 'Fizik',
        units: [
          {
            unitId: 'ayt-is-enerji',
            unitName: 'İş, Güç, Enerji',
            nodes: [
              { id: 'ayt-is-enerji-is', name: 'İş ve Güç', state: 'mastered' },
              { id: 'ayt-is-enerji-kinetik', name: 'Kinetik Enerji', state: 'misconception', errors: ['Kinetik enerji formülünde hızı kare almayı unuttu.', 'İş-enerji teoremini vektörel olarak düşündü.'] },
              { id: 'ayt-is-enerji-potansiyel', name: 'Potansiyel Enerji', state: 'missing' },
            ],
          },
        ],
      },
    ],
  },
};

function readMindFlowData(): MindFlowData {
  try {
    const raw = window.localStorage.getItem(MIND_FLOW_KEY);
    if (!raw) {
      writeMindFlowData(DEFAULT_MIND_FLOW_DATA);
      return DEFAULT_MIND_FLOW_DATA;
    }
    return JSON.parse(raw) as MindFlowData;
  } catch {
    writeMindFlowData(DEFAULT_MIND_FLOW_DATA);
    return DEFAULT_MIND_FLOW_DATA;
  }
}

function writeMindFlowData(data: MindFlowData): void {
  try {
    window.localStorage.setItem(MIND_FLOW_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function getMockDataForUnit(level: ExamLevel, subject: SubjectCategory, unitId: string): MindFlowNodeData[] {
  const data = readMindFlowData();
  const levelData = level === 'TYT' ? data.tyt : data.ayt;
  const subjectData = levelData.subjects.find(s => s.subject === subject);
  if (!subjectData) return [];
  const unitData = subjectData.units.find(u => u.unitId === unitId);
  return unitData?.nodes ?? [];
}

interface LearningPathResult {
  nodes: TopicNode[];
}

function buildLearningPath(mainTopic: TopicNode): LearningPathResult {
  const visited = new Set<string>();
  const ordered: TopicNode[] = [];

  function traverse(node: TopicNode): void {
    if (visited.has(node.id)) return;
    visited.add(node.id);

    const prereqs = getPrerequisites(node.id);
    for (const prereq of prereqs) {
      traverse(prereq);
    }

    ordered.push(node);
  }

  traverse(mainTopic);
  return { nodes: ordered };
}

export function MindFlowView(): ReactElement {
  const [level, setLevel] = useState<ExamLevel>('TYT');
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [clickedNodeId, setClickedNodeId] = useState<string | null>(null);

  const availableSubjects = useMemo(() => getSubjectsByLevel(level), [level]);

  const mainTopics = useMemo(() => {
    if (!selectedSubject) return [];
    return getTopLevelTopics(selectedSubject, level);
  }, [selectedSubject, level]);

  const pathNodes = useMemo((): LearningPathResult | null => {
    if (!selectedUnitId) return null;
    const unit = getTopicById(selectedUnitId);
    if (!unit) return null;
    return buildLearningPath(unit);
  }, [selectedUnitId]);

  const nodeStates = useMemo(() => {
    if (!selectedUnitId || !selectedSubject) return new Map<string, MindFlowNodeData['state']>();
    const mockNodes = getMockDataForUnit(level, selectedSubject, selectedUnitId);
    const map = new Map<string, MindFlowNodeData['state']>();
    mockNodes.forEach(n => map.set(n.id, n.state));
    return map;
  }, [level, selectedSubject, selectedUnitId]);

  const nodeErrors = useMemo(() => {
    if (!selectedUnitId || !selectedSubject) return new Map<string, string[]>();
    const mockNodes = getMockDataForUnit(level, selectedSubject, selectedUnitId);
    const map = new Map<string, string[]>();
    mockNodes.forEach(n => {
      if (n.errors) map.set(n.id, n.errors);
    });
    return map;
  }, [level, selectedSubject, selectedUnitId]);

  const handleSubjectClick = (subject: SubjectCategory) => {
    setSelectedSubject(subject);
    setShowSubjectDropdown(false);
    setSelectedUnitId(null);
    setShowUnitDropdown(false);
  };

  const handleUnitClick = (unitId: string) => {
    setSelectedUnitId(unitId);
    setShowUnitDropdown(false);
  };

  const getNodeState = (nodeId: string): MindFlowNodeData['state'] => {
    return nodeStates.get(nodeId) ?? 'missing';
  };

  const getNodeErrors = (nodeId: string): string[] => {
    return nodeErrors.get(nodeId) ?? [];
  };

  const renderNode = (node: TopicNode, _idx: number, isLast: boolean) => {
    const state = getNodeState(node.id);
    const errors = getNodeErrors(node.id);
    const showPopover = (hoveredNodeId === node.id || clickedNodeId === node.id) && errors.length > 0;

    return (
      <div key={node.id} className="mindflow-node-wrapper" onMouseEnter={() => setHoveredNodeId(node.id)} onMouseLeave={() => setHoveredNodeId(null)} onClick={() => setClickedNodeId(clickedNodeId === node.id ? null : node.id)}>
        <div className={`mindflow-node ${state}`}>
          <div className="mindflow-node-inner">
            {state === 'mastered' && <span className="mindflow-node-icon">✓</span>}
            {state === 'misconception' && <span className="mindflow-node-icon mindflow-pulse">⚠</span>}
            {state === 'missing' && <span className="mindflow-node-icon">🔒</span>}
          </div>
        </div>
        <span className="mindflow-node-label">{node.name}</span>
        {state === 'misconception' && showPopover && (
          <div className="mindflow-popover">
            <div className="mindflow-popover-title">AI Detector - Tespit Edilen Yanılsamalar</div>
            <ul className="mindflow-popover-list">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}
        {!isLast && <div className="mindflow-connector" />}
      </div>
    );
  };

  return (
    <div className="mindflow-view">
      {/* Top Bar: TYT/AYT Toggle */}
      <div className="mindflow-top-bar">
        <div className="mindflow-level-toggle">
          {(['TYT', 'AYT'] as ExamLevel[]).map(lv => (
            <button
              key={lv}
              type="button"
              className={`mindflow-level-btn ${level === lv ? 'active' : ''}`}
              onClick={() => {
                setLevel(lv);
                setSelectedSubject(null);
                setSelectedUnitId(null);
              }}
            >
              {lv}
            </button>
          ))}
        </div>
      </div>

      {/* Subject & Unit Selectors */}
      <div className="mindflow-selectors">
        <div className="mindflow-dropdown">
          <button
            type="button"
            className="mindflow-dropdown-trigger"
            onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
            aria-expanded={showSubjectDropdown}
          >
            <span>{selectedSubject ? `📚 ${selectedSubject}` : 'Ders Seçin'}</span>
            <span className="mindflow-dropdown-arrow">{showSubjectDropdown ? '▲' : '▼'}</span>
          </button>
          {showSubjectDropdown && (
            <div className="mindflow-dropdown-menu">
              {availableSubjects.map(subj => (
                <button
                  key={subj}
                  type="button"
                  className={`mindflow-dropdown-item ${selectedSubject === subj ? 'selected' : ''}`}
                  onClick={() => handleSubjectClick(subj)}
                >
                  {CLASS_ICONS[subj]} {subj}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mindflow-dropdown">
          <button
            type="button"
            className="mindflow-dropdown-trigger"
            onClick={() => setShowUnitDropdown(!showUnitDropdown)}
            aria-expanded={showUnitDropdown}
            disabled={!selectedSubject}
          >
            <span>{selectedUnitId ? (getTopicById(selectedUnitId)?.name ?? 'Ünite Seçin') : 'Ünite Seçin'}</span>
            <span className="mindflow-dropdown-arrow">{showUnitDropdown ? '▲' : '▼'}</span>
          </button>
          {showUnitDropdown && selectedSubject && (
            <div className="mindflow-dropdown-menu">
              {mainTopics.map(topic => (
                <button
                  key={topic.id}
                  type="button"
                  className={`mindflow-dropdown-item ${selectedUnitId === topic.id ? 'selected' : ''}`}
                  onClick={() => handleUnitClick(topic.id)}
                >
                  {topic.name}
                </button>
              ))}
              {mainTopics.length === 0 && (
                <div className="mindflow-dropdown-empty">Bu ders için ünite bulunamadı</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mindflow-legend">
        <div className="mindflow-legend-item">
          <span className="mindflow-legend-dot mastered" />
          <span>Tamamlandı</span>
        </div>
        <div className="mindflow-legend-item">
          <span className="mindflow-legend-dot misconception" />
          <span>Yanılsama Var</span>
        </div>
        <div className="mindflow-legend-item">
          <span className="mindflow-legend-dot missing" />
          <span>Henüz Kapalı</span>
        </div>
      </div>

      {/* Learning Path */}
      {selectedUnitId && pathNodes && pathNodes.nodes.length > 0 ? (
        <div className="mindflow-path-container">
          <div className="mindflow-path-title">
            {getTopicById(selectedUnitId)?.name} - Öğrenme Yolu
          </div>
          <div className="mindflow-path">
            {pathNodes.nodes.map((node, idx) => renderNode(node, idx, idx === pathNodes.nodes.length - 1))}
          </div>
          <div className="mindflow-progress">
            {(() => {
              const total = pathNodes.nodes.length;
              const mastered = pathNodes.nodes.filter(n => getNodeState(n.id) === 'mastered').length;
              const misconception = pathNodes.nodes.filter(n => getNodeState(n.id) === 'misconception').length;
              return (
                <>
                  <span>{mastered}/{total} tamamlandı</span>
                  {misconception > 0 && <span className="mindflow-misconception-count">{misconception} yanılsama</span>}
                </>
              );
            })()}
          </div>
        </div>
      ) : (
        <div className="mindflow-empty">
          <div className="mindflow-empty-icon">🧠</div>
          <p>MindFlow yol haritasını görmek için bir ders ve ünite seçin.</p>
          <p className="mindflow-empty-hint">Sol taraftan bir ders seçip, ardından bir ünite belirleyin.</p>
        </div>
      )}
    </div>
  );
}