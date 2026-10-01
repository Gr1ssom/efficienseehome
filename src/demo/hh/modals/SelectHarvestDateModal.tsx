import { X } from 'lucide-react'
import HotButton from '../HotButton'

/** HarvestHub: src/components/DryRooms.tsx — "Select Harvest Date" (Import from METRC). */
export default function SelectHarvestDateModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Select Harvest Date</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Select the date of the harvests you want to import from METRC
        </p>
        <input
          type="date"
          value="2026-09-22"
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex justify-end space-x-3 mt-6">
          <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Cancel
          </button>
          <HotButton className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Load Harvests
          </HotButton>
        </div>
      </div>
    </div>
  )
}
