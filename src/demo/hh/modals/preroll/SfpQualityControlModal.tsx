import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_SFP_LEFTOVER_G, PR_SFP_TEAM, PR_UNITS } from './data'

const PACKS = { bg: '#ffd400', text: '#282928' }

/** HarvestHub: src/components/PreRollSortingFixingPackaging.tsx — "Quality Control" (S/F/P QC). */
export default function SfpQualityControlModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-full overflow-y-auto">
        <div className="bg-slate-700 px-6 py-4 sticky top-0 z-10">
          <h3 className="text-xl font-bold text-white">Quality Control</h3>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-bold text-gray-900">{STRAIN}</h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 text-sm rounded px-2 py-0.5 font-medium" style={{ backgroundColor: PACKS.bg, color: PACKS.text }}>
                Packs 5pk
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1 mt-2">
              <p>QC Operator: qc.lead</p>
              <p>Original Operators: {PR_SFP_TEAM.join(', ')}</p>
              <p>Started: 10/14/2026, 7:30 AM</p>
              <p>Completed: 10/14/2026, 3:10 PM</p>
              <p>QC Started: 10/14/2026, 3:25 PM</p>
            </div>
          </div>

          <div className="space-y-5 mb-6">
            {/* Per-SKU boxes/cases */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Per-SKU Counts</p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Packs — 5pk
                </p>
                <div>
                  <label className="block text-xs font-semibold text-blue-700 mb-1.5 uppercase tracking-wide">
                    Units
                  </label>
                  <input
                    type="number"
                    min="0"
                    defaultValue={PR_UNITS}
                    className="w-full px-3 py-2.5 border border-blue-300 rounded-lg text-lg font-bold text-center focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Total Units Produced */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4">
              <label className="block text-sm font-semibold text-emerald-800 mb-1">
                Total Units Produced
              </label>
              <p className="text-xs text-emerald-700 mb-2">
                Confirm the total units made across the whole team (no cases or partials split).
              </p>
              <input
                type="number"
                min="0"
                step="1"
                defaultValue={PR_UNITS}
                className="w-full px-3 py-2.5 border border-emerald-400 rounded-lg text-lg font-bold text-center focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                placeholder="0"
              />
              <p className="text-xs text-emerald-700 mt-2">
                Teammate sum: {PR_UNITS}
              </p>
            </div>

            {/* Leftover weight */}
            <div className="bg-slate-50 border-2 border-slate-300 rounded-lg p-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Total Leftover Weight to Verification &amp; Routing (g)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                defaultValue={PR_SFP_LEFTOVER_G}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-lg font-bold text-center focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div className="border-t pt-4">
              <label className="flex items-center space-x-2 mb-4">
                <input type="checkbox" defaultChecked={false} className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-gray-700">Were there any mistakes?</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3">
            <HotButton className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
              Complete QC - Ready for Testing
            </HotButton>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
