import type { DemoWorkflow, SidebarSection } from './types'
import { flower } from './flower'
import { preroll } from './preroll'

/*
 * Scripted walkthroughs of HarvestHub V1 (the app facilities use today).
 * Page names, buttons, fields and statuses mirror the live app; all cultivars,
 * weights and tags are made-up demo data. METRC is read-only in HarvestHub:
 * the app pulls harvests, plants, packages and lab results, and operators type
 * package tags in by hand.
 */

export const sidebar: SidebarSection[] = [
  { name: 'Harvest', items: ['Live Harvest', 'Harvested'] },
  {
    group: 'Post Harvest',
    name: 'Flower',
    items: ['Flower Overview', 'Dry Rooms', 'Bucking', 'Sorting', 'Cure', 'Trim', 'Trim QC', 'Verification & Routing', 'Allocation Station', 'Packaging & Labeling'],
  },
  { name: 'Pre-Roll', items: ['Dashboard', 'PR Allocation', 'PR Queue', 'S/F/P Queue', 'Labeling'] },
  { name: 'Testing Center', items: ['Testing Stats', 'Testing Hub'] },
  { name: 'Fulfillment', items: ['Fulfillment Hub', 'LeafLink Queue'] },
]

export const workflows: DemoWorkflow[] = [flower, preroll]
