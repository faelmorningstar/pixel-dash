export const GAME_CONFIG = {
  durationSeconds: 30,
  initialLives: 3,
  player: {
    maxWidth: 54,
    minHorizontalPadding: 28,
    speed: 360,
  },
  collectible: {
    radius: 12,
    speed: 190,
    points: 10,
  },
  colors: {
    canvasBackground: 0x07111f,
    player: 0x5eead4,
    playerHighlight: 0xfef3c7,
    collectible: 0xfbbf24,
    collectibleHighlight: 0xfef3c7,
    star: 0xe0f2fe,
    track: 0x22d3ee,
    trackShadow: 0x0f2741,
  },
} as const
