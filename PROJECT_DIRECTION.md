# Project direction

## Purpose, audience and scope

Pixel Dash is a short, playable 2D arcade prototype for a Junior Frontend Game Developer portfolio. Its visual layer should make the prototype memorable while preserving readable controls and a focused PixiJS canvas.

## Thesis and relevant direction axes

The interface is a dramatic space-arcade launch screen: expressive original astronaut artwork frames a compact, functional game surface. It is cinematic outside the arena and restrained inside it, so the visual atmosphere supports rather than hides gameplay.

## Decision ledger

| ID | Area | Choice | State | Approval/source | Supersedes |
| --- | --- | --- | --- | --- | --- |
| 01 | Background imagery | User-provided horizontal astronaut art on desktop and vertical astronaut art on mobile. | Approved | User request, 2026-10-07 | Plain radial-gradient page background |
| 02 | Typography | Michroma for game identity, headings and HUD; readable system sans for body copy. | Approved | User request, 2026-10-07 | Default display typography |
| 03 | Controls copy | Only arrow keys are shown for desktop; touch is described for mobile. Debug remains undisclosed in player-facing copy. | Approved | User request, 2026-10-07 | A/D and debug hints |

## Composition and visual roles

- Desktop: artwork leaves the left area visually quiet for content; astronaut remains on the right.
- Mobile: the vertical illustration leaves room at the top for the menu and frames the lower viewport with the astronaut.
- Surface panels use an intentionally dark, high-opacity treatment to preserve contrast over the artwork.
- The PixiJS arena remains independent from the background art.

## Assets and rights

- `src/assets/space-desktop.webp`: optimized derivative of user-provided/generated desktop artwork.
- `src/assets/space-mobile.webp`: optimized derivative of user-provided/generated mobile artwork.
- Google Fonts Michroma: loaded from the official Google Fonts stylesheet.

## Preserve and avoid

- Preserve high contrast, responsive background crops, and simple in-game vector graphics.
- Avoid placing cinematic artwork inside the gameplay canvas, excessive visual effects, or player-facing debug instructions.

## Verification evidence

- Desktop source image: 1672×941.
- Mobile source image: 941×1672.

## Immediate open decisions

- Optional future integration of a dedicated menu illustration or a visual player sprite.
