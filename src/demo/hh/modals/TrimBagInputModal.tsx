import { X, Plus, Trash, Scales, UserPlus } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { BATCH } from '../demoData'

/** HarvestHub: src/components/TrimBagInputModal.tsx — "Weigh Bags - HD 09/22 Gelato Cake" */

// 14 bags: 13 x 1724g + 1 x 1718g = 24130g (all of the verified AAA + A weight).
const BAGS = Array.from({ length: 14 }, (_, i) => ({ bagNumber: i + 1, weight: i === 13 ? '1718' : '1724' }))

export default function TrimBagInputModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Scales className="w-6 h-6 mr-2 text-green-500" />
            Weigh Bags - {BATCH}
          </h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real UI: <form>; a div here so the demo button never submits the page. */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 overflow-y-auto flex-1">
            <div className="space-y-3">
              {BAGS.map((bag) => (
                <div key={bag.bagNumber} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-accent-cream rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-accent-dark">{bag.bagNumber}</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Weight (grams)
                        </label>
                        <input
                          type="number"
                          defaultValue={bag.weight}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter weight"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assign to Employee (Optional)
                        </label>
                        <div className="flex gap-2">
                          <select
                            defaultValue=""
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                          >
                            <option value="">-- Skip Assignment --</option>
                          </select>
                          <button
                            type="button"
                            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1"
                            title="Add new employee"
                          >
                            <UserPlus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="w-full mt-4 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary hover:bg-accent-cream transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Another Bag</span>
            </button>

            <div className="mt-4 p-4 bg-accent-cream rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">Available to Allocate:</span>
                <span className="text-lg font-bold text-blue-900">24130.00g</span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-200">
                <span className="text-sm font-medium text-blue-700">Total Weight:</span>
                <span className="text-lg font-bold text-blue-900">24130.00g</span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-200">
                <span className="text-sm font-medium text-gray-700">Remaining:</span>
                <span className="text-lg font-bold text-green-600">0.00g</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <HotButton className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
              Save Bags
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
