const fs = require('fs');
const path = require('path');

const directory = process.argv[2] || '.';

const hebrewRegex = /[\u0590-\u05FF]/;

const allowedExtensions = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.html',
  '.css',
  '.scss',
  '.json',
  '.md'
]);

const results = [];

function scanFile(filePath) {
  if (path.basename(filePath) === 'find-hebrew.js') return;
  if (!allowedExtensions.has(path.extname(filePath))) return;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (hebrewRegex.test(line)) {
        const absolutePath = path.resolve(filePath);
        const clickableLink = `vscode://file/${absolutePath}:${index + 1}`;
        results.push(clickableLink + ": " + line.trim());
      }
    });
  } catch (err) {
  }
}

function scanDirectory(dir) {
  if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('dist')) return;
  
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile()) {
        scanFile(fullPath);
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
}

scanDirectory(directory);

const outputFile = path.join(__dirname, 'hebrew-lines.txt');
fs.writeFileSync(outputFile, results.join('\n'), 'utf8');
console.log(`נמצאו ${results.length} שורות בעברית. התוצאות (עם קישורים) נשמרו ב-${outputFile}`);
