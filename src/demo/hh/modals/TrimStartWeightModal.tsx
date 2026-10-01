import { X, Scales, CheckCircle } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { BATCH } from '../demoData'

/** HarvestHub: src/components/TrimStartWeightModal.tsx — "Verify Start Weight" */
export default function TrimStartWeightModal() {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full max-h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Scales className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Verify Start Weight</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{BATCH}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded px-3 py-2">
            Weigh each bud grade separately so any discrepancy can be traced to the exact grade.
            B buds are set aside and not handed out to trimmers.
          </div>

          <div className="rounded-lg p-3 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20">
            <span className="text-sm text-blue-700 dark:text-blue-300">Verified By:</span>
            <span className="font-semibold text-blue-900 dark:text-blue-100">lead.trim</span>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-green-300 dark:border-green-700 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-green-600 dark:text-green-400">AAA Buds</span>
                <span className="text-xs text-gray-500">Expected: 14,250g</span>
              </div>
              <input
                type="number"
                defaultValue="14250"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                placeholder="Enter verified AAA weight"
                min="0"
                step="1"
              />
            </div>

            <div className="rounded-lg border border-blue-300 dark:border-blue-700 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">A Buds</span>
                <span className="text-xs text-gray-500">Expected: 9,880g</span>
              </div>
              <input
                type="number"
                defaultValue="9880"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                placeholder="Enter verified A weight"
                min="0"
                step="1"
              />
            </div>

            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-3 opacity-60">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400 font-medium">B Buds (set aside)</span>
                <span className="font-semibold text-gray-500 dark:text-gray-400">5,120g</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Verified (AAA + A):</span>
              <span className="font-bold text-gray-900 dark:text-white text-lg">24,130g</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Expected (AAA + A):</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">24,130g</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Cancel
          </button>
          <HotButton className="px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
            <CheckCircle className="w-4 h-4" />
            <span>Verify Weight</span>
          </HotButton>
        </div>
      </div>
    </div>
  )
}
