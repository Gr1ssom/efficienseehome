import type { DemoWorkflow } from './types'

/* Autoplay timings (ms), shared by the player and the duration shown on the picker. */
export const FIRST_FRAME_MS = 3600
export const NEXT_FRAME_MS = 2300
export const DONE_MS = 2600
export const CLICK_MS = 650

/** Clicks the operator makes in a step. */
export function clicksIn(step: DemoWorkflow['steps'][number]): number {
  if (step.frames) return step.frames.length
  return step.modal ? 2 : 1
}

/** Approximate autoplay length in minutes, rounded to the nearest half minute. */
export function playMinutes(w: DemoWorkflow): number {
  const ms = w.steps.reduce((sum, s) => {
    const clicks = clicksIn(s)
    return sum + FIRST_FRAME_MS + (clicks - 1) * NEXT_FRAME_MS + clicks * CLICK_MS + DONE_MS
  }, 0)
  return Math.max(0.5, Math.round(ms / 30000) / 2)
}
