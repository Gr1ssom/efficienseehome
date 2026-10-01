import { X, Tag, MagnifyingGlass, CheckCircle } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { LICENSE, TAG_SRC, TAG_TEST } from '../demoData'

/** HarvestHub: src/components/LabelCreatorModal.tsx — "Label Creator" (Step 1: Retrieve Test Results from METRC) */
export default function LabelCreatorStep1Modal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Tag className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Label Creator</h2>
              <p className="text-sm text-gray-600">Step 1: Retrieve Test Results from METRC</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
              <p className="text-sm text-blue-800">
                <strong>Testing Tag:</strong> {TAG_TEST}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Source Tag:</strong> {TAG_SRC}
              </p>
              <p className="text-xs text-blue-700">Search by source package tag to retrieve lab results from METRC.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Code
                </label>
                <select
                  defaultValue={LICENSE}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="CUL000032">CUL000032 (Cultivation)</option>
                  <option value="MAN000035">MAN000035 (Manufacturing)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Package Tag
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    defaultValue={TAG_SRC}
                    placeholder="Enter source package tag"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 flex items-center">
                    <MagnifyingGlass className="w-4 h-4 mr-2" />
                    Search METRC
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Stored Test Results (From Testing Tab)</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total THC:</span>
                  <p className="font-medium">27.80%</p>
                </div>
                <div>
                  <span className="text-gray-600">Delta-9 THC:</span>
                  <p className="font-medium">0.96%</p>
                </div>
                <div>
                  <span className="text-gray-600">Terpenes:</span>
                  <p className="font-medium">2.41%</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 border-green-300 bg-green-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Retrieved Test Results (From METRC)</h3>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total THC:</span>
                  <p className="font-medium">27.80%</p>
                </div>
                <div>
                  <span className="text-gray-600">Delta-9 THC:</span>
                  <p className="font-medium">0.96%</p>
                </div>
                <div>
                  <span className="text-gray-600">Terpenes:</span>
                  <p className="font-medium">2.41%</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                <strong>Lab:</strong> GPA
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50">
          <div></div>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors">
              Cancel
            </button>
            <HotButton className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50">
              <span>Next: Source Package Tag & Units</span>
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
