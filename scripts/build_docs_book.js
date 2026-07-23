const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const bookDir = path.join(__dirname, '..', 'docs', 'book');
const outHtmlDir = path.join(__dirname, '..', 'documentation', 'html');
const outPdfDir = path.join(__dirname, '..', 'documentation', 'pdf');
const typstFile = path.join(__dirname, '..', 'docs', 'HEARTSYNC_50_CHAPTERS_BOOK.typ');
const pdfFile = path.join(outPdfDir, 'HEARTSYNC_FULL_DOCUMENTATION_BOOK.pdf');

if (!fs.existsSync(outHtmlDir)) fs.mkdirSync(outHtmlDir, { recursive: true });
if (!fs.existsSync(outPdfDir)) fs.mkdirSync(outPdfDir, { recursive: true });

// Read all chapter files 01..50
const files = fs.readdirSync(bookDir)
  .filter(f => f.endsWith('.md') && f !== 'INDEX.md')
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

console.log(`Found ${files.length} markdown chapters.`);

let combinedMarkdown = `# HeartSync Enterprise Software Engineering Documentation Book\n\n`;
let chaptersData = [];

files.forEach((filename) => {
  const filePath = path.join(bookDir, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  chaptersData.push({ filename, content });
  combinedMarkdown += `\n\n---\n\n${content}`;
});

// Generate HTML Book Portal
const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HeartSync Enterprise Software Engineering Documentation Book</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  <style>
    @media print {
      .no-print { display: none !important; }
      body { background: white; color: black; }
      .page-break { page-break-before: always; }
    }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen font-sans flex">

  <!-- Sidebar Navigation -->
  <aside class="w-80 bg-slate-950 border-r border-slate-800 h-screen sticky top-0 overflow-y-auto p-4 no-print shrink-0">
    <div class="flex items-center gap-3 mb-6 px-2">
      <span class="text-2xl">❤️</span>
      <div>
        <h1 class="font-bold text-teal-400 text-lg">HeartSync Book</h1>
        <p class="text-xs text-slate-400">Enterprise Documentation</p>
      </div>
    </div>
    
    <div class="mb-4">
      <button onclick="window.print()" class="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2">
        🖨️ Cetak / Simpan ke PDF
      </button>
    </div>

    <nav class="space-y-1">
      ${chaptersData.map((c, i) => {
        const titleMatch = c.content.match(/# (.*)/);
        const title = titleMatch ? titleMatch[1] : c.filename;
        return `<a href="#chapter-${i+1}" class="block px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition hover:text-teal-300 border-l-2 border-transparent hover:border-teal-400 truncate">${title}</a>`;
      }).join('')}
    </nav>
  </aside>

  <!-- Main Document Body -->
  <main class="flex-1 p-8 max-w-5xl mx-auto space-y-12">
    ${chaptersData.map((c, i) => {
      return `
        <article id="chapter-${i+1}" class="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-slate-700/60 shadow-xl page-break">
          <div class="prose prose-invert max-w-none leading-relaxed" id="content-${i+1}">
          </div>
        </article>
      `;
    }).join('')}
  </main>

  <script>
    const chaptersData = ${JSON.stringify(chaptersData)};
    mermaid.initialize({ startOnLoad: false, theme: 'dark' });

    chaptersData.forEach((c, i) => {
      const container = document.getElementById(\`content-\${i+1}\`);
      if (container) {
        container.innerHTML = marked.parse(c.content);
      }
    });

    setTimeout(() => {
      mermaid.run();
    }, 500);
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(outHtmlDir, 'index.html'), htmlContent, 'utf8');
console.log(`HTML Book Portal written to ${path.join(outHtmlDir, 'index.html')}`);

// Create Master Typst Source
let typstContent = `#set page(
  paper: "a4",
  margin: (top: 2.2cm, bottom: 2.2cm, left: 2.2cm, right: 2.2cm),
  header: context {
    let page-num = counter(page).get().first()
    if page-num > 1 [
      #align(right)[#text(size: 8.5pt, fill: rgb("#0f766e"), weight: "bold")[HeartSync Enterprise Software Engineering Documentation Book]]
      #v(-2pt)
      #line(length: 100%, stroke: 0.5pt + rgb("#cbd5e1"))
    ]
  },
  footer: context {
    let page-num = counter(page).get().first()
    if page-num > 1 [
      #line(length: 100%, stroke: 0.5pt + rgb("#cbd5e1"))
      #v(4pt)
      #align(center)[#text(size: 8.5pt, fill: rgb("#64748b"))[Halaman #page-num | OpenSSF Score 0.48 | HL7 FHIR v4]]
    ]
  }
)

#set text(size: 10pt, lang: "id")
#set par(justify: true, leading: 0.65em)

// Cover Page
#align(center + horizon)[
  #v(1cm)
  #rect(width: 100%, fill: rgb("#0f766e"), radius: 16pt, inset: 28pt)[
    #align(center)[
      #text(size: 36pt, weight: "bold", fill: white)[❤️ HeartSync] \
      #v(0.5cm)
      #text(size: 16pt, weight: "medium", fill: rgb("#f0fdf4"))[
        SPESIFIKASI ARSITEKTUR REKAYASA PERANGKAT LUNAK ENTERPRISE \
        DAN DOKUMENTASI DUKUNGAN MEDIS HIPERTENSI LENGKAP (50 BAB)
      ]
    ]
  ]
  
  #v(2cm)
  #text(size: 11pt, fill: rgb("#475569"))[
    *Tim Architecture & Core Engineering:* Antigravity AI Group \
    *Lisensi:* MIT License | *Tanggal:* 23 Juli 2026 | *Versi:* 2.0.0-Full Book
  ]
]

#pagebreak()

#outline(title: [Daftar Isi Dokumentasi Book (50 Bab)], indent: 1.5em)

#pagebreak()
`;

// Append readable typst conversions for the chapters
chaptersData.forEach((c) => {
  let cleaned = c.content
    .replace(/^# (.*)/gm, '= $1')
    .replace(/^## (.*)/gm, '== $1')
    .replace(/^### (.*)/gm, '=== $1')
    .replace(/^#### (.*)/gm, '==== $1');
  
  typstContent += `\n#pagebreak()\n${cleaned}\n`;
});

fs.writeFileSync(typstFile, typstContent, 'utf8');
console.log(`Typst Master File written to ${typstFile}`);

// Try compiling Typst to PDF
try {
  execSync(`typst compile "${typstFile}" "${pdfFile}"`, { stdio: 'inherit' });
  console.log(`Successfully compiled PDF to ${pdfFile}`);
} catch (err) {
  console.error("Typst compilation notice:", err.message);
}
