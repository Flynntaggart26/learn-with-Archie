import {
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
import type { SubjectCategory } from '../types';
import {
  addTask,
  CATEGORY_LABELS,
  CLASS_ICONS,
  deleteTask,
  getDailyQuote,
  getPomodoroBreakSeconds,
  getPomodoroState,
  getPomodoroWorkSeconds,
  getPlannerStats,
  getTasksForDay,
  getWeekDays,
  PRIORITY_ICONS,
  savePomodoroState,
  toggleTaskDone,
  type DayInfo,
  type PlannerStats,
  type PlannerTask,
  type PomodoroState,
  type TaskCategory,
  type TaskPriority,
  updateStreak,
  updateTask,
} from '../lib/plannerStore';

interface PlannerViewProps {
  onMascotState?: (state: 'idle' | 'focus' | 'success' | 'warning') => void;
}

const SUBJECTS: SubjectCategory[] = [
  'Matematik',
  'Edebiyat',
  'Geometri',
  'Fizik',
  'Kimya',
  'Biyoloji',
  'Tarih',
  'Coğrafya',
  'Felsefe',
  'Din',
];

const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high'];

const CATEGORIES: TaskCategory[] = ['ders', 'tekrar', 'deneme', 'mola'];

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
  });
}

export function PlannerView({ onMascotState }: PlannerViewProps): ReactElement {
  const [selectedDay, setSelectedDay] = useState<number>(() => {
    const today = new Date();
    return today.getDay() === 0 ? 6 : today.getDay() - 1;
  });
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [editingTask, setEditingTask] = useState<PlannerTask | null>(null);
  const [pomodoro, setPomodoro] = useState<PomodoroState>(() => getPomodoroState());
  const [stats, setStats] = useState<PlannerStats>(() => getPlannerStats());
  const [quote] = useState<string>(getDailyQuote());

  // Form state for adding a new task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('09:00');
  const [newTaskClass, setNewTaskClass] = useState<SubjectCategory>('Matematik');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('medium');
  const [newTaskCategory, setNewTaskCategory] = useState<TaskCategory>('');
  const [newTaskDuration, setNewTaskDuration] = useState('');

  // Form state for editing a task
  const [editTitle, setEditTitle] = useState('');
  const [editTime, setEditTime] = useState('09:00');
  const [editClass, setEditClass] = useState<SubjectCategory>('Matematik');
  const [editPriority, setEditPriority] = useState<TaskPriority>('medium');
  const [editCategory, setEditCategory] = useState<TaskCategory>('');
  const [editDuration, setEditDuration] = useState('');

  const weekDays = useMemo(getWeekDays, []);
  const selectedDayInfo = useMemo<DayInfo | undefined>(
    () => weekDays.find((d) => d.index === selectedDay),
    [weekDays, selectedDay],
  );

  const dayKey = selectedDayInfo?.dayKey ?? '';

  // Load tasks for the selected day
  useEffect(() => {
    if (!dayKey) {
      return;
    }
    setTasks(getTasksForDay(dayKey));
  }, [dayKey]);

  // Pomodoro timer effect
  useEffect(() => {
    if (!pomodoro.running) {
      return;
    }

    const interval = setInterval(() => {
      setPomodoro((prev) => {
        if (prev.seconds <= 1) {
          // Timer finished
          const nextState: PomodoroState = {
            seconds: prev.isBreak
              ? getPomodoroWorkSeconds()
              : getPomodoroBreakSeconds(),
            running: false,
            isBreak: !prev.isBreak,
          };
          savePomodoroState(nextState);
          onMascotState?.(prev.isBreak ? 'success' : 'focus');
          return nextState;
        }
        const nextState: PomodoroState = {
          ...prev,
          seconds: prev.seconds - 1,
        };
        savePomodoroState(nextState);
        return nextState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pomodoro.running, onMascotState]);

  const refreshTasks = (): void => {
    if (!dayKey) {
      return;
    }
    setTasks(getTasksForDay(dayKey));
    setStats(getPlannerStats());
    updateStreak();
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !dayKey) {
      return;
    }
    addTask(dayKey, {
      title: newTaskTitle,
      time: newTaskTime,
      class: newTaskClass,
      priority: newTaskPriority,
      category: newTaskCategory,
      duration: newTaskDuration,
    });
    setNewTaskTitle('');
    setNewTaskTime('09:00');
    setNewTaskClass('Matematik');
    setNewTaskPriority('medium');
    setNewTaskCategory('');
    setNewTaskDuration('');
    refreshTasks();
  };

  const handleToggleDone = (taskId: string): void => {
    if (!dayKey) {
      return;
    }
    toggleTaskDone(dayKey, taskId);
    refreshTasks();
  };

  const handleDeleteTask = (taskId: string): void => {
    if (!dayKey) {
      return;
    }
    deleteTask(dayKey, taskId);
    refreshTasks();
  };

  const handleEditTask = (task: PlannerTask): void => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditTime(task.time || '09:00');
    setEditClass((task.class as SubjectCategory) || 'Matematik');
    setEditPriority(task.priority || 'medium');
    setEditCategory(task.category || '');
    setEditDuration(task.duration || '');
  };

  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!editingTask || !dayKey) {
      return;
    }
    updateTask(dayKey, editingTask.id, {
      title: editTitle,
      time: editTime,
      class: editClass,
      priority: editPriority,
      category: editCategory,
      duration: editDuration,
    });
    setEditingTask(null);
    refreshTasks();
  };

  const handleCancelEdit = (): void => {
    setEditingTask(null);
  };

  const handleStartPomodoro = (): void => {
    const nextState: PomodoroState = {
      ...pomodoro,
      running: !pomodoro.running,
    };
    setPomodoro(nextState);
    savePomodoroState(nextState);
    onMascotState?.(pomodoro.running ? 'idle' : 'focus');
  };

  const handleResetPomodoro = (): void => {
    const nextState: PomodoroState = {
      seconds: getPomodoroWorkSeconds(),
      running: false,
      isBreak: false,
    };
    setPomodoro(nextState);
    savePomodoroState(nextState);
    onMascotState?.('idle');
  };

  const sortedTasks = useMemo(
    () =>
      tasks
        .slice()
        .sort((a, b) => {
          if (a.done !== b.done) {
            return a.done ? 1 : -1;
          }
          return a.time.localeCompare(b.time);
        }),
    [tasks],
  );

  const renderQuote = (): ReactElement => (
    <div className="planner-quote">
      <span className="quote-icon">💬</span>
      <span className="quote-text">{quote}</span>
    </div>
  );

  const renderStats = (): ReactElement => (
    <div className="planner-stats">
      <div className="planner-stat-card">
        <div className="planner-stat-icon">✅</div>
        <div className="planner-stat-value">{stats.completed}</div>
        <div className="planner-stat-label">Tamamlanan</div>
      </div>
      <div className="planner-stat-card">
        <div className="planner-stat-icon">📚</div>
        <div className="planner-stat-value">{stats.total}</div>
        <div className="planner-stat-label">Toplam Görev</div>
      </div>
      <div className="planner-stat-card">
        <div className="planner-stat-icon">🎯</div>
        <div className="planner-stat-value">{stats.percentage}%</div>
        <div className="planner-stat-label">Haftalık Başarı</div>
      </div>
      <div className="planner-stat-card">
        <div className="planner-stat-icon">🔥</div>
        <div className="planner-stat-value">{stats.streak}</div>
        <div className="planner-stat-label">Seri (Gün)</div>
      </div>
    </div>
  );

  const renderDays = (): ReactElement => (
    <div className="planner-days">
      {weekDays.map((day) => {
        const dayTasks = getTasksForDay(day.dayKey);
        const done = dayTasks.filter((t) => t.done).length;
        return (
          <button
            key={day.index}
            type="button"
            className={`planner-day ${
              day.index === selectedDay ? 'active' : ''
            }${day.isToday ? ' today' : ''}`}
            onClick={() => setSelectedDay(day.index)}
          >
            <div className="planner-day-name">{day.name}</div>
            <div className="planner-day-date">
              {day.isToday ? 'Bugün' : formatDateDisplay(day.date)}
            </div>
            <div className="planner-day-count">{`${done}/${dayTasks.length}`}</div>
          </button>
        );
      })}
    </div>
  );

  const renderTaskForm = (): ReactElement => (
    <form className="planner-form" onSubmit={handleAddTask}>
      <div className="planner-form-heading">
        <span className="planner-form-icon">ƒx</span>
        <div>
          <strong>Yeni bir görev oluştur</strong>
          <span>Bugün ne çalışacaksın?</span>
        </div>
        <span className="planner-form-hint">Hızlı ekle</span>
        <button type="button" className="planner-quick-btn">+20 Paragraf</button>
        <button type="button" className="planner-quick-btn planner-quick-btn-purple">+15 Math</button>
        <span className="planner-advanced">☷ Gelişmiş detaylar</span>
      </div>
      <input
        type="time"
        className="planner-time"
        title="Saat"
        value={newTaskTime}
        onChange={(e) => setNewTaskTime(e.target.value)}
      />
      <select
        className="planner-select"
        title="Ders seç"
        value={newTaskClass}
        onChange={(e) => setNewTaskClass(e.target.value as SubjectCategory)}
      >
        {SUBJECTS.map((subject) => (
          <option key={subject} value={subject}>
            {CLASS_ICONS[subject]} {subject}
          </option>
        ))}
      </select>
      <select
        className="planner-select narrow"
        title="Öncelik"
        value={newTaskPriority}
        onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
      >
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {PRIORITY_ICONS[p]}{' '}
            {p === 'high' ? 'Yüksek' : p === 'medium' ? 'Orta' : 'Düşük'}
          </option>
        ))}
      </select>
      <select
        className="planner-select narrow"
        title="Kategori"
        value={newTaskCategory}
        onChange={(e) => setNewTaskCategory(e.target.value as TaskCategory)}
      >
        <option value="">Kategori</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {CATEGORY_LABELS[c]}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="planner-duration"
        placeholder="dk"
        title="Süre (dk)"
        min={1}
        max={600}
        value={newTaskDuration}
        onChange={(e) => setNewTaskDuration(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ne çalışacaksın? (örn. Türev konusu, 20 soru...)"
        autoComplete="off"
        required
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button type="submit" className="planner-add-btn">
        ➕ Ekle
      </button>
    </form>
  );

  const renderTaskList = (): ReactElement => {
    if (sortedTasks.length === 0) {
      return (
        <div className="planner-empty">
          Bu gün için görev eklenmemiş. Yukarıdan görev ekleyebilirsin! 📋
        </div>
      );
    }

    return (
      <div className="planner-tasks">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`planner-task ${task.done ? 'done' : ''}`}
          >
            <div
              className="planner-task-check"
              onClick={() => handleToggleDone(task.id)}
              role="button"
              aria-label={
                task.done ? 'Tamamlandı olarak işle' : 'Tamamlandı işaretle'
              }
            >
              ✓
            </div>
            <span className="planner-task-time">{task.time || '09:00'}</span>
            <span className="planner-task-class">
              {CLASS_ICONS[task.class as SubjectCategory] || '📚'}
            </span>
            <span className={`task-priority ${task.priority || 'medium'}`}>
              {PRIORITY_ICONS[task.priority || 'medium']}
            </span>
            <span className="planner-task-title">{task.title}</span>
            {task.duration && (
              <span className="planner-task-duration">
                {task.duration} dk
              </span>
            )}
            <button
              type="button"
              className="planner-task-edit"
              title="Düzenle"
              onClick={() => handleEditTask(task)}
            >
              ✏️
            </button>
            <button
              type="button"
              className="planner-task-delete"
              title="Sil"
              onClick={() => handleDeleteTask(task.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderEditForm = (): ReactElement => (
    <form
      className="planner-edit-form"
      style={{ display: editingTask ? 'flex' : 'none' }}
      onSubmit={handleUpdateTask}
    >
      <input
        type="text"
        placeholder="Görev başlığı"
        required
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <input
        type="time"
        value={editTime}
        onChange={(e) => setEditTime(e.target.value)}
      />
      <select
        value={editClass}
        onChange={(e) => setEditClass(e.target.value as SubjectCategory)}
      >
        {SUBJECTS.map((subject) => (
          <option key={subject} value={subject}>
            {CLASS_ICONS[subject]} {subject}
          </option>
        ))}
      </select>
      <select
        value={editPriority}
        onChange={(e) => setEditPriority(e.target.value as TaskPriority)}
      >
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {PRIORITY_ICONS[p]}{' '}
            {p === 'high' ? 'Yüksek' : p === 'medium' ? 'Orta' : 'Düşük'}
          </option>
        ))}
      </select>
      <button type="submit" className="planner-add-btn">
        💾 Kaydet
      </button>
      <button
        type="button"
        className="planner-cancel-btn"
        onClick={handleCancelEdit}
      >
        İptal
      </button>
    </form>
  );

  const renderPomodoro = (): ReactElement => {
    const modeLabel = pomodoro.isBreak
      ? '🌟 Mola zamanı ☕'
      : 'Odaklanma zamanı 💪';
    const display = formatTime(pomodoro.seconds);

    return (
      <div className="pomodoro-box">
        <div className="pomodoro-header">
          <span className="pomodoro-icon">🍅</span>
          <span className="pomodoro-title">Pomodoro Zamanlayıcı</span>
        </div>
        <div className="pomodoro-display">{display}</div>
        <div className="pomodoro-controls">
          <button
            type="button"
            className="pomodoro-btn start"
            onClick={handleStartPomodoro}
          >
            {pomodoro.running ? '⏸️ Duraklat' : '▶️ Başlat'}
          </button>
          <button
            type="button"
            className="pomodoro-btn reset"
            onClick={handleResetPomodoro}
          >
            🔄 Sıfırla
          </button>
        </div>
        <div className="pomodoro-mode">{modeLabel}</div>
      </div>
    );
  };

  return (
    <div className="planner-view">
      <div className="planner-header">
        <div className="planner-avatar">📅</div>
        <div className="planner-header-text">
          <h2>Günlük Planlayıcı</h2>
          <p>
            Günlerini düzenle, rutinini planla ve hedeflerine adım adım
            ulaş.
          </p>
        </div>
      </div>

      {renderQuote()}
      {renderStats()}
      {renderDays()}

      {renderTaskForm()}
      {renderTaskList()}
      <div className="planner-reschedule">
        <span className="planner-reschedule-icon">↻</span>
        <div>
          <strong>Bitmemiş görevleri yarına taşı</strong>
          <span>Günü tamamlamak için kalan görevleri yarına planla</span>
        </div>
        <button type="button">↻ Yeniden planla</button>
      </div>
      {renderEditForm()}
      {renderPomodoro()}
    </div>
  );
}
