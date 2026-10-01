import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_CASES, PR_LABEL_TEAM, PR_LABEL_UNITS, PR_PARTIALS } from './data'

/** HarvestHub: src/components/PreRollLabeling.tsx — "Complete Labeling" */
export default function CompleteLabelingModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Complete Labeling</h3>
        </div>
        <div className="p-6">
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Product:</span> {STRAIN}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Expected Units:</span> {PR_LABEL_UNITS}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Team Members:</span>{' '}
              {PR_LABEL_TEAM.join(', ')}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Started:</span>{' '}
              10/21/2026, 8:05 AM
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">End Time:</span>{' '}
              10/21/2026, 2:40 PM
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Cases Made *
            </label>
            <input
              type="number"
              defaultValue={PR_CASES}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Number of full cases"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Units in Partials Box *
            </label>
            <input
              type="number"
              defaultValue={PR_PARTIALS}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Number of partial units"
            />
          </div>

          <div className="flex space-x-3">
            <HotButton className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
              Complete
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
