import { type ReactElement } from 'react';

export type SidebarView = 'panel' | 'ai-teacher' | 'student-ai' | 'exam' | 'roadmap' | 'planner' | 'profile' | 'shop' | 'timer';

interface SidebarItem {
  id: SidebarView;
  label: string;
  icon: ReactElement;
  emoji?: string;
}

interface SidebarProps {
  activeView: SidebarView;
  onSelect: (view: SidebarView) => void;
  userInitial?: string;
  userClass?: string;
}

const HomeIcon = (): ReactElement => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const SparklesIcon = (): ReactElement => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const StudentIcon = (): ReactElement => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ExamIcon = (): ReactElement => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const MapIcon = (): ReactElement => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const CalendarIcon = (): ReactElement => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = (): ReactElement => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ShopIcon = (): ReactElement => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const TimerIcon = (): ReactElement => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'panel', label: 'Panel', icon: <HomeIcon /> },
  { id: 'ai-teacher', label: 'AI Öğretmen', icon: <SparklesIcon /> },
  { id: 'student-ai', label: 'Öğrenci AI', icon: <StudentIcon /> },
  { id: 'exam', label: 'Sınav', icon: <ExamIcon /> },
  { id: 'roadmap', label: 'Yol Haritası', icon: <MapIcon /> },
  { id: 'planner', label: 'Planlayıcı', icon: <CalendarIcon /> },
  { id: 'profile', label: 'Profil', icon: <UserIcon /> },
  { id: 'shop', label: 'Mağaza', icon: <ShopIcon /> },
  { id: 'timer', label: 'Zamanlayıcı', icon: <TimerIcon /> },
];

export function Sidebar({ activeView, onSelect, userInitial = 'S', userClass = 'Premium · 12. Sınıf' }: SidebarProps): ReactElement {
  return (
    <aside className="w-64 shrink-0 bg-[#EBF4FA] border-r border-slate-100 flex flex-col p-4 min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6 px-2">
        <div className="w-9 h-9 rounded-xl bg-[#0084FF] flex items-center justify-center text-white shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-base font-bold text-slate-700">Learn with Archie</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-1.5">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white text-[#0084FF] shadow-sm border border-slate-100'
                  : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <span className={isActive ? 'text-[#0084FF]' : 'text-slate-500'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Card Bottom */}
      <div className="mt-4 rounded-2xl bg-white p-3 border border-slate-100 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
          {userInitial.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-700 truncate">{userInitial}</p>
          <p className="text-[10px] text-slate-400 truncate">{userClass}</p>
        </div>
      </div>
    </aside>
  );
}
