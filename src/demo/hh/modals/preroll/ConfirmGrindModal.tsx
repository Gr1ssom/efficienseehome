import { X, Check } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_ROUTED_G } from './data'

/** HarvestHub: src/components/PreRollQueue.tsx — "Confirm Grind Complete" */
export default function ConfirmGrindModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Confirm Grind Complete</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-bold text-amber-900 mb-1">{STRAIN}</h4>
            <p className="text-sm text-amber-800 mt-1">Batch weight: <span className="font-semibold">{PR_ROUTED_G.toLocaleString()}g</span></p>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
            Cancel
          </button>
          <HotButton className="flex items-center space-x-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50">
            <Check className="w-4 h-4" /><span>Confirm Grind</span>
          </HotButton>
        </div>
      </div>
    </div>
  )
}
