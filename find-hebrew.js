const fs = require('fs');
const path = require('path');

const directory = process.argv[2] || '.';

const hebrewRegex = /[\u0590-\u05FF]/;

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (hebrewRegex.test(line)) {
        console.log(`${filePath}:${index + 1}: ${line.trim()}`);
      }
    });
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
}

function scanDirectory(dir) {
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
