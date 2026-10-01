import { Tag, ArrowRight } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { HD, STRAIN, TAG_SRC } from '../../demoData'
import { PR_ROUTED_G } from './data'

/** HarvestHub: src/components/VerificationAndRouting.tsx — "Route to Pre-Roll" (METRC tag modal, single grade). */
export default function RouteToPreRollModal() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-md mx-4">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-200 dark:border-slate-700">
          <Tag className="w-5 h-5 text-teal-600" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Route to Pre-Roll
          </h3>
        </div>
        <div className="px-5 py-4 space-y-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-200">{STRAIN}</span>
            <span className="ml-1.5">— {HD}</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            B Bud — {PR_ROUTED_G.toLocaleString()}g
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              METRC Tag <span className="text-slate-400 font-normal">(optional — can be assigned later)</span>
            </label>
            <input
              type="text"
              defaultValue={TAG_SRC}
              placeholder="1A40C030000332D0000xxxxx"
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-200 dark:border-slate-700">
          <button className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            Cancel
          </button>
          <HotButton className="px-4 py-1.5 bg-teal-600 text-white rounded-md text-sm font-semibold hover:bg-teal-700 flex items-center gap-1.5">
            <ArrowRight className="w-4 h-4" weight="bold" />
            Route to Pre-Roll
          </HotButton>
        </div>
      </div>
    </div>
  )
}
