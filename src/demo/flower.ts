import type { Cell, DemoCard, DemoScreen, DemoWorkflow } from './types'
import SelectHarvestsToImportModal from './hh/modals/SelectHarvestsToImportModal'
import MetrcHarvestCreateModal from './hh/modals/MetrcHarvestCreateModal'
import MissingMoistureReadingsModal from './hh/modals/MissingMoistureReadingsModal'
import MoistureLogModal from './hh/modals/MoistureLogModal'
import BuckingStartModal from './hh/modals/BuckingStartModal'
import RecordBuckingWeightsModal from './hh/modals/RecordBuckingWeightsModal'
import SortingStartModal from './hh/modals/SortingStartModal'
import SortingCompleteModal from './hh/modals/SortingCompleteModal'
import CreateBurpListModal from './hh/modals/CreateBurpListModal'
import ReadyForTrimModal from './hh/modals/ReadyForTrimModal'
import TrimStartWeightModal from './hh/modals/TrimStartWeightModal'
import TrimBagInputModal from './hh/modals/TrimBagInputModal'
import AssignTrimEmployeeModal from './hh/modals/AssignTrimEmployeeModal'
import TrimBagWeighingModal from './hh/modals/TrimBagWeighingModal'
import TrimQCModal from './hh/modals/TrimQCModal'
import CreateTestingBatchesModal from './hh/modals/CreateTestingBatchesModal'
import SendToTestingModal from './hh/modals/SendToTestingModal'
import TestResultsModal from './hh/modals/TestResultsModal'
import AllocateModal from './hh/modals/AllocateModal'
import LabelCreatorStep1Modal from './hh/modals/LabelCreatorStep1Modal'
import LabelCreatorStep2Modal from './hh/modals/LabelCreatorStep2Modal'
import LabelPreviewModal from './hh/modals/LabelPreviewModal'
import StartMachinePackagingModal from './hh/modals/StartMachinePackagingModal'
import CompleteMachineRunModal from './hh/modals/CompleteMachineRunModal'
import FulfillmentCheckInModal from './hh/modals/FulfillmentCheckInModal'
import SelectHarvestDateModal from './hh/modals/SelectHarvestDateModal'
import { BATCH, STRAIN, TAG_PKG, TAG_SRC, TAG_TEST } from './hh/demoData'

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
  toolbar: ['Strategy', 'Analytics', 'Sync Inventory'],
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
          modal: { real: SelectHarvestDateModal, confirm: 'Load Harvests' },
          note: 'Choose the harvest date',
        },
        {
          screen: dryRooms([]),
          modal: { real: SelectHarvestsToImportModal, confirm: 'Continue with 1 Harvest' },
          note: 'Select the METRC harvest',
        },
        {
          screen: dryRooms([]),
          modal: { real: MetrcHarvestCreateModal, confirm: 'Create 1 Batch' },
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
          modal: { real: MissingMoistureReadingsModal, confirm: 'Log Readings Now' },
          note: 'Readings are required before bucking',
        },
        {
          screen: dryRooms([gcDrying('Final Checks (Days 8-10)', '9', 'Not logged')], { focusCard: [1, 0] }),
          modal: { real: MoistureLogModal, confirm: 'Save Entry' },
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
          modal: { real: BuckingStartModal, confirm: 'Start Bucking' },
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
          modal: { real: RecordBuckingWeightsModal, confirm: 'Record & Send to Sorting' },
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
          modal: { real: SortingStartModal, confirm: 'Start Sorting' },
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
          modal: { real: SortingCompleteModal, confirm: 'Complete Sorting' },
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
          modal: { real: CreateBurpListModal, confirm: 'Create Burp List' },
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
          modal: { real: ReadyForTrimModal, confirm: 'Move to Trim' },
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
          modal: { real: TrimStartWeightModal, confirm: 'Verify Weight' },
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
          modal: { real: TrimBagInputModal, confirm: 'Save Bags' },
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
          modal: { real: AssignTrimEmployeeModal, confirm: 'L. Park' },
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
          modal: { real: TrimBagWeighingModal, confirm: 'Complete Weighing' },
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
          modal: { real: TrimQCModal, confirm: 'Complete QC' },
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
          modal: { real: CreateTestingBatchesModal, confirm: 'Create Partial Batch' },
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
          modal: { real: SendToTestingModal, confirm: 'Send to Testing' },
          note: 'Grams taken by the lab are recorded',
        },
        {
          screen: testing([], [testCard(true)], { focusCard: [1, 0], action: 'Add Test Results', actionOn: 'card' }),
          note: 'Moved to Testing In Progress. Results are in',
        },
        {
          screen: testing([], [testCard(true)]),
          modal: { real: TestResultsModal, confirm: 'Save Test Results' },
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
      body: 'Tested flower is split across product lines by grade, in units or grams, with current sales inventory and the Trim QC photos beside it. The allocation drops straight into the packaging and label queues.',
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
          modal: { real: AllocateModal, confirm: 'Send to Packaging Teams' },
          note: 'RESERVE 3.5g Jars (1,600 units) and Robust 3.5g Bags',
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
            [{ pill: 'Pending Assignment', tone: 'gray' }, 'Robust 3.5g Bags', BATCH, '254'],
          ], { focusRow: 0, action: 'Print Labels', actionOn: 'row' }),
          note: 'Print Labels',
        },
        {
          screen: packaging([[{ pill: 'Labels Needing Printed', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600']]),
          modal: { real: LabelCreatorStep1Modal, confirm: 'Next: Source Package Tag & Units' },
          note: 'Stored and METRC results match',
        },
        {
          screen: packaging([[{ pill: 'Labels Needing Printed', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600']]),
          modal: { real: LabelCreatorStep2Modal, confirm: 'Preview & Export' },
          note: '1,600 labels',
        },
        {
          screen: packaging([[{ pill: 'Labels Needing Printed', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600']]),
          modal: { real: LabelPreviewModal, confirm: 'Confirm & Export' },
          note: 'Check the label, then export',
        },
      ],
      after: packaging([
        [{ pill: 'Printed', tone: 'green' }, 'RESERVE 3.5g Jars', BATCH, '1,600'],
        [{ pill: 'Pending Assignment', tone: 'gray' }, 'RESERVE 3.5g Jars', BATCH, '1,600'],
        [{ pill: 'Pending Assignment', tone: 'gray' }, 'Robust 3.5g Bags', BATCH, '254'],
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
            [{ pill: 'Pending Assignment', tone: 'gray' }, 'Robust 3.5g Bags', BATCH, '254'],
          ], { focusRow: 0, action: 'Machine', actionOn: 'row' }),
          note: 'Machine',
        },
        {
          screen: packaging([
            [{ pill: 'Machine Packaging', tone: 'blue' }, 'RESERVE 3.5g Jars', BATCH, '1,600'],
            [{ pill: 'Pending Assignment', tone: 'gray' }, 'Robust 3.5g Bags', BATCH, '254'],
          ], { focusRow: 0, action: 'Start', actionOn: 'row' }),
          note: 'Assigned to Machine Packaging',
        },
        {
          screen: packaging([[{ pill: 'Machine Packaging', tone: 'blue' }, 'RESERVE 3.5g Jars', BATCH, '1,600']]),
          modal: { real: StartMachinePackagingModal, confirm: 'Start Packaging' },
          note: 'Team, start time and weight in',
        },
        {
          screen: packaging([[{ pill: 'Currently Packaging', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600']], { focusRow: 0, action: 'Complete', actionOn: 'row' }),
          note: 'Packaging started',
        },
        {
          screen: packaging([[{ pill: 'Currently Packaging', tone: 'amber' }, 'RESERVE 3.5g Jars', BATCH, '1,600']]),
          modal: { real: CompleteMachineRunModal, confirm: 'Mark Complete' },
          note: 'Cased on the line',
        },
      ],
      after: packaging([[{ pill: 'Pending Assignment', tone: 'gray' }, 'Robust 3.5g Bags', BATCH, '254']]),
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
          modal: { real: FulfillmentCheckInModal, confirm: 'Complete Check-In' },
          note: 'Every label check and the unit count',
        },
      ],
      after: fulfillment([]),
      result: 'Check-in completed successfully',
    },
  ],
}
