import type { SubjectCategory } from '../types';

/**
 * plannerStore.ts
 * LocalStorage-backed persistence for the daily study planner: tasks,
 * streak tracking, pomodoro timer state, and daily motivational quotes.
 * Follows the same offline-first pattern as studyStore.ts.
 */

const TASKS_KEY = 'archie.planner.tasks';
const STREAK_KEY = 'archie.planner.streak';
const POMODORO_KEY = 'archie.planner.pomodoro';
const LAST_ACTIVE_DAY_KEY = 'archie.planner.lastActiveDay';

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'ders' | 'tekrar' | 'deneme' | 'mola' | '';

export interface PlannerTask {
  id: string;
  title: string;
  time: string;
  class: string;
  priority: TaskPriority;
  category: TaskCategory;
  duration: string;
  done: boolean;
  createdAt: string;
}

export interface PlannerStats {
  completed: number;
  total: number;
  percentage: number;
  streak: number;
}

export interface PomodoroState {
  seconds: number;
  running: boolean;
  isBreak: boolean;
}

export interface DayInfo {
  index: number;
  name: string;
  date: Date;
  isToday: boolean;
  dayKey: string;
}

export const WEEKDAYS: string[] = [
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
  'Pazar',
];

export const PLANNER_QUOTES: string[] = [
  'Başarı, her gün tekrarlanan küçük çabaların toplamıdır.',
  'Disiplin, hedefler ile başarı arasındaki köprüdür.',
  'Bilgi, paylaştıkça çoğalır. Öğrenmeye devam et.',
  'Bugün yaptıkların, yarının temelidir.',
  'Küçük adımlar, büyük yolculukları tamamlar.',
  'Zorluklar, büyümenin fırsatlarıdır.',
  'Her gün bir sayfa, yılda bir kitap demektir.',
];

export const CLASS_ICONS: Record<SubjectCategory, string> = {
  Matematik: '📐',
  Edebiyat: '📚',
  Geometri: '📐',
  Fizik: '🔬',
  Kimya: '🧪',
  Biyoloji: '🧬',
  Tarih: '📜',
  Coğrafya: '🌍',
  Felsefe: '🧠',
  Din: '☪️',
};

export const PRIORITY_ICONS: Record<TaskPriority, string> = {
  high: '🔴',
  medium: '🟡',
  low: '🟢',
};

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  ders: '📖 Ders',
  tekrar: '🔁 Tekrar',
  deneme: '📝 Deneme',
  mola: '☕ Mola',
  '': 'Kategori',
};

const POMODORO_WORK_SECONDS = 25 * 60;
const POMODORO_BREAK_SECONDS = 5 * 60;

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

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

/**
 * Returns the tasks record keyed by day-key (YYYY-MM-DD).
 */
export function getTasks(): Record<string, PlannerTask[]> {
  return readJSON<Record<string, PlannerTask[]>>(TASKS_KEY, {});
}

/**
 * Returns tasks for a specific day-key.
 */
export function getTasksForDay(dayKey: string): PlannerTask[] {
  const tasks = getTasks();
  return tasks[dayKey] ?? [];
}

/**
 * Adds a new task to the given day-key.
 */
export function addTask(
  dayKey: string,
  task: Omit<PlannerTask, 'id' | 'createdAt' | 'done'>,
): PlannerTask {
  const tasks = getTasks();
  const dayTasks = tasks[dayKey] ?? [];
  const newTask: PlannerTask = {
    ...task,
    id: generateId(),
    done: false,
    createdAt: new Date().toISOString(),
  };
  dayTasks.push(newTask);
  tasks[dayKey] = dayTasks;
  writeJSON(TASKS_KEY, tasks);
  return newTask;
}

/**
 * Updates a task in-place for the given day-key.
 */
export function updateTask(
  dayKey: string,
  taskId: string,
  updates: Partial<Omit<PlannerTask, 'id' | 'createdAt'>>,
): void {
  const tasks = getTasks();
  const dayTasks = tasks[dayKey] ?? [];
  const index = dayTasks.findIndex((t) => t.id === taskId);
  if (index === -1) {
    return;
  }
  dayTasks[index] = { ...dayTasks[index], ...updates };
  tasks[dayKey] = dayTasks;
  writeJSON(TASKS_KEY, tasks);
}

/**
 * Deletes a task from the given day-key.
 */
export function deleteTask(dayKey: string, taskId: string): void {
  const tasks = getTasks();
  const dayTasks = tasks[dayKey] ?? [];
  const index = dayTasks.findIndex((t) => t.id === taskId);
  if (index === -1) {
    return;
  }
  dayTasks.splice(index, 1);
  tasks[dayKey] = dayTasks;
  writeJSON(TASKS_KEY, tasks);
}

/**
 * Toggles the done state of a task.
 */
export function toggleTaskDone(dayKey: string, taskId: string): void {
  const tasks = getTasks();
  const dayTasks = tasks[dayKey] ?? [];
  const index = dayTasks.findIndex((t) => t.id === taskId);
  if (index === -1) {
    return;
  }
  dayTasks[index].done = !dayTasks[index].done;
  tasks[dayKey] = dayTasks;
  writeJSON(TASKS_KEY, tasks);
}

/**
 * Returns the current streak (consecutive days with at least one completed task).
 */
export function getStreak(): number {
  return readJSON<number>(STREAK_KEY, 0);
}

/**
 * Updates the streak based on today's activity.
 * If today already has a completed task, the streak is preserved.
 * If yesterday was active and today is the first completion, streak increments.
 */
export function updateStreak(): void {
  const today = new Date();
  const todayKey = formatDateKey(today);
  const tasks = getTasks();
  const todayTasks = tasks[todayKey] ?? [];
  const hasCompletedToday = todayTasks.some((t) => t.done);

  if (!hasCompletedToday) {
    return;
  }

  const lastActiveDay = readJSON<string | null>(LAST_ACTIVE_DAY_KEY, null);
  const currentStreak = getStreak();

  if (lastActiveDay === todayKey) {
    // Already counted today
    return;
  }

  // Check if yesterday was active
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = formatDateKey(yesterday);
  const yesterdayTasks = tasks[yesterdayKey] ?? [];
  const hadCompletedYesterday = yesterdayTasks.some((t) => t.done);

  if (hadCompletedYesterday || currentStreak === 0) {
    writeJSON(STREAK_KEY, currentStreak + 1);
  } else {
    // Streak broken, reset to 1
    writeJSON(STREAK_KEY, 1);
  }

  writeJSON(LAST_ACTIVE_DAY_KEY, todayKey);
}

/**
 * Returns overall planner statistics across all days.
 */
export function getPlannerStats(): PlannerStats {
  const tasks = getTasks();
  const allTasks = Object.values(tasks).flat();
  const completed = allTasks.filter((t) => t.done).length;
  const total = allTasks.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const streak = getStreak();

  return { completed, total, percentage, streak };
}

/**
 * Returns the pomodoro timer state from localStorage.
 */
export function getPomodoroState(): PomodoroState {
  return readJSON<PomodoroState>(POMODORO_KEY, {
    seconds: POMODORO_WORK_SECONDS,
    running: false,
    isBreak: false,
  });
}

/**
 * Persists the pomodoro timer state.
 */
export function savePomodoroState(state: PomodoroState): void {
  writeJSON(POMODORO_KEY, state);
}

/**
 * Returns a daily motivational quote based on the current date.
 */
export function getDailyQuote(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (24 * 60 * 60 * 1000),
  );
  return PLANNER_QUOTES[dayOfYear % PLANNER_QUOTES.length];
}

/**
 * Formats a Date into a YYYY-MM-DD key.
 */
export function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/**
 * Returns the day-key for a given day index (0 = Monday) relative to today.
 */
export function getDayKey(dayIndex: number): string {
  const today = new Date();
  const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const diff = dayIndex - todayIndex;
  const target = new Date(today);
  target.setDate(today.getDate() + diff);
  return formatDateKey(target);
}

/**
 * Returns the 7-day week array starting from Monday.
 */
export function getWeekDays(): DayInfo[] {
  const today = new Date();
  const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const todayKey = formatDateKey(today);

  return WEEKDAYS.map((name, index) => {
    const date = new Date(today);
    const diff = index - todayIndex;
    date.setDate(today.getDate() + diff);
    return {
      index,
      name,
      date,
      isToday: formatDateKey(date) === todayKey,
      dayKey: formatDateKey(date),
    };
  });
}

/**
 * Returns the work-session duration in seconds.
 */
export function getPomodoroWorkSeconds(): number {
  return POMODORO_WORK_SECONDS;
}

/**
 * Returns the break-session duration in seconds.
 */
export function getPomodoroBreakSeconds(): number {
  return POMODORO_BREAK_SECONDS;
}
