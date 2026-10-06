import { useState } from 'react'
import { GameCanvas } from './components/GameCanvas'
import { MenuScreen } from './components/MenuScreen'
import type { GameStatus } from './game/types'
import './App.css'

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu')

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Arcade prototype</p>
        <h1>Pixel Dash</h1>
      </header>

      {gameStatus === 'menu' ? (
        <MenuScreen onPlay={() => setGameStatus('playing')} />
      ) : (
        <section className="game-screen" aria-label="Área de jogo Pixel Dash">
          <GameCanvas />
          <p className="stage-note">
            Use as setas ou as teclas A / D para mover o player pela arena.
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
