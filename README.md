# Learn with Archie

Portfolio-grade YKS (TYT/AYT) preparation platform built with React 18, TypeScript, Vite, Supabase, and IndexedDB.

## Tech Stack

- **React 18+** with TypeScript
- **Vite** build tooling
- **Supabase** for authentication and PostgreSQL database
- **IndexedDB** for offline-first local storage
- **Deep Marine** design system

## Features

### 1. Curriculum DAG Engine (`src/lib/dagEngine.ts`)
- Models TYT/AYT subject relationships as a Directed Acyclic Graph
- `findRootWeakness()` uses DFS to trace backward and isolate unmastered prerequisite nodes when quiz accuracy drops below 50%
- `getMasteryPath()` returns the ordered prerequisite chain for any topic

### 2. Bayesian Knowledge Tracing (`src/lib/bktEngine.ts`)
- Probabilistic model estimating true subject mastery P(Lt)
- Standard BKT parameters: P(L0), P(T), P(S), P(G)
- `calculateMastery()` updates mastery state after each quiz attempt

### 3. SM-2 Spaced Repetition (`src/lib/sm2Engine.ts`)
- SM-2 algorithm with quality ratings 0-5
- Dynamic Easiness Factor (EF) adjustment
- Calculates review intervals and target dates

### 4. State-Driven Mascot (`src/components/ArchieMascot.tsx`)
- SVG-based Archie mascot with 4 states: `idle`, `focus`, `success`, `warning`
- Animations for each state (breathe, pulse, bounce, shake)

### 5. ÖSYM Score Prediction (`src/lib/osymScoreEngine.ts`)
- Net score calculation: `Net = Correct - Incorrect / 4`
- Z-score computation against historical national statistics
- Percentile estimation using Gaussian error function (`erf`)

### 6. Offline-First Sync Queue (`src/lib/syncQueue.ts`)
- Writes study sessions, timer results, and topic attempts to IndexedDB first
- `online` event listener flushes local mutations to Supabase in batch

### 7. Supabase Authentication (`src/lib/supabase.ts`, `src/components/SignUpView.tsx`)
- Email/password sign-up and sign-in
- Session persistence in `App.tsx`
- PostgreSQL RLS-compatible database client

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd learn-with-Archie
npm install
```

### Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in your Supabase project credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase Database Setup

Run the SQL in `supabase/schema.sql` in your Supabase SQL editor to create the `profiles` table with RLS policies.

### Development

```bash
npm run dev
```

### Type Checking

```bash
npm run typecheck
```

### Production Build

```bash
npm run build
```

## Project Structure

```
learn-with-Archie/
├── public/                  # Static assets (mascot Lottie/SVG)
├── src/
│   ├── components/
│   │   ├── ArchieMascot.tsx # State-driven mascot
│   │   └── SignUpView.tsx   # Auth view
│   ├── data/
│   │   └── curriculum.ts    # TYT/AYT curriculum DAG
│   ├── lib/
│   │   ├── bktEngine.ts     # Bayesian Knowledge Tracing
│   │   ├── dagEngine.ts     # Curriculum DAG engine
│   │   ├── osymScoreEngine.ts # ÖSYM score prediction
│   │   ├── sm2Engine.ts     # SM-2 spaced repetition
│   │   ├── supabase.ts      # Supabase client & auth
│   │   └── syncQueue.ts     # IndexedDB sync queue
│   ├── types/
│   │   └── index.ts         # Shared TypeScript types
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── styles.css           # Deep Marine theme
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Design System (Deep Marine)

| Token | Value |
|-------|-------|
| Canvas | `#070F1E` |
| Containers | `#0F213A` |
| Accent Primary | `#00D8F6` |
| Error/Alert | `#FF5864` |
| Text | `#F8FAFC` |
| Muted Text | `#94A3B8` |