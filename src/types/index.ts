export type ExamLevel = 'TYT' | 'AYT';

export type SubjectCategory =
  | 'Matematik'
  | 'Edebiyat'
  | 'Tarih'
  | 'Coğrafya'
  | 'Din'
  | 'Felsefe'
  | 'Fizik'
  | 'Kimya'
  | 'Biyoloji'
  | 'Geometri';

export interface TopicNode {
  id: string;
  name: string;
  subject: SubjectCategory;
  level: ExamLevel;
  prerequisites: string[];
  estimatedMinutes: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  subtopics?: TopicNode[];
}

export interface UserHistory {
  attempts: TopicAttempt[];
  sessions: StudySession[];
}

export interface TopicAttempt {
  topicId: string;
  timestamp: string;
  correct: boolean;
  accuracy: number;
  masteryBefore: number;
  masteryAfter: number;
}

export interface StudySession {
  id: string;
  topicId: string;
  startedAt: string;
  endedAt: string;
  durationMinutes: number;
  pomodoroCount: number;
}

export interface SyncQueueEntry {
  id: string;
  type: 'session' | 'timer' | 'attempt';
  payload: StudySession | TimerResult | TopicAttempt;
  createdAt: string;
  synced: boolean;
}

export interface TimerResult {
  id: string;
  topicId: string;
  startedAt: string;
  endedAt: string;
  durationMinutes: number;
  completed: boolean;
}

export interface MasteryState {
  topicId: string;
  probability: number;
  lastUpdated: string;
  attempts: number;
}

export interface Sm2Card {
  topicId: string;
  easinessFactor: number;
  intervalDays: number;
  repetitions: number;
  dueDate: string;
  lastReviewedAt: string | null;
}

export interface Sm2ReviewResult {
  card: Sm2Card;
  quality: number;
  nextReviewDate: string;
  intervalDays: number;
}

export type MascotState = 'idle' | 'focus' | 'success' | 'warning';

export interface OsymScoreResult {
  netScore: number;
  zScore: number;
  percentile: number;
  correctCount: number;
  incorrectCount: number;
  blankCount: number;
}

export interface OsymSubjectStats {
  subject: SubjectCategory;
  mean: number;
  standardDeviation: number;
  questionCount: number;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  createdAt: string;
}
