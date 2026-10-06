type GameOverScreenProps = {
  score: number
  onRestart: () => void
}

export function GameOverScreen({ score, onRestart }: GameOverScreenProps) {
  return (
    <section className="game-over-screen" aria-labelledby="game-over-title">
      <p className="eyebrow">Partida encerrada</p>
      <h2 id="game-over-title">Fim de jogo</h2>
      <p className="game-over-score">
        Pontuação final <strong>{score}</strong>
      </p>
      <button className="primary-button" type="button" onClick={onRestart}>
        Jogar novamente
      </button>
    </section>
  )
}
