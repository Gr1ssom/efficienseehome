export type Tone = 'green' | 'amber' | 'blue' | 'red' | 'gray' | 'purple'

/** A table cell: plain text, or a coloured status pill. */
export type Cell = string | { pill: string; tone: Tone }

export interface Kpi {
  label: string
  value: string
  tone?: Tone
}

export interface Field {
  label: string
  value: string
  /** Rendered as a live scale readout. */
  scale?: boolean
}

export interface DemoScreen {
  /** Sidebar section and item the operator is on. */
  section: string
  item: string
  title: string
  subtitle?: string
  kpis?: Kpi[]
  columns?: string[]
  rows?: Cell[][]
  /** Row the step acts on. */
  focusRow?: number
  /** Primary page button the operator clicks (when there is no modal row action). */
  action: string
  /** Where the action button sits: page header or on the focus row. */
  actionOn?: 'header' | 'row'
}

export interface DemoModal {
  title: string
  fields: Field[]
  confirm: string
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
  screen: DemoScreen
  modal?: DemoModal
  /** Rows after the action completes (status changes). Defaults to `screen.rows`. */
  rowsAfter?: Cell[][]
  /** Toast shown when the step completes. */
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
