import { useEffect, useRef } from 'react'
import { Application, Graphics, Text } from 'pixi.js'
import { GAME_CONFIG } from '../game/config'
import { createKeyboardInput } from '../game/systems/input'
import { createPointerInput } from '../game/systems/pointerInput'

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

type GameCanvasProps = {
  onCollect: (points: number) => void
  onHit: () => void
  onTimeChange: (seconds: number) => void
  onTimeUp: () => void
}

export function GameCanvas({
  onCollect,
  onHit,
  onTimeChange,
  onTimeUp,
}: GameCanvasProps) {
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
      const collectible = new Graphics()
      const obstacle = new Graphics()
      const debugOverlay = new Graphics()
      const debugText = new Text({
        text: '',
        style: {
          fill: 0xf8fafc,
          fontFamily: 'monospace',
          fontSize: 12,
        },
      })
      const keyboardInput = createKeyboardInput(window)
      const pointerInput = createPointerInput(app.canvas)
      let playerHeight = 0
      let playerWidth = 0
      let playerX = 0
      let minimumPlayerX = 0
      let maximumPlayerX = 0
      let trackY = 0
      let collectibleX = 0
      let collectibleY = 0
      let obstacleX = 0
      let obstacleY = 0
      let remainingSeconds: number = GAME_CONFIG.durationSeconds
      let displayedSeconds: number = GAME_CONFIG.durationSeconds
      let hasTimedOut = false
      let isDebugEnabled = false

      app.stage.addChild(
        backdrop,
        stars,
        track,
        collectible,
        obstacle,
        player,
        debugOverlay,
        debugText,
      )

      const resetCollectible = () => {
        collectibleX =
          minimumPlayerX + Math.random() * (maximumPlayerX - minimumPlayerX)
        collectibleY = -GAME_CONFIG.collectible.radius
        collectible.x = collectibleX
        collectible.y = collectibleY
      }

      const resetObstacle = () => {
        obstacleX =
          minimumPlayerX + Math.random() * (maximumPlayerX - minimumPlayerX)
        obstacleY = -GAME_CONFIG.obstacle.size
        obstacle.x = obstacleX
        obstacle.y = obstacleY
      }

      const drawScene = () => {
        const { height, width } = app.screen
        trackY = height - 60
        playerWidth = Math.min(GAME_CONFIG.player.maxWidth, width * 0.14)
        playerHeight = playerWidth * 0.62
        minimumPlayerX = GAME_CONFIG.player.minHorizontalPadding + playerWidth / 2
        maximumPlayerX = width - GAME_CONFIG.player.minHorizontalPadding - playerWidth / 2

        if (playerX === 0) {
          playerX = width / 2
        }

        playerX = Math.min(Math.max(playerX, minimumPlayerX), maximumPlayerX)

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
            -playerWidth / 2,
            -playerHeight,
            playerWidth,
            playerHeight,
            10,
          )
          .fill({ color: GAME_CONFIG.colors.player })
          .rect(
            -playerWidth * 0.23,
            -playerHeight * 0.72,
            playerWidth * 0.46,
            4,
          )
          .fill({ color: GAME_CONFIG.colors.playerHighlight })

        player.x = playerX
        player.y = trackY

        collectible
          .clear()
          .circle(0, 0, GAME_CONFIG.collectible.radius)
          .fill({ color: GAME_CONFIG.colors.collectible })
          .circle(-3, -3, 4)
          .fill({ color: GAME_CONFIG.colors.collectibleHighlight })

        if (collectibleX === 0) {
          resetCollectible()
        } else {
          collectibleX = Math.min(
            Math.max(collectibleX, minimumPlayerX),
            maximumPlayerX,
          )
          collectible.x = collectibleX
        }

        obstacle
          .clear()
          .roundRect(
            -GAME_CONFIG.obstacle.size / 2,
            -GAME_CONFIG.obstacle.size / 2,
            GAME_CONFIG.obstacle.size,
            GAME_CONFIG.obstacle.size,
            7,
          )
          .fill({ color: GAME_CONFIG.colors.obstacle })
          .rect(-7, -7, 14, 4)
          .fill({ color: GAME_CONFIG.colors.obstacleHighlight })

        if (obstacleX === 0) {
          resetObstacle()
        } else {
          obstacleX = Math.min(
            Math.max(obstacleX, minimumPlayerX),
            maximumPlayerX,
          )
          obstacle.x = obstacleX
        }
      }

      const isOverlappingPlayer = (
        entityX: number,
        entityY: number,
        entityHalfWidth: number,
        entityHalfHeight: number,
      ) => {
        const playerLeft = playerX - playerWidth / 2
        const playerRight = playerX + playerWidth / 2
        const playerTop = trackY - playerHeight

        return (
          entityX + entityHalfWidth >= playerLeft &&
          entityX - entityHalfWidth <= playerRight &&
          entityY + entityHalfHeight >= playerTop &&
          entityY - entityHalfHeight <= trackY
        )
      }

      const drawDebug = () => {
        debugOverlay.clear()
        debugOverlay.visible = isDebugEnabled
        debugText.visible = isDebugEnabled

        if (!isDebugEnabled) {
          return
        }

        const playerLeft = playerX - playerWidth / 2
        const playerTop = trackY - playerHeight
        const collectibleRadius = GAME_CONFIG.collectible.radius
        const obstacleHalfSize = GAME_CONFIG.obstacle.size / 2

        debugOverlay
          .rect(playerLeft, playerTop, playerWidth, playerHeight)
          .stroke({ color: 0x5eead4, width: 1 })
          .rect(
            collectibleX - collectibleRadius,
            collectibleY - collectibleRadius,
            collectibleRadius * 2,
            collectibleRadius * 2,
          )
          .stroke({ color: 0xfbbf24, width: 1 })
          .rect(
            obstacleX - obstacleHalfSize,
            obstacleY - obstacleHalfSize,
            GAME_CONFIG.obstacle.size,
            GAME_CONFIG.obstacle.size,
          )
          .stroke({ color: 0xfb7185, width: 1 })

        debugText.text = [
          `FPS: ${Math.round(app.ticker.FPS)}`,
          'State: playing',
          `Player X: ${Math.round(playerX)}`,
        ].join('\n')
        debugText.x = 12
        debugText.y = 12
      }

      const handleDebugKey = (event: KeyboardEvent) => {
        if (event.code !== 'KeyD' || event.repeat) {
          return
        }

        event.preventDefault()
        isDebugEnabled = !isDebugEnabled
        drawDebug()
      }

      const updatePlayer = () => {
        if (hasTimedOut) {
          return
        }

        const keyboardDirection = keyboardInput.getHorizontalDirection()
        const direction = keyboardDirection || pointerInput.getHorizontalDirection()
        const deltaSeconds = app.ticker.deltaMS / 1000

        remainingSeconds = Math.max(remainingSeconds - deltaSeconds, 0)
        const nextDisplayedSeconds = Math.ceil(remainingSeconds)

        if (nextDisplayedSeconds !== displayedSeconds) {
          displayedSeconds = nextDisplayedSeconds
          onTimeChange(displayedSeconds)
        }

        if (remainingSeconds === 0) {
          hasTimedOut = true
          onTimeUp()
          return
        }

        playerX = Math.min(
          Math.max(
            playerX + direction * GAME_CONFIG.player.speed * deltaSeconds,
            minimumPlayerX,
          ),
          maximumPlayerX,
        )
        player.x = playerX
        player.rotation = direction * 0.08

        collectibleY += GAME_CONFIG.collectible.speed * deltaSeconds
        collectible.y = collectibleY
        collectible.rotation += deltaSeconds * 2

        if (
          isOverlappingPlayer(
            collectibleX,
            collectibleY,
            GAME_CONFIG.collectible.radius,
            GAME_CONFIG.collectible.radius,
          )
        ) {
          onCollect(GAME_CONFIG.collectible.points)
          resetCollectible()
        } else if (collectibleY - GAME_CONFIG.collectible.radius > trackY) {
          resetCollectible()
        }

        obstacleY += GAME_CONFIG.obstacle.speed * deltaSeconds
        obstacle.y = obstacleY
        obstacle.rotation -= deltaSeconds * 1.25

        const obstacleHalfSize = GAME_CONFIG.obstacle.size / 2
        if (
          isOverlappingPlayer(
            obstacleX,
            obstacleY,
            obstacleHalfSize,
            obstacleHalfSize,
          )
        ) {
          onHit()
          resetObstacle()
        } else if (obstacleY - obstacleHalfSize > trackY) {
          resetObstacle()
        }

        drawDebug()
      }

      window.addEventListener('keydown', handleDebugKey)
      app.renderer.on('resize', drawScene)
      app.ticker.add(updatePlayer)
      drawScene()

      return () => {
        keyboardInput.destroy()
        pointerInput.destroy()
        window.removeEventListener('keydown', handleDebugKey)
        app.renderer.off('resize', drawScene)
        app.ticker.remove(updatePlayer)
      }
    }

    let disposeScene: (() => void) | undefined

    void initialisePixi().then((dispose) => {
      disposeScene = dispose
    })

    return () => {
      isDisposed = true
      disposeScene?.()
      if (isInitialised) {
        app.destroy(true)
      }
    }
  }, [onCollect, onHit, onTimeChange, onTimeUp])

  return <div className="pixi-canvas-host" ref={hostRef} />
}
