import { X, CheckCircle, Cube, ArrowCounterClockwise } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { TAG_TEST } from '../demoData'

const EMPLOYEES = ['D. Ruiz', 'K. Patel', 'S. Moore']
const CASED_BY = ['S. Moore']

/** HarvestHub: src/components/PackagingCompletionModal.tsx — "Complete Machine Run" */
export default function CompleteMachineRunModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-xl max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Complete Machine Run
          </h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real UI: <form>; a div here so the demo button never submits the page. */}
        <div className="p-5 space-y-5">
          <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-sm">
            <div className="text-gray-600">Product: <span className="font-semibold text-gray-800">RESERVE 3.5g Jars</span></div>
            <div className="text-gray-600">Batch: <span className="font-semibold text-gray-800">{TAG_TEST}</span></div>
            <div className="text-gray-600">Started With: <span className="font-semibold text-gray-800">5880g</span></div>
            <div className="text-gray-600">Target Units: <span className="font-semibold text-gray-800">1600</span></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
            <input
              type="time"
              defaultValue="13:20"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remaining Weight for Verification & Routing (grams)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              defaultValue="0"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm border-gray-300"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">Any leftover product weight to be handed off</p>
          </div>

          {/* Unprocessed Weight Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <ArrowCounterClockwise className="w-4 h-4 text-amber-500" />
              Was any weight left unprocessed? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              >
                Yes, return weight
              </button>
              <button
                type="button"
                className="px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all border-green-500 bg-green-50 text-green-800"
              >
                No, all processed
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Was the product also cased? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all border-green-500 bg-green-50 text-green-800"
              >
                Yes, cased it
              </button>
              <button
                type="button"
                className="px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              >
                No, not yet
              </button>
            </div>
          </div>

          <div className="space-y-4 border border-green-200 bg-green-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-800 flex items-center gap-2">
              <Cube className="w-4 h-4" />
              Casing Details
            </p>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Who cased it? *</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {EMPLOYEES.map(name => (
                  <button
                    key={name}
                    type="button"
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      CASED_BY.includes(name)
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <p className="text-xs text-green-700 mt-1">{CASED_BY.join(', ')}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cases Produced *</label>
                <input
                  type="number" min="0"
                  defaultValue="15"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Units per Case *</label>
                <input
                  type="number" min="0"
                  defaultValue="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Partial Units *</label>
                <input
                  type="number" min="0"
                  defaultValue="90"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Total Sample Units
                  <span className="font-normal text-gray-400 ml-1">(not bundles)</span>
                </label>
                <input
                  type="number" min="0"
                  defaultValue="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg px-4 py-3 border border-green-300 text-sm">
              <div className="text-gray-600">Total Units: <span className="font-bold text-green-800 text-base">1,600</span></div>
              <div className="text-xs text-gray-500 mt-1">
                (15 cases × 100 units) + 10 sample units + 90 partial units = 1600
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <HotButton className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium">
              Mark Complete
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
