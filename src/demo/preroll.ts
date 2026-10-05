import type { DemoCard, DemoScreen, DemoWorkflow } from './types'
import { HD, STRAIN } from './hh/demoData'
import {
  PR_CASES, PR_FINAL_G, PR_FIX_LEFTOVER_G, PR_LABEL_TEAM, PR_LABEL_UNITS, PR_LAB_UNITS, PR_MACHINE_COUNT,
  PR_PARTIALS, PR_ROUTED_G, PR_SFP_LEFTOVER_G, PR_SFP_TEAM, PR_SRC_SHORT, PR_UNITS, TAG_PROD, TAG_PR_TEST,
} from './hh/modals/preroll/data'
import RouteToPreRollModal from './hh/modals/preroll/RouteToPreRollModal'
import CreatePreRollBatchSelectModal from './hh/modals/preroll/CreatePreRollBatchSelectModal'
import CreatePreRollBatchAllocateModal from './hh/modals/preroll/CreatePreRollBatchAllocateModal'
import ConfirmGrindModal from './hh/modals/preroll/ConfirmGrindModal'
import RecordStemWeightModal from './hh/modals/preroll/RecordStemWeightModal'
import ConfirmMachineStartModal from './hh/modals/preroll/ConfirmMachineStartModal'
import MachineReadyModal from './hh/modals/preroll/MachineReadyModal'
import EndMachineRunModal from './hh/modals/preroll/EndMachineRunModal'
import StartSortingFixingModal from './hh/modals/preroll/StartSortingFixingModal'
import CompleteSortingFixingModal from './hh/modals/preroll/CompleteSortingFixingModal'
import SfpQualityControlModal from './hh/modals/preroll/SfpQualityControlModal'
import CreatePreRollTestingBatchesModal from './hh/modals/preroll/CreatePreRollTestingBatchesModal'
import SendToTestingLabModal from './hh/modals/preroll/SendToTestingLabModal'
import PreRollTestResultsModal from './hh/modals/preroll/PreRollTestResultsModal'
import StartLabelingConfigModal from './hh/modals/preroll/StartLabelingConfigModal'
import StartLabelingTeamModal from './hh/modals/preroll/StartLabelingTeamModal'
import CompleteLabelingModal from './hh/modals/preroll/CompleteLabelingModal'
import LabelQCVerificationModal from './hh/modals/preroll/LabelQCVerificationModal'
import PreRollFulfillmentCheckInModal from './hh/modals/preroll/PreRollFulfillmentCheckInModal'

/*
 * Pre-roll walkthrough, click for click as HarvestHub V1 runs it today:
 * Verification & Routing (B Bud → Pre-Roll) → PR Allocation (Create Batch) →
 * PR Queue (grind, stem weight, machine run) → S/F/P Queue (sort/fix/pack, QC) →
 * Testing Hub, Pre-Roll tab (testing batch, lab, METRC results) → Pre-Roll
 * Labeling (labeling, label QC) → Fulfillment check-in.
 *
 * Page titles, buttons, modals and toasts are copied from the HarvestHub repo
 * (src/components). The material is the Gelato Cake B Bud left over from the
 * flower walkthrough (HD 09/22, 8,060 g). Weights, names and tags are demo data.
 */

const g = (n: number) => `${n.toLocaleString()}g`
const SFP_TEAM = PR_SFP_TEAM.join(', ')

/* ── Verification & Routing ───────────────────────────────── */

const vrCard = (bLeft: string): DemoCard => ({
  title: `${STRAIN} · ${HD}`,
  tags: [{ text: '27,610g total', tone: 'gray' }],
  fields: [['AAA Bud', '7,140g left'], ['A Bud', '5,610g left'], ['B Bud', bLeft]],
})

const vr = (card: DemoCard, extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Flower',
  item: 'Verification & Routing',
  title: 'Verification & Routing',
  subtitle: 'Reweigh bags, verify weights, and route each grade to its destination — partially or all at once',
  panels: [
    { title: 'Designated for Pre-Roll', tone: 'teal', cards: [] },
    { title: 'Flower Pre-Testing', tone: 'blue', cards: [card] },
  ],
  ...extra,
})

/* ── PR Allocation ────────────────────────────────────────── */

const prAllocation = (withGelato: boolean, extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Pre-Roll',
  item: 'PR Allocation',
  title: 'PR Allocation',
  subtitle: 'Verified, production-ready material allocated for pre-roll blending and production',
  toolbar: ['Monthly Report', 'Manual Entry'],
  kpis: [
    { label: 'Total Weight', value: g(2310 + (withGelato ? PR_ROUTED_G : 0)) },
    { label: 'Bud Weight', value: g(withGelato ? PR_ROUTED_G : 0), tone: 'green' },
    { label: 'Trim Weight', value: g(2310), tone: 'blue' },
    { label: 'Days of Material', value: withGelato ? '~3.4' : '~1.0', tone: 'amber' },
  ],
  columns: ['Cultivar', 'Available', 'In Batches', 'Original', 'Age (Days)', '% Used', 'Status'],
  rows: [
    ...(withGelato ? [[STRAIN, g(PR_ROUTED_G), '0g', g(PR_ROUTED_G), '0', '0%', { pill: 'Available', tone: 'green' as const }]] : []),
    ['Lemon Cherry Haze', '2,310g', '0g', '2,310g', '6', '0%', { pill: 'Available', tone: 'green' }],
  ],
  ...extra,
})

/* ── PR Queue ─────────────────────────────────────────────── */

const prCard = (extra: [string, string][] = []): DemoCard => ({
  title: `#1 ${STRAIN}`,
  tags: [{ text: 'Packs', tone: 'amber' }],
  fields: [['Weight', g(PR_ROUTED_G)], ['Added', 'Oct 12'], ['Tag', PR_SRC_SHORT], ['5pk', g(PR_ROUTED_G)], ...extra],
})

const lchQueued: DemoCard = {
  title: '#2 Lemon Cherry Haze',
  tags: [{ text: 'Robust', tone: 'red' }],
  fields: [['Weight', '2,310g'], ['Added', 'Oct 12'], ['2pk', '2,310g']],
}

const cerealMilkRunning: DemoCard = {
  title: 'Cereal Milk',
  band: { text: 'Machine 2', tone: 'green' },
  fields: [['Op', 'pr.lead'], ['Wt', '4,980g'], ['Started', '6:55 AM']],
}

const gelatoRunning: DemoCard = {
  title: STRAIN,
  band: { text: 'Machine 1', tone: 'green' },
  tags: [{ text: 'Packs', tone: 'amber' }],
  fields: [['Op', 'pr.lead'], ['Wt', g(PR_FINAL_G)], ['Started', '7:40 AM'], ['5pk', g(PR_ROUTED_G)]],
}

const prQueue = (cols: [DemoCard[], DemoCard[], DemoCard[], DemoCard[]], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Pre-Roll',
  item: 'PR Queue',
  title: 'Pre-Roll Queue',
  subtitle: 'Manage pre-roll production batches',
  toolbar: ['Throughput Report', 'Production Log', 'Cards', 'Board'],
  panels: [
    { title: 'Ready for Grind', tone: 'gray', cards: cols[0] },
    { title: 'Ready for Sift', tone: 'amber', cards: cols[1] },
    { title: 'Ready For Machine', tone: 'blue', cards: cols[2] },
    { title: 'In Progress', tone: 'green', cards: cols[3] },
  ],
  ...extra,
})

/* ── S/F/P Queue ──────────────────────────────────────────── */

const sfpCard = (fields: [string, string][], tags: DemoCard['tags'] = [{ text: 'Packs 5pk', tone: 'amber' }]): DemoCard => ({
  title: STRAIN,
  tags,
  fields,
})

const sfpReady = sfpCard([['Units', `${PR_MACHINE_COUNT.toLocaleString()} units`], ['Weight', g(PR_ROUTED_G)], ['Added', 'Oct 12'], ['Fixing:', `${PR_FIX_LEFTOVER_G}g`]])
const sfpInProgress = sfpCard([['Team:', SFP_TEAM], ['Started', '7:30 AM']])
const sfpReadyQC = sfpCard([['Units:', String(PR_UNITS)], ['Leftover:', `${PR_SFP_LEFTOVER_G}g`], ['Team:', SFP_TEAM]])

const sfp = (cols: [DemoCard[], DemoCard[], DemoCard[], DemoCard[]], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Pre-Roll',
  item: 'S/F/P Queue',
  title: 'Sorting/Fixing/Packaging Queue',
  subtitle: 'Complete sorting, fixing, and packaging workflow with QC',
  toolbar: ['Create Batch', 'Throughput Report'],
  panels: [
    { title: 'Ready for Sorting/Fixing/Packaging', tone: 'gray', cards: cols[0] },
    { title: 'In Progress — Sorting/Fixing', tone: 'blue', cards: cols[1] },
    { title: 'Ready for S/F/P QC', tone: 'amber', cards: cols[2] },
    { title: 'In QC', tone: 'gray', cards: cols[3] },
  ],
  ...extra,
})

/* ── Testing Hub (Pre-Roll tab) ───────────────────────────── */

const toCreateCard: DemoCard = {
  title: STRAIN,
  tags: [{ text: 'Packs 5pk', tone: 'amber' }, { text: PR_SRC_SHORT, tone: 'gray' }],
  fields: [['Units assigned', '3,224 Packs 5pk']],
}

const readyForTestingCard: DemoCard = {
  title: STRAIN,
  tags: [{ text: 'Packs', tone: 'amber' }, { text: 'Tagged', tone: 'blue' }],
  fields: [['Test Tag', TAG_PR_TEST], ['Source', TAG_PROD], ['Total Units', String(PR_UNITS)], ['Pack Size', '5pk']],
}

const atLabCard: DemoCard = {
  title: STRAIN,
  tags: [{ text: 'Packs', tone: 'amber' }, { text: 'At Lab', tone: 'amber' }],
  fields: [['Total', String(PR_UNITS)], ['Sample', String(PR_LAB_UNITS)], ['Forward', String(PR_LABEL_UNITS)]],
}

const passedCard: DemoCard = {
  title: STRAIN,
  tags: [{ text: 'Packs', tone: 'amber' }, { text: 'Passed', tone: 'green' }],
  fields: [['Δ9 THC', '0.41%']],
}

const testing = (cols: [DemoCard[], DemoCard[], DemoCard[], DemoCard[]], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Testing Center',
  item: 'Testing Hub',
  title: 'Testing Hub',
  subtitle: 'All products in testing — flower, pre-roll, and hash',
  toolbar: ['Flower', 'Pre-Roll', 'Hash Lab', 'History', 'Sample Calculator'],
  panels: [
    { title: 'Ready to Create Batch', tone: 'gray', cards: cols[0] },
    { title: 'Ready for Testing', tone: 'blue', cards: cols[1] },
    { title: 'At Lab', tone: 'amber', cards: cols[2] },
    { title: 'Recently Tested', tone: 'green', cards: cols[3] },
  ],
  ...extra,
})

/* ── Pre-Roll Labeling ────────────────────────────────────── */

const labelCard = (fields: [string, string][]): DemoCard => ({
  title: STRAIN,
  tags: [{ text: 'Packs', tone: 'amber' }, { text: '5pk', tone: 'gray' }],
  fields: [['Tag', TAG_PR_TEST], ['THC', '24.9%'], ...fields],
})

const labeling = (cols: [DemoCard[], DemoCard[], DemoCard[], DemoCard[]], extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Pre-Roll',
  item: 'Labeling',
  title: 'Pre-Roll Labeling',
  subtitle: 'Manage label printing and labeling workflow for pre-rolls',
  toolbar: ['Add Missing Batch'],
  panels: [
    { title: 'Ready for Labeling', tone: 'blue', cards: cols[0] },
    { title: 'Labeling In Progress', tone: 'amber', cards: cols[1] },
    { title: 'Labeling QC Pending', tone: 'amber', cards: cols[2] },
    { title: 'Recently Labeled', tone: 'green', cards: cols[3] },
  ],
  ...extra,
})

/* ── Fulfillment ──────────────────────────────────────────── */

const fulfillmentRow = [STRAIN, 'Packs 5pk', TAG_PR_TEST, { pill: `${PR_LABEL_UNITS.toLocaleString()} units`, tone: 'amber' as const }]

const fulfillment = (pending: boolean, extra: Partial<DemoScreen> = {}): DemoScreen => ({
  section: 'Fulfillment',
  item: 'Fulfillment Hub',
  title: 'Fulfillment',
  subtitle: 'Quality check-in & inventory release',
  kpis: [
    { label: 'Ready', value: pending ? '1' : '0', tone: 'amber' },
    { label: 'Checked In', value: pending ? '14' : '15', tone: 'green' },
    { label: 'Total Units', value: pending ? '9,840' : (9840 + PR_LABEL_UNITS).toLocaleString() },
  ],
  columns: ['Strain', 'Product Line', 'Tag', 'Units'],
  rows: pending ? [fulfillmentRow] : [],
  ...extra,
})

export const preroll: DemoWorkflow = {
  id: 'preroll',
  name: 'Pre-Roll',
  tagline: 'Routed B bud to checked-in pre-roll packs',
  summary: 'Route B bud from Verification & Routing, build a batch in PR Allocation, then grind, sift and run it on the machine, sort/fix/pack with QC, test it, label it and check it in.',
  icon: '🚬',
  batch: `${HD} ${STRAIN} B Bud`,
  steps: [
    {
      id: 'route',
      label: 'Route to Pre-Roll',
      heading: 'Route the B bud to Pre-Roll',
      body: 'Pre-roll starts where flower QC ends. In Verification & Routing, the B bud left on the Gelato Cake card is routed to Pre-Roll with its METRC package tag, and the weight lands in the pre-roll collection with its source harvest attached.',
      metrc: 'The METRC package tag is typed in (optional) and stays with the material through the pre-roll pipeline.',
      frames: [
        {
          screen: vr(vrCard('8,060g left'), { focusCard: [1, 0], action: 'Route', actionOn: 'card' }),
          note: 'B Bud: 8,060 g, destination Pre-Roll, then Route',
        },
        {
          screen: vr(vrCard('8,060g left')),
          modal: { real: RouteToPreRollModal, confirm: 'Route to Pre-Roll' },
          note: 'Confirm the METRC tag',
        },
      ],
      after: vr(vrCard('Fully allocated'), { focusCard: [1, 0] }),
      result: `${g(PR_ROUTED_G)} B Bud → Pre-Roll`,
    },
    {
      id: 'pr-allocation',
      label: 'PR Allocation',
      heading: 'Build a batch and allocate it to SKUs',
      body: 'PR Allocation holds every gram designated for pre-roll. Create Batch picks the material (the batch name fills in from the cultivar or a saved blend), then allocates the grams to SKUs with current stock beside each pack size, so the line restocks what is out.',
      frames: [
        {
          screen: prAllocation(true, { focusRow: 0, action: 'Create Batch', actionOn: 'header' }),
          note: 'Create Batch',
        },
        {
          screen: prAllocation(true),
          modal: { real: CreatePreRollBatchSelectModal, confirm: 'Allocate' },
          note: 'Select the Gelato Cake lot',
        },
        {
          screen: prAllocation(true),
          modal: { real: CreatePreRollBatchAllocateModal, confirm: 'Create Batch' },
          note: 'All 8,060 g to Packs 5pk, out of stock',
        },
      ],
      after: prAllocation(false),
      result: `Batch "${STRAIN}" created successfully`,
    },
    {
      id: 'grind',
      label: 'Grind',
      heading: 'Grind',
      body: 'The PR Queue moves each batch through Ready for Grind, Ready for Sift and Ready For Machine, showing the SKU allocation on every card. Grinding is confirmed against the batch weight.',
      frames: [
        {
          screen: prQueue([[prCard(), lchQueued], [], [], [cerealMilkRunning]], { focusCard: [0, 0], action: 'Grind Complete', actionOn: 'card' }),
          note: 'Grind Complete',
        },
        {
          screen: prQueue([[prCard(), lchQueued], [], [], [cerealMilkRunning]]),
          modal: { real: ConfirmGrindModal, confirm: 'Confirm Grind' },
          note: 'Confirm the batch weight',
        },
      ],
      after: prQueue([[lchQueued], [prCard()], [], [cerealMilkRunning]], { focusCard: [1, 0] }),
      result: 'Grind confirmed — ready for sift',
    },
    {
      id: 'sift',
      label: 'Stem Weight',
      heading: 'Sift: stem weight and misc loss',
      body: 'After sifting, the stems removed and any misc loss are weighed and deducted. HarvestHub shows the final weight going into the machine, so loss is visible per batch.',
      frames: [
        {
          screen: prQueue([[lchQueued], [prCard()], [], [cerealMilkRunning]], { focusCard: [1, 0], action: 'Stem Weight', actionOn: 'card' }),
          note: 'Stem Weight',
        },
        {
          screen: prQueue([[lchQueued], [prCard()], [], [cerealMilkRunning]]),
          modal: { real: RecordStemWeightModal, confirm: 'Record Stem Weight & Misc Loss' },
          note: '296 g stems, 22 g misc loss: 7,742 g into the machine',
        },
      ],
      after: prQueue([[lchQueued], [], [prCard([['After sift', g(PR_FINAL_G)]])], [cerealMilkRunning]], { focusCard: [2, 0] }),
      result: 'Sift weight recorded',
    },
    {
      id: 'machine-start',
      label: 'Start Run',
      heading: 'Start the machine run with a new production tag',
      body: 'Starting a run picks the machine, confirms the actual start weight and records the new production METRC tag for the finished pre-rolls. A second check confirms the machine is loaded before the clock starts.',
      metrc: 'The new production package tag is typed in from METRC and stored on the machine session.',
      frames: [
        {
          screen: prQueue([[lchQueued], [], [prCard([['After sift', g(PR_FINAL_G)]])], [cerealMilkRunning]], { focusCard: [2, 0], action: 'Start Run', actionOn: 'card' }),
          note: 'Start Run',
        },
        {
          screen: prQueue([[lchQueued], [], [prCard([['After sift', g(PR_FINAL_G)]])], [cerealMilkRunning]]),
          modal: { real: ConfirmMachineStartModal, confirm: 'Next' },
          note: 'Machine 1, start weight and production tag',
        },
        {
          screen: prQueue([[lchQueued], [], [prCard([['After sift', g(PR_FINAL_G)]])], [cerealMilkRunning]]),
          modal: { real: MachineReadyModal, confirm: 'Start Machine' },
          note: 'Machine loaded and ready',
        },
      ],
      after: prQueue([[lchQueued], [], [], [gelatoRunning, cerealMilkRunning]], { focusCard: [3, 0] }),
      result: 'Machine started',
    },
    {
      id: 'machine-end',
      label: 'End Run',
      heading: 'End the run with the counter reading',
      body: 'Ending the run records the start and end of each production day, the machine counter and the leftover grams kept for fixing underfills. Runs that span two shifts get a Day 2 card.',
      frames: [
        {
          screen: prQueue([[lchQueued], [], [], [gelatoRunning, cerealMilkRunning]], { focusCard: [3, 0], action: 'End Run', actionOn: 'card' }),
          note: 'End Run',
        },
        {
          screen: prQueue([[lchQueued], [], [], [gelatoRunning, cerealMilkRunning]]),
          modal: { real: EndMachineRunModal, confirm: 'Complete Run' },
          note: '15,262 pre-rolls, 104 g left for fixing',
        },
      ],
      after: prQueue([[lchQueued], [], [], [cerealMilkRunning]]),
      result: 'Machine run completed - moved to Sorting/Fixing/Packaging',
    },
    {
      id: 'sfp',
      label: 'S/F/P',
      heading: 'Sort, fix and pack as a team',
      body: 'The Sorting/Fixing/Packaging queue starts a session with the crew. Ending it records the units packed, fixing weight and leftovers, plus how many pre-rolls each teammate fixed.',
      frames: [
        {
          screen: sfp([[sfpReady], [], [], []], { focusCard: [0, 0], action: 'Start', actionOn: 'card' }),
          note: 'Start',
        },
        {
          screen: sfp([[sfpReady], [], [], []]),
          modal: { real: StartSortingFixingModal, confirm: `Start (${SFP_TEAM})` },
          note: 'Pick the team',
        },
        {
          screen: sfp([[], [sfpInProgress], [], []], { focusCard: [1, 0], action: 'End Run', actionOn: 'card' }),
          note: 'Started Sorting/Fixing & Packaging',
        },
        {
          screen: sfp([[], [sfpInProgress], [], []]),
          modal: { real: CompleteSortingFixingModal, confirm: 'Complete' },
          note: '3,046 packs, fixes per teammate',
        },
      ],
      after: sfp([[], [], [sfpReadyQC], []], { focusCard: [2, 0] }),
      result: 'Sorting/Fixing & Packaging complete - ready for QC',
    },
    {
      id: 'sfp-qc',
      label: 'S/F/P QC',
      heading: 'QC the packed units',
      body: 'A QC lead confirms the unit count per SKU and the team total, sends the leftover grams back to Verification & Routing, and logs any mistakes by employee.',
      frames: [
        {
          screen: sfp([[], [], [sfpReadyQC], []], { focusCard: [2, 0], action: 'Start QC', actionOn: 'card' }),
          note: 'Start QC',
        },
        {
          screen: sfp([[], [], [], [sfpCard([['QC:', 'qc.lead'], ['Units:', String(PR_UNITS)], ['Leftover:', `${PR_SFP_LEFTOVER_G}g`]])]]),
          modal: { real: SfpQualityControlModal, confirm: 'Complete QC - Ready for Testing' },
          note: '3,046 units confirmed, 38 g back to V&R',
        },
      ],
      after: sfp([[], [], [], []]),
      result: 'QC complete - ready for testing assignment',
    },
    {
      id: 'pr-testing',
      label: 'Testing Batch',
      heading: 'Create the testing batch and send it to the lab',
      body: 'In the Testing Hub’s Pre-Roll tab, the QC’d batch becomes a testing batch with its source and test tags. The lab’s sample is recorded in packs, and the rest moves forward.',
      metrc: 'The production tag (source) and test tag are typed in from METRC.',
      frames: [
        {
          screen: testing([[toCreateCard], [], [], []], { focusCard: [0, 0], action: 'Create Testing Batches', actionOn: 'card' }),
          note: 'Create Testing Batches',
        },
        {
          screen: testing([[toCreateCard], [], [], []]),
          modal: { real: CreatePreRollTestingBatchesModal, confirm: 'Create 1 Testing Batch' },
          note: 'Source tag, test tag and units',
        },
        {
          screen: testing([[], [readyForTestingCard], [], []], { focusCard: [1, 0], action: 'Send to Lab', actionOn: 'card' }),
          note: 'Created 1 testing batch',
        },
        {
          screen: testing([[], [readyForTestingCard], [], []]),
          modal: { real: SendToTestingLabModal, confirm: 'Send to Lab' },
          note: '4 packs to the lab',
        },
      ],
      after: testing([[], [], [atLabCard], []], { focusCard: [2, 0] }),
      result: 'Marked as sent to lab',
    },
    {
      id: 'pr-results',
      label: 'Test Results',
      heading: 'Pull the results from METRC',
      body: 'When the lab posts results, they are searched in METRC under the manufacturing license by the production tag, with a strain check and the COA. Saving them passes the batch and queues it for labeling.',
      metrc: 'Potency, terpenes and the COA are read from METRC (license MAN000035). Nothing is written back.',
      frames: [
        {
          screen: testing([[], [], [atLabCard], []], { focusCard: [2, 0], action: 'Record Results', actionOn: 'card' }),
          note: 'Record Results',
        },
        {
          screen: testing([[], [], [atLabCard], []]),
          modal: { real: PreRollTestResultsModal, confirm: 'Save Test Results' },
          note: 'Found in METRC by the production tag',
        },
      ],
      after: testing([[], [], [], [passedCard]], { focusCard: [3, 0] }),
      result: 'Test results saved - batch passed and ready for labeling',
    },
    {
      id: 'pr-labeling',
      label: 'Labeling',
      heading: 'Label with a timed team session',
      body: 'Labeling starts with the units to label (a partial run splits off with its own tag) and the team. Finishing records full cases and the partials box.',
      frames: [
        {
          screen: labeling([[labelCard([['Units', `${PR_LABEL_UNITS}u`]])], [], [], []], { focusCard: [0, 0], action: 'Start', actionOn: 'card' }),
          note: 'Start',
        },
        {
          screen: labeling([[labelCard([['Units', `${PR_LABEL_UNITS}u`]])], [], [], []]),
          modal: { real: StartLabelingConfigModal, confirm: 'Continue to Team Selection' },
          note: 'All 3,042 units',
        },
        {
          screen: labeling([[labelCard([['Units', `${PR_LABEL_UNITS}u`]])], [], [], []]),
          modal: { real: StartLabelingTeamModal, confirm: 'Start Labeling' },
          note: 'Pick the team',
        },
        {
          screen: labeling([[], [labelCard([['Team', PR_LABEL_TEAM.join(', ')]])], [], []], { focusCard: [1, 0], action: 'Done', actionOn: 'card' }),
          note: 'Labeling started',
        },
        {
          screen: labeling([[], [labelCard([['Team', PR_LABEL_TEAM.join(', ')]])], [], []]),
          modal: { real: CompleteLabelingModal, confirm: 'Complete' },
          note: '30 full cases + 42 in the partials box',
        },
      ],
      after: labeling([[], [], [labelCard([['Cases', String(PR_CASES)], ['Partials', String(PR_PARTIALS)]])], []], { focusCard: [2, 0] }),
      result: 'Labeling completed - moved to QC',
    },
    {
      id: 'label-qc',
      label: 'Label QC',
      heading: 'Verify the counts before release',
      body: 'Label QC re-counts the cases and partials against what labeling reported, then sends the batch to the Fulfillment Hub.',
      frames: [
        {
          screen: labeling([[], [], [labelCard([['Cases', String(PR_CASES)], ['Partials', String(PR_PARTIALS)]])], []], { focusCard: [2, 0], action: 'Start QC', actionOn: 'card' }),
          note: 'Start QC',
        },
        {
          screen: labeling([[], [], [labelCard([['Cases', String(PR_CASES)], ['Partials', String(PR_PARTIALS)]])], []]),
          modal: { real: LabelQCVerificationModal, confirm: 'Approve & Send to Fulfillment Hub' },
          note: 'Counts verified',
        },
      ],
      after: labeling([[], [], [], [labelCard([['QC by', 'qc.lead']])]], { focusCard: [3, 0] }),
      result: 'QC complete - moved to Fulfillment Hub',
    },
    {
      id: 'pr-fulfillment',
      label: 'Fulfillment',
      heading: 'Check in before inventory is released',
      body: 'Fulfillment checks the pre-roll packs in like any product: brand, product line, METRC tag and approval number, every label check against the lab COA, and the unit count against what labeling recorded.',
      frames: [
        {
          screen: fulfillment(true, { focusRow: 0, action: 'Check In', actionOn: 'row' }),
          note: 'Check In',
        },
        {
          screen: fulfillment(true),
          modal: { real: PreRollFulfillmentCheckInModal, confirm: 'Complete Check-In' },
          note: '30 cases × 100 + 42 partial = 3,042 units',
        },
      ],
      after: fulfillment(false),
      result: 'Check-in completed successfully',
    },
  ],
}
