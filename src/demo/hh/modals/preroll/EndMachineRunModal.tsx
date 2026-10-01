import { X, Stop } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_FIX_LEFTOVER_G, PR_MACHINE_COUNT, PR_SRC_SHORT } from './data'

const inputCls = 'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900'

/** HarvestHub: src/components/PreRollQueue.tsx — "End Machine Run" (one-day run, no checkpoints). */
export default function EndMachineRunModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">End Machine Run</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-full overflow-y-auto">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-0.5">Source Tag</div>
                <h4 className="font-mono font-bold text-indigo-900">{PR_SRC_SHORT}</h4>
              </div>
            </div>
            <div className="text-sm font-semibold text-indigo-800">
              {STRAIN}
            </div>
          </div>

          {/* Day 1 Production Card */}
          <div className="bg-slate-50 border border-slate-300 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-slate-700">Day 1</div>
              <span className="text-xs text-slate-400">Required</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Start Date</label>
                <input type="date" defaultValue="2026-10-13" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Start Time</label>
                <input type="time" step="60" defaultValue="07:40" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">End Date</label>
                <input type="date" defaultValue="2026-10-13" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">End Time</label>
                <input type="time" step="60" defaultValue="15:25" className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Counter Reading</label>
              <input type="number" defaultValue={PR_MACHINE_COUNT} className={inputCls} placeholder="0" />
            </div>
          </div>

          {/* Day 2 Production Card (optional) */}
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-slate-500">Day 2</div>
              <span className="text-xs text-slate-400">Optional</span>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-amber-800 mb-2">Did the counter reset when you restarted?</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors bg-amber-600 text-white border-amber-600"
                >
                  Yes, counter reset
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors bg-white text-amber-700 border-amber-300 hover:bg-amber-100"
                >
                  No, counter continued
                </button>
              </div>
              <p className="text-xs text-amber-600 mt-2">
                Day 2 count will be added to Day 1 for the total.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">End Date</label>
                <input type="date" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">End Time</label>
                <input type="time" step="60" className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Counter Reading</label>
              <input type="number" className={inputCls} placeholder="0" />
            </div>
          </div>

          {/* Auto-summed Total */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 rounded-lg">
            <span className="text-sm font-semibold text-slate-200">Total Machine Count</span>
            <span className="text-lg font-bold text-white">{PR_MACHINE_COUNT}</span>
          </div>

          {/* Leftover Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leftover Weight (grams for fixing)
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue={PR_FIX_LEFTOVER_G}
              placeholder="Weight remaining for fixing underfills"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
            Cancel
          </button>
          <HotButton className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Stop className="w-4 h-4" />
            <span>Complete Run</span>
          </HotButton>
        </div>
      </div>
    </div>
  )
}
