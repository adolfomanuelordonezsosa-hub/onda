// Ajusta el proyecto Android que crea Capacitor: permisos para seguir
// sonando con la pantalla apagada y controles en la notificación.
const fs = require('fs');
const path = require('path');

const manifest = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
if (!fs.existsSync(manifest)) {
  console.error('No encontré ' + manifest + ' (¿corriste "npx cap add android"?)');
  process.exit(1);
}

let xml = fs.readFileSync(manifest, 'utf8');
const permisos = [
  'android.permission.FOREGROUND_SERVICE',
  'android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK',
  'android.permission.WAKE_LOCK',
  'android.permission.POST_NOTIFICATIONS'
];

let agregados = 0;
for (const p of permisos) {
  if (!xml.includes(`"${p}"`)) {
    xml = xml.replace('</manifest>', `    <uses-permission android:name="${p}" />\n</manifest>`);
    agregados++;
  }
}
fs.writeFileSync(manifest, xml);
console.log('AndroidManifest listo (' + agregados + ' permisos agregados)');
