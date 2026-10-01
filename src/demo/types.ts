export type Tone = 'green' | 'amber' | 'blue' | 'red' | 'gray' | 'purple' | 'teal'

/** A table cell: plain text, or a coloured status pill. */
export type Cell = string | { pill: string; tone: Tone }

export interface Kpi {
  label: string
  value: string
  tone?: Tone
}

/** A batch / harvest card, as HarvestHub shows them on Dry Rooms, Harvested, etc. */
export interface DemoCard {
  title: string
  /** Small pills beside the title. */
  tags?: { text: string; tone: Tone }[]
  /** Label/value pairs in a grid. */
  fields?: [string, string][]
  /** Shows a checkbox (METRC harvest pickers). */
  checkbox?: boolean
  selected?: boolean
  /** Coloured header band (e.g. drying stage). */
  band?: { text: string; tone: Tone }
}

export interface DemoPanel {
  title: string
  tone?: Tone
  cards: DemoCard[]
}

export interface DemoScreen {
  /** Sidebar section and item the operator is on. */
  section: string
  item: string
  title: string
  subtitle?: string
  /** Other page buttons, shown but not part of this step. */
  toolbar?: string[]
  kpis?: Kpi[]
  columns?: string[]
  rows?: Cell[][]
  /** Row the step acts on. */
  focusRow?: number
  /** Card columns (Dry Room 1 / Dry Room 2, METRC harvest list…). */
  panels?: DemoPanel[]
  /** [panel, card] the step acts on. */
  focusCard?: [number, number]
  /** Button the operator clicks on this screen. */
  action?: string
  /** Where that button sits: page header, the focus row, or the focus card. */
  actionOn?: 'header' | 'row' | 'card'
}

export type FieldKind = 'input' | 'select' | 'scale' | 'checks' | 'summary' | 'note' | 'date' | 'time' | 'heading' | 'card'

export interface Field {
  label: string
  value?: string
  kind?: FieldKind
  /** Mark as required (red asterisk). */
  required?: boolean
  /** For kind 'checks'. */
  checks?: { label: string; checked: boolean }[]
  /** For kind 'summary': label/value rows. */
  rows?: [string, string][]
  /** Half-width field (two per row). */
  half?: boolean
  /** For kind 'card': a selectable METRC harvest card. */
  checked?: boolean
  tag?: string
  /** Small grey help text under the field. */
  help?: string
}

export interface DemoModal {
  title: string
  subtitle?: string
  fields: Field[]
  confirm: string
  wide?: boolean
}

/** One screen state and the single click the operator makes on it. */
export interface DemoFrame {
  screen: DemoScreen
  /** When set, the click is the modal's confirm button. */
  modal?: DemoModal
  /** Brief caption for this click (shown under the step text). */
  note?: string
}

export interface DemoStep {
  id: string
  /** Short label for the step rail. */
  label: string
  /** Narration shown beside the app window. */
  heading: string
  body: string
  /** What happens in METRC at this step, if anything. */
  metrc?: string
  /** Click-by-click frames. Older steps can use screen/modal instead. */
  frames?: DemoFrame[]
  screen?: DemoScreen
  modal?: DemoModal
  /** Screen after the last click (status changes). */
  after?: DemoScreen
  /** Rows after the action completes (shorthand for `after`). */
  rowsAfter?: Cell[][]
  /** Toast shown when the step completes (HarvestHub's own toast text where it has one). */
  result: string
}

export interface DemoWorkflow {
  id: 'flower' | 'preroll'
  name: string
  tagline: string
  summary: string
  icon: string
  batch: string
  steps: DemoStep[]
}

/** Sidebar sections of HarvestHub V1 shown in the mock app window. */
export interface SidebarSection {
  /** Top-level header (e.g. POST HARVEST) shown above the section. */
  group?: string
  name: string
  items: string[]
}
