const fs = require('fs');
const path = require('path');

const canvaSrcDir = path.join(__dirname, 'src', 'canva');
const publicSrcDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(path.join(distDir, 'canva'))) {
  fs.mkdirSync(path.join(distDir, 'canva'), { recursive: true });
}

if (!fs.existsSync(path.join(distDir, 'public'))) {
  fs.mkdirSync(path.join(distDir, 'public'), { recursive: true });
}

function copyFiles(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((file) => {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);
      copyFiles(srcFile, destFile);
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

fs.readdirSync(canvaSrcDir).forEach(file => {
  const srcFile = path.join(canvaSrcDir, file);
  const destFile = path.join(distDir, 'canva', file);
  copyFiles(srcFile, destFile);
});

fs.readdirSync(publicSrcDir).forEach(file => {
  const srcFile = path.join(publicSrcDir, file);
  const destFile = path.join(distDir, 'public', file);
  copyFiles(srcFile, destFile);
});

console.log('Canva and Public folders copied successfully!');
