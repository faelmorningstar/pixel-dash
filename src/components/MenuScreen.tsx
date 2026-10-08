type MenuScreenProps = {
  onPlay: () => void
}

export function MenuScreen({ onPlay }: MenuScreenProps) {
  return (
    <section className="menu-screen" aria-labelledby="menu-title">
      <div>
        <h2 id="menu-title">Colete energia. Sobreviva ao espaço.</h2>
        <p className="menu-description">
          Recupere energia enquanto desvia de destroços cósmicos em uma partida de
          30 segundos.
        </p>
      </div>

      <div className="instructions" aria-label="Instruções da partida">
        <h3>Como jogar</h3>
        <ul>
          <li>Use as setas para se mover.</li>
          <li>No celular, toque e segure a metade desejada da arena.</li>
          <li>Colete energia e evite os cometas vermelhos.</li>
        </ul>
      </div>

      <button className="primary-button" type="button" onClick={onPlay}>
        Jogar
      </button>
    </section>
  )
}
