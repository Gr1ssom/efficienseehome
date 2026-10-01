/* Made-up demo data shared by the pre-roll walkthrough (src/demo/preroll.ts) and its modals. */
import { TAG_SRC } from '../../demoData'

/** B Bud routed from HD 09/22 Gelato Cake in Verification & Routing. */
export const PR_ROUTED_G = 8060
/** HarvestHub shows only the last 6 characters of a source tag on pre-roll batches. */
export const PR_SRC_SHORT = TAG_SRC.slice(-6)
/** New production METRC tag confirmed at machine start. */
export const TAG_PROD = '1A4DEMO0000000000000602'
/** METRC test-sample tag for the pre-roll testing batch. */
export const TAG_PR_TEST = '1A4DEMO0000000000000615'

/* Grind → sift → machine */
export const PR_STEM_G = 296
export const PR_MISC_G = 22
export const PR_FINAL_G = PR_ROUTED_G - PR_STEM_G - PR_MISC_G // 7,742 g into the machine
export const PR_MACHINE_COUNT = 15262
export const PR_FIX_LEFTOVER_G = 104

/* Sorting / fixing / packaging (units are Packs 5pk) */
export const PR_SFP_TEAM = ['M. Alvarez', 'J. Chen', 'R. Okafor']
export const PR_SFP_FIXES = [48, 36, 29]
export const PR_UNITS = 3046
export const PR_FIXING_G = 64
export const PR_SFP_LEFTOVER_G = 38

/* Testing → labeling → fulfillment */
export const PR_LAB_UNITS = 4
export const PR_LABEL_UNITS = PR_UNITS - PR_LAB_UNITS // 3,042
export const PR_UNITS_PER_CASE = 100
export const PR_CASES = 30
export const PR_PARTIALS = PR_LABEL_UNITS - PR_CASES * PR_UNITS_PER_CASE // 42
export const PR_LABEL_TEAM = ['T. Nguyen', 'R. Okafor']
