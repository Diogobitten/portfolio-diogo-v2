# Portfólio de Diogo Bittencourt

Portfólio pessoal de Diogo Bittencourt — Desenvolvedor Full-stack & Designer Gráfico.

## Live Demo

![Portfólio Diogo Bittencourt](img/portfolio.gif)

## Tech Stack

- Next.js (App Router) + TypeScript + TailwindCSS
- OpenAI Assistants API (chatbot Diobot, sem backend externo)
- GitHub REST API (projetos com cache de 1h)
- OpenWeather API (clima Rio de Janeiro)
- AwesomeAPI (câmbio USD/EUR → BRL)
- Canvas API (partículas, Space Invaders, explosões)
- Vercel (hospedagem + serverless functions)

## Features

- Hero com parallax depth (foto em camadas + interação com mouse e scroll)
- Partículas animadas com conexões e repulsão ao mouse
- Space Invaders caindo com explosão ao toque do mouse + placar
- Cursor customizado (dot + ring)
- Chatbot IA (Diobot) via OpenAI Assistants API direto no Next.js
- Cards de projetos do GitHub com cache de imagens/READMEs (1h)
- Widgets de clima e câmbio
- Pong Invaders (jogo p5.js embarcado)
- Dark mode completo com scrollbar customizado
- Suporte multi-idioma (PT/EN/ES)

## Setup

```bash
cd portfolio-nextjs
npm install
```

Crie o arquivo `portfolio-nextjs/.env.local`:

```
GITHUB_API_KEY=seu_token_github
OPENWEATHER_API_KEY=sua_chave_openweather
OPENAI_API_KEY=sua_chave_openai
```

```bash
npm run dev
```

Acesse em [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy via Vercel. Adicione as variáveis de ambiente no dashboard do projeto (Settings → Environment Variables).

## Contato

- [LinkedIn](https://www.linkedin.com/in/diogo-bittencourt-de-oliveira/)
- [GitHub](https://github.com/Diogobitten)

## Licença

Este projeto está sob a licença MIT.
