import { X, Scales } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { STRAIN, TEAM } from '../demoData'

/** HarvestHub: src/components/WeightInputModal.tsx — "Record Weights & Send to Sorting" (Bucking.tsx, non-topping) */
export default function RecordBuckingWeightsModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Scales className="w-6 h-6 mr-2 text-green-600" />
              Record Weights & Send to Sorting
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Projected dry weight: <span className="font-bold text-green-700">{(32062).toLocaleString()}g</span>
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">
                  Strain: <span className="font-semibold text-gray-800">{STRAIN}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Room: <span className="font-semibold text-gray-800">Dry Room 2</span>
                </div>
                <div className="text-sm text-gray-600">
                  Plants: <span className="font-semibold text-gray-800">120</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Start Time: <span className="font-semibold text-gray-800">07:30 AM</span>
            </div>
            <div className="text-sm text-gray-600">
              Sessions Ended: <span className="font-semibold text-gray-800">02:22 PM</span>
            </div>
            <div className="text-sm text-gray-600">
              Team: <span className="font-semibold text-gray-800">{TEAM.join(', ')}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Bucking Waste (grams) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              defaultValue="4870"
              className="w-full px-3 py-2 border border-red-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-red-50/20"
              placeholder="Weight of stems/waste removed"
            />
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Untrimmed Weight (g) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                defaultValue="31940"
                className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-gray-800 focus:ring-2 focus:ring-emerald-400 bg-emerald-50/20"
                placeholder="Weight after bucking"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm End Time *
            </label>
            <input
              type="time"
              defaultValue="14:22"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <p className="text-xs text-gray-500 mt-1">Sessions ended at finalization — adjust if needed.</p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <HotButton className="flex-1 px-4 py-2 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors bg-primary hover:bg-accent-dark">
              Record & Send to Sorting
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
