# Tech Stack & Build System

## Frontend (Legacy HTML Site)
- HTML5 (multi-page, no SPA framework)
- TailwindCSS via CDN (`https://cdn.tailwindcss.com`) — utility-first styling, no build step
- Custom CSS in `css/styles.css` for animations, scrollbar, chatbot, and card hover effects
- Vanilla JavaScript (ES6+, no bundler)
- Font Awesome 5.15.3 + 6.4.2 (CDN)
- Google Fonts: Roboto
- flag-icon-css 4.1.4 (CDN)

## Frontend (Next.js Portfolio)
- Next.js with App Router (React Server + Client Components)
- TypeScript
- TailwindCSS (built-in, not CDN)
- Inter font via `next/font/google`
- `next/image` for optimized images
- Canvas API for animations (ParticlesBackground, FallingVaders)
- CSS transitions for parallax mouse interaction (ParallaxPhoto)
- Custom cursor via fixed-position divs + `requestAnimationFrame` (CustomCursor)

## Backend / Serverless Functions
- Vercel serverless functions in `api/` directory (Node.js, ESM `export default`)
- Next.js API routes in `portfolio-nextjs/app/api/` (github, weather)
- `api/github.js` — proxies GitHub API requests, uses `process.env.GITHUB_API_KEY`
- `api/weather.js` — proxies OpenWeather API, uses `process.env.OPENWEATHER_API_KEY`
- External chatbot backend: removed — now uses OpenAI Assistants API via Next.js API route `/api/chat`
- OpenAI SDK (`openai` npm package) for Assistants API

## External APIs
- GitHub REST API — fetch user repositories
- OpenWeather API — current weather for Rio de Janeiro
- AwesomeAPI (`economia.awesomeapi.com.br`) — USD/BRL and EUR/BRL exchange rates
- MyMemory Translation API — runtime page translation
- OpenAI API — used by the external chatbot backend (not in this repo)

- `OPENAI_API_KEY` — OpenAI API key (for Diobot chatbot via Assistants API)

## Hosting
- Frontend: Vercel (Next.js + serverless functions, including chatbot API)

## Environment Variables
Required in `.env` (never committed):
- `GITHUB_API_KEY` — GitHub personal access token
- `OPENWEATHER_API_KEY` — OpenWeather API key

## Common Commands
```bash
# Install dependencies (Next.js)
cd portfolio-nextjs && npm install

# Start local dev server (Next.js)
cd portfolio-nextjs && npm run dev

# Start local dev server (Legacy — Vercel CLI)
npm start

# Deploy (handled by Vercel Git integration)
git push origin main
```

## Key Conventions
- API keys are never hardcoded in frontend code; serverless functions act as proxies
- Legacy site: No build/compile step — Tailwind is loaded from CDN, JS is vanilla
- Legacy site: All pages load `JS/scripts.js` at the bottom of `<body>`
- Legacy site: Sidebar is loaded dynamically via `fetch('sidebar.html')` and injected into `#sidebarContainer`
- Legacy site: Translatable elements use the `data-translate` HTML attribute
- Next.js: Client components use `'use client'` directive
- Next.js: Canvas-based animations (particles, vaders) use `requestAnimationFrame` loops
- Next.js: Mouse events for canvas components are attached to parent element (not canvas) since canvas has `pointer-events: none`
- Next.js: Default cursor is hidden globally; CustomCursor component renders custom dot + ring
- Next.js: Hero section background is `bg-black` to blend with profile photo background
