import HotButton from '../../HotButton'
import { STRAIN, TEAM } from '../../demoData'
import { PR_SFP_TEAM } from './data'

const PACKS = { bg: '#ffd400', text: '#282928' }

/** HarvestHub: src/components/PreRollSortingFixingPackaging.tsx — "Start Sorting/Fixing" (single SKU). */
export default function StartSortingFixingModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-full overflow-y-auto">
        <div className="px-6 py-4 rounded-t-lg bg-slate-700">
          <h3 className="text-xl font-bold text-white">Start Sorting/Fixing</h3>
          <p className="text-sm text-white opacity-80 mt-0.5">Sorting/Fixing &amp; Packaging</p>
        </div>
        <div className="p-6">
          <div className="mb-5">
            <h4 className="font-bold text-gray-900 mb-1">{STRAIN}</h4>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 text-xs rounded px-2 py-0.5" style={{ backgroundColor: PACKS.bg, color: PACKS.text }}>
                <span className="font-medium">Packs 5pk</span>
              </span>
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Team Members ({PR_SFP_TEAM.length} selected)
            </label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto">
              <label className="flex items-center space-x-2 mb-2 font-medium text-slate-700 cursor-pointer hover:bg-slate-50 p-2 rounded">
                <input type="checkbox" defaultChecked={false} className="w-4 h-4 text-slate-600" />
                <span>Select All</span>
              </label>
              <div className="border-t border-gray-200 pt-2">
                {TEAM.map((name) => (
                  <label key={name} className="flex items-center space-x-2 mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input type="checkbox" defaultChecked={PR_SFP_TEAM.includes(name)} className="w-4 h-4 text-slate-600" />
                    <span>{name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="datetime-local" step="1"
                defaultValue="2026-10-14T07:30:00"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button
                type="button"
                className="px-3 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                Now
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Leave blank to use current time</p>
          </div>
          <div className="space-y-3">
            <HotButton className="w-full px-4 py-3 text-white rounded-lg font-semibold disabled:opacity-50 transition-colors bg-slate-700 hover:bg-slate-800">
              {`Start (${PR_SFP_TEAM.join(', ')})`}
            </HotButton>
            <button className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
