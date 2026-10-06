type MenuScreenProps = {
  onPlay: () => void
}

export function MenuScreen({ onPlay }: MenuScreenProps) {
  return (
    <section className="menu-screen" aria-labelledby="menu-title">
      <div>
        <h2 id="menu-title">Corra pela rede. Colete energia.</h2>
        <p className="menu-description">
          Desvie das falhas digitais durante uma partida curta de 30 segundos.
        </p>
      </div>

      <div className="instructions" aria-label="Instruções da partida">
        <h3>Como jogar</h3>
        <ul>
          <li>Use as setas ou A / D para se mover.</li>
          <li>No celular, toque nos controles da tela.</li>
          <li>Colete energia e evite falhas digitais.</li>
        </ul>
      </div>

      <button className="primary-button" type="button" onClick={onPlay}>
        Jogar
      </button>
    </section>
  )
}
