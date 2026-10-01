import { X, Plus, Tag } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_SRC_SHORT, PR_UNITS, TAG_PR_TEST, TAG_PROD } from './data'

const PACKS = { bg: '#ffd400', text: '#282928' }

/** HarvestHub: src/components/CreatePreRollTestingBatchModal.tsx — "Create Testing Batches" (one Packs 5pk batch). */
export default function CreatePreRollTestingBatchesModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-full flex flex-col">
        <div className="bg-blue-600 px-6 py-4 rounded-t-xl flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white">Create Testing Batches</h3>
            <p className="text-blue-100 text-sm mt-0.5">{STRAIN}</p>
          </div>
          <button className="text-white hover:text-blue-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex items-center gap-2 mb-4 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
            <Tag className="w-4 h-4 text-slate-400" weight="bold" />
            <span className="text-sm text-slate-500">Source METRC Tag:</span>
            <span className="text-sm font-mono font-semibold text-slate-700">{PR_SRC_SHORT}</span>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-700">Batch #1</h4>
                  <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: PACKS.bg, color: PACKS.text }}>
                    Packs 5pk
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Source Tag</label>
                  <input
                    type="text"
                    defaultValue={TAG_PROD}
                    placeholder="Optional"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Test Tag *</label>
                  <input
                    type="text"
                    defaultValue={TAG_PR_TEST}
                    placeholder="e.g., 42069"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Total Units *</label>
                  <input
                    type="number"
                    defaultValue={PR_UNITS}
                    min="1"
                    placeholder="Enter total units"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 w-full">
                    Packs 5pk
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium disabled:opacity-50">
            <Plus className="w-4 h-4" />
            <span>Add Another Testing Batch</span>
          </button>

          <div className="mt-4 bg-slate-100 border border-slate-200 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-600 font-medium">
                1 batch
              </span>
              <span className="font-bold text-slate-800 text-base">
                {PR_UNITS.toLocaleString()} total units
              </span>
            </div>
            <div className="border-t border-slate-200 pt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Packs 5pk</span>
                <span className="font-semibold text-slate-700">{PR_UNITS} units</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-slate-200 flex-shrink-0">
          <HotButton className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700">
            Create 1 Testing Batch
          </HotButton>
          <button className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors disabled:opacity-50">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
