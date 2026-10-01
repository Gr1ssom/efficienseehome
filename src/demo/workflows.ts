import type { DemoWorkflow, SidebarSection } from './types'

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
const TAG_TEST = '1A4DEMO0000000000000517'
const TAG_PR = '1A4DEMO0000000000000602'

export const flower: DemoWorkflow = {
  id: 'flower',
  name: 'Flower',
  tagline: 'Harvest to a checked-in 3.5g jar',
  summary: 'Follow one harvest of Gelato Cake from the weighing station through dry, sort, cure, trim, QC, lab testing, allocation, labeling and fulfillment.',
  icon: '🌸',
  batch: 'GC-0925',
  steps: [
    {
      id: 'live-harvest',
      label: 'Live Harvest',
      heading: 'Weigh every plant as it comes down',
      body: 'The weighing station talks straight to the USB scale. Hang the plant, wait for a stable reading, scan the plant tag, and the wet weight is saved against that plant. No clipboards, no re-keying.',
      metrc: 'Flowering plants for the bay are pulled from METRC, so the scan list starts complete.',
      screen: {
        section: 'Harvest', item: 'Live Harvest', title: 'Live Harvest',
        subtitle: 'Flower Bay 3 · Gelato Cake · Scales Connected',
        kpis: [
          { label: 'Scanned plants', value: '36 / 120', tone: 'green' },
          { label: 'Wet weight', value: '41.8 kg' },
          { label: 'Avg per plant', value: '1,161 g' },
          { label: 'Scale', value: 'Stable', tone: 'green' },
        ],
        columns: ['Plant Tag', 'Strain', 'Batch', 'Wet Wt (g)'],
        rows: [
          ['…0000000000012337', 'Gelato Cake', 'GC-0925', '1,204'],
          ['…0000000000012338', 'Gelato Cake', 'GC-0925', '1,096'],
          ['…0000000000012339', 'Gelato Cake', 'GC-0925', { pill: 'Unscanned', tone: 'gray' }],
        ],
        focusRow: 2,
        action: 'Record Weight',
      },
      modal: {
        title: 'Weighing Station',
        fields: [
          { label: 'Plant Tag', value: '1A4DEMO0000000000012339' },
          { label: 'Scale reading', value: '1,184.6 g · stable', scale: true },
          { label: 'Strain', value: 'Gelato Cake' },
        ],
        confirm: 'Record Weight',
        note: 'Use Serial Scales (Auto-Capture) is on: the reading locks once it is stable.',
      },
      rowsAfter: [
        ['…0000000000012337', 'Gelato Cake', 'GC-0925', '1,204'],
        ['…0000000000012338', 'Gelato Cake', 'GC-0925', '1,096'],
        ['…0000000000012339', 'Gelato Cake', 'GC-0925', '1,185'],
      ],
      result: 'Weight recorded · 37 of 120 plants scanned',
    },
    {
      id: 'harvested',
      label: 'Harvested',
      heading: 'Turn the METRC harvest into a post-harvest batch',
      body: 'Once the room is down, the harvest shows up in Harvested Crops. One modal maps strains, confirms the required fields and creates the batch that every later step tracks.',
      metrc: 'Active METRC harvests (strains, plant count, current weight) are read from the METRC cache.',
      screen: {
        section: 'Harvest', item: 'Harvested', title: 'Harvested Crops',
        subtitle: 'Active METRC Harvests (2)',
        columns: ['METRC Harvest', 'Strains', 'Plant Count', 'Current Weight', 'Started'],
        rows: [
          ['GC-0925 Bay 3', 'Gelato Cake', '120', '139.4 kg', 'Sep 25'],
          ['LCH-0924 Bay 2', 'Lemon Cherry Haze', '96', '104.2 kg', 'Sep 24'],
        ],
        focusRow: 0,
        action: 'Create Batches',
        actionOn: 'row',
      },
      modal: {
        title: 'Create Post-Harvest Batches from METRC',
        fields: [
          { label: 'Strain mapping', value: '✓ All strains mapped' },
          { label: 'Crop', value: 'Flower Bay 3 · Crop 0925' },
          { label: 'Processing', value: 'Standard (not Fresh Frozen)' },
          { label: 'Ready for bucking', value: 'Yes, queue in Dry Rooms' },
        ],
        confirm: 'Create Batches',
      },
      result: 'Batch GC-0925 created · now in Dry Rooms',
    },
    {
      id: 'dry',
      label: 'Dry Rooms',
      heading: 'Watch the dry, then queue it for bucking',
      body: 'Each cultivar tile tracks wet weight, projected dry weight, days drying and the latest moisture reading. Pest or PM flags from Crop Control follow the batch here.',
      screen: {
        section: 'Flower', item: 'Dry Rooms', title: 'Dry Rooms',
        subtitle: 'Monitor cultivars drying in dry rooms',
        kpis: [
          { label: 'Wet Wt', value: '139.4 kg' },
          { label: 'Proj Dry', value: '32.1 kg' },
          { label: 'Days Drying', value: '11' },
          { label: 'Moist', value: '11.8%', tone: 'green' },
        ],
        columns: ['Cultivar', 'Room', 'Drying Stage', 'Latest Reading', 'Status'],
        rows: [
          ['Gelato Cake', 'Dry 2', 'Final', '11.8% · 61°F', { pill: 'Drying', tone: 'amber' }],
          ['Lemon Cherry Haze', 'Dry 1', 'Mid', '14.6% · 60°F', { pill: 'Drying', tone: 'amber' }],
        ],
        focusRow: 0,
        action: 'Ready to Buck',
        actionOn: 'row',
      },
      rowsAfter: [
        ['Gelato Cake', 'Dry 2', 'Final', '11.8% · 61°F', { pill: 'Bucking queue', tone: 'green' }],
        ['Lemon Cherry Haze', 'Dry 1', 'Mid', '14.6% · 60°F', { pill: 'Drying', tone: 'amber' }],
      ],
      result: 'Gelato Cake added to the bucking queue',
    },
    {
      id: 'bucking',
      label: 'Bucking',
      heading: 'Run bucking from a shared terminal',
      body: 'The Bucking Terminal shows the queue in priority order. Crew members join the session, and HarvestHub tracks plants grabbed and remaining per person, so throughput is measured, not guessed.',
      screen: {
        section: 'Flower', item: 'Bucking', title: 'Bucking Terminal',
        subtitle: 'Queue (Priority Order)',
        kpis: [
          { label: 'Grabbed', value: '120', tone: 'green' },
          { label: 'Remaining', value: '0' },
          { label: 'Crew', value: '4' },
          { label: 'Plants / hr', value: '38' },
        ],
        columns: ['Employee', 'Plants', 'Bucked (g)', 'Status'],
        rows: [
          ['M. Alvarez', '34', '9,420', { pill: 'Done', tone: 'green' }],
          ['J. Chen', '31', '8,610', { pill: 'Done', tone: 'green' }],
          ['R. Okafor', '29', '7,880', { pill: 'Done', tone: 'green' }],
          ['T. Nguyen', '26', '6,190', { pill: 'Done', tone: 'green' }],
        ],
        action: 'Record Bucking Weights',
      },
      modal: {
        title: 'Record Bucking Weights',
        fields: [
          { label: 'Bucked flower', value: '32,100 g', scale: true },
          { label: 'Stems / waste', value: '4,870 g' },
          { label: 'Totes', value: '9' },
        ],
        confirm: 'Complete Bucking',
      },
      result: 'Bucking complete · GC-0925 ready for sorting',
    },
    {
      id: 'sorting',
      label: 'Sorting',
      heading: 'Grade the flower into AAA, A and B',
      body: 'Sorting records the weight and tote count for each grade, plus trim and fan leaves, with a microbial check before the batch moves on. Machine downtime and pauses are logged too.',
      screen: {
        section: 'Flower', item: 'Sorting', title: 'Sorting & Grading',
        columns: ['Batch', 'Cultivar', 'Weight In (g)', 'Status'],
        rows: [
          ['GC-0925', 'Gelato Cake', '32,100', { pill: 'Sorting in progress', tone: 'blue' }],
          ['LCH-0924', 'Lemon Cherry Haze', '24,800', { pill: 'Ready for sorting', tone: 'gray' }],
        ],
        focusRow: 0,
        action: 'Finish',
        actionOn: 'row',
      },
      modal: {
        title: 'Complete Sorting',
        fields: [
          { label: 'AAA Buds (g) / Totes', value: '14,250 g · 4 totes' },
          { label: 'A Buds (g) / Totes', value: '9,880 g · 3 totes' },
          { label: 'B Buds (g) / Totes', value: '5,120 g · 2 totes' },
          { label: 'Sorting Trim / Fan Leaves', value: '2,140 g / 710 g' },
          { label: 'Microbial Check', value: 'None found' },
        ],
        confirm: 'Complete Sorting',
      },
      rowsAfter: [
        ['GC-0925', 'Gelato Cake', '32,100', { pill: 'Moved to Cure', tone: 'green' }],
        ['LCH-0924', 'Lemon Cherry Haze', '24,800', { pill: 'Ready for sorting', tone: 'gray' }],
      ],
      result: 'Sort complete · 32,100 g accounted for · moved to Cure',
    },
    {
      id: 'cure',
      label: 'Cure',
      heading: 'Burp on schedule with a checklist',
      body: 'Totes are tracked by grade through the cure. A timed burp list goes to the floor as a checklist showing who started it, progress and elapsed time.',
      screen: {
        section: 'Flower', item: 'Cure', title: 'Cure Stage',
        subtitle: 'Cards · Cure Spreadsheet · Cure Overview · History',
        columns: ['Batch', 'Grade', 'Totes', 'Weight (g)', 'Days in Cure', 'Last Burp'],
        rows: [
          ['GC-0925', 'AAA', '4', '14,250', '6', '18h ago'],
          ['GC-0925', 'A', '3', '9,880', '6', '18h ago'],
          ['GC-0925', 'B', '2', '5,120', '6', '18h ago'],
        ],
        action: 'Create Burp List',
      },
      modal: {
        title: 'Create Burp List',
        fields: [
          { label: 'Totes', value: '9 totes · GC-0925' },
          { label: 'Timed', value: '15 min open' },
          { label: 'Assigned to', value: 'Cure team' },
        ],
        confirm: 'Start Burp List',
      },
      result: 'Burp checklist sent to the floor · 0 / 9 burped',
    },
    {
      id: 'trim',
      label: 'Trim',
      heading: 'Hand out bags, weigh them back in',
      body: 'Every trim bag is handed out and weighed back by trimmer. Remaining weight, A and B output, and efficiency per person update as bags come back.',
      screen: {
        section: 'Flower', item: 'Trim', title: 'Trim Queue',
        subtitle: 'Needs Weighed · Ready for Handout · In Progress · Trim Complete',
        columns: ['Batch', 'Trimmer', 'Sent (g)', 'A (g)', 'B (g)', 'Status'],
        rows: [
          ['GC-0925', 'L. Park', '1,800', '1,352', '268', { pill: 'Returned', tone: 'amber' }],
          ['GC-0925', 'D. Ruiz', '1,800', '—', '—', { pill: 'Handed out', tone: 'blue' }],
          ['GC-0925', 'S. Moore', '1,800', '—', '—', { pill: 'Handed out', tone: 'blue' }],
        ],
        focusRow: 0,
        action: 'Weigh Return',
        actionOn: 'row',
      },
      modal: {
        title: 'Weigh Returned Bag',
        fields: [
          { label: 'Trimmer', value: 'L. Park' },
          { label: 'Trimmed A', value: '1,352.4 g', scale: true },
          { label: 'Trimmed B', value: '268.1 g' },
          { label: 'Efficiency', value: '90.0%' },
        ],
        confirm: 'Save Weights',
      },
      rowsAfter: [
        ['GC-0925', 'L. Park', '1,800', '1,352', '268', { pill: 'Weighed', tone: 'green' }],
        ['GC-0925', 'D. Ruiz', '1,800', '—', '—', { pill: 'Handed out', tone: 'blue' }],
        ['GC-0925', 'S. Moore', '1,800', '—', '—', { pill: 'Handed out', tone: 'blue' }],
      ],
      result: 'Bag weighed · trimmer efficiency logged',
    },
    {
      id: 'trim-qc',
      label: 'Trim QC',
      heading: 'Quality control before anything is routed',
      body: 'QC records water activity, appearance and microbials, with a batch photo and an average-nug photo taken on the tablet. A failing batch goes back to trim with one tap.',
      screen: {
        section: 'Flower', item: 'Trim QC', title: 'Trim Quality Control',
        columns: ['Batch', 'Grade', 'Weight (g)', 'Status'],
        rows: [
          ['GC-0925', 'AAA', '13,960', { pill: 'Ready for QC', tone: 'amber' }],
          ['GC-0925', 'A', '9,610', { pill: 'Ready for QC', tone: 'amber' }],
        ],
        focusRow: 0,
        action: 'Start QC',
        actionOn: 'row',
      },
      modal: {
        title: 'Trim QC · GC-0925',
        fields: [
          { label: 'Water Activity', value: '0.58 aw' },
          { label: 'Physical Appearance', value: 'Pass · dense, well manicured' },
          { label: 'Microbials Found', value: 'None' },
          { label: 'Batch Photo / Avg Nug Photo', value: '📷 2 photos attached' },
        ],
        confirm: 'Complete QC',
      },
      rowsAfter: [
        ['GC-0925', 'AAA', '13,960', { pill: 'QC complete', tone: 'green' }],
        ['GC-0925', 'A', '9,610', { pill: 'Ready for QC', tone: 'amber' }],
      ],
      result: 'QC passed · sent to Verification & Routing',
    },
    {
      id: 'routing',
      label: 'Verification & Routing',
      heading: 'Route each grade to where it earns the most',
      body: 'Verification & Routing splits every grade between testing, pre-roll and extraction. Weight allocated and remaining is tracked per grade, so nothing goes missing between departments.',
      metrc: 'The METRC package tag for the testing batch is typed in and stored with the batch.',
      screen: {
        section: 'Flower', item: 'Verification & Routing', title: 'Verification & Routing',
        subtitle: 'Flower Pre-Testing',
        columns: ['Harvest', 'Grade', 'Weight', 'Allocated', 'Remaining'],
        rows: [
          ['GC-0925', 'AAA Bud', '13,960 g', '0 g', '13,960 g'],
          ['GC-0925', 'A Bud', '9,610 g', '0 g', '9,610 g'],
          ['GC-0925', 'B Bud', '5,020 g', '0 g', '5,020 g'],
        ],
        focusRow: 0,
        action: 'Route to Destination',
        actionOn: 'row',
      },
      modal: {
        title: 'Route to Destination',
        fields: [
          { label: 'Destination', value: 'Testing' },
          { label: 'Weight', value: '13,960 g AAA Bud' },
          { label: 'METRC test tag', value: TAG_TEST },
          { label: 'Weight Verified', value: '✓ All weight accounted for' },
        ],
        confirm: 'Create Testing Batch',
      },
      rowsAfter: [
        ['GC-0925', 'AAA Bud', '13,960 g', '13,960 g', { pill: '0 g', tone: 'green' }],
        ['GC-0925', 'A Bud', '9,610 g', '0 g', '9,610 g'],
        ['GC-0925', 'B Bud', '5,020 g', '0 g', '5,020 g'],
      ],
      result: '13,960 g AAA Bud → Testing',
    },
    {
      id: 'testing',
      label: 'Testing Hub',
      heading: 'Lab results arrive from METRC, not a PDF inbox',
      body: 'Samples go out from the Testing Hub. When the lab posts results, HarvestHub pulls potency, terpenes and the COA, and a person reviews and confirms them before the batch can be allocated.',
      metrc: 'Test results and the COA PDF are read from METRC and marked with their source.',
      screen: {
        section: 'Testing Center', item: 'Testing Hub', title: 'Testing Hub',
        subtitle: 'Flower / Bulk · Ready · At Lab · Results Returned · Allocated',
        columns: ['Testing Tag', 'Batch', 'Grade', 'Lab', 'Status'],
        rows: [
          ['…0000517', 'GC-0925', 'AAA', 'Demo Labs', { pill: 'At Lab', tone: 'blue' }],
          ['…0000498', 'LCH-0924', 'AAA', 'Demo Labs', { pill: 'Allocated', tone: 'green' }],
        ],
        action: 'Check METRC for new test results',
      },
      modal: {
        title: 'Review METRC Test Results · …0000517',
        fields: [
          { label: 'Total THC', value: '27.8%' },
          { label: 'CBD', value: '0.06%' },
          { label: 'Total Terpenes', value: '2.41% · Limonene, Caryophyllene, Linalool' },
          { label: 'Result', value: 'PASS · COA attached' },
        ],
        confirm: 'Confirm Results',
      },
      rowsAfter: [
        ['…0000517', 'GC-0925', 'AAA', 'Demo Labs', { pill: 'Ready for allocation', tone: 'green' }],
        ['…0000498', 'LCH-0924', 'AAA', 'Demo Labs', { pill: 'Allocated', tone: 'green' }],
      ],
      result: 'Results confirmed · GC-0925 ready for allocation',
    },
    {
      id: 'allocation',
      label: 'Allocation Station',
      heading: 'Allocate against live wholesale inventory',
      body: 'Allocation Station puts tested flower next to current LeafLink stock, so the team packs the sizes that are actually running low. Allocations drop straight into the packaging queue.',
      screen: {
        section: 'Flower', item: 'Allocation Station', title: 'Allocation Station',
        kpis: [
          { label: 'Batches ready', value: '3', tone: 'green' },
          { label: 'Total lbs', value: '61.2' },
          { label: 'Avg THC', value: '26.4%' },
          { label: 'Avg Terpenes', value: '2.18%' },
        ],
        columns: ['Batch', 'Grade', 'THC', 'Available (lbs)', 'LeafLink 3.5g on hand'],
        rows: [
          ['GC-0925', 'AAA', '27.8%', '30.8', { pill: '42 units · low', tone: 'red' }],
          ['LCH-0924', 'AAA', '25.1%', '12.4', { pill: '310 units', tone: 'gray' }],
        ],
        focusRow: 0,
        action: 'Allocate',
        actionOn: 'row',
      },
      modal: {
        title: 'Allocate GC-0925',
        fields: [
          { label: '3.5g jars', value: '2,400 units · 8,400 g' },
          { label: '7g jars', value: '600 units · 4,200 g' },
          { label: 'Reserve', value: '1,360 g' },
          { label: 'Remaining', value: '0 g' },
        ],
        confirm: 'Send to Packaging',
      },
      result: '3,000 units queued for packaging',
    },
    {
      id: 'packaging',
      label: 'Packaging & Labeling',
      heading: 'Compliant labels from verified results',
      body: 'The Label Creator puts the stored results beside the ones retrieved from METRC and warns on any mismatch before a single label prints. Packaging time, pauses and casing are tracked for KPIs.',
      metrc: 'Label potency is checked against the METRC test results for the batch.',
      screen: {
        section: 'Flower', item: 'Packaging & Labeling', title: 'Packaging & Labeling',
        subtitle: 'Needs Assigned · Currently Packaging · Labels Needing Printed · Needs Casing',
        columns: ['Batch', 'Product', 'Units', 'Status'],
        rows: [
          ['GC-0925', 'Gelato Cake 3.5g', '2,400', { pill: 'Labels needing printed', tone: 'amber' }],
          ['GC-0925', 'Gelato Cake 7g', '600', { pill: 'Currently packaging', tone: 'blue' }],
        ],
        focusRow: 0,
        action: 'Label Creator',
        actionOn: 'row',
      },
      modal: {
        title: 'Label Creator · Gelato Cake 3.5g',
        fields: [
          { label: 'Stored Test Results', value: 'THC 27.8% · CBD 0.06%' },
          { label: 'Retrieved from METRC', value: 'THC 27.8% · CBD 0.06% ✓ match' },
          { label: 'Testing tag', value: TAG_TEST },
          { label: 'Weight', value: '3.5g' },
        ],
        confirm: 'Preview & Export',
      },
      rowsAfter: [
        ['GC-0925', 'Gelato Cake 3.5g', '2,400', { pill: 'Printed · ready', tone: 'green' }],
        ['GC-0925', 'Gelato Cake 7g', '600', { pill: 'Currently packaging', tone: 'blue' }],
      ],
      result: '2,400 labels exported to the printer',
    },
    {
      id: 'fulfillment',
      label: 'Fulfillment',
      heading: 'Check in finished goods with a unit count',
      body: 'Fulfillment confirms product, package tag, COA and unit count. A count mismatch needs an explanation before check-in, so inventory is right before it ever reaches LeafLink.',
      screen: {
        section: 'Fulfillment', item: 'Fulfillment Hub', title: 'Fulfillment Hub',
        kpis: [
          { label: 'Ready', value: '2', tone: 'amber' },
          { label: 'Checked In', value: '14', tone: 'green' },
          { label: 'Total Units', value: '9,840' },
        ],
        columns: ['Product', 'Batch', 'Units', 'Status'],
        rows: [
          ['Gelato Cake 3.5g', 'GC-0925', '2,400', { pill: 'Ready for check-in', tone: 'amber' }],
        ],
        focusRow: 0,
        action: 'Check In',
        actionOn: 'row',
      },
      modal: {
        title: 'Fulfillment Check-In',
        fields: [
          { label: 'METRC Tag', value: '1A4DEMO0000000000000530' },
          { label: 'METRC Src Tag', value: TAG_HARVEST },
          { label: 'Lab COA', value: '✓ Attached' },
          { label: 'Unit Count Confirmation', value: '2,400 of 2,400 ✓' },
        ],
        confirm: 'Complete Check-In',
      },
      rowsAfter: [
        ['Gelato Cake 3.5g', 'GC-0925', '2,400', { pill: 'Checked in', tone: 'green' }],
      ],
      result: 'Checked in · GC-0925 is ready to sell',
    },
  ],
}

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
          { label: 'Weight After Sift (grams)', value: '4,812.0 g', scale: true },
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
