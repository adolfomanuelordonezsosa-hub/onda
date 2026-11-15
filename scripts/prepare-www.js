// Copia los archivos de la app a la carpeta www/ (la usan Android y Windows).
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const www = path.join(raiz, 'www');
const archivos = ['index.html', 'manifest.json', 'sw.js', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];

fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www, { recursive: true });

for (const f of archivos) {
  const origen = path.join(raiz, f);
  if (!fs.existsSync(origen)) {
    console.error('Falta el archivo: ' + f);
    process.exit(1);
  }
  fs.copyFileSync(origen, path.join(www, f));
}
console.log('www/ listo con ' + archivos.length + ' archivos');
