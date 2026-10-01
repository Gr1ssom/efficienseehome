import { X, Plus, CheckCircle } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { METRC_HARVEST, STRAIN } from '../demoData'

/** HarvestHub: src/components/MetrcHarvestCreateModal.tsx — "Create Post-Harvest Batches from METRC" */

// Labels follow cropOptionLabel(): crop_number · location · harvested|planned M/D
const CROP = 'Crop 0922 · Flower Bay 3 · harvested 9/22'
const cropOptions = [CROP, 'Crop 0915 · Flower Bay 1 · harvested 9/15', 'Crop 0929 · Flower Bay 4 · planned 9/29']
const strainOptions = ['Cereal Milk', STRAIN, 'Lemon Cherry Haze']

const statusFlags = ['Ready for Bucking', '△ Triangle', '□ Square', '○ Circle', '■ Filled Square', 'Mix-up', 'Seeded']

export default function MetrcHarvestCreateModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-full flex flex-col">
        <div className="p-6 border-b sticky top-0 bg-white z-10 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Create Post-Harvest Batches from METRC</h2>
              <p className="text-sm text-gray-600 mt-1">1 METRC Harvest Selected</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 flex-1 min-h-0 overflow-y-auto">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
              <span>Configure Cultivars & Verify Required Fields</span>
              <span className="text-sm text-green-600 flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>All strains mapped</span>
              </span>
            </h3>

            <div className="space-y-4">
              <div className="rounded-lg p-4 border-2 bg-gray-50 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">Batch 1:</span>
                    <span className="text-gray-700">{STRAIN}</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">from {METRC_HARVEST}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Crop <span className="text-red-500">*</span>
                    </label>
                    <select
                      defaultValue={CROP}
                      className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary border-gray-300"
                    >
                      <option value="">Select the crop this harvest came from...</option>
                      {cropOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Match to Strain <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-1">
                        <select
                          defaultValue={STRAIN}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="">Select strain...</option>
                          {strainOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="flex items-center space-x-1 text-xs text-primary hover:text-accent-dark transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Create new cultivar</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plant Count <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        defaultValue={120}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Wet Weight (grams) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={139400}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dry Room <span className="text-red-500">*</span>
                      </label>
                      <select
                        defaultValue="Dry Room 2"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="Dry Room 1">Dry Room 1</option>
                        <option value="Dry Room 2">Dry Room 2</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status Flags (Optional)</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {statusFlags.map((flag) => (
                        <label key={flag} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={false}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">{flag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">METRC Harvests:</span>
                <p className="font-medium text-gray-900">1</p>
              </div>
              <div>
                <span className="text-gray-600">Batches to Create:</span>
                <p className="font-medium text-gray-900">1 (1:1 ratio)</p>
              </div>
              <div>
                <span className="text-gray-600">Total Plants:</span>
                <p className="font-medium text-gray-900">120</p>
              </div>
              <div>
                <span className="text-gray-600">Strains Mapped:</span>
                <p className="font-medium text-gray-900">1 / 1</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Each METRC harvest creates exactly one batch (1:1 ratio).
              For multi-strain harvests, the primary strain is used by default.
              Batches will appear in Post-Harvest → Drying & Bucking section.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50 sticky bottom-0 rounded-b-lg">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <HotButton className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Plus className="w-4 h-4" />
            <span>Create 1 Batch</span>
          </HotButton>
        </div>
      </div>
    </div>
  )
}
