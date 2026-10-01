import { X } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { METRC_HARVEST, STRAIN } from '../demoData'

/** HarvestHub: src/components/DryRooms.tsx — "Select Harvests to Import" */

const harvests = [
  { name: METRC_HARVEST, type: 'Product', strains: STRAIN, plants: 120, weight: 139400, selected: true },
  { name: 'GC-0922-F4', type: 'Product', strains: 'Cereal Milk', plants: 96, weight: 101870, selected: false },
]

export default function SelectHarvestsToImportModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Select Harvests to Import</h3>
            <p className="text-sm text-gray-600 mt-1">Found 2 harvests for 2026-09-22</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Select All
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Deselect All
            </button>
          </div>
          <div className="space-y-3">
            {harvests.map((harvest) => {
              const isSelected = harvest.selected
              return (
                <div
                  key={harvest.name}
                  className={`bg-white rounded-lg shadow p-4 border-2 transition-all cursor-pointer ${
                    isSelected ? 'border-green-500 bg-green-50 ring-2 ring-green-200' : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center pt-1">
                      <input
                        type="checkbox"
                        defaultChecked={isSelected}
                        className="w-6 h-6 text-green-600 border-2 border-gray-400 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-bold text-gray-900">{harvest.name}</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{harvest.type}</span>
                        {isSelected && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Strains:</span>
                          <p className="font-medium text-gray-900">{harvest.strains}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Plant Count:</span>
                          <p className="font-medium text-gray-900">{harvest.plants}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Current Weight:</span>
                          <p className="font-medium text-gray-900">{harvest.weight.toFixed(2)} Grams</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Started:</span>
                          <p className="font-medium text-gray-900">Sep 22, 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border-t p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">1 of 2 harvests selected</span>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <HotButton className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Continue with 1 Harvest
              </HotButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
