import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_FIXING_G, PR_SFP_FIXES, PR_SFP_LEFTOVER_G, PR_SFP_TEAM, PR_UNITS } from './data'

/** HarvestHub: src/components/PreRollSortingFixingPackaging.tsx — "Complete Sorting/Fixing" (single SKU). */
export default function CompleteSortingFixingModal() {
  const totalFixes = PR_SFP_FIXES.reduce((s, n) => s + n, 0)
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-full overflow-y-auto">
        <div className="px-6 py-4 rounded-t-lg bg-green-600">
          <h3 className="text-xl font-bold text-white">Complete Sorting/Fixing</h3>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-bold text-gray-900">{STRAIN}</h4>
            <p className="text-sm text-gray-600">Workflow: S/F &amp; Packaging</p>
          </div>
          <div className="space-y-4 mb-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-700">Packs — 5pk</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Units</label>
              <input
                type="number"
                defaultValue={PR_UNITS}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-lg font-bold text-center"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <div className="flex items-center space-x-1">
                  <input
                    type="datetime-local" step="1"
                    defaultValue="2026-10-14T07:30:00"
                    className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    type="button"
                    className="px-2 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap"
                  >Now</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <div className="flex items-center space-x-1">
                  <input
                    type="datetime-local" step="1"
                    defaultValue="2026-10-14T15:10:00"
                    className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    type="button"
                    className="px-2 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap"
                  >Now</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fixing Weight (g)</label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={PR_FIXING_G}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0.00"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leftover (g)</label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={PR_SFP_LEFTOVER_G}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0.00"
                  min="0"
                />
              </div>
            </div>
          </div>
          {/* Per-Teammate Pre-Rolls Fixed */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-amber-900">Pre-Rolls Fixed per Teammate</label>
              <span className="text-sm font-bold text-amber-700">Total: {totalFixes}</span>
            </div>
            <div className="space-y-2">
              {PR_SFP_TEAM.map((name, i) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="flex-1 text-sm font-medium text-gray-700">{name}</span>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    placeholder="0"
                    defaultValue={PR_SFP_FIXES[i]}
                    className="w-24 px-3 py-2 border border-amber-300 rounded-lg text-sm text-center focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-3">
            <HotButton className="flex-1 px-4 py-2 text-white rounded-lg disabled:opacity-50 bg-green-600 hover:bg-green-700">
              Complete
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
