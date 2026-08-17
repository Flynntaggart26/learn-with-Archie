export interface BktParameters {
  initialMastery: number;
  learningRate: number;
  slipRate: number;
  guessRate: number;
}

export const DEFAULT_BKT_PARAMETERS: BktParameters = {
  initialMastery: 0.2,
  learningRate: 0.4,
  slipRate: 0.1,
  guessRate: 0.2,
};

function clampProbability(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function calculateMastery(
  previousMastery: number,
  isCorrect: boolean,
  parameters: BktParameters = DEFAULT_BKT_PARAMETERS,
): number {
  const clampedPrevious = clampProbability(previousMastery);
  const { learningRate, slipRate, guessRate } = parameters;

  const probabilityCorrect =
    clampedPrevious * (1 - slipRate) + (1 - clampedPrevious) * guessRate;

  // Guard against division by zero in both branches.
  // If probabilityCorrect === 1, the "wrong" branch denominator (1 - p) is 0.
  if (probabilityCorrect <= 0 || probabilityCorrect >= 1) {
    // If the model is fully certain, a correct answer confirms mastery and a
    // wrong answer is impossible under the model; keep the previous mastery.
    return clampedPrevious;
  }

  let posteriorMastery: number;

  if (isCorrect) {
    posteriorMastery =
      (clampedPrevious * (1 - slipRate)) / probabilityCorrect;
  } else {
    posteriorMastery =
      (clampedPrevious * slipRate) / (1 - probabilityCorrect);
  }

  const updatedMastery =
    posteriorMastery + (1 - posteriorMastery) * learningRate;

  return clampProbability(updatedMastery);
}

export function calculateMasterySequence(
  results: boolean[],
  parameters: BktParameters = DEFAULT_BKT_PARAMETERS,
): number[] {
  const masterySequence: number[] = [];
  let currentMastery = parameters.initialMastery;

  for (const isCorrect of results) {
    currentMastery = calculateMastery(currentMastery, isCorrect, parameters);
    masterySequence.push(currentMastery);
  }

  return masterySequence;
}

export function estimateMasteryFromHistory(
  correctCount: number,
  totalCount: number,
  parameters: BktParameters = DEFAULT_BKT_PARAMETERS,
): number {
  if (totalCount === 0) {
    return parameters.initialMastery;
  }

  const results: boolean[] = [];

  for (let i = 0; i < totalCount; i += 1) {
    results.push(i < correctCount);
  }

  const sequence = calculateMasterySequence(results, parameters);
  return sequence[sequence.length - 1];
}

export function getMasteryLabel(mastery: number): string {
  if (mastery >= 0.8) {
    return 'Usta';
  }
  if (mastery >= 0.6) {
    return 'Güçlü';
  }
  if (mastery >= 0.4) {
    return 'Gelişiyor';
  }
  if (mastery >= 0.2) {
    return 'Başlangıç';
  }
  return 'Zayıf';
}
