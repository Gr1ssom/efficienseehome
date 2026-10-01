import { X, CalendarBlank, Clock, Wind } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { BATCH } from '../demoData'

/** HarvestHub: src/components/CreateBurpListModal.tsx — "Create Burp List" */
export default function CreateBurpListModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-full overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Create Burp List</h2>
          <button className="text-white hover:bg-white/20 rounded p-2 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto min-h-0">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <CalendarBlank className="w-4 h-4 mr-2" />
              Scheduled Date
            </label>
            <input
              type="date"
              defaultValue="2026-10-05"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Configure Burp Settings for Each Cultivar
            </h3>

            <div className="space-y-3">
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="font-semibold text-gray-800 mb-3 flex items-center justify-between">
                  <span>{BATCH}</span>
                  <span className="text-xs text-gray-500">Cure Room</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center p-2 border border-gray-300 rounded bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="demo-burp-method" value="timed" defaultChecked className="mr-2" />
                    <Clock className="w-4 h-4 mr-1 text-blue-600" />
                    <span className="text-sm">Timed</span>
                  </label>

                  <label className="flex items-center p-2 border border-gray-300 rounded bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="demo-burp-method" value="fae" className="mr-2" />
                    <Wind className="w-4 h-4 mr-1 text-green-600" />
                    <span className="text-sm">FAE</span>
                  </label>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Duration (minutes)
                  </label>
                  <div className="flex gap-2 mb-2">
                    {[5, 10, 15, 30].map((minutes) => (
                      <button
                        key={minutes}
                        type="button"
                        className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                          minutes === 15
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {minutes} min
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    defaultValue="15"
                    min="1"
                    max="240"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Custom duration"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <HotButton className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Create Burp List
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
