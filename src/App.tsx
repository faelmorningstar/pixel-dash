import { useCallback, useRef, useState } from 'react'
import { GameCanvas } from './components/GameCanvas'
import { GameOverScreen } from './components/GameOverScreen'
import { MenuScreen } from './components/MenuScreen'
import { GAME_CONFIG } from './game/config'
import type { GameStatus } from './game/types'
import './App.css'

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState<number>(GAME_CONFIG.initialLives)
  const livesRef = useRef<number>(GAME_CONFIG.initialLives)

  const startGame = () => {
    setScore(0)
    livesRef.current = GAME_CONFIG.initialLives
    setLives(GAME_CONFIG.initialLives)
    setGameStatus('playing')
  }

  const collectPoints = useCallback((points: number) => {
    setScore((currentScore) => currentScore + points)
  }, [])

  const loseLife = useCallback(() => {
    const nextLives = Math.max(livesRef.current - 1, 0)
    livesRef.current = nextLives
    setLives(nextLives)

    if (nextLives === 0) {
      setGameStatus('gameOver')
    }
  }, [])

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Arcade prototype</p>
        <h1>Pixel Dash</h1>
      </header>

      {gameStatus === 'menu' ? (
        <MenuScreen onPlay={startGame} />
      ) : gameStatus === 'playing' ? (
        <section className="game-screen" aria-label="Área de jogo Pixel Dash">
          <div className="hud" aria-live="polite">
            <div>
              <span>Pontos</span>
              <strong>{score}</strong>
            </div>
            <div>
              <span>Vidas</span>
              <strong>{lives}</strong>
            </div>
          </div>
          <GameCanvas onCollect={collectPoints} onHit={loseLife} />
          <p className="stage-note">
            Colete energias douradas e evite os obstáculos vermelhos.
          </p>
          <button
            className="text-button"
            type="button"
            onClick={() => setGameStatus('menu')}
          >
            Voltar ao menu
          </button>
        </section>
      ) : (
        <GameOverScreen score={score} onRestart={startGame} />
      )}
    </main>
  )
}

export default App
