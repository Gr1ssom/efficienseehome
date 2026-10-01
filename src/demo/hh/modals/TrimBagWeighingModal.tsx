import { X, Scales, Clock } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { BATCH } from '../demoData'

/** HarvestHub: src/components/TrimBagWeighingModal.tsx — "Weigh Trimmed Bag" */
export default function TrimBagWeighingModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Scales className="w-6 h-6 mr-2 text-primary" />
            Weigh Trimmed Bag
          </h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real UI: <form>; a div here so the demo button never submits the page. */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="text-sm text-gray-600 flex items-center gap-2">
              Bag #: <span className="font-semibold text-gray-800">3</span>
            </div>
            <div className="text-sm text-gray-600">
              Strain: <span className="font-semibold text-gray-800">{BATCH}</span>
            </div>
            <div className="text-sm text-gray-600">
              Original Weight: <span className="font-semibold text-gray-800">1724g</span>
            </div>
            <div className="text-sm text-gray-600">
              Trimmed By: <span className="font-semibold text-gray-800">L. Park</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Trimmed AAA (grams)
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue="1010"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter Trimmed AAA weight"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Trimmed A (grams)
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue="312"
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Trimmed A weight"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700 mb-1">
              Trimmed B (grams)
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue="205"
              className="w-full px-3 py-2 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter Trimmed B weight"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trim (grams)
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue="168"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter waste weight"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stem Weight (grams)
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue="21"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter stem weight"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Damaged (grams)
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter damaged weight"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Returned Weight (grams)
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter weight to return (0 if none)"
            />
            <p className="text-xs text-gray-500 mt-1">Weight returned to assignment pool if work is incomplete</p>
          </div>

          <div className="p-3 rounded-lg bg-accent-cream border border-green-200">
            <div className="text-sm">
              <div>Total: <span className="font-semibold">1722.00g</span></div>
              <div>Expected: <span className="font-semibold">1724g</span></div>
              <div>Difference: <span className="font-semibold">-2.00g</span></div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-semibold text-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                Start Time
              </div>
              <span className="text-xs text-gray-600 font-normal">Central Time</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  defaultValue="2026-10-08"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  defaultValue="09:12"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-semibold text-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-green-600" />
                End Time
              </div>
              <span className="text-xs text-gray-600 font-normal">Central Time</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  defaultValue="2026-10-08"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  defaultValue="11:53"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <HotButton className="px-4 py-2 bg-primary text-white rounded-md hover:bg-accent-dark transition-colors disabled:opacity-50">
              Complete Weighing
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
