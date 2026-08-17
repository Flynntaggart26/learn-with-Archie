import {
  createClient,
  type AuthChangeEvent,
  type Session,
  type SupabaseClient,
  type User,
} from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

/**
 * Whether Supabase is fully configured. When missing, the app runs in a
 * local demo mode so it still renders without backend credentials.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// --- In-memory demo auth used when Supabase is not configured ---------

const DEMO_USER_KEY = 'archie.demo.session';

function getDemoUser(): User | null {
  try {
    const raw = window.localStorage.getItem(DEMO_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function setDemoUser(user: User): void {
  try {
    window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
  } catch {
    // ignore storage errors
  }
}

function clearDemoUser(): void {
  try {
    window.localStorage.removeItem(DEMO_USER_KEY);
  } catch {
    // ignore storage errors
  }
}

async function demoDelay(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
}

export function isDemoMode(): boolean {
  return !isSupabaseConfigured;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
): Promise<{ user: User | null; error: string | null }> {
  if (!supabase) {
    await demoDelay();
    const demoUser: User = {
      id: 'demo-user',
      email,
      app_metadata: {},
      user_metadata: { display_name: displayName },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      role: 'authenticated',
    };
    setDemoUser(demoUser);
    return { user: demoUser, error: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error) {
    return { user: null, error: error.message };
  }

  if (data.user) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      email: data.user.email,
      display_name: displayName,
      created_at: new Date().toISOString(),
    });
  }

  return { user: data.user, error: null };
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<{ user: User | null; error: string | null }> {
  if (!supabase) {
    await demoDelay();

    const existing = getDemoUser();
    if (existing) {
      return { user: existing, error: null };
    }

    const demoUser: User = {
      id: 'demo-user',
      email,
      app_metadata: {},
      user_metadata: { display_name: 'Demo Öğrenci' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      role: 'authenticated',
    };
    setDemoUser(demoUser);
    return { user: demoUser, error: null };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null, error: error.message };
  }

  return { user: data.user, error: null };
}

export async function signOutUser(): Promise<{ error: string | null }> {
  if (!supabase) {
    await demoDelay();
    clearDemoUser();
    return { error: null };
  }

  const { error } = await supabase.auth.signOut();
  return { error: error ? error.message : null };
}

export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) {
    return getDemoUser();
  }

  const { data } = await supabase.auth.getUser();
  return data.user;
}

export function onAuthStateChange(
  callback: (user: User | null) => void,
): () => void {
  if (!supabase) {
    callback(getDemoUser());
    return () => {
      // no-op in demo mode
    };
  }

  const { data } = supabase.auth.onAuthStateChange(
    (_event: AuthChangeEvent, session: Session | null) => {
      callback(session ? session.user : null);
    },
  );

  return () => {
    data.subscription.unsubscribe();
  };
}

export async function fetchUserProfile(
  userId: string,
): Promise<Record<string, unknown> | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: Record<string, unknown>,
): Promise<{ error: string | null }> {
  if (!supabase) {
    return { error: null };
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  return { error: error ? error.message : null };
}