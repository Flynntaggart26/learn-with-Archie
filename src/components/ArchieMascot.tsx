import type { ReactElement } from 'react';
import type { MascotState } from '../types';

interface ArchieMascotProps {
  state: MascotState;
  size?: number;
  label?: string;
}

const STATE_LABELS: Record<MascotState, string> = {
  idle: 'Gözlüklerimi temizliyorum...',
  focus: 'Odaklanma zamanı!',
  success: 'Harika iş çıkardın!',
  warning: 'Ön koşul eksikliği tespit edildi',
};

const STATE_COLORS: Record<MascotState, string> = {
  idle: '#94A3B8',
  focus: '#00D8F6',
  success: '#4ADE80',
  warning: '#FF5864',
};

export function ArchieMascot({
  state,
  size = 120,
  label,
}: ArchieMascotProps): ReactElement {
  const color = STATE_COLORS[state];
  const displayLabel = label ?? STATE_LABELS[state];

  return (
    <div
      className="archie-mascot"
      style={{ width: size, height: size }}
      role="status"
      aria-label={displayLabel}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={`archie-mascot-svg archie-${state}`}
      >
        {/* Body */}
        <ellipse cx="100" cy="130" rx="55" ry="50" fill="#0F213A" />
        {/* Head */}
        <circle cx="100" cy="80" r="45" fill="#0F213A" />
        {/* Ears */}
        <ellipse cx="65" cy="50" rx="15" ry="25" fill="#0F213A" transform="rotate(-20 65 50)" />
        <ellipse cx="135" cy="50" rx="15" ry="25" fill="#0F213A" transform="rotate(20 135 50)" />
        {/* Inner ears */}
        <ellipse cx="65" cy="50" rx="8" ry="15" fill={color} transform="rotate(-20 65 50)" opacity="0.6" />
        <ellipse cx="135" cy="50" rx="8" ry="15" fill={color} transform="rotate(20 135 50)" opacity="0.6" />
        {/* Eyes */}
        <circle cx="85" cy="75" r="8" fill="#F8FAFC" />
        <circle cx="115" cy="75" r="8" fill="#F8FAFC" />
        <circle cx="87" cy="77" r="4" fill="#070F1E" />
        <circle cx="117" cy="77" r="4" fill="#070F1E" />
        {/* Glasses */}
        <circle cx="85" cy="75" r="12" fill="none" stroke={color} strokeWidth="2" />
        <circle cx="115" cy="75" r="12" fill="none" stroke={color} strokeWidth="2" />
        <line x1="97" y1="75" x2="103" y2="75" stroke={color} strokeWidth="2" />
        <line x1="73" y1="72" x2="60" y2="65" stroke={color} strokeWidth="2" />
        <line x1="127" y1="72" x2="140" y2="65" stroke={color} strokeWidth="2" />
        {/* Nose */}
        <ellipse cx="100" cy="88" rx="5" ry="4" fill={color} />
        {/* Mouth */}
        {state === 'success' && (
          <path d="M 88 98 Q 100 110 112 98" fill="none" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
        )}
        {state === 'warning' && (
          <path d="M 90 100 L 110 100" stroke="#FF5864" strokeWidth="3" strokeLinecap="round" />
        )}
        {state === 'focus' && (
          <path d="M 92 100 Q 100 95 108 100" fill="none" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
        )}
        {state === 'idle' && (
          <path d="M 92 100 Q 100 105 108 100" fill="none" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
        )}
        {/* Arms */}
        {state === 'idle' && (
          <>
            <line x1="50" y1="120" x2="35" y2="105" stroke="#0F213A" strokeWidth="8" strokeLinecap="round" />
            <line x1="150" y1="120" x2="165" y2="105" stroke="#0F213A" strokeWidth="8" strokeLinecap="round" />
            <circle cx="35" cy="103" r="6" fill={color} opacity="0.8" />
            <circle cx="165" cy="103" r="6" fill={color} opacity="0.8" />
          </>
        )}
        {state === 'focus' && (
          <>
            <line x1="50" y1="120" x2="30" y2="100" stroke="#0F213A" strokeWidth="8" strokeLinecap="round" />
            <line x1="150" y1="120" x2="170" y2="100" stroke="#0F213A" strokeWidth="8" strokeLinecap="round" />
            <circle cx="30" cy="98" r="5" fill={color} />
            <circle cx="170" cy="98" r="5" fill={color} />
          </>
        )}
        {state === 'success' && (
          <>
            <line x1="50" y1="120" x2="35" y2="90" stroke="#0F213A" strokeWidth="8" strokeLinecap="round" />
            <line x1="150" y1="120" x2="165" y2="90" stroke="#0F213A" strokeWidth="8" strokeLinecap="round" />
            <path d="M 30 95 L 38 103 L 50 88" fill="none" stroke="#4ADE80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 150 95 L 158 103 L 170 88" fill="none" stroke="#4ADE80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {state === 'warning' && (
          <>
            <line x1="50" y1="120" x2="40" y2="110" stroke="#0F213A" strokeWidth="8" strokeLinecap="round" />
            <line x1="150" y1="120" x2="160" y2="110" stroke="#0F213A" strokeWidth="8" strokeLinecap="round" />
            <path d="M 35 108 L 45 108 L 40 100 Z" fill="#FF5864" />
            <path d="M 155 108 L 165 108 L 160 100 Z" fill="#FF5864" />
          </>
        )}
        {/* Feet */}
        <ellipse cx="80" cy="178" rx="20" ry="8" fill="#0F213A" />
        <ellipse cx="120" cy="178" rx="20" ry="8" fill="#0F213A" />
      </svg>
      <div className="archie-mascot-label" style={{ color }}>
        {displayLabel}
      </div>
    </div>
  );
}