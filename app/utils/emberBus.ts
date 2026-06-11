/** Shared mutable state between scroll/interactions and the ember canvas. Plain object — read every frame, never reactive. */
export const emberBus = {
  /** smoothed scroll velocity, px/frame-ish */
  velocity: 0,
  /** 0–1, set by the hold-to-ignite interaction */
  flare: 0,
}
