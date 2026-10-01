import { X } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_FINAL_G, PR_ROUTED_G, TAG_PROD } from './data'

/** HarvestHub: src/components/PreRollQueue.tsx — "Confirm Machine Start" (single allocation, Machine 1). */
export default function ConfirmMachineStartModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-xl font-bold text-gray-900">Confirm Machine Start</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 mb-2">{STRAIN}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-blue-700">Starting:</span>
                <span className="ml-2 font-semibold">{PR_ROUTED_G.toLocaleString()}g</span>
              </div>
              <div>
                <span className="text-blue-700">Final Weight:</span>
                <span className="ml-2 font-semibold">{PR_FINAL_G.toLocaleString()}g</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Which Machine?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="px-4 py-3 rounded-lg border-2 font-semibold transition-all border-blue-500 bg-blue-50 text-blue-900"
              >
                Machine 1
              </button>
              <button
                type="button"
                className="px-4 py-3 rounded-lg border-2 font-semibold transition-all border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              >
                Machine 2
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Actual Start Weight (g)
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue={PR_FINAL_G}
              placeholder={PR_FINAL_G.toString()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Production METRC Tag
            </label>
            <input
              type="text"
              defaultValue={TAG_PROD}
              placeholder="Enter new batch tag"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg sticky bottom-0">
          <button className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
            Cancel
          </button>
          <HotButton className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <span>Next</span>
          </HotButton>
        </div>
      </div>
    </div>
  )
}
