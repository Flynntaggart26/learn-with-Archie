-- Learn with Archie - Supabase Schema
-- Run this in the Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Study sessions table
CREATE TABLE IF NOT EXISTS public.study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  pomodoro_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Timer results table
CREATE TABLE IF NOT EXISTS public.timer_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Topic attempts table
CREATE TABLE IF NOT EXISTS public.topic_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  correct BOOLEAN NOT NULL,
  accuracy NUMERIC(5, 4) NOT NULL,
  mastery_before NUMERIC(5, 4) NOT NULL,
  mastery_after NUMERIC(5, 4) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Mastery states table
CREATE TABLE IF NOT EXISTS public.mastery_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  probability NUMERIC(5, 4) NOT NULL DEFAULT 0.2,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  attempts INTEGER NOT NULL DEFAULT 0,
  UNIQUE (user_id, topic_id)
);

-- SM-2 cards table
CREATE TABLE IF NOT EXISTS public.sm2_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  easiness_factor NUMERIC(5, 2) NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  due_date TIMESTAMPTZ NOT NULL,
  last_reviewed_at TIMESTAMPTZ,
  UNIQUE (user_id, topic_id)
);

-- Row Level Security Policies

-- Profiles: users can only read/update their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Study sessions: users can only access their own sessions
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own study sessions"
  ON public.study_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study sessions"
  ON public.study_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study sessions"
  ON public.study_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own study sessions"
  ON public.study_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Timer results: users can only access their own results
ALTER TABLE public.timer_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own timer results"
  ON public.timer_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own timer results"
  ON public.timer_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own timer results"
  ON public.timer_results FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own timer results"
  ON public.timer_results FOR DELETE
  USING (auth.uid() = user_id);

-- Topic attempts: users can only access their own attempts
ALTER TABLE public.topic_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own topic attempts"
  ON public.topic_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own topic attempts"
  ON public.topic_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own topic attempts"
  ON public.topic_attempts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own topic attempts"
  ON public.topic_attempts FOR DELETE
  USING (auth.uid() = user_id);

-- Mastery states: users can only access their own states
ALTER TABLE public.mastery_states ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mastery states"
  ON public.mastery_states FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mastery states"
  ON public.mastery_states FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mastery states"
  ON public.mastery_states FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mastery states"
  ON public.mastery_states FOR DELETE
  USING (auth.uid() = user_id);

-- SM-2 cards: users can only access their own cards
ALTER TABLE public.sm2_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sm2 cards"
  ON public.sm2_cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sm2 cards"
  ON public.sm2_cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sm2 cards"
  ON public.sm2_cards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sm2 cards"
  ON public.sm2_cards FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to update updated_at on profiles
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();