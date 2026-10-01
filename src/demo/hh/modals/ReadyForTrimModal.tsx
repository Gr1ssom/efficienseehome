import { X, Drop, Wind, Scales, Leaf } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { BATCH } from '../demoData'

const AAA = 14250
const A = 9880
const B = 5120
const GRADE_TOTAL = AAA + A + B

/** HarvestHub: src/components/ReadyForTrimModal.tsx — "Ready for Trim" (Cure.tsx, destination 'trim') */
export default function ReadyForTrimModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Drop className="w-6 h-6 mr-2 text-green-500" />
            Ready for Trim
          </h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="text-sm text-gray-600">
              Strain: <span className="font-semibold text-gray-800">{BATCH}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Final Moisture Percentage *
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              defaultValue="11.2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="e.g., 11.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Wind className="w-4 h-4 inline mr-1" />
              Water Activity *
            </label>
            <input
              type="text"
              defaultValue="0.60"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="e.g., 0.65"
            />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <Scales className="w-4 h-4 mr-1.5" />
              Bud Weights by Grade (grams)
            </h4>
            <div className="space-y-3">
              <div className="border-l-4 border-emerald-500 pl-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1">AAA Bud</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={String(AAA)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="AAA bud weight (g)"
                />
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1">A Bud</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={String(A)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="A bud weight (g)"
                />
              </div>
              <div className="border-l-4 border-amber-500 pl-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1">B Bud</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={String(B)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="B bud weight (g)"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Leaf className="w-4 h-4 inline mr-1" />
              Trim Weight (grams)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              defaultValue=""
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter trim weight"
            />
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-primary font-medium">Total Weight:</span>
              <span className="font-bold text-primary-dark">{GRADE_TOTAL.toLocaleString()}g</span>
            </div>
            <div className="flex justify-between items-center text-xs text-primary mt-1">
              <span>Bud Subtotal (AAA + A + B):</span>
              <span className="font-semibold">{GRADE_TOTAL.toLocaleString()}g</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {`Current cure weight: ${GRADE_TOTAL.toFixed(2)}g`}
          </p>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <HotButton className="flex-1 px-4 py-2 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors bg-primary hover:bg-accent-dark">
              Move to Trim
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
