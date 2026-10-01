import type { DemoWorkflow, SidebarSection } from './types'
import { flower } from './flower'

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

const TAG_HARVEST = '1A4DEMO0000000000000481'
const TAG_PR = '1A4DEMO0000000000000602'

export const preroll: DemoWorkflow = {
  id: 'preroll',
  name: 'Pre-Roll',
  tagline: 'Routed flower to labeled pre-rolls',
  summary: 'Take B-grade flower and trim routed to pre-roll through grind, sift, machine runs, sorting/fixing/packaging, testing, labeling and check-in.',
  icon: '🚬',
  batch: 'PR-1002',
  steps: [
    {
      id: 'route',
      label: 'Send to Pre-Roll',
      heading: 'Route pre-roll material from Verification & Routing',
      body: 'Pre-roll starts where flower QC ends. B bud and trim are routed to the Pre-Roll destination, and the weight lands in the pre-roll collection with its source harvest attached.',
      screen: {
        section: 'Flower', item: 'Verification & Routing', title: 'Verification & Routing',
        subtitle: 'Designated for Pre-Roll',
        columns: ['Harvest', 'Grade', 'Weight', 'Allocated', 'Remaining'],
        rows: [
          ['GC-0925', 'B Bud', '5,020 g', '0 g', '5,020 g'],
          ['GC-0925', 'Trim', '1,980 g', '0 g', '1,980 g'],
        ],
        focusRow: 0,
        action: 'Route to Destination',
        actionOn: 'row',
      },
      modal: {
        title: 'Route to Destination',
        fields: [
          { label: 'Destination', value: 'Pre-Roll' },
          { label: 'Weight', value: '5,020 g B Bud' },
          { label: 'METRC Tag', value: TAG_HARVEST },
        ],
        confirm: 'Route',
      },
      rowsAfter: [
        ['GC-0925', 'B Bud', '5,020 g', '5,020 g', { pill: '0 g', tone: 'green' }],
        ['GC-0925', 'Trim', '1,980 g', '0 g', '1,980 g'],
      ],
      result: '5,020 g B Bud → Pre-Roll',
    },
    {
      id: 'pr-allocation',
      label: 'PR Allocation',
      heading: 'Build a batch from the collection',
      body: 'PR Allocation holds every gram designated for pre-roll with its source and METRC tag. Pick materials or a saved blend, and allocate the batch against the LeafLink SKUs you need to restock.',
      screen: {
        section: 'Pre-Roll', item: 'PR Allocation', title: 'Pre-Roll Collection',
        columns: ['Cultivar', 'Source', 'METRC Tag', 'Available (g)', 'Status'],
        rows: [
          ['Gelato Cake', 'B Bud', '…0000481', '5,020', { pill: 'Imported', tone: 'blue' }],
          ['Lemon Cherry Haze', 'Trim', '…0000466', '2,310', { pill: 'Imported', tone: 'blue' }],
        ],
        action: 'Create Pre-Roll Batch',
      },
      modal: {
        title: 'Create Pre-Roll Batch',
        fields: [
          { label: 'Select Materials', value: 'Gelato Cake B Bud · 5,020 g' },
          { label: 'Batch Name', value: 'PR-1002 Gelato Cake' },
          { label: '0.5g singles (LeafLink)', value: 'Allocate 2,400 g' },
          { label: '1g 5-packs (LeafLink)', value: 'Allocate 2,500 g · FULL' },
        ],
        confirm: 'Create Batch',
      },
      rowsAfter: [
        ['Gelato Cake', 'B Bud', '…0000481', '120', { pill: 'Allocated', tone: 'green' }],
        ['Lemon Cherry Haze', 'Trim', '…0000466', '2,310', { pill: 'Imported', tone: 'blue' }],
      ],
      result: 'PR-1002 created · waiting in Ready for Grind',
    },
    {
      id: 'grind',
      label: 'Grind & Sift',
      heading: 'Grind and sift with weights at each hand-off',
      body: 'The PR Queue moves each batch through Ready for Grind, Ready for Sift and Ready for Machine. Weight after sift is recorded, so loss is visible per batch.',
      screen: {
        section: 'Pre-Roll', item: 'PR Queue', title: 'Pre-Roll Queue',
        subtitle: 'Ready for Grind → Ready for Sift → Ready for Machine → In Machine',
        columns: ['Batch', 'Cultivar', 'Weight In (g)', 'Status'],
        rows: [
          ['PR-1002', 'Gelato Cake', '4,900', { pill: 'Ready for Sift', tone: 'amber' }],
          ['PR-0998', 'Lemon Cherry Haze', '2,200', { pill: 'In Machine', tone: 'blue' }],
        ],
        focusRow: 0,
        action: 'Sift Complete',
        actionOn: 'row',
      },
      modal: {
        title: 'Sift Complete · PR-1002',
        fields: [
          { label: 'Weight After Sift (grams)', value: '4,812.0 g', kind: 'scale' },
          { label: 'Stem Weight', value: '74 g' },
          { label: 'Loss', value: '14 g · 0.3%' },
        ],
        confirm: 'Ready for Machine',
      },
      rowsAfter: [
        ['PR-1002', 'Gelato Cake', '4,900', { pill: 'Ready for Machine', tone: 'green' }],
        ['PR-0998', 'Lemon Cherry Haze', '2,200', { pill: 'In Machine', tone: 'blue' }],
      ],
      result: 'PR-1002 ready for machine · 4,812 g',
    },
    {
      id: 'machine-start',
      label: 'Machine Run',
      heading: 'Start the machine run',
      body: 'Assign the batch to Machine 1 or Machine 2 with a start weight and time. Small lots can be combined into one machine run, and pauses and downtime are logged against the run.',
      screen: {
        section: 'Pre-Roll', item: 'PR Queue', title: 'Pre-Roll Queue',
        subtitle: 'Machines',
        columns: ['Machine', 'Batch', 'Pack Sizes', 'Status'],
        rows: [
          ['Machine 1', '—', '—', { pill: 'No batch assigned', tone: 'gray' }],
          ['Machine 2', 'PR-0998', '1g', { pill: 'Running', tone: 'blue' }],
        ],
        focusRow: 0,
        action: 'Confirm Machine Start',
        actionOn: 'row',
      },
      modal: {
        title: 'Confirm Machine Start · Machine 1',
        fields: [
          { label: 'Batch', value: 'PR-1002 Gelato Cake' },
          { label: 'Machine start weight', value: '4,812 g' },
          { label: 'Product Allocations', value: '0.5g: 2,400 g · 1g: 2,412 g' },
          { label: 'Machine Start Time', value: '9:42 AM' },
        ],
        confirm: 'Start Machine',
      },
      rowsAfter: [
        ['Machine 1', 'PR-1002', '0.5g · 1g', { pill: 'Running', tone: 'blue' }],
        ['Machine 2', 'PR-0998', '1g', { pill: 'Running', tone: 'blue' }],
      ],
      result: 'Machine 1 running PR-1002',
    },
    {
      id: 'machine-end',
      label: 'End Run',
      heading: 'Close the run with counts and a production tag',
      body: 'Ending the run records the counter reading, total pre-rolls produced and leftover grams for fixing. Kief additions are logged with their own tag and weight.',
      metrc: 'The new production package tag and any kief tag are typed in and stored on the run.',
      screen: {
        section: 'Pre-Roll', item: 'PR Queue', title: 'Pre-Roll Queue',
        subtitle: 'Machines',
        columns: ['Machine', 'Batch', 'Run Time', 'Status'],
        rows: [
          ['Machine 1', 'PR-1002', '3h 18m', { pill: 'Running', tone: 'blue' }],
          ['Machine 2', 'PR-0998', '1h 02m', { pill: 'Running', tone: 'blue' }],
        ],
        focusRow: 0,
        action: 'End Machine Run',
        actionOn: 'row',
      },
      modal: {
        title: 'End Machine Run · PR-1002',
        fields: [
          { label: 'Counter Reading / Total Machine Count', value: '7,238 pre-rolls' },
          { label: 'Leftover Weight (grams for fixing)', value: '96 g' },
          { label: 'New Production METRC Tag', value: TAG_PR },
          { label: 'Kief Addition (Optional)', value: 'None' },
        ],
        confirm: 'End Machine Run',
      },
      rowsAfter: [
        ['Machine 1', '—', '—', { pill: 'No batch assigned', tone: 'gray' }],
        ['Machine 2', 'PR-0998', '1h 02m', { pill: 'Running', tone: 'blue' }],
      ],
      result: '7,238 pre-rolls produced · PR-1002 ready for sorting',
    },
    {
      id: 'sfp',
      label: 'S/F/P Queue',
      heading: 'Sort, fix and pack as a team',
      body: 'The Sorting / Fixing / Packaging terminal lets the crew pick their names and join a session. Units made per session, fixing weight and leftovers are captured when the team completes.',
      screen: {
        section: 'Pre-Roll', item: 'S/F/P Queue', title: 'Sorting/Fixing/Packaging Queue',
        columns: ['Batch', 'Product', 'Machine Count', 'Team', 'Status'],
        rows: [
          ['PR-1002', 'Gelato Cake', '7,238', '3', { pill: 'In sorting/fixing', tone: 'blue' }],
          ['PR-0995', 'Lemon Cherry Haze', '4,180', '—', { pill: 'Ready for sorting', tone: 'gray' }],
        ],
        focusRow: 0,
        action: 'Complete Sorting/Fixing',
        actionOn: 'row',
      },
      modal: {
        title: 'Complete Sorting/Fixing · PR-1002',
        fields: [
          { label: 'Units made this session', value: '7,190' },
          { label: 'Fixing Weight (g)', value: '41 g' },
          { label: 'Leftover (g)', value: '55 g' },
          { label: 'Team', value: 'A. Diaz, K. Patel, B. Lee' },
        ],
        confirm: 'Send to Quality Control',
      },
      rowsAfter: [
        ['PR-1002', 'Gelato Cake', '7,238', '3', { pill: 'QC complete', tone: 'green' }],
        ['PR-0995', 'Lemon Cherry Haze', '4,180', '—', { pill: 'Ready for sorting', tone: 'gray' }],
      ],
      result: '7,190 units passed QC · ready for testing',
    },
    {
      id: 'pr-testing',
      label: 'Testing',
      heading: 'Test the production batch',
      body: 'Testing batches are created from the production tag and sent to the lab by product line. Results come back from METRC for review, just like flower.',
      metrc: 'Pre-roll test results and the COA are read from METRC by package tag.',
      screen: {
        section: 'Testing Center', item: 'Testing Hub', title: 'Testing Hub',
        subtitle: 'Pre-Roll',
        columns: ['Source Tag', 'Batch', 'Units Sent to Lab', 'Status'],
        rows: [
          ['…0000602', 'PR-1002', '12', { pill: 'At Lab', tone: 'blue' }],
        ],
        action: 'Check METRC for new test results',
      },
      modal: {
        title: 'Review METRC Test Results · …0000602',
        fields: [
          { label: 'Total THC', value: '24.9%' },
          { label: 'Total Terpenes', value: '1.87%' },
          { label: 'Result', value: 'PASS · COA attached' },
        ],
        confirm: 'Confirm Results',
      },
      rowsAfter: [
        ['…0000602', 'PR-1002', '12', { pill: 'Passed · ready for packaging', tone: 'green' }],
      ],
      result: 'PR-1002 passed · ready for labeling',
    },
    {
      id: 'pr-labeling',
      label: 'Labeling',
      heading: 'Label by product line, with label QC',
      body: 'Pre-Roll Labeling runs as a session anyone can join or pause. Splits require their own tag, and a label QC check verifies the COA before the product moves to check-in.',
      screen: {
        section: 'Pre-Roll', item: 'Labeling', title: 'Pre-Roll Labeling',
        columns: ['Product Line', 'METRC Tag', 'Units', 'Status'],
        rows: [
          ['Gelato Cake 0.5g single', '…0000602', '4,790', { pill: 'In progress', tone: 'blue' }],
          ['Gelato Cake 1g 5-pack', '…0000602', '480 packs', { pill: 'Ready for packaging', tone: 'gray' }],
        ],
        focusRow: 0,
        action: 'Complete Labeling',
        actionOn: 'row',
      },
      modal: {
        title: 'Label QC Verification',
        fields: [
          { label: 'Units labeled', value: '4,790 of 4,790' },
          { label: 'Certificate of Analysis', value: '✓ Matches …0000602' },
          { label: 'Label potency', value: 'THC 24.9% ✓' },
        ],
        confirm: 'Complete Label QC',
      },
      rowsAfter: [
        ['Gelato Cake 0.5g single', '…0000602', '4,790', { pill: 'Ready for check-in', tone: 'green' }],
        ['Gelato Cake 1g 5-pack', '…0000602', '480 packs', { pill: 'Ready for packaging', tone: 'gray' }],
      ],
      result: 'Labeling QC complete · ready for check-in',
    },
    {
      id: 'pr-fulfillment',
      label: 'Fulfillment',
      heading: 'Check in by case, partial and unit',
      body: 'Check-in confirms cases, partials and total units against a QC checklist, so the count that reaches wholesale matches the count that came off the line.',
      screen: {
        section: 'Fulfillment', item: 'Fulfillment Hub', title: 'Fulfillment Hub',
        subtitle: 'Pre-Roll',
        columns: ['Product', 'Batch', 'Units', 'Status'],
        rows: [
          ['Gelato Cake 0.5g single', 'PR-1002', '4,790', { pill: 'Ready for check-in', tone: 'amber' }],
        ],
        focusRow: 0,
        action: 'Check In',
        actionOn: 'row',
      },
      modal: {
        title: 'Pre-Roll Fulfillment Check-In',
        fields: [
          { label: 'Cases / Partials', value: '47 cases · 1 partial (90)' },
          { label: 'Total Units', value: '4,790 ✓' },
          { label: 'QC Checklist', value: '✓ METRC tag is correct · ✓ COA viewed' },
        ],
        confirm: 'Check In',
      },
      rowsAfter: [
        ['Gelato Cake 0.5g single', 'PR-1002', '4,790', { pill: 'Checked in', tone: 'green' }],
      ],
      result: 'Checked in · 4,790 pre-rolls ready to sell',
    },
  ],
}

export const workflows: DemoWorkflow[] = [flower, preroll]
