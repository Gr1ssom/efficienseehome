import { X, Check } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_FINAL_G, PR_MISC_G, PR_ROUTED_G, PR_SRC_SHORT, PR_STEM_G } from './data'

/** HarvestHub: src/components/PreRollQueue.tsx — "Record Stem Weight & Misc Loss" (sift modal). */
export default function RecordStemWeightModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Record Stem Weight &amp; Misc Loss</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-gray-700 mb-2">
              Recording sift for <strong>{STRAIN}</strong>
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Batch weight: <span className="font-semibold text-gray-900">{PR_ROUTED_G.toLocaleString()}g</span></span>
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs font-bold">
                {PR_SRC_SHORT}
              </span>
            </div>
          </div>

          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Production Tag <span className="text-blue-500 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 42069"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stem Weight (g)
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={PR_STEM_G}
                placeholder="Weight removed during sift"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Misc Loss (g) <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={PR_MISC_G}
                placeholder="Weight of stems removed"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-1">
            <p className="text-sm text-gray-700">
              <strong>Starting:</strong>{' '}
              <span className="font-semibold">{PR_ROUTED_G.toLocaleString()}g</span>
            </p>
            <p className="text-sm text-orange-700">
              <strong>Stem weight deducted:</strong> -{PR_STEM_G.toLocaleString()}g
            </p>
            <p className="text-sm text-orange-700">
              <strong>Misc loss deducted:</strong> -{PR_MISC_G.toLocaleString()}g
            </p>
            <p className="text-sm text-green-800 font-semibold border-t border-green-200 pt-1 mt-1">
              Final weight into machine:{' '}
              {PR_FINAL_G.toLocaleString()}g
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
            Cancel
          </button>
          <HotButton className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Check className="w-4 h-4" />
            <span>Record Stem Weight &amp; Misc Loss</span>
          </HotButton>
        </div>
      </div>
    </div>
  )
}
