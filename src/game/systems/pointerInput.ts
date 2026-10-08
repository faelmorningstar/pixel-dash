export type PointerInput = {
  destroy: () => void
  getHorizontalDirection: () => -1 | 0 | 1
}

export function createPointerInput(target: HTMLElement): PointerInput {
  let horizontalDirection: -1 | 0 | 1 = 0

  const updateDirection = (clientX: number) => {
    const bounds = target.getBoundingClientRect()
    horizontalDirection = clientX < bounds.left + bounds.width / 2 ? -1 : 1
  }

  const handlePointerDown = (event: PointerEvent) => {
    event.preventDefault()
    target.setPointerCapture(event.pointerId)
    updateDirection(event.clientX)
  }

  const handlePointerMove = (event: PointerEvent) => {
    if (!target.hasPointerCapture(event.pointerId)) {
      return
    }

    updateDirection(event.clientX)
  }

  const clearDirection = () => {
    horizontalDirection = 0
  }

  target.addEventListener('pointerdown', handlePointerDown)
  target.addEventListener('pointermove', handlePointerMove)
  target.addEventListener('pointerup', clearDirection)
  target.addEventListener('pointercancel', clearDirection)

  return {
    getHorizontalDirection: () => horizontalDirection,
    destroy: () => {
      target.removeEventListener('pointerdown', handlePointerDown)
      target.removeEventListener('pointermove', handlePointerMove)
      target.removeEventListener('pointerup', clearDirection)
      target.removeEventListener('pointercancel', clearDirection)
    },
  }
}
