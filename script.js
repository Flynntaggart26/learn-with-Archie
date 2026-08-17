// ===== Learn with Archie - TYT & AYT Yol Haritası =====

import { CURRICULUM } from './curriculum-data.js';

// ===== Curriculum Data =====

const CLASS_ICONS = {
  Matematik: '📐',
  Geometri: '📐',
  Türkçe: '📝',
  Edebiyat: '📚',
  Fizik: '🔬',
  Kimya: '🧪',
  Biyoloji: '🧬',
  Tarih: '📜',
  'Coğrafya': '🌍',
  Felsefe: '🧠',
  'Din Kültürü': '☪️',
};

const SUBJECTS = Object.keys(CURRICULUM.tyt);

// ===== SM-2 Algorithm =====
function sm2Review(quality, repetitions, easinessFactor, intervalDays) {
  const q = Math.min(5, Math.max(0, Math.round(quality)));

  if (q < 3) {
    return {
      repetitions: 0,
      intervalDays: 1,
      easinessFactor: Math.max(1.3, easinessFactor),
      nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
  }

  const updatedEF = Math.min(
    2.5,
    Math.max(
      1.3,
      easinessFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)),
    ),
  );

  let nextInterval;
  if (repetitions === 0) {
    nextInterval = 1;
  } else if (repetitions === 1) {
    nextInterval = 6;
  } else {
    nextInterval = Math.round(intervalDays * updatedEF);
  }

  const nextRepetitions = repetitions + 1;
  const nextReviewDate = new Date(
    Date.now() + nextInterval * 24 * 60 * 60 * 1000,
  );

  return {
    repetitions: nextRepetitions,
    intervalDays: nextInterval,
    easinessFactor: updatedEF,
    nextReviewDate,
  };
}

function accuracyToQuality(accuracyPercent) {
  return Math.round((Math.min(100, Math.max(0, accuracyPercent)) / 100) * 5);
}

function formatReviewDate(date) {
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ===== LocalStorage Helpers =====
const STORAGE_KEYS = {
  users: 'archie.users',
  currentUser: 'archie.currentUser',
  progress: 'archie.progress',
  reviews: 'archie.sm2.reviews',
  tasks: 'archie.tasks',
  calendarEvents: 'archie.calendarEvents',
  quizHistory: 'archie.quizHistory',
  notes: 'archie.notes',
  xp: 'archie.xp',
  ownedItems: 'archie.ownedItems',
  streak: 'archie.streak',
  pomodoro: 'archie.pomodoro',
  timerCountdown: 'archie.timerCountdown',
  timerPomodoro: 'archie.timerPomodoro',
  rewardState: 'archie.rewardState',
  theme: 'archie.theme',
  avatar: 'archie.avatar',
  displayName: 'archie.displayName',
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

const APP_SOUNDS = {
  timerStarted: 'zamanlayıcıbaşladı.mp3.mp3',
  timerFinished: 'zamanlayıcıbitti.mp3.mp3',
  correct: 'doğrubildi.mp3.mp3',
  wrong: 'yanlışbildi.mp3.mp3',
  purchase: 'mağazasatınalma.mp3.mp3',
  planAdded: 'planeklendi.mp3.mp3',
  planDeleted: 'plansilme.mp3.mp3',
  click: 'tuştıklama.mp3.mp3',
};

function playAppSound(soundName) {
  const filename = APP_SOUNDS[soundName];
  if (!filename) return;
  const audio = new Audio(`/sounds/${encodeURIComponent(filename)}`);
  audio.volume = .75;
  audio.play().catch(() => {
    // Browsers can block playback until a user gesture is available.
  });
}

function handleGlobalClickSound(event) {
  const target = event.target.closest?.('button, a, [role="button"], input[type="button"], input[type="submit"]');
  if (!target || target.disabled) return;
  if (target.matches('.quiz-option, #timerPomodoroStart, .store-buy-btn, .planner-task-delete')) return;
  playAppSound('click');
}

// ===== App State =====
let AppState = {
  currentUser: readStorage(STORAGE_KEYS.displayName, 'Öğrenci'),
  currentUserEmail: readStorage(STORAGE_KEYS.currentUser, ''),
  xp: readStorage(STORAGE_KEYS.xp, 0),
  activeLevel: 'tyt',
  activeTopic: null,
  activeSubject: null,
  chatHistory: [],
  weakConcepts: [],
  activePage: 'dashboard',
  selectedAvatar: readStorage(STORAGE_KEYS.avatar, '👤'),
  streak: readStorage(STORAGE_KEYS.streak, 0),
};

function getRewardState() {
  return readStorage(STORAGE_KEYS.rewardState, {
    breakTimeBonus: 0,
    xpMultiplier: 1,
    freezeUntil: 0,
    streakFreezeCount: 0,
    premiumExpiresAt: 0,
    nightTheme: false,
    jokerAvailable: 0,
  });
}

function saveRewardState(state) {
  writeStorage(STORAGE_KEYS.rewardState, state);
  applyRewardState(state);
}

function applyRewardState(state = getRewardState()) {
  document.body.classList.toggle('night-aquarium-theme', Boolean(state.nightTheme));
  const premiumActive = Number(state.premiumExpiresAt) > Date.now();
  const status = $('sidebarUserStatus');
  if (status) status.textContent = premiumActive ? 'Efsanevi Balina · Premium' : 'Premium · 12. Sınıf';
  const card = $('sidebarProfileCard');
  if (card) card.classList.toggle('legendary-profile', premiumActive);
}

function ensureDailyStreakFreeze() {
  const state = getRewardState();
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastActiveDate && state.lastActiveDate !== today && state.streakFreezeCount > 0) {
    state.streakFreezeCount -= 1;
    state.lastActiveDate = today;
    saveRewardState(state);
    showToast('Seri Dondurucu kullanıldı, serin korundu!');
    return;
  }
  if (state.lastActiveDate !== today) {
    state.lastActiveDate = today;
    writeStorage(STORAGE_KEYS.rewardState, state);
  }
}

// ===== Utility =====
function $(id) {
  return document.getElementById(id);
}

function getAllTopics() {
  const all = [];
  for (const level of ['tyt', 'ayt']) {
    for (const subject of Object.keys(CURRICULUM[level])) {
      for (const topic of CURRICULUM[level][subject]) {
        all.push({ ...topic, level, subject });
      }
    }
  }
  return all;
}

function getSubtopics(topic) {
  if (topic.subtopics && topic.subtopics.length > 0) {
    return topic.subtopics;
  }
  // Generate default subtopics based on topic name
  return [`${topic.name} - Temel Kavramlar`, `${topic.name} - Örnek Sorular`, `${topic.name} - Test`];
}

function getProgress() {
  return readStorage(STORAGE_KEYS.progress, {});
}

function saveProgress(progress) {
  writeStorage(STORAGE_KEYS.progress, progress);
}

function getMasteryPercent(topicId) {
  const progress = getProgress();
  const entry = progress[topicId];
  if (!entry || entry.total === 0) return 0;
  const rawAccuracy = (entry.correct / entry.total) * 100;
  return Math.round(rawAccuracy);
}

function getMasteryLabel(percent) {
  if (percent >= 70) return 'Güçlü';
  if (percent >= 40) return 'Gelişiyor';
  if (percent > 0) return 'Zayıf';
  return 'Çözülmedi';
}

function masteryColor(percent) {
  if (percent >= 70) return '#58cc02';
  if (percent >= 40) return '#ffc800';
  return '#ff4b4b';
}

function addXp(amount) {
  AppState.xp += amount;
  writeStorage(STORAGE_KEYS.xp, AppState.xp);
  updateXpDisplay();
}

function updateXpDisplay() {
  const topbarXp = $('topbarXpValue');
  const storeXp = $('storeXpDisplay');
  const dashXp = $('dashXp');
  if (topbarXp) topbarXp.textContent = AppState.xp;
  if (storeXp) storeXp.textContent = AppState.xp;
  if (dashXp) dashXp.textContent = AppState.xp;
}

// ===== Auth =====
const AVATARS = ['👤', '👨‍🎓', '👩‍🎓', '🧑‍💻', '🐱', '🐶', '🦊', '🐼', '🦁', '🐸'];

function getUsers() {
  return readStorage(STORAGE_KEYS.users, {});
}

function saveUser(email, user) {
  const users = getUsers();
  users[email] = user;
  writeStorage(STORAGE_KEYS.users, users);
  writeStorage(STORAGE_KEYS.currentUser, email);
  writeStorage(STORAGE_KEYS.displayName, user.displayName || email.split('@')[0]);
  writeStorage(STORAGE_KEYS.avatar, user.avatar || '👤');
  AppState.currentUser = user.displayName || email.split('@')[0];
  AppState.currentUserEmail = email;
  AppState.selectedAvatar = user.avatar || '👤';
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
  localStorage.removeItem(STORAGE_KEYS.displayName);
  localStorage.removeItem(STORAGE_KEYS.avatar);
  AppState.currentUser = 'Öğrenci';
  AppState.currentUserEmail = '';
  AppState.selectedAvatar = '👤';
  showAuthOverlay();
}

function showAuthOverlay() {
  const overlay = document.querySelector('.auth-overlay');
  if (overlay) overlay.classList.remove('hidden');
}

function hideAuthOverlay() {
  const overlay = document.querySelector('.auth-overlay');
  if (overlay) overlay.classList.add('hidden');
}

function initAuth() {
  // Add auth overlay HTML if not present
  if (!document.querySelector('.auth-overlay')) {
    const authHTML = `
      <div class="auth-overlay" id="authOverlay">
        <div class="auth-card">
          <div class="auth-logo">
            <svg viewBox="0 0 48 48" class="logo-icon">
              <circle cx="24" cy="24" r="22" fill="#58cc02"/>
              <text x="24" y="31" text-anchor="middle" font-size="20" font-weight="bold" fill="white" font-family="sans-serif">📚</text>
            </svg>
            <h1>Learn with Archie</h1>
          </div>
          <div class="auth-tabs">
            <button type="button" class="auth-tab active" data-mode="signin">Giriş Yap</button>
            <button type="button" class="auth-tab" data-mode="signup">Kayıt Ol</button>
          </div>
          <form class="auth-form">
            <div class="auth-display-field" style="display:none;">
              <label>Ad Soyad</label>
              <input type="text" id="authDisplayName" placeholder="Adınız soyadınız">
            </div>
            <label>E-posta</label>
            <input type="email" id="authEmail" placeholder="ornek@mail.com" required>
            <label>Şifre</label>
            <input type="password" id="authPassword" placeholder="En az 6 karakter" minlength="6" required>
            <div class="auth-error"></div>
            <div class="auth-label" style="font-size:13px;font-weight:800;color:var(--text);margin-top:12px;">Avatar Seç</div>
            <div class="auth-avatars"></div>
            <button type="submit" class="auth-btn">Giriş Yap</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', authHTML);
  }

  const overlay = document.querySelector('.auth-overlay');
  if (!overlay) return;

  const authTabs = overlay.querySelectorAll('.auth-tab');
  authTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.mode;
      authTabs.forEach((t) => t.classList.toggle('active', t === tab));
      const displayField = overlay.querySelector('.auth-display-field');
      if (displayField) displayField.style.display = mode === 'signup' ? '' : 'none';
      const submitBtn = overlay.querySelector('.auth-btn');
      if (submitBtn) submitBtn.textContent = mode === 'signup' ? 'Kayıt Ol' : 'Giriş Yap';
      const passwordInput = overlay.querySelector('#authPassword');
      if (passwordInput) passwordInput.placeholder = mode === 'signup' ? 'En az 6 karakter' : 'Şifren';
    });
  });

  const avatarContainer = overlay.querySelector('.auth-avatars');
  if (avatarContainer) {
    AVATARS.forEach((avatar) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'auth-avatar';
      btn.textContent = avatar;
      btn.dataset.avatar = avatar;
      btn.addEventListener('click', () => {
        avatarContainer.querySelectorAll('.auth-avatar').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        AppState.selectedAvatar = avatar;
      });
      avatarContainer.appendChild(btn);
    });
  }

  const form = overlay.querySelector('.auth-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('#authEmail');
      const passwordInput = form.querySelector('#authPassword');
      const displayInput = form.querySelector('#authDisplayName');
      const email = emailInput?.value.trim() || '';
      const password = passwordInput?.value || '';
      const displayName = displayInput?.value.trim() || email.split('@')[0];
      const errorEl = overlay.querySelector('.auth-error');

      if (!email || !email.includes('@')) {
        if (errorEl) errorEl.textContent = 'Geçerli bir e-posta girin.';
        return;
      }
      if (password.length < 6) {
        if (errorEl) errorEl.textContent = 'Şifre en az 6 karakter olmalı.';
        return;
      }

      const users = getUsers();
      const isSignup = overlay.querySelector('.auth-tab.active')?.dataset.mode === 'signup';

      if (isSignup) {
        if (users[email]) {
          if (errorEl) errorEl.textContent = 'Bu e-posta zaten kayıtlı. Giriş yapın.';
          return;
        }
        saveUser(email, {
          email,
          displayName,
          password,
          avatar: AppState.selectedAvatar,
          createdAt: new Date().toISOString(),
        });
      } else {
        if (!users[email] || users[email].password !== password) {
          if (errorEl) errorEl.textContent = 'E-posta veya şifre hatalı.';
          return;
        }
        saveUser(email, users[email]);
      }

      if (errorEl) errorEl.textContent = '';
      hideAuthOverlay();
      renderAll();
      showPage('dashboard');
    });
  }
}

// ===== Page Navigation =====
function showPage(page) {
  if (page !== 'timer') stopTimerPageIntervals();
  document.querySelectorAll('.dashboard-container, .controls, .roadmap-container, .selection-container, .chat-container, .quiz-container, .planner-container, .profile-container, .store-container, .timer-container').forEach((el) => {
    el.style.display = 'none';
  });

  AppState.activePage = page;

  if (page === 'dashboard') {
    if ($('dashboardContainer')) $('dashboardContainer').style.display = '';
    renderDashboard();
  } else if (page === 'teacher') {
    if ($('teacherSelection')) $('teacherSelection').style.display = '';
    renderTeacherSelection();
  } else if (page === 'student') {
    if ($('studentSelection')) $('studentSelection').style.display = '';
    renderStudentSelection();
  } else if (page === 'quiz') {
    if ($('quizContainer')) $('quizContainer').style.display = '';
    initQuizPage();
  } else if (page === 'planner') {
    if ($('plannerContainer')) $('plannerContainer').style.display = '';
    renderPlannerPage();
  } else if (page === 'profile') {
    if ($('profileContainer')) $('profileContainer').style.display = '';
    renderProfilePage();
  } else if (page === 'store') {
    if ($('storeContainer')) $('storeContainer').style.display = '';
    renderStorePage();
  } else if (page === 'timer') {
    if ($('timerContainer')) $('timerContainer').style.display = '';
    initTimerPage();
  }

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  closeAllDropdowns();
  window.scrollTo(0, 0);
}

function initNavigation() {
  document.addEventListener('click', handleGlobalClickSound, true);
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) showPage(page);
    });
  });

  document.querySelectorAll('.dash-action-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page) showPage(page);
    });
  });

  const profileCard = $('sidebarProfileCard');
  if (profileCard) {
    profileCard.onclick = () => showPage('profile');
    profileCard.onkeydown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showPage('profile');
      }
    };
  }

  const coursesBtn = $('coursesBtn');
  if (coursesBtn) {
    coursesBtn.addEventListener('click', () => showPage('dashboard'));
  }

  const logoutBtn = $('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
  }
}

// ===== Theme Toggle =====
function initTheme() {
  const toggle = $('themeToggle');
  if (!toggle) return;

  const savedTheme = readStorage(STORAGE_KEYS.theme, 'light');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = toggle.querySelector('.theme-icon');
    if (icon) icon.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    writeStorage(STORAGE_KEYS.theme, isDark ? 'dark' : 'light');
    const icon = toggle.querySelector('.theme-icon');
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
  });
}

// ===== Dashboard =====
function renderDashboard() {
  ensureDailyStreakFreeze();
  applyRewardState();
  const progress = getProgress();
  const allTopics = getAllTopics();
  const completedCount = Object.values(progress).filter((p) => p.total > 0).length;
  const totalCount = allTopics.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const weakCount = allTopics.filter((t) => {
    const p = progress[t.id];
    return p && p.total > 0 && (p.correct / p.total) < 0.5;
  }).length;

  if ($('dashUserName')) $('dashUserName').textContent = AppState.currentUser;
  if ($('sidebarUserName')) $('sidebarUserName').textContent = AppState.currentUser;
  const sidebarAvatar = document.querySelector('.sidebar-profile-avatar');
  if (sidebarAvatar) sidebarAvatar.textContent = AppState.selectedAvatar;
  if ($('dashCompleted')) $('dashCompleted').textContent = completedCount;
  if ($('dashTotal')) $('dashTotal').textContent = totalCount;
  if ($('dashPct')) $('dashPct').textContent = `${pct}%`;
  if ($('dashPct2')) $('dashPct2').textContent = `${pct}%`;
  if ($('dashProgressFill')) $('dashProgressFill').style.width = `${pct}%`;
  if ($('dashXp')) $('dashXp').textContent = AppState.xp;
  if ($('topbarXpValue')) $('topbarXpValue').textContent = AppState.xp;

  // Countdown to exam (mid-June)
  const targetDate = new Date();
  targetDate.setMonth(5);
  targetDate.setDate(15);
  targetDate.setHours(10, 0, 0, 0);
  if (targetDate < new Date()) targetDate.setFullYear(targetDate.getFullYear() + 1);
  const daysLeft = Math.ceil((targetDate.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
  if ($('countdownValue')) $('countdownValue').textContent = Math.max(0, daysLeft);

  // Goals
  const goalsEl = $('dashGoals');
  if (goalsEl) {
    const goals = [
      { icon: '🗺️', text: 'Yeni konu çalış', done: completedCount > 0 },
      { icon: '📝', text: 'En az 10 soru çöz', done: pct > 0 },
      { icon: '🔁', text: 'Tekrar yap', done: false },
    ];
    goalsEl.innerHTML = goals.map((g) => `
      <div class="dash-goal-item">
        <span class="goal-icon">${g.icon}</span>
        <span class="goal-text">${g.text}</span>
        <span class="goal-status ${g.done ? 'done' : 'pending'}">${g.done ? '✓' : 'Bekliyor'}</span>
      </div>
    `).join('');
  }

  // Achievements
  const achievementsEl = $('dashAchievements');
  if (achievementsEl) {
    const achievements = [
      { icon: '🎯', name: 'İlk Adım', unlocked: completedCount >= 1 },
      { icon: '🔥', name: '5 Konu', unlocked: completedCount >= 5 },
      { icon: '💪', name: '10 Konu', unlocked: completedCount >= 10 },
      { icon: '🏆', name: '20 Konu', unlocked: completedCount >= 20 },
      { icon: '⚡', name: '100 XP', unlocked: AppState.xp >= 100 },
      { icon: '🚀', name: '250 XP', unlocked: AppState.xp >= 250 },
    ];
    achievementsEl.innerHTML = achievements.map((a) => `
      <div class="dash-achievement ${a.unlocked ? 'unlocked' : 'locked'}">
        <div class="dash-achievement-icon">${a.icon}</div>
        <div class="dash-achievement-name">${a.name}</div>
      </div>
    `).join('');
  }

  // Notes
  const notesEl = $('dashNotes');
  if (notesEl) {
    const notes = readStorage(STORAGE_KEYS.notes, []);
    notesEl.innerHTML = notes.length === 0
      ? '<p style="color:var(--text-light);font-size:13px;">Henüz not eklemedin.</p>'
      : notes.slice(0, 3).map((n) => `
          <div class="dash-note-item">
            <span class="note-icon">📝</span>
            <span class="note-text">${n.text}</span>
            <span class="note-date">${n.date}</span>
          </div>
        `).join('');
  }

  // Analytics
  const analyticsEl = $('dashAnalytics');
  if (analyticsEl) {
    const attempted = allTopics.filter((t) => progress[t.id]?.total > 0);
    const avg = attempted.length > 0
      ? Math.round(attempted.reduce((sum, t) => sum + (progress[t.id].correct / progress[t.id].total) * 100, 0) / attempted.length)
      : 0;
    const completed = Math.max(0, completedCount);
    const remaining = Math.max(0, totalCount - completed);
    const maxBar = Math.max(1, avg, AppState.streak * 10, pct);
    const bars = [
      { label: 'Pzt', value: Math.round(avg * 0.62) },
      { label: 'Sal', value: Math.round(avg * 0.84) },
      { label: 'Çar', value: Math.round(avg * 0.5) },
      { label: 'Per', value: Math.round(avg * 0.96) },
      { label: 'Cum', value: Math.round(avg * 0.72) },
      { label: 'Cmt', value: Math.round(avg * 0.4) },
      { label: 'Paz', value: Math.round(avg * 0.58) },
    ];
    analyticsEl.innerHTML = `
      <div class="dash-pie-panel">
        <div class="dash-pie" style="--pie-complete:${pct}%" aria-label="${pct}% ilerleme">
          <strong>${pct}%</strong><span>ilerleme</span>
        </div>
        <div class="dash-pie-legend">
          <span><i class="legend-complete"></i>Tamamlanan <b>${completed}</b></span>
          <span><i class="legend-remaining"></i>Kalan <b>${remaining}</b></span>
        </div>
      </div>
      <div class="dash-bars-panel">
        <div class="dash-chart-caption"><span>Haftalık çalışma</span><b>%${avg} ort.</b></div>
        <div class="dash-bars">
          ${bars.map((bar, index) => `<div class="dash-bar-column"><div class="dash-bar" style="--bar-height:${Math.max(8, Math.round((bar.value / maxBar) * 100))}%; animation-delay:${index * 55}ms"></div><span>${bar.label}</span></div>`).join('')}
        </div>
      </div>
    `;
  }
}

// ===== Roadmap (Learn page) =====
let currentRoadmapLevel = 'tyt';
let currentRoadmapSubject = null;
let currentRoadmapTopic = null; // Currently selected main topic (for subtopic view)

function renderLevelTabs() {
  const levelToggle = $('levelToggle');
  if (!levelToggle) return;
  levelToggle.querySelectorAll('.level-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.level === currentRoadmapLevel);
  });
}

function renderClassSelector() {
  const classDropdown = $('classDropdown');
  if (!classDropdown) return;
  const subjectKeys = Object.keys(CURRICULUM[currentRoadmapLevel]);
  if (!currentRoadmapSubject || !subjectKeys.includes(currentRoadmapSubject)) {
    currentRoadmapSubject = subjectKeys[0];
  }
  classDropdown.innerHTML = '';
  subjectKeys.forEach((subject) => {
    const div = document.createElement('div');
    div.className = 'selector-option' + (subject === currentRoadmapSubject ? ' active' : '');
    div.dataset.subject = subject;
    div.innerHTML = `
      <span class="opt-icon">${CLASS_ICONS[subject] || '📚'}</span>
      <span class="topic-label">${subject}</span>
      <span class="check" style="${subject === currentRoadmapSubject ? '' : 'display:none'}">✓</span>
    `;
    div.addEventListener('click', () => {
      currentRoadmapSubject = subject;
      currentRoadmapTopic = null;
      const classBtn = $('classBtn');
      if (classBtn) {
        const label = classBtn.querySelector('.class-label');
        if (label) label.textContent = subject;
        const icon = classBtn.querySelector('.selector-icon');
        if (icon) icon.textContent = CLASS_ICONS[subject] || '📚';
      }
      classDropdown.querySelectorAll('.selector-option').forEach((opt) => {
        opt.classList.remove('active');
        opt.querySelector('.check').style.display = 'none';
      });
      div.classList.add('active');
      div.querySelector('.check').style.display = '';
      closeAllDropdowns();
      renderRoadmap();
    });
    classDropdown.appendChild(div);
  });

  const classBtn = $('classBtn');
  if (classBtn) {
    const label = classBtn.querySelector('.class-label');
    if (label) label.textContent = currentRoadmapSubject;
    const icon = classBtn.querySelector('.selector-icon');
    if (icon) icon.textContent = CLASS_ICONS[currentRoadmapSubject] || '📚';
  }
}

function renderTopicDropdown() {
  const topicDropdown = $('topicDropdown');
  if (!topicDropdown) return;
  topicDropdown.innerHTML = '';
  
  // If we're in subtopic view, show subtopics for the current main topic
  if (currentRoadmapTopic) {
    const topics = CURRICULUM[currentRoadmapLevel][currentRoadmapSubject] || [];
    const mainTopic = topics.find(t => t.id === currentRoadmapTopic);
    if (mainTopic && mainTopic.subtopics) {
      const groupLabel = document.createElement('div');
      groupLabel.className = 'dropdown-group-label';
      groupLabel.textContent = `${mainTopic.name} - Alt Konular`;
      topicDropdown.appendChild(groupLabel);

      mainTopic.subtopics.forEach((subtopicName, idx) => {
        const subtopicId = `${mainTopic.id}-sub-${idx}`;
        const progress = getProgress();
        const entry = progress[subtopicId];
        const isDone = entry && entry.total > 0;
        const percent = getMasteryPercent(subtopicId);
        const div = document.createElement('div');
        div.className = 'selector-option' + (isDone ? ' active' : '');
        div.dataset.topic = subtopicId;
        div.innerHTML = `
          <span class="opt-icon">📝</span>
          <span class="topic-label">${subtopicName}</span>
          ${isDone ? `<span class="topic-progress">${percent}%</span>` : ''}
        `;
        div.addEventListener('click', () => {
          openTopicModal({
            ...mainTopic,
            name: subtopicName,
            id: subtopicId,
            isSubtopic: true,
            parentTopic: mainTopic.name,
            subject: currentRoadmapSubject,
            level: currentRoadmapLevel
          });
          closeAllDropdowns();
        });
        topicDropdown.appendChild(div);
      });
    }
    return;
  }

  // Otherwise show main topics ONLY for the currently selected subject
  const subject = currentRoadmapSubject;
  if (!subject) return;
  
  const groupLabel = document.createElement('div');
  groupLabel.className = 'dropdown-group-label';
  groupLabel.textContent = subject;
  topicDropdown.appendChild(groupLabel);

  const topics = CURRICULUM[currentRoadmapLevel][subject] || [];
  topics.forEach((topic) => {
    const progress = getProgress();
    const entry = progress[topic.id];
    const isDone = entry && entry.total > 0;
    const percent = getMasteryPercent(topic.id);
    const subtopicCount = topic.subtopics ? topic.subtopics.length : 0;
    const div = document.createElement('div');
    div.className = 'selector-option' + (isDone ? ' active' : '');
    div.dataset.topic = topic.id;
    div.innerHTML = `
      <span class="opt-icon">${topic.icon}</span>
      <span class="topic-label">${topic.name}</span>
      ${isDone ? `<span class="topic-progress">${percent}%</span>` : `<span class="topic-progress" style="color:var(--text-light);background:var(--hover-bg)">${subtopicCount} alt konu</span>`}
    `;
    div.addEventListener('click', () => {
      // Navigate to subtopics in roadmap
      currentRoadmapTopic = topic.id;
      closeAllDropdowns();
      renderRoadmap();
    });
    topicDropdown.appendChild(div);
  });
}

function renderRoadmap() {
  renderLevelTabs();
  renderClassSelector();
  renderTopicDropdown();

  const roadmapEl = $('roadmap');
  if (!roadmapEl) return;

  const progress = getProgress();
  const subject = currentRoadmapSubject || Object.keys(CURRICULUM[currentRoadmapLevel])[0];
  const topics = CURRICULUM[currentRoadmapLevel][subject] || [];
  const allTopics = getAllTopics();

  // If a specific topic is selected, show its subtopics
  if (currentRoadmapTopic) {
    const mainTopic = topics.find(t => t.id === currentRoadmapTopic);
    if (!mainTopic) {
      currentRoadmapTopic = null;
      renderRoadmap();
      return;
    }
    renderSubtopicRoadmap(roadmapEl, mainTopic, progress, allTopics);
  } else {
    renderMainTopicRoadmap(roadmapEl, subject, topics, progress, allTopics);
  }
}

function renderMainTopicRoadmap(roadmapEl, subject, topics, progress, allTopics) {
  let html = `
    <div class="subject-header">
      <div class="subject-header-content">
        <span class="subject-icon">${CLASS_ICONS[subject] || '📚'}</span>
        <div class="subject-info">
          <span class="subject-name">${subject}</span>
          <span class="subject-level">${currentRoadmapLevel.toUpperCase()}</span>
        </div>
      </div>
    </div>`;

  if (topics.length === 0) {
    html += '<div class="empty-msg">Bu ders için konu bulunamadı.</div>';
  } else {
    topics.forEach((topic, idx) => {
      const entry = progress[topic.id];
      const isCompleted = entry && entry.total > 0;
      const percent = getMasteryPercent(topic.id);
      const isWeak = percent > 0 && percent < 40;

      let nodeClass = 'node locked';
      const prevTopics = topics.slice(0, idx);
      const hasPrevCompleted = idx === 0 || prevTopics.some((t) => progress[t.id]?.total > 0);
      if (isCompleted) nodeClass = 'node completed';
      else if (hasPrevCompleted) nodeClass = 'node current';
      if (isWeak) nodeClass = 'node weak';

      const offset = idx % 2 === 1 ? ' offset-right' : ' offset-left';
      const subtopicCount = topic.subtopics ? topic.subtopics.length : 0;
      const statusLabel = isCompleted ? 'Tamamlandı' : hasPrevCompleted ? 'Devam Edilebilir' : 'Kilitli';

      html += `
        <div class="node-row${offset}">
          <button class="${nodeClass}" data-topic="${topic.id}" title="${topic.name} (${subtopicCount} alt konu)">
            <span class="node-icon">${topic.icon}</span>
            <div class="node-content">
              <span class="node-title">${topic.name}</span>
              <div class="node-meta">
                ${isCompleted ? `<span class="node-progress">${percent}% • ${getMasteryLabel(percent)}</span>` : `<span class="node-status">${statusLabel}</span>`}
                ${subtopicCount > 0 ? `<span class="node-subtopic-count">${subtopicCount} alt konu</span>` : ''}
              </div>
            </div>
            ${isCompleted ? '<span class="node-check">✓</span>' : ''}
          </button>
        </div>
      `;
    });
  }

  roadmapEl.innerHTML = html;

  roadmapEl.querySelectorAll('.node').forEach((node) => {
    if (node.classList.contains('locked')) return;
    const topicId = node.dataset.topic;
    const topic = allTopics.find((t) => t.id === topicId);
    if (topic) {
      node.addEventListener('click', () => {
        // Navigate into subtopics
        currentRoadmapTopic = topicId;
        renderRoadmap();
      });
    }
  });
}

function renderSubtopicRoadmap(roadmapEl, mainTopic, progress, allTopics) {
  const subtopics = mainTopic.subtopics || [];
  const subject = currentRoadmapSubject;
  const level = currentRoadmapLevel;

  let html = `
    <div class="subject-header">
      <button class="back-btn" id="backToMainTopics" title="Ana konulara dön">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <div class="subject-header-content">
        <span class="subject-icon">${mainTopic.icon}</span>
        <div class="subject-info">
          <span class="subject-name">${mainTopic.name}</span>
          <span class="subject-level">${level.toUpperCase()} • ${subject}</span>
        </div>
      </div>
    </div>`;

  if (subtopics.length === 0) {
    html += '<div class="empty-msg">Bu konu için alt konu bulunamadı.</div>';
  } else {
    subtopics.forEach((subtopicName, idx) => {
      // Create a unique ID for subtopic progress tracking
      const subtopicId = `${mainTopic.id}-sub-${idx}`;
      const entry = progress[subtopicId];
      const isCompleted = entry && entry.total > 0;
      const percent = getMasteryPercent(subtopicId);
      const isWeak = percent > 0 && percent < 40;

      let nodeClass = 'node locked';
      const prevSubtopics = subtopics.slice(0, idx);
      const hasPrevCompleted = idx === 0 || prevSubtopics.some((st, i) => {
        const stId = `${mainTopic.id}-sub-${i}`;
        return progress[stId]?.total > 0;
      });
      if (isCompleted) nodeClass = 'node completed';
      else if (hasPrevCompleted) nodeClass = 'node current';
      if (isWeak) nodeClass = 'node weak';

      const offset = idx % 2 === 1 ? ' offset-right' : ' offset-left';
      const statusLabel = isCompleted ? 'Tamamlandı' : hasPrevCompleted ? 'Devam Edilebilir' : 'Kilitli';

      html += `
        <div class="node-row${offset}">
          <button class="${nodeClass}" data-subtopic="${subtopicId}" title="${subtopicName}">
            <span class="node-icon">📝</span>
            <div class="node-content">
              <span class="node-title">${subtopicName}</span>
              <div class="node-meta">
                ${isCompleted ? `<span class="node-progress">${percent}% • ${getMasteryLabel(percent)}</span>` : `<span class="node-status">${statusLabel}</span>`}
              </div>
            </div>
            ${isCompleted ? '<span class="node-check">✓</span>' : ''}
          </button>
        </div>
      `;
    });
  }

  roadmapEl.innerHTML = html;

  // Back button handler
  const backBtn = $('backToMainTopics');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      currentRoadmapTopic = null;
      renderRoadmap();
    });
  }

  // Subtopic click handlers
  roadmapEl.querySelectorAll('.node').forEach((node) => {
    if (node.classList.contains('locked')) return;
    const subtopicId = node.dataset.subtopic;
    node.addEventListener('click', () => {
      // Open modal for subtopic
      const parts = subtopicId.split('-sub-');
      const mainTopicId = parts[0];
      const subIdx = parseInt(parts[1]);
      const mainTopic = allTopics.find(t => t.id === mainTopicId);
      if (mainTopic && mainTopic.subtopics && mainTopic.subtopics[subIdx]) {
        openTopicModal({
          ...mainTopic,
          name: mainTopic.subtopics[subIdx],
          id: subtopicId,
          isSubtopic: true,
          parentTopic: mainTopic.name
        });
      }
    });
  });
}

// ===== Dropdowns =====
function closeAllDropdowns() {
  document.querySelectorAll('.selector-dropdown').forEach((dd) => dd.classList.remove('show'));
  document.querySelectorAll('.selector-btn').forEach((btn) => btn.classList.remove('open'));
}

function initDropdowns() {
  document.querySelectorAll('.selector-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.parentElement.querySelector('.selector-dropdown');
      const isOpen = dropdown.classList.contains('show');
      closeAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add('show');
        btn.classList.add('open');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      closeAllDropdowns();
    }
  });
}

// ===== Level Buttons =====
function initLevelButtons() {
  document.querySelectorAll('.level-toggle').forEach((toggle) => {
    toggle.querySelectorAll('.level-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.level;
        toggle.querySelectorAll('.level-btn').forEach((b) => b.classList.toggle('active', b === btn));

        if (toggle.id === 'levelToggle') {
          currentRoadmapLevel = level;
          currentRoadmapSubject = null;
          currentRoadmapTopic = null;
          renderRoadmap();
        } else if (toggle.id === 'quizLevelToggle') {
          AppState.activeLevel = level;
          refreshQuizTopicSelect(level);
        } else if (toggle.id === 'teacherLevelToggle') {
          AppState.activeLevel = level;
          renderTeacherTopics();
        } else if (toggle.id === 'studentLevelToggle') {
          AppState.activeLevel = level;
          renderStudentTopics();
        }
      });
    });
  });
}

// ===== Modal =====
function openTopicModal(topic) {
  const backdrop = $('modalBackdrop');
  const modalContent = $('modalContent');
  const completeBtn = $('completeBtn');
  const modalClose = $('modalClose');
  if (!backdrop || !modalContent) return;

  const progress = getProgress();
  const entry = progress[topic.id];
  const isDone = entry && entry.total > 0;
  const percent = getMasteryPercent(topic.id);

  const isSubtopic = topic.isSubtopic === true;
  const subtopics = isSubtopic ? [] : getSubtopics(topic);
  const subtopicItems = subtopics.map((st) => `<li>• ${st}</li>`).join('');

  modalContent.innerHTML = `
    <div class="modal-icon">${topic.icon}</div>
    <h2>${topic.name}${isSubtopic ? ` <span style="font-size:12px;color:var(--text-light);font-weight:400;">(${topic.parentTopic})</span>` : ''}</h2>
    <p class="modal-sub">${topic.subject} • ${topic.level.toUpperCase()}${isSubtopic ? ' • Alt Konu' : ''}</p>
    ${percent > 0 ? `
      <p style="margin-bottom:16px;color:var(--green);font-weight:800;">
        Ustalık: %${percent} (${getMasteryLabel(percent)})
      </p>
    ` : ''}
    <ul class="topic-list">
      <li>Konu: ${topic.name}</li>
      ${isSubtopic ? `<li>Ana Konu: ${topic.parentTopic}</li>` : ''}
      <li>Ders: ${topic.subject}</li>
      <li>Seviye: ${topic.level.toUpperCase()}</li>
    </ul>
    ${!isSubtopic && subtopics.length > 0 ? `
    <div style="margin-top:16px;text-align:left;">
      <div style="font-size:14px;font-weight:800;color:var(--text);margin-bottom:8px;">📋 Alt Konular:</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${subtopicItems}
      </div>
    </div>
    ` : ''}
  `;

  completeBtn.textContent = isDone ? '✓ Tamamlandı' : 'Tamamlandı ✓';
  completeBtn.classList.toggle('done', isDone);
  completeBtn.disabled = isDone;
  completeBtn.onclick = () => {
    if (!entry || entry.total === 0) {
      const newProgress = getProgress();
      newProgress[topic.id] = { total: 1, correct: 1 };
      saveProgress(newProgress);
      addXp(10);
      renderRoadmap();
      renderDashboard();
      closeModal();
    }
  };

  if (modalClose) {
    modalClose.onclick = closeModal;
  }

  backdrop.classList.add('show');
}

function closeModal() {
  const backdrop = $('modalBackdrop');
  if (backdrop) backdrop.classList.remove('show');
}

function initModal() {
  const backdrop = $('modalBackdrop');
  if (!backdrop) return;
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
  const closeBtn = $('modalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
}

// ===== Quiz System =====
const QUESTION_BANK = {
  'ayt-turev': [
    { prompt: 'f(x) = x³ ise f\'(x) nedir?', options: ['3x²', 'x²', '3x', 'x³/3'], answer: 0 },
    { prompt: 'Sabit sayının türevi kaçtır?', options: ['1', '0', 'Kendisi', 'Tanımsız'], answer: 1 },
    { prompt: 'f(x) = 5x ise f\'(x) nedir?', options: ['0', '5', '5x', 'x'], answer: 1 },
    { prompt: 'Türevin geometrik anlamı nedir?', options: ['Alan', 'Teğet doğrusunun eğimi', 'Hacim', 'Uzunluk'], answer: 1 },
    { prompt: 'f(x) = x² + 2x ise f\'(2) kaçtır?', options: ['6', '4', '8', '2'], answer: 0 },
  ],
  'ayt-integral': [
    { prompt: '∫x² dx ifadesi aşağıdakilerden hangisidir?', options: ['x³/3 + C', 'x³ + C', '2x + C', 'x + C'], answer: 0 },
    { prompt: '∫1 dx ifadesi nedir?', options: ['x + C', '0', '1', 'ln(x) + C'], answer: 0 },
    { prompt: 'Türevi f(x) olan fonksiyona ne denir?', options: ['İntegral', 'Limit', 'Türev', 'Belirsiz integral'], answer: 3 },
    { prompt: 'Belirli integral hangi kavramı hesaplar?', options: ['Alan', 'Eğim', 'Hız', 'Türev'], answer: 0 },
    { prompt: '∫(2x) dx ifadesi nedir?', options: ['x² + C', '2x² + C', 'x + C', '2 + C'], answer: 0 },
  ],
  'ayt-polinomlar': [
    { prompt: 'P(x) = 2x + 3 ise P(1) kaçtır?', options: ['5', '4', '6', '3'], answer: 0 },
    { prompt: 'Bir polinomun derecesi 3 ise en yüksek üssü kaçtır?', options: ['3', '2', '1', '4'], answer: 0 },
    { prompt: 'P(x) = x² - 4 polinomunun kökleri nelerdir?', options: ['±2', '±4', '0 ve 2', '2 ve 4'], answer: 0 },
    { prompt: 'P(x) polinomunda x yerine yazılan değer hangi kavramı verir?', options: ['Polinom değeri', 'Türev', 'İntegral', 'Limit'], answer: 0 },
    { prompt: 'Kalan teoremi hangi konuyla ilgilidir?', options: ['Polinom bölme', 'İntegral', 'Trigonometri', 'Logaritma'], answer: 0 },
  ],
  'tyt-fonksiyonlar': [
    { prompt: 'f(x) = 2x + 3 ise f(5) kaçtır?', options: ['13', '10', '15', '8'], answer: 0 },
    { prompt: 'Hangisi bir fonksiyondur?', options: ['Her x için iki farklı değer döndüren', 'Her x için tek değer döndüren', 'Hiç değer döndürmeyen', 'Sadece bir x için tanımlanan'], answer: 1 },
    { prompt: 'f(x) = x² ise f(-3) kaçtır?', options: ['9', '-9', '6', '3'], answer: 0 },
    { prompt: 'Bileşke fonksiyonda (f∘g)(x) neyi ifade eder?', options: ['f(g(x))', 'g(f(x))', 'f(x)+g(x)', 'f(x)·g(x)'], answer: 0 },
    { prompt: 'f(x) = 3x - 1 ise f⁻¹(x) nedir?', options: ['(x+1)/3', '3x+1', '(x-1)/3', 'x/3 - 1'], answer: 0 },
  ],
  'tyt-paragraf': [
    { prompt: 'Paragrafta ana fikir nerede aranır?', options: ['İlk cümle', 'Son cümle', 'Paragrafın bütününde', 'Altta'], answer: 2 },
    { prompt: 'Paragraf sorularında en önemli beceri hangisidir?', options: ['Hızlı okuma', 'Anlama ve yorumlama', 'Ezber', 'Tahmin'], answer: 1 },
    { prompt: 'Bir paragrafta yardımcı fikirler ne işe yarar?', options: ['Ana fikri destekler', 'Konuyu değiştirir', 'Paragrafı uzatır', 'Okuyucuyu şaşırtır'], answer: 0 },
  ],
  'tyt-hucre': [
    { prompt: 'Hücrenin yönetici molekülü hangisidir?', options: ['DNA', 'Protein', 'Karbonhidrat', 'Lipit'], answer: 0 },
    { prompt: 'Mitokondri hangi olayı gerçekleştirir?', options: ['Fotosentez', 'Hücresel solunum', 'Protein sentezi', 'Hücre bölünmesi'], answer: 1 },
    { prompt: 'Prokaryot hücrede çekirdek var mıdır?', options: ['Yoktur', 'Vardır', 'Bazen vardır', 'Sadece gece vardır'], answer: 0 },
  ],
  'tyt-hareket': [
    { prompt: 'Hız birimi hangisidir?', options: ['m/s', 'm', 's', 'm/s²'], answer: 0 },
    { prompt: 'İvme hangi büyüklüğün değişimidir?', options: ['Hız', 'Yol', 'Zaman', 'Kütle'], answer: 0 },
    { prompt: 'Düzgün doğrusal hareket yapan cismin hızı nasıldır?', options: ['Sabittir', 'Artar', 'Azalır', 'Değişkendir'], answer: 0 },
  ],
};

const FALLBACK_QUESTIONS = [
  { prompt: 'Hangisi bir fonksiyondur?', options: ['Her x için iki değer döndüren', 'Her x için tek değer döndüren', 'Değer döndürmeyen', 'Sadece bir x için tanımlanan'], answer: 1 },
  { prompt: 'Bir konunun ön koşulu tamamlanmadan o konuya geçilirse ne olur?', options: ['Zayıf kalınır', 'Her şey iyi gider', 'Konu kolaylaşır', 'Fark etmez'], answer: 0 },
  { prompt: 'Düzenli tekrar neden önemlidir?', options: ['Kalıcı öğrenme sağlar', 'Zaman kaybıdır', 'Sadece sınavda işe yarar', 'Önemi yoktur'], answer: 0 },
  { prompt: 'Öğrenmede en etkili yöntem hangisidir?', options: ['Aktif soru çözme', 'Sadece dinleme', 'Sadece okuma', 'Hiçbiri'], answer: 0 },
  { prompt: 'Konu çalışırken not almak neden faydalıdır?', options: ['Tekrarı kolaylaştırır', 'Zaman kaybıdır', 'Gerek yoktur', 'Kafa karıştırır'], answer: 0 },
];

function getQuestionsForTopic(topicId) {
  return QUESTION_BANK[topicId] || FALLBACK_QUESTIONS;
}

let quizState = {
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  selectedOption: null,
  topicId: null,
};

function refreshQuizTopicSelect(level) {
  const topicSelect = $('quizTopicSelect');
  if (!topicSelect) return;
  topicSelect.innerHTML = '';
  const topics = getAllTopics().filter((t) => t.level === level);
  topics.forEach((topic) => {
    const opt = document.createElement('option');
    opt.value = topic.id;
    opt.textContent = `${topic.subject} • ${topic.name}`;
    topicSelect.appendChild(opt);
  });
}

function initQuizPage() {
  const topicSelect = $('quizTopicSelect');
  if (!topicSelect) return;

  topicSelect.innerHTML = '';
  const allTopics = getAllTopics();
  allTopics.forEach((topic) => {
    const opt = document.createElement('option');
    opt.value = topic.id;
    opt.textContent = `${topic.subject} • ${topic.name}`;
    topicSelect.appendChild(opt);
  });

  const startBtn = $('quizStartBtn');
  if (startBtn) {
    startBtn.onclick = () => {
      const topicId = topicSelect.value;
      if (topicId) startQuiz(topicId);
    };
  }

  const retryBtn = $('quizRetryBtn');
  if (retryBtn) {
    retryBtn.onclick = () => {
      if (quizState.topicId) startQuiz(quizState.topicId);
    };
  }

  const newBtn = $('quizNewBtn');
  if (newBtn) {
    newBtn.onclick = () => {
      if ($('quizSetup')) $('quizSetup').style.display = '';
      if ($('quizActive')) $('quizActive').style.display = 'none';
      if ($('quizResult')) $('quizResult').style.display = 'none';
    };
  }

  const nextBtn = $('quizNextBtn');
  if (nextBtn) {
    nextBtn.onclick = () => nextQuestion();
  }
  const jokerBtn = $('quizJokerBtn');
  if (jokerBtn) jokerBtn.onclick = useQuizJoker;
}

function startQuiz(topicId) {
  quizState = {
    questions: getQuestionsForTopic(topicId),
    currentIndex: 0,
    correctCount: 0,
    selectedOption: null,
    topicId,
  };

  if ($('quizSetup')) $('quizSetup').style.display = 'none';
  if ($('quizResult')) $('quizResult').style.display = 'none';
  if ($('quizActive')) $('quizActive').style.display = '';
  if ($('quizNextBtn')) $('quizNextBtn').style.display = 'none';

  const qualityBox = $('qualityBox');
  if (qualityBox) qualityBox.style.display = '';

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.currentIndex];
  if (!question) return;

  if ($('quizQuestion')) $('quizQuestion').textContent = question.prompt;
  if ($('quizProgressText')) $('quizProgressText').textContent = `${quizState.currentIndex + 1} / ${quizState.questions.length}`;
  const progressFill = $('quizProgressBar');
  if (progressFill) progressFill.style.width = `${((quizState.currentIndex + 1) / quizState.questions.length) * 100}%`;

  const optionsEl = $('quizOptions');
  if (optionsEl) {
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option';
      btn.textContent = option;
      btn.onclick = () => selectOption(index);
      optionsEl.appendChild(btn);
    });
  }

  if ($('quizFeedback')) $('quizFeedback').textContent = '';
  const jokerState = getRewardState();
  const jokerBtn = $('quizJokerBtn');
  if (jokerBtn) {
    jokerBtn.style.display = jokerState.jokerAvailable > 0 ? '' : 'none';
    if ($('quizJokerCount')) $('quizJokerCount').textContent = jokerState.jokerAvailable || 0;
  }
}

function useQuizJoker() {
  if (quizState.selectedOption !== null) return;
  const state = getRewardState();
  if (!state.jokerAvailable) return;
  const question = quizState.questions[quizState.currentIndex];
  const wrongIndexes = question.options.map((_, index) => index).filter((index) => index !== question.answer);
  wrongIndexes.sort(() => Math.random() - .5).slice(0, 2).forEach((index) => {
    const option = $('quizOptions')?.querySelectorAll('.quiz-option')[index];
    if (option) {
      option.disabled = true;
      option.classList.add('joker-eliminated');
    }
  });
  state.jokerAvailable -= 1;
  saveRewardState(state);
  if ($('quizJokerBtn')) $('quizJokerBtn').style.display = state.jokerAvailable > 0 ? '' : 'none';
  if ($('quizJokerCount')) $('quizJokerCount').textContent = state.jokerAvailable;
}

function selectOption(index) {
  if (quizState.selectedOption !== null) return;
  quizState.selectedOption = index;

  const question = quizState.questions[quizState.currentIndex];
  const isCorrect = index === question.answer;
  if (isCorrect) quizState.correctCount++;
  playAppSound(isCorrect ? 'correct' : 'wrong');

  const optionsEl = $('quizOptions');
  if (optionsEl) {
    optionsEl.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === question.answer) btn.classList.add('correct');
      if (i === index && !isCorrect) btn.classList.add('wrong');
    });
  }

  if ($('quizFeedback')) {
    $('quizFeedback').textContent = isCorrect
      ? '✅ Doğru!'
      : `❌ Yanlış. Doğru cevap: ${question.options[question.answer]}`;
  }

  const nextBtn = $('quizNextBtn');
  if (nextBtn) {
    nextBtn.style.display = '';
    nextBtn.textContent = quizState.currentIndex + 1 >= quizState.questions.length
      ? '🏁 Sonucu Gör'
      : '▶️ Sonraki';
  }
}

function nextQuestion() {
  if (quizState.currentIndex + 1 >= quizState.questions.length) {
    finishQuiz();
    return;
  }
  quizState.currentIndex++;
  quizState.selectedOption = null;
  renderQuizQuestion();
}

function finishQuiz() {
  const total = quizState.questions.length;
  const correct = quizState.correctCount;
  const accuracy = Math.round((correct / total) * 100);

  // Save progress
  const progress = getProgress();
  const entry = progress[quizState.topicId] || { total: 0, correct: 0 };
  entry.total += 1;
  if (correct >= total / 2) entry.correct += 1;
  progress[quizState.topicId] = entry;
  saveProgress(progress);

  const xpEarned = correct > 0 ? correct * 2 : 1;
  addXp(xpEarned);

  const quizHistory = readStorage(STORAGE_KEYS.quizHistory, []);
  quizHistory.push({
    topicId: quizState.topicId,
    timestamp: new Date().toISOString(),
    correct,
    total,
    accuracy,
  });
  writeStorage(STORAGE_KEYS.quizHistory, quizHistory);

  if ($('quizActive')) $('quizActive').style.display = 'none';
  if ($('quizResult')) $('quizResult').style.display = '';

  const topicName = getAllTopics().find((t) => t.id === quizState.topicId)?.name || quizState.topicId;

  if ($('quizResultIcon')) {
    $('quizResultIcon').textContent = accuracy >= 70 ? '🏆' : accuracy >= 40 ? '👍' : '📚';
  }
  if ($('quizResultTitle')) {
    $('quizResultTitle').textContent = accuracy >= 70 ? 'Harikasın!' : accuracy >= 40 ? 'İyi gidiyor!' : 'Tekrar etmelisin!';
  }
  if ($('quizResultText')) {
    $('quizResultText').textContent = `${topicName} konusunda ${correct}/${total} doğru yaptın (${accuracy}%). +${xpEarned} XP!`;
  }

  // SM-2 Quality Rating
  renderQualitySelection(quizState.topicId, accuracy);
}

function renderQualitySelection(topicId, suggestedAccuracy) {
  const qualityBox = $('qualityBox');
  const qualityOptions = $('qualityOptions');
  if (!qualityBox || !qualityOptions) return;

  const qualities = [
    { q: 0, label: 'Tamamen unuttum' },
    { q: 1, label: 'Zor hatırladım' },
    { q: 2, label: 'Kısmen hatırladım' },
    { q: 3, label: 'Hatırladım ama zorlandım' },
    { q: 4, label: 'İyi hatırladım' },
    { q: 5, label: 'Mükemmel hatırladım' },
  ];

  const suggested = accuracyToQuality(suggestedAccuracy);
  qualityBox.style.display = '';
  qualityOptions.innerHTML = '';

  qualities.forEach(({ q, label }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quality-btn' + (q === suggested ? ' best' : '');
    btn.textContent = `${q} - ${label}`;
    btn.onclick = () => submitQuality(topicId, q, btn);
    qualityOptions.appendChild(btn);
  });

  $('qualityReview').innerHTML = '';
}

function submitQuality(topicId, quality, btnEl) {
  const reviews = readStorage(STORAGE_KEYS.reviews, {});
  const existing = reviews[topicId] || {
    repetitions: 0,
    easinessFactor: 2.5,
    intervalDays: 0,
  };

  const result = sm2Review(quality, existing.repetitions, existing.easinessFactor, existing.intervalDays);

  reviews[topicId] = {
    repetitions: result.repetitions,
    easinessFactor: result.easinessFactor,
    intervalDays: result.intervalDays,
    dueDate: result.nextReviewDate.toISOString(),
    lastReviewedAt: new Date().toISOString(),
  };
  writeStorage(STORAGE_KEYS.reviews, reviews);

  // Disable all quality buttons
  const qualityOptions = $('qualityOptions');
  if (qualityOptions) {
    qualityOptions.querySelectorAll('.quality-btn').forEach((b) => {
      b.disabled = true;
      b.classList.toggle('selected', b === btnEl);
    });
  }

  const reviewEl = $('qualityReview');
  if (reviewEl) {
    reviewEl.innerHTML = `
      <div class="review-result" style="display:block;">
        <div class="review-row"><span>Kalite:</span><strong>${quality}/5</strong></div>
        <div class="review-row"><span>Tekrar:</span><strong>${result.repetitions} kez</strong></div>
        <div class="review-row"><span>Aralık:</span><strong>${result.intervalDays} gün</strong></div>
        <div class="review-date">📅 Tekrar tarihi: <strong>${formatReviewDate(result.nextReviewDate)}</strong></div>
      </div>
    `;
  }
}

// ===== Planner =====
const WEEKDAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const QUOTES = [
  'Başarı, her gün tekrarlanan küçük çabaların toplamıdır.',
  'Disiplin, hedefler ile başarı arasındaki köprüdür.',
  'Bilgi, paylaştıkça çoğalır. Öğrenmeye devam et.',
  'Bugün yaptıkların, yarının temelidir.',
  'Küçük adımlar, büyük yolculukları tamamlar.',
  'Zorluklar, büyümenin fırsatlarıdır.',
  'Her gün bir sayfa, yılda bir kitap demektir.',
];

let currentPlannerDay = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
let plannerActiveView = 'planner';
let plannerCalendarDate = new Date();
let plannerCalendarMode = 'month';
let plannerCountdownInterval = null;
let plannerSelectedEventDate = '';

function padNumber(value) {
  return String(value).padStart(2, '0');
}

function formatDateKey(date) {
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function getExamDates(year) {
  return {
    tyt: new Date(year, 5, 20, 10, 15),
    ayt: new Date(year, 5, 21, 10, 15),
  };
}

function getUpcomingExamDates() {
  const now = new Date();
  const current = getExamDates(now.getFullYear());
  return now < current.ayt ? current : getExamDates(now.getFullYear() + 1);
}

function formatCountdown(targetDate) {
  const totalSeconds = Math.max(0, Math.floor((targetDate.getTime() - Date.now()) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days} gün ${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}

function getTaskStatus(task) {
  if (task.status === 'doing' || task.status === 'done') return task.status;
  return task.done ? 'done' : 'todo';
}

function setTaskStatus(task, status) {
  task.status = status;
  task.done = status === 'done';
}

function getAllPlannerTasks() {
  return Object.entries(getTasks()).flatMap(([dayKey, dayTasks]) =>
    (dayTasks || []).map((task) => ({ task, dayKey })),
  );
}

function findPlannerTask(taskId) {
  const tasks = getTasks();
  for (const [dayKey, dayTasks] of Object.entries(tasks)) {
    const index = (dayTasks || []).findIndex((task) => String(task.id) === String(taskId));
    if (index >= 0) return { tasks, dayKey, dayTasks, task: dayTasks[index], index };
  }
  return null;
}

function updatePlannerTaskStatus(taskId, status) {
  const record = findPlannerTask(taskId);
  if (!record) return;
  setTaskStatus(record.task, status);
  record.tasks[record.dayKey] = record.dayTasks;
  saveTasks(record.tasks);
  renderPlannerPage();
}

function getTasks() {
  return readStorage(STORAGE_KEYS.tasks, {});
}

function saveTasks(tasks) {
  writeStorage(STORAGE_KEYS.tasks, tasks);
}

function getDayKey(dayIndex) {
  const d = new Date();
  const today = d.getDay() === 0 ? 6 : d.getDay() - 1;
  const diff = dayIndex - today;
  const target = new Date(d);
  target.setDate(d.getDate() + diff);
  return `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, '0')}-${String(target.getDate()).padStart(2, '0')}`;
}

function renderPlannerPage() {
  renderPlannerQuote();
  renderPlannerDays();
  renderPlannerTasks();
  renderPlannerStats();
  initPlannerForm();
  initPhraseInput();
  initPomodoro();
  initTutorPanel();
  initPlannerViews();
  renderPlannerKanban();
  initPlannerCalendar();
  renderPlannerCalendar();
  updatePlannerExamCountdown();
  clearInterval(plannerCountdownInterval);
  plannerCountdownInterval = setInterval(updatePlannerExamCountdown, 1000);
}

function initPlannerViews() {
  const applyViewState = () => {
    document.querySelectorAll('.planner-view-tab').forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.plannerView === plannerActiveView);
    });
    document.querySelectorAll('[data-view-panel]').forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.viewPanel === plannerActiveView);
    });
  };

  document.querySelectorAll('.planner-view-tab').forEach((button) => {
    button.onclick = () => {
      plannerActiveView = button.dataset.plannerView || 'planner';
      applyViewState();
      if (plannerActiveView === 'kanban') renderPlannerKanban();
      if (plannerActiveView === 'calendar') renderPlannerCalendar();
    };
  });
  applyViewState();
}

function updatePlannerExamCountdown() {
  const exams = getUpcomingExamDates();
  if ($('plannerTytCountdown')) $('plannerTytCountdown').textContent = formatCountdown(exams.tyt);
  if ($('plannerAytCountdown')) $('plannerAytCountdown').textContent = formatCountdown(exams.ayt);
  if ($('timerTytCountdown')) $('timerTytCountdown').textContent = formatCountdown(exams.tyt);
  if ($('timerAytCountdown')) $('timerAytCountdown').textContent = formatCountdown(exams.ayt);
  if ($('plannerTytDate')) $('plannerTytDate').textContent = exams.tyt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  if ($('plannerAytDate')) $('plannerAytDate').textContent = exams.ayt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  if ($('timerTytDate')) $('timerTytDate').textContent = exams.tyt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  if ($('timerAytDate')) $('timerAytDate').textContent = exams.ayt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function renderPlannerQuote() {
  const quoteEl = $('plannerQuote');
  if (!quoteEl) return;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / (24 * 60 * 60 * 1000));
  const quote = QUOTES[dayOfYear % QUOTES.length];
  const textEl = quoteEl.querySelector('.quote-text');
  if (textEl) textEl.textContent = `"${quote}"`;
}

function renderPlannerDays() {
  const daysEl = $('plannerDays');
  if (!daysEl) return;
  daysEl.innerHTML = '';

  WEEKDAYS.forEach((day, idx) => {
    const d = new Date();
    const today = d.getDay() === 0 ? 6 : d.getDay() - 1;
    const diff = idx - today;
    const target = new Date(d);
    target.setDate(d.getDate() + diff);
    const dayKey = getDayKey(idx);
    const tasks = getTasks()[dayKey] || [];
    const isToday = idx === today;
    const doneCount = tasks.filter((t) => t.done).length;

    const dayBtn = document.createElement('button');
    dayBtn.type = 'button';
    dayBtn.className = 'planner-day' + (idx === currentPlannerDay ? ' active' : '');
    dayBtn.innerHTML = `
      <div>${day}</div>
      <div class="planner-day-today">${isToday ? 'Bugün' : target.toLocaleDateString('tr-TR', { day: 'numeric', month: 'numeric' })}</div>
      <div class="planner-day-count">${doneCount}/${tasks.length}</div>
    `;
    dayBtn.onclick = () => {
      currentPlannerDay = idx;
      renderPlannerDays();
      renderPlannerTasks();
    };
    daysEl.appendChild(dayBtn);
  });
}

function renderPlannerTasks() {
  const tasksEl = $('plannerTasks');
  if (!tasksEl) return;

  const dayKey = getDayKey(currentPlannerDay);
  const tasks = (getTasks()[dayKey] || []).slice().sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return a.time.localeCompare(b.time);
  });

  if (tasks.length === 0) {
    tasksEl.innerHTML = '<div class="planner-empty">Bu gün için görev eklenmemiş. Yukarıdan görev ekleyebilirsin! 📋</div>';
    return;
  }

  const priorityIcons = { high: '🔴', medium: '🟡', low: '🟢' };
  const priorityLabels = { high: 'Acil', medium: 'Normal', low: 'Esnek' };
  const classIcons = { ...CLASS_ICONS };

  tasksEl.innerHTML = tasks.map((task, idx) => `
    <div class="planner-task ${task.done ? 'done' : ''}" data-idx="${idx}" data-task-id="${task.id}">
      <button type="button" class="planner-task-check" data-task-action="toggle" data-task-id="${task.id}">✓</button>
      <span class="planner-task-time">${task.time || '09:00'}</span>
      <span class="planner-task-class">${classIcons[task.class] || '📚'}</span>
      <span class="task-priority ${task.priority || 'medium'}">${priorityIcons[task.priority] || '🟡'}</span>
      <span class="planner-task-title">${task.title}</span>
      <span class="planner-task-duration">${task.duration ? `${task.duration} dk` : 'Süre yok'}</span>
      <span class="planner-task-priority-label ${task.priority || 'medium'}">${priorityLabels[task.priority] || 'Normal'}</span>
      <button type="button" class="planner-task-edit" data-task-action="edit" data-task-id="${task.id}" title="Düzenle">✏️</button>
      <button type="button" class="planner-task-delete" data-task-action="delete" data-task-id="${task.id}" title="Sil">🗑️</button>
    </div>
  `).join('');

  tasksEl.querySelectorAll('[data-task-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const taskId = button.dataset.taskId;
      if (button.dataset.taskAction === 'toggle') toggleTaskDoneById(taskId);
      if (button.dataset.taskAction === 'edit') editTaskById(taskId);
      if (button.dataset.taskAction === 'delete') deleteTaskById(taskId);
    });
  });
}

function toggleTaskDoneById(taskId) {
  const record = findPlannerTask(taskId);
  if (!record) return;
  setTaskStatus(record.task, getTaskStatus(record.task) === 'done' ? 'todo' : 'done');
  record.tasks[record.dayKey] = record.dayTasks;
  saveTasks(record.tasks);
  renderPlannerPage();
}

function deleteTaskById(taskId) {
  const record = findPlannerTask(taskId);
  if (!record) return;
  record.dayTasks.splice(record.index, 1);
  record.tasks[record.dayKey] = record.dayTasks;
  saveTasks(record.tasks);
  playAppSound('planDeleted');
  renderPlannerPage();
}

function editTaskById(taskId) {
  const record = findPlannerTask(taskId);
  if (!record) return;
  currentPlannerDay = WEEKDAYS.findIndex((_, index) => getDayKey(index) === record.dayKey);
  plannerActiveView = 'planner';
  renderPlannerPage();
  editTask(record.index);
}

function toggleTaskDone(idx) {
  const dayKey = getDayKey(currentPlannerDay);
  const tasks = getTasks();
  const dayTasks = tasks[dayKey] || [];
  if (!dayTasks[idx]) return;
  dayTasks[idx].done = !dayTasks[idx].done;
  tasks[dayKey] = dayTasks;
  saveTasks(tasks);
  renderPlannerTasks();
  renderPlannerDays();
  renderPlannerStats();
}

function deleteTask(idx) {
  const dayKey = getDayKey(currentPlannerDay);
  const tasks = getTasks();
  const dayTasks = tasks[dayKey] || [];
  dayTasks.splice(idx, 1);
  tasks[dayKey] = dayTasks;
  saveTasks(tasks);
  playAppSound('planDeleted');
  renderPlannerTasks();
  renderPlannerDays();
  renderPlannerStats();
}

function editTask(idx) {
  const dayKey = getDayKey(currentPlannerDay);
  const tasks = getTasks();
  const dayTasks = tasks[dayKey] || [];
  const task = dayTasks[idx];
  if (!task) return;

  const editForm = $('plannerEditForm');
  if (!editForm) return;

  editForm.style.display = 'flex';
  $('editTaskTitle').value = task.title;
  $('editTaskTime').value = task.time || '09:00';
  $('editTaskClass').innerHTML = '';
  Object.keys(CLASS_ICONS).forEach((cls) => {
    const opt = document.createElement('option');
    opt.value = cls;
    opt.textContent = `${CLASS_ICONS[cls]} ${cls}`;
    if (cls === task.class) opt.selected = true;
    $('editTaskClass').appendChild(opt);
  });
  $('editTaskPriority').value = task.priority || 'medium';

  editForm.onsubmit = (e) => {
    e.preventDefault();
    dayTasks[idx] = {
      ...task,
      title: $('editTaskTitle').value,
      time: $('editTaskTime').value,
      class: $('editTaskClass').value,
      priority: $('editTaskPriority').value,
    };
    tasks[dayKey] = dayTasks;
    saveTasks(tasks);
    playAppSound('planAdded');
    editForm.style.display = 'none';
    renderPlannerTasks();
    renderPlannerStats();
  };

  const cancelBtn = $('editCancelBtn');
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      editForm.style.display = 'none';
    };
  }
}

function renderPlannerStats() {
  const tasks = getTasks();
  const allTasks = Object.values(tasks).flat();
  const doneCount = allTasks.filter((t) => t.done).length;
  const totalCount = allTasks.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  if ($('plannerStatDone')) $('plannerStatDone').textContent = doneCount;
  if ($('plannerStatTotal')) $('plannerStatTotal').textContent = totalCount;
  if ($('plannerStatPct')) $('plannerStatPct').textContent = `${pct}%`;
  if ($('plannerStatStreak')) $('plannerStatStreak').textContent = AppState.streak;
  const semicircle = $('plannerSemicircle');
  if (semicircle) semicircle.style.setProperty('--progress-angle', `${Math.round(pct * 1.8)}deg`);
}

function escapePlannerHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[char]));
}

function renderPlannerKanban() {
  const board = $('plannerKanbanBoard');
  if (!board) return;

  const columns = [
    { status: 'todo', title: 'Planlandı', subtitle: 'Başlanacak çalışmalar', accent: 'blue' },
    { status: 'doing', title: 'Devam Ediyor', subtitle: 'Şu an odaklandıkların', accent: 'violet' },
    { status: 'done', title: 'Tamamlandı', subtitle: 'Bitirdiğin çalışmalar', accent: 'green' },
  ];
  const grouped = columns.reduce((result, column) => {
    result[column.status] = [];
    return result;
  }, {});

  getAllPlannerTasks().forEach(({ task, dayKey }) => {
    const status = getTaskStatus(task);
    (grouped[status] || grouped.todo).push({ task, dayKey });
  });

  board.innerHTML = columns.map((column) => `
    <section class="planner-kanban-column ${column.accent}" data-kanban-status="${column.status}">
      <header class="planner-kanban-column-header">
        <div><strong>${column.title}</strong><span>${column.subtitle}</span></div>
        <b>${grouped[column.status].length}</b>
      </header>
      <div class="planner-kanban-dropzone" data-drop-status="${column.status}">
        ${grouped[column.status].length ? grouped[column.status].map(({ task, dayKey }) => `
          <article class="planner-kanban-card" draggable="true" data-task-id="${task.id}">
            <div class="planner-kanban-card-top"><span class="planner-kanban-subject">${escapePlannerHtml(task.class || 'Ders')}</span><span class="task-priority ${task.priority || 'medium'}">${task.priority === 'high' ? '🔴' : task.priority === 'low' ? '🟢' : '🟡'}</span></div>
            <strong>${escapePlannerHtml(task.title)}</strong>
            <div class="planner-kanban-card-meta"><span>${escapePlannerHtml(task.time || '09:00')}</span><span>${task.duration ? `${task.duration} dk` : 'Süre yok'}</span><span>${parseDateKey(dayKey).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span></div>
            <button type="button" class="planner-kanban-edit" data-kanban-edit="${task.id}">Düzenle</button>
          </article>
        `).join('') : '<div class="planner-kanban-empty">Kartı buraya taşı</div>'}
      </div>
    </section>
  `).join('');

  board.querySelectorAll('.planner-kanban-card').forEach((card) => {
    card.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', card.dataset.taskId);
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
  });
  board.querySelectorAll('.planner-kanban-dropzone').forEach((zone) => {
    zone.addEventListener('dragover', (event) => {
      event.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', (event) => {
      event.preventDefault();
      zone.classList.remove('drag-over');
      updatePlannerTaskStatus(event.dataTransfer.getData('text/plain'), zone.dataset.dropStatus);
    });
  });
  board.querySelectorAll('[data-kanban-edit]').forEach((button) => {
    button.onclick = () => editTaskById(button.dataset.kanbanEdit);
  });
}

function getCalendarEvents() {
  return readStorage(STORAGE_KEYS.calendarEvents, []);
}

function saveCalendarEvents(events) {
  writeStorage(STORAGE_KEYS.calendarEvents, events);
}

function getCalendarDayMarkup(date) {
  const dateKey = formatDateKey(date);
  const exams = getExamDates(date.getFullYear());
  const taskItems = (getTasks()[dateKey] || []).slice(0, 3);
  const eventItems = getCalendarEvents().filter((event) => event.date === dateKey).slice(0, 2);
  const examMarkup = [];
  if (formatDateKey(exams.tyt) === dateKey) examMarkup.push('<span class="planner-calendar-exam tyt">TYT</span>');
  if (formatDateKey(exams.ayt) === dateKey) examMarkup.push('<span class="planner-calendar-exam ayt">AYT</span>');
  return `
    <button type="button" class="planner-calendar-day ${formatDateKey(new Date()) === dateKey ? 'today' : ''}" data-calendar-date="${dateKey}">
      <span class="planner-calendar-day-number">${date.getDate()}</span>
      <span class="planner-calendar-items">
        ${examMarkup.join('')}
        ${eventItems.map((event) => `<span class="planner-calendar-event">${escapePlannerHtml(event.time || '')} ${escapePlannerHtml(event.title)}</span>`).join('')}
        ${taskItems.map((task) => `<span class="planner-calendar-task">${escapePlannerHtml(task.title)}</span>`).join('')}
      </span>
    </button>
  `;
}

function renderPlannerMonth(year, month, compact = false) {
  const firstDay = new Date(year, month, 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i += 1) cells.push('<span class="planner-calendar-empty"></span>');
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(getCalendarDayMarkup(new Date(year, month, day)));
  return `
    <div class="planner-calendar-month ${compact ? 'compact' : ''}">
      ${compact ? `<h4>${new Date(year, month, 1).toLocaleDateString('tr-TR', { month: 'long' })}</h4>` : ''}
      <div class="planner-calendar-weekdays">${WEEKDAYS.map((day) => `<span>${compact ? day.slice(0, 2) : day}</span>`).join('')}</div>
      <div class="planner-calendar-grid">${cells.join('')}</div>
    </div>
  `;
}

function renderPlannerCalendar() {
  const calendar = $('plannerCalendar');
  if (!calendar) return;
  const year = plannerCalendarDate.getFullYear();
  const month = plannerCalendarDate.getMonth();
  const title = $('plannerCalendarTitle');
  if (title) title.textContent = plannerCalendarMode === 'month'
    ? plannerCalendarDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })
    : String(year);
  calendar.innerHTML = plannerCalendarMode === 'month'
    ? renderPlannerMonth(year, month)
    : `<div class="planner-calendar-year">${Array.from({ length: 12 }, (_, index) => renderPlannerMonth(year, index, true)).join('')}</div>`;

  calendar.querySelectorAll('[data-calendar-date]').forEach((dayButton) => {
    dayButton.onclick = () => openPlannerEventForm(dayButton.dataset.calendarDate);
  });
}

function openPlannerEventForm(dateKey) {
  plannerSelectedEventDate = dateKey;
  const form = $('plannerEventForm');
  if (!form) return;
  const date = parseDateKey(dateKey);
  $('plannerEventDate').value = dateKey;
  $('plannerEventDateLabel').textContent = date.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });
  form.style.display = 'grid';
  $('plannerEventTitle').focus();
}

function initPlannerCalendar() {
  const prev = $('plannerCalendarPrev');
  const next = $('plannerCalendarNext');
  const today = $('plannerCalendarToday');
  if (prev) prev.onclick = () => {
    if (plannerCalendarMode === 'month') plannerCalendarDate.setMonth(plannerCalendarDate.getMonth() - 1);
    else plannerCalendarDate.setFullYear(plannerCalendarDate.getFullYear() - 1);
    renderPlannerCalendar();
  };
  if (next) next.onclick = () => {
    if (plannerCalendarMode === 'month') plannerCalendarDate.setMonth(plannerCalendarDate.getMonth() + 1);
    else plannerCalendarDate.setFullYear(plannerCalendarDate.getFullYear() + 1);
    renderPlannerCalendar();
  };
  if (today) today.onclick = () => {
    plannerCalendarDate = new Date();
    renderPlannerCalendar();
  };
  document.querySelectorAll('[data-calendar-mode]').forEach((button) => {
    button.onclick = () => {
      plannerCalendarMode = button.dataset.calendarMode || 'month';
      document.querySelectorAll('[data-calendar-mode]').forEach((modeButton) => modeButton.classList.toggle('active', modeButton === button));
      renderPlannerCalendar();
    };
  });
  const eventForm = $('plannerEventForm');
  if (eventForm) eventForm.onsubmit = (event) => {
    event.preventDefault();
    const title = $('plannerEventTitle').value.trim();
    const date = $('plannerEventDate').value || plannerSelectedEventDate;
    if (!title || !date) return;
    const events = getCalendarEvents();
    events.push({ id: Date.now(), title, date, time: $('plannerEventTime').value || '09:00' });
    saveCalendarEvents(events);
    eventForm.reset();
    eventForm.style.display = 'none';
    renderPlannerCalendar();
  };
}

function renderPlannerAnalytics(tasks, allTasks, completionPct) {
  const weekBars = $('plannerWeekBars');
  const focusMinutes = allTasks.reduce((sum, task) => sum + (Number(task.duration) || 0), 0);
  if ($('plannerFocusMinutes')) $('plannerFocusMinutes').textContent = `${focusMinutes} dk`;
  if ($('plannerCompletionBadge')) $('plannerCompletionBadge').textContent = `${completionPct}%`;

  if (weekBars) {
    const counts = WEEKDAYS.map((_, index) => (tasks[getDayKey(index)] || []).length);
    const maxCount = Math.max(1, ...counts);
    weekBars.innerHTML = counts.map((count, index) => `
      <div class="planner-week-bar-column" title="${WEEKDAYS[index]}: ${count} görev">
        <div class="planner-week-bar" style="--bar-size:${Math.max(8, Math.round((count / maxCount) * 100))}%"></div>
        <span>${WEEKDAYS[index].slice(0, 2)}</span>
      </div>
    `).join('');
  }

  const categories = [
    { key: 'ders', label: 'Ders', color: '#20c8ed' },
    { key: 'tekrar', label: 'Tekrar', color: '#8c6bff' },
    { key: 'deneme', label: 'Deneme', color: '#f6b84b' },
    { key: 'mola', label: 'Mola', color: '#4ade80' },
  ];
  const categoryCounts = categories.map((category) => ({
    ...category,
    count: allTasks.filter((task) => task.category === category.key).length,
  }));
  const uncategorized = allTasks.filter((task) => !categories.some((category) => category.key === task.category)).length;
  const totalForPie = Math.max(1, allTasks.length);
  let cursor = 0;
  const pieStops = categoryCounts.map((category) => {
    const start = (cursor / totalForPie) * 100;
    cursor += category.count;
    return `${category.color} ${start}% ${(cursor / totalForPie) * 100}%`;
  });
  if (uncategorized > 0) pieStops.push(`#44627c ${(cursor / totalForPie) * 100}% 100%`);

  const pie = $('plannerCategoryPie');
  if (pie) {
    pie.style.background = `conic-gradient(${pieStops.length ? pieStops.join(', ') : '#19344d 0 100%'})`;
    pie.querySelector('span').textContent = allTasks.length;
  }
  const legend = $('plannerCategoryLegend');
  if (legend) {
    legend.innerHTML = categoryCounts.map((category) => `
      <span><i style="background:${category.color}"></i>${category.label}<b>${category.count}</b></span>
    `).join('') + (uncategorized ? `<span><i style="background:#44627c"></i>Diğer<b>${uncategorized}</b></span>` : '');
  }
}

function initPlannerForm() {
  const form = $('plannerForm');
  if (!form) return;

  // Populate class select
  const classSelect = $('taskClass');
  if (classSelect) {
    classSelect.innerHTML = '<option value="">📚 Ders</option>';
    Object.keys(CLASS_ICONS).forEach((cls) => {
      const opt = document.createElement('option');
      opt.value = cls;
      opt.textContent = `${CLASS_ICONS[cls]} ${cls}`;
      classSelect.appendChild(opt);
    });
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const title = $('taskTitle').value.trim();
    if (!title) return;
    const time = $('taskTime').value || '09:00';
    const cls = $('taskClass').value || '';
    const priority = $('taskPriority').value || 'medium';
    const category = $('taskCategory').value || '';
    const duration = $('taskDuration').value || '';

    const dayKey = getDayKey(currentPlannerDay);
    const tasks = getTasks();
    const dayTasks = tasks[dayKey] || [];
    dayTasks.push({
      id: Date.now(),
      title,
      time,
      class: cls,
      priority,
      category,
      duration,
      done: false,
      status: 'todo',
    });
    tasks[dayKey] = dayTasks;
    saveTasks(tasks);
    playAppSound('planAdded');

    form.reset();
    $('taskClass').innerHTML = '<option value="">📚 Ders</option>';
    Object.keys(CLASS_ICONS).forEach((clsName) => {
      const opt = document.createElement('option');
      opt.value = clsName;
      opt.textContent = `${CLASS_ICONS[clsName]} ${clsName}`;
      $('taskClass').appendChild(opt);
    });

    renderPlannerTasks();
    renderPlannerDays();
    renderPlannerStats();
  };
}

function initPhraseInput() {
  // Daily phrase support in planner
}

// ===== Pomodoro =====
let pomodoroInterval = null;
let pomodoroSeconds = 25 * 60;
let pomodoroInitialSeconds = 25 * 60;
let pomodoroRunning = false;

function initPomodoro() {
  const startBtn = $('pomodoroStart');
  const pauseBtn = $('pomodoroPause');
  const resetBtn = $('pomodoroReset');
  const decreaseBtn = $('pomodoroDecrease');
  const increaseBtn = $('pomodoroIncrease');
  if (!startBtn || !pauseBtn || !resetBtn) return;

  // Restore saved state
  const saved = readStorage(STORAGE_KEYS.pomodoro, null);
  if (saved && typeof saved.seconds === 'number') {
    pomodoroSeconds = saved.seconds;
    pomodoroInitialSeconds = saved.initialSeconds || (saved.durationMinutes ? saved.durationMinutes * 60 : 25 * 60);
    if (saved.running) {
      pomodoroRunning = true;
      startPomodoroTimer();
    }
  }
  updatePomodoroDisplay();

  startBtn.onclick = () => {
    if (pomodoroRunning || pomodoroSeconds <= 0) return;
    pomodoroRunning = true;
    startPomodoroTimer();
    writeStorage(STORAGE_KEYS.pomodoro, { seconds: pomodoroSeconds, initialSeconds: pomodoroInitialSeconds, durationMinutes: Math.round(pomodoroInitialSeconds / 60), running: true });
  };

  pauseBtn.onclick = () => {
    pomodoroRunning = false;
    clearInterval(pomodoroInterval);
    writeStorage(STORAGE_KEYS.pomodoro, { seconds: pomodoroSeconds, initialSeconds: pomodoroInitialSeconds, durationMinutes: Math.round(pomodoroInitialSeconds / 60), running: false });
    updatePomodoroDisplay();
  };

  resetBtn.onclick = () => {
    pomodoroRunning = false;
    clearInterval(pomodoroInterval);
    pomodoroSeconds = pomodoroInitialSeconds;
    updatePomodoroDisplay();
    const modeEl = $('pomodoroMode');
    if (modeEl) modeEl.textContent = 'Odaklanma zamanı';
    writeStorage(STORAGE_KEYS.pomodoro, { seconds: pomodoroSeconds, initialSeconds: pomodoroInitialSeconds, durationMinutes: Math.round(pomodoroInitialSeconds / 60), running: false });
  };

  const changeDuration = (step) => {
    if (pomodoroRunning) return;
    const currentMinutes = Math.round(pomodoroInitialSeconds / 60);
    const nextMinutes = Math.max(5, Math.min(120, currentMinutes + step));
    pomodoroInitialSeconds = nextMinutes * 60;
    pomodoroSeconds = pomodoroInitialSeconds;
    const modeEl = $('pomodoroMode');
    if (modeEl) modeEl.textContent = 'Odaklanma zamanı';
    updatePomodoroDisplay();
    writeStorage(STORAGE_KEYS.pomodoro, { seconds: pomodoroSeconds, initialSeconds: pomodoroInitialSeconds, durationMinutes: Math.round(pomodoroInitialSeconds / 60), running: false });
  };

  if (decreaseBtn) decreaseBtn.onclick = () => changeDuration(-5);
  if (increaseBtn) increaseBtn.onclick = () => changeDuration(5);
  updatePomodoroDurationValue();
}

function updatePomodoroDurationValue() {
  const value = $('pomodoroDurationValue');
  if (value) value.textContent = `${Math.round(pomodoroInitialSeconds / 60)} dk`;
}

function startPomodoroTimer() {
  clearInterval(pomodoroInterval);
  pomodoroInterval = setInterval(() => {
    pomodoroSeconds--;
    if (pomodoroSeconds <= 0) {
      clearInterval(pomodoroInterval);
      pomodoroRunning = false;
      const modeEl = $('pomodoroMode');
      if (modeEl) modeEl.textContent = 'Süre tamamlandı';
      addXp(5);
      updatePomodoroDisplay();
      writeStorage(STORAGE_KEYS.pomodoro, { seconds: 0, initialSeconds: pomodoroInitialSeconds, durationMinutes: Math.round(pomodoroInitialSeconds / 60), running: false });
    } else {
      updatePomodoroDisplay();
      writeStorage(STORAGE_KEYS.pomodoro, { seconds: pomodoroSeconds, initialSeconds: pomodoroInitialSeconds, durationMinutes: Math.round(pomodoroInitialSeconds / 60), running: true });
    }
  }, 1000);
}

function updatePomodoroDisplay() {
  const display = $('pomodoroDisplay');
  if (!display) return;
  const mins = Math.floor(pomodoroSeconds / 60);
  const secs = pomodoroSeconds % 60;
  display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const ring = $('pomodoroRing');
  if (ring) {
    const ratio = pomodoroInitialSeconds > 0 ? Math.max(0, Math.min(1, pomodoroSeconds / pomodoroInitialSeconds)) : 0;
    ring.style.setProperty('--timer-progress', `${Math.round(ratio * 360)}deg`);
  }
  updatePomodoroDurationValue();
}

// ===== Advanced Timer Page =====
let timerCountdownInterval = null;
let timerExamInterval = null;
let timerPomodoroInterval = null;
let timerCountdownSeconds = 25 * 60;
let timerCountdownRunning = false;
let timerPomodoroSeconds = 25 * 60;
let timerPomodoroInitialSeconds = 25 * 60;
let timerPomodoroRunning = false;
let timerPomodoroMode = 'focus';
let timerSessionCount = 0;
let timerFocusMinutes = 0;
let timerFocusStreak = 0;

const TIMER_MODES = {
  focus: { label: 'Odaklanma', minutes: 25, next: 'short', nextLabel: 'Kısa Mola' },
  short: { label: 'Kısa Mola', minutes: 5, next: 'focus', nextLabel: 'Odaklanma' },
  long: { label: 'Uzun Mola', minutes: 15, next: 'focus', nextLabel: 'Odaklanma' },
};

function formatTimerClock(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(remainder)}`;
}

function readTimeInputSeconds(value) {
  const parts = String(value || '').split(':').map(Number);
  if (parts.some((part) => Number.isNaN(part))) return 25 * 60;
  if (parts.length === 3) return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  if (parts.length === 2) return (parts[0] * 60) + parts[1];
  return 25 * 60;
}

function formatTimeInputValue(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  return `${padNumber(Math.floor(seconds / 3600))}:${padNumber(Math.floor((seconds % 3600) / 60))}`;
}

function stopTimerPageIntervals() {
  clearInterval(timerCountdownInterval);
  clearInterval(timerExamInterval);
  clearInterval(timerPomodoroInterval);
  timerCountdownInterval = null;
  timerExamInterval = null;
  timerPomodoroInterval = null;
}

function initTimerPage() {
  stopTimerPageIntervals();
  initTimerPomodoro();
}

function initTimerCountdown() {
  const display = $('timerCountdownDisplay');
  const input = $('timerCountdownInput');
  const start = $('timerCountdownStart');
  const pause = $('timerCountdownPause');
  const reset = $('timerCountdownReset');
  if (!display || !input || !start || !pause || !reset) return;

  const saved = readStorage(STORAGE_KEYS.timerCountdown, null);
  if (saved && typeof saved.seconds === 'number') {
    timerCountdownSeconds = saved.seconds;
    timerCountdownRunning = Boolean(saved.running);
  } else {
    timerCountdownSeconds = readTimeInputSeconds(input.value);
  }
  input.value = formatTimeInputValue(timerCountdownSeconds);

  const render = () => {
    display.textContent = formatTimerClock(timerCountdownSeconds);
    input.value = formatTimeInputValue(timerCountdownSeconds);
  };
  const persist = () => writeStorage(STORAGE_KEYS.timerCountdown, { seconds: timerCountdownSeconds, running: timerCountdownRunning });
  const stop = () => {
    timerCountdownRunning = false;
    clearInterval(timerCountdownInterval);
    timerCountdownInterval = null;
    persist();
  };
  const startTimer = () => {
    if (timerCountdownRunning || timerCountdownSeconds <= 0) return;
    timerCountdownRunning = true;
    timerCountdownInterval = setInterval(() => {
      timerCountdownSeconds -= 1;
      if (timerCountdownSeconds <= 0) {
        timerCountdownSeconds = 0;
        stop();
        display.classList.add('timer-complete');
      }
      render();
      persist();
    }, 1000);
    persist();
  };

  input.onchange = () => {
    if (timerCountdownRunning) return;
    timerCountdownSeconds = readTimeInputSeconds(input.value);
    display.classList.remove('timer-complete');
    render();
    persist();
  };
  start.onclick = startTimer;
  pause.onclick = stop;
  reset.onclick = () => {
    stop();
    timerCountdownSeconds = readTimeInputSeconds(input.value) || 25 * 60;
    display.classList.remove('timer-complete');
    render();
    persist();
  };
  document.querySelectorAll('.preset-btn').forEach((button) => {
    button.onclick = () => {
      stop();
      timerCountdownSeconds = Number(button.dataset.seconds) || 25 * 60;
      display.classList.remove('timer-complete');
      render();
      persist();
    };
  });
  render();
  if (timerCountdownRunning) {
    timerCountdownRunning = false;
    startTimer();
  }
}

function initTimerPomodoro() {
  const display = $('timerPomodoroDisplay');
  const progress = $('timerPomodoroProgress');
  const start = $('timerPomodoroStart');
  const pause = $('timerPomodoroPause');
  const reset = $('timerPomodoroReset');
  const duration = $('timerPomodoroDuration');
  if (!display || !progress || !start || !pause || !reset || !duration) return;

  const saved = readStorage(STORAGE_KEYS.timerPomodoro, null);
  if (saved && typeof saved.seconds === 'number') {
    timerPomodoroSeconds = saved.seconds;
    timerPomodoroInitialSeconds = saved.initialSeconds || 25 * 60;
    timerPomodoroRunning = Boolean(saved.running);
    timerPomodoroMode = saved.mode || 'focus';
    timerSessionCount = saved.sessionCount || 0;
    timerFocusMinutes = saved.focusMinutes || 0;
    timerFocusStreak = saved.focusStreak || 0;
  }
  const mode = TIMER_MODES[timerPomodoroMode] || TIMER_MODES.focus;
  duration.value = String(Math.round(timerPomodoroInitialSeconds / 60));

  const render = () => {
    const mins = Math.floor(timerPomodoroSeconds / 60);
    const secs = timerPomodoroSeconds % 60;
    display.textContent = `${padNumber(mins)}:${padNumber(secs)}`;
    const circumference = 2 * Math.PI * 45;
    progress.style.strokeDasharray = String(circumference);
    progress.style.strokeDashoffset = String(circumference * (1 - Math.max(0, timerPomodoroSeconds / timerPomodoroInitialSeconds)));
    if ($('timerModeLabel')) $('timerModeLabel').textContent = (TIMER_MODES[timerPomodoroMode] || TIMER_MODES.focus).label;
    if ($('timerFocusStatus')) $('timerFocusStatus').textContent = timerPomodoroRunning ? 'Devam ediyor' : timerPomodoroSeconds === 0 ? 'Tamamlandı' : 'Hazır';
    if ($('timerCycle')) $('timerCycle').textContent = `Oturum ${timerSessionCount + 1}`;
    if ($('timerSessionCount')) $('timerSessionCount').textContent = timerSessionCount;
    if ($('timerFocusMinutes')) $('timerFocusMinutes').textContent = timerFocusMinutes;
    if ($('timerFocusStreak')) $('timerFocusStreak').textContent = timerFocusStreak;
    const aquariumSessions = timerSessionCount % 4 || (timerSessionCount ? 4 : 0);
    if ($('timerSessionProgress')) $('timerSessionProgress').style.width = `${Math.min(100, (aquariumSessions / 4) * 100)}%`;
    if ($('aquariumProgressFill')) $('aquariumProgressFill').style.width = `${Math.min(100, (aquariumSessions / 4) * 100)}%`;
    if ($('aquariumProgressLabel')) $('aquariumProgressLabel').textContent = `${aquariumSessions} / 4 oturum`;
    if ($('aquariumRewardCount')) $('aquariumRewardCount').textContent = `${Math.floor(timerSessionCount / 4)} mercan`;
    if ($('timerNextSession')) $('timerNextSession').textContent = (TIMER_MODES[timerPomodoroMode] || TIMER_MODES.focus).nextLabel;
    document.querySelectorAll('[data-focus-mode]').forEach((button) => button.classList.toggle('active', button.dataset.focusMode === timerPomodoroMode));
  };
  const persist = () => writeStorage(STORAGE_KEYS.timerPomodoro, {
    seconds: timerPomodoroSeconds,
    initialSeconds: timerPomodoroInitialSeconds,
    running: timerPomodoroRunning,
    mode: timerPomodoroMode,
    sessionCount: timerSessionCount,
    focusMinutes: timerFocusMinutes,
    focusStreak: timerFocusStreak,
  });
  const stop = () => {
    timerPomodoroRunning = false;
    clearInterval(timerPomodoroInterval);
    timerPomodoroInterval = null;
    persist();
  };
  const startTimer = (playStartSound = true) => {
    if (timerPomodoroRunning || timerPomodoroSeconds <= 0) return;
    timerPomodoroRunning = true;
    if (playStartSound) playAppSound('timerStarted');
    timerPomodoroInterval = setInterval(() => {
      const rewardState = getRewardState();
      if (rewardState.freezeUntil && rewardState.freezeUntil > Date.now()) {
        if ($('timerFocusStatus')) $('timerFocusStatus').textContent = 'Dondurucu Akıntı aktif';
        render();
        return;
      }
      if (rewardState.freezeUntil) {
        rewardState.freezeUntil = 0;
        saveRewardState(rewardState);
      }
      timerPomodoroSeconds -= 1;
      if (timerPomodoroSeconds <= 0) {
        timerPomodoroSeconds = 0;
        stop();
        if (timerPomodoroMode === 'focus') {
          timerSessionCount += 1;
          timerFocusMinutes += Math.round(timerPomodoroInitialSeconds / 60);
          timerFocusStreak += 1;
          const earnedXp = rewardState.xpMultiplier === 2 ? 10 : 5;
          addXp(earnedXp);
          if (rewardState.xpMultiplier === 2) {
            rewardState.xpMultiplier = 1;
            saveRewardState(rewardState);
          }
        }
        playAppSound('timerFinished');
        display.classList.add('timer-complete');
        if ($('timerNextSession')) $('timerNextSession').textContent = (TIMER_MODES[timerPomodoroMode] || TIMER_MODES.focus).nextLabel;
      }
      render();
      persist();
    }, 1000);
    persist();
  };

  duration.onchange = () => {
    if (timerPomodoroRunning) return;
    timerPomodoroInitialSeconds = Math.max(60, Math.min(7200, Number(duration.value || 25) * 60));
    timerPomodoroSeconds = timerPomodoroInitialSeconds;
    display.classList.remove('timer-complete');
    render();
    persist();
  };
  document.querySelectorAll('[data-focus-mode]').forEach((button) => {
    button.onclick = () => {
      if (timerPomodoroRunning) return;
      setTimerMode(button.dataset.focusMode);
      render();
      persist();
    };
  });
  document.querySelectorAll('[data-focus-minutes]').forEach((button) => {
    button.onclick = () => {
      if (timerPomodoroRunning) return;
      duration.value = button.dataset.focusMinutes;
      timerPomodoroInitialSeconds = Number(button.dataset.focusMinutes) * 60;
      timerPomodoroSeconds = timerPomodoroInitialSeconds;
      display.classList.remove('timer-complete');
      render();
      persist();
    };
  });
  start.onclick = () => startTimer(true);
  pause.onclick = stop;
  reset.onclick = () => {
    stop();
    timerPomodoroSeconds = timerPomodoroInitialSeconds;
    display.classList.remove('timer-complete');
    render();
    persist();
  };
  render();
  if (timerPomodoroRunning) {
    timerPomodoroRunning = false;
    startTimer(false);
  }
}

function setTimerMode(mode, onStart) {
  const selectedMode = TIMER_MODES[mode] ? mode : 'focus';
  timerPomodoroMode = selectedMode;
  const breakBonus = selectedMode === 'short' ? getRewardState().breakTimeBonus || 0 : 0;
  timerPomodoroInitialSeconds = (TIMER_MODES[selectedMode].minutes + breakBonus) * 60;
  timerPomodoroSeconds = timerPomodoroInitialSeconds;
  const duration = $('timerPomodoroDuration');
  if (duration) duration.value = String(TIMER_MODES[selectedMode].minutes + breakBonus);
  const display = $('timerPomodoroDisplay');
  if (display) display.classList.remove('timer-complete');
  if (typeof onStart === 'function') onStart();
}

// ===== AI Tutor Panel =====
function initTutorPanel() {
  const openBtn = $('tutorOpenBtn');
  const closeBtn = $('tutorCloseBtn');
  const panel = $('tutorPanel');
  if (!openBtn || !closeBtn || !panel) return;

  openBtn.onclick = () => {
    panel.style.display = 'flex';
  };

  closeBtn.onclick = () => {
    panel.style.display = 'none';
  };

  // Tutor suggestion chips
  document.querySelectorAll('.tutor-suggest').forEach((chip) => {
    chip.onclick = () => {
      const txt = chip.dataset.txt;
      const input = $('tutorInput');
      if (input) {
        input.value = txt;
        input.focus();
      }
    };
  });

  const tutorForm = $('tutorForm');
  if (tutorForm) {
    tutorForm.onsubmit = (e) => {
      e.preventDefault();
      const input = $('tutorInput');
      const msg = input.value.trim();
      if (!msg) return;
      input.value = '';
      addTutorMessage(msg);
    };
  }
}

function addTutorMessage(msg) {
  const messages = $('tutorMessages');
  if (!messages) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.textContent = msg;
  messages.appendChild(userMsg);

  // Simulated AI response
  const aiMsg = document.createElement('div');
  aiMsg.className = 'chat-msg ai';
  aiMsg.textContent = generateTutorResponse(msg);
  messages.appendChild(aiMsg);

  messages.scrollTop = messages.scrollHeight;
}

function generateTutorResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('türev') || lower.includes('turev')) {
    return '📈 Türev: Bir fonksiyonun anlık değişim hızıdır. f(x) = xⁿ ise f\'(x) = n·xⁿ⁻¹. Örnek: f(x) = x³ → f\'(x) = 3x². Başka soruların varsa devam edelim!';
  }
  if (lower.includes('integral')) {
    return '📐 İntegral: Türevin tersidir. ∫xⁿ dx = xⁿ⁺¹/(n+1) + C. Alan hesaplamada kullanılır. Hangisinden devam edelim?';
  }
  if (lower.includes('plan')) {
    return '📅 Harika bir plan önerisi: 1) 25 dk pomodoro ile konu çalış 2) 5 dk mola 3) 10 soru çöz 4) Tekrar. Bunu planlayıcıya ekleyebilirsin!';
  }
  if (lower.includes('denklem')) {
    return '🧮 Denklem çözelim! ax² + bx + c = 0 formundaki ikinci derece denklemler için x = (-b ± √(b²-4ac))/2a formülünü kullan. Örnek bir denklem ver, birlikte çözelim!';
  }
  if (lower.includes('motivasyon') || lower.includes('motiv')) {
    return '💪 Sen çok güçlüsün! Her gün attığın küçük adımlar seni hedefine taşıyor. Bugün de devam et, başaracaksın!';
  }
  if (lower.includes('fotosentez')) {
    return '🌿 Fotosentez: Bitkilerin güneş ışığı, CO₂ ve su kullanarak glikoz ve O₂ ürettiği süreçtir. 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Daha fazla bilgi istersen sor!';
  }
  return `🤖 Harika soru! "${msg}" konusunu birlikte çalışalım. Bu konuyla ilgili bir soru sormak istersen devam edebiliriz. Pratik yapmak en iyi öğrenme yöntemidir!`;
}

// ===== AI Teacher & Student Selection =====
function renderTeacherSelection() {
  renderSubjectGrid('teacherSubjectGrid', 'teacher');
  renderTeacherTopics();

  const backBtn = $('teacherSelectionBack');
  if (backBtn) {
    backBtn.onclick = () => showPage('dashboard');
  }

  const changeSubject = $('teacherChangeSubject');
  if (changeSubject) {
    changeSubject.onclick = () => {
      if ($('teacherTopicStep')) $('teacherTopicStep').style.display = 'none';
      if ($('teacherSubjectGrid')) $('teacherSubjectGrid').style.display = '';
    };
  }

  const startChat = $('teacherStartChat');
  if (startChat) {
    startChat.onclick = () => {
      if ($('teacherSelection')) $('teacherSelection').style.display = 'none';
      if ($('teacherChat')) $('teacherChat').style.display = '';
      initTeacherChat();
    };
  }
}

function renderSubjectGrid(containerId, type) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = '';
  SUBJECTS.forEach((subject) => {
    const card = document.createElement('div');
    card.className = 'subject-card';
    card.innerHTML = `
      <span class="subject-icon">${CLASS_ICONS[subject] || '📚'}</span>
      <span class="subject-name">${subject}</span>
    `;
    card.onclick = () => {
      container.querySelectorAll('.subject-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      AppState.activeSubject = subject;
      if (type === 'teacher') renderTeacherTopics();
      else renderStudentTopics();
    };
    container.appendChild(card);
  });
}

function renderTeacherTopics() {
  const container = $('teacherTopicGrid');
  if (!container) return;
  const step = $('teacherTopicStep');
  if (step) step.style.display = '';

  container.innerHTML = '';
  const topics = CURRICULUM[AppState.activeLevel]?.[AppState.activeSubject] || [];
  topics.forEach((topic) => {
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.innerHTML = `
      <span class="topic-icon">${topic.icon}</span>
      <span class="topic-name">${topic.name}</span>
      <span class="topic-sub">${AppState.activeLevel.toUpperCase()}</span>
    `;
    card.onclick = () => {
      container.querySelectorAll('.topic-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      AppState.activeTopic = topic.id;
      const startChat = $('teacherStartChat');
      if (startChat) startChat.disabled = false;
    };
    container.appendChild(card);
  });

  const startChat = $('teacherStartChat');
  if (startChat) startChat.disabled = true;
}

function initTeacherChat() {
  const toggle = $('teacherToggle');
  const boardBox = $('teacherBoardBox');
  if (toggle && boardBox) {
    toggle.onclick = () => {
      boardBox.style.display = boardBox.style.display === 'none' ? '' : 'none';
    };
  }

  const clearBtn = $('teacherClear');
  if (clearBtn) {
    clearBtn.onclick = () => {
      const canvas = $('teacherBoard');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }

  // Chat
  const teacherForm = $('teacherForm');
  if (teacherForm) {
    teacherForm.onsubmit = (e) => {
      e.preventDefault();
      const input = $('teacherInput');
      const msg = input.value.trim();
      if (!msg) return;
      input.value = '';
      addChatMessage('teacherMessages', msg, 'user');
      setTimeout(() => {
        addChatMessage('teacherMessages', generateTutorResponse(msg), 'ai');
      }, 300);
    };
  }

  // Suggest chips
  document.querySelectorAll('#teacherSuggestChips .ai-chip').forEach((chip) => {
    chip.onclick = () => {
      const txt = chip.dataset.txt;
      const input = $('teacherInput');
      if (input) {
        input.value = txt;
        input.focus();
      }
    };
  });
}

function renderStudentSelection() {
  renderSubjectGrid('studentSubjectGrid', 'student');
  renderStudentTopics();

  const backBtn = $('studentSelectionBack');
  if (backBtn) {
    backBtn.onclick = () => showPage('dashboard');
  }

  const changeSubject = $('studentChangeSubject');
  if (changeSubject) {
    changeSubject.onclick = () => {
      if ($('studentTopicStep')) $('studentTopicStep').style.display = 'none';
      if ($('studentSubjectGrid')) $('studentSubjectGrid').style.display = '';
    };
  }

  const startChat = $('studentStartChat');
  if (startChat) {
    startChat.onclick = () => {
      if ($('studentSelection')) $('studentSelection').style.display = 'none';
      if ($('studentChat')) $('studentChat').style.display = '';
      initStudentChat();
    };
  }
}

function renderStudentTopics() {
  const container = $('studentTopicGrid');
  if (!container) return;
  const step = $('studentTopicStep');
  if (step) step.style.display = '';

  container.innerHTML = '';
  const topics = CURRICULUM[AppState.activeLevel]?.[AppState.activeSubject] || [];
  topics.forEach((topic) => {
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.innerHTML = `
      <span class="topic-icon">${topic.icon}</span>
      <span class="topic-name">${topic.name}</span>
      <span class="topic-sub">${AppState.activeLevel.toUpperCase()}</span>
    `;
    card.onclick = () => {
      container.querySelectorAll('.topic-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      AppState.activeTopic = topic.id;
      const startChat = $('studentStartChat');
      if (startChat) startChat.disabled = false;
    };
    container.appendChild(card);
  });

  const startChat = $('studentStartChat');
  if (startChat) startChat.disabled = true;
}

function initStudentChat() {
  const toggle = $('studentToggle');
  const boardBox = $('studentBoardBox');
  if (toggle && boardBox) {
    toggle.onclick = () => {
      boardBox.style.display = boardBox.style.display === 'none' ? '' : 'none';
    };
  }

  const clearBtn = $('studentClear');
  if (clearBtn) {
    clearBtn.onclick = () => {
      const canvas = $('studentBoard');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }

  const studentForm = $('studentForm');
  if (studentForm) {
    studentForm.onsubmit = (e) => {
      e.preventDefault();
      const input = $('studentInput');
      const msg = input.value.trim();
      if (!msg) return;
      input.value = '';
      addChatMessage('studentMessages', msg, 'user');
      setTimeout(() => {
        addChatMessage('studentMessages', generateStudentResponse(msg), 'ai');
      }, 300);
    };
  }

  document.querySelectorAll('#studentSuggestChips .ai-chip').forEach((chip) => {
    chip.onclick = () => {
      const txt = chip.dataset.txt;
      const input = $('studentInput');
      if (input) {
        input.value = txt;
        input.focus();
      }
    };
  });
}

function generateStudentResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('nasıl geçti') || lower.includes('nasil gecti') || lower.includes('günüm')) {
    return '💬 Bugününü dinliyorum! Çalıştığın konular, çözdüğün sorular ve hissettiklerin hakkında konuşalım. Nasıl geçti?';
  }
  if (lower.includes('motivasyon') || lower.includes('motiv')) {
    return '💪 Sen bugün de çok iyisin! Dün senden daha güçlüsün. Küçük adımlar büyük başarılar getirir. Devam et!';
  }
  if (lower.includes('program') || lower.includes('programı')) {
    return '📅 İşte sana özel çalışma programı: Sabah: 1 konu tekrar → Öğlen: 20 soru → Akşam: 1 yeni konu → Gece: Tekrar. Bugün başlayalım mı?';
  }
  if (lower.includes('matematik')) {
    return '🧮 Matematik çalışmak için: 1) Konuyu öğren 2) Örnek çöz 3) Kendin dene 4) Yanlışlarını analiz et. Zayıf konunu seçip quiz çözebilirsin!';
  }
  if (lower.includes('fotosentez')) {
    return '🌿 Fotosentez hakkında konuşalım! 6CO₂ + 6H₂O + ışık → C₆H₁₂O₆ + 6O₂. Nerede takıldın?';
  }
  return `🎧 Seni dinliyorum! "${msg}" hakkında konuştuk. Çalışma motivasyonunu artırmak için birlikte plan yapabiliriz.`;
}

function addChatMessage(containerId, msg, type) {
  const container = $(containerId);
  if (!container) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.textContent = msg;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// ===== Whiteboard Drawing =====
function initWhiteboards() {
  const boards = [
    { canvasId: 'teacherBoard', toolsId: 'teacherTools', clearId: 'teacherClear' },
    { canvasId: 'studentBoard', toolsId: 'studentTools', clearId: 'studentClear' },
    { canvasId: 'tutorBoard', toolsId: 'tutorTools', clearId: 'tutorClear' },
  ];

  boards.forEach(({ canvasId, toolsId, clearId }) => {
    const canvas = $(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let tool = 'pen';
    let color = '#ffffff';
    let startX = 0, startY = 0;
    // For triangle: store vertices
    let trianglePoints = [];
    let triangleDrawn = [];

    // Set canvas size
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Redraw saved triangle data if exists
      if (triangleDrawn.length > 0) {
        triangleDrawn.forEach((points) => {
          if (points.length === 3) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            ctx.lineTo(points[1].x, points[1].y);
            ctx.lineTo(points[2].x, points[2].y);
            ctx.closePath();
            ctx.strokeStyle = points[0].color || '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Clear board
    const clearBtn = $(clearId);
    if (clearBtn) {
      clearBtn.onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        triangleDrawn = [];
        trianglePoints = [];
      };
    }

    // Tools
    const toolsContainer = $(toolsId);
    if (toolsContainer) {
      toolsContainer.querySelectorAll('.wb-tool').forEach((btn) => {
        btn.onclick = () => {
          toolsContainer.querySelectorAll('.wb-tool').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          tool = btn.dataset.tool;
          trianglePoints = [];
        };
      });
    }

    // Colors
    canvas.closest('.whiteboard-box')?.querySelectorAll('.wb-color input').forEach((radio) => {
      radio.onchange = () => {
        color = radio.value;
      };
    });

    // Drawing
    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
      drawing = true;

      // For triangle: save points on each click
      if (tool === 'triangle') {
        trianglePoints.push({ x: startX, y: startY });
        // Draw a small dot at click point
        ctx.beginPath();
        ctx.arc(startX, startY, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (trianglePoints.length === 3) {
          // Draw the triangle
          ctx.beginPath();
          ctx.moveTo(trianglePoints[0].x, trianglePoints[0].y);
          ctx.lineTo(trianglePoints[1].x, trianglePoints[1].y);
          ctx.lineTo(trianglePoints[2].x, trianglePoints[2].y);
          ctx.closePath();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.stroke();
          triangleDrawn.push([...trianglePoints.map((p) => ({ ...p, color }))]);
          trianglePoints = [];
        }
        drawing = false;
        return;
      }

      if (tool === 'pen') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.strokeStyle = color;
      ctx.lineWidth = tool === 'eraser' ? 20 : 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (tool === 'pen') {
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === 'eraser') {
        ctx.clearRect(x - 10, y - 10, 20, 20);
      }
    });

    canvas.addEventListener('mouseup', (e) => {
      if (!drawing) {
        drawing = false;
        return;
      }
      drawing = false;
      const rect = canvas.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      } else if (tool === 'circle') {
        const radius = Math.sqrt(
          Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2),
        );
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (tool === 'rect') {
        const w = endX - startX;
        const h = endY - startY;
        ctx.strokeRect(startX, startY, w, h);
      }
    });

    canvas.addEventListener('mouseleave', () => {
      drawing = false;
    });
  });
}

// ===== Profile and badge collection =====
const BADGE_DATA = [
  [1,'🌊','İlk Dalga','İlk zamanlayıcı oturumunu tamamla.',50], [2,'🦈','Küçük Balina','Toplam 5 oturum bitir.',150], [3,'🐋','Okyanus Hakimi','Toplam 25 oturum bitir.',500], [4,'🔱','Poseidon\'un Saati','Toplam 100 oturum bitir.',2000], [5,'⏱️','Akıntıya Karşı','Kesintisiz 50 dakika odaklan.',300], [6,'🌪️','Derin Girdap','Tek seferde 90 dakika odaklan.',600], [7,'🌅','Gün Doğumu Çalışması','05:00 - 08:00 arasında oturum tamamla.',250], [8,'🌌','Gece Gezgini','00:00 - 04:00 arasında oturum tamamla.',250], [9,'📅','İstikrarlı Resif','Üst üste 3 gün çalış.',400], [10,'🏝️','Sönmez Enerji','Üst üste 7 gün günde 2 oturum tamamla.',1000], [11,'🐙','Kollu Çalışma','Aynı gün 5 farklı oturum tamamla.',500], [12,'⏳','Kum Tanesi','Toplam 500 dakika odaklan.',600], [13,'🐚','Deniz Kabuğu Biriktiricisi','Toplam 2000 dakika odaklan.',1500], [14,'🧭','Pusula Ustası','Haftalık odak hedefini doldur.',700], [15,'🚀','Işık Hızı','Biten oturumdan sonra yenisini başlat.',200], [16,'🧊','Buzdağı','Sekme değiştirmeden 30 dakika odaklan.',300], [17,'⚓','Demir Atmak','Tek günde 5 saat odaklan.',1200], [18,'🧜‍♂️','Deniz Erkeği','Erkek avatarıyla 10 oturum tamamla.',200], [19,'🧜‍♀️','Deniz Kızı','Kadın avatarıyla 10 oturum tamamla.',200], [20,'🛠️','Tamirci','Zamanlayıcıyı düzenle veya sıfırla.',50], [21,'🌬️','Rüzgarı Yakala','Kısa moladan zamanında dön.',150], [22,'🏄‍♂️','Dalga Sörfçüsü','Uzun mola sonrası oturum bitir.',200], [23,'🛑','Molasız Maraton','İki uzun oturumu tamamla.',500], [24,'📈','Sürekli Yükseliş','Önceki haftaya göre %20 geliş.',600], [25,'👑','Okyanusun Kralı','Aylık ilk 10’a gir.',2500],
  [26,'📝','İlk İnci','İlk quizini çöz.',50], [27,'🎯','Nokta Atışı','Bir testi tamamen doğru bitir.',400], [28,'🧠','Matematik Dehası','Bir matematik konusunu %100 ustalaştır.',1000], [29,'🧪','Bilim İnsanı','Bir fen konusunu %100 ustalaştır.',1000], [30,'📜','Tarihçi Balık','Sosyal testlerinde 50 doğruya ulaş.',500], [31,'🗣️','Edebiyat Gurusu','20 doğruyu arka arkaya yap.',600], [32,'⚡','Hızlı Yüzücü','Bir soruyu 5 saniyede doğru çöz.',150], [33,'🐢','Sakin Kaplumbağa','İki dakika düşünüp doğruyu bul.',150], [34,'🔄','Geri Dönüş','10 yanlışı doğruya çevir.',400], [35,'📊','Matris Çözücü','5 konuyu yüksek ustalığa çıkar.',800], [36,'🗺️','Harita Kaşifi','Hatasız coğrafya testi bitir.',350], [37,'📐','Geometri Sihirbazı','Üçgenlerde 10 doğru seri yap.',500], [38,'🧮','Sayıların Efendisi','Temel Kavramlar quizini bitir.',400], [39,'🔍','Detaycı','Zayıf konu quizini çöz.',300], [40,'🥊','Kusursuz Seri','15 soruyu arka arkaya bil.',700], [41,'💎','Kristal Doğruluk','Başarı yüzdesini %85’e çıkar.',1200], [42,'🎒','Çalışkan Öğrenci','Bir günde 5 quiz bitir.',500], [43,'🏫','Sınav Müdavimi','50 benzersiz quiz tamamla.',1500], [44,'🏁','Son Düzlük','Son saniyede doğru cevap ver.',250], [45,'🎈','Hafif Akıntı','Kolay testi hatasız bitir.',200], [46,'🌊','Derin Su','Zor testi %80 başarıyla bitir.',500], [47,'🧩','Mantık Bükücü','Problemlerde 5 doğru seri yap.',400], [48,'🔋','Tam Kapasite','Aynı gün Matematik ve Türkçe quizini bitir.',400], [49,'🏹','Avcı','3 zayıf konuyu güçlendir.',900], [50,'🎓','Mezuniyet Yakın','Tüm TYT konularında %50’ye ulaş.',3000],
  [51,'📌','İlk Görev','İlk planner görevini ekle.',50], [52,'🧹','Temiz Sahil','Günlük görevlerini tamamla ve temizle.',300], [53,'🗓️','Haftalık Düzen','10 planner görevi ekle.',400], [54,'🛒','İlk Alışveriş','İlk mağaza ödülünü al.',100], [55,'💰','Altın Balık','500 XP biriktir.',500], [56,'🏦','Hazine Odası','2000 XP biriktir.',1500], [57,'🛍️','Alışveriş Çılgını','Aynı gün 3 ürün al.',600], [58,'🦪','İnci Avcısı','Premium görevi tamamla.',1000], [59,'🃏','Koleksiyoncu','3 özel tema aç.',800], [60,'🎯','Hedef Odaklı','5 yüksek öncelikli görev bitir.',400], [61,'⏰','Erken Kalkan','09:00’dan önce görev bitir.',200], [62,'📝','Düzenli Noter','İlk ders notunu kaydet.',150], [63,'📁','Arşivci','30 tamamlanmış görevi listele.',500], [64,'🌟','Yıldız Öğrenci','5 gün hedeflerini tamamla.',1200], [65,'🍃','Hafif Yük','5 tamamlanmış görevi sil.',200], [66,'🦾','İstikrarlı Planner','Planner’ı bir hafta kullan.',500], [67,'🔮','Gelecek Planı','Gelecek aya görev ekle.',300], [68,'🎈','Küçük Mutluluklar','En ucuz ödülü satın al.',50], [69,'🏝️','Büyük Yatırım','En pahalı ödülü satın al.',1000], [70,'🤝','Destek Rolü','AI Öğretmen’den plan tavsiyesi al.',250], [71,'🛑','Erteleme Canavarı','Gecikmiş görevi tamamla.',200], [72,'🥇','Birincil Hedef','Günün önemli görevini bitir.',300], [73,'🎨','Tasarımcı','Profil temasını özelleştir.',150], [74,'💎','Seçkin Akvaryum','Tüm deniz figürlerini aç.',2000], [75,'🌌','Gece Planı','22:00’den sonra yarını planla.',300],
  [76,'🤫','Whale Shark’ın Sırrı','Gizemli zaman eşiğini keşfet.',500,true], [77,'💥','Sabır Testi','Quizini son saniyede teslim et.',400,true], [78,'💤','Derin Uyku','Sekmeden uzun süre uzaklaş.',200,true], [79,'🦜','Geveze Balık','AI ile uzun bir konuşma yap.',500,true], [80,'🚫','Panik Butonu','Başladıktan hemen sonra iptal et.',100,true], [81,'🎭','Gizli Kimlik','Profil ismini üçten fazla değiştir.',300,true], [82,'🍀','Şanslı Dalga','Dört tahmin sorusunu doğru bil.',600,true], [83,'🕳️','Karadelik','Beş konuyu boş bırak.',300,true], [84,'💸','İflas','Harcama sonrası 0 XP’ye düş.',400,true], [85,'🦉','Gece Baykuşu','03:33’te matematik quizini aç.',666,true], [86,'🥶','Donmuş Deniz','10 dakika hareketsiz kal.',150,true], [87,'🏃‍♂️','Hızlı Kaçış','Girişten sonra hızla çıkış yap.',100,true], [88,'🫧','Köpük Mesajı','Gizli bir ipucunu bul.',250,true], [89,'🪼','Jelibon Akıntısı','Beklenmedik bir süreyi tamamla.',350,true], [90,'🦀','Yengeç Adımı','Aynı görevi üç kez yeniden planla.',180,true], [91,'🌑','Ayın Öteki Yüzü','Gece yarısı gizli sayfayı aç.',450,true], [92,'🗝️','Mercan Anahtarı','Kilitli koleksiyonu keşfet.',700,true], [93,'🧿','Mavi Nazar','Yedi gün boyunca hata yapma.',800,true], [94,'🛸','Bilinmeyen Sular','Yeni bir özellik dene.',500,true], [95,'🎼','Derinlik Senfonisi','Üç farklı çalışma modunu kullan.',300,true], [96,'🧊','Sessiz Buz','Bir oturumu hiç durdurmadan bitir.',600,true], [97,'🌠','Kayan Yıldız','Bir günde üç hedefi aş.',450,true], [98,'🪸','Mercan Muhafızı','Akvaryum koleksiyonunu büyüt.',900,true], [99,'🌊','Sonsuz Gelgit','Toplam 30 gün geri dön.',1500,true], [100,'✨','Okyanusun Efsanesi','Tüm gizli başarıları keşfet.',5000,true],
].map(([id, icon, name, description, xp, secret = false]) => ({ id, icon, name, description, xp, secret }));

function getBadgeState(badge) {
  const timer = readStorage(STORAGE_KEYS.timerPomodoro, {});
  const history = readStorage(STORAGE_KEYS.quizHistory, []);
  const owned = readStorage(STORAGE_KEYS.ownedItems, []);
  const tasks = Object.values(getTasks()).flat();
  const sessions = timer.sessionCount || 0;
  const focusMinutes = timer.focusMinutes || 0;
  const totalQuizCorrect = history.reduce((sum, entry) => sum + (entry.correct || 0), 0);
  const totalQuizQuestions = history.reduce((sum, entry) => sum + (entry.total || 0), 0);
  const accuracy = totalQuizQuestions ? (totalQuizCorrect / totalQuizQuestions) * 100 : 0;
  if (badge.secret) return false;
  const thresholds = { 1: sessions >= 1, 2: sessions >= 5, 3: sessions >= 25, 4: sessions >= 100, 5: focusMinutes >= 50, 12: focusMinutes >= 500, 13: focusMinutes >= 2000, 26: history.length >= 1, 27: history.some((entry) => entry.total > 0 && entry.correct === entry.total), 41: accuracy >= 85, 43: history.length >= 50, 51: tasks.length >= 1, 53: tasks.length >= 10, 54: owned.length >= 1, 55: AppState.xp >= 500, 56: AppState.xp >= 2000 };
  return Boolean(thresholds[badge.id]);
}

function renderProfileBadges() {
  const grid = $('profileBadgesGrid');
  if (!grid) return;
  const earned = BADGE_DATA.filter(getBadgeState).length;
  if ($('profileBadgeCount')) $('profileBadgeCount').textContent = `${earned} / ${BADGE_DATA.length}`;
  grid.innerHTML = BADGE_DATA.map((badge) => {
    const unlocked = getBadgeState(badge);
    const description = badge.secret && !unlocked ? 'Gizli Başarı: Keşfedilmeyi Bekliyor!' : badge.description;
    return `<article class="profile-badge ${unlocked ? 'earned' : 'locked'}" data-tooltip="${escapePlannerHtml(description)}"><span class="profile-badge-icon">${badge.secret && !unlocked ? '🔒' : badge.icon}</span><strong>${badge.secret && !unlocked ? 'Gizli Rozet' : badge.name}</strong><small>+${badge.xp} XP</small></article>`;
  }).join('');
}

function renderProfileStudyChart() {
  const chart = $('profileWeeklyChart');
  if (!chart) return;
  const values = WEEKDAYS.map((_, index) => {
    const key = getDayKey(index);
    return (getTasks()[key] || []).reduce((sum, task) => sum + (Number(task.duration) || 0), 0);
  });
  const timer = readStorage(STORAGE_KEYS.timerPomodoro, {});
  values[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] += Number(timer.focusMinutes) || 0;
  const max = Math.max(...values, 1);
  chart.innerHTML = values.map((value, index) => `<div class="profile-chart-column"><span class="profile-chart-value">${value} dk</span><div class="profile-chart-track"><i style="height:${Math.max(7, Math.round((value / max) * 100))}%"></i></div><strong>${WEEKDAYS[index].slice(0, 3)}</strong></div>`).join('');
}

function renderProfilePage() {
  const avatarEl = $('profileAvatar');
  const nameEl = $('profileName');
  const emailEl = $('profileEmail');

  if (avatarEl) avatarEl.textContent = AppState.selectedAvatar;
  if (nameEl) nameEl.textContent = AppState.currentUser;
  if (emailEl) emailEl.textContent = AppState.currentUserEmail || 'hesap@yolharitasi.com';

  // Stats
  const progress = getProgress();
  const allTopics = getAllTopics();
  const completedCount = Object.values(progress).filter((p) => p.total > 0).length;
  const totalCount = allTopics.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const weakCount = allTopics.filter((t) => {
    const p = progress[t.id];
    return p && p.total > 0 && (p.correct / p.total) < 0.5;
  }).length;

  if ($('statCompleted')) $('statCompleted').textContent = completedCount;
  if ($('statTotal')) $('statTotal').textContent = totalCount;
  if ($('statPct')) $('statPct').textContent = `${pct}%`;
  if ($('statWeak')) $('statWeak').textContent = weakCount;

  // Avatar change
  const avatarChangeBtn = $('avatarChangeBtn');
  const avatarPicker = $('avatarPicker');
  if (avatarChangeBtn && avatarPicker) {
    avatarChangeBtn.onclick = () => {
      avatarPicker.style.display = avatarPicker.style.display === 'none' ? '' : 'none';
    };
  }

  const avatarPickerGrid = $('avatarPickerGrid');
  if (avatarPickerGrid) {
    avatarPickerGrid.innerHTML = '';
    AVATARS.forEach((avatar) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'auth-avatar' + (avatar === AppState.selectedAvatar ? ' selected' : '');
      btn.textContent = avatar;
      btn.onclick = () => {
        AppState.selectedAvatar = avatar;
        writeStorage(STORAGE_KEYS.avatar, avatar);
        if (avatarEl) avatarEl.textContent = avatar;
        if (avatarPicker) avatarPicker.style.display = 'none';
        renderProfilePage();
      };
      avatarPickerGrid.appendChild(btn);
    });
  }

  // Rename
  const editNameBtn = $('editNameBtn');
  const renameForm = $('renameForm');
  if (editNameBtn && renameForm) {
    editNameBtn.onclick = () => {
      renameForm.style.display = 'flex';
      $('renameInput').value = AppState.currentUser;
    };
  }

  const renameSaveBtn = $('renameSaveBtn');
  if (renameSaveBtn) {
    renameSaveBtn.onclick = () => {
      const newName = $('renameInput').value.trim() || AppState.currentUser;
      AppState.currentUser = newName;
      writeStorage(STORAGE_KEYS.displayName, newName);
      if (nameEl) nameEl.textContent = newName;
      if (renameForm) renameForm.style.display = 'none';
      renderDashboard();
    };
  }

  const renameCancelBtn = $('renameCancelBtn');
  if (renameCancelBtn) {
    renameCancelBtn.onclick = () => {
      if (renameForm) renameForm.style.display = 'none';
    };
  }

  renderMasteryMatrix();
  renderClassProgress();
  renderWeakTopics();
  renderProfileStudyChart();
  renderProfileBadges();
}

function renderMasteryMatrix() {
  const matrixEl = $('masteryMatrix');
  if (!matrixEl) return;
  const progress = getProgress();
  matrixEl.innerHTML = '';

  ['tyt', 'ayt'].forEach((level) => {
    const block = document.createElement('div');
    block.className = 'mastery-block';
    block.innerHTML = `<div class="mastery-block-title">${level.toUpperCase()} Konuları</div>`;
    const grid = document.createElement('div');
    grid.className = 'mastery-grid';

    const subjects = Object.keys(CURRICULUM[level]);
    subjects.forEach((subject) => {
      CURRICULUM[level][subject].forEach((topic) => {
        const entry = progress[topic.id];
        const percent = getMasteryPercent(topic.id);
        const isSolved = entry && entry.total > 0;
        const color = isSolved ? masteryColor(percent) : '#e5e5e5';
        const textColor = isSolved ? '#fff' : '#777';

        const cell = document.createElement('div');
        cell.className = 'mastery-cell';
        cell.style.background = color;
        cell.style.color = textColor;
        cell.innerHTML = `
          <div class="mastery-cell-name">${topic.name}</div>
          <div class="mastery-cell-pct">${isSolved ? `${percent}%` : 'Yeni'}</div>
          <div class="mastery-cell-bar"><i style="width:${isSolved ? percent : 0}%"></i></div>
        `;
        grid.appendChild(cell);
      });
    });

    block.appendChild(grid);
    matrixEl.appendChild(block);
  });
}

function renderClassProgress() {
  const container = $('profileClassProgress');
  if (!container) return;
  const progress = getProgress();
  container.innerHTML = '';

  const subjects = Object.keys(CURRICULUM.tyt);
  subjects.forEach((subject) => {
    const allTopics = [...CURRICULUM.tyt[subject], ...(CURRICULUM.ayt[subject] || [])];
    const doneTopics = allTopics.filter((t) => progress[t.id]?.total > 0);
    const pct = allTopics.length > 0 ? Math.round((doneTopics.length / allTopics.length) * 100) : 0;
    const color = pct >= 70 ? '#58cc02' : pct >= 40 ? '#ffc800' : pct > 0 ? '#ff4b4b' : '#e5e5e5';

    container.innerHTML += `
      <div class="profile-class-card">
        <div class="profile-class-top">
          <span class="profile-class-name"><span class="cls-icon">${CLASS_ICONS[subject] || '📚'}</span> ${subject}</span>
          <span class="profile-class-pct">%${pct}</span>
        </div>
        <div class="profile-class-bar">
          <div class="profile-class-fill" style="width:${pct}%;background:${color};"></div>
        </div>
      </div>
    `;
  });
}

function renderWeakTopics() {
  const container = $('profileWeakTopics');
  if (!container) return;
  const progress = getProgress();

  const weakTopics = getAllTopics().filter((t) => {
    const p = progress[t.id];
    return p && p.total > 0 && (p.correct / p.total) < 0.5;
  });

  if (weakTopics.length === 0) {
    container.innerHTML = '<div class="profile-empty">Zayıf konun yok, harikasın! 🎉</div>';
    return;
  }

  container.innerHTML = weakTopics.map((t) => `
    <div class="profile-weak-item">
      <span class="profile-weak-icon">⚠️</span>
      <span class="profile-weak-text">${t.subject} • ${t.name}</span>
    </div>
  `).join('');
}

// ===== Store =====
const STORE_ITEMS = [
  { id: 'shrimp-snack', icon: '🦐', name: 'Karides Atıştırmalığı', desc: 'Mevcut mola sürene kalıcı +5 dakika bonus ekler.', price: 50 },
  { id: 'deep-dive', icon: '🤿', name: 'Derin Dalış Ekipmanı', desc: 'Bir sonraki tamamlanan timer oturumunun XP ödülünü 2x yapar.', price: 150 },
  { id: 'frozen-current', icon: '🧊', name: 'Dondurucu Akıntı', desc: 'Timer çalışırken acil durum için 3 dakikalık mola hakkı verir.', price: 200 },
  { id: 'chibi-premium', icon: '👑', name: 'Chibi Premium Bilet', desc: '24 saat boyunca Efsanevi Balina unvanını açar.', price: 1000 },
  { id: 'night-aquarium', icon: '🎨', name: 'Gece Akvaryumu Teması', desc: 'Koyu okyanus temasını kalıcı olarak açar.', price: 300 },
  { id: 'sea-star-joker', icon: '🔮', name: 'Geleceği Gören Deniz Yıldızı', desc: 'Zorlandığın bir quiz sorusunda iki yanlış şıkkı eler.', price: 250 },
  { id: 'streak-freeze', icon: '🧊', name: 'Seri Dondurucu', desc: 'Bir günü kaçırırsan serini korumak için otomatik harcanır.', price: 400, repeatable: true },
  { id: 'lucky-oyster', icon: '🦪', name: 'Şanslı İstiridye', desc: 'Satın alındığında 25 XP teselli veya 300 XP ikramiye kazan.', price: 100, repeatable: true },
];

function applyStoreReward(itemId) {
  const state = getRewardState();
  if (itemId === 'shrimp-snack') {
    state.breakTimeBonus = (state.breakTimeBonus || 0) + 5;
    if (timerPomodoroMode === 'short' && !timerPomodoroRunning) {
      timerPomodoroInitialSeconds += 5 * 60;
      timerPomodoroSeconds += 5 * 60;
      if ($('timerPomodoroDuration')) $('timerPomodoroDuration').value = String(Math.round(timerPomodoroInitialSeconds / 60));
    }
  }
  if (itemId === 'deep-dive') state.xpMultiplier = 2;
  if (itemId === 'frozen-current') state.freezeUntil = Date.now() + (3 * 60 * 1000);
  if (itemId === 'chibi-premium') state.premiumExpiresAt = Date.now() + (24 * 60 * 60 * 1000);
  if (itemId === 'night-aquarium') state.nightTheme = true;
  if (itemId === 'sea-star-joker') state.jokerAvailable = (state.jokerAvailable || 0) + 1;
  if (itemId === 'streak-freeze') state.streakFreezeCount = (state.streakFreezeCount || 0) + 1;
  if (itemId === 'lucky-oyster') {
    const jackpot = Math.random() < .2;
    const reward = jackpot ? 300 : 25;
    addXp(reward);
    saveRewardState(state);
    return jackpot ? 'Şanslısın! 300 XP ikramiye kazandın.' : 'İstiridyeden 25 XP çıktı.';
  }
  saveRewardState(state);
  return '';
}

function renderStorePage() {
  const itemsEl = $('storeItems');
  if (!itemsEl) return;

  const ownedItems = readStorage(STORAGE_KEYS.ownedItems, []);
  if ($('storeXpDisplay')) $('storeXpDisplay').textContent = AppState.xp;

  itemsEl.innerHTML = STORE_ITEMS.map((item) => {
    const owned = ownedItems.includes(item.id);
    const purchaseCount = ownedItems.filter((ownedId) => ownedId === item.id).length;
    const canAfford = AppState.xp >= item.price;

    return `
      <div class="store-item ${owned ? 'owned' : ''}">
        <div class="store-item-icon">${item.icon}</div>
        <div class="store-item-name">${item.name}</div>
        <div class="store-item-desc">${item.desc}</div>
        ${owned && !item.repeatable ? '<div class="store-owned-badge">✓ Sahipsin</div>' : `
           <div class="store-item-price"><span class="price-amount">${item.price}</span> ⚡ XP</div>
           <button class="store-buy-btn ${canAfford ? '' : 'disabled'}" data-item="${item.id}" ${canAfford ? '' : 'disabled'}>
             ${item.repeatable && purchaseCount ? `Aktif · ${purchaseCount} ${item.id === 'streak-freeze' ? 'adet' : ''} | Satın Al` : canAfford ? 'Satın Al' : 'Yetersiz XP'}
           </button>
         `}
      </div>
    `;
  }).join('');

  itemsEl.querySelectorAll('.store-buy-btn:not(.disabled)').forEach((btn) => {
    btn.onclick = () => {
      const itemId = btn.dataset.item;
      const item = STORE_ITEMS.find((i) => i.id === itemId);
      if (!item) return;

       if (AppState.xp >= item.price) {
         AppState.xp -= item.price;
        writeStorage(STORAGE_KEYS.xp, AppState.xp);
        const ownedItems = readStorage(STORAGE_KEYS.ownedItems, []);
        ownedItems.push(itemId);
         writeStorage(STORAGE_KEYS.ownedItems, ownedItems);
         const rewardMessage = applyStoreReward(itemId);
         playAppSound('purchase');
        updateXpDisplay();
        renderStorePage();
         showToast(`${item.icon} "${item.name}" satın alındı!${rewardMessage ? ` ${rewardMessage}` : ''}`);
      }
    };
  });
}

function showToast(message) {
  let toast = document.querySelector('.store-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'store-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Render All =====
function renderAll() {
  updateXpDisplay();
  renderDashboard();
  if (AppState.activePage === 'learn') renderRoadmap();
}

// ===== Initialize =====
function init() {
  initAuth();
  initNavigation();
  initTheme();
  initDropdowns();
  initLevelButtons();
  initModal();
  initWhiteboards();
  initPlannerForm();
  initPhraseInput();

  // Check if user is logged in
  const savedUser = readStorage(STORAGE_KEYS.currentUser, null);
  if (savedUser) {
    hideAuthOverlay();
    showPage('dashboard');
    renderAll();
  } else {
    showAuthOverlay();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
