import { X, Plus } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { HD, STRAIN, TAG_SRC, TAG_TEST } from '../demoData'

/** HarvestHub: src/components/CreateTestingBatchModal.tsx — "Create Testing Batches" */
const METRC_POUNDS_TOOLTIP = 'METRC uses true pounds (453.592 g/lb); the app uses 448 g/lb'

export default function CreateTestingBatchesModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-full overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Create Testing Batches
            </h2>
            <p className="text-sm text-gray-600 mt-1" title={METRC_POUNDS_TOOLTIP}>
              {STRAIN} — {HD} — Total: 27,610g (60.87 lbs)
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-4 bg-accent-cream border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Available to allocate:</strong>
            </p>
            <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
              <div>
                <span className="text-primary">AAA Buds:</span> 13,940g
              </div>
              <div>
                <span className="text-primary">A Buds:</span> 5,610g
              </div>
              <div>
                <span className="text-primary">B Buds:</span> 8,060g
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-800">
                    Testing Batch #1
                  </h3>
                  <span title={METRC_POUNDS_TOOLTIP} className="text-xs font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-700">
                    15.0 / 15.0 lbs — near limit
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source Tag *
                  </label>
                  <input
                    type="text"
                    defaultValue={TAG_SRC}
                    placeholder="e.g., 1A4..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Tag *
                  </label>
                  <input
                    type="text"
                    defaultValue={TAG_TEST}
                    placeholder="e.g., 1A4..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lot Type *
                  </label>
                  <select
                    defaultValue="a_bud"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select lot</option>
                    <option value="a_bud">A Bud</option>
                    <option value="b_bud">B Bud</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Date *
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-10-10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    AAA Buds (g)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue="6800"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    A Buds (g)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    B Buds (g)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total
                  </label>
                  <div className="w-full px-3 py-2 border rounded-lg font-medium bg-amber-50 border-amber-300 text-amber-700">
                    6,800g
                  </div>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">Weight Verified</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-4 flex items-center space-x-2 text-primary hover:text-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Another Testing Batch</span>
          </button>

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Allocated This Batch:</span>
              <span className="font-semibold text-emerald-700">
                6,800g / 27,610g
              </span>
            </div>
            <p className="text-sm text-amber-600 mt-2">
              20810.00g remaining — card(s) will stay in Awaiting Batch Creation for the unassigned grades
            </p>
          </div>

          <button className="mt-4 text-sm text-gray-600 hover:text-gray-800">
            ← Change batch type
          </button>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <HotButton className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-emerald-600 hover:bg-emerald-700">
            Create Partial Batch
          </HotButton>
        </div>
      </div>
    </div>
  )
}
