# Royal Wedding Invitation - Krina & Mayur

A fast, lightweight, standalone **HTML5, CSS3, and JavaScript** royal wedding invitation website, fully optimized for GitHub and one-click Vercel deployment.

---

## 📂 Clean Project Structure

```
├── index.html              # Clean semantic HTML website
├── vercel.json             # Vercel deployment configuration & caching headers
├── .gitignore              # Clean repository gitignore
├── css/
│   ├── styles.css          # Core styles & animations (responsive for mobile & desktop)
│   └── fonts.css           # Self-hosted @font-face rules (no render-blocking @import)
├── js/
│   ├── main.js             # Interactive scripts (gate opening, dials, gallery, music, RSVP)
│   ├── lenis.min.js        # Smooth momentum scrolling
│   ├── gsap.min.js         # GSAP animations
│   └── ScrollTrigger.min.js# Scroll-triggered reveals
├── media/
│   ├── wedding_logo.png    # Krina & Mayur royal wedding monogram crest
│   ├── garden_palace.mp4   # Dusk palace hero video
│   ├── garden_palace_poster.webp # Instant mobile poster fallback
│   ├── mandap_dusk.webp    # Desktop mandap background
│   ├── floral1.png         # Royal golden floral ornaments
│   ├── elephant.png        # Royal elephant artwork
│   ├── section_divider.svg # Torn parchment divider
│   ├── photos/             # Couple photo gallery (photo1.jpg, photo2.jpg, photo3.jpg)
│   ├── music/              # Jashn-e-bahara Instrumental audio track
│   └── symbols/            # Lord Ganesha emblem (_ganesha.svg)
├── fonts/                  # Self-hosted .woff2 fonts (Cormorant, Fraunces, Sora, Tiro)
├── start_server.bat        # Local test launcher (Windows)
└── serve.ps1               # Local test server (PowerShell)
```

---

## ⚡ Performance & Optimization Highlights

1. **Ultra-Clean Footprint**: Reduced project size by **>54%** (from 54.5 MB to 25.1 MB) by eliminating all unused template scrapings, dead assets, and redundant directories.
2. **Eliminated `@import` Waterfall**: `fonts.css` and `styles.css` load in parallel from `<head>`, saving an entire network round-trip.
3. **Preloaded Critical Assets**: Primary fonts, Lord Ganesha invocation emblem, and the couple's wedding logo are preloaded for instant rendering without font flashes or layout shifts.
4. **Deferred Scripts**: All JavaScript libraries load with `defer` so HTML parsing and First Contentful Paint (FCP) are never blocked.
5. **On-Demand Audio Streaming**: Audio preload is set to `none`, saving 3.9 MB of bandwidth on initial mobile loads until the user chooses to play or opens the royal gate.
6. **Edge CDN Caching**: Pre-configured `vercel.json` serves 1-year immutable caching (`max-age=31536000`) for all media and fonts on Vercel's global edge network.

---

## 🚀 How to Deploy to Vercel (Step-by-Step)

### Option 1: Via GitHub (Recommended)

1. **Initialize Git** in this folder (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Royal Wedding Invitation of Krina & Mayur"
   ```

2. **Push to your GitHub repository**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

3. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New..."** → **"Project"**.
   - Select your GitHub repository (`<YOUR-REPO-NAME>`).
   - Framework Preset: **Other** (Vercel automatically detects static `index.html`).
   - Click **"Deploy"**.
   - Your invitation is now live with a free custom SSL domain (e.g., `krina-mayur.vercel.app`)!

---

### Option 2: Local Preview

- Double-click **`start_server.bat`** or run `powershell -ExecutionPolicy Bypass -File .\serve.ps1` to view locally at `http://localhost:8080/`.
- Or open **`index.html`** directly in any browser.
