// Asset referans denetimi: script.js / index.html / styles.css icindeki
// gorsel, ses ve video referanslarinin hepsi diskte gerçekten var olmalı.
// Ayrıca public/ altında ASCII olmayan (Türkçe karakterli) dosya adı kalmasın:
// OS/CDN kodlama farkları bu dosyaları deployda sessizce bozar (404).
// Herhangi bir hata -> 1 ile cık (build'i bloklar).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const REF_FILES = ['script.js', 'index.html', 'styles.css'];
const EXT_RE = /(?:[A-Za-z0-9_%\-./\\]+)\.(?:png|jpe?g|mp3|mp4|webp|gif|svg)/gi;
const NONASCII_RE = /[^\x00-\x7F]/;

const errors = [];
const refs = new Set();
const PUBLIC_FILES = [];
(function listFiles(dir, prefix) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    const rel = prefix ? prefix + '/' + entry : entry;
    if (fs.statSync(p).isDirectory()) listFiles(p, rel);
    else PUBLIC_FILES.push(rel);
  }
})(PUB, '');
for (const f of REF_FILES) {
  const txt = fs.readFileSync(path.join(ROOT, f), 'utf8');
  for (const m of txt.matchAll(EXT_RE)) refs.add(m[0]);
}

function existsAnywhere(ref) {
  const clean = ref.replace(/\\/g, '/');
  const rel = clean.replace(/^public\//, '').replace(/^\/+/, '');
  for (const file of PUBLIC_FILES) {
    if (file === rel) return true;
    if (clean === 'public/' + file) return true;
    if (file.endsWith('/' + rel)) return true;
  }
  return false;
}

for (const ref of [...refs].sort()) {
  if (NONASCII_RE.test(path.basename(ref))) {
    errors.push(`Turkce karakterli dosya adi: ${ref}`);
    continue;
  }
  if (!existsAnywhere(ref)) errors.push(`yol yok: ${ref}`);
}

// public/ altindaki ASCII olmayan dosya/klasor adlari
function scan(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (NONASCII_RE.test(entry)) errors.push(`public altinda ASCII olmayan ad: ${path.relative(ROOT, p)}`);
    if (fs.statSync(p).isDirectory()) scan(p);
  }
}
if (fs.existsSync(PUB)) scan(PUB);

if (errors.length) {
  console.error('ASSET DEIF HATASI:');
  errors.forEach((e) => console.error('  -', e));
  console.error(`Toplam referans: ${refs.size}`);
  process.exit(1);
}
console.log(`asset denetimi temiz: ${refs.size} referansin hepsi diskte mevcut ve tum dosya adlari ASCII`);
