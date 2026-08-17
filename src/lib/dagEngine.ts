import { curriculumMap, getPrerequisites } from '../data/curriculum';
import type { TopicNode, UserHistory } from '../types';

export interface WeaknessResult {
  rootNodeId: string;
  rootNodeName: string;
  path: string[];
  accuracy: number;
  isRoot: boolean;
}

const ACCURACY_THRESHOLD = 0.5;

function getTopicAccuracy(topicId: string, history: UserHistory): number {
  const topicAttempts = history.attempts.filter(
    (attempt) => attempt.topicId === topicId,
  );

  if (topicAttempts.length === 0) {
    return 1;
  }

  const correctCount = topicAttempts.filter(
    (attempt) => attempt.correct,
  ).length;

  return correctCount / topicAttempts.length;
}

function isMastered(topicId: string, history: UserHistory): boolean {
  return getTopicAccuracy(topicId, history) >= ACCURACY_THRESHOLD;
}

function dfsFindWeakness(
  nodeId: string,
  history: UserHistory,
  visited: Set<string>,
  path: string[],
): WeaknessResult | null {
  if (visited.has(nodeId)) {
    return null;
  }
  visited.add(nodeId);

  const node = curriculumMap.get(nodeId);
  if (!node) {
    return null;
  }

  const currentPath = [...path, nodeId];
  const accuracy = getTopicAccuracy(nodeId, history);

  if (accuracy < ACCURACY_THRESHOLD) {
    return {
      rootNodeId: nodeId,
      rootNodeName: node.name,
      path: currentPath,
      accuracy,
      isRoot: node.prerequisites.length === 0,
    };
  }

  for (const prereqId of node.prerequisites) {
    const result = dfsFindWeakness(prereqId, history, visited, currentPath);
    if (result) {
      return result;
    }
  }

  return null;
}

export function findRootWeakness(
  nodeId: string,
  history: UserHistory,
): WeaknessResult | null {
  const visited = new Set<string>();
  return dfsFindWeakness(nodeId, history, visited, []);
}

export function findWeakTopics(history: UserHistory): TopicNode[] {
  const weakTopicIds = new Set<string>();

  for (const attempt of history.attempts) {
    if (!attempt.correct) {
      const weakness = findRootWeakness(attempt.topicId, history);
      if (weakness) {
        weakTopicIds.add(weakness.rootNodeId);
      }
    }
  }

  return Array.from(weakTopicIds)
    .map((id) => curriculumMap.get(id))
    .filter((node): node is TopicNode => node !== undefined);
}

export function getUnmasteredPrerequisites(
  topicId: string,
  history: UserHistory,
): TopicNode[] {
  const prerequisites = getPrerequisites(topicId);
  return prerequisites.filter((prereq) => !isMastered(prereq.id, history));
}

export function getMasteryPath(topicId: string): TopicNode[] {
  const path: TopicNode[] = [];
  const visited = new Set<string>();

  function traverse(nodeId: string): void {
    if (visited.has(nodeId)) {
      return;
    }
    visited.add(nodeId);

    const node = curriculumMap.get(nodeId);
    if (!node) {
      return;
    }

    for (const prereqId of node.prerequisites) {
      traverse(prereqId);
    }

    path.push(node);
  }

  traverse(topicId);
  return path;
}

export function isDagValid(): boolean {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function hasCycle(nodeId: string): boolean {
    if (recursionStack.has(nodeId)) {
      return true;
    }
    if (visited.has(nodeId)) {
      return false;
    }

    visited.add(nodeId);
    recursionStack.add(nodeId);

    const node = curriculumMap.get(nodeId);
    if (node) {
      for (const prereqId of node.prerequisites) {
        if (hasCycle(prereqId)) {
          return true;
        }
      }
    }

    recursionStack.delete(nodeId);
    return false;
  }

  for (const node of curriculumMap.values()) {
    if (hasCycle(node.id)) {
      return false;
    }
  }

  return true;
}