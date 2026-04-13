# Portfólio Diogo Bittencourt — Next.js

Portfólio pessoal de Diogo Bittencourt, desenvolvedor Full-stack e Designer Gráfico.

## Tech Stack

- Next.js (App Router) + TypeScript + TailwindCSS
- OpenAI Assistants API (chatbot Diobot)
- GitHub REST API (projetos com cache de 1h)
- OpenWeather API (clima Rio de Janeiro)
- AwesomeAPI (câmbio USD/EUR → BRL)
- Canvas API (partículas, Space Invaders, explosões)

## Features

- Hero com parallax depth (foto em camadas + interação com mouse)
- Partículas animadas com conexões e repulsão ao mouse
- Space Invaders caindo com explosão ao toque do mouse + placar
- Cursor customizado (dot + ring)
- Chatbot IA (Diobot) via OpenAI Assistants API
- Cards de projetos do GitHub com cache de imagens/READMEs
- Widget de clima e câmbio
- Pong Invaders (jogo p5.js embarcado)
- Dark mode completo com scrollbar customizado

## Setup

```bash
npm install
```

Crie o arquivo `.env.local`:

```
GITHUB_API_KEY=seu_token_github
OPENWEATHER_API_KEY=sua_chave_openweather
OPENAI_API_KEY=sua_chave_openai
```

```bash
npm run dev
```

## Deploy

Deploy via Vercel. Adicione as variáveis de ambiente no dashboard do projeto (Settings → Environment Variables).
