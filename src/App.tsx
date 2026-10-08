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
  const [timeLeft, setTimeLeft] = useState<number>(GAME_CONFIG.durationSeconds)
  const livesRef = useRef<number>(GAME_CONFIG.initialLives)

  const startGame = () => {
    setScore(0)
    livesRef.current = GAME_CONFIG.initialLives
    setLives(GAME_CONFIG.initialLives)
    setTimeLeft(GAME_CONFIG.durationSeconds)
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

  const endGame = useCallback(() => {
    setGameStatus('gameOver')
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
            <div>
              <span>Tempo</span>
              <strong>{timeLeft}s</strong>
            </div>
          </div>
          <GameCanvas
            onCollect={collectPoints}
            onHit={loseLife}
            onTimeChange={setTimeLeft}
            onTimeUp={endGame}
          />
          <p className="stage-note">
            Use as setas ou A / D. No celular, toque e segure a metade desejada
            da arena.
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
