# Project Structure

## Legacy HTML Site
```
├── api/                    # Vercel serverless functions (Node.js ESM)
│   ├── github.js           # GitHub API proxy
│   └── weather.js          # OpenWeather API proxy
├── css/
│   └── styles.css          # Custom CSS (animations, scrollbar, card effects, chatbot)
├── docs/                   # Downloadable documents (CV PDFs)
├── img/                    # Static assets (images, videos, favicon)
├── JS/
│   ├── scripts.js          # Main JS — sidebar, chatbot (AI), APIs, project cards, i18n
│   └── scripts FAQ(JS).js  # Alternate JS — FAQ-based chatbot (keyword matching, no AI)
├── index.html              # Home page
├── projetos.html           # Projects listing page
├── sobre-mim.html          # About me page
├── sidebar.html            # Sidebar component (loaded via fetch and injected)
├── header.html             # Header component (currently unused — header is inline in pages)
└── .gitignore
```

## Next.js Portfolio (`portfolio-nextjs/`)
```
├── app/
│   ├── layout.tsx           # Root layout (Navbar, Footer, ChatbotWidget, CustomCursor)
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles + Tailwind theme (custom cursor: none)
│   ├── favicon.ico          # Favicon (db.png)
│   ├── icon.png             # App icon (db.png, auto-detected by Next.js)
│   ├── projetos/page.tsx    # Projects page
│   ├── sobre-mim/page.tsx   # About me page
│   └── api/                 # API routes (github, weather, chat)
├── components/
│   ├── HeroSection.tsx      # Hero section (client component with score state)
│   ├── ParallaxPhoto.tsx    # Parallax depth photo (df.png foreground + d2.jpg background, scroll + mouse)
│   ├── ParticlesBackground.tsx  # Animated particle network with mouse interaction
│   ├── FallingVaders.tsx    # Falling Space Invaders with explosion on mouse hover + score callback
│   ├── GeometricBackground.tsx  # Subtle geometric grid + floating shapes
│   ├── CustomCursor.tsx     # Custom white dot + trailing ring cursor
│   ├── Navbar.tsx           # Sticky top navbar with db.png logo
│   ├── NavbarClient.tsx     # Mobile menu (client component)
│   ├── Footer.tsx
│   ├── ChatbotWidget.tsx
│   ├── ContactSection.tsx
│   ├── PortfolioSection.tsx
│   ├── ProjectCard.tsx
│   ├── WeatherWidget.tsx
│   ├── CurrencyWidget.tsx
│   ├── LanguageSwitcher.tsx
│   ├── PodcastPlayer.tsx
│   ├── GameEmbed.tsx        # Pong Invaders p5.js embed (centered, dark bg, responsive iframe)
├── lib/
│   ├── constants.ts
│   ├── types.ts
│   └── utils.ts
├── public/
│   ├── img/                 # Static images (diogo.png, df.png, d2.jpg, d1.jpg, db.png, vader.png, etc.)
│   └── docs/                # CV PDFs
└── package.json
```

## Architecture Notes (Legacy HTML)
- Multi-page static site, no SPA router. Each HTML page is a standalone document.
- Shared sidebar is in `sidebar.html` and dynamically injected via JS `fetch()` into a `#sidebarContainer` div on each page.
- `header.html` exists as a partial but is not currently fetched/injected — headers are written inline in each page.
- The `api/` folder contains Vercel serverless functions that proxy external API calls to keep secrets server-side.
- No component framework — UI is built with raw HTML + Tailwind utility classes + custom CSS.
- The `JS/` folder uses uppercase naming (not `js/`). Preserve this convention.

## Architecture Notes (Next.js)
- Next.js App Router with server and client components.
- HeroSection is a client component (manages vader kill score state).
- ParallaxPhoto, ParticlesBackground, FallingVaders, CustomCursor are all client components using canvas/refs.
- Hero section layers (bottom to top): GeometricBackground → ParticlesBackground → content (z-10) → FallingVaders (z-20).
- ParallaxPhoto layers: d2.jpg (background, z-0) → df.png (foreground, z-10, scale-125, object-contain).
- Custom cursor replaces default cursor globally via `cursor: none` in globals.css.
- Navbar uses `db.png` as logo icon instead of `</>` text.
- Chatbot uses OpenAI Assistants API (assistant ID: asst_KyYsohF9EIe6Mj23hfzUfJQX) via `/api/chat` route, no external backend.
- Custom dark scrollbar globally, extra dark variant for chatbot (`.chatbot-scroll` class).

## Key Images
- `diogo.png` — Main profile photo (black background, used in OpenGraph metadata)
- `df.png` — Profile photo with transparent background (foreground parallax layer)
- `d2.jpg` — Background with geometric elements (background parallax layer)
- `d1.jpg` — Profile photo with background (unused, replaced by df.png)
- `db.png` — DB logo (navbar icon + favicon)
- `d3.png` — Damage sprite (alternate pose, shown during vader hit with red overlay)
- `vader.png` — Space Invader sprite (falling animation + explosion interaction + pixel-perfect collision with df.png)
