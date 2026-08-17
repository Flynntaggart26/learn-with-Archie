import type { Sm2Card, Sm2ReviewResult } from '../types';

export const MIN_EASINESS_FACTOR = 1.3;
export const MAX_EASINESS_FACTOR = 2.5;
export const DEFAULT_EASINESS_FACTOR = 2.5;
export const DEFAULT_INTERVAL_DAYS = 0;
export const DEFAULT_REPETITIONS = 0;

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export function createInitialCard(topicId: string): Sm2Card {
  return {
    topicId,
    easinessFactor: DEFAULT_EASINESS_FACTOR,
    intervalDays: DEFAULT_INTERVAL_DAYS,
    repetitions: DEFAULT_REPETITIONS,
    dueDate: new Date().toISOString(),
    lastReviewedAt: null,
  };
}

function clampEasinessFactor(easinessFactor: number): number {
  return Math.min(
    MAX_EASINESS_FACTOR,
    Math.max(MIN_EASINESS_FACTOR, easinessFactor),
  );
}

function calculateNextInterval(
  repetitions: number,
  easinessFactor: number,
  previousInterval: number,
): number {
  if (repetitions === 0) {
    return 1;
  }
  if (repetitions === 1) {
    return 6;
  }
  return Math.round(previousInterval * easinessFactor);
}

export function reviewCard(
  card: Sm2Card,
  quality: number,
  reviewDate: Date = new Date(),
): Sm2ReviewResult {
  const clampedQuality = Math.min(5, Math.max(0, Math.round(quality)));

  let nextCard: Sm2Card;

  if (clampedQuality < 3) {
    nextCard = {
      ...card,
      repetitions: 0,
      intervalDays: 1,
      dueDate: new Date(
        reviewDate.getTime() + DAY_IN_MILLISECONDS,
      ).toISOString(),
      lastReviewedAt: reviewDate.toISOString(),
    };
  } else {
    const updatedEasinessFactor = clampEasinessFactor(
      card.easinessFactor +
        (0.1 -
          (5 - clampedQuality) * (0.08 + (5 - clampedQuality) * 0.02)),
    );

    const nextRepetitions = card.repetitions + 1;
    // SM-2 standard: interval is chosen based on the PREVIOUS repetition count
    // (0 -> 1 day, 1 -> 6 days, >=2 -> previousInterval * EF)
    const nextInterval = calculateNextInterval(
      card.repetitions,
      updatedEasinessFactor,
      card.intervalDays,
    );

    nextCard = {
      ...card,
      easinessFactor: updatedEasinessFactor,
      repetitions: nextRepetitions,
      intervalDays: nextInterval,
      dueDate: new Date(
        reviewDate.getTime() + nextInterval * DAY_IN_MILLISECONDS,
      ).toISOString(),
      lastReviewedAt: reviewDate.toISOString(),
    };
  }

  return {
    card: nextCard,
    quality: clampedQuality,
    nextReviewDate: nextCard.dueDate,
    intervalDays: nextCard.intervalDays,
  };
}

export function getDueCards(
  cards: Sm2Card[],
  currentDate: Date = new Date(),
): Sm2Card[] {
  return cards.filter((card) => new Date(card.dueDate) <= currentDate);
}

export function getDaysUntilDue(card: Sm2Card): number {
  const dueDate = new Date(card.dueDate);
  const now = new Date();
  const difference = dueDate.getTime() - now.getTime();
  return Math.ceil(difference / DAY_IN_MILLISECONDS);
}

export function isCardDue(
  card: Sm2Card,
  currentDate: Date = new Date(),
): boolean {
  return new Date(card.dueDate) <= currentDate;
}
