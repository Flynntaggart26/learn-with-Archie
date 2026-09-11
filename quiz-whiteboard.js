(() => {
  const STORAGE_KEY = 'archie.quizWhiteboard.v1';
  const COLORS = ['#1e293b', '#dc2626', '#f59e0b', '#0284c7', '#059669', '#ffffff'];

  let panel = null;
  let canvas = null;
  let ctx = null;
  let drawing = false;
  let tool = 'pen';
  let color = COLORS[0];
  let lineWidth = 3;
  const undoStack = [];
  const GEOM_KEY = 'archie.quizWhiteboard.geom.v1';
  let viewW = 380;
  let viewH = 300;
  const textSize = 18;
  let overlay = null;
  const mathStamps = [];
  let selectedStamp = null;
  const STAMPS_KEY = 'archie.quizWhiteboard.stamps.v1';

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
.qwb-fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9000;
  display: none;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #0879d1, #0ea5e9);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(8, 121, 209, 0.4);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.qwb-fab:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(8, 121, 209, 0.55); }
.qwb-fab.visible { display: flex; }

.qwb-panel {
  position: fixed;
  right: 20px;
  bottom: 76px;
  z-index: 9001;
  width: min(400px, calc(100vw - 32px));
  background: var(--card-bg, #0f213a);
  border: 1px solid var(--border, rgba(148, 163, 184, 0.25));
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: none;
  flex-direction: column;
}
.qwb-panel.open { display: flex; }
.qwb-panel {
  max-height: calc(100vh - 96px);
  overflow-y: auto;
}

.qwb-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: linear-gradient(135deg, rgba(8, 121, 209, 0.25), rgba(14, 165, 233, 0.15));
  border-bottom: 1px solid var(--border, rgba(148, 163, 184, 0.25));
}
.qwb-header strong { flex: 1; font-size: 14px; color: var(--text, #f8fafc); cursor: grab; user-select: none; }
.qwb-header strong:active { cursor: grabbing; }
.qwb-close {
  background: none;
  border: none;
  color: var(--text, #f8fafc);
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
}
.qwb-close:hover { background: rgba(148, 163, 184, 0.15); }

.qwb-canvas-wrap { padding: 10px; position: relative; }
.qwb-text-input {
  position: absolute;
  z-index: 5;
  min-width: 120px;
  min-height: 28px;
  padding: 2px 6px;
  border: 1px dashed #0ea5e9;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  font-family: 'Nunito', 'Segoe UI', Arial, sans-serif;
  font-size: 18px;
  resize: both;
  overflow: auto;
  outline: none;
}
.qwb-resize {
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(135deg, transparent 50%, #0ea5e9 50%);
  cursor: nwse-resize;
  touch-action: none;
}
.qwb-canvas {
  display: block;
  width: 100%;
  height: 300px;
  background: #ffffff;
  border-radius: 12px;
  cursor: crosshair;
  touch-action: none;
}
.qwb-overlay {
  position: absolute;
  left: 10px;
  top: 10px;
  touch-action: none;
  z-index: 4;
}

.qwb-toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px 12px;
  flex-wrap: wrap;
}
.qwb-tool {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid var(--border, rgba(148, 163, 184, 0.25));
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  color: var(--text, #f8fafc);
  transition: background 0.15s ease;
}
.qwb-tool:hover { background: rgba(148, 163, 184, 0.25); }
.qwb-tool.active { background: #0879d1; border-color: #0879d1; color: #fff; }

.qwb-colors { display: flex; gap: 5px; margin-left: 4px; }
.qwb-color {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  transition: transform 0.12s ease, border-color 0.12s ease;
}
.qwb-color:hover { transform: scale(1.15); }
.qwb-color.active { border-color: var(--text, #f8fafc); transform: scale(1.15); }

.qwb-hint {
  padding: 0 14px 12px;
  font-size: 11px;
  color: #94a3b8;
}
.qwb-math { padding: 0 12px 10px; }
.qwb-math[hidden] { display: none; }
.qwb-expr {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-height: 46px;
  max-height: 110px;
  overflow-y: auto;
  padding: 8px 10px;
  border-radius: 10px;
  background: #f1f5f9;
  margin-bottom: 8px;
}
.qwb-mi {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 2px 4px;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  background: #fff;
  outline: none;
  font-family: inherit;
}
.qwb-mi:focus { border-color: #0ea5e9; }
.qwb-frac { display: inline-flex; flex-direction: column; align-items: stretch; gap: 2px; }
.qwb-frac-line { height: 2px; background: #0f172a; border-radius: 2px; }
.qwb-frac input { text-align: center; }
.qwb-sup { display: inline-flex; align-items: flex-start; }
.qwb-sup .qwb-mi-exp { font-size: 11px; padding: 0 3px; }
.qwb-root { display: inline-flex; align-items: center; gap: 2px; }
.qwb-root-sym { font-weight: 900; font-size: 18px; color: #0f172a; }
.qwb-root .qwb-mi-rad { border-top: 3px solid #0f172a; border-radius: 0; }
.qwb-keys { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.qwb-key {
  padding: 9px 0;
  border: 1px solid var(--border, rgba(148, 163, 184, 0.25));
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.12);
  color: var(--text, #f8fafc);
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
}
.qwb-key:hover { background: rgba(148, 163, 184, 0.25); }
.qwb-key.fn { background: rgba(14, 165, 233, 0.28); }
.qwb-actions { display: flex; gap: 6px; margin-top: 6px; }
.qwb-action {
  flex: 1;
  padding: 9px 0;
  border: none;
  border-radius: 10px;
  font-weight: 900;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
}
.qwb-action.struct { background: rgba(139, 92, 246, 0.35); color: #fff; }
.qwb-action.add { background: linear-gradient(135deg, #10b981, #0ea5e9); color: #fff; }
`;
    document.head.appendChild(style);
  }

  function getPos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function pushUndo(kind) {
    try {
      undoStack.push({
        img: ctx.getImageData(0, 0, canvas.width, canvas.height),
        kind: kind || 'draw',
      });
      if (undoStack.length > 25) undoStack.shift();
    } catch {
      // ignore
    }
  }

  function undo() {
    const entry = undoStack.pop();
    if (!entry) return;
    if (entry.kind === 'stamp') {
      mathStamps.pop();
      if (selectedStamp && !mathStamps.includes(selectedStamp)) selectedStamp = null;
      renderOverlay();
      saveStamps();
    } else if (entry.img) {
      ctx.putImageData(entry.img, 0, 0);
    }
    scheduleSave();
  }

  let eraserPath = [];
  function trackEraser(event) {
    const rect = canvas.getBoundingClientRect();
    eraserPath.push({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }

  function strokeStart(event) {
    if (tool === 'text') {
      event.preventDefault();
      trackMathPos(event);
      openTextInput(event);
      return;
    }
    trackMathPos(event);
    eraserPath = [];
    if (tool === 'eraser') trackEraser(event);
    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);
    drawing = true;
    pushUndo();
    const pos = getPos(event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.lineWidth = tool === 'eraser' ? 24 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (tool === 'pen') ctx.strokeStyle = color;
    ctx.lineTo(pos.x + 0.01, pos.y + 0.01);
    ctx.stroke();
  }

  function strokeMove(event) {
    if (!drawing) return;
    event.preventDefault();
    if (tool === 'eraser') trackEraser(event);
    const pos = getPos(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function strokeEnd() {
    if (!drawing) return;
    drawing = false;
    ctx.globalCompositeOperation = 'source-over';
    if (tool === 'eraser' && eraserPath.length) {
      eraseStampsFromPath(eraserPath);
      eraserPath = [];
    }
    scheduleSave();
  }

  // Silgi damga katmanındaki ifadeleri de siler
  function eraseStampsFromPath(path) {
    if (!path.length || !mathStamps.length) return;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    path.forEach((pt) => {
      if (pt.x < minX) minX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y > maxY) maxY = pt.y;
    });
    const SS = 2;
    let touched = false;
    mathStamps.forEach((s) => {
      const w = s.w * s.scale;
      const h = s.h * s.scale;
      if (s.x > maxX || s.x + w < minX || s.y > maxY || s.y + h < minY) return;
      const g = s.img.getContext('2d');
      g.save();
      g.globalCompositeOperation = 'destination-out';
      g.lineCap = 'round';
      g.lineJoin = 'round';
      g.lineWidth = (24 / s.scale) * SS;
      g.beginPath();
      g.moveTo(((path[0].x - s.x) / s.scale) * SS, ((path[0].y - s.y) / s.scale) * SS);
      path.forEach((pt) => {
        g.lineTo(((pt.x - s.x) / s.scale) * SS, ((pt.y - s.y) / s.scale) * SS);
      });
      g.stroke();
      g.restore();
      s.dirty = true;
      touched = true;
    });
    if (touched) {
      renderOverlay();
      saveStamps();
    }
  }

  // ===== Yazı aracı: tıkla → kutu açılır → klavyeyle yaz → dışarı tıkla, mürekkebe dönüşür =====
  function openTextInput(event) {
    closeTextInput(true);
    const wrap = panel.querySelector('.qwb-canvas-wrap');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ta = document.createElement('textarea');
    ta.className = 'qwb-text-input';
    ta.rows = 2;
    ta.style.left = `${x + 10}px`;
    ta.style.top = `${y + 10}px`;
    ta.style.color = color === '#ffffff' ? '#0f172a' : color;
    ta.style.fontSize = `${textSize}px`;
    ta.placeholder = 'Formülü yaz… (bitince dışarı tıkla)';
    ta.dataset.cx = String(x);
    ta.dataset.cy = String(y);
    ta.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') closeTextInput(false);
      ev.stopPropagation();
    });
    ta.addEventListener('blur', () => commitTextInput());
    wrap.appendChild(ta);
    ta.focus();
  }

  function closeTextInput(commit) {
    const ta = panel ? panel.querySelector('.qwb-text-input') : null;
    if (!ta) return;
    if (commit) commitTextInput();
    else ta.remove();
  }

  function commitTextInput() {
    const ta = panel ? panel.querySelector('.qwb-text-input') : null;
    if (!ta) return;
    const text = ta.value;
    const x = parseFloat(ta.dataset.cx) || 0;
    const y = parseFloat(ta.dataset.cy) || 0;
    ta.remove();
    if (!text.trim()) return;
    pushUndo();
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = color;
    ctx.font = `700 ${textSize}px Nunito, 'Segoe UI', Arial, sans-serif`;
    ctx.textBaseline = 'top';
    text.split('\n').forEach((line, i) => {
      ctx.fillText(line, x, y + i * (textSize + 6));
    });
    ctx.restore();
    scheduleSave();
  }

  // ===== Konum + boyut: başlıktan sürükle, köşeden enine/boyuna büyüt =====
  function readGeom() {
    try { return JSON.parse(localStorage.getItem(GEOM_KEY) || 'null'); }
    catch { return null; }
  }

  function saveGeom() {
    try {
      const r = panel.getBoundingClientRect();
      localStorage.setItem(GEOM_KEY, JSON.stringify({
        x: Math.round(r.left),
        y: Math.round(r.top),
        w: Math.round(viewW),
        h: Math.round(viewH),
      }));
    } catch { /* yok say */ }
  }

  function applyGeom() {
    const g = readGeom();
    if (!g) return;
    const dpr = window.devicePixelRatio || 1;
    viewW = Math.min(window.innerWidth - 40, Math.max(240, g.w || 380));
    viewH = Math.min(window.innerHeight - 200, Math.max(160, g.h || 300));
    canvas.width = Math.round(viewW * dpr);
    canvas.height = Math.round(viewH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    panel.style.left = `${Math.max(0, g.x || 0)}px`;
    panel.style.top = `${Math.max(0, g.y || 0)}px`;
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    panel.style.width = `${viewW + 20}px`;
    canvas.style.height = `${viewH}px`;
    syncOverlay();
  }

  function resizeBacking(w, h, ow, oh) {
    const dpr = window.devicePixelRatio || 1;
    const snap = document.createElement('canvas');
    snap.width = canvas.width;
    snap.height = canvas.height;
    snap.getContext('2d').drawImage(canvas, 0, 0);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.drawImage(snap, 0, 0, ow, oh);
    undoStack.length = 0;
    syncOverlay();
  }

  function initDrag() {
    const header = panel.querySelector('.qwb-header');
    header.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      event.preventDefault();
      const r = panel.getBoundingClientRect();
      panel.style.left = `${r.left}px`;
      panel.style.top = `${r.top}px`;
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
      const sx = event.clientX;
      const sy = event.clientY;
      const ox = r.left;
      const oy = r.top;
      const mv = (m) => {
        panel.style.left = `${Math.min(window.innerWidth - 80, Math.max(80 - panel.offsetWidth, ox + m.clientX - sx))}px`;
        panel.style.top = `${Math.min(window.innerHeight - 60, Math.max(0, oy + m.clientY - sy))}px`;
      };
      const up = () => {
        header.removeEventListener('pointermove', mv);
        header.removeEventListener('pointerup', up);
        header.removeEventListener('pointercancel', up);
        saveGeom();
      };
      header.addEventListener('pointermove', mv);
      header.addEventListener('pointerup', up);
      header.addEventListener('pointercancel', up);
    });
  }

  function initResize() {
    const grip = panel.querySelector('.qwb-resize');
    grip.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      grip.setPointerCapture(event.pointerId);
      const sx = event.clientX;
      const sy = event.clientY;
      const ow = viewW;
      const oh = viewH;
      const mv = (m) => {
        viewW = Math.min(window.innerWidth - 40, Math.max(240, ow + (m.clientX - sx)));
        viewH = Math.min(window.innerHeight - 200, Math.max(160, oh + (m.clientY - sy)));
        panel.style.width = `${viewW + 20}px`;
        canvas.style.height = `${viewH}px`;
      };
      const up = () => {
        grip.removeEventListener('pointermove', mv);
        grip.removeEventListener('pointerup', up);
        grip.removeEventListener('pointercancel', up);
        if (Math.round(viewW) !== Math.round(ow) || Math.round(viewH) !== Math.round(oh)) {
          resizeBacking(viewW, viewH, ow, oh);
          scheduleSave();
        }
        saveGeom();
      };
      grip.addEventListener('pointermove', mv);
      grip.addEventListener('pointerup', up);
      grip.addEventListener('pointercancel', up);
    });
  }

  // ===== − alta al / ✕ son kayda sıfırla =====
  function hidePanel() {
    closeTextInput(true);
    panel.classList.remove('open');
    fab.classList.add('visible');
  }

  function stampRecords() {
    return mathStamps.map((s) => ({
      items: s.items,
      x: Math.round(s.x),
      y: Math.round(s.y),
      scale: s.scale,
      w: s.w,
      h: s.h,
      art: s.dirty ? s.img.toDataURL() : null,
      ink: s.ink,
      font: s.font || MATH_FONT,
    }));
  }

  // Kayıt dizisinden damgaları aynen geri kur (taban ayrı çizilir)
  function buildStampsFrom(recs) {
    mathStamps.length = 0;
    selectedStamp = null;
    const host = document.createElement('div');
    (recs || []).forEach((rec) => {
      if (!rec) return;
      // Silgiyle tıraşlanmış damga: pikselleri aynen geri yükle
      if (rec.art) {
        const img = new Image();
        img.onload = () => {
          mathStamps.push({
            img,
            w: rec.w || img.width / 2,
            h: rec.h || img.height / 2,
            x: rec.x || 20,
            y: rec.y || 24,
            scale: rec.scale || 1,
            dirty: true,
            items: rec.items || [],
            ink: rec.ink || '#1e293b',
            font: rec.font || MATH_FONT,
          });
          renderOverlay();
        };
        img.src = rec.art;
        return;
      }
      if (!Array.isArray(rec.items) || !rec.items.length) return;
      host.innerHTML = '';
      rec.items.forEach((it) => {
        if (it.kind === 'text') host.appendChild(mathPieceText(it.v));
        else if (it.kind === 'frac') host.appendChild(mathPieceFrac(it.n, it.d));
        else if (it.kind === 'sup') host.appendChild(mathPieceSup(it.b, it.e));
        else if (it.kind === 'root') host.appendChild(mathPieceRoot(it.r));
      });
      const laid = layoutMathItems(Array.from(host.children), rec.font || MATH_FONT, ctx);
      if (!laid) return;
      mathStamps.push({
        img: makeStampBitmap(laid, rec.ink || '#1e293b'),
        w: laid.totalW,
        h: laid.top + laid.bot,
        x: rec.x || 20,
        y: rec.y || 24,
        scale: rec.scale || 1,
        items: rec.items,
        ink: rec.ink || '#1e293b',
        font: rec.font || MATH_FONT,
      });
    });
    renderOverlay();
  }

  // (Son-kayda sıfırlama kaldırıldı: ✕ artık tüm tahtayı temizler.)

  let saveTimer = null;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNotes, 600);
  }

  function saveNotes() {
    try {
      localStorage.setItem(STORAGE_KEY, canvas.toDataURL('image/png'));
    } catch {
      // storage full or unavailable
    }
  }

  function restoreNotes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        restoreStamps();
        return;
      }
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        restoreStamps();
      };
      img.src = data;
    } catch {
      // ignore
    }
  }

  function clearCanvas() {
    pushUndo();
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mathStamps.length = 0;
    selectedStamp = null;
    renderOverlay();
    saveStamps();
    scheduleSave();
  }

  // (PNG indirme özelliği kaldırıldı.)

  // ===== Matematik klavyesi: ifade kur, önizle, tahtaya işle =====
  let mathPos = { x: 20, y: 24 };
  let mathActive = null;
  const MATH_FONT = 22;

  function trackMathPos(event) {
    const rect = canvas.getBoundingClientRect();
    mathPos = {
      x: Math.max(8, event.clientX - rect.left),
      y: Math.max(8, event.clientY - rect.top),
    };
  }

  function mathExprEl() { return panel.querySelector('#qwbExpr'); }

  function mathAutosize(input) {
    input.size = Math.max(1, (input.value || '').length);
  }

  function mathWireField(input) {
    input.addEventListener('input', () => mathAutosize(input));
    input.addEventListener('focus', () => { mathActive = input; });
  }

  function mathNewText(value) {
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'qwb-mi qwb-mi-text';
    inp.value = value || '';
    inp.size = Math.max(1, (value || '').length);
    mathWireField(inp);
    return inp;
  }

  function mathInsertPiece(node) {
    mathExprEl().appendChild(node);
    const f = node.querySelector('input');
    if (f) f.focus();
  }

  function mathFrac() {
    const w = document.createElement('span');
    w.className = 'qwb-frac';
    w.innerHTML = '<input class="qwb-mi qwb-mi-num" type="text" size="1" />' +
      '<span class="qwb-frac-line"></span>' +
      '<input class="qwb-mi qwb-mi-den" type="text" size="1" />';
    w.querySelectorAll('input').forEach(mathWireField);
    mathInsertPiece(w);
  }

  function mathSup() {
    const w = document.createElement('span');
    w.className = 'qwb-sup';
    w.innerHTML = '<input class="qwb-mi qwb-mi-base" type="text" size="1" />' +
      '<input class="qwb-mi qwb-mi-exp" type="text" size="1" />';
    w.querySelectorAll('input').forEach(mathWireField);
    mathInsertPiece(w);
  }

  function mathRoot() {
    const w = document.createElement('span');
    w.className = 'qwb-root';
    w.innerHTML = '<span class="qwb-root-sym">√</span>' +
      '<input class="qwb-mi qwb-mi-rad" type="text" size="1" />';
    w.querySelectorAll('input').forEach(mathWireField);
    mathInsertPiece(w);
  }

  function mathAppendChar(ch) {
    const expr = mathExprEl();
    // Odaktaki alan hangisiyse (kesir pay/paya, üs, kök içi dahil) oraya yaz.
    // Tuşa basmak odağı düğmeye çeker; mathActive son alanı hatırlar.
    let target = (mathActive && expr.contains(mathActive)) ? mathActive : null;
    if (!target) {
      const last = expr.lastElementChild;
      if (last && last.classList && last.classList.contains('qwb-mi-text')) {
        target = last;
      } else {
        target = mathNewText('');
        expr.appendChild(target);
      }
    }
    const s = target.selectionStart == null ? target.value.length : target.selectionStart;
    const e = target.selectionEnd == null ? s : target.selectionEnd;
    target.value = target.value.slice(0, s) + ch + target.value.slice(e);
    mathAutosize(target);
    target.focus();
    target.setSelectionRange(s + ch.length, s + ch.length);
  }

  function mathBack() {
    const expr = mathExprEl();
    let t = (document.activeElement && expr.contains(document.activeElement))
      ? document.activeElement
      : null;
    if (!t) {
      const ins = expr.querySelectorAll('input');
      t = ins[ins.length - 1] || null;
    }
    if (!t) return;
    if (t.value) {
      t.value = t.value.slice(0, -1);
      mathAutosize(t);
      t.focus();
      return;
    }
    const piece = t.classList.contains('qwb-mi-text') ? t : t.closest('span');
    if (piece) piece.remove();
    mathActive = null;
  }

  function mathClear() {
    mathExprEl().innerHTML = '';
    mathActive = null;
  }

  function toggleMath() {
    const m = panel.querySelector('#qwbMath');
    const btn = panel.querySelector('[data-action="math"]');
    m.hidden = !m.hidden;
    if (btn) btn.classList.toggle('active', !m.hidden);
  }

  // İfade → ölçülü parça listesi (boyasız, sadece ölçü)
  function layoutMathItems(pieces, F, measureCtx) {
    const baseFont = `700 ${F}px Nunito, 'Segoe UI', Arial, sans-serif`;
    const smallFont = `700 ${Math.round(F * 0.68)}px Nunito, 'Segoe UI', Arial, sans-serif`;
    const W = (s, f) => {
      measureCtx.font = f || baseFont;
      return measureCtx.measureText(s || '').width;
    };
    const items = pieces.map((p) => {
      if (p.classList.contains('qwb-mi-text')) {
        const v = p.value || '';
        return { kind: 'text', v, w: W(v), top: F, bot: 6 };
      }
      if (p.classList.contains('qwb-frac')) {
        const n = p.querySelector('.qwb-mi-num').value || '';
        const d = p.querySelector('.qwb-mi-den').value || '';
        return { kind: 'frac', n, d, w: Math.max(W(n), W(d), 12), top: F + 8, bot: F + 8 };
      }
      if (p.classList.contains('qwb-sup')) {
        const b = p.querySelector('.qwb-mi-base').value || '';
        const e = p.querySelector('.qwb-mi-exp').value || '';
        return { kind: 'sup', b, e, w: W(b) + W(e, smallFont), top: F + 10, bot: 6 };
      }
      if (p.classList.contains('qwb-root')) {
        const r = p.querySelector('.qwb-mi-rad').value || '';
        return { kind: 'root', r, w: W('√') + 2 + W(r), top: F + 6, bot: 6 };
      }
      return null;
    }).filter(Boolean);
    if (!items.length) return null;
    const top = Math.max(...items.map((i) => i.top));
    const bot = Math.max(...items.map((i) => i.bot));
    const totalW = items.reduce((s, i) => s + i.w + 6, 0);
    return { items, top, bot, totalW, F, baseFont, smallFont };
  }

  // Ölçülü listeyi hedef ctx üzerine (x, baseY taban çizgisi) boya
  function drawMathLaid(tctx, laid, x, baseY, inkColor) {
    const { items, F, baseFont, smallFont } = laid;
    tctx.save();
    tctx.globalCompositeOperation = 'source-over';
    tctx.fillStyle = inkColor;
    tctx.textBaseline = 'alphabetic';
    const W = (s, f) => {
      tctx.font = f || baseFont;
      return tctx.measureText(s || '').width;
    };
    let cx = x;
    items.forEach((it) => {
      if (it.kind === 'text') {
        tctx.font = baseFont;
        tctx.fillText(it.v, cx, baseY);
      } else if (it.kind === 'frac') {
        const lineY = baseY - 6;
        tctx.fillRect(cx, lineY, it.w, 2);
        tctx.font = baseFont;
        tctx.fillText(it.n, cx + (it.w - W(it.n)) / 2, lineY - 6);
        tctx.fillText(it.d, cx + (it.w - W(it.d)) / 2, lineY + 2 + F);
      } else if (it.kind === 'sup') {
        tctx.font = baseFont;
        tctx.fillText(it.b, cx, baseY);
        tctx.font = smallFont;
        tctx.fillText(it.e, cx + W(it.b), baseY - Math.round(F * 0.55));
      } else if (it.kind === 'root') {
        tctx.font = baseFont;
        const symW = W('√');
        tctx.fillText('√', cx, baseY);
        tctx.fillText(it.r, cx + symW + 2, baseY);
        tctx.fillRect(cx + symW, baseY - F - 2, W(it.r) + 2, 2);
      }
      cx += it.w + 6;
    });
    tctx.restore();
  }

  // Ölçülü listeden taşınabilir damga bitmap'i üret (2x keskinlik)
  function makeStampBitmap(laid, inkColor) {
    const SS = 2;
    const bmp = document.createElement('canvas');
    bmp.width = Math.max(2, Math.ceil(laid.totalW * SS));
    bmp.height = Math.max(2, Math.ceil((laid.top + laid.bot) * SS));
    const bctx = bmp.getContext('2d');
    bctx.scale(SS, SS);
    drawMathLaid(bctx, laid, 0, laid.top, inkColor);
    return bmp;
  }

  function mathCommit() {
    const expr = mathExprEl();
    const pieces = Array.from(expr.children);
    if (!pieces.length) return;
    const laid = layoutMathItems(pieces, MATH_FONT, ctx);
    if (!laid) return;
    const serial = laid.items.map((it) => {
      if (it.kind === 'text') return { kind: 'text', v: it.v };
      if (it.kind === 'frac') return { kind: 'frac', n: it.n, d: it.d };
      if (it.kind === 'sup') return { kind: 'sup', b: it.b, e: it.e };
      return { kind: 'root', r: it.r };
    });
    pushUndo('stamp');
    const stamp = {
      img: makeStampBitmap(laid, color),
      w: laid.totalW,
      h: laid.top + laid.bot,
      x: mathPos.x,
      y: mathPos.y,
      scale: 1,
      items: serial,
      ink: color,
      font: MATH_FONT,
    };
    mathStamps.push(stamp);
    selectedStamp = stamp;
    renderOverlay();
    saveStamps();
    mathClear();
  }

  // ===== Damga katmanı: taşı + ölçekle (taban çizim etkilenmez) =====
  function syncOverlay() {
    if (!overlay || !canvas) return;
    overlay.width = canvas.width;
    overlay.height = canvas.height;
    overlay.style.width = `${viewW}px`;
    overlay.style.height = `${viewH}px`;
    renderOverlay();
  }

  function renderOverlay() {
    if (!overlay) return;
    const dpr = window.devicePixelRatio || 1;
    const octx = overlay.getContext('2d');
    octx.setTransform(1, 0, 0, 1, 0, 0);
    octx.clearRect(0, 0, overlay.width, overlay.height);
    mathStamps.forEach((s) => {
      octx.drawImage(s.img, s.x * dpr, s.y * dpr, s.w * s.scale * dpr, s.h * s.scale * dpr);
      if (s === selectedStamp) {
        octx.save();
        octx.setTransform(dpr, 0, 0, dpr, 0, 0);
        octx.strokeStyle = '#0ea5e9';
        octx.setLineDash([6, 4]);
        octx.lineWidth = 1.5;
        octx.strokeRect(s.x - 4, s.y - 4, s.w * s.scale + 8, s.h * s.scale + 8);
        octx.restore();
      }
    });
  }

  function overlayPos(event) {
    const r = overlay.getBoundingClientRect();
    return { x: event.clientX - r.left, y: event.clientY - r.top };
  }

  function stampAt(px, py) {
    for (let i = mathStamps.length - 1; i >= 0; i--) {
      const s = mathStamps[i];
      const w = s.w * s.scale;
      const h = s.h * s.scale;
      if (px >= s.x && px <= s.x + w && py >= s.y && py <= s.y + h) return s;
    }
    return null;
  }

  // (Kilit tik'i kaldırıldı.)

  function saveStamps() {
    try {
      localStorage.setItem(STAMPS_KEY, JSON.stringify(stampRecords()));
    } catch { /* yok say */ }
  }

  function restoreStamps() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(STAMPS_KEY) || 'null'); }
    catch { saved = null; }
    buildStampsFrom(Array.isArray(saved) ? saved : []);
  }

  // Geri yükleme için parça kurucular (değerli)
  function mathPieceText(v) {
    const inp = mathNewText(v || '');
    return inp;
  }
  function mathPieceFrac(n, d) {
    const w = document.createElement('span');
    w.className = 'qwb-frac';
    w.innerHTML = '<input class="qwb-mi qwb-mi-num" type="text" size="1" />' +
      '<span class="qwb-frac-line"></span>' +
      '<input class="qwb-mi qwb-mi-den" type="text" size="1" />';
    w.querySelector('.qwb-mi-num').value = n || '';
    w.querySelector('.qwb-mi-den').value = d || '';
    return w;
  }
  function mathPieceSup(b, e) {
    const w = document.createElement('span');
    w.className = 'qwb-sup';
    w.innerHTML = '<input class="qwb-mi qwb-mi-base" type="text" size="1" />' +
      '<input class="qwb-mi qwb-mi-exp" type="text" size="1" />';
    w.querySelector('.qwb-mi-base').value = b || '';
    w.querySelector('.qwb-mi-exp').value = e || '';
    return w;
  }
  function mathPieceRoot(r) {
    const w = document.createElement('span');
    w.className = 'qwb-root';
    w.innerHTML = '<span class="qwb-root-sym">√</span>' +
      '<input class="qwb-mi qwb-mi-rad" type="text" size="1" />';
    w.querySelector('.qwb-mi-rad').value = r || '';
    return w;
  }

  function initOverlayEvents() {
    overlay.addEventListener('pointermove', (event) => {
      if (event.buttons !== 0 || !selectedStamp) return;
      const p = overlayPos(event);
      const s = selectedStamp;
      const w = s.w * s.scale;
      const h = s.h * s.scale;
      const inBody = p.x >= s.x && p.x <= s.x + w && p.y >= s.y && p.y <= s.y + h;
      overlay.style.cursor = inBody ? 'move' : (tool === 'text' ? 'text' : 'crosshair');
    });
    overlay.addEventListener('pointerdown', (event) => {
      const p = overlayPos(event);
      const hit = stampAt(p.x, p.y);
      if (!hit) {
        selectedStamp = null;
        renderOverlay();
        strokeStart(event);
        return;
      }
      event.preventDefault();
      selectedStamp = hit;
      renderOverlay();
      overlay.setPointerCapture(event.pointerId);
      const ox = p.x - hit.x;
      const oy = p.y - hit.y;
      const mv = (m) => {
        const q = overlayPos(m);
        hit.x = q.x - ox;
        hit.y = q.y - oy;
        renderOverlay();
      };
      const up = () => {
        overlay.removeEventListener('pointermove', mv);
        overlay.removeEventListener('pointerup', up);
        overlay.removeEventListener('pointercancel', up);
        saveStamps();
        scheduleSave();
      };
      overlay.addEventListener('pointermove', mv);
      overlay.addEventListener('pointerup', up);
      overlay.addEventListener('pointercancel', up);
    });
  }

  function initMathKeys() {
    panel.querySelectorAll('.qwb-key, .qwb-action').forEach((btn) => {
      btn.addEventListener('click', () => {
        const k = btn.dataset.k;
        if (k === 'frac') mathFrac();
        else if (k === 'sup') mathSup();
        else if (k === 'root') mathRoot();
        else if (k === 'back') mathBack();
        else if (k === 'clear') mathClear();
        else if (k === 'add') mathCommit();
        else mathAppendChar(k);
      });
    });
    const expr = mathExprEl();
    expr.addEventListener('focusin', (ev) => {
      if (ev.target && ev.target.matches('input')) mathActive = ev.target;
    });
  }

  function buildPanel() {
    panel = document.createElement('div');
    panel.className = 'qwb-panel';
    panel.innerHTML = `
      <div class="qwb-header">
        <span>📝</span>
        <strong>Sınav Notları</strong>
        <button type="button" class="qwb-close" data-qwb="min" title="Gizle (içerik korunur)">−</button>
        <button type="button" class="qwb-close" data-qwb="close" title="Kapat ve son kayda sıfırla">✕</button>
      </div>
      <div class="qwb-canvas-wrap">
        <canvas class="qwb-canvas"></canvas>
        <canvas class="qwb-overlay"></canvas>
      </div>
      <div class="qwb-toolbar">
        <button type="button" class="qwb-tool active" data-tool="pen" title="Kalem">✏️</button>
        <button type="button" class="qwb-tool" data-tool="text" title="Yazı (klavye)">🔤</button>
        <button type="button" class="qwb-tool" data-action="math" title="Matematik klavyesi">∑</button>
        <button type="button" class="qwb-tool" data-tool="eraser" title="Silgi">🧽</button>
        <button type="button" class="qwb-tool" data-action="undo" title="Geri Al">↩️</button>
        <button type="button" class="qwb-tool" data-action="clear" title="Temizle">🗑️</button>
        <div class="qwb-colors"></div>
      </div>
      <div class="qwb-math" id="qwbMath" hidden>
        <div class="qwb-expr" id="qwbExpr"></div>
        <div class="qwb-keys">
          <button type="button" class="qwb-key" data-k="7">7</button>
          <button type="button" class="qwb-key" data-k="8">8</button>
          <button type="button" class="qwb-key" data-k="9">9</button>
          <button type="button" class="qwb-key" data-k="÷">÷</button>
          <button type="button" class="qwb-key fn" data-k="back" title="Sil">⌫</button>
          <button type="button" class="qwb-key" data-k="4">4</button>
          <button type="button" class="qwb-key" data-k="5">5</button>
          <button type="button" class="qwb-key" data-k="6">6</button>
          <button type="button" class="qwb-key" data-k="×">×</button>
          <button type="button" class="qwb-key fn" data-k="clear" title="Temizle">C</button>
          <button type="button" class="qwb-key" data-k="1">1</button>
          <button type="button" class="qwb-key" data-k="2">2</button>
          <button type="button" class="qwb-key" data-k="3">3</button>
          <button type="button" class="qwb-key" data-k="-">−</button>
          <button type="button" class="qwb-key" data-k="(">(</button>
          <button type="button" class="qwb-key" data-k="0">0</button>
          <button type="button" class="qwb-key" data-k=".">.</button>
          <button type="button" class="qwb-key" data-k="=">=</button>
          <button type="button" class="qwb-key" data-k="+">+</button>
          <button type="button" class="qwb-key" data-k=")">)</button>
          <button type="button" class="qwb-key" data-k="x">x</button>
          <button type="button" class="qwb-key" data-k="y">y</button>
          <button type="button" class="qwb-key" data-k="±">±</button>
          <button type="button" class="qwb-key" data-k="π">π</button>
          <button type="button" class="qwb-key fn" data-k="root" title="Kök">√</button>
        </div>
        <div class="qwb-actions">
          <button type="button" class="qwb-action struct" data-k="frac">a/b Kesir</button>
          <button type="button" class="qwb-action struct" data-k="sup">xⁿ Üs</button>
          <button type="button" class="qwb-action add" data-k="add">✓ Ekle</button>
        </div>
      </div>
      <div class="qwb-hint">Başlıktan sürükle · Köşeden boyutlandır · 🔤 tıkla-yaz · ∑ matematik klavyesi · ✕ son kayda sıfırlar</div>
      <span class="qwb-resize" title="Boyutlandır"></span>
    `;

    canvas = panel.querySelector('.qwb-canvas');
    overlay = panel.querySelector('.qwb-overlay');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 360 * dpr;
    canvas.height = 300 * dpr;
    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    applyGeom();

    canvas.addEventListener('pointerdown', strokeStart);
    canvas.addEventListener('pointermove', strokeMove);
    canvas.addEventListener('pointerup', strokeEnd);
    canvas.addEventListener('pointercancel', strokeEnd);

    const colorsWrap = panel.querySelector('.qwb-colors');
    COLORS.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'qwb-color' + (i === 0 ? ' active' : '');
      btn.style.background = c;
      if (c === '#ffffff') btn.style.border = '1px solid #cbd5e1';
      btn.title = 'Renk';
      btn.addEventListener('click', () => {
        color = c;
        tool = 'pen';
        setToolButtons();
        colorsWrap.querySelectorAll('.qwb-color').forEach((el) => el.classList.remove('active'));
        btn.classList.add('active');
      });
      colorsWrap.appendChild(btn);
    });

    panel.querySelectorAll('.qwb-tool').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.tool) {
          tool = btn.dataset.tool;
          setToolButtons();
        } else if (btn.dataset.action === 'undo') {
          undo();
        } else if (btn.dataset.action === 'clear') {
          clearCanvas();
        } else if (btn.dataset.action === 'math') {
          toggleMath();
        }
      });
    });

    panel.querySelector('[data-qwb="min"]').addEventListener('click', () => {
      hidePanel();
    });
    panel.querySelector('[data-qwb="close"]').addEventListener('click', () => {
      clearCanvas();
      hidePanel();
    });

    document.body.appendChild(panel);
    initDrag();
    initResize();
    initMathKeys();
    initOverlayEvents();
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && selectedStamp && panel.classList.contains('open')) {
        selectedStamp = null;
        renderOverlay();
      }
    });
    syncOverlay();
    restoreNotes();
  }

  function setToolButtons() {
    panel.querySelectorAll('.qwb-tool[data-tool]').forEach((el) => {
      el.classList.toggle('active', el.dataset.tool === tool);
    });
    const cur = tool === 'text' ? 'text' : 'crosshair';
    if (overlay) overlay.style.cursor = cur;
    if (canvas) canvas.style.cursor = cur;
  }

  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'qwb-fab';
  fab.innerHTML = '<span>📝</span><span>Not Al</span>';
  fab.addEventListener('click', () => {
    panel.classList.add('open');
    fab.classList.remove('visible');
  });
  document.body.appendChild(fab);

  injectStyles();
  buildPanel();

  const quizContainer = document.getElementById('quizContainer');
  if (!quizContainer) return;

  const syncVisibility = () => {
    const quizVisible = quizContainer.style.display !== 'none';
    if (quizVisible) {
      if (!panel.classList.contains('open')) fab.classList.add('visible');
    } else {
      fab.classList.remove('visible');
      panel.classList.remove('open');
    }
  };

  new MutationObserver(syncVisibility).observe(quizContainer, {
    attributes: true,
    attributeFilter: ['style'],
  });
  syncVisibility();
})();
