// Vercel static build: vanilla uygulamayi (index.html + css + js + public/)
// dist/ altina birebir kopyalar. public/ EZILMEDEN tasinir, boylece
// `public/...` referanslari (gorsel/ses/video/sticker) production'da
// localdeki gibi calisir. `vite build` KULLANILMAZ (public'i kokte
// duzlestirip tum asset yollarini bozar + strict tsc riski tasir).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'dist');

const EXCLUDE = new Set([
  'node_modules', '.git', '.vercel', 'dist', 'src', 'supabase',
  '.vscode', 'scripts', 'package.json', 'package-lock.json',
  'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json',
  'vite.config.ts', '.gitignore', '.vercelignore', 'vercel.json',
  'README.md', 'TODO.md', '.env.example', 'index.old.html',
  'styles.css.backup', 'whiteboard-eraser-test.png',
  'add-subtopics.cjs', 'add-subtopics.js',
  'replace_buttons.py', 'replace_colors.py',
  'new_dark.txt', 'new_root.txt',
  'audit-assets.cjs', 'audit-bare.cjs',
]);

function isExcluded(name) {
  if (EXCLUDE.has(name)) return true;
  if (name.startsWith('.') && name !== '.env.example') return true; // .freebuff vb.
  if (name.startsWith('audit-')) return true;
  return false;
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let count = 0;
for (const entry of fs.readdirSync(ROOT)) {
  if (isExcluded(entry)) continue;
  copyRecursive(path.join(ROOT, entry), path.join(OUT, entry));
  count++;
}

const mustExist = ['index.html', 'styles.css', 'script.js', path.join('public', 'images')];
for (const m of mustExist) {
  if (!fs.existsSync(path.join(OUT, m))) {
    console.error(`BUILD HATASI: dist/${m} uretilemedi`);
    process.exit(1);
  }
}
console.log(`static build tamam: ${count} girdi dist/ altina kopyalandi`);
