import { useEffect, useRef } from 'react'
import { Application, Graphics } from 'pixi.js'
import { GAME_CONFIG } from '../game/config'

const STARS = [
  [0.08, 0.15, 2],
  [0.22, 0.33, 1],
  [0.39, 0.12, 2],
  [0.58, 0.24, 1],
  [0.73, 0.1, 2],
  [0.89, 0.38, 1],
  [0.16, 0.62, 1],
  [0.47, 0.55, 1],
  [0.83, 0.69, 2],
] as const

export function GameCanvas() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current

    if (!host) {
      return undefined
    }

    const app = new Application()
    let isDisposed = false
    let isInitialised = false

    const initialisePixi = async () => {
      await app.init({
        antialias: true,
        autoDensity: true,
        background: GAME_CONFIG.colors.canvasBackground,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        resizeTo: host,
      })
      isInitialised = true

      if (isDisposed) {
        app.destroy(true)
        return
      }

      app.canvas.setAttribute('aria-label', 'Arena inicial de Pixel Dash')
      app.canvas.setAttribute('role', 'img')
      host.appendChild(app.canvas)

      const backdrop = new Graphics()
      const stars = new Graphics()
      const track = new Graphics()
      const player = new Graphics()

      app.stage.addChild(backdrop, stars, track, player)

      const drawScene = () => {
        const { height, width } = app.screen
        const trackY = height - 60
        const playerWidth = Math.min(54, width * 0.14)
        const playerHeight = playerWidth * 0.62

        backdrop
          .clear()
          .rect(0, 0, width, height)
          .fill({ color: GAME_CONFIG.colors.canvasBackground })

        stars.clear()
        for (const [xRatio, yRatio, radius] of STARS) {
          stars
            .circle(xRatio * width, yRatio * height, radius)
            .fill({ color: GAME_CONFIG.colors.star })
        }

        track
          .clear()
          .rect(0, trackY, width, 2)
          .fill({ color: GAME_CONFIG.colors.track })
          .rect(0, trackY + 2, width, height - trackY - 2)
          .fill({ color: GAME_CONFIG.colors.trackShadow })

        player
          .clear()
          .roundRect(
            width / 2 - playerWidth / 2,
            trackY - playerHeight,
            playerWidth,
            playerHeight,
            10,
          )
          .fill({ color: GAME_CONFIG.colors.player })
          .rect(
            width / 2 - playerWidth * 0.23,
            trackY - playerHeight * 0.72,
            playerWidth * 0.46,
            4,
          )
          .fill({ color: GAME_CONFIG.colors.playerHighlight })
      }

      app.renderer.on('resize', drawScene)
      drawScene()
    }

    void initialisePixi()

    return () => {
      isDisposed = true
      if (isInitialised) {
        app.destroy(true)
      }
    }
  }, [])

  return <div className="pixi-canvas-host" ref={hostRef} />
}
