import { X, Users, Check } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { TAG_TEST } from '../demoData'

const MACHINE_TEAM_MEMBERS = ['S. Moore', 'D. Ruiz']

/** HarvestHub: src/components/PackagingAssignmentModal.tsx — "Start Machine Packaging" */
export default function StartMachinePackagingModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">
            Start Machine Packaging
          </h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real UI: <form>; a div here so the demo button never submits the page. */}
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="text-sm text-gray-600">Product: <span className="font-semibold text-gray-800">RESERVE 3.5g Jars</span></div>
            <div className="text-sm text-gray-600">Batch: <span className="font-semibold text-gray-800">{TAG_TEST}</span></div>
            <div className="text-sm text-gray-600">Allocated: <span className="font-semibold text-gray-800">5880g</span></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Team Members * <span className="text-xs text-gray-500">(Select one or more)</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              {MACHINE_TEAM_MEMBERS.map((member) => (
                <button
                  key={member}
                  type="button"
                  className="relative px-6 py-4 rounded-lg border-2 transition-all duration-200 font-medium border-primary bg-primary text-white shadow-md"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{member}</span>
                  </div>
                  <div className="absolute top-1 right-1">
                    <Check className="w-4 h-4" weight="bold" />
                  </div>
                </button>
              ))}
              <button
                type="button"
                className="relative px-6 py-4 rounded-lg border-2 transition-all duration-200 font-medium border-gray-300 bg-white text-gray-700 hover:border-primary hover:bg-blue-50"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Other</span>
                </div>
              </button>
            </div>

            <div className="mt-2 text-sm text-gray-600">
              Selected: <span className="font-semibold text-primary">{MACHINE_TEAM_MEMBERS.join(', ')}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time *
            </label>
            <input
              type="time"
              defaultValue="07:45"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight Going Into Machine (grams) *
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue="5880"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <HotButton className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
              Start Packaging
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
