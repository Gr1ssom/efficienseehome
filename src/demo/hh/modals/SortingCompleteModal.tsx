import { X, CheckCircle } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { STRAIN } from '../demoData'

const MICROBIAL_SYMBOLS = [
  { key: 'triangle', label: '△' },
  { key: 'circle', label: '●' },
  { key: 'square', label: '□' },
  { key: 'filled_square', label: '■' },
  { key: 'mixup', label: 'Mix-Up' },
  { key: 'seeded', label: 'Seeded' },
]

const INPUT = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'

/** HarvestHub: src/components/SortingCompleteModal.tsx — "Complete Sorting" */
export default function SortingCompleteModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
            Complete Sorting
          </h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">
              Strain: <span className="font-semibold text-gray-800">{STRAIN}</span>
            </div>
            <div className="text-sm text-gray-600">
              Room: <span className="font-semibold text-gray-800">Dry Room 2</span>
            </div>
            <div className="text-sm text-gray-600">
              Sorted By: <span className="font-semibold text-gray-800">K. Patel, B. Lee</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Bud Grade Weights</h4>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AAA Buds (g)</label>
                <input type="number" min="0" step="0.01" defaultValue="14250" placeholder="0" className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">A Buds (g)</label>
                <input type="number" min="0" step="0.01" defaultValue="9880" placeholder="0" className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">B Buds (g)</label>
                <input type="number" min="0" step="0.01" defaultValue="5120" placeholder="0" className={INPUT} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">AAA Totes</label>
                <input type="number" min="0" step="1" defaultValue="4" placeholder="0" className={`${INPUT} text-sm`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">A Totes</label>
                <input type="number" min="0" step="1" defaultValue="3" placeholder="0" className={`${INPUT} text-sm`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">B Totes</label>
                <input type="number" min="0" step="1" defaultValue="2" placeholder="0" className={`${INPUT} text-sm`} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sorting Trim (g)</label>
            <input type="number" min="0" step="0.01" defaultValue="1980" placeholder="0" className={INPUT} />
            <p className="text-xs text-gray-400 mt-1">Trim collected during sorting — auto-added to Pre-Roll Collecting queue.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fan Leaves (g)</label>
            <input type="number" min="0" step="0.01" defaultValue="610" placeholder="0" className={INPUT} />
            <p className="text-xs text-gray-400 mt-1">If fan leaves were collected during sorting, enter the weight — they will be auto-added to Extraction Collection.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input type="time" defaultValue="08:05" className={INPUT} />
              <p className="text-xs text-gray-400 mt-1">
                Originally: 10/2/2026, 8:05 AM
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
              <input type="time" defaultValue="13:40" className={INPUT} />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isMultiDay"
              defaultChecked={false}
              className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="isMultiDay" className="ml-2 text-sm font-medium text-gray-700">
              Multi-day sorting
            </label>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">Microbial Check</h4>
            <button
              type="button"
              className="w-full py-3.5 px-4 rounded-lg font-semibold transition-all touch-manipulation bg-green-600 text-white"
            >
              Microbials Checked
            </button>

            <div className="space-y-3 mt-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Mark any issues found:</label>
                <div className="flex flex-wrap gap-2">
                  {MICROBIAL_SYMBOLS.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      className="px-3 py-2 rounded-lg font-bold text-sm transition-all touch-manipulation border bg-white text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-600"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Microbial Notes (if any)</label>
                <textarea
                  defaultValue=""
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  rows={2}
                  placeholder="Describe any microbials found..."
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <HotButton className="flex-1 px-4 py-2 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors bg-primary hover:bg-accent-dark">
              Complete Sorting
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
