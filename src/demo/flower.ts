import type { Cell, DemoCard, DemoScreen, DemoWorkflow } from './types'

/*
 * Flower walkthrough, click for click as HarvestHub V1 runs it today:
 * METRC import in Dry Rooms → moisture readings → Bucking → Sorting → Cure
 * (burp) → Trim → Trim QC → Verification & Routing → Testing → Allocation →
 * Packaging & Labeling → Fulfillment.
 *
 * Page titles, buttons, modal titles, field labels and toasts are copied from
 * the HarvestHub repo (src/components). Cultivars, weights, names and tags are
 * made-up demo data. METRC is read-only: HarvestHub pulls harvests and lab
 * results from it and never writes back.
 */

const STRAIN = 'Gelato Cake'
const BATCH = 'HD 09/22 Gelato Cake'
const METRC_HARVEST = 'GC-0922-F3'
const TEAM = 'M. Alvarez, J. Chen, R. Okafor, T. Nguyen'
const TAG_SRC = '1A4DEMO0000000000000481'
const TAG_TEST = '1A4DEMO0000000000000517'
const TAG_PKG = '1A4DEMO0000000000000530'

/* ── Dry Rooms ─────────────────────────────────────────────── */

const otherDryCard: DemoCard = {
  title: 'HD 09/18 Lemon Cherry Haze',
  band: { text: 'Middle (Days 3-5)', tone: 'green' },
  fields: [['Days Drying', '5'], ['Projected Dry', '23,410 g'], ['Moist', '15.2%']],
}

const dryRooms = (room2: DemoCard[], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Flower',
  item: 'Dry Rooms',
  title: 'Dry Rooms',
  subtitle: 'Monitor cultivars drying in dry rooms',
  toolbar: ['Dry Room Checklist', 'Import from METRC', 'New Harvest'],
  panels: [
    { title: 'Dry Room 1', tone: 'gray', cards: [otherDryCard] },
    { title: 'Dry Room 2', tone: 'gray', cards: room2 },
  ],
  ...extra,
})

const gcDrying = (band: string, days: string, moist: string, wa?: string): DemoCard => ({
  title: BATCH,
  band: { text: band, tone: band.startsWith('Final') ? 'amber' : 'green' },
  fields: [
    ['Days Drying', days],
    ['Projected Dry', '32,062 g'],
    ['Wet Wt', '139,400 g'],
    ['Moist', moist],
    ...(wa ? [['WA', wa] as [string, string]] : []),
  ],
})

/* ── Bucking ───────────────────────────────────────────────── */

const bucking = (ready: DemoCard[], inProgress: DemoCard[], needsWeights: DemoCard[], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Flower',
  item: 'Bucking',
  title: 'Bucking',
  subtitle: 'Manage bucking workflow and weight recording',
  toolbar: ['Terminal', 'List View'],
  panels: [
    { title: 'Ready for Bucking', tone: 'blue', cards: ready },
    { title: 'Bucking In Progress', tone: 'amber', cards: inProgress },
    { title: 'Needs Bucking Weights', tone: 'purple', cards: needsWeights },
  ],
  ...extra,
})

/* ── Sorting ───────────────────────────────────────────────── */

const sorting = (ready: DemoCard[], inProgress: DemoCard[], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Flower',
  item: 'Sorting',
  title: 'Sorting & Grading',
  subtitle: 'Use buttons to move cultivars through the sorting workflow - completed batches move to Cure page',
  toolbar: ['Sorting Log', 'List View'],
  panels: [
    { title: 'Ready for Sorting', tone: 'blue', cards: ready },
    { title: 'Sorting In Progress', tone: 'amber', cards: inProgress },
  ],
  ...extra,
})

/* ── Cure ──────────────────────────────────────────────────── */

const cureCard = (selected = false, moist = '11.6%', aw = '0.61 Aw'): DemoCard => ({
  title: BATCH,
  checkbox: true,
  selected,
  tags: [{ text: 'After Sorting', tone: 'green' }, { text: 'Cure Room', tone: 'gray' }],
  fields: [
    ['Cure', '6d'], ['Moisture', moist], ['Water', aw],
    ['AAA', '14,250 g'], ['A', '9,880 g'], ['B', '5,120 g'],
    ['Post-Sort Trim', '1,980 g'], ['Totes', '9'],
  ],
})

const cure = (cards: DemoCard[], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Flower',
  item: 'Cure',
  title: 'Cure Stage',
  subtitle: 'Monitor and log moisture during curing - ready batches move to Trim',
  toolbar: ['Cure Overview', 'Burp Checklist', 'Create Burp List', 'Add Entry'],
  panels: [{ title: 'Curing', tone: 'teal', cards }],
  ...extra,
})

/* ── Trim → Fulfillment ────────────────────────────────────── */

const trim = (cols: [DemoCard[], DemoCard[], DemoCard[], DemoCard[]], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Flower',
  item: 'Trim',
  title: 'Trim Queue',
  subtitle: 'Manage batches through the trimming workflow',
  toolbar: ['Weekly Report', 'Trim Log', 'Expand All'],
  panels: [
    { title: 'Needs Weighed', tone: 'gray', cards: cols[0] },
    { title: 'Ready for Handout', tone: 'blue', cards: cols[1] },
    { title: 'In Progress', tone: 'amber', cards: cols[2] },
    { title: 'Trim Complete', tone: 'green', cards: cols[3] },
  ],
  ...extra,
})

const trimQC = (ready: DemoCard[], inProgress: DemoCard[], complete: DemoCard[], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Flower',
  item: 'Trim QC',
  title: 'Trim Quality Control',
  subtitle: 'Inspect trimmed batches for quality and microbials before Testing',
  toolbar: ['View QC History'],
  panels: [
    { title: 'Ready for Trim QC', tone: 'blue', cards: ready },
    { title: 'Trim QC In Progress', tone: 'amber', cards: inProgress },
    { title: 'QC Complete', tone: 'green', cards: complete },
  ],
  ...extra,
})

const vrCard: DemoCard = {
  title: `${STRAIN} · HD 09/22`,
  tags: [{ text: '27,610g total', tone: 'gray' }],
  fields: [['AAA Bud', '13,940g left'], ['A Bud', '5,610g left'], ['B Bud', '8,060g left']],
}

const vr = (cards: DemoCard[], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Flower',
  item: 'Verification & Routing',
  title: 'Verification & Routing',
  subtitle: 'Reweigh bags, verify weights, and route each grade to its destination — partially or all at once',
  panels: [
    { title: 'Designated for Pre-Roll', tone: 'purple', cards: [] },
    { title: 'Flower Pre-Testing', tone: 'amber', cards },
  ],
  ...extra,
})

const testCard = (inProgress = false): DemoCard => ({
  title: `${TAG_TEST} · ${STRAIN}`,
  tags: inProgress ? [{ text: 'At Lab', tone: 'blue' }] : [{ text: 'AAA 6,800g', tone: 'green' }],
  fields: inProgress
    ? [['Total', '6,800g'], ['Sent', '30g'], ['Lab', 'GPA']]
    : [['Total Weight', '6,800g'], ['Source Tag', TAG_SRC]],
})

const testing = (ready: DemoCard[], inProgress: DemoCard[], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Testing Center',
  item: 'Testing Hub',
  title: 'Testing Hub',
  subtitle: 'All products in testing — flower, pre-roll, and hash',
  toolbar: ['Refresh Results', 'Manual Entry'],
  panels: [
    { title: 'Ready for Testing', tone: 'blue', cards: ready },
    { title: 'Testing In Progress', tone: 'amber', cards: inProgress },
  ],
  ...extra,
})

const allocation = (cards: DemoCard[], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Flower',
  item: 'Allocation Station',
  title: 'Allocation Station',
  subtitle: 'Allocate tested batches to packaging queues',
  toolbar: ['Strategy', 'Analytics', 'Sync LeafLink'],
  kpis: [
    { label: 'Batches ready', value: String(cards.length + 2), tone: 'green' },
    { label: 'Total lbs', value: '41.6' },
    { label: 'Avg THC', value: '26.9%' },
    { label: 'Avg Terpenes', value: '2.21%' },
  ],
  panels: [{ title: 'Ready for Allocation', tone: 'green', cards }],
  ...extra,
})

const packaging = (rows: Cell[][], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Flower',
  item: 'Packaging & Labeling',
  title: 'Packaging & Labeling',
  subtitle: 'Manage packaging and labeling workflows',
  toolbar: ['Create Batch', 'Open Terminal'],
  columns: ['Queue', 'Product', 'Batch', 'Units'],
  rows,
  ...extra,
})

const fulfillment = (rows: Cell[][], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Fulfillment',
  item: 'Fulfillment Hub',
  title: 'Fulfillment',
  subtitle: 'Quality check-in & inventory release',
  kpis: [
    { label: 'Ready', value: String(rows.length), tone: 'amber' },
    { label: 'Checked In', value: '14', tone: 'green' },
    { label: 'Total Units', value: '9,840' },
  ],
  columns: ['Strain', 'Product Line', 'Tag', 'Units'],
  rows,
  ...extra,
})

export const flower: DemoWorkflow = {
  id: 'flower',
  name: 'Flower',
  tagline: 'METRC harvest to a checked-in 3.5g jar',
  summary: 'Import a METRC harvest with its plant count and weight, then follow it through dry, bucking, sorting, cure, trim, QC, testing, allocation, labeling and fulfillment.',
  icon: '🌸',
  batch: BATCH,
  steps: [
    {
      id: 'import',
      label: 'Import from METRC',
      heading: 'Start from the METRC harvest',
      body: 'Nothing is typed in by hand. In Dry Rooms, pick the harvest date and HarvestHub lists that day’s METRC harvests with their plant count and current weight. Select the harvest, match it to the crop and strain, choose a dry room, and the post-harvest batch is created.',
      metrc: 'Harvest name, strain, plant count and wet weight are read from METRC. HarvestHub never writes to METRC.',
      frames: [
        {
          screen: dryRooms([], { action: 'Import from METRC' }),
          note: 'Import from METRC',
        },
        {
          screen: dryRooms([]),
          modal: {
            title: 'Select Harvest Date',
            subtitle: 'Select the date of the harvests you want to import from METRC',
            fields: [{ label: '', kind: 'date', value: '09/22/2026' }],
            confirm: 'Load Harvests',
          },
          note: 'Choose the harvest date',
        },
        {
          screen: dryRooms([]),
          modal: {
            title: 'Select Harvests to Import',
            subtitle: 'Found 2 harvests for 2026-09-22',
            wide: true,
            fields: [
              {
                label: METRC_HARVEST, kind: 'card', checked: true, tag: 'Product',
                rows: [['Strains:', STRAIN], ['Plant Count:', '120'], ['Current Weight:', '139,400.00 Grams'], ['Started:', '09/22/2026']],
              },
              {
                label: 'GC-0922-F4', kind: 'card', tag: 'Product',
                rows: [['Strains:', 'Cereal Milk'], ['Plant Count:', '96'], ['Current Weight:', '101,870.00 Grams'], ['Started:', '09/22/2026']],
              },
              { label: '1 of 2 harvests selected', kind: 'note' },
            ],
            confirm: 'Continue with 1 Harvest',
          },
          note: 'Select the METRC harvest',
        },
        {
          screen: dryRooms([]),
          modal: {
            title: 'Create Post-Harvest Batches from METRC',
            subtitle: '1 METRC Harvest Selected',
            wide: true,
            fields: [
              { label: 'Configure Cultivars & Verify Required Fields', kind: 'heading', value: '✓ All strains mapped' },
              { label: `Batch 1: ${STRAIN}`, kind: 'heading', value: `from ${METRC_HARVEST}` },
              { label: 'Crop', kind: 'select', required: true, value: 'Flower Bay 3 · Crop 0922' },
              { label: 'Match to Strain', kind: 'select', required: true, value: STRAIN, half: true },
              { label: 'Plant Count', required: true, value: '120', half: true },
              { label: 'Wet Weight (grams)', required: true, value: '139400.00', half: true },
              { label: 'Dry Room', kind: 'select', required: true, value: 'Dry Room 2', half: true },
              {
                label: 'Status Flags (Optional)', kind: 'checks',
                checks: [
                  { label: 'Ready for Bucking', checked: false },
                  { label: '△ Triangle', checked: false },
                  { label: '□ Square', checked: false },
                  { label: 'Seeded', checked: false },
                ],
              },
              {
                label: 'Summary', kind: 'summary',
                rows: [['METRC Harvests:', '1'], ['Batches to Create:', '1'], ['Total Plants:', '120'], ['Strains Mapped:', '1/1']],
              },
              { label: 'Note: Each METRC harvest creates exactly one batch (1:1 ratio).', kind: 'note' },
            ],
            confirm: 'Create 1 Batch',
          },
          note: 'Plant count and wet weight come straight from METRC',
        },
      ],
      after: dryRooms([gcDrying('Early (Days 1-2)', '0', 'Not logged')], { focusCard: [1, 0] }),
      result: 'Successfully created 1 post-harvest batch from 1 METRC harvest',
    },
    {
      id: 'dry',
      label: 'Dry Rooms',
      heading: 'Dry it, log readings, queue it for bucking',
      body: 'The card tracks days drying, projected dry weight and the latest readings. HarvestHub won’t let a batch go to bucking without its moisture and water activity logged, so the readings are captured right there.',
      frames: [
        {
          screen: dryRooms([gcDrying('Final Checks (Days 8-10)', '9', 'Not logged')], { focusCard: [1, 0], action: 'Ready to Buck', actionOn: 'card' }),
          note: 'Ready to Buck',
        },
        {
          screen: dryRooms([gcDrying('Final Checks (Days 8-10)', '9', 'Not logged')], { focusCard: [1, 0] }),
          modal: {
            title: 'Missing Moisture Readings',
            fields: [
              { label: `${BATCH} has no readings logged.`, kind: 'note' },
              { label: 'Moisture % — not recorded', kind: 'heading' },
              { label: 'Water Activity — not recorded', kind: 'heading' },
            ],
            confirm: 'Log Readings Now',
          },
          note: 'Readings are required before bucking',
        },
        {
          screen: dryRooms([gcDrying('Final Checks (Days 8-10)', '9', 'Not logged')], { focusCard: [1, 0] }),
          modal: {
            title: `Moisture Report: ${STRAIN}`,
            fields: [
              { label: 'Water Activity', required: true, value: '0.62' },
              { label: 'Moisture % (optional)', value: '11.8' },
              { label: 'Notes (optional)', value: 'Stems snapping, ready to buck' },
            ],
            confirm: 'Save Entry',
          },
          note: 'Log water activity and moisture',
        },
        {
          screen: dryRooms([gcDrying('Final Checks (Days 8-10)', '9', '11.8%', '0.62')], { focusCard: [1, 0], action: 'Ready to Buck', actionOn: 'card' }),
          note: 'Moisture entry added. Now Ready to Buck',
        },
      ],
      after: dryRooms([]),
      result: 'Moved to Ready for Buck',
    },
    {
      id: 'bucking',
      label: 'Bucking',
      heading: 'Buck with the crew, then record weights',
      body: 'Start the session with the team. Plants grabbed are tapped in on the Bucking Terminal, and the batch can’t be finalized until every plant is accounted for. Then bucking waste and untrimmed weight are recorded and the batch moves to Sorting.',
      frames: [
        {
          screen: bucking([{
            title: `#1 ${BATCH}`,
            fields: [['Plants:', '120'], ['Wet Weight:', '139,400g'], ['Projected Dry:', '32,062g'], ['WA:', '0.620'], ['M%:', '11.8%']],
          }], [], [], { focusCard: [0, 0], action: 'Start Bucking', actionOn: 'card' }),
          note: 'Start Bucking',
        },
        {
          screen: bucking([{ title: `#1 ${BATCH}`, fields: [['Plants:', '120'], ['Wet Weight:', '139,400g']] }], [], []),
          modal: {
            title: 'Start Bucking',
            subtitle: `Batch: ${BATCH}`,
            fields: [
              { label: 'Taking Tops', kind: 'checks', checks: [{ label: 'Taking Tops', checked: false }] },
              { label: 'Date', kind: 'date', required: true, value: '10/01/2026', half: true },
              { label: 'Start Time', kind: 'time', required: true, value: '07:30 AM', half: true },
              { label: 'End Time (optional)', kind: 'time', value: '--:--' },
              {
                label: 'Select Team Members * (4 selected)', kind: 'checks',
                checks: TEAM.split(', ').map((n) => ({ label: n, checked: true })),
              },
              { label: 'Pre-filled from last session — deselect anyone not joining today.', kind: 'note' },
            ],
            confirm: 'Start Bucking',
          },
          note: 'Pick the crew',
        },
        {
          screen: bucking([], [{
            title: BATCH,
            tags: [{ text: '6h 52m', tone: 'amber' }],
            fields: [['Plants:', '120'], ['Plants Grabbed:', '120'], ['Remaining:', '0'], ['Team:', '4']],
          }], [], { focusCard: [1, 0], action: 'Needs Bucking Weights', actionOn: 'card' }),
          note: 'All 120 plants grabbed on the Terminal',
        },
        {
          screen: bucking([], [], [{
            title: BATCH,
            tags: [{ text: 'Finalized', tone: 'purple' }],
            fields: [['Plants:', '120'], ['Grabbed:', '120'], ['Ended:', '2:22 PM'], ['Team:', '4']],
          }], { focusCard: [2, 0], action: 'Record Bucking Weights', actionOn: 'card' }),
          note: 'Bucking finalized - record weights before sending to Sorting',
        },
        {
          screen: bucking([], [], [{ title: BATCH, tags: [{ text: 'Finalized', tone: 'purple' }], fields: [['Plants:', '120']] }]),
          modal: {
            title: 'Record Weights & Send to Sorting',
            subtitle: 'Projected dry weight: 32062g',
            fields: [
              {
                label: '', kind: 'summary',
                rows: [['Strain:', STRAIN], ['Room:', 'Dry Room 2'], ['Plants:', '120'], ['Start Time:', '7:30 AM'], ['Team:', TEAM]],
              },
              { label: 'Bucking Waste (grams)', required: true, value: '4870', half: true },
              { label: 'Untrimmed Weight (g)', required: true, value: '31940', half: true },
              { label: 'Confirm End Time', kind: 'time', required: true, value: '02:22 PM', help: 'Sessions ended at finalization — adjust if needed.' },
            ],
            confirm: 'Record & Send to Sorting',
          },
          note: 'Record bucking waste and untrimmed weight',
        },
      ],
      after: bucking([], [], []),
      result: 'Weights recorded — moved to Sorting',
    },
    {
      id: 'sorting',
      label: 'Sorting',
      heading: 'Sort and grade into AAA, A and B',
      body: 'Sorting starts from the untrimmed weight with the team and machine settings. Finishing records every grade with tote counts, plus sorting trim and fan leaves, which flow automatically to pre-roll and extraction collection. A microbial check is confirmed before it moves on.',
      frames: [
        {
          screen: sorting([{
            title: BATCH,
            fields: [['Room:', 'Dry Room 2'], ['Untrimmed:', '31,940g'], ['Totes:', '—']],
          }], [], { focusCard: [0, 0], action: 'Start Sorting', actionOn: 'card' }),
          note: 'Start Sorting',
        },
        {
          screen: sorting([{ title: BATCH, fields: [['Untrimmed:', '31,940g']] }], []),
          modal: {
            title: 'Start Sorting',
            fields: [
              { label: '', kind: 'summary', rows: [['Strain:', STRAIN], ['Room:', 'Dry Room 2'], ['Untrimmed Weight:', '31940g']] },
              { label: 'Starting Weight (g)', required: true, value: '31940' },
              {
                label: 'Team Members * (Select one or more)', kind: 'checks',
                checks: [{ label: 'K. Patel', checked: true }, { label: 'B. Lee', checked: true }, { label: 'A. Diaz', checked: false }],
              },
              { label: 'VAC 1 (%)', value: '62', half: true },
              { label: 'VAC 2 (%)', value: '58', half: true },
              { label: 'Feeder Speed', value: '4' },
            ],
            confirm: 'Start Sorting',
          },
          note: 'Starting weight, team and machine settings',
        },
        {
          screen: sorting([], [{
            title: BATCH,
            fields: [['Start Weight:', '31,940g'], ['Sorting:', 'K. Patel, B. Lee'], ['Started:', '10/02 8:05 AM']],
          }], { focusCard: [1, 0], action: 'Finish', actionOn: 'card' }),
          note: 'Sorting started',
        },
        {
          screen: sorting([], [{ title: BATCH, fields: [['Start Weight:', '31,940g']] }]),
          modal: {
            title: 'Complete Sorting',
            wide: true,
            fields: [
              { label: '', kind: 'summary', rows: [['Strain:', STRAIN], ['Room:', 'Dry Room 2'], ['Sorted By:', 'K. Patel, B. Lee']] },
              { label: 'Bud Grade Weights', kind: 'heading' },
              { label: 'AAA Buds (g)', value: '14250', half: true },
              { label: 'AAA Totes', value: '4', half: true },
              { label: 'A Buds (g)', value: '9880', half: true },
              { label: 'A Totes', value: '3', half: true },
              { label: 'B Buds (g)', value: '5120', half: true },
              { label: 'B Totes', value: '2', half: true },
              { label: 'Sorting Trim (g)', value: '1980', half: true, help: 'Auto-added to Pre-Roll Collecting queue.' },
              { label: 'Fan Leaves (g)', value: '610', half: true, help: 'Auto-added to Extraction Collection.' },
              { label: 'End Time', kind: 'time', required: true, value: '01:40 PM' },
              { label: 'Microbial Check', kind: 'checks', checks: [{ label: 'Microbials Checked', checked: true }] },
            ],
            confirm: 'Complete Sorting',
          },
          note: 'Every gram accounted for by grade',
        },
      ],
      after: sorting([], []),
      result: 'Sorting complete — 610g fan leaves added to Collecting for Extraction',
    },
    {
      id: 'burp',
      label: 'Cure & Burp',
      heading: 'Cure with a burp checklist',
      body: 'Sorted batches land in Cure with their grade weights and tote count. Select batches and create a burp list: timed or fresh-air exchange, with a duration per cultivar. The floor team works it as a checklist with progress and elapsed time.',
      frames: [
        {
          screen: cure([cureCard(true)], { focusCard: [0, 0], action: 'Create Burp List' }),
          note: 'Select the batch, then Create Burp List',
        },
        {
          screen: cure([cureCard(true)], { focusCard: [0, 0] }),
          modal: {
            title: 'Create Burp List',
            fields: [
              { label: 'Scheduled Date', kind: 'date', value: '10/05/2026' },
              { label: 'Configure Burp Settings for Each Cultivar', kind: 'heading' },
              { label: BATCH, kind: 'checks', checks: [{ label: 'Timed', checked: true }, { label: 'FAE', checked: false }] },
              { label: 'Duration (minutes)', kind: 'checks', checks: [{ label: '5 min', checked: false }, { label: '10 min', checked: false }, { label: '15 min', checked: true }, { label: '30 min', checked: false }] },
            ],
            confirm: 'Create Burp List',
          },
          note: 'Timed burp, 15 minutes',
        },
      ],
      after: cure([cureCard(false)]),
      result: 'Burp list created with 1 cultivar(s)',
    },
    {
      id: 'ready-for-trim',
      label: 'Ready for Trim',
      heading: 'Final readings, then on to Trim',
      body: 'When the cure is done, the batch goes to Trim with its final moisture and water activity. Grade weights carry over from sorting, so the hand-off totals are already filled in.',
      frames: [
        {
          screen: cure([cureCard(false, '11.2%', '0.60 Aw')], { focusCard: [0, 0], action: 'Trim', actionOn: 'card' }),
          note: 'Trim',
        },
        {
          screen: cure([cureCard(false, '11.2%', '0.60 Aw')], { focusCard: [0, 0] }),
          modal: {
            title: 'Ready for Trim',
            fields: [
              { label: '', kind: 'summary', rows: [['Strain:', STRAIN], ['Room:', 'Cure Room']] },
              { label: 'Final Moisture Percentage', required: true, value: '11.2', half: true },
              { label: 'Water Activity', required: true, value: '0.60', half: true },
              { label: 'Bud Weights by Grade (grams)', kind: 'heading', value: 'from sorting' },
              { label: 'AAA Bud', value: '14250', half: true },
              { label: 'A Bud', value: '9880', half: true },
              { label: 'B Bud', value: '5120', half: true },
              { label: 'Trim Weight (grams)', value: '0', half: true },
              { label: '', kind: 'summary', rows: [['Bud Subtotal (AAA + A + B):', '29,250g'], ['Total Weight:', '29,250g']] },
            ],
            confirm: 'Move to Trim',
          },
          note: 'Final moisture and water activity',
        },
      ],
      after: cure([]),
      result: 'Moved to Trim - ready for weighing',
    },
    {
      id: 'trim',
      label: 'Trim',
      heading: 'Verify, bag, hand out, weigh back',
      body: 'Trim starts by verifying the AAA and A weight against what sorting recorded (B buds are set aside). The batch is split into weighed bags, each handed to a trimmer, timed, and weighed back by grade, so efficiency is tracked per person and per bag.',
      frames: [
        {
          screen: trim([[{
            title: BATCH,
            fields: [['Sent to Trim', '24,130g'], ['B Buds', '5,120g'], ['Remaining', '24,130g'], ['Verified', '—']],
          }], [], [], []], { focusCard: [0, 0], action: 'Verify', actionOn: 'card' }),
          note: 'Verify',
        },
        {
          screen: trim([[{ title: BATCH, fields: [['Sent to Trim', '24,130g']] }], [], [], []]),
          modal: {
            title: 'Verify Start Weight',
            subtitle: 'Verified By: lead.trim',
            fields: [
              { label: 'AAA Buds', value: '14250', half: true, help: 'Expected: 14250g' },
              { label: 'A Buds', value: '9880', half: true, help: 'Expected: 9880g' },
              { label: 'B Buds (set aside)', value: '5120' },
              { label: '', kind: 'summary', rows: [['Total Verified (AAA + A):', '24,130g'], ['Expected (AAA + A):', '24,130g']] },
            ],
            confirm: 'Verify Weight',
          },
          note: 'Matches sorting to the gram',
        },
        {
          screen: trim([[{
            title: BATCH,
            fields: [['Sent to Trim', '24,130g'], ['Remaining', '24,130g'], ['Verified', '24,130g']],
          }], [], [], []], { focusCard: [0, 0], action: 'Create Bags', actionOn: 'card' }),
          note: 'Start weight verified successfully',
        },
        {
          screen: trim([[{ title: BATCH, fields: [['Verified', '24,130g']] }], [], [], []]),
          modal: {
            title: `Weigh Bags - ${BATCH}`,
            fields: [
              { label: 'Bag 14 · Weight (grams)', kind: 'scale', value: '1,724.0 g' },
              { label: 'Tops bag', kind: 'checks', checks: [{ label: 'Tops bag', checked: false }] },
              { label: 'Assign to Employee (Optional)', kind: 'select', value: '' },
              { label: '', kind: 'summary', rows: [['Available to Allocate:', '24,130g'], ['Total Weight:', '24,130g'], ['Remaining:', '0g']] },
            ],
            confirm: 'Save Bags',
          },
          note: '14 bags weighed on the scale',
        },
        {
          screen: trim([[], [{
            title: 'Bag #3 · 1,724g',
            fields: [['Batch', BATCH], ['Status', 'Ready for handout']],
          }], [], []], { focusCard: [1, 0], action: 'Assign', actionOn: 'card' }),
          note: '14 bags created. Assign each one',
        },
        {
          screen: trim([[], [{ title: 'Bag #3 · 1,724g' }], [], []]),
          modal: {
            title: 'Assign Trim Employee',
            fields: [
              { label: 'Search employees...', kind: 'select', value: 'L. Park' },
              { label: 'Tap an employee to hand out the bag', kind: 'note' },
            ],
            confirm: 'L. Park',
          },
          note: 'Bag handed out and timed',
        },
        {
          screen: trim([[], [], [{
            title: 'Bag #3 · L. Park',
            tags: [{ text: '2h 41m', tone: 'amber' }],
            fields: [['Weight', '1,724g'], ['Status', 'In progress']],
          }], []], { focusCard: [2, 0], action: 'Complete', actionOn: 'card' }),
          note: 'Bag comes back to the scale',
        },
        {
          screen: trim([[], [], [{ title: 'Bag #3 · L. Park' }], []]),
          modal: {
            title: 'Weigh Trimmed Bag',
            wide: true,
            fields: [
              { label: 'Trimmed AAA (grams)', value: '1010', half: true },
              { label: 'Trimmed A (grams)', value: '312', half: true },
              { label: 'Trimmed B (grams)', value: '205', half: true },
              { label: 'Trim (grams)', value: '168', half: true },
              { label: 'Stem Weight (grams)', value: '21', half: true },
              { label: 'Damaged (grams)', value: '6', half: true },
              { label: 'Start Time', kind: 'time', value: '09:12 AM', half: true, help: 'Central Time' },
              { label: 'End Time', kind: 'time', value: '11:53 AM', half: true, help: 'Central Time' },
              { label: '', kind: 'summary', rows: [['Total:', '1,722g'], ['Expected:', '1,724g'], ['Difference:', '-2g']] },
            ],
            confirm: 'Complete Weighing',
          },
          note: 'Weighed back by grade',
        },
        {
          screen: trim([[], [], [], [{
            title: BATCH,
            tags: [{ text: '14/14 bags done', tone: 'green' }],
            fields: [['Trimmed A', '19,550g'], ['Trimmed B', '2,940g'], ['Total B', '8,060g']],
          }]], { focusCard: [3, 0], action: 'Move to Trim QC', actionOn: 'card' }),
          note: 'All 14 bags weighed back',
        },
      ],
      after: trim([[], [], [], []]),
      result: 'Moved to Trim QC',
    },
    {
      id: 'trim-qc',
      label: 'Trim QC',
      heading: 'Quality control before testing',
      body: 'QC confirms the microbial check, takes a batch photo and an average-nug photo, records moisture and water activity, and grades and weighs every bud tier with tote counts. Completing it reports the total to Verification & Routing.',
      frames: [
        {
          screen: trimQC([{
            title: BATCH,
            fields: [['Total:', '27,610g'], ['Ready:', '10/09 3:10 PM']],
          }], [], [], { focusCard: [0, 0], action: 'Start QC', actionOn: 'card' }),
          note: 'Start QC',
        },
        {
          screen: trimQC([{ title: BATCH, fields: [['Total:', '27,610g']] }], [], []),
          modal: {
            title: 'Trim QC',
            subtitle: `${BATCH} · QC Performed By: qc.lead`,
            wide: true,
            fields: [
              { label: 'Microbial Check', kind: 'checks', checks: [{ label: 'Microbials Checked', checked: true }] },
              { label: 'Batch Photo', value: '📷 batch.jpg', half: true },
              { label: 'Average Nug Photo', value: '📷 nug.jpg', half: true },
              { label: 'Moisture %', required: true, value: '11.0', half: true },
              { label: 'Water Activity', required: true, value: '0.600', half: true },
              { label: 'Bud Weight, Quality & Totes', kind: 'heading' },
              { label: 'AAA Bud · Weight (g) / Totes / Grade', required: true, value: '13940 · 4 · A' },
              { label: 'A Bud · Weight (g) / Totes / Grade', required: true, value: '5610 · 2 · A' },
              { label: 'B Bud · Weight (g) / Totes / Grade', required: true, value: '8060 · 3 · B' },
              { label: 'Wasted Weight (g)', required: true, value: '38', half: true },
              { label: 'Sifted During QC (g)', required: true, value: '22', half: true },
            ],
            confirm: 'Complete QC',
          },
          note: 'Photos, readings and graded weights',
        },
      ],
      after: trimQC([], [], [{ title: BATCH, fields: [['Total:', '27,610g'], ['QC by:', 'qc.lead']] }]),
      result: 'QC complete — 27610g total reported to V&R — batch sent to Verification & Routing',
    },
    {
      id: 'routing',
      label: 'Verification & Routing',
      heading: 'Route each grade, create the test batch',
      body: 'Every grade shows what’s left to route. Grades can go to pre-roll or extraction with one click, and the flower headed for sale becomes a testing batch with its METRC source and test tags. Testing batches are capped at 15 lbs, so a large lot is split into several.',
      metrc: 'Source and test package tags are typed in from METRC and stored on the testing batch.',
      frames: [
        {
          screen: vr([vrCard], { focusCard: [1, 0], action: 'Create Test Batch', actionOn: 'card' }),
          note: 'Create Test Batch',
        },
        {
          screen: vr([vrCard]),
          modal: {
            title: 'Create Testing Batches',
            subtitle: `${STRAIN} — HD 09/22 — Total: 27610g (60.9 lbs)`,
            wide: true,
            fields: [
              { label: 'Is this batch prepacked or bulk?', kind: 'checks', checks: [{ label: 'Prepacked', checked: false }, { label: 'Bulk', checked: true }] },
              { label: 'Testing Batch #1', kind: 'heading', value: '15.0 / 15.0 lbs' },
              { label: 'Source Tag', required: true, value: TAG_SRC, half: true },
              { label: 'Test Tag', required: true, value: TAG_TEST, half: true },
              { label: 'Lot Type', kind: 'select', required: true, value: 'A Bud', half: true },
              { label: 'Test Date', kind: 'date', required: true, value: '10/10/2026', half: true },
              { label: 'AAA Buds (g)', value: '6800', half: true },
              { label: 'A Buds (g)', value: '0', half: true },
              { label: 'Weight Verified', kind: 'checks', checks: [{ label: 'Weight Verified', checked: true }] },
            ],
            confirm: 'Create Partial Batch',
          },
          note: '15 lbs of AAA into Testing Batch #1',
        },
      ],
      after: vr([{ ...vrCard, fields: [['AAA Bud', '7,140g left'], ['A Bud', '5,610g left'], ['B Bud', '8,060g left']] }]),
      result: 'Created 1 testing batch(es) — routed weight auto-allocated to testing',
    },
    {
      id: 'testing',
      label: 'Testing Hub',
      heading: 'Send to the lab, pull results from METRC',
      body: 'The sample goes out with the lab and the grams taken recorded against the right grade. When the lab posts results, they’re searched in METRC by source tag and saved with the batch, and it moves straight to Allocation.',
      metrc: 'Potency, terpenes and the COA are read from METRC (license CUL000032). Nothing is written back.',
      frames: [
        {
          screen: testing([testCard()], [], { focusCard: [0, 0], action: 'Send to Testing', actionOn: 'card' }),
          note: 'Send to Testing',
        },
        {
          screen: testing([testCard()], []),
          modal: {
            title: 'Send to Testing',
            fields: [
              { label: '', kind: 'summary', rows: [['Source Tag:', TAG_SRC], ['Test Tag:', TAG_TEST], ['Total Weight:', '6800g']] },
              { label: 'Testing Company', kind: 'select', required: true, value: 'GPA' },
              { label: 'Weight Taken by Testing (grams)', required: true, value: '30', half: true },
              { label: 'Bud Grade Weight Was Taken From', kind: 'select', required: true, value: 'AAA', half: true },
              { label: '', kind: 'summary', rows: [['Remaining after testing:', '6,770g'], ['Deducted from:', 'AAA']] },
            ],
            confirm: 'Send to Testing',
          },
          note: 'Grams taken by the lab are recorded',
        },
        {
          screen: testing([], [testCard(true)], { focusCard: [1, 0], action: 'Add Test Results', actionOn: 'card' }),
          note: 'Moved to Testing In Progress. Results are in',
        },
        {
          screen: testing([], [testCard(true)]),
          modal: {
            title: 'Test Results',
            subtitle: 'Search METRC · Manual Entry',
            wide: true,
            fields: [
              { label: 'License Code', required: true, value: 'CUL000032', half: true },
              { label: 'Source Tag', required: true, value: TAG_SRC, half: true },
              {
                label: 'Found in METRC', kind: 'summary',
                rows: [['Total THC', '27.8%'], ['Delta-9 THC', '0.9%'], ['THCA', '30.6%'], ['Total Terpenes', '2.41%'], ['Moisture', '11.0%'], ['COA', '✓ PDF attached']],
              },
            ],
            confirm: 'Save Test Results',
          },
          note: 'Search METRC by source tag',
        },
      ],
      after: testing([], []),
      result: 'Test results saved - sent to Allocation Station',
    },
    {
      id: 'allocation',
      label: 'Allocation Station',
      heading: 'Allocate into products',
      body: 'Tested flower is split across product lines by grade, in units or grams, with live LeafLink inventory and the Trim QC photos beside it. The allocation drops straight into the packaging and label queues.',
      frames: [
        {
          screen: allocation([{
            title: `HD 09/22 · ${STRAIN}`,
            tags: [{ text: '6,770g remaining', tone: 'green' }],
            fields: [['AAA', '6,770g'], ['A', '0g'], ['B', '0g'], ['THC', '27.8%']],
          }], { focusCard: [0, 0], action: 'Allocate', actionOn: 'card' }),
          note: 'Allocate',
        },
        {
          screen: allocation([{ title: `HD 09/22 · ${STRAIN}` }]),
          modal: {
            title: `HD 09/22 · ${STRAIN}`,
            subtitle: 'Remaining to Allocate · AAA Grade 6,770g',
            wide: true,
            fields: [
              { label: 'Product Allocation (grams)', kind: 'heading' },
              { label: 'RESERVE 3.5g Jars · AAA', value: '1600 units', half: true, help: 'Enter UNITS (1 unit = 3.5g)' },
              { label: 'Packs 3.5g · AAA', value: '1170', half: true },
              {
                label: 'Batch Info', kind: 'summary',
                rows: [['Tag', TAG_TEST], ['Total Weight', '6,770g'], ['Total THC', '27.8%'], ['Total Terpenes', '2.41%']],
              },
              { label: 'Remaining: 0g', kind: 'note' },
            ],
            confirm: 'Send to Packaging Teams',
          },
          note: 'RESERVE 3.5g jars and Packs 3.5g',
        },
      ],
      after: allocation([]),
      result: 'Allocation complete -- 2 item(s) sent to packaging',
    },
    {
      id: 'labels',
      label: 'Labels',
      heading: 'Labels from the METRC results',
      body: 'The Label Creator pulls the test results from METRC and shows them beside the results stored in the Testing tab, then sets the package tag and unit count and exports the labels for printing.',
      metrc: 'Label results are retrieved from METRC by source package tag.',
      frames: [
        {
          screen: packaging([
            [{ pill: 'Labels Needing Printed', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600'],
            [{ pill: 'Pending Assignment', tone: 'gray' }, 'RESERVE 3.5g Jars', BATCH, '1,600'],
            [{ pill: 'Pending Assignment', tone: 'gray' }, 'Packs 3.5g', BATCH, '334'],
          ], { focusRow: 0, action: 'Print Labels', actionOn: 'row' }),
          note: 'Print Labels',
        },
        {
          screen: packaging([[{ pill: 'Labels Needing Printed', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600']]),
          modal: {
            title: 'Label Creator',
            subtitle: 'Step 1: Retrieve Test Results from METRC',
            fields: [
              { label: 'License Code', value: 'CUL000032', half: true },
              { label: 'Source Package Tag', value: TAG_SRC, half: true },
              {
                label: 'Stored Test Results (From Testing Tab)', kind: 'summary',
                rows: [['Total THC', '27.8%'], ['THCA', '30.6%'], ['Total Terpenes', '2.41%']],
              },
              {
                label: 'Retrieved from METRC', kind: 'summary',
                rows: [['Total THC', '27.8% ✓'], ['THCA', '30.6% ✓'], ['Total Terpenes', '2.41% ✓']],
              },
            ],
            confirm: 'Next: Source Package Tag & Units',
          },
          note: 'Stored and METRC results match',
        },
        {
          screen: packaging([[{ pill: 'Labels Needing Printed', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600']]),
          modal: {
            title: 'Label Creator',
            subtitle: 'Step 2: Source Package Tag & Units',
            fields: [
              { label: 'Source Package Tag', required: true, value: TAG_SRC },
              { label: 'Number of Units to Print', required: true, value: '1600' },
            ],
            confirm: 'Preview & Export',
          },
          note: '1,600 labels',
        },
        {
          screen: packaging([[{ pill: 'Labels Needing Printed', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600']]),
          modal: {
            title: 'Label Preview',
            fields: [
              {
                label: `${STRAIN} · 3.5g`, kind: 'summary',
                rows: [['Total THC', '27.8%'], ['Total Terpenes', '2.41%'], ['Test Tag', TAG_TEST], ['Batch', BATCH]],
              },
            ],
            confirm: 'Confirm & Export',
          },
          note: 'Check the label, then export',
        },
      ],
      after: packaging([
        [{ pill: 'Printed', tone: 'green' }, 'RESERVE 3.5g Jars', BATCH, '1,600'],
        [{ pill: 'Pending Assignment', tone: 'gray' }, 'RESERVE 3.5g Jars', BATCH, '1,600'],
        [{ pill: 'Pending Assignment', tone: 'gray' }, 'Packs 3.5g', BATCH, '334'],
      ]),
      result: 'Exported 1600 labels to JSON',
    },
    {
      id: 'packaging',
      label: 'Packaging',
      heading: 'Run packaging and casing',
      body: 'The item is assigned to hand or machine packaging. The run records the team, start time and weight going into the machine; completing it records the end time, leftover weight and cases, and sends it to fulfillment.',
      frames: [
        {
          screen: packaging([
            [{ pill: 'Pending Assignment', tone: 'gray' }, 'RESERVE 3.5g Jars', BATCH, '1,600'],
            [{ pill: 'Pending Assignment', tone: 'gray' }, 'Packs 3.5g', BATCH, '334'],
          ], { focusRow: 0, action: 'Machine', actionOn: 'row' }),
          note: 'Machine',
        },
        {
          screen: packaging([
            [{ pill: 'Machine Packaging', tone: 'blue' }, 'RESERVE 3.5g Jars', BATCH, '1,600'],
            [{ pill: 'Pending Assignment', tone: 'gray' }, 'Packs 3.5g', BATCH, '334'],
          ], { focusRow: 0, action: 'Start', actionOn: 'row' }),
          note: 'Assigned to Machine Packaging',
        },
        {
          screen: packaging([[{ pill: 'Machine Packaging', tone: 'blue' }, 'RESERVE 3.5g Jars', BATCH, '1,600']]),
          modal: {
            title: 'Start Machine Packaging',
            fields: [
              { label: 'Team Members * (Select one or more)', kind: 'checks', checks: [{ label: 'S. Moore', checked: true }, { label: 'D. Ruiz', checked: true }] },
              { label: 'Start Time', kind: 'time', required: true, value: '07:45 AM', half: true },
              { label: 'Weight Going Into Machine (grams)', required: true, value: '5600', half: true },
            ],
            confirm: 'Start Packaging',
          },
          note: 'Team, start time and weight in',
        },
        {
          screen: packaging([[{ pill: 'Currently Packaging', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600']], { focusRow: 0, action: 'Complete', actionOn: 'row' }),
          note: 'Packaging started',
        },
        {
          screen: packaging([[{ pill: 'Currently Packaging', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600']]),
          modal: {
            title: 'Complete Machine Run',
            wide: true,
            fields: [
              { label: 'End Time', kind: 'time', required: true, value: '01:20 PM', half: true },
              { label: 'Remaining Weight for Verification & Routing (grams)', value: '0', half: true },
              { label: 'Was any weight left unprocessed? *', kind: 'checks', checks: [{ label: 'No', checked: true }, { label: 'Yes', checked: false }] },
              { label: 'Was the product also cased? *', kind: 'checks', checks: [{ label: 'Yes', checked: true }, { label: 'No', checked: false }] },
              { label: 'Cases Produced', required: true, value: '15', half: true },
              { label: 'Units per Case', required: true, value: '100', half: true },
              { label: 'Partial Units', required: true, value: '90', half: true },
              { label: 'Total Sample Units', value: '10', half: true },
            ],
            confirm: 'Mark Complete',
          },
          note: 'Cased on the line',
        },
      ],
      after: packaging([[{ pill: 'Pending Assignment', tone: 'gray' }, 'Packs 3.5g', BATCH, '334']]),
      result: 'Packaging complete — sent to fulfillment',
    },
    {
      id: 'fulfillment',
      label: 'Fulfillment',
      heading: 'Check in before inventory is released',
      body: 'Fulfillment verifies the brand, product line, METRC tag and approval number, ticks off every label check against the COA, and confirms the unit count against what packaging recorded. A mismatch needs a supervisor PIN and an explanation.',
      frames: [
        {
          screen: fulfillment([[STRAIN, 'RESERVE 3.5g Jars', TAG_PKG, { pill: '1,600 units', tone: 'amber' }]], { focusRow: 0, action: 'Check In', actionOn: 'row' }),
          note: 'Check In',
        },
        {
          screen: fulfillment([[STRAIN, 'RESERVE 3.5g Jars', TAG_PKG, { pill: '1,600 units', tone: 'amber' }]]),
          modal: {
            title: 'Fulfillment Check-In',
            subtitle: 'Quality verification before inventory release',
            wide: true,
            fields: [
              { label: 'Product Information', kind: 'heading' },
              { label: 'Brand', kind: 'select', required: true, value: 'RESERVE', half: true },
              { label: 'Product Line', kind: 'select', required: true, value: 'RESERVE 3.5g Jars', half: true },
              { label: 'METRC Tag', value: TAG_PKG, half: true },
              { label: 'Approval #', required: true, value: 'A-2210', half: true },
              {
                label: 'Quality Verification', kind: 'checks',
                checks: ['Strain Name Verified', 'Correct Test Tag', 'Correct METRC Src Tag', 'Product Weight', 'Cannabinoids', 'Terpene Profile'].map((l) => ({ label: l, checked: true })),
              },
              {
                label: 'Unit Count Confirmation', kind: 'summary',
                rows: [['Cases (×100 ea)', '15'], ['Partial Units', '90'], ['Total Sample Units', '10'], ['Total Units', '1,600 ✓ matches packaging']],
              },
            ],
            confirm: 'Complete Check-In',
          },
          note: 'Every label check and the unit count',
        },
      ],
      after: fulfillment([]),
      result: 'Check-in completed successfully',
    },
  ],
}
