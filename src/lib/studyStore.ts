import { createInitialCard, reviewCard } from './sm2Engine';
import { estimateMasteryFromHistory } from './bktEngine';
import type { Sm2Card, Sm2ReviewResult } from '../types';

/**
 * studyStore.ts
 * LocalStorage-backed persistence for SM-2 review cards, per-topic mastery
 * accuracy history, and quiz attempts. This keeps the study scheduler and
 * mastery matrix working offline-first without needing Supabase.
 */

const REVIEWS_KEY = 'archie.sm2.reviews';
const HISTORY_KEY = 'archie.mastery.history';
const ATTEMPTS_KEY = 'archie.quiz.attempts';

export interface AttemptRecord {
  topicId: string;
  timestamp: string;
  correct: boolean;
  accuracy: number;
}

export interface TopicAccuracy {
  total: number;
  correct: number;
}

type ReviewMap = Record<string, Sm2Card>;
type AccuracyMap = Record<string, TopicAccuracy>;

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / availability errors
  }
}

export function getReview(topicId: string): Sm2Card | null {
  const reviews = readJSON<ReviewMap>(REVIEWS_KEY, {});
  return reviews[topicId] ?? null;
}

export function getAllReviews(): Sm2Card[] {
  const reviews = readJSON<ReviewMap>(REVIEWS_KEY, {});
  return Object.values(reviews);
}

export function getAccuracy(topicId: string): TopicAccuracy | null {
  const accuracies = readJSON<AccuracyMap>(HISTORY_KEY, {});
  return accuracies[topicId] ?? null;
}

export function getAllAccuracies(): AccuracyMap {
  return readJSON<AccuracyMap>(HISTORY_KEY, {});
}

export function getAttempts(): AttemptRecord[] {
  return readJSON<AttemptRecord[]>(ATTEMPTS_KEY, []);
}

/**
 * Records a quiz attempt for a topic, persisting it and updating the
 * cumulative accuracy used by the mastery matrix.
 */
export function recordAttempt(topicId: string, correct: boolean, accuracy: number): void {
  const attempts = getAttempts();
  attempts.push({
    topicId,
    timestamp: new Date().toISOString(),
    correct,
    accuracy,
  });
  writeJSON(ATTEMPTS_KEY, attempts);

  const accuracies = readJSON<AccuracyMap>(HISTORY_KEY, {});
  const current = accuracies[topicId] ?? { total: 0, correct: 0 };
  current.total += 1;
  if (correct) {
    current.correct += 1;
  }
  accuracies[topicId] = current;
  writeJSON(HISTORY_KEY, accuracies);
}

/**
 * Applies the SM-2 algorithm for a topic given a quality rating q in [0, 5].
 * Creates a fresh card if none exists yet, stores the updated card, and
 * returns the review result (including the exact next review date).
 */
export function recordReview(topicId: string, quality: number): Sm2ReviewResult {
  const existing = getReview(topicId);
  const card = existing ?? createInitialCard(topicId);
  const result = reviewCard(card, quality);

  const reviews = readJSON<ReviewMap>(REVIEWS_KEY, {});
  reviews[topicId] = result.card;
  writeJSON(REVIEWS_KEY, reviews);

  return result;
}

/**
 * Maps a quiz accuracy percentage (0-100) to an SM-2 quality rating q in [0, 5].
 * 0% -> 0, 100% -> 5 (rounded to nearest integer).
 */
export function accuracyToQuality(accuracyPercent: number): number {
  const clamped = Math.min(100, Math.max(0, accuracyPercent));
  return Math.round((clamped / 100) * 5);
}

/**
 * Returns the overall mastery probability (0-1) for a topic using the BKT
 * engine, estimated from its cumulative accuracy history.
 */
export function getMasteryProbability(topicId: string): number {
  const accuracy = getAccuracy(topicId);
  if (!accuracy || accuracy.total === 0) {
    return 0.2;
  }
  return estimateMasteryFromHistory(accuracy.correct, accuracy.total);
}

/**
 * Computes a display percentage (0-100) for a topic: blends the raw accuracy
 * with the BKT probability so the matrix reflects both correctness and model
 * confidence.
 */
export function getMasteryDisplayPercent(topicId: string): number {
  const accuracy = getAccuracy(topicId);
  if (!accuracy || accuracy.total === 0) {
    return 0;
  }

  const rawAccuracy = (accuracy.correct / accuracy.total) * 100;
  const bktPercent = getMasteryProbability(topicId) * 100;
  return Math.round(rawAccuracy * 0.6 + bktPercent * 0.4);
}

export function getMasteryLabel(percent: number): string {
  if (percent >= 70) {
    return 'Güçlü';
  }
  if (percent >= 40) {
    return 'Gelişiyor';
  }
  if (percent > 0) {
    return 'Zayıf';
  }
  return 'Çözülmedi';
}

export function masteryColor(percent: number): string {
  if (percent >= 70) {
    return '#4ade80';
  }
  if (percent >= 40) {
    return '#ffc800';
  }
  return '#ff5864';
}

export function formatReviewDate(iso: string): string {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
