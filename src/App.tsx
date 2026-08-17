import { useEffect, useState, type ReactElement } from 'react';
import type { User } from '@supabase/supabase-js';
import { ArchieMascot } from './components/ArchieMascot';
import { PlannerView } from './components/PlannerView';
import { SignUpView } from './components/SignUpView';
import { StudyView } from './components/StudyView';
import { getCurrentUser, onAuthStateChange, signOutUser } from './lib/supabase';
import { registerOnlineSyncListener } from './lib/syncQueue';
import type { MascotState, SyncQueueEntry } from './types';

export function App(): ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mascotState, setMascotState] = useState<MascotState>('idle');

  useEffect(() => {
    let isMounted = true;

    const initialize = async (): Promise<void> => {
      const currentUser = await getCurrentUser();
      if (isMounted) {
        setUser(currentUser);
        setIsLoading(false);
      }
    };

    void initialize();

    const unsubscribe = onAuthStateChange((nextUser) => {
      if (isMounted) {
        setUser(nextUser);
        setIsLoading(false);
      }
    });

    const removeOnlineListener = registerOnlineSyncListener(
      async (entries: SyncQueueEntry[]) => {
        console.log('Syncing entries to Supabase:', entries.length);
      },
    );

    return () => {
      isMounted = false;
      unsubscribe();
      removeOnlineListener();
    };
  }, []);

  const handleAuthenticated = (): void => {
    setMascotState('success');
    setTimeout(() => setMascotState('idle'), 3000);
    // In demo mode there is no auth-state event, so re-fetch the user here.
    void getCurrentUser().then((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setIsLoading(false);
    });
  };

  const handleSignOut = async (): Promise<void> => {
    await signOutUser();
    setUser(null);
    setMascotState('idle');
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <ArchieMascot state="idle" size={80} label="Yükleniyor..." />
      </div>
    );
  }

  if (!user) {
    return <SignUpView onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <h1>Learn with Archie</h1>
          <span className="app-header-user">{user.email}</span>
        </div>
        <div className="app-header-right">
          <ArchieMascot state={mascotState} size={48} />
          <button
            type="button"
            className="app-signout-btn"
            onClick={() => void handleSignOut()}
          >
            Çıkış Yap
          </button>
        </div>
      </header>

<main className="app-main">
        <section className="app-dashboard">
          <h2>Hoş geldin, {user.email}!</h2>
          <p>YKS yolculuğunda bugün de hedeflerine bir adım daha yaklaş.</p>
          <div className="app-mascot-banner">
            <ArchieMascot state={mascotState} size={160} />
          </div>
        </section>

        <StudyView onMascotState={setMascotState} />
        <PlannerView onMascotState={setMascotState} />
      </main>
    </div>
  );
}