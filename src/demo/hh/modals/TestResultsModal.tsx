import { X, MagnifyingGlass, CheckCircle, TestTube, FloppyDisk, Eye, PencilSimple } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { BATCH, STRAIN, TAG_SRC, TAG_TEST } from '../demoData'

/** HarvestHub: src/components/MetrcTestResultsModal.tsx — "Test Results" */
export default function TestResultsModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Test Results</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-50 border border-green-200 text-green-800 text-sm font-semibold">
                {STRAIN}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium">
                {BATCH}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                bulk
              </span>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-2 px-6 pt-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-blue-600 text-white">
            <MagnifyingGlass className="w-4 h-4" />
            Search METRC
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200">
            <PencilSimple className="w-4 h-4" />
            Manual Entry
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Code *
              </label>
              <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-700 font-medium">
                CUL000032 (Cultivation)
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source Tag *
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  defaultValue={TAG_SRC}
                  placeholder="Enter METRC tag (e.g., 1A40C030000332D0000012345)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                  <MagnifyingGlass className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4 border-blue-200 bg-accent-cream">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                  <TestTube className="w-5 h-5 mr-2 text-primary" />
                  Package Found
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-accent-cream text-accent-dark text-xs font-medium rounded">
                    Test Passed
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between bg-blue-50 -mx-4 -mt-1 px-4 py-2 mb-2">
                  <span className="text-gray-600 font-medium">Source Tag:</span>
                  <span className="font-semibold text-blue-900">{TAG_SRC}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Testing Tag:</span>
                  <span className="font-medium text-gray-900">{TAG_TEST}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Package ID:</span>
                  <span className="font-medium text-gray-900">4821937</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium text-gray-900">{STRAIN} - Bulk Flower</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Strain:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{STRAIN}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      <CheckCircle className="w-3 h-3" weight="fill" />
                      Matches
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-green-200 rounded-lg p-4 bg-accent-cream">
              <div className="flex items-center mb-3">
                <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                <h3 className="text-lg font-bold text-gray-800">Test Results Retrieved</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">Total THC</div>
                  <div className="text-xl font-bold text-gray-900">
                    27.80%
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Δ9: 0.90%
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">THCA</div>
                  <div className="text-xl font-bold text-gray-900">
                    30.60%
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">Water Activity</div>
                  <div className="text-xl font-bold text-gray-900">
                    N/A
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">Total Terpenes</div>
                  <div className="text-xl font-bold text-gray-900">
                    2.41%
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">Moisture</div>
                  <div className="text-xl font-bold text-gray-900">
                    11.00%
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <button className="w-full bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2 disabled:opacity-60">
                  <Eye className="w-4 h-4" />
                  <span>View COA Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <HotButton className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
            <FloppyDisk className="w-4 h-4 mr-2" /> Save Test Results
          </HotButton>
        </div>
      </div>
    </div>
  )
}
