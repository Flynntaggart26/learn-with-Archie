import { useMemo, type ReactElement } from 'react';
import { CREATURE_STATE_MACHINES, type CreatureStateMachine, type CreatureState } from '../data/creatureStateMachines';

const RARITY_COLORS: Record<string, string> = {
  common: '#94a3b8',
  rare: '#38bdf8',
  epic: '#a78bfa',
  legendary: '#fbbf24',
};

const RARITY_LABELS: Record<string, string> = {
  common: 'Sıradan',
  rare: 'Nadir',
  epic: 'Epik',
  legendary: 'Efsanevi',
};

function evaluateDemoState(creature: CreatureStateMachine): CreatureState {
  const seed = creature.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const bucket = seed % 10;
  if (bucket < 5) return 'HEALTHY';
  if (bucket < 8) return 'STRESTE';
  return 'LOST';
}

interface EcoCardProps {
  creature: CreatureStateMachine;
  state: CreatureState;
}

function EcoCard({ creature, state }: EcoCardProps): ReactElement {
  const stateIcon = state === 'HEALTHY' ? '💚' : state === 'STRESTE' ? '⚠️' : creature.loss_type === 'fled' ? '🌊' : '🪸';
  const stateLabel = state === 'HEALTHY' ? 'Formda' : state === 'STRESTE' ? 'Streste' : 'Kayıp';
  const msg = state === 'HEALTHY' ? '' : state === 'STRESTE' ? creature.messages.warning : creature.messages.lost;

  return (
    <div className={`eco-card eco-state-${state.toLowerCase()}`}>
      <div className="eco-card-header">
        <span className="eco-card-icon">{stateIcon}</span>
        <div className="eco-card-info">
          <strong className="eco-card-name">{creature.name}</strong>
          <span className="eco-card-old">{creature.old_name}</span>
        </div>
        <span className="eco-card-rarity" style={{ color: RARITY_COLORS[creature.rarity] }}>
          {RARITY_LABELS[creature.rarity]}
        </span>
      </div>
      <div className="eco-card-meta">
        <span className={`eco-card-state eco-badge-${state.toLowerCase()}`}>{stateLabel}</span>
        <span className="eco-card-window">📅 {creature.check_window_days} gün</span>
        <span className="eco-card-grace">⏳ {creature.grace_period_hours}s</span>
      </div>
      {msg && <div className="eco-card-message">{msg}</div>}
      {state !== 'HEALTHY' && (
        <div className="eco-card-recovery">💡 {creature.messages.recovery_hint}</div>
      )}
    </div>
  );
}

export function EcosystemView(): ReactElement {
  const fish = useMemo(() => CREATURE_STATE_MACHINES.filter((c) => c.category === 'fish'), []);
  const corals = useMemo(() => CREATURE_STATE_MACHINES.filter((c) => c.category === 'coral'), []);

  const fishStates = useMemo(() => {
    const counts: Record<CreatureState, number> = { HEALTHY: 0, STRESTE: 0, LOST: 0 };
    fish.forEach((c) => { counts[evaluateDemoState(c)]++; });
    return counts;
  }, [fish]);

  const coralStates = useMemo(() => {
    const counts: Record<CreatureState, number> = { HEALTHY: 0, STRESTE: 0, LOST: 0 };
    corals.forEach((c) => { counts[evaluateDemoState(c)]++; });
    return counts;
  }, [corals]);

  return (
    <div className="ecosystem-container" style={{ display: '' }}>
      <div className="eco-banner">
        <div className="eco-banner-icon">🧬</div>
        <div className="eco-banner-text">
          <h2>Biyo-Bilişsel Ekosistem</h2>
          <p>26 canlıdan oluşan akvaryumunun durum makinesi. Her canlı bir çalışma alışkanlığını izler; hedef saparsa uyarır, tolerans dolarsa kaybolur.</p>
        </div>
        <div className="eco-legend">
          <span className="eco-legend-item eco-legend-healthy">💚 Formda</span>
          <span className="eco-legend-item eco-legend-stress">⚠️ Streste</span>
          <span className="eco-legend-item eco-legend-lost">🌊 Kayıp</span>
        </div>
      </div>

      <div className="eco-section">
        <div className="eco-section-header">
          <span className="eco-section-icon">🐠</span>
          <div>
            <h3>Balıklar</h3>
            <p>{fishStates.HEALTHY} formda · {fishStates.STRESTE} streste · {fishStates.LOST} kayıp</p>
          </div>
        </div>
        <div className="eco-grid">
          {fish.map((c) => (
            <EcoCard key={c.id} creature={c} state={evaluateDemoState(c)} />
          ))}
        </div>
      </div>

      <div className="eco-section">
        <div className="eco-section-header">
          <span className="eco-section-icon">🪸</span>
          <div>
            <h3>Mercanlar</h3>
            <p>{coralStates.HEALTHY} formda · {coralStates.STRESTE} streste · {coralStates.LOST} kayıp</p>
          </div>
        </div>
        <div className="eco-grid eco-grid-coral">
          {corals.map((c) => (
            <EcoCard key={c.id} creature={c} state={evaluateDemoState(c)} />
          ))}
        </div>
      </div>
    </div>
  );
}
