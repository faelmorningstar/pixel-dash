const LEFT_KEYS = new Set(['ArrowLeft', 'KeyA'])
const RIGHT_KEYS = new Set(['ArrowRight', 'KeyD'])

export type KeyboardInput = {
  destroy: () => void
  getHorizontalDirection: () => -1 | 0 | 1
}

export function createKeyboardInput(target: Window): KeyboardInput {
  const pressedKeys = new Set<string>()

  const isMovementKey = (code: string) =>
    LEFT_KEYS.has(code) || RIGHT_KEYS.has(code)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isMovementKey(event.code)) {
      return
    }

    event.preventDefault()
    pressedKeys.add(event.code)
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    if (!isMovementKey(event.code)) {
      return
    }

    pressedKeys.delete(event.code)
  }

  target.addEventListener('keydown', handleKeyDown)
  target.addEventListener('keyup', handleKeyUp)

  return {
    getHorizontalDirection: () => {
      const movingLeft =
        pressedKeys.has('ArrowLeft') || pressedKeys.has('KeyA')
      const movingRight =
        pressedKeys.has('ArrowRight') || pressedKeys.has('KeyD')

      if (movingLeft === movingRight) {
        return 0
      }

      return movingLeft ? -1 : 1
    },
    destroy: () => {
      target.removeEventListener('keydown', handleKeyDown)
      target.removeEventListener('keyup', handleKeyUp)
    },
  }
}
