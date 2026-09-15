function toggleSettings() {
  const panel = $('settingsContainer');
  if (panel) panel.style.display = panel.style.display === 'none' ? '' : 'none';
}

function setTheme(mode) {
  document.body.classList.toggle('dark-mode', mode === 'dark');
}

function toggleSound() {
  const audioEnabled = readStorage(STORAGE_KEYS.soundEnabled, true);
  writeStorage(STORAGE_KEYS.soundEnabled, !audioEnabled);
  alert('Ses ' + (!audioEnabled ? 'Açık' : 'Kapalı'));
}

// ===== Learn with Archie - TYT & AYT Yol Haritası =====

import { CURRICULUM } from './curriculum-data.js';
import { CIKMIS_TYT, CIKMIS_TYT_DERSLER } from './cikmis-tyt-data.js';
import { CIKMIS_AYT, CIKMIS_AYT_DERSLER } from './cikmis-ayt-data.js';
// chart.js UMD olarak public/libs altinda yereldir (bare import static
// yayinda cozulemez ve tum modulu oldururdu). UMD tum bilesenleri
// kayitli gelir; yoksa radar cizilmez ama uygulama calismaya devam eder.
const ChartJS = (typeof window !== 'undefined' && window.Chart) || null;

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
  wrongBook: 'archie.wrongbook',
  notes: 'archie.notes',
  xp: 'archie.xp',
  ownedItems: 'archie.ownedItems',
  streak: 'archie.streak',
  pomodoro: 'archie.pomodoro',
  timerCountdown: 'archie.timerCountdown',
  timerPomodoro: 'archie.timerPomodoro',
  focusLog: 'archie.focusLog',
  pearls: 'archie.pearls',
  rewardState: 'archie.rewardState',
  aquarium: 'archie.aquarium',
  metacognition: 'archie.metacognition',
  theme: 'archie.theme',
  soundEnabled: 'archie.soundEnabled',
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
  timerStarted: 'zamanlayıcıbaşladı.mp3',
  timerFinished: 'zamanlayıcıbitti.mp3',
  correct: 'doğrubildi.mp3',
  wrong: 'yanlışbildi.mp3',
  purchase: 'mağazasatınalma.mp3',
  planAdded: 'planeklendi.mp3',
  planDeleted: 'plansilme.mp3',
  click: 'tuştıklama.mp3',
};

function appSoundUrl(filename) {
  // Mutlak /sounds/... yolu alt dizinden yayında bozulur; taban adrese göre çöz.
  try {
    return new URL(`sounds/${encodeURIComponent(filename)}`, document.baseURI).href;
  } catch {
    return `sounds/${encodeURIComponent(filename)}`;
  }
}

function playAppSound(soundName) {
  const filename = APP_SOUNDS[soundName];
  if (!filename) return;
  if (!readStorage(STORAGE_KEYS.soundEnabled, true)) return;
  // Vercel static: /public/sounds/... ; vite dev: /sounds/... — ikisini de dene.
  const candidates = [
    `public/sounds/${encodeURIComponent(filename)}`,
    `sounds/${encodeURIComponent(filename)}`,
  ];
  const resolveUrl = (relative) => {
    try {
      return new URL(relative, document.baseURI).href;
    } catch {
      return relative;
    }
  };
  try {
    const audio = new Audio();
    audio.volume = 0.75;
    let index = 0;
    audio.onerror = () => {
      index += 1;
      if (index < candidates.length) {
        audio.src = resolveUrl(candidates[index]);
        const retry = audio.play();
        if (retry && typeof retry.catch === 'function') retry.catch(() => {});
      }
    };
    audio.src = resolveUrl(candidates[0]);
    const started = audio.play();
    if (started && typeof started.catch === 'function') {
      started.catch((err) => {
        // Kullanıcı etkileşimi öncesi tarayıcı engelleyebilir; sessizce geçme, logla.
        console.debug('[sound] oynatılamadı:', soundName, err?.message || err);
      });
    }
  } catch (err) {
    console.debug('[sound] hata:', soundName, err?.message || err);
  }
}

function handleGlobalClickSound(event) {
  const target = event.target.closest?.('button, a, [role="button"], input[type="button"], input[type="submit"]');
  if (!target || target.disabled) return;
  if (target.matches('.quiz-option, #timerPomodoroStart, .store-buy-btn, .planner-task-delete, .wb-clear, .chat-input button[type="submit"]')) return;
  playAppSound('click');
}

// ===== App State =====
let AppState = {
  currentUser: readStorage(STORAGE_KEYS.displayName, 'Öğrenci'),
  currentUserEmail: readStorage(STORAGE_KEYS.currentUser, ''),
  xp: readStorage(STORAGE_KEYS.xp, 0),
  pearls: readStorage(STORAGE_KEYS.pearls, 0),
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

// ===== Odak oturum hattı: tüm zamanlayıcılar buraya işler =====
function getFocusLog() {
  const log = readStorage(STORAGE_KEYS.focusLog, []);
  return Array.isArray(log) ? log : [];
}

function focusDayKey(time) {
  const d = new Date(time);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function timeAgoTr(time) {
  const diff = Math.max(0, Date.now() - time);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'şimdi';
  if (mins < 60) return `${mins} dk önce`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} sa önce`;
  const days = Math.floor(hours / 24);
  return `${days} gün önce`;
}

function getWeekStart() {
  const d = new Date();
  const idx = d.getDay() === 0 ? 6 : d.getDay() - 1;
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate() - idx, 0, 0, 0, 0);
  return start.getTime();
}

function getWeeklyFocusMinutes() {
  const values = [0, 0, 0, 0, 0, 0, 0];
  const start = getWeekStart();
  getFocusLog().forEach((entry) => {
    if (!entry || entry.t < start) return;
    const idx = new Date(entry.t).getDay() === 0 ? 6 : new Date(entry.t).getDay() - 1;
    values[idx] += Number(entry.minutes) || 0;
  });
  return values;
}

// Tek oturumu tarihli kaydet + sayaçları ilerlet. Her zamanlayıcı burayı çağırır.
function recordFocusSession(minutes) {
  const mins = Math.max(1, Math.round(Number(minutes) || 0));
  const log = getFocusLog();
  log.push({ t: Date.now(), minutes: mins });
  writeStorage(STORAGE_KEYS.focusLog, log.slice(-500));
  const tp = readStorage(STORAGE_KEYS.timerPomodoro, {});
  tp.sessionCount = (tp.sessionCount || 0) + 1;
  tp.focusMinutes = (tp.focusMinutes || 0) + mins;
  writeStorage(STORAGE_KEYS.timerPomodoro, tp);
  timerSessionCount = tp.sessionCount;
  timerFocusMinutes = tp.focusMinutes;
  addPearls(mins);
  return mins;
}

function updateXpDisplay() {
  const topbarXp = $('topbarXpValue');
  const storeXp = $('storeXpDisplay');
  const dashXp = $('dashXp');
  if (topbarXp) topbarXp.textContent = AppState.xp;
  if (storeXp) storeXp.textContent = AppState.xp;
  if (dashXp) dashXp.textContent = AppState.xp;
}

// ===== İnci: yalnızca zamanlayıcı oturumlarıyla kazanılır (1 dk = 1 inci) =====
function addPearls(amount) {
  AppState.pearls = Math.max(0, (AppState.pearls || 0) + amount);
  writeStorage(STORAGE_KEYS.pearls, AppState.pearls);
  updatePearlDisplay();
}

function updatePearlDisplay() {
  const storePearls = $('storePearlDisplay');
  if (storePearls) storePearls.textContent = AppState.pearls || 0;
  const timerPearls = $('timerPearlCount');
  if (timerPearls) timerPearls.textContent = AppState.pearls || 0;
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
  document.querySelectorAll('.dashboard-container, .controls, .roadmap-container, .selection-container, .chat-container, .quiz-container, .planner-container, .profile-container, .store-container, .timer-container, .aquarium-container, .deneme-container, .settings-container').forEach((el) => {
    el.style.display = 'none';
  });

  AppState.activePage = page;

  if (page === 'dashboard') {
    if ($('dashboardContainer')) $('dashboardContainer').style.display = '';
    try {
      renderDashboard();
    } catch (err) {
      console.error('[page] dashboard atlandı:', err);
    }
  } else if (page === 'roadmap' || page === 'learn') {
    AppState.activePage = 'roadmap';
    if ($('controlsBar')) $('controlsBar').style.display = '';
    if ($('roadmapContainer')) $('roadmapContainer').style.display = '';
    renderRoadmap();
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
  } else if (page === 'aquarium') {
    if ($('aquariumContainer')) $('aquariumContainer').style.display = '';
    renderAquarium();
  } else if (page === 'deneme') {
    if ($('denemeContainer')) $('denemeContainer').style.display = '';
  } else if (page === 'settings') {
    if ($('settingsPage')) $('settingsPage').style.display = '';
    renderSettingsPage();
  }

  document.querySelectorAll('.nav-link').forEach((link) => {
    const isActive = link.dataset.page === page;
    link.classList.toggle('active', isActive);
    const isAiLink = link.dataset.page === 'teacher' || link.dataset.page === 'student';
    if (isActive && isAiLink) {
      link.style.setProperty('background', 'linear-gradient(to right, #7DD3FC, #C084FC)', 'important');
      link.style.setProperty('color', '#FFFFFF', 'important');
      const icon = link.querySelector('.nav-icon');
      if (icon) {
        icon.style.setProperty('color', '#FFFFFF', 'important');
        icon.style.setProperty('background', 'rgba(255,255,255,0.25)', 'important');
      }
    } else {
      link.style.removeProperty('background');
      link.style.removeProperty('color');
      const icon = link.querySelector('.nav-icon');
      if (icon) {
        icon.style.removeProperty('color');
        icon.style.removeProperty('background');
      }
    }
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

  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.goto;
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

  // ⚙️ çark düğmesi: kendi hitbox'ı ile Ayarlar sayfasını açar,
  // profil kartına tıklamayı iletmez.
  const settingsBtn = $('sidebarSettingsBtn');
  if (settingsBtn) {
    settingsBtn.onclick = (event) => {
      event.stopPropagation();
      showPage('settings');
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
// Uzun isimler sayfa düzenini bozmasın: 50 harften uzun plan isimleri
// ilk 48 harfi + parlak "–" ile gösterilir.
function shortPlanTitle(text, escaper) {
  const raw = text || 'Görev';
  if (raw.length <= 50) return escaper ? escaper(raw) : raw;
  const head = raw.slice(0, 48);
  return `${escaper ? escaper(head) : head}<span class="dash-plan-cut">–</span>`;
}

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

  // Countdown to exam — ortak sınav tarihleri (getUpcomingExamDates) kullanılır;
  // init'te kurulan ticker da aynı fonksiyonu besler, değerler asla sapmaz.
  updatePlannerExamCountdown();

  // Bugünkü Planlarım: planner görevleri, tıklayınca durum değişir
  const plansEl = $('dashPlans');
  if (plansEl) {
    const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    const todays = getTasks()[getDayKey(todayIndex)] || [];
    const shownPlans = todays.slice(0, 3);
    const extraPlans = todays.length - shownPlans.length;
    plansEl.innerHTML = todays.length === 0
      ? '<p style="color:var(--text-light);font-size:13px;">Bugün planlanmış görev yok. Planlayıcıdan ekle, burada takip et!</p>'
      : shownPlans.map((task) => {
        const status = getTaskStatus(task);
        const meta = [task.time, task.duration ? `${task.duration} dk` : ''].filter(Boolean).join(' • ');
        const shownTitle = shortPlanTitle(task.title);
        return `
      <div class="dash-goal-item">
        <button type="button" class="dash-plan-check ${status === 'done' ? 'done' : ''}" data-task="${task.id}" aria-label="Görevi işaretle">${status === 'done' ? '✓' : ''}</button>
        <span class="goal-text">${shownTitle}${meta ? ` <small style="color:var(--text-light);font-weight:600;">${meta}</small>` : ''}</span>
        <span class="goal-status ${status === 'done' ? 'done' : 'pending'}">${status === 'done' ? 'Bitti' : status === 'doing' ? 'Sürüyor' : 'Bekliyor'}</span>
      </div>
    `;
      }).join('') + (extraPlans > 0
        ? `<button type="button" class="dash-plans-more" id="dashPlansMore" title="${extraPlans} görev daha — planlayıcıya git">+</button>`
        : '');
    const moreBtn = plansEl.querySelector('#dashPlansMore');
    if (moreBtn) {
      moreBtn.onclick = () => showPage('planner');
    }
    plansEl.querySelectorAll('.dash-plan-check').forEach((btn) => {
      btn.onclick = () => {
        const record = findPlannerTask(btn.dataset.task);
        if (!record) return;
        const next = getTaskStatus(record.task) === 'done' ? 'todo' : 'done';
        setTaskStatus(record.task, next);
        record.tasks[record.dayKey] = record.dayTasks;
        saveTasks(record.tasks);
        renderDashboard();
      };
    });
  }

  // Quiz Başarı Halkası: tüm quizlerden gerçek doğru/yanlış oranı
  const ringEl = $('dashQuizRing');
  if (ringEl) {
    const history = readStorage(STORAGE_KEYS.quizHistory, []);
    const correct = history.reduce((sum, entry) => sum + (Number(entry.correct) || 0), 0);
    const total = history.reduce((sum, entry) => sum + (Number(entry.total) || 0), 0);
    const wrong = Math.max(0, total - correct);
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    ringEl.innerHTML = total === 0
      ? '<p style="color:var(--text-light);font-size:13px;">Henüz quiz çözülmedi. İlk testini bitir, halkan dolsun!</p>'
      : `
      <div class="quiz-ring" style="--ring-pct:${pct}%">
        <div class="quiz-ring-center"><strong>${pct}%</strong><span>başarı</span></div>
      </div>
      <div class="quiz-ring-legend">
        <span><i class="legend-correct"></i>Doğru <b>${correct}</b></span>
        <span><i class="legend-wrong"></i>Yanlış <b>${wrong}</b></span>
        <span><i class="legend-total"></i>Soru <b>${total}</b></span>
      </div>`;
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
      ? ''
      : notes.slice(0, 5).map((n) => `
          <div class="dash-note-item">
            <span class="note-icon">📝</span>
            <span class="note-text">${n.text}</span>
            <span class="note-date">${n.date}</span>
          </div>
        `).join('');
  }

  const notesInput = $('dashNotesInput');
  if (notesInput) {
    const savedDraft = readStorage('archie.notesDraft', '');
    notesInput.value = savedDraft;
    notesInput.oninput = () => {
      writeStorage('archie.notesDraft', notesInput.value);
    };
    notesInput.onkeydown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const text = notesInput.value.trim();
        if (!text) return;
        const notes = readStorage(STORAGE_KEYS.notes, []);
        notes.unshift({ text, date: new Date().toLocaleDateString('tr-TR') });
        writeStorage(STORAGE_KEYS.notes, notes.slice(0, 50));
        notesInput.value = '';
        writeStorage('archie.notesDraft', '');
        renderDashboard();
      }
    };
  }

  // Analytics
  const analyticsEl = $('dashAnalytics');
  if (analyticsEl) {
    const completed = Math.max(0, completedCount);
    const remaining = Math.max(0, totalCount - completed);
    const weekMinutes = getWeeklyFocusMinutes();
    const weekTotal = weekMinutes.reduce((sum, value) => sum + value, 0);
    const maxBar = Math.max(1, ...weekMinutes);
    const dayLabels = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    const bars = dayLabels.map((label, index) => ({ label, value: weekMinutes[index] }));
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
        <div class="dash-chart-caption"><span>Haftalık çalışma</span><b>${weekTotal} dk</b></div>
        <div class="dash-bars">
          ${bars.map((bar, index) => `<div class="dash-bar-column"><div class="dash-bar" style="--bar-height:${Math.max(8, Math.round((bar.value / maxBar) * 100))}%; animation-delay:${index * 55}ms"></div><span>${bar.label}</span></div>`).join('')}
        </div>
      </div>
    `;
  }

  renderDashboardReviews();
  renderDashboardWrongBook();
  renderDailyGoals();
  renderLearningGain();
  renderQuickTour();
  renderDefterOgretmen();
  renderLearningScience();
}

// ===== SM-2 Günlük Tekrar Kuyruğu (Bugünkü Tekrarlarım) =====
// Son quizlerde verilen SM-2 kalite notlarına göre bugün tekrar günü
// gelen konuları sıralar; tek tıkla o konudan quiz başlatır. Gecikmiş
// konular en üste, bugün ve sonraki günler sıralı gelir.
const DASH_REVIEWS_MAX = 6;

function collectReviewQueue() {
  const store = readStorage(STORAGE_KEYS.reviews, {});
  const topics = getAllTopics();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayMs = 24 * 60 * 60 * 1000;
  const items = [];
  Object.entries(store).forEach(([id, rec]) => {
    const topic = topics.find((t) => t.id === id);
    if (!topic || !rec || !rec.dueDate) return;
    const due = new Date(rec.dueDate);
    due.setHours(0, 0, 0, 0);
    const diff = Math.round((today.getTime() - due.getTime()) / dayMs);
    items.push({
      topicId: id,
      topic,
      repetitions: rec.repetitions || 0,
      easinessFactor: rec.easinessFactor || 2.5,
      due: diff >= 0,
      diff,
    });
  });
  items.sort((a, b) => {
    if (a.due !== b.due) return a.due ? -1 : 1;
    if (a.due) return b.diff - a.diff;     // en gecikmiş önce
    return a.diff - b.diff;               // en az bekleyen önce
  });
  return items;
}

function reviewBadgeFor(diff) {
  if (diff > 0) return `<span class="dash-review-badge overdue">🔴 ${diff} gün gecikti</span>`;
  if (diff === 0) return '<span class="dash-review-badge today">🟠 Bugün</span>';
  if (diff === -1) return '<span class="dash-review-badge soon">🟡 Yarın</span>';
  return `<span class="dash-review-badge">⏳ ${-diff} gün sonra</span>`;
}

function renderDashboardReviews() {
  const card = $('dashReviewsCard');
  const listEl = $('dashReviews');
  if (!card || !listEl) return;
  const all = collectReviewQueue();
  const dueItems = all.filter((i) => i.due);

  if ($('dashReviewDue')) {
    $('dashReviewDue').textContent = dueItems.length
      ? `${dueItems.length} konu hazır`
      : (all.length ? 'planlada temiz 🌊' : '');
  }

  if (!all.length) {
    card.style.display = 'none';
    return;
  }
  card.style.display = '';

  const shown = all.slice(0, DASH_REVIEWS_MAX).map((item) => `
    <div class="dash-review-row${item.due ? ' due' : ''}">
      <span class="dash-review-icon">📘</span>
      <div class="dash-review-info">
        <strong>${item.topic.name}</strong>
        <span>${item.topic.level === 'ayt' ? 'AYT' : 'TYT'} · EF ${item.easinessFactor.toFixed(2)} · ${item.repetitions}. tekrar</span>
      </div>
      ${reviewBadgeFor(item.diff)}
      ${item.due ? `<button type="button" class="dash-review-btn" data-review="${item.topicId}">Tekrarla</button>` : ''}
    </div>
  `).join('');

  const hidden = all.length - Math.min(all.length, DASH_REVIEWS_MAX);
  listEl.innerHTML = `${shown}${hidden > 0 ? `<small class="dash-review-more">+${hidden} konu daha planlanmış</small>` : ''}`;

  listEl.querySelectorAll('[data-review]').forEach((btn) => {
    btn.onclick = () => startReviewQuiz(btn.dataset.review);
  });
}

// ===== 🎯 Günlük Mini Hedefler =====
// Her gün sıfırlanan 3 hedef; ilerleme uygulamadan canlı okunur:
// quiz sorusu (quizHistory), odak dakikası (focusLog), defter temizliği (wrongBook).
// Hedef değerleri +/- ile ayarlanır, archie.goals.v1 içinde saklanır.
const DAILY_GOALS_KEY = 'archie.goals.v1';
const DAILY_GOALS_DEFAULTS = { quiz: 20, focus: 45 };

function getDailyGoals() {
  const g = readStorage(DAILY_GOALS_KEY, {});
  return {
    quiz: Math.max(1, Number(g.quiz) || DAILY_GOALS_DEFAULTS.quiz),
    focus: Math.max(5, Number(g.focus) || DAILY_GOALS_DEFAULTS.focus),
  };
}

function saveDailyGoals(g) {
  writeStorage(DAILY_GOALS_KEY, g);
}

function renderDailyGoals() {
  const box = $('dashGoals');
  if (!box) return;
  const targets = getDailyGoals();
  const todayKey = focusDayKey(Date.now());

  const quizDone = readStorage(STORAGE_KEYS.quizHistory, [])
    .filter((e) => e && focusDayKey(new Date(e.timestamp).getTime()) === todayKey)
    .reduce((sum, e) => sum + (Number(e.total) || 0), 0);
  const focusDone = getFocusLog()
    .filter((e) => e && focusDayKey(e.t) === todayKey)
    .reduce((sum, e) => sum + (Number(e.minutes) || 0), 0);

  const wb = getWrongBook();
  const dueLeft = wb.filter((w) => !w.nextAt || w.nextAt <= Date.now()).length;
  const cleared = wb.length - dueLeft;

  const goals = [
    { id: 'quiz', icon: '📝', label: 'Quiz sorusu', done: quizDone, target: targets.quiz, unit: '' },
    { id: 'focus', icon: '⏱️', label: 'Odak dakikası', done: focusDone, target: targets.focus, unit: ' dk' },
    { id: 'book', icon: '📕', label: 'Defter temizliği', done: cleared, target: Math.max(wb.length, 1), unit: ` / ${wb.length || 0}`, fixed: true },
  ];
  const completed = goals.filter((g) => g.done >= g.target).length;

  if ($('dashGoalsBadge')) {
    $('dashGoalsBadge').textContent = completed === goals.length ? '🎉 tamamlandı' : `${completed}/3 tamam`;
  }

  box.innerHTML = completed === goals.length
    ? '<div class="dash-goals-done">🎉 Bugünkü hedeflerin tamamı bitti. Yarın görüşürüz!</div>'
    : '' + goals.map((g) => {
      const pct = Math.min(100, Math.round((g.done / Math.max(1, g.target)) * 100));
      return `
      <div class="dash-goal-row${g.done >= g.target ? ' done' : ''}">
        <span class="dash-goal-icon">${g.icon}</span>
        <div class="dash-goal-info">
          <div class="dash-goal-top"><strong>${g.label}</strong><span>${g.done}${g.unit} / ${g.target}</span></div>
          <div class="dash-goal-track"><i style="width:${pct}%"></i></div>
        </div>
        ${g.fixed
          ? '<span class="dash-goal-step"></span>'
          : `<span class="dash-goal-step">
              <button type="button" data-goal-step="${g.id}|-1" aria-label="Azalt">−</button>
              <button type="button" data-goal-step="${g.id}|1" aria-label="Artır">+</button>
            </span>`}
        <span class="dash-goal-state">${g.done >= g.target ? '✅' : `${pct}%`}</span>
      </div>`;
    }).join('');

  box.querySelectorAll('[data-goal-step]').forEach((btn) => {
    btn.onclick = () => {
      const [id, delta] = btn.dataset.goalStep.split('|');
      const g = getDailyGoals();
      g[id] = Math.max(id === 'focus' ? 5 : 1, (Number(g[id]) || 0) + Number(delta) * 5);
      saveDailyGoals(g);
      renderDailyGoals();
    };
  });
}

// ===== 📈 Öğrenme Kazancı Raporu =====
// Son 28 günlük damgalı veriden üretilir: quiz doğruluğu, çalışma hacmi,
// odak dakikası ve defter temizliği. Kopyalanabilir özet + görsel kart.
function learningGainStats() {
  const dayMs = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const inWindow = (ts, days) => {
    const t = new Date(ts).getTime();
    return Number.isFinite(t) && now - t < days * dayMs;
  };
  const history = readStorage(STORAGE_KEYS.quizHistory, []).filter((e) => e && e.timestamp);
  const last = history.filter((e) => inWindow(e.timestamp, 7));
  const prev = history.filter((e) => !inWindow(e.timestamp, 7) && inWindow(e.timestamp, 14));
  const acc = (list) => {
    const c = list.reduce((s, e) => s + (Number(e.correct) || 0), 0);
    const t = list.reduce((s, e) => s + (Number(e.total) || 0), 0);
    return t ? (c / t) * 100 : null;
  };
  const vol = (list) => list.reduce((s, e) => s + (Number(e.total) || 0), 0);
  const focus = getFocusLog();
  const focusLast = focus
    .filter((e) => e && inWindow(e.t, 7))
    .reduce((s, e) => s + (Number(e.minutes) || 0), 0);
  const focusPrev = focus.filter((e) => e && !inWindow(e.t, 7) && inWindow(e.t, 14))
    .reduce((s, e) => s + (Number(e.minutes) || 0), 0);
  const solved = Number(readStorage('archie.wrongbook.solved', 0)) || 0;
  const activeWrong = getWrongBook().length;
  return {
    accLast: acc(last), accPrev: acc(prev),
    volLast: vol(last),
    focusLast, focusPrev,
    solved, activeWrong,
  };
}

function renderLearningGain() {
  const box = $('dashGain');
  if (!box) return;
  const s = learningGainStats();
  const fmt = (v) => (v === null ? '–' : `${Math.round(v)}%`);
  const delta = (cur, prev) => {
    if (cur === null || prev === null) return { txt: 'veri yok', cls: 'flat' };
    const d = cur - prev;
    if (d > 0.5) return { txt: `▲ +${d.toFixed(1)}`, cls: 'up' };
    if (d < -0.5) return { txt: `▼ ${d.toFixed(1)}`, cls: 'down' };
    return { txt: '● dengeli', cls: 'flat' };
  };
  const dAcc = delta(s.accLast, s.accPrev);
  const dFocus = delta(s.focusLast || null, s.focusPrev || null);
  const verdict = (s.accLast !== null && s.accPrev !== null && s.accLast - s.accPrev > 2)
    ? { icon: '📈', text: 'Yükselişte — doğruluk artıyor, ritmi koru.' }
    : (s.accLast !== null && s.accPrev !== null && s.accPrev - s.accLast > 2)
      ? { icon: '📉', text: 'Dikkat — doğruluk düşüyor; yanlış defterine odaklan.' }
      : { icon: '➡️', text: 'Dengeli — hacmi artırarak sıçrama yapabilirsin.' };
  if ($('dashGainDate')) {
    const end = new Date();
    const start = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000);
    const opt = { day: 'numeric', month: 'short' };
    $('dashGainDate').textContent = `${start.toLocaleDateString('tr-TR', opt)} – ${end.toLocaleDateString('tr-TR', opt)}`;
  }
  box.innerHTML = `
    <div class="dash-gain-grid">
      <div class="dash-gain-kpi"><span class="dash-gain-kpi-label">Quiz doğruluğu (7g)</span><strong>${fmt(s.accLast)}</strong><em class="dash-gain-delta ${dAcc.cls}">${dAcc.txt}</em></div>
      <div class="dash-gain-kpi"><span class="dash-gain-kpi-label">Çözülen soru (7g)</span><strong>${s.volLast}</strong><em class="dash-gain-delta flat">soru</em></div>
      <div class="dash-gain-kpi"><span class="dash-gain-kpi-label">Odak (7g)</span><strong>${s.focusLast} dk</strong><em class="dash-gain-delta ${dFocus.cls}">${dFocus.txt} dk</em></div>
      <div class="dash-gain-kpi"><span class="dash-gain-kpi-label">Defter temizliği</span><strong>${s.solved} ✓</strong><em class="dash-gain-delta flat">${s.activeWrong} kayıt aktif</em></div>
    </div>
    <div class="dash-gain-verdict"><span>${verdict.icon}</span> ${verdict.text}</div>
    <button type="button" class="dash-gain-copy" id="dashGainCopy">📋 Özeti Kopyala</button>`;
  const copyBtn = $('dashGainCopy');
  if (copyBtn) {
    copyBtn.onclick = async () => {
      const text = `Learn with Archie — Öğrenme Kazancı (son 7 gün)\nQuiz doğruluğu: ${fmt(s.accLast)} (önceki 7 gün: ${fmt(s.accPrev)})\nÇözülen soru: ${s.volLast}\nOdak: ${s.focusLast} dk (önceki: ${s.focusPrev} dk)\nDefterden temizlenen: ${s.solved} (aktif: ${s.activeWrong})\n${verdict.icon} ${verdict.text}`;
      try {
        await navigator.clipboard.writeText(text);
        showToast('Rapor özeti kopyalandı 📋');
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast('Rapor özeti kopyalandı 📋'); }
        catch { showToast('Kopyalama desteklenmiyor'); }
        ta.remove();
      }
    };
  }
}

function fragileGroup(entry) {
  const m = (entry && entry.misses) || 1;
  if (m >= 3) return 'bad';
  if (m === 2) return 'warn';
  return 'fresh';
}

// ===== ⚡ Tek Soruluk Hızlı Tur (öneri 4) =====
// Vadesi gelen defter kayıtları kompakt buton listesi olarak dizilir;
// birine basınca yalnızca O soru anında quiz'e düşer. Rastgele düğmesi
// listeden körlemesine bir soru seçer.
function renderQuickTour() {
  const card = $('dashQuickCard');
  const box = $('dashQuick');
  if (!card || !box) return;
  const now = Date.now();
  const due = getWrongBook().filter((w) => w && w.prompt && Array.isArray(w.options) && Number.isInteger(w.answer) && (!w.nextAt || w.nextAt <= now));
  if (!due.length) {
    card.style.display = 'none';
    return;
  }
  card.style.display = '';
  if ($('dashQuickDue')) $('dashQuickDue').textContent = `${due.length} soru hazır`;
  const shown = due.slice(0, 5);
  box.innerHTML = `<div class="dash-quick-list">${shown.map((entry) => `
    <button type="button" class="dash-quick-btn" data-quick="${entry.id}">
      <span class="dash-quick-dot dot-${fragileGroup(entry)}"></span>
      <strong>${(entry.prompt || '').slice(0, 52)}</strong>
      <span class="dash-quick-go">Çöz ▶</span>
    </button>`).join('')}
    <button type="button" class="dash-quick-random" id="dashQuickRandom">🎲 Rastgele 1 soru</button>
  </div>`;
  box.querySelectorAll('[data-quick]').forEach((btn) => {
    btn.onclick = () => {
      try {
        startWrongBookQuizSingle(btn.dataset.quick);
      } catch (err) {
        console.error('[hızlı tur] açılış hatası:', err);
        showToast(`Soru açılamadı: ${err.message || 'bilinmeyen sorun'}`);
      }
    };
  });
  const rnd = $('dashQuickRandom');
  if (rnd) {
    rnd.onclick = () => {
      const pick = due[Math.floor(Math.random() * due.length)];
      if (pick) {
        try {
          startWrongBookQuizSingle(pick.id);
        } catch (err) {
          console.error('[hızlı tur] açılış hatası:', err);
          showToast(`Soru açılamadı: ${err.message || 'bilinmeyen sorun'}`);
        }
      }
    };
  }
}

function startWrongBookQuizSingle(recordId) {
  const entry = getWrongBook().find((w) => w.id === recordId || wrongKey(w.topicId, w.prompt) === recordId);
  if (!entry) { showToast('Kayıt bulunamadı 🌊'); return; }
  const names = new Set();
  const t = getAllTopics().find((tt) => tt.id === entry.topicId);
  if (t) names.add(t.name);
  quizState = {
    questions: [{ ...entry, __id: entry.id }],
    currentIndex: 0,
    correctCount: 0,
    selectedOption: null,
    confidence: null,
    topicId: null,
    source: 'wrongbook',
    wrongTopicNames: names,
  };
  showPage('quiz');
  if ($('quizSetup')) $('quizSetup').style.display = 'none';
  if ($('quizResult')) $('quizResult').style.display = 'none';
  if ($('quizActive')) $('quizActive').style.display = '';
  if ($('quizNextBtn')) $('quizNextBtn').style.display = 'none';
  const qualityBox = $('qualityBox');
  if (qualityBox) qualityBox.style.display = 'none';
  renderQuizQuestion();
}

// ===== 🧑‍🏫 Defterimi Öğretmene Sor (öneri 8) =====
// Kart kompakttır; konu seçimi açılır pencerede yapılır, seçim
// AI Öğretmen sohbetine mikro-ders isteği olarak gönderilir.
function renderDefterOgretmen() {
  const card = $('dashTeachCard');
  const box = $('dashTeach');
  if (!card || !box) return;
  const wb = getWrongBook().filter((w) => w && w.prompt && Array.isArray(w.options) && Number.isInteger(w.answer));
  if (!wb.length) {
    card.style.display = 'none';
    return;
  }
  card.style.display = '';
  // Kart kompakt kalır: sayı özeti + tek düğme; konu seçimi açılır pencerede.
  const byGroup = { bad: 0, warn: 0, fresh: 0 };
  wb.forEach((w) => { byGroup[fragileGroup(w)] += 1; });
  if ($('dashTeachDue')) $('dashTeachDue').textContent = `${wb.length} kayıt içinden seç`;
  box.innerHTML = `
    <div class="dash-teach-summary">
      <span class="dash-teach-count">${wb.length}</span>
      <span class="dash-teach-count-label">defter sorusu öğretmene sorulabilir</span>
      <span class="dash-teach-mini">
        <i class="dot-bad"></i>${byGroup.bad}
        <i class="dot-warn"></i>${byGroup.warn}
        <i class="dot-fresh"></i>${byGroup.fresh}
      </span>
    </div>
    <button type="button" class="dash-teach-ask" id="dashTeachAsk">🧑‍🏫 Öğretmene Sor</button>`;
  const ask = $('dashTeachAsk');
  if (ask) {
    ask.onclick = () => {
      const now = Date.now();
      const ordered = [...wb].sort((a, b) => {
        const aDue = !a.nextAt || a.nextAt <= now ? 0 : 1;
        const bDue = !b.nextAt || b.nextAt <= now ? 0 : 1;
        if (aDue !== bDue) return aDue - bDue;
        return (b.misses || 0) - (a.misses || 0);
      }).slice(0, 8);
      let selectedId = ordered[0].id;
      const overlay = openSheetModal('🧑‍🏫 Hangi soruyu açıklayayım?', `
        <div class="dash-teach-list sheet-pick-list">
          ${ordered.map((entry, i) => `
            <button type="button" class="dash-teach-row${i === 0 ? ' selected' : ''}" data-teach-pick="${entry.id}">
              <span class="dash-quick-dot dot-${fragileGroup(entry)}"></span>
              <strong>${(entry.prompt || '').slice(0, 52)}</strong>
              <span class="dash-teach-miss">${entry.misses}✕</span>
            </button>`).join('')}
        </div>
        <button type="button" class="dash-teach-ask" id="sheetTeachSend">📨 Seçili soruyu gönder</button>`);
      if (!overlay) return;
      overlay.querySelectorAll('[data-teach-pick]').forEach((btn) => {
        btn.onclick = () => {
          selectedId = btn.dataset.teachPick;
          overlay.querySelectorAll('[data-teach-pick]').forEach((b) => b.classList.toggle('selected', b === btn));
        };
      });
      const send = overlay.querySelector('#sheetTeachSend');
      if (send) {
        send.onclick = () => {
          closeSheetModal();
          askTeacherAboutRecord(selectedId);
        };
      }
    };
  }
}

function askTeacherAboutRecord(recordId) {
  const entry = getWrongBook().find((w) => w.id === recordId);
  if (!entry) { showToast('Kayıt bulunamadı 🌊'); return; }
  const t = getAllTopics().find((tt) => tt.id === entry.topicId);
  const topicName = t ? t.name : 'defter sorusu';
  const correctText = Array.isArray(entry.options) && Number.isInteger(entry.answer)
    ? entry.options[entry.answer]
    : 'kayıtta yok';
  const msg = `📕 Defterimden bir soru (${topicName}, ${entry.misses}. kez yanlış): "${entry.prompt}" Doğru cevap: "${correctText}". Bunu bana adım adım açıklar mısın?`;
  showPage('teacher');
  try {
    // Seçim ekranını geçip doğrudan sohbete düş: intro videosu atlanır.
    if ($('teacherSelection')) $('teacherSelection').style.display = 'none';
    if ($('teacherChat')) $('teacherChat').style.display = '';
    initTeacherChat();
    addTutorMessage(msg);
  } catch (err) {
    console.error('[öğretmen] mesaj gönderilemedi:', err);
    showToast('Öğretmen sayfası açılamadı');
  }
}

// ===== 📑 Sayfa büyütmeyen açılır pencere (defter + öğretmen) =====
function openSheetModal(title, bodyHTML) {
  closeSheetModal();
  const overlay = document.createElement('div');
  overlay.className = 'sheet-overlay';
  overlay.id = 'sheetOverlay';
  overlay.innerHTML = `
    <div class="sheet-box" role="dialog" aria-modal="true">
      <div class="sheet-head"><strong>${title}</strong><button type="button" class="sheet-close" id="sheetClose" aria-label="Kapat">✕</button></div>
      <div class="sheet-body">${bodyHTML}</div>
    </div>`;
  document.body.appendChild(overlay);
  const close = () => closeSheetModal();
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  const closeBtn = overlay.querySelector('#sheetClose');
  if (closeBtn) closeBtn.onclick = close;
  document.addEventListener('keydown', sheetEscClose);
  return overlay;
}

function sheetEscClose(event) {
  if (event.key === 'Escape') closeSheetModal();
}

function closeSheetModal() {
  document.removeEventListener('keydown', sheetEscClose);
  const overlay = document.getElementById('sheetOverlay');
  if (overlay) overlay.remove();
}

function startReviewQuiz(topicId) {
  const topic = getAllTopics().find((t) => t.id === topicId);
  if (!topic) return;
  if (AppState.activeLevel !== topic.level) AppState.activeLevel = topic.level;
  showPage('quiz');
  startQuiz(topicId);
}

// ===== 📕 Yanlış Soru Defteri =====
// Quiz ve çıkmış sorularda yanlış cevaplanan sorular anlık görüntüyle +
// nadirlik takvimiyle buraya düşer: ilk tekrar +3g, sonra +7g, sonra +15g.
// Tekrar turunda doğru yapılan kayıt temizlenir, yine yanlış olursa genel
// takvimde bir adım daha uzatılarak kayıt kalır.
const WRONG_RETRY_SCHEDULE = [3, 7, 15];
const WRONG_BOOK_MAX = 10;

function wrongKey(topicId, prompt) {
  return `${topicId || '?'}#${(prompt || '').slice(0, 90)}`;
}

function getWrongBook() {
  const wb = readStorage(STORAGE_KEYS.wrongBook, []);
  return Array.isArray(wb) ? wb : [];
}

function saveWrongBook(wb) {
  writeStorage(STORAGE_KEYS.wrongBook, wb);
}

function recordWrongAnswer(topicId, question) {
  if (!question || !question.prompt) return;
  const wb = getWrongBook();
  const now = Date.now();
  const id = wrongKey(topicId, question.prompt);
  let entry = wb.find((w) => w.id === id);
  if (!entry) {
    entry = {
      id,
      topicId: topicId || '',
      prompt: question.prompt,
      options: question.options,
      answer: question.answer,
      misses: 0,
      firstAt: now,
    };
    wb.push(entry);
  }
  entry.misses = (entry.misses || 0) + 1;
  entry.lastAt = now;
  const delay = WRONG_RETRY_SCHEDULE[Math.min(entry.misses - 1, WRONG_RETRY_SCHEDULE.length - 1)];
  entry.nextAt = delay ? now + delay * 24 * 60 * 60 * 1000 : now;
  saveWrongBook(wb);
}

function updateWrongBookAfterRun() {
  if (!quizState || quizState.source !== 'wrongbook' || !Array.isArray(quizState.questions)) return;
  const wb = getWrongBook();
  const now = Date.now();
  quizState.questions.forEach((q) => {
    const id = q.__id || wrongKey(q.topicId, q.prompt);
    const idx = wb.findIndex((w) => w.id === id || wrongKey(w.topicId, w.prompt) === id);
    if (idx === -1) return;
    const wasCorrect = quizState.wrongFlags && quizState.wrongFlags[id];
    if (wasCorrect) {
      // Bu turda doğru yapıldı: kayıt temizlenir, sayaç artar.
      wb.splice(idx, 1);
      try {
        const solved = Number(readStorage('archie.wrongbook.solved', 0)) || 0;
        writeStorage('archie.wrongbook.solved', solved + 1);
      } catch { /* yok say */ }
      return;
    }
    const miss = (wb[idx].misses || 0) + 1;
    const delay = WRONG_RETRY_SCHEDULE[Math.min(miss - 1, WRONG_RETRY_SCHEDULE.length - 1)];
    wb[idx].misses = miss;
    wb[idx].lastAt = now;
    wb[idx].nextAt = now + delay * 24 * 60 * 60 * 1000;
  });
  saveWrongBook(wb);
}

function wrongDueLabel(nextAt, now) {
  if (!nextAt) return { due: true, badge: '🟠 Bugün', diff: 0 };
  const dayMs = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(nextAt);
  due.setHours(0, 0, 0, 0);
  const diff = Math.round((today.getTime() - due.getTime()) / dayMs);
  if (diff > 0) return { due: true, badge: `🔴 ${diff} gün gecikti`, diff };
  if (diff === 0) return { due: true, badge: '🟠 Bugün', diff };
  if (diff === -1) return { due: false, badge: '🟡 Yarın', diff };
  return { due: false, badge: `⏳ ${-diff} gün sonra`, diff };
}

// Kırılganlık seviyesi: misses sayısına göre renkli rozet.
// 1. yanlış 🟡 Taze, 2. 🟠 Israrcı, 3+ 🔴 İnatçı soru.
function fragileLabel(misses) {
  if (misses >= 3) return { cls: 'fragile-bad', text: '🔴 İnatçı soru' };
  if (misses === 2) return { cls: 'fragile-warn', text: '🟠 Israrcı' };
  return { cls: 'fragile-fresh', text: '🟡 Taze' };
}

function renderDashboardWrongBook() {
  const card = $('dashWrongCard');
  const listEl = $('dashWrong');
  if (!card || !listEl) return;
  const wb = getWrongBook();
  // Eski/bozuk numunere tolerans: prompt/options/answer eksikse kayıt sayılmaz ve silinir
  const valid = wb.filter((w) => w && w.prompt && Array.isArray(w.options) && Number.isInteger(w.answer));
  if (valid.length !== wb.length) saveWrongBook(valid);
  if (!valid.length) {
    card.style.display = 'none';
    return;
  }
  const now = Date.now();
  const rows = valid.map((entry) => ({ entry, info: wrongDueLabel(entry.nextAt, now) }));
  rows.sort((a, b) => {
    if (a.info.due !== b.info.due) return a.info.due ? -1 : 1;
    return b.entry.misses - a.entry.misses;
  });
  const dueCount = rows.filter((r) => r.info.due).length;
  const nextDue = rows.find((r) => !r.info.due);
  if ($('dashWrongDue')) {
    $('dashWrongDue').textContent = dueCount
      ? `${dueCount} soru tekrarda`
      : `⏳ ilk tekrar ${-nextDue.info.diff} gün sonra`;
  }
  card.style.display = '';

  // Özet görünüm: kategori başına sayı (sarı → turuncu → kırmızı) + Deftere git.
  // Sayfa asla uzamaz; liste yalnızca istek üzerine, kaydırmalı kutuda açılır.
  const counts = { fresh: 0, warn: 0, bad: 0 };
  rows.forEach(({ entry }) => { counts[fragileGroup(entry)] += 1; });
  const chip = (key, label) => `
    <div class="dash-wrong-chip chip-${key}">
      <span class="dash-wrong-chip-dot"></span>
      <strong>${counts[key]}</strong>
      <span>${label}</span>
    </div>`;
  listEl.innerHTML = `
    <div class="dash-wrong-chips">
      ${chip('fresh', 'Taze')}
      ${chip('warn', 'Israrcı')}
      ${chip('bad', 'İnatçı')}
    </div>
    <button type="button" class="dash-wrong-git" id="dashWrongGit">📕 Deftere git</button>`;

  const openWrong = () => {
    try {
      // dueCount===0 → tüm kayıtları şimdi test et; aksi halde yalnız vakti gelenler
      startWrongBookQuiz(dueCount !== 0);
    } catch (err) {
      console.error('[defter] açılış hatası:', err);
      showToast(`Defter açılamadı: ${err.message || 'bilinmeyen sorun'}`);
    }
  };
  const gitBtn = $('dashWrongGit');
  if (gitBtn) {
    // Defter açılır pencerede açılır — sayfa asla uzamaz.
    gitBtn.onclick = () => {
      const groupMeta = {
        bad: { icon: '🔴', title: 'İnatçı sorular' },
        warn: { icon: '🟠', title: 'Israrcı sorular' },
        fresh: { icon: '🟡', title: 'Taze kayıtlar' },
      };
      const visible = rows.slice(0, DASH_REVIEWS_MAX * 2);
      const body = ['bad', 'warn', 'fresh'].map((key) => {
        const members = visible.filter(({ entry }) => fragileGroup(entry) === key);
        if (!members.length) return '';
        return `<div class="dash-wrong-group">
          <div class="dash-wrong-group-title dash-wrong-group-title-right">${groupMeta[key].icon} ${groupMeta[key].title} <b>${members.length}</b></div>
          ${members.map(({ entry, info }) => {
            const frag = fragileLabel(entry.misses || 1);
            return `
          <div class="dash-review-row ${info.due ? 'due wrong' : ''}" data-wrong-open="${info.due ? 'due' : 'all'}" role="button" tabindex="0">
            <span class="dash-review-icon">📕</span>
            <div class="dash-review-info">
              <strong>${(entry.prompt || '').slice(0, 64)}</strong>
              <span>${entry.misses}. kez yanlış</span>
            </div>
            <span class="dash-review-badge ${info.due ? 'overdue' : ''}">${info.badge}</span>
            <span class="dash-fragile ${frag.cls}">${frag.text}</span>
          </div>`;
          }).join('')}
        </div>`;
      }).join('') + (rows.length - visible.length > 0 ? `<small class="dash-review-more">+${rows.length - visible.length} kayıt daha</small>` : '')
        + `<button type="button" class="dash-review-btn sheet-solve" id="dashWrongSolve">${dueCount > 0 ? `▶ ${dueCount} soruyu defterden çöz` : `🔬 ${rows.length} kaydı şimdi test et`}</button>`;
      const overlay = openSheetModal('📕 Yanlış Soru Defteri', body);
      if (!overlay) return;
      const solveBtn = overlay.querySelector('#dashWrongSolve');
      if (solveBtn) {
        solveBtn.onclick = () => { closeSheetModal(); openWrong(); };
      }
      overlay.querySelectorAll('[data-wrong-open]').forEach((row) => {
        row.style.cursor = 'pointer';
        row.onclick = () => { closeSheetModal(); openWrong(); };
        row.onkeydown = (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            closeSheetModal();
            openWrong();
          }
        };
      });
    };
  }
}

function startWrongBookQuiz(showOnlyDue) {
  try {
    return _startWrongBookQuizInner(showOnlyDue);
  } catch (err) {
    console.error('[defter] başlatma hatası:', err);
    showToast(`Defter açılamadı: ${err.message || 'bilinmeyen sorun'}`);
  }
}

function _startWrongBookQuizInner(showOnlyDue) {
  const now = Date.now();
  const wb = getWrongBook();
  let due = wb;
  // showOnlyDue=true → yalnızca tekrar vakti gelmiş kayıtlar;
  // false (erken çalıştır) → tüm kayıtlar defterden çıkar.
  if (showOnlyDue) due = due.filter((w) => !w.nextAt || w.nextAt <= now);
  due = due.slice(0, WRONG_BOOK_MAX);
  if (!due.length) { showToast('Defterde bugün için kayıt yok 🌊'); return; }
  const questions = due.map((entry) => ({
    ...entry,
    __id: entry.id,
  }));
  const names = new Set();
  questions.forEach((q) => {
    const t = getAllTopics().find((tt) => tt.id === q.topicId);
    if (t) names.add(t.name);
  });
  quizState = {
    questions,
    currentIndex: 0,
    correctCount: 0,
    selectedOption: null,
    confidence: null,
    topicId: null,
    source: 'wrongbook',
    wrongTopicNames: names,
  };
  showPage('quiz');
  if ($('quizSetup')) $('quizSetup').style.display = 'none';
  if ($('quizResult')) $('quizResult').style.display = 'none';
  if ($('quizActive')) $('quizActive').style.display = '';
  if ($('quizNextBtn')) $('quizNextBtn').style.display = 'none';
  const qualityBox = $('qualityBox');
  if (qualityBox) qualityBox.style.display = 'none';
  renderQuizQuestion();
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

function rmTopicState(topicId, idx, list, progress) {
  const entry = progress[topicId];
  const isCompleted = entry && entry.total > 0;
  const percent = getMasteryPercent(topicId);
  const isWeak = percent > 0 && percent < 40;
  const prev = list.slice(0, idx);
  const hasPrevCompleted = idx === 0 || prev.some((t, i) => {
    const pid = typeof t === 'string' ? `${list._parentId}-sub-${i}` : t.id;
    return progress[pid]?.total > 0;
  });
  let state = 'locked';
  if (isCompleted) state = 'done';
  else if (hasPrevCompleted) state = 'active';
  return { state, percent, isWeak, isCompleted };
}

function rmCardHtml(opts) {
  const { idAttr, idVal, icon, name, state, percent, footLeft, footRight, dot } = opts;
  const pill = state === 'done' ? 'Tamamlandı' : state === 'active' ? 'Devam Ediyor' : 'Kilitli 🔒';
  const bar = state === 'locked' ? 0 : Math.max(percent, state === 'done' ? 100 : percent);
  return `
    <button class="rm-card ${state}" ${idAttr}="${idVal}" title="${name}">
      <div class="rm-card-top">
        <span class="rm-ico">${icon}</span>
        <span class="rm-name">${name}</span>
        <span class="rm-pill">${pill}</span>
      </div>
      <div class="rm-bar"><i style="width:${bar}%"></i></div>
      <div class="rm-foot">
        <span>${footLeft}</span>
        <span class="rm-foot-right">${footRight} ${dot}</span>
      </div>
    </button>`;
}

function rmSpineDot(state) {
  if (state === 'done') return '<span class="rm-dot done">✓</span>';
  if (state === 'active') return '<span class="rm-dot active">›</span>';
  return '<span class="rm-dot locked">›</span>';
}

function rmLegendHtml() {
  return `
    <div class="rm-legend">
      <span><i class="rm-lg done">✓</i>Tamamlandı</span>
      <span><i class="rm-lg active">●</i>Devam Ediyor</span>
      <span><i class="rm-lg locked">●</i>Kilitli</span>
      <span><i class="rm-lg missing">●</i>Eksik</span>
      <span><i class="rm-lg wrong">✕</i>Yanlış</span>
    </div>`;
}

function renderMainTopicRoadmap(roadmapEl, subject, topics, progress, allTopics) {
  let html = `
    <div class="rm-header">
      <span class="rm-header-icon">🗺️</span>
      <div>
        <div class="rm-header-title">Yol Haritası - ${subject} (${currentRoadmapLevel.toUpperCase()})</div>
        <div class="rm-header-sub">${currentRoadmapLevel.toUpperCase()} ${subject} Başarısına Adım Adım Yolculuğunuz - Konu ve İlerleme Takibi</div>
      </div>
    </div>`;

  if (topics.length === 0) {
    html += '<div class="empty-msg">Bu ders için konu bulunamadı.</div>';
  } else {
    html += rmLegendHtml();
    html += '<div class="rm-flow">';
    for (let r = 0; r < topics.length; r += 2) {
      const pair = [topics[r], topics[r + 1]].filter(Boolean);
      const left = pair[0] ? rmTopicState(pair[0].id, r, topics, progress) : null;
      const right = pair[1] ? rmTopicState(pair[1].id, r + 1, topics, progress) : null;
      const spineState = left && left.state !== 'locked' ? left.state : (right && right.state !== 'locked' ? right.state : 'locked');
      html += '<div class="rm-row">';
      html += '<div class="rm-cell">';
      if (pair[0]) {
        const sub = pair[0].subtopics ? pair[0].subtopics.length : 0;
        const dot = left.isWeak ? '<b class="rm-dot-sm wrong">✕</b>' : left.state === 'done' ? '<b class="rm-dot-sm done">●</b>' : '<b class="rm-dot-sm missing">●</b>';
        html += rmCardHtml({ idAttr: 'data-topic', idVal: pair[0].id, icon: pair[0].icon || '📚', name: pair[0].name, state: left.state, percent: left.percent, footLeft: `Test Bankası • ${sub} alt konu`, footRight: left.state === 'done' ? `${left.percent}/100` : `${sub > 0 ? '1/' + sub : left.percent + '/100'}`, dot });
      }
      html += '</div>';
      html += `<div class="rm-spine">${rmSpineDot(spineState)}</div>`;
      html += '<div class="rm-cell">';
      if (pair[1]) {
        const sub = pair[1].subtopics ? pair[1].subtopics.length : 0;
        const dot = right.isWeak ? '<b class="rm-dot-sm wrong">✕</b>' : right.state === 'done' ? '<b class="rm-dot-sm done">●</b>' : '<b class="rm-dot-sm missing">●</b>';
        html += rmCardHtml({ idAttr: 'data-topic', idVal: pair[1].id, icon: pair[1].icon || '📚', name: pair[1].name, state: right.state, percent: right.percent, footLeft: `Test Bankası • ${sub} alt konu`, footRight: right.state === 'done' ? `${right.percent}/100` : `${sub > 0 ? '1/' + sub : right.percent + '/100'}`, dot });
      }
      html += '</div>';
      html += '</div>';
    }
    html += '</div>';
  }

  roadmapEl.innerHTML = html;

  roadmapEl.querySelectorAll('.rm-card').forEach((node) => {
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
    <div class="rm-header">
      <button class="back-btn" id="backToMainTopics" title="Ana konulara dön">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <span class="rm-header-icon">${mainTopic.icon || '📚'}</span>
      <div>
        <div class="rm-header-title">Yol Haritası - ${mainTopic.name} (${level.toUpperCase()})</div>
        <div class="rm-header-sub">${level.toUpperCase()} • ${subject} - Alt konular ve ilerleme takibi</div>
      </div>
    </div>`;

  if (subtopics.length === 0) {
    html += '<div class="empty-msg">Bu konu için alt konu bulunamadı.</div>';
  } else {
    const list = subtopics.map((_, i) => `${mainTopic.id}-sub-${i}`);
    list._parentId = mainTopic.id;
    html += rmLegendHtml();
    html += '<div class="rm-flow">';
    for (let r = 0; r < subtopics.length; r += 2) {
      const pair = [[subtopics[r], r], subtopics[r + 1] !== undefined ? [subtopics[r + 1], r + 1] : null].filter(Boolean);
      const leftSt = rmTopicState(`${mainTopic.id}-sub-${pair[0][1]}`, pair[0][1], list, progress);
      const rightSt = pair[1] ? rmTopicState(`${mainTopic.id}-sub-${pair[1][1]}`, pair[1][1], list, progress) : null;
      const spineState = leftSt.state !== 'locked' ? leftSt.state : (rightSt && rightSt.state !== 'locked' ? rightSt.state : 'locked');
      html += '<div class="rm-row">';
      html += '<div class="rm-cell">';
      {
        const dot = leftSt.isWeak ? '<b class="rm-dot-sm wrong">✕</b>' : leftSt.state === 'done' ? '<b class="rm-dot-sm done">●</b>' : '<b class="rm-dot-sm missing">●</b>';
        html += rmCardHtml({ idAttr: 'data-subtopic', idVal: `${mainTopic.id}-sub-${pair[0][1]}`, icon: '📝', name: pair[0][0], state: leftSt.state, percent: leftSt.percent, footLeft: 'Test Bankası', footRight: leftSt.state === 'done' ? `${leftSt.percent}/100` : '0/100', dot });
      }
      html += '</div>';
      html += `<div class="rm-spine">${rmSpineDot(spineState)}</div>`;
      html += '<div class="rm-cell">';
      if (pair[1]) {
        const dot = rightSt.isWeak ? '<b class="rm-dot-sm wrong">✕</b>' : rightSt.state === 'done' ? '<b class="rm-dot-sm done">●</b>' : '<b class="rm-dot-sm missing">●</b>';
        html += rmCardHtml({ idAttr: 'data-subtopic', idVal: `${mainTopic.id}-sub-${pair[1][1]}`, icon: '📝', name: pair[1][0], state: rightSt.state, percent: rightSt.percent, footLeft: 'Test Bankası', footRight: rightSt.state === 'done' ? `${rightSt.percent}/100` : '0/100', dot });
      }
      html += '</div>';
      html += '</div>';
    }
    html += '</div>';
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
  roadmapEl.querySelectorAll('.rm-card').forEach((node) => {
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
        } else if (toggle.id === 'teacherSelectionLevelToggle') {
          currentTeacherLevel = level;
          AppState.activeLevel = level;
          // Seviye değişince ders/konu seçimini sıfırla (yol haritasındaki davranışla aynı)
          currentTeacherSubject = null;
          currentTeacherMainTopic = null;
          currentTeacherSubtopic = null;
          AppState.activeSubject = null;
          AppState.activeTopic = null;
          renderSubjectGrid('teacherSubjectGrid', 'teacher');
          renderTeacherTopics();
          renderTeacherSubtopics();
        } else if (toggle.id === 'studentSelectionLevelToggle') {
          currentStudentLevel = level;
          AppState.activeLevel = level;
          currentStudentSubject = null;
          currentStudentMainTopic = null;
          currentStudentSubtopic = null;
          AppState.activeSubject = null;
          AppState.activeTopic = null;
          renderSubjectGrid('studentSubjectGrid', 'student');
          renderStudentTopics();
          renderStudentSubtopics();
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

function cikmisDataForLevel(level) {
  return level === 'ayt'
    ? { pool: CIKMIS_AYT, dersler: CIKMIS_AYT_DERSLER }
    : { pool: CIKMIS_TYT, dersler: CIKMIS_TYT_DERSLER };
}

function getQuestionsForTopic(topicId) {
  if (typeof topicId === 'string' && topicId.startsWith('cikmis-')) {
    const level = topicId.startsWith('cikmis-ayt-') ? 'ayt' : 'tyt';
    const { pool, dersler } = cikmisDataForLevel(level);
    const ders = quizState.cikmisDers
      || (dersler || []).find((d) => `cikmis-${level}-${d.slug}` === topicId)?.ders;
    const list = (ders && pool[ders]) || [];
    const tag = level.toUpperCase();
    return list.map((q) => ({ prompt: `[${q.year} ${tag}] ${q.prompt}`, options: q.options.slice(), answer: q.answer }));
  }
  return QUESTION_BANK[topicId] || FALLBACK_QUESTIONS;
}

const CIKMIS_SUBJECT = 'Çıkmış Sorular';

function cikmisDisplayName(topicId, cikmisDers) {
  if (cikmisDers) return `Çıkmış Sorular • ${cikmisDers}`;
  for (const level of ['tyt', 'ayt']) {
    const found = (cikmisDataForLevel(level).dersler || []).find((d) => `cikmis-${level}-${d.slug}` === topicId);
    if (found) return `Çıkmış Sorular • ${found.ders}`;
  }
  return topicId;
}

function startCikmisQuiz(ders) {
  const level = AppState.activeLevel === 'ayt' ? 'ayt' : 'tyt';
  const { pool, dersler } = cikmisDataForLevel(level);
  const list = ((pool || {})[ders] || []).slice();
  if (!list.length) return;
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  const slug = ((dersler || []).find((d) => d.ders === ders)?.slug)
    || ders.toLocaleLowerCase('tr').replace(/[^a-zçğıöşü]+/g, '');
  const tag = level.toUpperCase();
  // Dersin tüm çıkmış soruları tek testte (yeni yıllar eklenince havuz otomatik büyür).
  // Sonuçlar bitince otomatik kaydedilir (ilerleme + XP + geçmiş).
  quizState = {
    questions: list.map((q) => ({
      prompt: `[${q.year} ${tag}] ${q.prompt}`,
      options: q.options.slice(),
      answer: q.answer,
    })),
    currentIndex: 0,
    correctCount: 0,
    selectedOption: null,
    confidence: null,
    topicId: `cikmis-${level}-${slug}`,
    cikmisDers: ders,
  };

  if ($('quizSetup')) $('quizSetup').style.display = 'none';
  if ($('quizResult')) $('quizResult').style.display = 'none';
  if ($('quizActive')) $('quizActive').style.display = '';
  if ($('quizNextBtn')) $('quizNextBtn').style.display = 'none';

  const qualityBox = $('qualityBox');
  if (qualityBox) qualityBox.style.display = '';

  renderQuizQuestion();
}

let quizState = {
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  selectedOption: null,
  confidence: null,
};

let quizTopicOptions = [];
let quizSelectedSubject = null;
let quizSelectedTopicId = null;

function quizSubjectsForLevel(level) {
  const seen = [];
  getAllTopics().filter((t) => t.level === level).forEach((t) => {
    if (!seen.includes(t.subject)) seen.push(t.subject);
  });
  if ((level === 'tyt' || level === 'ayt') && (cikmisDataForLevel(level).dersler || []).length) {
    seen.push(CIKMIS_SUBJECT);
  }
  return seen;
}

function setQuizSelectedTopic(topicId) {
  quizSelectedTopicId = topicId;
  document.querySelectorAll('#quizTopicCards .quiz-topic-card').forEach((el) => {
    el.classList.toggle('selected', el.dataset.topicId === topicId);
  });
}

function renderQuizSubjects() {
  const list = $('quizSubjectList');
  if (!list) return;
  list.innerHTML = '';
  quizSubjectsForLevel(AppState.activeLevel).forEach((subject) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-subject-btn'
      + (subject === quizSelectedSubject ? ' selected' : '')
      + (subject === CIKMIS_SUBJECT ? ' quiz-subject-cikmis' : '');
    btn.innerHTML = `<span class="quiz-subject-icon">${CLASS_ICONS[subject] || (subject === CIKMIS_SUBJECT ? '📜' : '📚')}</span><span>${subject}</span>`;
    btn.onclick = () => {
      quizSelectedSubject = subject;
      list.querySelectorAll('.quiz-subject-btn').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      renderQuizTopics(true);
    };
    list.appendChild(btn);
  });
}

function renderQuizTopics(animate = false) {
  const pane = $('quizTopicCards');
  if (!pane) return;
  pane.innerHTML = '';
  const titleEl = $('quizTopicPaneTitle');
  const hintEl = $('quizHint');
  const startBtn = $('quizStartBtn');
  if (quizSelectedSubject === CIKMIS_SUBJECT) {
    const level = AppState.activeLevel;
    const { dersler } = cikmisDataForLevel(level);
    if (titleEl) titleEl.textContent = `2️⃣ Çıkmış Ders Seç (${level.toUpperCase()})`;
    if (hintEl) hintEl.textContent = '📜 Çıkmış sorulardan bir ders seç, test hemen başlasın.';
    if (startBtn) startBtn.disabled = true;
    (dersler || []).forEach((d, i) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'quiz-topic-card';
      if (animate) card.style.animationDelay = `${Math.min(i * 45, 600)}ms`;
      card.innerHTML = `<span class="quiz-topic-icon">${d.icon || '📜'}</span><span>${d.ders}</span>`;
      card.onclick = () => startCikmisQuiz(d.ders);
      pane.appendChild(card);
    });
    if (!(dersler || []).length) {
      pane.innerHTML = '<div class="quiz-topics-empty">Bu seviyede çıkmış soru bulunamadı.</div>';
    }
    return;
  }
  if (titleEl) titleEl.textContent = '2️⃣ Konu';
  if (hintEl) hintEl.textContent = '📌 Sınav, seçtiğin genel konudan karışık sorular içerir.';
  if (startBtn) startBtn.disabled = false;
  const topics = quizTopicOptions.filter((t) => t.subject === quizSelectedSubject);
  if (topics.length && !topics.some((t) => t.id === quizSelectedTopicId)) {
    quizSelectedTopicId = topics[0].id;
  }
  topics.forEach((topic, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'quiz-topic-card' + (topic.id === quizSelectedTopicId ? ' selected' : '');
    card.dataset.topicId = topic.id;
    if (animate) card.style.animationDelay = `${Math.min(i * 45, 600)}ms`;
    card.innerHTML = `<span class="quiz-topic-icon">${topic.icon || '📖'}</span><span>${topic.name}</span>`;
    card.onclick = () => setQuizSelectedTopic(topic.id);
    pane.appendChild(card);
  });
  if (topics.length === 0) {
    pane.innerHTML = '<div class="quiz-topics-empty">Bu derste konu bulunamadı.</div>';
  }
}

function refreshQuizTopicSelect(level) {
  AppState.activeLevel = level;
  quizTopicOptions = getAllTopics().filter((t) => t.level === level);
  const subjects = quizSubjectsForLevel(level);
  quizSelectedSubject = subjects.length ? subjects[0] : null;
  quizSelectedTopicId = null;
  renderQuizSubjects();
  renderQuizTopics(false);
}

function initQuizPage() {
  const setup = $('quizSetup');
  if (!setup) return;

  quizTopicOptions = getAllTopics().filter((t) => t.level === AppState.activeLevel);
  const subjects = quizSubjectsForLevel(AppState.activeLevel);
  quizSelectedSubject = subjects.length ? subjects[0] : null;
  quizSelectedTopicId = null;
  renderQuizSubjects();
  renderQuizTopics(false);

  const startBtn = $('quizStartBtn');
  if (startBtn) {
    startBtn.onclick = () => {
      if (quizSelectedTopicId) startQuiz(quizSelectedTopicId);
    };
  }

  const retryBtn = $('quizRetryBtn');
  if (retryBtn) {
    retryBtn.onclick = () => {
      if (quizState.cikmisDers) startCikmisQuiz(quizState.cikmisDers);
      else if (quizState.topicId) startQuiz(quizState.topicId);
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

  const quitBtn = $('quizQuitBtn');
  if (quitBtn) {
    quitBtn.onclick = () => quitQuiz();
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
    confidence: null,
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

function quitQuiz() {
  if ($('quizSetup')) $('quizSetup').style.display = '';
  if ($('quizActive')) $('quizActive').style.display = 'none';
  if ($('quizResult')) $('quizResult').style.display = 'none';
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

  // Reset confidence selection (çıkmış sorularda güven adımı yoktur)
  quizState.confidence = null;
  const confidenceContainer = $('quizConfidence');
  const isCikmis = !!quizState.cikmisDers;
  if (confidenceContainer) confidenceContainer.style.display = isCikmis ? 'none' : '';
  confidenceContainer?.querySelectorAll('.quiz-confidence-btn').forEach((btn) => {
    btn.classList.remove('selected');
    btn.disabled = false;
  });

  const nextBtn = $('quizNextBtn');
  if (nextBtn) nextBtn.style.display = 'none';

  // Attach confidence handlers once
  if (confidenceContainer && !confidenceContainer.dataset.bound) {
    confidenceContainer.dataset.bound = '1';
    confidenceContainer.querySelectorAll('.quiz-confidence-btn').forEach((btn) => {
      btn.onclick = () => selectConfidence(btn.dataset.confidence);
    });
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

  // Yanlış Soru Defteri: bu sorunun bu turda doğru olup olmadığı
  // soru anahtarına işaretlenir; yanlışsa deftere düşer.
  const qKey = question.__id || wrongKey(quizState.topicId, question.prompt);
  quizState.wrongFlags = quizState.wrongFlags || {};
  quizState.wrongFlags[qKey] = isCorrect;
  if (!isCorrect && quizState.source !== 'wrongbook') recordWrongAnswer(quizState.topicId, question);

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

  updateQuizNextButton();
}

function selectConfidence(level) {
  if (!level || quizState.selectedOption === null) return;
  quizState.confidence = level;
  $('quizConfidence')?.querySelectorAll('.quiz-confidence-btn').forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.confidence === level);
  });
  updateQuizNextButton();
}

function updateQuizNextButton() {
  const nextBtn = $('quizNextBtn');
  if (!nextBtn) return;
  // Çıkmış sorularda güven seçimi yoktur: şık seçilince ilerlenir.
  const needConfidence = !quizState.cikmisDers;
  if (quizState.selectedOption === null || (needConfidence && !quizState.confidence)) {
    nextBtn.style.display = 'none';
    return;
  }
  nextBtn.style.display = '';
  nextBtn.textContent = quizState.currentIndex + 1 >= quizState.questions.length
    ? '🏁 Sonucu Gör'
    : '▶️ Sonraki';
}

function saveMetacognitionRecord() {
  if (quizState.selectedOption === null || !quizState.confidence) return;
  const question = quizState.questions[quizState.currentIndex];
  const topic = getAllTopics().find((t) => t.id === quizState.topicId);
  const record = {
    topicId: quizState.topicId,
    subject: topic?.subject || quizState.cikmisDers || 'Genel',
    level: topic?.level || (typeof quizState.topicId === 'string' && quizState.topicId.startsWith('cikmis-ayt-') ? 'ayt' : 'tyt'),
    prompt: question?.prompt || '',
    isCorrect: quizState.selectedOption === question.answer,
    confidence: quizState.confidence,
    timestamp: new Date().toISOString(),
  };
  const data = readStorage(STORAGE_KEYS.metacognition, []);
  data.push(record);
  writeStorage(STORAGE_KEYS.metacognition, data);
}

function nextQuestion() {
  saveMetacognitionRecord();
  if (quizState.currentIndex + 1 >= quizState.questions.length) {
    finishQuiz();
    return;
  }
  quizState.currentIndex++;
  quizState.selectedOption = null;
  quizState.confidence = null;
  renderQuizQuestion();
}

function finishQuiz() {
  const total = quizState.questions.length;
  const correct = quizState.correctCount;
  const accuracy = Math.round((correct / total) * 100);

  // Yanlış Soru Defteri turu: konu ilerlemesi sayılmaz; kayıtlar güncellenir.
  if (quizState.source === 'wrongbook') {
    updateWrongBookAfterRun();
    const wbXp = correct > 0 ? correct * 2 : 1;
    addXp(wbXp);
    playAppSound('purchase');
    const wbTopicNames = quizState.wrongTopicNames && quizState.wrongTopicNames.size
      ? Array.from(quizState.wrongTopicNames).join(', ')
      : 'karışık konular';
    if ($('quizActive')) $('quizActive').style.display = 'none';
    if ($('quizResult')) $('quizResult').style.display = '';
    if ($('quizResultIcon')) $('quizResultIcon').textContent = accuracy >= 70 ? '📕✨' : '📕';
    if ($('quizResultTitle')) $('quizResultTitle').textContent = accuracy >= 70 ? 'Defter temizleniyor!' : 'Bir daha dene!';
    if ($('quizResultText')) $('quizResultText').textContent = `Yanlış defterinde ${correct}/${total} doğru yaptın (${accuracy}%) · ${wbTopicNames}. +${wbXp} XP!`;
    if ($('quizRetryBtn')) $('quizRetryBtn').style.display = 'none';
    renderDashboardWrongBook();
    return;
  }

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

  const topicName = quizState.cikmisDers
    ? cikmisDisplayName(quizState.topicId, quizState.cikmisDers)
    : (getAllTopics().find((t) => t.id === quizState.topicId)?.name || quizState.topicId);

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
  const raw = readStorage(STORAGE_KEYS.tasks, {});
  // Eski/bozuk kayıtlara tolerans: string/null giren veya eksik alanlı
  // görevler normalize edilir ki tek bir zehirli kayıt panoyu,
  // planlayıcıyı, kanbanı ya da sayacı asla öldüremesin.
  const clean = {};
  Object.entries(raw || {}).forEach(([dayKey, dayTasks]) => {
    clean[dayKey] = (Array.isArray(dayTasks) ? dayTasks : []).map((t, i) => {
      if (t && typeof t === 'object') return { id: t.id ?? `eski-${i}`, title: t.title ?? '', status: t.status ?? (t.done ? 'done' : 'todo'), time: t.time ?? '', ...t };
      return { id: `eski-${i}`, title: String(t ?? ''), status: 'todo', time: '' };
    });
  });
  return clean;
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
  // Sayaç her koşulda kurulur: bir bölüm patlasa bile geri sayım ve etiketler yaşar.
  try {
    updatePlannerExamCountdown();
    clearInterval(plannerCountdownInterval);
    plannerCountdownInterval = setInterval(updatePlannerExamCountdown, 1000);
  } catch (err) {
    console.error('[planner] sayaç kurulamadı:', err);
  }
  // Bölüm bölüm koruma: zehirli tek kayıt sayfayı öldürmesin.
  [
    renderPlannerQuote,
    renderPlannerDays,
    renderPlannerTasks,
    renderPlannerStats,
    initPlannerForm,
    initPhraseInput,
    initPomodoro,
    initTutorPanel,
    initPlannerViews,
    renderPlannerKanban,
    initPlannerCalendar,
    renderPlannerCalendar,
  ].forEach((fn) => {
    try {
      fn();
    } catch (err) {
      console.error('[planner] bölüm atlandı:', fn.name, err);
    }
  });
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
  // Tek doğruluk kaynağı: dashboard, planlayıcı ve zamanlayıcı aynı sınav
  // tarihlerini kullanır. Tek satır patlasa bile diğerleri güncellenmeye devam
  // eder; aksi halde deployda geri sayım donuk kalıyordu.
  try {
    const exams = getUpcomingExamDates();
    const tytDays = Math.max(0, Math.ceil((exams.tyt.getTime() - Date.now()) / (24 * 60 * 60 * 1000)));
    if ($('countdownValue')) $('countdownValue').textContent = tytDays;
    if ($('plannerTytCountdown')) $('plannerTytCountdown').textContent = formatCountdown(exams.tyt);
    if ($('plannerAytCountdown')) $('plannerAytCountdown').textContent = formatCountdown(exams.ayt);
    if ($('timerTytCountdown')) $('timerTytCountdown').textContent = formatCountdown(exams.tyt);
    if ($('timerAytCountdown')) $('timerAytCountdown').textContent = formatCountdown(exams.ayt);
    if ($('plannerTytDate')) $('plannerTytDate').textContent = exams.tyt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    if ($('plannerAytDate')) $('plannerAytDate').textContent = exams.ayt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    if ($('timerTytDate')) $('timerTytDate').textContent = exams.tyt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    if ($('timerAytDate')) $('timerAytDate').textContent = exams.ayt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch (err) {
    console.error('[countdown] güncellenemedi:', err);
  }
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
      <span class="planner-task-title">${shortPlanTitle(task.title)}</span>
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
            <strong>${shortPlanTitle(task.title, escapePlannerHtml)}</strong>
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
        ${taskItems.map((task) => `<span
          class="planner-calendar-task">${shortPlanTitle(task.title, escapePlannerHtml)}</span>`).join('')}
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
      recordFocusSession(Math.round(pomodoroInitialSeconds / 60));
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
    updatePearlDisplay();
    const todayKey = focusDayKey(Date.now());
    const todaySessions = getFocusLog().filter((entry) => entry && focusDayKey(entry.t) === todayKey).length;
    const dailyGoal = 4;
    if ($('timerSessionProgress')) $('timerSessionProgress').style.width = `${Math.min(100, (todaySessions / dailyGoal) * 100)}%`;
    const aqState = syncAquarium(timerSessionCount, false);
    if ($('aquariumRewardCount')) $('aquariumRewardCount').textContent = `${aqState.corals.length} mercan · ${aqState.fish.length} balık`;
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
          const focusMins = recordFocusSession(Math.round(timerPomodoroInitialSeconds / 60));
          timerFocusStreak += 1;
          const earnedXp = rewardState.xpMultiplier === 2 ? 10 : 5;
          addXp(earnedXp);
          syncAquarium(timerSessionCount, true);
          setTimeout(() => showToast(`+${focusMins} 🦪 İnci kazandın!`), 2600);
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
// NOTE: Bu ekranlar veri kaynağı olarak Yol Haritası ile birebir aynı
// CURRICULUM[level][subject] yapısını kullanır. Yol haritasına yeni konu
// eklendiğinde buraya otomatik yansır.
let currentTeacherLevel = 'tyt';
let currentTeacherSubject = null;
let currentTeacherMainTopic = null; // seçili ana konu objesi
let currentTeacherSubtopic = null; // { name, id } veya null
let currentStudentLevel = 'tyt';
let currentStudentSubject = null;
let currentStudentMainTopic = null;
let currentStudentSubtopic = null;

function selectionLevelFor(type) {
  return type === 'teacher' ? currentTeacherLevel : currentStudentLevel;
}

function selectionSubjectFor(type) {
  return type === 'teacher' ? currentTeacherSubject : currentStudentSubject;
}

function setSelectionSubject(type, subject) {
  if (type === 'teacher') {
    currentTeacherSubject = subject;
    currentTeacherMainTopic = null;
    currentTeacherSubtopic = null;
  } else {
    currentStudentSubject = subject;
    currentStudentMainTopic = null;
    currentStudentSubtopic = null;
  }
  AppState.activeLevel = selectionLevelFor(type);
  AppState.activeSubject = subject;
  AppState.activeTopic = null;
}

function selectionMainTopicFor(type) {
  return type === 'teacher' ? currentTeacherMainTopic : currentStudentMainTopic;
}

function setSelectionMainTopic(type, topic) {
  if (type === 'teacher') {
    currentTeacherMainTopic = topic;
    currentTeacherSubtopic = null;
  } else {
    currentStudentMainTopic = topic;
    currentStudentSubtopic = null;
  }
  AppState.activeLevel = selectionLevelFor(type);
  AppState.activeSubject = selectionSubjectFor(type);
  AppState.activeTopic = topic ? topic.id : null;
}

function setSelectionSubtopic(type, sub) {
  if (type === 'teacher') currentTeacherSubtopic = sub;
  else currentStudentSubtopic = sub;
  if (sub) AppState.activeTopic = sub.id;
}

function syncSelectionLevelToggle(toggleId, level) {
  const toggle = $(toggleId);
  if (!toggle) return;
  toggle.querySelectorAll('.level-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.level === level);
  });
}

function startSelectionChat(type) {
  playLessonIntro(() => {
    const level = selectionLevelFor(type);
    AppState.activeLevel = level;
    if (type === 'teacher') {
      if ($('teacherSelection')) $('teacherSelection').style.display = 'none';
      if ($('teacherChat')) $('teacherChat').style.display = '';
      initTeacherChat();
    } else {
      if ($('studentSelection')) $('studentSelection').style.display = 'none';
      if ($('studentChat')) $('studentChat').style.display = '';
      initStudentChat();
    }
  });
}

// Ders girişi: tam ekranda video + ses, bitince sohbet açılır.
function playLessonIntro(next) {
  let overlay = document.querySelector('.lesson-intro-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'lesson-intro-overlay';
    overlay.innerHTML = `
      <video class="lesson-intro-video" playsinline preload="auto"></video>
      <button type="button" class="lesson-intro-skip">Geç →</button>`;
    document.body.appendChild(overlay);
  }
  const video = overlay.querySelector('.lesson-intro-video');
  let audio;
  if (preloadedLessonAudio && lessonAudioReady) {
    audio = preloadedLessonAudio;
    try { audio.currentTime = 0; } catch { /* yok say */ }
  } else {
    audio = new Audio();
    playAudioWithFallback(audio, LESSON_INTRO_ASSETS.audio);
  }
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    try { video.pause(); } catch { /* yok say */ }
    try { audio.pause(); } catch { /* yok say */ }
    overlay.classList.remove('show');
    video.removeAttribute('src');
    video.load();
    next();
  };
  overlay.querySelector('.lesson-intro-skip').onclick = finish;
  video.onended = finish;
  overlay.classList.add('show');
  try {
    const ap = audio.play();
    if (ap && typeof ap.catch === 'function') ap.catch(() => {});
  } catch { /* yok say */ }
  playVideoWithFallback(video, 'videos/dersbaşlıyor.mp4', finish);
}

function renderTeacherSelection() {
  syncSelectionLevelToggle('teacherSelectionLevelToggle', currentTeacherLevel);
  renderSubjectGrid('teacherSubjectGrid', 'teacher');
  renderTeacherTopics();
  renderTeacherSubtopics();

  const backBtn = $('teacherSelectionBack');
  if (backBtn) {
    backBtn.onclick = () => showPage('dashboard');
  }

  const changeSubject = $('teacherChangeSubject');
  if (changeSubject) {
    changeSubject.onclick = () => {
      if ($('teacherTopicStep')) $('teacherTopicStep').style.display = 'none';
      if ($('teacherSubtopicStep')) $('teacherSubtopicStep').style.display = 'none';
      if ($('teacherSubjectGrid')) $('teacherSubjectGrid').style.display = '';
    };
  }

  const changeTopic = $('teacherChangeTopic');
  if (changeTopic) {
    changeTopic.onclick = () => {
      if ($('teacherSubtopicStep')) $('teacherSubtopicStep').style.display = 'none';
      if ($('teacherTopicGrid')) $('teacherTopicGrid').style.display = '';
    };
  }

  const startChat = $('teacherStartChat');
  if (startChat) {
    startChat.onclick = () => startSelectionChat('teacher');
  }
  const startChatSub = $('teacherStartChatSub');
  if (startChatSub) {
    startChatSub.onclick = () => startSelectionChat('teacher');
  }
}

function renderSubjectGrid(containerId, type) {
  const container = $(containerId);
  if (!container) return;
  const level = selectionLevelFor(type);
  const subjects = Object.keys(CURRICULUM[level] || {});
  const selected = selectionSubjectFor(type);
  container.innerHTML = '';
  subjects.forEach((subject) => {
    const card = document.createElement('div');
    card.className = 'subject-card' + (subject === selected ? ' selected' : '');
    card.innerHTML = `
      <span class="subject-icon">${CLASS_ICONS[subject] || '📚'}</span>
      <span class="subject-name">${subject}</span>
      <span class="topic-sub">${level.toUpperCase()}</span>
    `;
    card.onclick = () => {
      container.querySelectorAll('.subject-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      setSelectionSubject(type, subject);
      if (type === 'teacher') {
        renderTeacherTopics();
        renderTeacherSubtopics();
      } else {
        renderStudentTopics();
        renderStudentSubtopics();
      }
    };
    container.appendChild(card);
  });
}

function renderSelectionTopics(type) {
  const isTeacher = type === 'teacher';
  const container = $(isTeacher ? 'teacherTopicGrid' : 'studentTopicGrid');
  const step = $(isTeacher ? 'teacherTopicStep' : 'studentTopicStep');
  const subStep = $(isTeacher ? 'teacherSubtopicStep' : 'studentSubtopicStep');
  const startChat = $(isTeacher ? 'teacherStartChat' : 'studentStartChat');
  if (!container) return;
  const level = selectionLevelFor(type);
  const subject = selectionSubjectFor(type);
  const mainTopic = selectionMainTopicFor(type);

  if (!subject) {
    if (step) step.style.display = 'none';
    if (subStep) subStep.style.display = 'none';
    container.innerHTML = '';
    return;
  }
  if (step) step.style.display = '';

  container.innerHTML = '';
  // Yol haritası ile aynı kaynak: CURRICULUM[level][subject]
  const topics = CURRICULUM[level]?.[subject] || [];
  if (topics.length === 0) {
    container.innerHTML = '<div class="empty-msg">Bu ders için konu bulunamadı.</div>';
    if (startChat) startChat.disabled = true;
    return;
  }
  topics.forEach((topic) => {
    const card = document.createElement('div');
    card.className = 'topic-card' + (mainTopic && mainTopic.id === topic.id ? ' selected' : '');
    const subtopics = getSubtopics(topic);
    const subCount = subtopics.length;
    card.innerHTML = `
      <span class="topic-icon">${topic.icon || '📚'}</span>
      <span class="topic-name">${topic.name}</span>
      <span class="topic-sub">${level.toUpperCase()} • ${subCount} alt konu</span>
    `;
    card.onclick = () => {
      container.querySelectorAll('.topic-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      setSelectionMainTopic(type, topic);
      if (isTeacher) renderTeacherSubtopics();
      else renderStudentSubtopics();
      // Konu kartına tıklanınca alt konu adımını öne çıkar
      const grid = $(isTeacher ? 'teacherTopicGrid' : 'studentTopicGrid');
      if (grid) grid.style.display = '';
      if (startChat) startChat.disabled = false;
    };
    container.appendChild(card);
  });

  if (startChat) startChat.disabled = !mainTopic;
}

function renderSelectionSubtopics(type) {
  const isTeacher = type === 'teacher';
  const container = $(isTeacher ? 'teacherSubtopicGrid' : 'studentSubtopicGrid');
  const step = $(isTeacher ? 'teacherSubtopicStep' : 'studentSubtopicStep');
  const startChatSub = $(isTeacher ? 'teacherStartChatSub' : 'studentStartChatSub');
  if (!container || !step) return;
  const mainTopic = selectionMainTopicFor(type);
  const currentSub = isTeacher ? currentTeacherSubtopic : currentStudentSubtopic;

  if (!mainTopic) {
    step.style.display = 'none';
    container.innerHTML = '';
    return;
  }
  step.style.display = '';
  const title = step.querySelector('.step-title');
  if (title) title.textContent = `3️⃣ Alt Konu Seç — ${mainTopic.name}`;

  container.innerHTML = '';
  // Yol haritası ile aynı alt konular: getSubtopics(mainTopic)
  const subtopics = getSubtopics(mainTopic);
  if (subtopics.length === 0) {
    container.innerHTML = '<div class="empty-msg">Bu konu için alt konu bulunamadı.</div>';
    if (startChatSub) startChatSub.disabled = true;
    return;
  }
  subtopics.forEach((subtopicName, idx) => {
    const subtopicId = `${mainTopic.id}-sub-${idx}`;
    const card = document.createElement('div');
    card.className = 'topic-card' + (currentSub && currentSub.id === subtopicId ? ' selected' : '');
    card.innerHTML = `
      <span class="topic-icon">📝</span>
      <span class="topic-name">${subtopicName}</span>
      <span class="topic-sub">${mainTopic.name}</span>
    `;
    card.onclick = () => {
      container.querySelectorAll('.topic-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      setSelectionSubtopic(type, { name: subtopicName, id: subtopicId });
      if (startChatSub) startChatSub.disabled = false;
    };
    container.appendChild(card);
  });

  if (startChatSub) startChatSub.disabled = !currentSub;
}

function renderTeacherTopics() {
  renderSelectionTopics('teacher');
}

function renderTeacherSubtopics() {
  renderSelectionSubtopics('teacher');
}

function initTeacherChat() {
  initChatModes('teacher');
  const toggle = $('teacherToggle');
  const boardBox = $('teacherBoardBox');
  if (toggle && boardBox) {
    toggle.onclick = () => {
      boardBox.style.display = boardBox.style.display === 'none' ? '' : 'none';
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
}

function renderStudentSelection() {
  syncSelectionLevelToggle('studentSelectionLevelToggle', currentStudentLevel);
  renderSubjectGrid('studentSubjectGrid', 'student');
  renderStudentTopics();
  renderStudentSubtopics();

  const backBtn = $('studentSelectionBack');
  if (backBtn) {
    backBtn.onclick = () => showPage('dashboard');
  }

  const changeSubject = $('studentChangeSubject');
  if (changeSubject) {
    changeSubject.onclick = () => {
      if ($('studentTopicStep')) $('studentTopicStep').style.display = 'none';
      if ($('studentSubtopicStep')) $('studentSubtopicStep').style.display = 'none';
      if ($('studentSubjectGrid')) $('studentSubjectGrid').style.display = '';
    };
  }

  const changeTopic = $('studentChangeTopic');
  if (changeTopic) {
    changeTopic.onclick = () => {
      if ($('studentSubtopicStep')) $('studentSubtopicStep').style.display = 'none';
      if ($('studentTopicGrid')) $('studentTopicGrid').style.display = '';
    };
  }

  const startChat = $('studentStartChat');
  if (startChat) {
    startChat.onclick = () => startSelectionChat('student');
  }
  const startChatSub = $('studentStartChatSub');
  if (startChatSub) {
    startChatSub.onclick = () => startSelectionChat('student');
  }
}

function renderStudentTopics() {
  renderSelectionTopics('student');
}

function renderStudentSubtopics() {
  renderSelectionSubtopics('student');
}

function initStudentChat() {
  initChatModes('student');
  const toggle = $('studentToggle');
  const boardBox = $('studentBoardBox');
  if (toggle && boardBox) {
    toggle.onclick = () => {
      boardBox.style.display = boardBox.style.display === 'none' ? '' : 'none';
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
}

function initChatModes(type) {
  const chat = $(type === 'teacher' ? 'teacherChat' : 'studentChat');
  if (!chat) return;
  const boardBox = $(`${type}BoardBox`);
  const voicePanel = $(`${type}VoiceMode`);
  const messages = $(`${type}Messages`);
  const form = $(`${type}Form`);
  const modeTabs = chat.querySelectorAll('[data-chat-mode]');
  const setMode = (mode) => {
    modeTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.chatMode === mode));
    if (messages) messages.hidden = mode !== 'chat';
    if (form) form.hidden = mode !== 'chat';
    if (boardBox) boardBox.style.display = mode === 'board' ? '' : 'none';
    if (voicePanel) voicePanel.hidden = mode !== 'voice';
    if (mode === 'board') {
      const penBtn = boardBox?.querySelector('.wb-tool[data-tool="pen"]');
      if (penBtn) penBtn.click();
      const boardCanvas = $(`${type}Board`);
      window.requestAnimationFrame(() => {
        if (boardCanvas?.__wbResize) boardCanvas.__wbResize();
        else window.dispatchEvent(new Event('resize'));
      });
    }
  };
  modeTabs.forEach((tab) => { tab.onclick = () => setMode(tab.dataset.chatMode || 'chat'); });
  setMode('chat');

  const voiceButton = $(`${type}VoiceModeBtn`);
  const status = $(`${type}VoiceModeStatus`);
  if (voiceButton) {
    voiceButton.onclick = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (status) status.textContent = 'Tarayıcın sesli girişi desteklemiyor.';
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = 'tr-TR';
      recognition.interimResults = false;
      voiceButton.classList.add('listening');
      if (status) status.textContent = 'Seni dinliyorum...';
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = $(`${type}Input`);
        if (input) input.value = transcript;
        if (status) status.textContent = 'Mesajın hazır, gönderebilirsin.';
      };
      recognition.onerror = () => { if (status) status.textContent = 'Mikrofon erişimi alınamadı.'; };
      recognition.onend = () => voiceButton.classList.remove('listening');
      recognition.start();
    };
  }
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
    if (!canvas || canvas.dataset.wbReady === '1') return;
    canvas.dataset.wbReady = '1';

    const ctx = canvas.getContext('2d');
    let drawing = false;
    let tool = 'pen';
    let color = '#1e293b';
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    const history = [];

    const boardBox = canvas.closest('.whiteboard-box');
    const bgCanvas = document.createElement('canvas');
    bgCanvas.className = 'whiteboard-bg sky-board-bg';
    bgCanvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    canvas.style.position = 'relative';
    canvas.style.zIndex = '1';
    if (boardBox && !boardBox.querySelector('.whiteboard-bg')) {
      boardBox.style.position = 'relative';
      boardBox.insertBefore(bgCanvas, canvas);
    }
    const bgCtx = bgCanvas.getContext('2d');
    const checkedColor = boardBox?.querySelector('.wb-color input:checked');
    if (checkedColor) color = checkedColor.value;

    // Varsayılan tema: saf beyaz. Mağazadan alınan sahil/kara tahta
    // teması seçilirse görsel kutuya tam oturacak şekilde uygulanır.
    if (boardBox && !boardBox.dataset.wbTheme) boardBox.dataset.wbTheme = 'default';
    applyWhiteboardTheme(boardBox, boardBox ? boardBox.dataset.wbTheme : 'default');

    function getPoint(e) {
      const rect = canvas.getBoundingClientRect();
      const source = e.touches?.[0] || e.changedTouches?.[0] || e;
      const scaleX = canvas.width / Math.max(1, rect.width);
      const scaleY = canvas.height / Math.max(1, rect.height);
      return {
        x: (source.clientX - rect.left) * scaleX,
        y: (source.clientY - rect.top) * scaleY,
      };
    }

    function drawWhiteBackground() {
      paintBoardBackground();
    }

    // Tahta zeminini aktif temaya göre boya: beyaz temada opak beyaz,
    // görsel temalarda şeffaf (alttaki tam oturan arka plan görünür).
    function paintBoardBackground() {
      const theme = boardBox?.dataset.wbTheme || 'default';
      const w = bgCanvas.width;
      const h = bgCanvas.height;
      bgCtx.clearRect(0, 0, w, h);
      if (theme === 'default') {
        bgCtx.fillStyle = '#ffffff';
        bgCtx.fillRect(0, 0, w, h);
      }
    }

    function paintStroke(stroke, preview = false) {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = stroke.lineWidth || (stroke.type === 'eraser' ? 22 : 2.5);
      ctx.strokeStyle = stroke.color || color;

      if (stroke.type === 'pen' || stroke.type === 'eraser') {
        const pts = stroke.points || [];
        if (pts.length < 2) {
          if (pts[0]) {
            ctx.beginPath();
            ctx.arc(pts[0].x, pts[0].y, ctx.lineWidth / 2, 0, Math.PI * 2);
            if (stroke.type === 'eraser') {
              ctx.globalCompositeOperation = 'destination-out';
              ctx.fillStyle = 'rgba(0,0,0,1)';
            } else {
              ctx.globalCompositeOperation = 'source-over';
              ctx.fillStyle = ctx.strokeStyle;
            }
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
          if (stroke.type === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.stroke();
          } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.stroke();
          }
        }
      } else if (stroke.type === 'line') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.moveTo(stroke.x1, stroke.y1);
        ctx.lineTo(stroke.x2, stroke.y2);
        ctx.stroke();
      } else if (stroke.type === 'rect') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeRect(stroke.x, stroke.y, stroke.w, stroke.h);
      } else if (stroke.type === 'circle') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.arc(stroke.x, stroke.y, Math.max(0, stroke.r || 0), 0, Math.PI * 2);
        ctx.stroke();
      } else if (stroke.type === 'triangle') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.moveTo(stroke.x1, stroke.y1);
        ctx.lineTo(stroke.x2, stroke.y2);
        ctx.lineTo(stroke.x3, stroke.y3);
        ctx.closePath();
        ctx.stroke();
      }

      if (preview && stroke.sizeLabel) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.font = '12px monospace';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(stroke.sizeLabel, stroke.labelX, stroke.labelY);
      }
      ctx.restore();
    }

    function redrawAll(previewStroke = null) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      history.forEach((stroke) => paintStroke(stroke));
      if (previewStroke) paintStroke(previewStroke, true);
    }

    function clearBoard() {
      history.length = 0;
      drawing = false;
      redrawAll();
      playAppSound('planDeleted');
    }

    function resizeCanvas() {
      const cssW = Math.max(1, Math.floor(canvas.clientWidth || canvas.offsetWidth || 300));
      const cssH = Math.max(1, Math.floor(canvas.clientHeight || canvas.offsetHeight || 240));
      canvas.width = cssW;
      canvas.height = cssH;
      bgCanvas.width = cssW;
      bgCanvas.height = cssH;
      drawWhiteBackground();
      redrawAll();
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // When board becomes visible, size may be 0 initially
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => resizeCanvas()) : null;
    if (ro) ro.observe(canvas);

    const clearBtn = $(clearId);
    if (clearBtn) clearBtn.onclick = clearBoard;

    const toolsContainer = $(toolsId);
    if (toolsContainer) {
      toolsContainer.querySelectorAll('.wb-tool').forEach((btn) => {
        btn.onclick = () => {
          toolsContainer.querySelectorAll('.wb-tool').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          tool = btn.dataset.tool || 'pen';
          playAppSound('click');
        };
      });
    }

    // Tahta arka plan teması menüsü (tüm tahtalarda ortak)
    const settingsBtn = boardBox?.querySelector('.wb-settings-btn');
    const themeDropdown = boardBox?.querySelector('.wb-theme-dropdown');
    const themeOptions = boardBox?.querySelectorAll('.wb-theme-option');
    if (settingsBtn && themeDropdown && themeOptions) {
      settingsBtn.onclick = (e) => {
        e.stopPropagation();
        updateWhiteboardThemeLocks(boardBox);
        themeDropdown.style.display = themeDropdown.style.display === 'none' ? 'block' : 'none';
        settingsBtn.setAttribute('aria-expanded', themeDropdown.style.display === 'block');
      };
      document.addEventListener('click', (e) => {
        if (!settingsBtn.contains(e.target) && !themeDropdown.contains(e.target)) {
          themeDropdown.style.display = 'none';
          settingsBtn.setAttribute('aria-expanded', 'false');
        }
      });
      themeOptions.forEach((opt) => {
        opt.onclick = () => {
          const theme = opt.dataset.theme;
          if (opt.disabled) return;
          themeOptions.forEach((o) => o.classList.remove('active'));
          opt.classList.add('active');
          applyWhiteboardTheme(boardBox, theme);
          themeDropdown.style.display = 'none';
          settingsBtn.setAttribute('aria-expanded', 'false');
          playAppSound('click');
        };
      });
    }

    boardBox?.querySelectorAll('.wb-color input').forEach((radio) => {
      radio.onchange = () => { if (radio.checked) color = radio.value; };
    });

    function beginStroke(point) {
      drawing = true;
      startX = point.x;
      startY = point.y;
      lastX = point.x;
      lastY = point.y;
      if (tool === 'pen') {
        history.push({ type: 'pen', color, lineWidth: 2.5, points: [{ x: point.x, y: point.y }] });
      } else if (tool === 'eraser') {
        history.push({ type: 'eraser', lineWidth: 22, points: [{ x: point.x, y: point.y }] });
      }
    }

    function moveStroke(point) {
      if (!drawing) return;
      lastX = point.x;
      lastY = point.y;

      if (tool === 'pen' || tool === 'eraser') {
        const last = history[history.length - 1];
        if (last && (last.type === 'pen' || last.type === 'eraser')) {
          last.points.push({ x: point.x, y: point.y });
          redrawAll();
        }
        return;
      }

      const w = point.x - startX;
      const h = point.y - startY;
      let preview = null;
      if (tool === 'line') {
        preview = { type: 'line', color, x1: startX, y1: startY, x2: point.x, y2: point.y };
      } else if (tool === 'rect') {
        preview = { type: 'rect', color, x: startX, y: startY, w, h };
      } else if (tool === 'circle') {
        preview = { type: 'circle', color, x: startX, y: startY, r: Math.hypot(w, h) };
      } else if (tool === 'triangle') {
        preview = { type: 'triangle', color, x1: startX, y1: startY, x2: point.x, y2: point.y, x3: startX, y3: point.y };
      }
      if (preview) {
        preview.sizeLabel = `${Math.abs(Math.round(w))}x${Math.abs(Math.round(h))}px`;
        preview.labelX = point.x + 12;
        preview.labelY = point.y + 14;
        redrawAll(preview);
      }
    }

    function endStroke() {
      if (!drawing) return;
      drawing = false;
      if (tool === 'pen' || tool === 'eraser') {
        redrawAll();
        return;
      }

      const endX = lastX;
      const endY = lastY;
      const w = endX - startX;
      const h = endY - startY;
      let stroke = null;
      if (tool === 'line') {
        stroke = { type: 'line', color, x1: startX, y1: startY, x2: endX, y2: endY };
      } else if (tool === 'rect') {
        stroke = { type: 'rect', color, x: startX, y: startY, w, h };
      } else if (tool === 'circle') {
        stroke = { type: 'circle', color, x: startX, y: startY, r: Math.hypot(w, h) };
      } else if (tool === 'triangle') {
        stroke = { type: 'triangle', color, x1: startX, y1: startY, x2: endX, y2: endY, x3: startX, y3: endY };
      }
      if (stroke && (Math.abs(w) > 1 || Math.abs(h) > 1 || tool === 'line')) {
        history.push(stroke);
      }
      redrawAll();
    }

    canvas.addEventListener('mousedown', (e) => beginStroke(getPoint(e)));
    canvas.addEventListener('mousemove', (e) => moveStroke(getPoint(e)));
    canvas.addEventListener('mouseup', endStroke);
    canvas.addEventListener('mouseleave', endStroke);

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      beginStroke(getPoint(e));
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      moveStroke(getPoint(e));
    }, { passive: false });
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      endStroke();
    }, { passive: false });
    canvas.addEventListener('touchcancel', endStroke);

    // Expose clear for external callers if needed
    canvas.__wbClear = clearBoard;
    canvas.__wbResize = resizeCanvas;
    redrawAll();
  });
}

// Tahta arka plan görselleri — her ortamda (dev / build / dosya sunucusu)
// çalışması için iki aday yol denenir, ilk açılan kullanılır.
const WHITEBOARD_THEMES = {
  default: null,
  sahil: ['public/images/sahiltahta.jpg', 'images/sahiltahta.jpg'],
  karatahta: ['public/images/yazıtahtası.jpg', 'images/yazıtahtası.jpg'],
};
const AQUARIUM_BG_CANDIDATES = ['public/images/akvaryumarkaplan.jpg', 'images/akvaryumarkaplan.jpg'];

function resolveImage(candidates, cb) {
  const list = Array.isArray(candidates) ? candidates.slice() : [candidates];
  const tryNext = () => {
    if (list.length === 0) { cb(null); return; }
    const url = list.shift();
    const img = new Image();
    img.onload = () => cb(url);
    img.onerror = tryNext;
    img.src = url;
  };
  tryNext();
}

// Runtime asset çözümü: deployda gerçek konum /public/... altı; file:// açılışta
// göreli 'public/...' yolu çalışır. Kod içindeki çıplak '/...' adresleri yayında
// 404 verdiği için sandık/derse başlama animasyonları oynamıyordu.
const publicAssetCache = new Map();

function publicAssetCandidates(relative) {
  if (location.protocol === 'file:') {
    return ['public/' + relative, relative];
  }
  return ['public/' + relative, '/' + relative];
}

function resolveStoredAsset(rawSrc, cb) {
  if (publicAssetCache.has(rawSrc)) {
    cb(publicAssetCache.get(rawSrc));
    return;
  }
  const relative = rawSrc.replace(/^public\//, '');
  resolveImage(publicAssetCandidates(relative), (url) => {
    const best = url || rawSrc;
    publicAssetCache.set(rawSrc, best);
    cb(best);
  });
}

function resolvedAssetUrl(rawSrc) {
  return publicAssetCache.get(rawSrc) || rawSrc;
}

function playVideoWithFallback(video, relative, onFail) {
  const candidates = publicAssetCandidates(relative);
  let index = 0;
  let failed = false;
  const failOnce = () => {
    if (!failed) {
      failed = true;
      onFail();
    }
  };
  const tryCandidate = () => {
    if (index >= candidates.length) { failOnce(); return; }
    video.onerror = () => {
      index += 1;
      tryCandidate();
    };
    video.src = candidates[index];
    const p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch((err) => {
        // 404/kaynak hatasıysa onerror zinciri sonraki adayı dener; yalnızca
        // otomatik oynatma engelinde (NotAllowedError) zarif geçiş yapılır.
        // Burada koşulsuz onFail çağırmak, ilk aday 404'ken animasyonu
        // yeniden deneme şansı kalmadan kapattığı için video hiç oynamıyordu.
        if (err && err.name === 'NotAllowedError') failOnce();
      });
    }
  };
  tryCandidate();
}

function playAudioWithFallback(audio, relative) {
  const candidates = publicAssetCandidates(relative);
  let index = 0;
  audio.onerror = () => {
    index += 1;
    if (index < candidates.length) {
      audio.src = candidates[index];
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
  };
  audio.src = candidates[0];
}

// Ders girişi ve sandık videolarını önden ısıt: URL çözümü + tarayıcı
// önbelleği dolu olursa zil sesi ve video anında başlar, gecikme kalmaz.
const LESSON_INTRO_ASSETS = {
  audio: 'sounds/dersbaşlıyor.mp3',
  video: 'videos/dersbaşlıyor.mp4',
};
const CHEST_VIDEO_ASSET = 'videos/sandık.mp4';

let preloadedLessonAudio = null;
let lessonAudioReady = false;
let chestVideoPreloaded = false;

function preloadLessonIntroAssets() {
  if (preloadedLessonAudio) return;
  preloadedLessonAudio = new Audio();
  preloadedLessonAudio.preload = 'auto';
  let audioIndex = 0;
  const audioCandidates = publicAssetCandidates(LESSON_INTRO_ASSETS.audio);
  preloadedLessonAudio.addEventListener('canplaythrough', () => {
    lessonAudioReady = true;
  }, { once: true });
  preloadedLessonAudio.onerror = () => {
    audioIndex += 1;
    if (audioIndex < audioCandidates.length) preloadedLessonAudio.src = audioCandidates[audioIndex];
  };
  preloadedLessonAudio.src = audioCandidates[0];

  const video = document.createElement('video');
  video.preload = 'auto';
  let videoIndex = 0;
  const videoCandidates = publicAssetCandidates(LESSON_INTRO_ASSETS.video);
  video.onerror = () => {
    videoIndex += 1;
    if (videoIndex < videoCandidates.length) video.src = videoCandidates[videoIndex];
  };
  video.src = videoCandidates[0];
}

function preloadChestVideo() {
  if (chestVideoPreloaded) return;
  chestVideoPreloaded = true;
  const video = document.createElement('video');
  video.preload = 'auto';
  let index = 0;
  const candidates = publicAssetCandidates(CHEST_VIDEO_ASSET);
  video.onerror = () => {
    index += 1;
    if (index < candidates.length) video.src = candidates[index];
  };
  video.src = candidates[0];
}

// Mağaza kilitlerine göre tema menüsündeki seçenekleri güncelle
function updateWhiteboardThemeLocks(boardBox) {
  if (!boardBox) return;
  const sahilUnlocked = localStorage.getItem('unlocked_sahil') === 'true';
  const karatahtaUnlocked = localStorage.getItem('unlocked_karatahta') === 'true';
  boardBox.querySelectorAll('.wb-theme-option').forEach((opt) => {
    const theme = opt.dataset.theme;
    if (theme === 'default') return;
    const unlocked = theme === 'sahil' ? sahilUnlocked : karatahtaUnlocked;
    opt.disabled = !unlocked;
    opt.style.opacity = unlocked ? '1' : '0.6';
    opt.style.cursor = unlocked ? 'pointer' : 'not-allowed';
    const base = theme === 'sahil' ? '🏖️ Gerçekçi Sahil' : '🏫 Klasik Kara Tahta';
    opt.innerHTML = unlocked ? base : `🔒 ${base}`;
  });
}

// Çizim katmanları: beyaz temada opak beyaz, görsel temada şeffaf
function paintWhiteboardCanvases(boardBox, transparent) {
  const drawCanvas = boardBox.querySelector('canvas.whiteboard');
  const bgCanvas = boardBox.querySelector('.whiteboard-bg');
  const canvasBg = transparent ? 'transparent' : '#ffffff';
  if (drawCanvas) drawCanvas.style.setProperty('background', canvasBg, 'important');
  if (bgCanvas) {
    bgCanvas.style.setProperty('background', canvasBg, 'important');
    const bgCtx = bgCanvas.getContext('2d');
    if (bgCtx && bgCanvas.width > 0) {
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      if (!transparent) {
        bgCtx.fillStyle = '#ffffff';
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
      }
    }
  }
}

function applyWhiteboardThemeImage(boardBox, name, url) {
  boardBox.style.setProperty('background-image', `url("${encodeURI(url)}")`, 'important');
  // Kara tahta: çerçevesiyle birebir tam sığar. Sahil: oran korunur,
  // kumluk bölge altta (araç çubuğu hizasında) kalacak şekilde oturtulur.
  if (name === 'karatahta') {
    boardBox.style.setProperty('background-size', '100% 100%', 'important');
    boardBox.style.setProperty('background-position', 'center', 'important');
  } else {
    boardBox.style.setProperty('background-size', 'cover', 'important');
    boardBox.style.setProperty('background-position', 'center bottom', 'important');
  }
  boardBox.style.setProperty('background-repeat', 'no-repeat', 'important');
  boardBox.style.setProperty('background-color', '#ffffff', 'important');
  paintWhiteboardCanvases(boardBox, true);
}

// Apply whiteboard theme helper — kara tahta çerçeveyle tam sığar,
// sahil oran korunarak kum altta kalacak şekilde oturur;
// varsayılan tema saf beyazdır.
function applyWhiteboardTheme(boardBox, theme) {
  if (!boardBox) return;
  const name = WHITEBOARD_THEMES[theme] ? theme : 'default';
  boardBox.dataset.wbTheme = name;
  const candidates = WHITEBOARD_THEMES[name];
  if (candidates) {
    // Görsel yüklenince uygula; hiçbir aday açılmazsa beyaza geri dön.
    boardBox.dataset.wbThemeToken = String(Date.now());
    const token = boardBox.dataset.wbThemeToken;
    resolveImage(candidates, (url) => {
      if (!url || boardBox.dataset.wbThemeToken !== token || boardBox.dataset.wbTheme !== name) return;
      applyWhiteboardThemeImage(boardBox, name, url);
    });
    // Yükleme bitene kadar şeffaf katmanlarla bekle
    paintWhiteboardCanvases(boardBox, true);
  } else {
    boardBox.style.setProperty('background-image', 'none', 'important');
    boardBox.style.setProperty('background-color', '#ffffff', 'important');
    boardBox.style.setProperty('background-size', '', 'important');
    boardBox.style.setProperty('background-position', '', 'important');
    boardBox.style.setProperty('background-repeat', '', 'important');
    paintWhiteboardCanvases(boardBox, false);
  }
  const title = boardBox.querySelector('.wb-title');
  // Araç çubuğu stilleri CSS'teki [data-wb-theme] kurallarıyla yönetilir;
  // burada yalnızca başlık rengi ve kalem rengi ayarlanır.
  if (name === 'karatahta') {
    if (title) {
      title.textContent = '🏫 Kara Tahta';
      title.style.setProperty('color', '#e7e5e4', 'important');
    }
    // Koyu zeminde görünmesi için kalemi beyaza al
    const whiteRadio = boardBox.querySelector('.wb-color input[value="#ffffff"]');
    if (whiteRadio && !whiteRadio.checked) whiteRadio.click();
  } else if (name === 'sahil') {
    if (title) {
      title.textContent = '🏖️ Sahil Tahtası';
      title.style.setProperty('color', '#78350f', 'important');
    }
    const darkRadio = boardBox.querySelector('.wb-color input[value="#1e293b"]');
    if (darkRadio && !darkRadio.checked) darkRadio.click();
  } else {
    if (title) {
      title.textContent = '🤍 Beyaz Tahta';
      title.style.removeProperty('color');
    }
    const darkRadio = boardBox.querySelector('.wb-color input[value="#1e293b"]');
    if (darkRadio && !darkRadio.checked) darkRadio.click();
  }
  updateWhiteboardThemeLocks(boardBox);
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
  const log = getFocusLog();
  const byDay = {};
  log.forEach((entry) => {
    if (!entry || !entry.t) return;
    const key = focusDayKey(entry.t);
    if (!byDay[key]) byDay[key] = { minutes: 0, sessions: 0 };
    byDay[key].minutes += Number(entry.minutes) || 0;
    byDay[key].sessions += 1;
  });
  const dayKeys = Object.keys(byDay).sort();
  const hourOf = (entry) => new Date(entry.t).getHours();
  const longestStreak = (() => {
    let best = 0;
    let run = 0;
    let prev = null;
    dayKeys.forEach((key) => {
      const current = new Date(`${key}T12:00:00`).getTime();
      run = prev !== null && current - prev === 86400000 ? run + 1 : 1;
      prev = current;
      best = Math.max(best, run);
    });
    return best;
  })();
  const last7 = [];
  for (let back = 0; back < 7; back += 1) {
    last7.push(focusDayKey(Date.now() - back * 86400000));
  }
  const weekStart = getWeekStart();
  const lastWeekMinutes = log
    .filter((entry) => entry && entry.t < weekStart && entry.t >= weekStart - 7 * 86400000)
    .reduce((sum, entry) => sum + (Number(entry.minutes) || 0), 0);
  const thisWeekMinutes = getWeeklyFocusMinutes().reduce((sum, value) => sum + value, 0);
  const thresholds = {
    1: sessions >= 1, 2: sessions >= 5, 3: sessions >= 25, 4: sessions >= 100,
    5: log.some((entry) => (Number(entry.minutes) || 0) >= 50),
    6: log.some((entry) => (Number(entry.minutes) || 0) >= 90),
    7: log.some((entry) => { const h = hourOf(entry); return h >= 5 && h < 8; }),
    8: log.some((entry) => { const h = hourOf(entry); return h >= 0 && h < 4; }),
    9: longestStreak >= 3,
    10: last7.every((key) => (byDay[key] ? byDay[key].sessions : 0) >= 2),
    11: dayKeys.some((key) => byDay[key].sessions >= 5),
    12: focusMinutes >= 500, 13: focusMinutes >= 2000,
    17: dayKeys.some((key) => byDay[key].minutes >= 300),
    18: AppState.selectedAvatar === '👨‍🎓' && sessions >= 10,
    19: AppState.selectedAvatar === '👩‍🎓' && sessions >= 10,
    24: lastWeekMinutes > 0 && thisWeekMinutes >= lastWeekMinutes * 1.2,
    26: history.length >= 1, 27: history.some((entry) => entry.total > 0 && entry.correct === entry.total),
    41: accuracy >= 85, 43: history.length >= 50,
    51: tasks.length >= 1, 53: tasks.length >= 10, 54: owned.length >= 1,
    55: AppState.xp >= 500, 56: AppState.xp >= 2000,
  };
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
  const values = getWeeklyFocusMinutes();
  const max = Math.max(...values, 1);
  chart.innerHTML = values.map((value, index) => `<div class="profile-chart-column"><span class="profile-chart-value">${value} dk</span><div class="profile-chart-track"><i style="height:${Math.max(7, Math.round((value / max) * 100))}%"></i></div><strong>${WEEKDAYS[index].slice(0, 3)}</strong></div>`).join('');
}

// ===== Metacognitive Learning Radar =====
const CONFIDENCE_WEIGHTS = { low: 1, medium: 2, high: 3 };
const SUBJECT_CATEGORIES = {
  Matematik: 'Sayısal',
  Geometri: 'Sayısal',
  Fizik: 'Fen Bilimleri',
  Kimya: 'Fen Bilimleri',
  Biyoloji: 'Fen Bilimleri',
  Türkçe: 'Sözel',
  Edebiyat: 'Sözel',
  Tarih: 'Sosyal Bilimler',
  Coğrafya: 'Sosyal Bilimler',
  Felsefe: 'Sosyal Bilimler',
  'Din Kültürü': 'Sosyal Bilimler',
};

function getMetacognitionRecords() {
  return readStorage(STORAGE_KEYS.metacognition, []);
}

function getCategoryRecords(records) {
  return records.reduce((acc, record) => {
    const category = SUBJECT_CATEGORIES[record.subject] || 'Genel';
    if (!acc[category]) acc[category] = [];
    acc[category].push(record);
    return acc;
  }, {});
}

function computeCalibrationScore(records) {
  if (!records || records.length === 0) return 50;
  const raw = records.reduce((sum, r) => {
    const w = CONFIDENCE_WEIGHTS[r.confidence] || 2;
    return sum + (r.isCorrect ? w : -w);
  }, 0) / records.length;
  return Math.min(100, Math.max(0, Math.round(50 + raw * 15)));
}

function computeMetacognitionScores(records) {
  const recent = records.slice(-30);
  const byCategory = getCategoryRecords(recent);
  const scores = {};
  Object.keys(byCategory).forEach((category) => {
    scores[category] = computeCalibrationScore(byCategory[category]);
  });
  scores['Genel Kalibrasyon'] = computeCalibrationScore(recent);
  return scores;
}

function getIllusionTopics() {
  const records = getMetacognitionRecords();
  const byTopic = {};
  records.forEach((r) => {
    if (!byTopic[r.topicId]) byTopic[r.topicId] = { records: [], subject: r.subject };
    byTopic[r.topicId].records.push(r);
  });

  const topics = getAllTopics();
  const illusions = [];
  Object.entries(byTopic).forEach(([topicId, data]) => {
    const recs = data.records;
    if (recs.length < 2) return;
    const correct = recs.filter((r) => r.isCorrect).length;
    const accuracy = correct / recs.length;
    const avgConfidence = recs.reduce((sum, r) => sum + (CONFIDENCE_WEIGHTS[r.confidence] || 2), 0) / recs.length;
    const highConfidenceWrong = recs.some((r) => !r.isCorrect && r.confidence === 'high');
    if (accuracy < 0.5 && avgConfidence >= 2.4 && highConfidenceWrong) {
      const topic = topics.find((t) => t.id === topicId);
      illusions.push({
        topicId,
        name: topic?.name || topicId,
        subject: topic?.subject || data.subject,
        accuracy,
        avgConfidence,
      });
    }
  });

  illusions.sort((a, b) => b.avgConfidence - a.accuracy - (a.avgConfidence - a.accuracy));
  return illusions.slice(0, 5);
}

// ===== Öğrenme Bilimi #1: kalibrasyon eğrisi + hatırlama olasılığı =====
const CONFIDENCE_EXPECTED = { low: 30, medium: 60, high: 85 };
const CONFIDENCE_TR = { low: 'Düşük güven', medium: 'Orta güven', high: 'Yüksek güven' };

function computeCalibration() {
  const records = getMetacognitionRecords().slice(-100);
  const levels = ['low', 'medium', 'high'].map((level) => {
    const rs = records.filter((r) => r.confidence === level);
    const n = rs.length;
    const actual = n ? Math.round((rs.filter((r) => r.isCorrect).length / n) * 100) : null;
    return { level, n, actual, expected: CONFIDENCE_EXPECTED[level] };
  });
  const total = levels.reduce((sum, l) => sum + l.n, 0);
  return { levels, total };
}

function calibrationVerdict(actual, expected) {
  if (actual === null) return null;
  const d = actual - expected;
  if (d <= -15) return { text: 'Aşırı güvenli', cls: 'bad' };
  if (d < -5) return { text: 'Biraz iyimser', cls: 'warn' };
  if (d <= 10) return { text: 'Dengeli', cls: 'good' };
  return { text: 'Çekingen', cls: 'warn' };
}

// SM-2 durumundan bugünkü hatırlama olasılığı (0-100).
// Kolaylık normalize edilir, vade gecikmesine üstel unutma uygulanır.
function recallProbability(review) {
  if (!review || !(review.repetitions > 0)) return null;
  const ease = Math.min(2.5, Math.max(1.3, Number(review.easinessFactor) || 2.5));
  const easeNorm = (ease - 1.3) / 1.2;
  const interval = Math.max(1, Number(review.intervalDays) || 1);
  const due = review.dueDate ? new Date(review.dueDate).getTime() : Date.now();
  const overdueDays = Math.max(0, (Date.now() - due) / 86400000);
  const p = (0.35 + 0.6 * easeNorm) * Math.exp(-overdueDays / interval);
  return Math.min(99, Math.max(5, Math.round(p * 100)));
}

function getRecallRanking(limit = 5) {
  const reviews = readStorage(STORAGE_KEYS.reviews, {});
  const topics = getAllTopics();
  return Object.entries(reviews)
    .map(([topicId, review]) => {
      const p = recallProbability(review);
      if (p === null) return null;
      const topic = topics.find((t) => t.id === topicId);
      return {
        topicId,
        name: topic?.name || topicId,
        subject: topic?.subject || 'Genel',
        p,
        dueDate: review.dueDate,
        reps: review.repetitions || 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.p - b.p)
    .slice(0, limit);
}

function dueLabel(iso) {
  if (!iso) return 'vade yok';
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return 'bugün/yakında';
  return `${days} gün gecikmiş`;
}

function renderLearningScience() {
  const calEl = $('dashCalibration');
  if (calEl) {
    const { levels, total } = computeCalibration();
    if (total < 3) {
      calEl.innerHTML = '<p class="science-empty">Henüz yeterli güven verisi yok — 3+ soruda güvenini işaretle, kalibrasyon eğrin burada belirsin.</p>';
    } else {
      calEl.innerHTML = levels.map((l) => {
        const v = calibrationVerdict(l.actual, l.expected);
        const bar = l.actual === null
          ? '<span class="science-na">bu düzeyde veri yok</span>'
          : `<div class="calib-bars">
               <div class="calib-row"><span>Beklenen</span><div class="calib-track"><i style="width:${l.expected}%"></i></div><b>%${l.expected}</b></div>
               <div class="calib-row real"><span>Gerçek</span><div class="calib-track"><i style="width:${l.actual}%"></i></div><b>%${l.actual}</b></div>
             </div>
             <span class="calib-verdict ${v.cls}">${v.text}</span>`;
        return `<div class="calib-level"><div class="calib-head"><strong>${CONFIDENCE_TR[l.level]}</strong><span>${l.n} soru</span></div>${bar}</div>`;
      }).join('');
    }
  }
  const recEl = $('dashRecall');
  if (recEl) {
    const rows = getRecallRanking(5);
    if (!rows.length) {
      recEl.innerHTML = '<p class="science-empty">Tekrar verisi oluşunca bugünkü hatırlama olasılıkların burada sıralanacak. Bir quiz bitirmen yeterli.</p>';
    } else {
      recEl.innerHTML = rows.map((r) => `
        <button type="button" class="recall-row" data-topic="${r.topicId}" title="Tekrar quizini başlat">
          <span class="recall-info"><strong>${r.name}</strong><small>${r.subject} • ${dueLabel(r.dueDate)} • ${r.reps} tekrar</small></span>
          <span class="recall-track"><i style="width:${r.p}%"></i></span>
          <b class="recall-pct ${r.p < 40 ? 'bad' : r.p < 70 ? 'warn' : 'good'}">%${r.p}</b>
        </button>`).join('');
      recEl.querySelectorAll('.recall-row').forEach((btn) => {
        btn.onclick = () => {
          showPage('quiz');
          startQuiz(btn.dataset.topic);
        };
      });
    }
  }
}

let metacognitionChart = null;

function renderMetacognitionRadar() {
  const canvas = $('metacognitionRadarChart');
  if (!canvas) return;
  if (!ChartJS) {
    const wrap = canvas.closest('.profile-radar-wrap');
    if (wrap) wrap.innerHTML = '<p style="color:var(--text-light);font-size:13px;">Grafik kütüphanesi yüklenemedi.</p>';
    return;
  }
  const records = getMetacognitionRecords();
  const scores = computeMetacognitionScores(records);
  const labels = ['Sayısal', 'Fen Bilimleri', 'Sözel', 'Sosyal Bilimler', 'Genel Kalibrasyon'];
  const data = labels.map((label) => scores[label] ?? 50);

  if (metacognitionChart && typeof metacognitionChart.destroy === 'function') metacognitionChart.destroy();
  metacognitionChart = new ChartJS(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Bilişsel Güven',
        data,
        backgroundColor: 'rgba(37, 99, 235, 0.18)',
        borderColor: '#2563eb',
        pointBackgroundColor: '#0ea5e9',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#2563eb',
        borderWidth: 2,
        pointRadius: 4,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(125, 177, 202, .25)' },
          grid: { color: 'rgba(125, 177, 202, .2)' },
          pointLabels: { color: '#31536b', font: { size: 11, weight: '700' } },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: { display: false, stepSize: 25 },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(49, 83, 107, .92)',
          titleColor: '#e0f2fe',
          bodyColor: '#fff',
          callbacks: { label: (item) => `${item.label}: ${item.raw}` },
        },
      },
    },
  });
}

function renderIllusionOfKnowledge() {
  const countEl = $('illusionKnowledgeCount');
  const listEl = $('illusionTopicList');
  if (!countEl || !listEl) return;
  const illusions = getIllusionTopics();
  countEl.textContent = illusions.length;
  if (illusions.length === 0) {
    listEl.innerHTML = '<div class="illusion-topic-item">Harika! Yanılsama bölgeniz boş 🎉</div>';
    return;
  }
  listEl.innerHTML = illusions.map((t) => `
    <div class="illusion-topic-item">
      <span>⚠️</span>
      <span>${t.subject} • ${t.name}</span>
    </div>
  `).join('');
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
  renderMetacognitionRadar();
  renderIllusionOfKnowledge();
  renderProfileBadges();
}

// ===== Settings Page =====
function applySettingsTheme(mode) {
  const isDark = mode === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  writeStorage(STORAGE_KEYS.theme, isDark ? 'dark' : 'light');
  const themeToggle = $('themeToggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
  }
  renderSettingsPage();
}

function renderSettingsPage() {
  // Tema
  const isDark = document.body.classList.contains('dark-mode');
  const lightBtn = $('settingsThemeLight');
  const darkBtn = $('settingsThemeDark');
  if (lightBtn && darkBtn) {
    lightBtn.classList.toggle('active', !isDark);
    darkBtn.classList.toggle('active', isDark);
    lightBtn.onclick = () => applySettingsTheme('light');
    darkBtn.onclick = () => applySettingsTheme('dark');
  }

  // Gece Akvaryum (mağazadan satın alınabilir ödül teması)
  const rewardState = getRewardState();
  const nightOwned = Boolean(rewardState.nightTheme);
  const nightActive = document.body.classList.contains('night-aquarium-theme');
  const nightRow = $('settingsNightRow');
  if (nightRow) nightRow.classList.toggle('owned', nightOwned);
  const nightDesc = $('settingsNightDesc');
  if (nightDesc) {
    nightDesc.textContent = nightOwned
      ? (nightActive ? 'Gece Akvaryum teması şu an açık.' : 'Gece Akvaryum teması şu an kapalı.')
      : 'Derin deniz gece modunu mağazadan satın alabilirsin.';
  }
  const nightBtn = $('settingsNightBtn');
  if (nightBtn) {
    nightBtn.textContent = nightOwned ? (nightActive ? 'Kapat' : 'Aç') : '🛒 Mağazaya Git';
    nightBtn.onclick = () => {
      if (!nightOwned) {
        showPage('store');
        return;
      }
      const next = getRewardState();
      next.nightTheme = !document.body.classList.contains('night-aquarium-theme');
      saveRewardState(next);
      renderSettingsPage();
    };
  }

  // Ses efektleri
  const soundToggle = $('settingsSoundToggle');
  if (soundToggle) {
    const soundOn = readStorage(STORAGE_KEYS.soundEnabled, true);
    soundToggle.checked = soundOn;
    const soundDesc = $('settingsSoundDesc');
    if (soundDesc) {
      soundDesc.textContent = soundOn
        ? 'Tıklama, doğru/yanlış ve zamanlayıcı sesleri açık.'
        : 'Ses efektleri kapalı. Uygulama sessiz çalışır.';
    }
    soundToggle.onchange = () => {
      writeStorage(STORAGE_KEYS.soundEnabled, soundToggle.checked);
      const desc = $('settingsSoundDesc');
      if (desc) {
        desc.textContent = soundToggle.checked
          ? 'Tıklama, doğru/yanlış ve zamanlayıcı sesleri açık.'
          : 'Ses efektleri kapalı. Uygulama sessiz çalışır.';
      }
      if (soundToggle.checked) playAppSound('click');
    };
  }

  // Hesap
  const settingsAvatar = $('settingsAvatar');
  const settingsName = $('settingsName');
  const settingsEmail = $('settingsEmail');
  if (settingsAvatar) settingsAvatar.textContent = AppState.selectedAvatar;
  if (settingsName) settingsName.textContent = AppState.currentUser;
  if (settingsEmail) settingsEmail.textContent = AppState.currentUserEmail || 'hesap@yolharitasi.com';
  const profileBtn = $('settingsProfileBtn');
  if (profileBtn) profileBtn.onclick = () => showPage('profile');

  // İlerlemeyi sıfırla (iki adımlı onay)
  const resetBtn = $('settingsResetBtn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (!resetBtn.dataset.armed) {
        resetBtn.dataset.armed = '1';
        resetBtn.textContent = 'Emin misin? Tekrar bas';
        setTimeout(() => {
          if (resetBtn.dataset.armed) {
            delete resetBtn.dataset.armed;
            resetBtn.textContent = 'Sıfırla';
          }
        }, 4000);
        return;
      }
      const keep = new Set([
        STORAGE_KEYS.currentUser,
        STORAGE_KEYS.displayName,
        STORAGE_KEYS.avatar,
        STORAGE_KEYS.theme,
        STORAGE_KEYS.soundEnabled,
      ]);
      const removable = [];
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('archie.') && !keep.has(key)) removable.push(key);
      }
      removable.forEach((key) => localStorage.removeItem(key));
      window.location.reload();
    };
  }
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
  { id: 'sahil-temasi', icon: '🏖️', name: 'Gerçekçi Sahil Teması', desc: 'Çizim tahtasının arka planını gerçekçi bir sahil manzarasıyla değiştirir.', price: 10 },
  { id: 'kara-tahta', icon: '🏫', name: 'Klasik Okul Kara Tahtası', desc: 'Çizim tahtasının arka planını klasik okul kara tahtası dokusuyla değiştirir.', price: 10 },
];

// ===== #3 Cognitive Load Adaptive Scheduler =====
// Oturum yorgunluğuna göre SM-2 aralıklarını ve timer sürelerini dinamik ayarla
function adaptiveInterval(baseIntervalDays, sessionFatigueFactor) {
  // Yorgunluk faktörü: uzun oturum (>60 dk) = 1.2, kısa (<20) = 0.85
  return Math.round(baseIntervalDays * sessionFatigueFactor);
}

function getSessionFatigueFactor() {
  const focusMins = timerFocusMinutes || 0;
  if (focusMins > 90) return 1.25; // yüksek yorgunluk → daha uzun aralık
  if (focusMins > 45) return 1.1;
  if (focusMins < 20) return 0.85;  // dinç → daha kısa aralık
  return 1.0;
}

function applyAdaptiveSM2(topicId, baseQuality) {
  const factor = getSessionFatigueFactor();
  const adjustedInterval = adaptiveInterval(Math.round(Math.pow(1.5, baseQuality) * 2), factor);
  return { intervalDays: adjustedInterval, fatigueFactor: factor };
}

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
  if (!itemsEl) {
    console.warn('[store] #storeItems bulunamadı, render atlandı.');
    return;
  }
  // Sandık/video yolundaki bir arıza ürün listesini öldürmesin:
  // önce sandıkları korumalı blokta dene, ürünler her durumda çizilsin.
  try {
    renderStoreChests();
  } catch (err) {
    console.warn('[store] sandık render hatası, ürünlerle devam:', err?.message || err);
  }

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
         
         // Handle whiteboard theme purchases
         if (itemId === 'sahil-temasi') {
           localStorage.setItem('unlocked_sahil', 'true');
         } else if (itemId === 'kara-tahta') {
           localStorage.setItem('unlocked_karatahta', 'true');
         }
         
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

// ===== Sandıklar: inci ile alınır, video + popup ile açılır =====
// Tek Balık Sandığı: şans tablosuna göre çıkar — sıradan en sık (55%),
// nadir (27%), destansı (13%) ve efsanevi en ender (5%). Balık, nadirlik
// klasörlerinden (balik/common, balik/rare, balik/epic, balik/legendary)
// seçilir.
const CHEST_DEFS = [
  { id: 'mercan-sandigi', icon: '🧰', name: 'Mercan Sandığı', desc: 'İçinden rastgele bir mercan çıkar. Akvaryumuna eklenir.', price: 1, kind: 'coral' },
  { id: 'balik-sandigi', icon: '🎁', name: 'Balık Sandığı', desc: 'İçinden rastgele bir balık çıkar: sıradan en sık, efsanevi en ender. Akvaryumuna eklenir.', price: 1, kind: 'fish' },
];
const CHEST_NAMES = {
  fish: {
    common: ['Pırpır', 'Cam Göz', 'Minik Yüzgeç', 'Fokur'],
    rare: ['Turkuaz Ok', 'Mercan Rüyası', 'Sis Yüzgeci'],
    epic: ['Fırtına Kuyruk', 'Derin Alev', 'Girdap Dansçısı'],
    legendary: ["Poseidon'un Gözdesi", 'Okyanus Kralı', 'Efsane Balina'],
  },
  coral: {
    common: ['Kum Çiçeği', 'Yumuşak Dal', 'Sahil Püskülü'],
    rare: ['Zümrüt Dal', 'Ayışığı Mercanı'],
    epic: ['Lav Tacı', 'Fırtına Resifi'],
    legendary: ['Altın Resif', 'Ebedi Mercan'],
  },
};
const CHEST_RANK_TR = { common: 'Sıradan', rare: 'Nadir', epic: 'Destansı', legendary: 'Efsanevi' };

function rollChestReward(chest) {
  const pool = chest.kind === 'fish' ? AQUARIUM_FISH : AQUARIUM_CORALS;
  // Sandığın kategorisi varsa (balık sandıkları) ödül KESİN o nadirlikte
  // çıkar; mercy sandığında şans tablosu uygulanır.
  const tier = chest.rarity || (() => {
    const r = Math.random();
    return r < 0.55 ? 'common' : r < 0.82 ? 'rare' : r < 0.95 ? 'epic' : 'legendary';
  })();
  const tierPool = pool.filter((entry) => entry.rarity === tier);
  const entry = tierPool[Math.floor(Math.random() * tierPool.length)] || pool[0];
  const names = (CHEST_NAMES[chest.kind] && CHEST_NAMES[chest.kind][entry.rarity]) || ['Gizemli Canlı'];
  const name = names[Math.floor(Math.random() * names.length)];
  return { kind: chest.kind, entry, name, rarity: entry.rarity };
}

function addChestRewardToAquarium(reward) {
  const aq = getAquarium();
  if (reward.kind === 'fish') {
    const f = makeFish(aq.fish.length);
    f.kind = reward.entry;
    f.name = reward.name;
    aq.fish.push(f);
  } else {
    const c = makeCoral(aq.corals.length);
    c.kind = reward.entry;
    c.name = reward.name;
    aq.corals.push(c);
  }
  saveAquarium(aq);
  renderAquarium();
}

function ensureChestOverlay() {
  let overlay = document.querySelector('.chest-overlay');
  if (overlay) return overlay;
  overlay = document.createElement('div');
  overlay.className = 'chest-overlay';
  overlay.innerHTML = `
    <div class="chest-video-panel" hidden>
      <video class="chest-video" playsinline preload="auto"></video>
      <button type="button" class="chest-skip">Geç →</button>
    </div>
    <div class="chest-result-panel" hidden>
      <img class="chest-result-img" alt="Sandık ödülü" />
      <strong class="chest-result-name"></strong>
      <span class="chest-result-rank"></span>
      <small class="chest-result-note">Akvaryumuna eklendi!</small>
      <button type="button" class="chest-close">Kapat</button>
    </div>`;
  document.body.appendChild(overlay);
  return overlay;
}

function playChestVideo(chest) {
  const overlay = ensureChestOverlay();
  const panel = overlay.querySelector('.chest-video-panel');
  const result = overlay.querySelector('.chest-result-panel');
  const video = overlay.querySelector('.chest-video');
  result.hidden = true;
  panel.hidden = false;
  let opened = false;
  const openOnce = () => {
    if (opened) return;
    opened = true;
    openChest(chest);
  };
  video.onended = openOnce;
  overlay.querySelector('.chest-skip').onclick = () => {
    try { video.pause(); } catch { /* yok say */ }
    openOnce();
  };
  video.playbackRate = 1.4;
  playVideoWithFallback(video, CHEST_VIDEO_ASSET, openOnce);
}

function openChest(chest) {
  const overlay = ensureChestOverlay();
  overlay.querySelector('.chest-video-panel').hidden = true;
  const reward = rollChestReward(chest);
  addChestRewardToAquarium(reward);
  const result = overlay.querySelector('.chest-result-panel');
  const resultImg = result.querySelector('.chest-result-img');
  resultImg.removeAttribute('src');
  resolveStoredAsset(reward.entry.src, (url) => { resultImg.src = url; });
  result.querySelector('.chest-result-name').textContent = reward.name;
  const rank = result.querySelector('.chest-result-rank');
  rank.textContent = CHEST_RANK_TR[reward.rarity] || reward.rarity;
  rank.className = `chest-result-rank rank-${reward.rarity}`;
  result.hidden = false;
  playAppSound('purchase');
  overlay.querySelector('.chest-close').onclick = () => { result.hidden = true; };
  clearTimeout(openChest._hideTimer);
  openChest._hideTimer = setTimeout(() => { result.hidden = true; }, 12000);
}

function renderStoreChests() {
  const chestsEl = $('storeChests');
  if (!chestsEl) return;
  updatePearlDisplay();
  preloadChestVideo();
  chestsEl.innerHTML = CHEST_DEFS.map((chest) => {
    const canAfford = (AppState.pearls || 0) >= chest.price;
    return `
      <div class="store-item chest-item">
        <div class="store-item-icon">${chest.icon}</div>
        <div class="store-item-name">${chest.name}</div>
        <div class="store-item-desc">${chest.desc}</div>
        <div class="store-item-price"><span class="price-amount">${chest.price}</span> 🦪 İnci</div>
        <button class="store-buy-btn ${canAfford ? '' : 'disabled'}" data-chest="${chest.id}" ${canAfford ? '' : 'disabled'}>
          ${canAfford ? 'Sandığı Aç' : 'Yetersiz İnci'}
        </button>
      </div>
    `;
  }).join('');
  chestsEl.querySelectorAll('.store-buy-btn:not(.disabled)').forEach((btn) => {
    btn.onclick = () => {
      const chest = CHEST_DEFS.find((c) => c.id === btn.dataset.chest);
      if (!chest || (AppState.pearls || 0) < chest.price) return;
      addPearls(-chest.price);
      renderStoreChests();
      playAppSound('purchase');
      playChestVideo(chest);
    };
  });
}

// ===== Aquarium =====
// Sandıklarla kazanılan mercan ve balıklar burada yaşar.
// Oturum sayısından otomatik canlı eklenmez.
const AQUARIUM_BUBBLE_IMG = 'public/images/balon.png';
// Yön dosya adından okunur: "left" veya "right" ile başlayan balıklar
// o yöne bakacak şekilde çizilir. Sahne içinde aynı yönde yüzerler.
// Nadirlik, dosyanın içinde bulunduğu klasörden gelir:
// balik/common → common, balik/rare → rare, balik/epic → epic,
// balik/legendary → legendary.
const AQUARIUM_FISH = [
  // common/
  { name: 'left-common-1',  src: 'public/images/balik/common/leftbalik.png',    rarity: 'common',    dir: 'left' },
  { name: 'left-common-2',  src: 'public/images/balik/common/leftbalık4.png',   rarity: 'common',    dir: 'left' },
  { name: 'left-common-3',  src: 'public/images/balik/common/leftbalık5.png',   rarity: 'common',    dir: 'left' },
  { name: 'right-common-1', src: 'public/images/balik/common/rightbalik2.png',  rarity: 'common',    dir: 'right' },
  { name: 'right-common-2', src: 'public/images/balik/common/rightbalık3.png',  rarity: 'common',    dir: 'right' },
  // rare/
  { name: 'left-rare-1',    src: 'public/images/balik/rare/leftrarebalık3.png', rarity: 'rare',      dir: 'left' },
  { name: 'left-rare-2',    src: 'public/images/balik/rare/leftrarebalık4.png', rarity: 'rare',      dir: 'left' },
  { name: 'left-rare-3',    src: 'public/images/balik/rare/leftrarebalık5.png', rarity: 'rare',      dir: 'left' },
  { name: 'left-rare-4',    src: 'public/images/balik/rare/leftrarebalık.png',  rarity: 'rare',      dir: 'left' },
  { name: 'right-rare-1',   src: 'public/images/balik/rare/rightrarefish.png',  rarity: 'rare',      dir: 'right' },
  { name: 'right-rare-2',   src: 'public/images/balik/rare/rightrarefish2.png', rarity: 'rare',      dir: 'right' },
  // epic/
  { name: 'left-epic-1',    src: 'public/images/balik/epic/leftepicbalık.png',  rarity: 'epic',      dir: 'left' },
  { name: 'right-epic-2',   src: 'public/images/balik/epic/rightepicbalık2.png', rarity: 'epic',     dir: 'right' },
  { name: 'right-epic-1',   src: 'public/images/balik/epic/rightepicfish.png',  rarity: 'epic',      dir: 'right' },
  { name: 'left-epic-3',    src: 'public/images/balik/epic/epicdenizanası.png', rarity: 'epic',      dir: 'left' },
  // legendary/
  { name: 'left-legendary-1', src: 'public/images/balik/legendary/leftlegendaryfish.png', rarity: 'legendary', dir: 'left' },
  { name: 'left-legendary-2', src: 'public/images/balik/legendary/legendaryfish2.png', rarity: 'legendary', dir: 'left' },
];
const AQUARIUM_CORALS = [
  { name: 'common',    src: 'public/images/mercanlar/mercan.png',         rarity: 'common' },
  { name: 'common2',   src: 'public/images/mercanlar/mercan2.png',        rarity: 'common' },
  { name: 'common3',   src: 'public/images/mercanlar/mercan3.png',        rarity: 'common' },
  { name: 'common4',   src: 'public/images/mercanlar/mercan4.png',        rarity: 'common' },
  { name: 'rare',      src: 'public/images/mercanlar/raremercan.png',     rarity: 'rare' },
  { name: 'rare2',     src: 'public/images/mercanlar/raremercan2.png',    rarity: 'rare' },
  { name: 'epic',      src: 'public/images/mercanlar/epicmercan.png',     rarity: 'epic' },
  { name: 'legendary', src: 'public/images/mercanlar/legendarymercan.png',rarity: 'legendary' },
  { name: 'legendary2',src: 'public/images/mercanlar/legendarymercan2.png',rarity:'legendary' },
];
const AQUARIUM_RARITY_ORDER = { common: 0, rare: 1, epic: 2, legendary: 3 };

// Kullanıcı balık dosyalarını klasörleyip silebildiği için kayıtlı
// akvaryumdaki balıkların kaynakları güncel havuzla eşleştirilir:
// hangi klasörün (rarity) hangi dosya adının (dir) yoksa, aynı
// nadirlik + yöndeki güncel bir balıkla değiştirilir — x/y/boyut korunur.
function migrateAquariumKinds(aq) {
  if (!aq || !Array.isArray(aq.fish)) return false;
  let changed = false;
  const rarityList = ['common', 'rare', 'epic', 'legendary'];
  aq.fish.forEach((f, i) => {
    const k = f.kind;
    if (!k || !k.src) return;
    if (AQUARIUM_FISH.some((e) => e.src === k.src)) return;
    const rarity = rarityList.includes(k.rarity) ? k.rarity : 'common';
    const dir = k.dir === 'left' ? 'left' : 'right';
    const pool = AQUARIUM_FISH.filter((e) => e.rarity === rarity && e.dir === dir);
    if (pool.length) {
      f.kind = pool[i % pool.length];
      changed = true;
    }
  });
  return changed;
}

function getAquarium() {
  const data = readStorage(STORAGE_KEYS.aquarium, null);
  if (data && Array.isArray(data.corals) && Array.isArray(data.fish)) {
    migrateAquariumKinds(data);
    return data;
  }
  return { corals: [], fish: [] };
}

function saveAquarium(aq) {
  writeStorage(STORAGE_KEYS.aquarium, aq);
}

// Tek seferlik koleksiyon kurulumu: mevcut balık ve mercanların hepsi
// silinip her türden 1'er adet eklenir. Bayrakla (archie.aq.seed.v2)
// yalnızca bir kez çalışır; sonrasındaki sandık kazanımı serbest.
function seedAquariumCollectionOnce() {
  const SEED_FLAG = 'archie.aq.seed.v2';
  if (readStorage(SEED_FLAG, false)) return;
  const aq = { corals: [], fish: [] };
  AQUARIUM_FISH.forEach((entry, i) => {
    const size = AQUARIUM_RARITY_FISH_BASE[entry.rarity] + ((i * 9) % 24);
    aq.fish.push({
      kind: entry,
      y: 4 + ((i * 13) % 46),
      d: 14 + ((i * 7) % 14),
      delay: -((i * 5) % 20),
      drift: 3 + ((i * 3) % 4),
      rev: entry.dir === 'left',
      size,
    });
  });
  AQUARIUM_CORALS.forEach((entry, i) => {
    const size = AQUARIUM_RARITY_CORAL_BASE[entry.rarity] + ((i * 11) % 22);
    aq.corals.push({ kind: entry, x: 2 + ((i * 41) % 88), s: size });
  });
  saveAquarium(aq);
  writeStorage(SEED_FLAG, true);
}

const AQUARIUM_RARITY_CORAL_BASE = { common: 110, rare: 150, epic: 195, legendary: 240 };
const AQUARIUM_RARITY_FISH_BASE = { common: 100, rare: 130, epic: 160, legendary: 200 };

function makeCoral(i) {
  const tier = pickRarityTier(i, 'coral');
  const pool = AQUARIUM_CORALS.filter((c) => c.rarity === tier);
  const entry = pool[i % pool.length];
  const baseSize = AQUARIUM_RARITY_CORAL_BASE[entry.rarity];
  const growth = ((i * 11) % 22);
  const size = baseSize + growth;
  const x = 2 + ((i * 41) % 88);
  return { kind: entry, x, s: size };
}

function makeFish(i) {
  const tier = pickRarityTier(i, 'fish');
  const pool = AQUARIUM_FISH.filter((f) => f.rarity === tier);
  const entry = pool[i % pool.length];
  const baseSize = AQUARIUM_RARITY_FISH_BASE[entry.rarity];
  const growth = ((i * 9) % 24);
  const size = baseSize + growth;
  // Dosya adındaki yön (dir) bağlayıcıdır: left balıklar sağdan sola,
  // right balıklar soldan sağa yüzer. Görsel zaten o yöne baktığı için
  // ek bir scaleX çevirmesi yapılmaz.
  const rev = entry.dir === 'left';
  // Mercan bölgesine girmemesi için üst su kolonunda yüz: %4–%50 bandı.
  // Mercanlar altta (~%60 altı) kaldığı için içinden/üstünden geçmez.
  return {
    kind: entry,
    y: 4 + ((i * 13) % 46),
    d: 14 + ((i * 7) % 14),
    delay: -((i * 5) % 20),
    drift: 3 + ((i * 3) % 4),
    rev,
    size,
  };
}

function pickRarityTier(i, _kind) {
  const r = Math.random();
  if (i < 3) return 'common';
  if (r < 0.55) return 'common';
  if (r < 0.82) return 'rare';
  if (r < 0.95) return 'epic';
  return 'legendary';
}

// Sandık ekonomisi: oturum sayısından otomatik canlı eklenmez.
// Yalnızca eski kayıtların şemasını onarır ve koleksiyonu döndürür.
function syncAquarium(_sessionCount, _announce = false) {
  const aq = getAquarium();
  ensureAllRaritiesInAquarium(aq);
  return aq;
}

function ensureAquariumBackground(scene) {
  if (!scene || scene.dataset.bgOk === '1') return;
  resolveImage(AQUARIUM_BG_CANDIDATES, (url) => {
    if (!url) {
      scene.dataset.bgOk = '0';
      return;
    }
    scene.style.backgroundImage = `url("${encodeURI(url)}")`;
    scene.style.backgroundSize = 'cover';
    scene.style.backgroundPosition = 'center bottom';
    scene.style.backgroundRepeat = 'no-repeat';
    scene.dataset.bgOk = '1';
  });
}

function ensureAllRaritiesInAquarium(aq) {
  if (!aq) return;
  // Eski veri şemasındaki küçük boyutları yeni şemaya taşı
  aq.corals.forEach((c) => {
    if (typeof c.s !== 'number' || c.s < AQUARIUM_RARITY_CORAL_BASE[c.kind?.rarity || 'common']) {
      const base = AQUARIUM_RARITY_CORAL_BASE[c.kind.rarity];
      c.s = base + Math.floor(Math.random() * 22);
    }
    if (typeof c.x !== 'number') c.x = 3 + Math.random() * 90;
  });
  aq.fish.forEach((f) => {
    if (typeof f.size !== 'number' || f.size < AQUARIUM_RARITY_FISH_BASE[f.kind?.rarity || 'common']) {
      const base = AQUARIUM_RARITY_FISH_BASE[f.kind.rarity];
      f.size = base + Math.floor(Math.random() * 24);
    }
    // Eski kayıtlardaki rastgele rev değerini dosya adındaki yöne göre onar.
    // Balık mercanların üstünden geçmesin diye yüzme bandını da daralt.
    if (f.kind && typeof f.kind.dir === 'string') {
      f.rev = f.kind.dir === 'left';
    } else if (typeof f.rev !== 'boolean') {
      f.rev = Math.random() > 0.5;
    }
    if (typeof f.y !== 'number' || f.y < 3 || f.y > 52) {
      f.y = 4 + Math.floor(Math.random() * 46);
    }
    if (typeof f.drift !== 'number') f.drift = 3 + Math.floor(Math.random() * 4);
  });
}

function rarityLabelTr(r) {
  return { common: 'sıradan', rare: 'nadir', epic: 'epik', legendary: 'efsanevi' }[r] || r;
}

function renderAquarium() {
  const scene = $('aquariumScene');
  if (!scene) return;
  const saved = readStorage(STORAGE_KEYS.timerPomodoro, null);
  const sessions = saved && typeof saved.sessionCount === 'number' ? saved.sessionCount : 0;
  const aq = syncAquarium(sessions, false);

  if ($('aquariumCoralCount')) $('aquariumCoralCount').textContent = aq.corals.length;
  if ($('aquariumFishCount')) $('aquariumFishCount').textContent = aq.fish.length;
  if ($('aquariumSessionCount')) $('aquariumSessionCount').textContent = sessions;

  ensureAquariumBackground(scene);

  const assetSrcs = new Set([AQUARIUM_BUBBLE_IMG]);
  aq.corals.forEach((c) => { if (c.kind && c.kind.src) assetSrcs.add(c.kind.src); });
  aq.fish.forEach((f) => { if (f.kind && f.kind.src) assetSrcs.add(f.kind.src); });
  const unresolved = Array.from(assetSrcs).filter((src) => !publicAssetCache.has(src));
  if (unresolved.length) {
    let remaining = unresolved.length;
    unresolved.forEach((src) => {
      resolveStoredAsset(src, () => {
        remaining -= 1;
        if (remaining === 0 && AppState.activePage === 'aquarium') renderAquarium();
      });
    });
  }

  let html = '';
  for (let b = 0; b < 24; b += 1) {
    const left = (b * 37 + 11) % 98;
    const size = 28 + ((b * 7) % 22);
    const dur = 6 + ((b * 3) % 7);
    const delay = -((b * 2.3) % 9);
    // labon/balon görseli: en arka katmanda kabarcık efekti (z-index:0).
    html += `<span class="aq-bubble" aria-hidden="true" style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;background-image:url('${encodeURI(resolvedAssetUrl(AQUARIUM_BUBBLE_IMG))}')"></span>`;
  }
  aq.corals.forEach((c) => {
    const rarityClass = `aq-rarity-${c.kind.rarity}`;
    html += `<span class="aq-coral ${rarityClass}" style="left:${c.x}%;width:${c.s}px;height:${c.s}px;background-image:url('${encodeURI(resolvedAssetUrl(c.kind.src))}')"></span>`;
  });
  aq.fish.forEach((f, idx) => {
    const rarityClass = `aq-rarity-${f.kind.rarity}`;
    const dir = (f.kind && f.kind.dir === 'left') || f.rev ? 'left' : 'right';
    const swimClass = dir === 'left' ? 'swim-left rev' : 'swim-right';
    const skin = /denizanası/.test(f.kind.src || '') ? 'jelly' : 'fish';
    const startX = 5 + ((idx * 29) % 88);
    // js-swim: yatay hareket requestAnimationFrame motorundan gelir (durma,
    // dönme, zikzak davranışları için). CSS'teki swim-* sınıfları yedek kalır.
    html += `<div class="aq-fish ${rarityClass} ${swimClass} js-swim" data-dir="${dir}" data-skin="${skin}" data-idx="${idx}" style="left:${startX}%;top:${f.y}%;width:${f.size}px;height:${f.size}px"><span style="background-image:url('${encodeURI(resolvedAssetUrl(f.kind.src))}');animation-duration:${(1.2 + (idx % 5) * 0.28).toFixed(2)}s"></span></div>`;
  });
  if (aq.fish.length === 0 && aq.corals.length === 0) {
    html += '<div class="aq-empty">Henüz canlın yok — odak oturumlarını tamamla, akvaryumun dolsun!</div>';
  }
  scene.innerHTML = html;
  renderAquariumCollection(aq);
  startAquariumSwimEngine(scene);
  if (!scene.dataset.clickBound) {
    scene.dataset.clickBound = '1';
    scene.addEventListener('click', (e) => {
      const rect = scene.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Tıklanan noktadan anında yukarı süzülen 12 baloncuk.
      // Bekleme/yana açılma yok; hafif yatay savrulma ile direkt yükselir.
      const count = 12;
      for (let i = 0; i < count; i += 1) {
        const dx = (Math.random() - 0.5) * 44;
        const size = 9 + Math.random() * 24;
        const s = document.createElement('span');
        s.className = 'aq-burst';
        s.style.left = `${x}px`;
        s.style.top = `${y}px`;
        s.style.width = `${size.toFixed(0)}px`;
        s.style.height = `${size.toFixed(0)}px`;
        s.style.setProperty('--dx', `${dx.toFixed(1)}px`);
        s.style.animationDuration = `${(0.9 + Math.random() * 0.7).toFixed(2)}s`;
        scene.appendChild(s);
        setTimeout(() => s.remove(), 1750);
      }
    });
  }
}

let aquariumSwimRAF = 0;

function stopAquariumSwimEngine() {
  if (aquariumSwimRAF) cancelAnimationFrame(aquariumSwimRAF);
  aquariumSwimRAF = 0;
}

// Balık davranış motoru: her balığa bir karakter atanır.
// cruise  = normal düz süzülme, racer = hızlı, drifter = çok yavaş,
// zigzag  = zikzak, sway = sallanarak (gövde salgıyla süzülür),
// dart-pause = yüz → dur → TERS DÖN → yeni yöne yüz,
// dart-stop   = yüz → dur → AYNI yonden yüzmeye devam,
// patrol = kenara kadar yüzüp dönüp geri gelme,
// jelly  = denizanaya özel: ileri + yukarı akış, arada aşağı iniş,
//          yukarı-aşağı zigzag, arada ters dönüş.
// Dönüşte gövde scaleX ile daralıp açılarak gerçekçi "U dönüşü" yapar.
function startAquariumSwimEngine(scene) {
  stopAquariumSwimEngine();
  const els = Array.from(scene.querySelectorAll('.aq-fish'));
  if (!els.length) return;
  const kinds = ['cruise', 'racer', 'zigzag', 'drifter', 'dart-pause', 'sway', 'patrol', 'dart-stop'];
  const flipFor = (moveDir, kindDir) => {
    const movingRight = moveDir > 0;
    const facesRight = kindDir === 'right';
    return movingRight === facesRight ? 1 : -1;
  };
  const fishes = els.map((el, i) => {
    const kindDir = el.dataset.dir === 'left' ? 'left' : 'right';
    const behaviour = el.dataset.skin === 'jelly' ? 'jelly' : kinds[i % kinds.length];
    const f = {
      el,
      kindDir,
      behavior: behaviour,
      x: 5 + ((i * 29) % 88),
      baseY: 6 + ((i * 11) % 42),
      y: 6 + ((i * 11) % 42),
      t: Math.random() * 10,
      speed: 3 + Math.random() * 5,
      moveDir: kindDir === 'left' ? -1 : 1,
      phase: Math.random() * Math.PI * 2,
      state: 'swim',
      stateT: 2.4 + Math.random() * 3.6,
      rot: 0,
      flip: 1,
      flipFrom: 1,
      flipTo: 1,
      turnT: 1,
    };
    f.flip = flipFor(f.moveDir, f.kindDir);
    if (f.behavior === 'jelly') {
      f.state = 'rise';
      f.stateT = 1.4 + Math.random() * 2.4;
      f.baseY = 4 + Math.random() * 40;
      f.y = f.baseY;
      f.speed = 2.5 + Math.random() * 2.5;
    }
    f.flipFrom = f.flip;
    f.flipTo = f.flip;
    el.style.left = `${f.x}%`;
    el.style.top = `${f.y}%`;
    el.style.transform = `scaleX(${f.flip})`;
    return f;
  });

  let last = performance.now();
  const frame = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const container = $('aquariumContainer');
    const visible = scene.isConnected && (!container || container.style.display !== 'none');
    if (visible) {
      fishes.forEach((f) => {
        f.t += dt;
        f.rot = 0;
        if (f.behavior === 'cruise') {
          f.x += f.moveDir * f.speed * dt;
          f.y = f.baseY + Math.sin(f.t * 0.9 + f.phase) * 3;
          if (f.x > 108) f.x = -16;
          if (f.x < -16) f.x = 108;
          f.flip = flipFor(f.moveDir, f.kindDir);
        } else if (f.behavior === 'racer') {
          // hızlı yüzücü: düz ve çabuk
          f.x += f.moveDir * f.speed * 2.4 * dt;
          f.y = f.baseY + Math.sin(f.t * 1.7 + f.phase) * 2.5;
          if (f.x > 110) f.x = -18;
          if (f.x < -18) f.x = 110;
          f.flip = flipFor(f.moveDir, f.kindDir);
        } else if (f.behavior === 'drifter') {
          // yavaş yüzücü: neredeyse süzülür
          f.x += f.moveDir * f.speed * 0.45 * dt;
          f.y = f.baseY + Math.sin(f.t * 0.7 + f.phase) * 4.5;
          if (f.x > 106) f.x = -14;
          if (f.x < -14) f.x = 106;
          f.flip = flipFor(f.moveDir, f.kindDir);
        } else if (f.behavior === 'zigzag') {
          f.x += f.moveDir * f.speed * 1.1 * dt;
          f.y = f.baseY + Math.sin(f.t * 2.3 + f.phase) * 9;
          if (f.y < 3) f.y = 3;
          if (f.y > 53) f.y = 53;
          if (f.x > 108) f.x = -16;
          if (f.x < -16) f.x = 108;
          f.flip = flipFor(f.moveDir, f.kindDir);
        } else if (f.behavior === 'sway') {
          // sallanarak: yavaş ilerler, gövde sağa sola salar
          f.x += f.moveDir * f.speed * 0.8 * dt;
          f.y = f.baseY + Math.sin(f.t * 2.6 + f.phase) * 5;
          f.rot = Math.sin(f.t * 2.6 + f.phase) * 8;
          if (f.y < 3) f.y = 3;
          if (f.y > 53) f.y = 53;
          if (f.x > 107) f.x = -15;
          if (f.x < -15) f.x = 107;
          f.flip = flipFor(f.moveDir, f.kindDir);
        } else if (f.behavior === 'dart-pause') {
          if (f.state === 'swim') {
            f.x += f.moveDir * f.speed * 1.6 * dt;
            f.y = f.baseY + Math.sin(f.t * 1.4 + f.phase) * 4;
            f.flip = flipFor(f.moveDir, f.kindDir);
            f.stateT -= dt;
            if (f.x > 104) f.x = -14;
            if (f.x < -14) f.x = 104;
            if (f.stateT <= 0) { f.state = 'pause'; f.stateT = 1.1 + Math.random() * 0.9; }
          } else if (f.state === 'pause') {
            f.y += Math.sin(f.t * 6) * dt * 1.5;
            f.rot = Math.sin(f.t * 6) * 4;
            f.stateT -= dt;
            if (f.stateT <= 0) {
              f.state = 'turn';
              f.turnT = 0;
              f.flipFrom = f.flip;
              f.moveDir *= -1;               // ters döner
              f.flipTo = flipFor(f.moveDir, f.kindDir);
            }
          } else {
            f.turnT = Math.min(1, f.turnT + dt / 0.38);
            f.flip = f.flipFrom + (f.flipTo - f.flipFrom) * f.turnT;
            f.rot = (f.moveDir > 0 ? 1 : -1) * Math.sin(f.turnT * Math.PI) * 12;
            if (f.turnT >= 1) { f.state = 'swim'; f.stateT = 2.5 + Math.random() * 3.5; }
          }
        } else if (f.behavior === 'dart-stop') {
          // yüz → dur (bekle) → AYNI yöne yüzmeye devam
          if (f.state === 'swim') {
            f.x += f.moveDir * f.speed * 1.3 * dt;
            f.y = f.baseY + Math.sin(f.t * 1.2 + f.phase) * 3;
            f.flip = flipFor(f.moveDir, f.kindDir);
            f.stateT -= dt;
            if (f.x > 105) f.x = -13;
            if (f.x < -13) f.x = 105;
            if (f.stateT <= 0) { f.state = 'pause'; f.stateT = 0.9 + Math.random() * 1.2; }
          } else {
            f.y += Math.sin(f.t * 5.5) * dt * 1.2;
            f.rot = Math.sin(f.t * 5.5) * 5;
            f.stateT -= dt;
            if (f.stateT <= 0) { f.state = 'swim'; f.stateT = 2.2 + Math.random() * 3; }
          }
        } else if (f.behavior === 'jelly') {
          // Denizanası: ileri ve yukarı doğru süzülür, arada aşağı iner,
          // yukarı-aşağı zigzag yapar, arada yatayda ters döner.
          f.rot = Math.sin(f.t * 2.2 + f.phase) * 7;
          if (f.state === 'rise') {
            f.y -= f.speed * 0.55 * dt;
            f.x += f.moveDir * f.speed * 0.38 * dt;
            f.x += Math.sin(f.t * 1.9 + f.phase) * dt * 2.4; // lateral zigzag
            f.flip = flipFor(f.moveDir, f.kindDir);
            f.stateT -= dt;
            if (f.y < 3) f.y = 3;
            if (f.stateT <= 0 || (f.y <= 3 && Math.random() < dt * 4)) {
              f.state = 'sink';
              f.stateT = 0.9 + Math.random() * 1.7;
            }
          } else if (f.state === 'sink') {
            f.y += f.speed * 0.5 * dt;
            f.x += f.moveDir * f.speed * 0.22 * dt;
            f.x += Math.cos(f.t * 2.4 + f.phase) * dt * 2.2;
            f.flip = flipFor(f.moveDir, f.kindDir);
            f.stateT -= dt;
            if (f.y > 52) f.y = 52;
            if (f.stateT <= 0) {
              if (Math.random() < 0.3) {
                f.state = 'turn';
                f.turnT = 0;
                f.flipFrom = f.flip;
                f.moveDir *= -1;              // ters döner
                f.flipTo = flipFor(f.moveDir, f.kindDir);
              } else {
                f.state = 'rise';
                f.stateT = 1.4 + Math.random() * 2.4;
              }
            }
          } else {
            f.turnT = Math.min(1, f.turnT + dt / 0.5);
            f.flip = f.flipFrom + (f.flipTo - f.flipFrom) * f.turnT;
            f.rot += Math.sin(f.turnT * Math.PI) * 5;
            if (f.turnT >= 1) { f.state = 'rise'; f.stateT = 1.4 + Math.random() * 2.4; }
          }
        } else {
          // patrol: kenarda U dönüşü
          if (f.state === 'swim') {
            f.x += f.moveDir * f.speed * 0.9 * dt;
            f.y = f.baseY + Math.sin(f.t * 1.1 + f.phase) * 4;
            f.flip = flipFor(f.moveDir, f.kindDir);
            if ((f.moveDir > 0 && f.x >= 93) || (f.moveDir < 0 && f.x <= 1)) {
              f.state = 'turn';
              f.turnT = 0;
              f.flipFrom = f.flip;
              f.moveDir *= -1;
              f.flipTo = flipFor(f.moveDir, f.kindDir);
            }
          } else {
            f.turnT = Math.min(1, f.turnT + dt / 0.42);
            f.flip = f.flipFrom + (f.flipTo - f.flipFrom) * f.turnT;
            if (f.turnT >= 1) f.state = 'swim';
          }
        }
        f.el.style.left = `${f.x.toFixed(2)}%`;
        f.el.style.top = `${f.y.toFixed(2)}%`;
        f.el.style.transform = `scaleX(${f.flip.toFixed(3)}) rotate(${f.rot.toFixed(2)}deg)`;
      });
    }
    aquariumSwimRAF = requestAnimationFrame(frame);
  };
  aquariumSwimRAF = requestAnimationFrame(frame);
}

function renderAquariumCollection(aq) {
  const box = $('aquariumCollection');
  if (!box) return;
  const fishCount = {};
  aq.fish.forEach((f) => {
    const k = f.kind.name;
    if (!fishCount[k]) fishCount[k] = { n: 0, rarity: f.kind.rarity, src: f.kind.src };
    fishCount[k].n += 1;
  });
  const coralCount = {};
  aq.corals.forEach((c) => {
    const k = c.kind.name;
    if (!coralCount[k]) coralCount[k] = { n: 0, rarity: c.kind.rarity, src: c.kind.src };
    coralCount[k].n += 1;
  });
  let html = '<div class="aq-collection-title">Balık Koleksiyonu</div><div class="aq-chips">';
  AQUARIUM_FISH.forEach((entry) => {
    const info = fishCount[entry.name];
    const n = info ? info.n : 0;
    html += `<div class="aq-chip aq-rarity-${entry.rarity}${n ? '' : ' locked'}"><span class="aq-chip-img" style="background-image:url('${encodeURI(resolvedAssetUrl(entry.src))}')"></span><strong>×${n}</strong><em>${rarityLabelTr(entry.rarity)}</em></div>`;
  });
  html += '</div><div class="aq-collection-title">Mercan Koleksiyonu</div><div class="aq-chips">';
  AQUARIUM_CORALS.forEach((entry) => {
    const info = coralCount[entry.name];
    const n = info ? info.n : 0;
    html += `<div class="aq-chip aq-rarity-${entry.rarity}${n ? '' : ' locked'}"><span class="aq-chip-img" style="background-image:url('${encodeURI(resolvedAssetUrl(entry.src))}')"></span><strong>×${n}</strong><em>${rarityLabelTr(entry.rarity)}</em></div>`;
  });
  html += '</div>';
  box.innerHTML = html;
}

// ===== Render All =====
function renderAll() {
  try {
    updateXpDisplay();
  } catch (err) {
    console.error('[render] xp güncellenemedi:', err);
  }
  try {
    renderDashboard();
  } catch (err) {
    console.error('[render] dashboard atlandı:', err);
  }
  if (AppState.activePage === 'learn' || AppState.activePage === 'roadmap') {
    try {
      renderRoadmap();
    } catch (err) {
      console.error('[render] yol haritası atlandı:', err);
    }
  }
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
  seedAquariumCollectionOnce();
  preloadLessonIntroAssets();

  // Check if user is logged in
  // TEMP-PREVIEW (kaldırılacak)
  let savedUser = readStorage(STORAGE_KEYS.currentUser, null);
  const previewParams = new URLSearchParams(window.location.search);
  if (!savedUser && previewParams.get('demo') === '1') {
    savedUser = 'onizleme@demo.local';
    writeStorage(STORAGE_KEYS.currentUser, savedUser);
  }
  const previewPage = previewParams.get('page');
  if (savedUser) {
    hideAuthOverlay();
    showPage(previewPage || 'dashboard');
    renderAll();
  } else {
    showAuthOverlay();
  }

  // Geri sayım sayfadan bağımsız yaşasın: hangi sayfada hata olursa olsun
  // TYT/AYT sayaçları yükleme anından itibaren tıklar. renderPlannerPage
  // planlayıcıya girildiğinde aynı interval'i tazeleyerek devam eder.
  try {
    updatePlannerExamCountdown();
    clearInterval(plannerCountdownInterval);
    plannerCountdownInterval = setInterval(updatePlannerExamCountdown, 1000);
  } catch (err) {
    console.error('[init] geri sayım kurulamadı:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Kalici dekor gorselleri artik index.htmla sabit <img> olarak gomuldu (BAKED v1).


