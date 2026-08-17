import type { OsymScoreResult, OsymSubjectStats, SubjectCategory } from '../types';

const PENALTY_DIVISOR = 4;

export const HISTORICAL_SUBJECT_STATS: OsymSubjectStats[] = [
  { subject: 'Matematik', mean: 8.2, standardDeviation: 4.1, questionCount: 40 },
  { subject: 'Edebiyat', mean: 22.5, standardDeviation: 5.8, questionCount: 40 },
  { subject: 'Fizik', mean: 4.8, standardDeviation: 3.2, questionCount: 14 },
  { subject: 'Kimya', mean: 4.2, standardDeviation: 2.9, questionCount: 13 },
  { subject: 'Biyoloji', mean: 4.5, standardDeviation: 3.0, questionCount: 13 },
  { subject: 'Tarih', mean: 6.8, standardDeviation: 3.5, questionCount: 10 },
  { subject: 'Coğrafya', mean: 5.2, standardDeviation: 3.1, questionCount: 9 },
  { subject: 'Felsefe', mean: 3.8, standardDeviation: 2.6, questionCount: 6 },
  { subject: 'Din', mean: 4.2, standardDeviation: 2.4, questionCount: 6 },
  { subject: 'Geometri', mean: 3.5, standardDeviation: 2.8, questionCount: 10 },
];

function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);

  const t = 1 / (1 + 0.3275911 * absX);
  const y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t -
      0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-absX * absX);

  return sign * y;
}

export function calculateNetScore(
  correctCount: number,
  incorrectCount: number,
): number {
  const net = correctCount - incorrectCount / PENALTY_DIVISOR;
  return Math.max(0, Math.round(net * 100) / 100);
}

export function calculateZScore(
  netScore: number,
  mean: number,
  standardDeviation: number,
): number {
  if (standardDeviation === 0) {
    return 0;
  }
  return (netScore - mean) / standardDeviation;
}

export function calculatePercentile(zScore: number): number {
  const percentile = 0.5 * (1 + erf(zScore / Math.SQRT2));
  return Math.min(99.99, Math.max(0.01, percentile * 100));
}

export function predictOsymScore(
  correctCount: number,
  incorrectCount: number,
  blankCount: number,
  subject: SubjectCategory,
): OsymScoreResult {
  const netScore = calculateNetScore(correctCount, incorrectCount);

  const subjectStats = HISTORICAL_SUBJECT_STATS.find(
    (stats) => stats.subject === subject,
  );

  const mean = subjectStats ? subjectStats.mean : 5;
  const standardDeviation = subjectStats ? subjectStats.standardDeviation : 3;

  const zScore = calculateZScore(netScore, mean, standardDeviation);
  const percentile = calculatePercentile(zScore);

  return {
    netScore,
    zScore,
    percentile,
    correctCount,
    incorrectCount,
    blankCount,
  };
}

export function predictOverallPercentile(
  results: OsymScoreResult[],
): number {
  if (results.length === 0) {
    return 0;
  }

  const averageZ =
    results.reduce((sum, result) => sum + result.zScore, 0) / results.length;

  return calculatePercentile(averageZ);
}

export function getSubjectStats(
  subject: SubjectCategory,
): OsymSubjectStats | undefined {
  return HISTORICAL_SUBJECT_STATS.find((stats) => stats.subject === subject);
}