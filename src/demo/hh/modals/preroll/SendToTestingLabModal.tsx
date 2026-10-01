import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_LAB_UNITS, PR_UNITS, TAG_PR_TEST } from './data'

/* Packs are 0.5g joints; a 5pk weighs 2.5g, so 4 packs cover the lab's ~8g sample. */
const TESTING_WEIGHT_GRAMS = 8
const packWeight = 0.5 * 5
const suggested = Math.min(Math.ceil(TESTING_WEIGHT_GRAMS / packWeight), PR_UNITS)

/** HarvestHub: src/components/TestingHub/PreRollTestingSection.tsx — "Send to Testing Lab" */
export default function SendToTestingLabModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-full overflow-y-auto">
        <div className="bg-blue-600 px-6 py-4 rounded-t-lg"><h3 className="text-xl font-bold text-white">Send to Testing Lab</h3></div>
        <div className="p-6">
          <div className="space-y-2 mb-5 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Blend:</span><span className="font-semibold">{STRAIN}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Product:</span><span className="font-semibold">Packs 5pk</span></div>
            <div className="flex justify-between"><span className="text-gray-600">METRC Tag:</span><span className="font-mono text-sm">{TAG_PR_TEST}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Total Units:</span><span className="font-semibold">{PR_UNITS}</span></div>
          </div>
          <div className="space-y-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Units Sent to Testing *</label>
              <div className="flex gap-2">
                <input type="number" defaultValue={PR_LAB_UNITS} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="How many units did the lab take?" min="1" max={PR_UNITS} />
                <button type="button" className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors whitespace-nowrap">
                  Use {suggested}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">{suggested} packs ({packWeight}g each) covers ~{TESTING_WEIGHT_GRAMS}g for testing</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 text-sm">
            <div className="flex justify-between"><span className="text-blue-700">Moving Forward:</span><span className="font-semibold text-blue-900">{PR_UNITS - PR_LAB_UNITS} units</span></div>
          </div>
          <div className="flex space-x-3">
            <HotButton className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium">Send to Lab</HotButton>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
