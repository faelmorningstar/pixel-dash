import { useCallback, useState } from 'react'
import { GameCanvas } from './components/GameCanvas'
import { MenuScreen } from './components/MenuScreen'
import type { GameStatus } from './game/types'
import './App.css'

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu')
  const [score, setScore] = useState(0)

  const startGame = () => {
    setScore(0)
    setGameStatus('playing')
  }

  const collectPoints = useCallback((points: number) => {
    setScore((currentScore) => currentScore + points)
  }, [])

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Arcade prototype</p>
        <h1>Pixel Dash</h1>
      </header>

      {gameStatus === 'menu' ? (
        <MenuScreen onPlay={startGame} />
      ) : (
        <section className="game-screen" aria-label="Área de jogo Pixel Dash">
          <div className="hud" aria-live="polite">
            <span>Pontos</span>
            <strong>{score}</strong>
          </div>
          <GameCanvas onCollect={collectPoints} />
          <p className="stage-note">
            Mova-se com as setas ou A / D e colete as energias douradas.
          </p>
          <button
            className="text-button"
            type="button"
            onClick={() => setGameStatus('menu')}
          >
            Voltar ao menu
          </button>
        </section>
      )}
    </main>
  )
}

export default App
