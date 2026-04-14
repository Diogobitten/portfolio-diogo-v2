# Documento de Requisitos

## Introdução

Redesign completo do portfólio pessoal de Diogo Bittencourt, migrando de um site estático multi-página (HTML5 + Vanilla JS) para uma aplicação Next.js com React e TailwindCSS. O novo design segue uma estética dark, minimalista e monocromática, com elementos geométricos decorativos, tipografia limpa e layout inspirado em referência visual fornecida. Todas as funcionalidades existentes devem ser preservadas e adaptadas à nova arquitetura.

## Glossário

- **App**: A aplicação Next.js do portfólio como um todo
- **Navbar**: Barra de navegação horizontal fixa no topo da página, substituindo a sidebar colapsável atual
- **Hero_Section**: Seção principal da página inicial com nome, tagline, descrição, botões CTA e foto de perfil
- **Portfolio_Section**: Seção que exibe os cards de projetos buscados dinamicamente da API do GitHub
- **Project_Card**: Componente de card individual que exibe informações de um repositório GitHub (nome, descrição, mídia do README)
- **Chatbot_Widget**: Widget flutuante do Diobot (chatbot IA) que permite interação via chat com backend externo
- **Weather_Widget**: Componente que exibe a temperatura atual do Rio de Janeiro via API OpenWeather
- **Currency_Widget**: Componente que exibe as cotações USD/BRL e EUR/BRL via AwesomeAPI
- **Language_Switcher**: Componente seletor de idioma (PT/EN/ES) que traduz o conteúdo da página via API MyMemory
- **About_Section**: Seção/página "Sobre Mim" com informações pessoais, habilidades, formação e experiência
- **Podcast_Player**: Player embutido do Spotify para o podcast do Diogo
- **Game_Embed**: Iframe embutido do jogo Pong Invaders (p5.js)
- **API_Route**: Rota de API do Next.js (substituindo as serverless functions do Vercel em `api/`)
- **Theme_System**: Sistema de cores e estilos dark/minimalista aplicado globalmente

## Requisitos

### Requisito 1: Inicialização do Projeto Next.js

**User Story:** Como desenvolvedor, eu quero migrar o portfólio para Next.js com TailwindCSS, para que eu tenha uma base moderna com React, roteamento automático e otimizações de performance.

#### Critérios de Aceitação

1. THE App SHALL ser uma aplicação Next.js utilizando o App Router (diretório `app/`)
2. THE App SHALL utilizar TailwindCSS instalado via npm (não via CDN)
3. THE App SHALL manter compatibilidade com deploy na Vercel
4. THE App SHALL utilizar TypeScript para tipagem estática dos componentes e funções
5. THE App SHALL incluir configuração de fontes via `next/font` com a fonte Inter ou equivalente sans-serif moderna

### Requisito 2: Design Visual Dark Minimalista

**User Story:** Como visitante, eu quero ver um portfólio com design dark, limpo e profissional, para que a experiência visual transmita modernidade e sofisticação.

#### Critérios de Aceitação

1. THE Theme_System SHALL utilizar fundo escuro (#0a0a0a ou similar) como cor de fundo principal
2. THE Theme_System SHALL aplicar uma paleta monocromática com tons de cinza (#111, #1a1a1a, #333, #666, #999, #fff) como cores de acento
3. THE Theme_System SHALL utilizar tipografia sans-serif limpa com hierarquia clara (títulos grandes e bold, textos menores e regulares)
4. THE App SHALL exibir elementos geométricos decorativos (linhas de grid, cubos) como fundo sutil em seções-chave
5. THE App SHALL aplicar transições e hover effects suaves nos elementos interativos (botões, cards, links)
6. THE App SHALL ser totalmente responsivo, adaptando o layout para desktop, tablet e mobile

### Requisito 3: Navbar Superior

**User Story:** Como visitante, eu quero uma barra de navegação fixa no topo, para que eu possa navegar facilmente entre as seções do portfólio.

#### Critérios de Aceitação

1. THE Navbar SHALL exibir o nome/logo "Diogo Bittencourt" alinhado à esquerda
2. THE Navbar SHALL exibir links de navegação (Portfólio, Sobre Mim, Blog, FAQ, Contato) centralizados ou alinhados à direita
3. THE Navbar SHALL incluir um botão de destaque "Contato" com estilo diferenciado (borda ou fundo contrastante)
4. THE Navbar SHALL permanecer fixa no topo durante a rolagem da página (sticky/fixed)
5. WHEN a largura da tela for menor que 768px, THE Navbar SHALL colapsar os links em um menu hamburger acessível
6. THE Navbar SHALL incluir o Language_Switcher integrado

### Requisito 4: Hero Section

**User Story:** Como visitante, eu quero ver uma seção hero impactante ao acessar o portfólio, para que eu entenda rapidamente quem é o Diogo e o que ele faz.

#### Critérios de Aceitação

1. THE Hero_Section SHALL exibir o nome "Diogo Bittencourt" como título principal em destaque
2. THE Hero_Section SHALL exibir uma tagline descritiva (ex: "Software Developer & Designer Gráfico")
3. THE Hero_Section SHALL exibir um parágrafo curto de apresentação profissional
4. THE Hero_Section SHALL exibir dois botões CTA: "Fale Comigo" e "Ver Projetos"
5. WHEN o botão "Fale Comigo" for clicado, THE App SHALL rolar até a seção de contato ou abrir o Chatbot_Widget
6. WHEN o botão "Ver Projetos" for clicado, THE App SHALL rolar até a Portfolio_Section
7. THE Hero_Section SHALL exibir a foto profissional do Diogo (perfil2.jpeg) no lado direito do layout desktop
8. WHEN a largura da tela for menor que 768px, THE Hero_Section SHALL empilhar o conteúdo verticalmente (texto acima, foto abaixo)

### Requisito 5: Portfolio Section com Cards Dinâmicos do GitHub

**User Story:** Como visitante, eu quero ver os projetos do Diogo com cards visuais dinâmicos, para que eu possa explorar seu trabalho de forma atrativa.

#### Critérios de Aceitação

1. THE Portfolio_Section SHALL exibir o título "Descubra o que eu criei" ou equivalente
2. WHEN a página for carregada, THE Portfolio_Section SHALL buscar os repositórios do GitHub via API_Route `/api/github`
3. THE Portfolio_Section SHALL exibir os 3 repositórios destacados (disub-translator, linkin-park-project, fintech-java-app) na página inicial
4. THE Project_Card SHALL exibir a mídia extraída do README do repositório (imagem ou vídeo)
5. THE Project_Card SHALL exibir o nome e a descrição do repositório
6. WHEN nenhuma mídia for encontrada no README, THE Project_Card SHALL exibir um placeholder visual com texto "Sem mídia"
7. WHEN o Project_Card for clicado, THE App SHALL abrir o repositório no GitHub em uma nova aba
8. THE Project_Card SHALL aplicar efeito hover com escala e/ou borda sutil no estilo monocromático
9. THE Portfolio_Section SHALL filtrar repositórios da lista de exclusão (Diogobitten, readme-jokes, snk, rafaballerini, ABSphreak)
10. THE App SHALL incluir uma página dedicada `/projetos` que exibe todos os repositórios (exceto os vetados)

### Requisito 6: API Routes do Next.js

**User Story:** Como desenvolvedor, eu quero migrar as serverless functions para API Routes do Next.js, para que as chaves de API continuem protegidas no servidor.

#### Critérios de Aceitação

1. THE API_Route `/api/github` SHALL fazer proxy das requisições para a API REST do GitHub utilizando a variável de ambiente `GITHUB_API_KEY`
2. THE API_Route `/api/weather` SHALL fazer proxy das requisições para a API OpenWeather utilizando a variável de ambiente `OPENWEATHER_API_KEY`
3. THE API_Route SHALL retornar status 200 com os dados JSON da API externa em caso de sucesso
4. IF a API externa retornar erro, THEN THE API_Route SHALL retornar status 500 com mensagem de erro descritiva em JSON
5. THE API_Route SHALL configurar cabeçalhos CORS permitindo acesso da própria aplicação

### Requisito 7: Widget de Clima em Tempo Real

**User Story:** Como visitante, eu quero ver a temperatura atual do Rio de Janeiro, para que o portfólio tenha um toque dinâmico e pessoal.

#### Critérios de Aceitação

1. WHEN a página for carregada, THE Weather_Widget SHALL buscar a temperatura atual do Rio de Janeiro via API_Route `/api/weather`
2. THE Weather_Widget SHALL exibir o ícone do clima, a temperatura em °C e o nome da cidade ("Rio")
3. IF a API retornar erro, THEN THE Weather_Widget SHALL ocultar o componente sem exibir erro ao visitante
4. THE Weather_Widget SHALL ser posicionado na Navbar ou no header da página de forma discreta

### Requisito 8: Widget de Cotação de Moedas

**User Story:** Como visitante, eu quero ver as cotações USD/BRL e EUR/BRL atualizadas, para que o portfólio demonstre integração com dados em tempo real.

#### Critérios de Aceitação

1. WHEN a página for carregada, THE Currency_Widget SHALL buscar as cotações USD/BRL e EUR/BRL via AwesomeAPI
2. THE Currency_Widget SHALL exibir o valor de compra (bid) formatado em Reais (R$) para cada moeda
3. THE Currency_Widget SHALL exibir um ícone de seta para cima (verde) ou para baixo (vermelho) indicando a variação
4. IF a API retornar erro, THEN THE Currency_Widget SHALL ocultar o componente sem exibir erro ao visitante

### Requisito 9: Suporte Multi-idioma (PT/EN/ES)

**User Story:** Como visitante internacional, eu quero poder trocar o idioma do site, para que eu consiga ler o conteúdo na minha língua.

#### Critérios de Aceitação

1. THE Language_Switcher SHALL oferecer três opções de idioma: Português (PT), English (EN) e Español (ES)
2. WHEN um idioma diferente de PT for selecionado, THE Language_Switcher SHALL traduzir todos os textos marcados com atributo `data-translate` via API MyMemory
3. WHEN o idioma PT for selecionado, THE Language_Switcher SHALL restaurar os textos originais em português
4. THE Language_Switcher SHALL persistir a escolha de idioma no localStorage do navegador
5. WHEN a página for carregada, THE Language_Switcher SHALL aplicar automaticamente o idioma salvo no localStorage
6. THE Language_Switcher SHALL ser integrado à Navbar de forma compacta (ícone de globo + sigla do idioma)

### Requisito 10: Chatbot Diobot (IA)

**User Story:** Como visitante, eu quero interagir com um chatbot inteligente sobre o Diogo, para que eu possa tirar dúvidas de forma rápida e interativa.

#### Critérios de Aceitação

1. THE Chatbot_Widget SHALL exibir um botão flutuante fixo no canto inferior direito da tela
2. WHEN o botão do chatbot for clicado, THE Chatbot_Widget SHALL abrir uma janela de chat com mensagens de boas-vindas
3. WHEN o visitante enviar uma mensagem, THE Chatbot_Widget SHALL enviar a mensagem via POST para `https://chatbot-izuj.onrender.com/chat`
4. WHILE aguardando a resposta do servidor, THE Chatbot_Widget SHALL exibir indicador de "digitando..." com animação de pontos
5. WHEN a resposta do servidor for recebida, THE Chatbot_Widget SHALL exibir a mensagem do bot no chat
6. IF o servidor retornar erro, THEN THE Chatbot_Widget SHALL exibir mensagem "Erro ao se conectar ao chatbot"
7. THE Chatbot_Widget SHALL suportar envio de mensagem via botão "Enviar" e via tecla Enter
8. THE Chatbot_Widget SHALL renderizar links clicáveis nas respostas do bot
9. WHEN a página for carregada, THE Chatbot_Widget SHALL exibir um tooltip temporário ("Olá! Veja por que você deve contratar o Diogo 😄") após 3 segundos, desaparecendo após 7 segundos

### Requisito 11: Página Sobre Mim

**User Story:** Como visitante, eu quero conhecer o perfil profissional do Diogo em detalhes, para que eu possa avaliar suas qualificações.

#### Critérios de Aceitação

1. THE About_Section SHALL exibir a foto de perfil do Diogo (perfil2.jpeg) em destaque
2. THE About_Section SHALL exibir nome, título profissional e descrição detalhada sobre formação e experiência
3. THE About_Section SHALL incluir botão para download do CV em PDF (cv_diogo_bittencourt_dev_brasil.pdf)
4. THE About_Section SHALL exibir links para GitHub e LinkedIn com ícones clicáveis
5. THE About_Section SHALL exibir informação sobre a instituição de ensino (FIAP) com logo
6. THE About_Section SHALL manter o link para o portfólio de design externo (Wix)

### Requisito 12: Podcast Player Embutido

**User Story:** Como visitante, eu quero ouvir o podcast do Diogo diretamente no portfólio, para que eu possa conhecer mais sobre ele de forma multimídia.

#### Critérios de Aceitação

1. THE Podcast_Player SHALL embutir o player do Spotify via iframe com o show ID `32YZwmC1KyYd6Crfc44veY`
2. THE Podcast_Player SHALL ter largura responsiva (100% do container) e altura fixa de 152px
3. THE Podcast_Player SHALL utilizar carregamento lazy (`loading="lazy"`)

### Requisito 13: Jogo Pong Invaders Embutido

**User Story:** Como visitante, eu quero jogar Pong Invaders no portfólio, para que a experiência seja interativa e divertida.

#### Critérios de Aceitação

1. THE Game_Embed SHALL embutir o jogo via iframe apontando para `https://editor.p5js.org/diogobitten/full/xCNjsYa9_`
2. THE Game_Embed SHALL ser visível apenas em telas com largura maior que 768px (desktop)
3. THE Game_Embed SHALL ter dimensões adequadas (600x442px) com bordas arredondadas

### Requisito 14: Seção de Contato e Footer

**User Story:** Como visitante, eu quero encontrar facilmente as informações de contato do Diogo, para que eu possa entrar em contato profissionalmente.

#### Critérios de Aceitação

1. THE App SHALL exibir uma seção de contato com links para GitHub e LinkedIn
2. THE App SHALL exibir um footer com texto de copyright "© 2025 Diogo Bittencourt. Todos os direitos reservados."
3. THE App SHALL estilizar o footer de acordo com o tema dark minimalista

### Requisito 15: Performance e SEO

**User Story:** Como desenvolvedor, eu quero que o portfólio tenha boa performance e SEO, para que o site carregue rápido e seja encontrado em buscadores.

#### Critérios de Aceitação

1. THE App SHALL utilizar o componente `next/image` para otimização automática de imagens
2. THE App SHALL definir metadados SEO (title, description, og:image) em cada página via Metadata API do Next.js
3. THE App SHALL utilizar Server Components por padrão, reservando Client Components apenas para interatividade (chatbot, widgets, language switcher)
4. WHEN componentes utilizarem APIs do navegador (localStorage, fetch client-side), THE App SHALL marcá-los com a diretiva `"use client"`
