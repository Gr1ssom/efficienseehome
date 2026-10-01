import { X, Play, Users, Check } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { STRAIN } from '../demoData'

const EMPLOYEES = [
  { name: 'K. Patel', selected: true },
  { name: 'B. Lee', selected: true },
  { name: 'A. Diaz', selected: false },
]

/** HarvestHub: src/components/SortingStartModal.tsx — "Start Sorting" */
export default function SortingStartModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Play className="w-6 h-6 mr-2 text-primary" />
            Start Sorting
          </h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="text-sm text-gray-600">
              Strain: <span className="font-semibold text-gray-800">{STRAIN}</span>
            </div>
            <div className="text-sm text-gray-600">
              Room: <span className="font-semibold text-gray-800">Dry Room 2</span>
            </div>
            <div className="text-sm text-gray-600">
              Untrimmed Weight: <span className="font-semibold text-gray-800">31940g</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Weight (g) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              defaultValue="31940"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter starting weight in grams"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Team Members * <span className="text-xs text-gray-500">(Select one or more)</span>
            </label>
            <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
              {EMPLOYEES.map((member) => (
                <button
                  key={member.name}
                  type="button"
                  className={`relative px-6 py-4 rounded-lg border-2 transition-all duration-200 font-medium ${
                    member.selected
                      ? 'border-primary bg-primary text-white shadow-md'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-primary hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{member.name}</span>
                  </div>
                  {member.selected && (
                    <div className="absolute top-1 right-1">
                      <Check className="w-4 h-4" weight="bold" />
                    </div>
                  )}
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
              Selected: <span className="font-semibold text-primary">K. Patel, B. Lee</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              VAC 1 (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              defaultValue="62"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter VAC 1 percentage (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              VAC 2 (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              defaultValue="58"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter VAC 2 percentage (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feeder Speed
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              defaultValue="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter feeder speed (optional)"
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
              Start Sorting
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
