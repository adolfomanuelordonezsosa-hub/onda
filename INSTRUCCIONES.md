# Onda — Cómo convertirla en app para celular (APK) y computadora (Windows)

Las apps se fabrican solas en la nube de GitHub. No necesitas instalar Android Studio ni nada pesado: solo Git (que ya tienes).

---

## Lo que hay en esta carpeta

| Archivo / carpeta | Para qué sirve |
|---|---|
| `index.html` | La app completa (toda la música, pantallas, letras, etc.) |
| `sw.js`, `manifest.json`, `icon*.png`, `icon.svg` | Para que funcione sin internet y se pueda instalar desde el navegador |
| `package.json` | Configuración de la app de Windows |
| `electron/main.js` | La ventana de la app de Windows |
| `capacitor.config.json` | Configuración de la app de Android |
| `scripts/` | Preparan los archivos antes de fabricar las apps |
| `assets/` | Íconos y pantalla de inicio de la app |
| `android-keystore/` | La firma de tu APK (siempre la misma, para poder actualizar sin perder tu música) |
| `.github/workflows/build.yml` | La "receta" que usa GitHub para fabricar el APK y el instalador .exe |
| `.gitignore` | Le dice a Git qué carpetas no subir |

---

## Paso 1 — Copiar los archivos a tu carpeta

1. Descomprime `Onda-proyecto-completo.zip`.
2. Copia **todo** lo de adentro a tu carpeta `onda` (la que ya está conectada a GitHub) y acepta **reemplazar** los archivos.
3. Revisa que en la carpeta `onda` veas directamente `index.html`, `package.json`, `electron`, `scripts`, `assets`, etc. (no dentro de otra subcarpeta).

> La carpeta `.github` empieza con punto y Windows a veces la oculta. Para verla: Explorador de archivos → **Vista** → **Mostrar** → **Elementos ocultos**.

---

## Paso 2 — Subirlo a GitHub

Abre Git Bash dentro de la carpeta `onda` (clic derecho → **Open Git Bash here**) y pega, uno por uno:

```bash
git add .
git commit -m "Onda completa: app Android y Windows"
git push
```

---

## Paso 3 — Pedirle a GitHub que fabrique las apps

Crea una **etiqueta de versión** (cada versión nueva lleva un número distinto):

```bash
git tag v2.0.0
git push origin v2.0.0
```

> Si te dice que la etiqueta ya existe, usa otro número: `v2.0.1`, `v2.0.2`…

---

## Paso 4 — Esperar (unos 10 minutos)

1. Entra a tu repositorio: https://github.com/adolfomanuelordonezsosa-hub/onda
2. Abre la pestaña **Actions**.
3. Verás **"Construir apps de Onda"** con dos trabajos:
   - **App Android (APK)**
   - **App Windows (instalador .exe)**
4. Espera a que los dos tengan **palomita verde ✅**.

> Si alguno sale con **❌ rojo**: haz clic en él, abre el paso que falló, copia el texto del error y mándaselo a Claude.

---

## Paso 5 — Descargar las apps

1. En la página principal del repositorio, en la columna derecha, entra a **Releases**.
2. Abre la versión que creaste (por ejemplo **v2.0.0**).
3. Ahí están:
   - **`Onda-Android.apk`** → para tu celular
   - **`Onda-Windows-Setup.exe`** → para tu computadora

> También puedes descargarlos desde **Actions** → el trabajo terminado → sección **Artifacts** (vienen dentro de un .zip).

---

## Paso 6 — Instalar en tu celular Android

1. Descarga `Onda-Android.apk` **desde el celular** (abre la página de Releases en Chrome del celular), o pásalo por cable/WhatsApp/Drive.
2. Toca el archivo descargado.
3. Android dirá que no permite instalar apps de esta fuente → toca **Configuración** → activa **Permitir de esta fuente** → regresa.
4. Toca **Instalar**.
5. Si aparece **Google Play Protect** ("app no reconocida"): toca **Más detalles** → **Instalar de todas formas**. Sale porque la app no viene de la Play Store, no porque tenga algo malo.
6. Abre **Onda** → **Crear** → **Agregar canciones** y selecciona tu música (puedes seleccionar muchas a la vez).
7. La primera vez que pongas música, acepta el permiso de **notificaciones**: así aparecen los controles en la pantalla de bloqueo y la música sigue sonando con la pantalla apagada.

**Para actualizar:** instala el APK nuevo encima del anterior. Como siempre usa la misma firma, **no se borra tu música**.

---

## Paso 7 — Instalar en tu computadora (Windows)

1. Descarga `Onda-Windows-Setup.exe`.
2. Ábrelo. Windows mostrará **"Windows protegió su PC"** (porque la app no está firmada con un certificado de pago) → toca **Más información** → **Ejecutar de todas formas**.
3. Sigue el instalador (puedes elegir la carpeta). Se crea un acceso directo en el **Escritorio** y en el menú **Inicio**.
4. Abre **Onda** → **Agregar carpeta** y elige tu carpeta de música (lee también todas las subcarpetas).

**Para actualizar:** instala el .exe nuevo encima. Tu música se queda.

---

## Paso 8 — Conectar celular y computadora (Onda Connect)

1. Abre Onda en los dos (con internet).
2. En uno, toca el ícono de **conectar** (📲) y mira su **código de 6 números**.
3. En el otro, toca **conectar**, escribe ese código y dale **Conectar**.
4. Ya conectados: abre **Reproduciendo**, **mantén presionada la portada** y **lánzala hacia arriba**. La canción pasa al otro dispositivo en el mismo segundo.
5. La próxima vez se conectan solos.

---

## Cómo sacar versiones nuevas después

Cada vez que Claude te mande archivos nuevos:

```bash
git add .
git commit -m "Actualización"
git push
git tag v2.0.1
git push origin v2.0.1
```

Espera los ✅ en **Actions** y descarga los nuevos instaladores en **Releases**. La página web (https://adolfomanuelordonezsosa-hub.github.io/onda/) también se actualiza sola.

---

## Problemas comunes

| Problema | Solución |
|---|---|
| `git push` dice **rejected** | `git pull origin main --no-edit` y luego `git push` otra vez |
| La etiqueta ya existe | Usa otro número de versión (`v2.0.1`) |
| No aparece **Actions** o no corre | Revisa que exista la carpeta `.github/workflows/build.yml` en GitHub |
| El celular no deja instalar | Activa "Permitir de esta fuente" para Chrome o Archivos |
| No suenan algunas canciones | Onda te muestra cuáles; conviértelas a MP3 o FLAC (WMA y ALAC no funcionan en Android ni Windows) |
| "Escuchar completa" da error | Revisa tu internet; si dice cuota excedida, crea otra clave en Google Cloud y pégala en **Ajustes** |
| La música se corta con la pantalla apagada (Android) | Ajustes del celular → Apps → Onda → Batería → **Sin restricciones** |

---

**iPhone:** una app real de iPhone necesita una Mac y la cuenta de desarrollador de Apple (99 USD al año). En iPhone usa la versión web: abre el link en Safari → Compartir → **Agregar a pantalla de inicio**.
