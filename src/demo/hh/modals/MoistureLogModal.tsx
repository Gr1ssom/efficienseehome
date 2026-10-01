import { X, Drop, Plus } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { STRAIN } from '../demoData'

/** HarvestHub: src/components/MoistureLogModal.tsx — "Moisture Report" */
export default function MoistureLogModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary to-accent-dark">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Drop className="w-6 h-6 mr-2" />
            Moisture Report: {STRAIN} (Dry Room 2)
          </h3>
          <button className="text-white hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Water Activity *</label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  defaultValue="0.62"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., 0.65"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Moisture % (optional)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  defaultValue="11.8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., 12.5"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                <input
                  type="text"
                  defaultValue="Stems snapping, ready to buck"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Any observations..."
                />
              </div>
            </div>
            <HotButton className="mt-3 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
              Save Entry
            </HotButton>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Entry History</h4>
            <p className="text-gray-400 text-sm text-center py-8">No entries recorded yet</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
