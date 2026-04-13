# Plano de Implementação: Portfolio Redesign Next.js

## Visão Geral

Migração incremental do portfólio estático (HTML + Vanilla JS) para Next.js 14+ com App Router, TypeScript e TailwindCSS. Cada tarefa constrói sobre a anterior, começando pela estrutura base e avançando até a integração final de todos os componentes.

## Tarefas

- [x] 1. Inicializar projeto Next.js e configurar base
  - [x] 1.1 Criar projeto Next.js com TypeScript e TailwindCSS
    - Executar `npx create-next-app@latest` com App Router, TypeScript e TailwindCSS
    - Configurar `tailwind.config.ts` com as cores do tema (#0a0a0a, #111, #1a1a1a, #333, #666, #999, #fff)
    - Configurar fonte Inter via `next/font/google` no `layout.tsx`
    - Configurar `globals.css` com estilos base (fundo #0a0a0a, texto branco)
    - Instalar dependências de teste: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `fast-check`, `jsdom`
    - Configurar `vitest.config.ts` com environment jsdom
    - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3_

  - [x] 1.2 Criar tipos e constantes compartilhados
    - Criar `lib/types.ts` com todas as interfaces (GitHubRepo, RepoMedia, ChatMessage, ChatbotResponse, WeatherAPIResponse, CurrencyPair, CurrencyAPIResponse, SupportedLanguage, TranslationResponse)
    - Criar `lib/constants.ts` com CHATBOT_API_URL, CURRENCY_API_URL, TRANSLATION_API_URL, EXCLUDED_REPOS, TOP_REPOS, THEME, SPOTIFY_SHOW_ID, GAME_URL, SOCIAL_LINKS
    - _Requisitos: 5.9, 5.3, 2.1, 2.2_

  - [x] 1.3 Migrar assets estáticos para `public/`
    - Copiar imagens de `img/` para `public/img/` (perfil2.jpeg, db.png, fiap.png, capa1.mp4)
    - Copiar CVs de `docs/` para `public/docs/`
    - _Requisitos: 4.7, 11.1, 11.3_

- [x] 2. Implementar layout global, Navbar e Footer
  - [x] 2.1 Criar componente Footer
    - Implementar `components/Footer.tsx` como Server Component
    - Exibir texto de copyright "© 2025 Diogo Bittencourt. Todos os direitos reservados."
    - Links para GitHub e LinkedIn
    - Estilizar com tema dark minimalista
    - _Requisitos: 14.1, 14.2, 14.3_

  - [x] 2.2 Criar componentes Navbar e NavbarClient
    - Implementar `components/Navbar.tsx` (Server Component shell) com logo "Diogo Bittencourt" à esquerda e links de navegação
    - Implementar `components/NavbarClient.tsx` (Client Component) com menu hamburger para telas < 768px
    - Navbar fixa no topo com backdrop-blur
    - Botão "Contato" com estilo diferenciado
    - Espaço reservado para LanguageSwitcher, WeatherWidget e CurrencyWidget (serão integrados depois)
    - _Requisitos: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 2.3 Configurar RootLayout com Navbar e Footer
    - Atualizar `app/layout.tsx` para incluir Navbar e Footer
    - Configurar metadata SEO global (title, description, og:image) via Metadata API
    - Adicionar componente GeometricBackground para elementos decorativos
    - _Requisitos: 1.1, 2.4, 15.2, 15.3_

- [x] 3. Implementar API Routes
  - [x] 3.1 Criar API Route `/api/github`
    - Implementar `app/api/github/route.ts` com função GET
    - Proxy para GitHub REST API usando `process.env.GITHUB_API_KEY`
    - Retornar 200 + JSON em sucesso, 500 + mensagem de erro em falha
    - Configurar cabeçalhos CORS
    - _Requisitos: 6.1, 6.3, 6.4, 6.5_

  - [x] 3.2 Criar API Route `/api/weather`
    - Implementar `app/api/weather/route.ts` com função GET
    - Ler query param "city" da URL
    - Proxy para OpenWeather API usando `process.env.OPENWEATHER_API_KEY`
    - Retornar 200 + JSON em sucesso, 500 + mensagem de erro em falha
    - Configurar cabeçalhos CORS
    - _Requisitos: 6.2, 6.3, 6.4, 6.5_

  - [ ]* 3.3 Escrever testes de propriedade para API Routes
    - **Propriedade 4: API Route retorna 200 com JSON e CORS em caso de sucesso**
    - **Valida: Requisitos 6.3, 6.5**
    - **Propriedade 5: API Route retorna 500 com mensagem de erro em caso de falha**
    - **Valida: Requisito 6.4**

- [x] 4. Checkpoint — Verificar estrutura base
  - Garantir que o projeto compila sem erros, API Routes funcionam e todos os testes passam. Perguntar ao usuário se há dúvidas.

- [x] 5. Implementar HeroSection e página Home
  - [x] 5.1 Criar componente HeroSection
    - Implementar `components/HeroSection.tsx` como Server Component
    - Título "Diogo Bittencourt", tagline, parágrafo de apresentação
    - Botões CTA: "Fale Comigo" (scroll para contato) e "Ver Projetos" (scroll para portfolio)
    - Foto perfil2.jpeg via `next/image` no lado direito (desktop), abaixo (mobile)
    - Elementos geométricos decorativos no fundo
    - _Requisitos: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 15.1_

  - [x] 5.2 Criar componente GeometricBackground
    - Implementar `components/GeometricBackground.tsx` com elementos SVG/CSS decorativos
    - Linhas de grid e formas geométricas sutis como fundo
    - _Requisitos: 2.4_

  - [x] 5.3 Montar página Home (`app/page.tsx`)
    - Compor HeroSection + espaços reservados para PortfolioSection, GameEmbed, PodcastPlayer e ContactSection
    - Configurar metadata SEO específica da página
    - _Requisitos: 15.2_

- [x] 6. Implementar Portfolio Section e ProjectCard
  - [x] 6.1 Criar função utilitária de extração de mídia do README
    - Implementar em `lib/utils.ts` a função `extractMediaLinks` que extrai URLs de mídia de conteúdo Markdown
    - Converter caminhos relativos para URLs absolutas do `raw.githubusercontent.com`
    - Preservar URLs absolutas inalteradas
    - _Requisitos: 5.4_

  - [ ]* 6.2 Escrever teste de propriedade para extração de mídia
    - **Propriedade 1: Extração de mídia do README**
    - **Valida: Requisitos 5.4, 5.5**

  - [x] 6.3 Criar função utilitária de filtragem de repositórios
    - Implementar em `lib/utils.ts` a função `filterRepos` que filtra repos pela lista de exclusão
    - Implementar função `getTopRepos` que retorna apenas os repos destacados
    - _Requisitos: 5.9, 5.10_

  - [ ]* 6.4 Escrever teste de propriedade para filtragem de repositórios
    - **Propriedade 2: Filtragem de repositórios excluídos**
    - **Valida: Requisitos 5.9, 5.10**

  - [x] 6.5 Criar componente ProjectCard
    - Implementar `components/ProjectCard.tsx` como Client Component
    - Buscar README do repo para extrair mídia (imagem/vídeo)
    - Exibir mídia, nome e descrição do repositório
    - Placeholder "Sem mídia" quando não há mídia no README
    - Hover: escala sutil + borda monocromática
    - Click: abre repo no GitHub em nova aba (`target="_blank"`)
    - _Requisitos: 5.4, 5.5, 5.6, 5.7, 5.8_

  - [ ]* 6.6 Escrever teste de propriedade para link do ProjectCard
    - **Propriedade 3: Link do ProjectCard aponta para o repositório correto**
    - **Valida: Requisito 5.7**

  - [x] 6.7 Criar componente PortfolioSection
    - Implementar `components/PortfolioSection.tsx` como Client Component
    - Buscar repos via `/api/github`, filtrar excluídos
    - Prop `showAll`: false = top 3 (home), true = todos (página /projetos)
    - Renderizar ProjectCard para cada repo
    - Fallback em caso de erro da API
    - _Requisitos: 5.1, 5.2, 5.3, 5.9, 5.10_

  - [x] 6.8 Criar página `/projetos`
    - Implementar `app/projetos/page.tsx` com PortfolioSection showAll=true
    - Configurar metadata SEO da página
    - _Requisitos: 5.10, 15.2_

- [x] 7. Checkpoint — Verificar portfolio funcional
  - Garantir que cards de projetos carregam, filtragem funciona e todos os testes passam. Perguntar ao usuário se há dúvidas.

- [x] 8. Implementar widgets da Navbar
  - [x] 8.1 Criar componente WeatherWidget
    - Implementar `components/WeatherWidget.tsx` como Client Component
    - Buscar dados via `/api/weather?city=Rio+de+Janeiro`
    - Exibir ícone + temperatura °C + "Rio"
    - Ocultar componente em caso de erro (sem mensagem)
    - _Requisitos: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 8.2 Escrever teste de propriedade para WeatherWidget
    - **Propriedade 6: Weather Widget renderiza dados corretamente**
    - **Valida: Requisito 7.2**

  - [x] 8.3 Criar componente CurrencyWidget
    - Implementar `components/CurrencyWidget.tsx` como Client Component
    - Buscar cotações via AwesomeAPI (client-side direto)
    - Exibir USD/BRL e EUR/BRL com valor "R$ X.XX" e seta de variação (verde/vermelha)
    - Ocultar componente em caso de erro
    - _Requisitos: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 8.4 Escrever teste de propriedade para CurrencyWidget
    - **Propriedade 7: Currency Widget formata e exibe variação corretamente**
    - **Valida: Requisitos 8.2, 8.3**

  - [x] 8.5 Criar componente LanguageSwitcher
    - Implementar `components/LanguageSwitcher.tsx` como Client Component
    - Ícone de globo + sigla do idioma atual
    - Dropdown com opções: PT 🇧🇷, EN 🇺🇸, ES 🇪🇸
    - Traduzir elementos `[data-translate]` via API MyMemory
    - Restaurar textos originais quando PT é selecionado
    - Persistir escolha no localStorage
    - Aplicar idioma salvo ao carregar a página
    - _Requisitos: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ]* 8.6 Escrever testes de propriedade para LanguageSwitcher
    - **Propriedade 8: Seleção de idioma round-trip via localStorage**
    - **Valida: Requisitos 9.4, 9.5**
    - **Propriedade 9: Restauração de textos originais ao selecionar PT**
    - **Valida: Requisitos 9.2, 9.3**

  - [x] 8.7 Integrar WeatherWidget, CurrencyWidget e LanguageSwitcher na Navbar
    - Atualizar Navbar/NavbarClient para incluir os três widgets
    - Garantir layout responsivo (widgets ocultos ou compactados em mobile)
    - _Requisitos: 3.6, 7.4, 9.6_

- [x] 9. Implementar ChatbotWidget
  - [x] 9.1 Criar componente ChatbotWidget
    - Implementar `components/ChatbotWidget.tsx` como Client Component
    - Botão flutuante fixo no canto inferior direito
    - Tooltip temporário após 3s, desaparece após 7s
    - Janela de chat com mensagens de boas-vindas ao abrir
    - POST para `https://chatbot-izuj.onrender.com/chat`
    - Indicador "digitando..." com animação de pontos
    - Renderizar links clicáveis nas respostas (URLs e Markdown links como `<a target="_blank">`)
    - Envio via Enter ou botão "Enviar"
    - Mensagem de erro amigável em caso de falha do servidor
    - _Requisitos: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9_

  - [ ]* 9.2 Escrever testes de propriedade para ChatbotWidget
    - **Propriedade 10: Chatbot envia mensagem e exibe resposta**
    - **Valida: Requisitos 10.3, 10.5**
    - **Propriedade 11: Links clicáveis nas respostas do chatbot**
    - **Valida: Requisito 10.8**

- [x] 10. Checkpoint — Verificar widgets e chatbot
  - Garantir que todos os widgets funcionam, chatbot comunica com backend e todos os testes passam. Perguntar ao usuário se há dúvidas.

- [x] 11. Implementar seções restantes e página Sobre Mim
  - [x] 11.1 Criar componente ContactSection
    - Implementar `components/ContactSection.tsx` com links para GitHub e LinkedIn
    - Estilizar com tema dark minimalista
    - _Requisitos: 14.1_

  - [x] 11.2 Criar componente PodcastPlayer
    - Implementar `components/PodcastPlayer.tsx` como Client Component
    - Iframe Spotify embed com show ID `32YZwmC1KyYd6Crfc44veY`
    - Largura 100%, altura 152px, `loading="lazy"`, bordas arredondadas
    - _Requisitos: 12.1, 12.2, 12.3_

  - [x] 11.3 Criar componente GameEmbed
    - Implementar `components/GameEmbed.tsx` como Client Component
    - Iframe para `https://editor.p5js.org/diogobitten/full/xCNjsYa9_`
    - Visível apenas em telas > 768px (`hidden md:block`)
    - Dimensões 600x442px com bordas arredondadas
    - _Requisitos: 13.1, 13.2, 13.3_

  - [x] 11.4 Criar página Sobre Mim (`app/sobre-mim/page.tsx`)
    - Foto de perfil via `next/image`, nome, título profissional, descrição detalhada
    - Botão download CV (link para `/docs/cv_diogo_bittencourt_dev_brasil.pdf`)
    - Links GitHub e LinkedIn com ícones
    - Logo FIAP com informação sobre formação
    - Link para portfólio de design externo (Wix)
    - Configurar metadata SEO da página
    - _Requisitos: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 15.1, 15.2_

  - [x] 11.5 Integrar todas as seções na página Home
    - Atualizar `app/page.tsx` para incluir HeroSection, PortfolioSection (top 3), GameEmbed, PodcastPlayer e ContactSection
    - Garantir ordem e espaçamento corretos entre seções
    - _Requisitos: 5.3, 12.1, 13.1, 14.1_

- [x] 12. Implementar SEO e metadados finais
  - [x] 12.1 Configurar metadata SEO em todas as páginas
    - Verificar e ajustar title, description e og:image em `/`, `/projetos` e `/sobre-mim`
    - Garantir que Server Components são usados por padrão e Client Components apenas onde necessário (`"use client"`)
    - _Requisitos: 15.2, 15.3, 15.4_

  - [ ]* 12.2 Escrever teste de propriedade para metadados SEO
    - **Propriedade 12: Metadados SEO presentes em todas as páginas**
    - **Valida: Requisito 15.2**

- [x] 13. Responsividade e polish visual
  - [x] 13.1 Revisar e ajustar responsividade de todos os componentes
    - Testar e corrigir layout em breakpoints mobile (< 768px), tablet e desktop
    - Garantir que Hero empilha verticalmente em mobile, GameEmbed oculto em mobile, Navbar colapsa em hamburger
    - Verificar transições e hover effects suaves em elementos interativos
    - _Requisitos: 2.5, 2.6, 3.5, 4.8, 13.2_

- [x] 14. Checkpoint final — Garantir que tudo funciona
  - Garantir que todos os testes passam, todas as páginas renderizam corretamente, navegação funciona, widgets carregam dados e chatbot responde. Perguntar ao usuário se há dúvidas.

## Notas

- Tarefas marcadas com `*` são opcionais e podem ser puladas para um MVP mais rápido
- Cada tarefa referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Testes de propriedade validam propriedades universais de corretude definidas no design
- Testes unitários validam exemplos específicos e edge cases
