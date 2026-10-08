# Pixel Dash

Protótipo arcade 2D para navegador: controle um coletor espacial, recupere esferas de energia e desvie de destroços cósmicos antes que os 30 segundos terminem.

**Jogue agora:** [pixel-dash-rosy.vercel.app](https://pixel-dash-rosy.vercel.app/)

![Tecnologias](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white) ![Tecnologias](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white) ![Tecnologias](https://img.shields.io/badge/PixiJS-8-e91e63)

## O que foi construído

- Tela inicial, partida e game over controlados pelo React.
- Renderização 2D e loop de jogo com PixiJS.
- Movimento horizontal por teclado e por toque/click.
- Esferas coletáveis (+10 pontos), obstáculos, vidas e colisão.
- Partida de 30 segundos, placar e reinício.
- Canvas responsivo, testado em desktop e mobile.
- Modo de debug com a tecla `D`: FPS, estado, posição do jogador e hitboxes.

## Controles

| Ambiente | Controle |
| --- | --- |
| Desktop | Setas esquerda e direita |
| Mobile | Toque e segure a metade esquerda ou direita da arena |
| Debug | Tecla `D` |

## Executar localmente

```bash
git clone https://github.com/faelmorningstar/pixel-dash.git
cd pixel-dash
npm install
npm run dev
```

Outros comandos:

```bash
npm run lint
npm run build
```

## Arquitetura

```text
src/
├── components/       # Telas React e HUD
├── game/
│   ├── config.ts     # Duração, velocidades e dimensões
│   └── systems/      # Input de teclado e ponteiro
└── App.tsx           # Estado de interface e integração React ↔ Pixi
```

O React administra o estado de interface (`menu`, `playing`, `gameOver`) e exibe HUD, menu e resultado. O `GameCanvas` monta e desmonta o canvas PixiJS. No ticker do PixiJS, o jogo atualiza movimento, queda, colisões e cronômetro usando delta time. Eventos importantes, como coleta, dano e fim de tempo, voltam ao React por callbacks.

Para evitar atualizações desnecessárias da interface, o cronômetro só atualiza o React quando o segundo mostrado muda — não a cada frame. As entidades gráficas são reutilizadas e reposicionadas durante a partida, em vez de criar novos objetos continuamente.

## Decisões técnicas

- **PixiJS:** oferece renderização 2D baseada em canvas/WebGL e um ticker adequado ao loop de jogo, sem precisar criar um motor completo.
- **React + TypeScript:** mantém a interface declarativa e separada da lógica de renderização em tempo real.
- **Responsividade:** o canvas usa o tamanho do contêiner, limite de densidade de pixels e controles alternativos para toque.
- **Arte:** formas simples no canvas e ilustrações originais responsivas para manter a mecânica legível e o escopo viável.

## Limitações e próximos passos

Este é um recorte intencionalmente pequeno. Próximas evoluções possíveis:

- Sons, animações de entrada e níveis/dificuldade progressiva.
- Testes automatizados para regras de colisão e estado.
- Profiling e code splitting para reduzir o bundle inicial.
- **REST API:** `POST /scores` ao fim da partida e `GET /leaderboard` para ranking persistente.
- **WebSocket:** atualização em tempo real de ranking, eventos globais ou desafios ao vivo.

## Contexto

Projeto desenvolvido como estudo prático de React, TypeScript e PixiJS para demonstrar uma mecânica jogável pequena, organizada e explicável em uma entrevista de frontend para jogos.
