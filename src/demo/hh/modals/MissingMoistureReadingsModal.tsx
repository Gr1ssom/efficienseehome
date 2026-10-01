import { Drop } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { BATCH } from '../demoData'

/** HarvestHub: src/components/DryRooms.tsx — "Missing Moisture Readings" */
export default function MissingMoistureReadingsModal() {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
              <Drop className="w-5 h-5 text-amber-600" weight="fill" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Missing Moisture Readings</h3>
              <p className="text-sm text-gray-500 mt-0.5">{BATCH}</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-3">
          <p className="text-sm text-gray-600">
            This batch hasn't had all readings recorded before moving to the bucking queue:
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-1.5">
            <div className="flex items-center space-x-2 text-sm text-amber-800">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              <span>Moisture % — not recorded</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-amber-800">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              <span>Water Activity — not recorded</span>
            </div>
          </div>
          <HotButton className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            <Drop className="w-4 h-4" />
            <span>Log Readings Now</span>
          </HotButton>
        </div>
        <div className="px-6 pb-6 flex items-center space-x-3">
          <button className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium">
            Cancel
          </button>
          <button className="flex-1 px-4 py-2 text-sm text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors font-medium">
            Move Anyway
          </button>
        </div>
      </div>
    </div>
  )
}
