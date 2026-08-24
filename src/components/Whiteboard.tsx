import { useRef, useState, useEffect, type ReactElement, type MouseEvent, type TouchEvent } from 'react';

type Tool = 'pen' | 'eraser';
type Theme = 'white' | 'sahil' | 'karatahta';

interface StrokePoint {
  x: number;
  y: number;
}

interface Stroke {
  type: Tool;
  color: string;
  lineWidth: number;
  points: StrokePoint[];
}

export interface WhiteboardProps {
  onBackgroundChange?: (theme: Theme) => void;
}

export function Whiteboard({ onBackgroundChange }: WhiteboardProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#1e293b');
  const [activeBg, setActiveBg] = useState<Theme>('white');
  const [showSettings, setShowSettings] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = ['#1e293b', '#f59e0b', '#0284c7', '#059669', '#dc2626'];

  const sahilUnlocked = localStorage.getItem('unlocked_sahil') === 'true';
  const karatahtaUnlocked = localStorage.getItem('unlocked_karatahta') === 'true';

  useEffect(() => {
    onBackgroundChange?.(activeBg);
  }, [activeBg, onBackgroundChange]);

  const getCanvasPoint = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    redraw();
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = stroke.lineWidth;
    ctx.strokeStyle = stroke.color;

    if (stroke.type === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    const pts = stroke.points;
    if (pts.length === 1) {
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = stroke.type === 'eraser' ? 'rgba(0,0,0,1)' : stroke.color;
      ctx.fill();
    } else if (pts.length > 1) {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();
    }
    ctx.restore();
  };

  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokes.forEach(stroke => drawStroke(ctx, stroke));
    if (currentStroke) drawStroke(ctx, currentStroke);
  };

  const startDrawing = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const point = getCanvasPoint(e);
    setIsDrawing(true);
    const newStroke: Stroke = {
      type: tool,
      color: tool === 'eraser' ? 'transparent' : color,
      lineWidth: tool === 'eraser' ? 22 : 2.5,
      points: [point],
    };
    setCurrentStroke(newStroke);
  };

  const continueDrawing = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const point = getCanvasPoint(e);
    setCurrentStroke(prev => prev ? { ...prev, points: [...prev.points, point] } : null);
  };

  const stopDrawing = () => {
    if (!isDrawing || !currentStroke) {
      setIsDrawing(false);
      setCurrentStroke(null);
      return;
    }
    if (currentStroke.points.length > 0) {
      setStrokes(prev => [...prev, currentStroke]);
    }
    setIsDrawing(false);
    setCurrentStroke(null);
  };

  const clearBoard = () => {
    setStrokes([]);
    setCurrentStroke(null);
  };

  const selectTheme = (theme: Theme) => {
    if (theme === 'sahil' && !sahilUnlocked) return;
    if (theme === 'karatahta' && !karatahtaUnlocked) return;
    setActiveBg(theme);
    setShowSettings(false);
  };

  const handleOutsideClick = (e: Event) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setShowSettings(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const bgStyle: React.CSSProperties = {
    backgroundColor: activeBg === 'white' ? '#ffffff' : 'transparent',
    backgroundImage: activeBg === 'sahil' ? "url('/images/sahil-arkaplan%C4%B1.png.jpg')" :
                     activeBg === 'karatahta' ? "url('/images/yaz%C4%B1tahtas%C4%B1.png.jpg')" : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
  };

  return (
    <div ref={containerRef} className="whiteboard-container" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
      <div className="whiteboard-toolbar" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--container)', borderBottom: '1px solid rgba(0,216,246,0.15)', flexWrap: 'wrap' }}>
        <div className="whiteboard-tools" style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            className={`wb-tool ${tool === 'pen' ? 'active' : ''}`}
            onClick={() => setTool('pen')}
            title="Kalem"
            style={{
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: tool === 'pen' ? 'var(--accent)' : 'var(--canvas)', border: '1px solid var(--accent)',
              borderRadius: '8px', color: tool === 'pen' ? 'var(--canvas)' : 'var(--text)',
              fontSize: '18px', cursor: 'pointer', transition: 'var(--btn-transition)'
            }}
          >
            ✏️
          </button>
          <button
            type="button"
            className={`wb-tool ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            title="Silgi"
            style={{
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: tool === 'eraser' ? 'var(--error)' : 'var(--canvas)', border: '1px solid var(--error)',
              borderRadius: '8px', color: tool === 'eraser' ? 'var(--text)' : 'var(--text)',
              fontSize: '18px', cursor: 'pointer', transition: 'var(--btn-transition)'
            }}
          >
            🧽
          </button>
          <button
            type="button"
            className="wb-tool"
            onClick={clearBoard}
            title="Temizle"
            style={{
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--canvas)', border: '1px solid var(--muted)', borderRadius: '8px',
              color: 'var(--text)', fontSize: '14px', cursor: 'pointer', transition: 'var(--btn-transition)'
            }}
          >
            🗑️
          </button>
        </div>

        <div className="whiteboard-colors" style={{ display: 'flex', gap: '4px', marginLeft: '8px', paddingLeft: '8px', borderLeft: '1px solid rgba(0,216,246,0.15)' }}>
          {colors.map(c => (
            <button
              key={c}
              type="button"
              className={`wb-color ${color === c ? 'active' : ''}`}
              onClick={() => setColor(c)}
              title={c}
              style={{
                width: '24px', height: '24px', borderRadius: '50%', border: '2px solid transparent',
                background: c, cursor: 'pointer', transition: 'var(--btn-transition)',
                transform: color === c ? 'scale(1.2)' : 'scale(1)', boxShadow: color === c ? '0 0 0 2px var(--accent)' : 'none'
              }}
            />
          ))}
        </div>

        <div className="whiteboard-settings" style={{ position: 'relative', marginLeft: 'auto' }}>
          <button
            type="button"
            className="wb-settings-btn"
            onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
            title="Tahta Ayarları"
            style={{
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--canvas)', border: '1px solid var(--muted)', borderRadius: '8px',
              color: 'var(--text)', fontSize: '18px', cursor: 'pointer', transition: 'var(--btn-transition)'
            }}
          >
            ⚙️
          </button>

          {showSettings && (
            <div
              className="wb-settings-dropdown"
              style={{
                position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
                minWidth: '180px', background: 'var(--container)', border: '1px solid var(--muted)',
                borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', padding: '8px',
                zIndex: 100, display: 'flex', flexDirection: 'column', gap: '4px'
              }}
              role="menu"
            >
              <button
                type="button"
                role="menuitem"
                className={activeBg === 'white' ? 'active' : ''}
                onClick={() => selectTheme('white')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                  background: activeBg === 'white' ? 'var(--accent)' : 'transparent',
                  border: 'none', borderRadius: '8px', color: activeBg === 'white' ? 'var(--canvas)' : 'var(--text)',
                  fontSize: '13px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s'
                }}
              >
                ⚪ Sade Beyaz Tahta
              </button>
              <button
                type="button"
                role="menuitem"
                className={activeBg === 'sahil' ? 'active' : ''}
                onClick={() => selectTheme('sahil')}
                disabled={!sahilUnlocked}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                  background: activeBg === 'sahil' ? 'var(--accent)' : 'transparent',
                  border: 'none', borderRadius: '8px',
                  color: !sahilUnlocked ? 'var(--muted)' : (activeBg === 'sahil' ? 'var(--canvas)' : 'var(--text)'),
                  fontSize: '13px', fontWeight: 600,
                  cursor: sahilUnlocked ? 'pointer' : 'not-allowed', textAlign: 'left', opacity: sahilUnlocked ? 1 : 0.5, transition: 'background 0.15s'
                }}
              >
                {!sahilUnlocked ? '🔒 ' : ''}🏖️ Gerçekçi Sahil
              </button>
              <button
                type="button"
                role="menuitem"
                className={activeBg === 'karatahta' ? 'active' : ''}
                onClick={() => selectTheme('karatahta')}
                disabled={!karatahtaUnlocked}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                  background: activeBg === 'karatahta' ? 'var(--accent)' : 'transparent',
                  border: 'none', borderRadius: '8px',
                  color: !karatahtaUnlocked ? 'var(--muted)' : (activeBg === 'karatahta' ? 'var(--canvas)' : 'var(--text)'),
                  fontSize: '13px', fontWeight: 600,
                  cursor: karatahtaUnlocked ? 'pointer' : 'not-allowed', textAlign: 'left', opacity: karatahtaUnlocked ? 1 : 0.5, transition: 'background 0.15s'
                }}
              >
                {!karatahtaUnlocked ? '🔒 ' : ''}🏫 Klasik Kara Tahta
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="whiteboard-canvas-wrapper" style={bgStyle}>
        <canvas
          ref={canvasRef}
          className="whiteboard-canvas"
          onMouseDown={startDrawing}
          onMouseMove={continueDrawing}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={continueDrawing}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
          style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
        />
      </div>
    </div>
  );
}