/** Wiring for the button the operator clicks in a recreated HarvestHub modal. */
export interface Hot {
  bind: (el: HTMLButtonElement | null) => void
  onClick: () => void
  className: string
}
