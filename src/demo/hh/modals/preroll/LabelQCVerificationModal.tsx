import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_CASES, PR_PARTIALS } from './data'

/** HarvestHub: src/components/PreRollLabeling.tsx — "Label QC Verification" */
export default function LabelQCVerificationModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Label QC Verification</h3>
        </div>
        <div className="p-6">
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Product:</span> {STRAIN}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Pack Size:</span> 5pk
            </p>
          </div>

          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Reported Counts:</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-900">
              <div>Cases: <span className="font-semibold">{PR_CASES}</span></div>
              <div>Partials: <span className="font-semibold">{PR_PARTIALS}</span></div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verify Cases Count *
            </label>
            <input
              type="number"
              defaultValue={PR_CASES}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Verified case count"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verify Partials Count *
            </label>
            <input
              type="number"
              defaultValue={PR_PARTIALS}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Verified partials count"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QC Notes (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Any QC observations..."
            />
          </div>

          <div className="flex space-x-3">
            <HotButton className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
              Approve &amp; Send to Fulfillment Hub
            </HotButton>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
