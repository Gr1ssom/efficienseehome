import { X, Clock, Users, Tree, ArrowCounterClockwise } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { BATCH, TEAM } from '../demoData'

/** HarvestHub: src/components/BuckingStartModal.tsx — "Start Bucking" */
export default function BuckingStartModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full shadow-2xl max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Clock className="w-6 h-6 mr-2 text-orange-400" />
            Start Bucking
          </h3>
          <button className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
            <div className="text-sm text-gray-400">
              Batch: <span className="font-semibold text-white">{BATCH}</span>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
            <button type="button" className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tree className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-semibold text-gray-400">Taking Tops</span>
              </div>
              <div className="w-10 h-5 rounded-full transition-colors relative bg-gray-600">
                <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform translate-x-0.5" />
              </div>
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Date *
            </label>
            <input
              type="date"
              defaultValue="2026-10-01"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 [color-scheme:dark]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Start Time *
              </label>
              <input
                type="time"
                defaultValue="07:30"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                End Time
                <span className="text-xs text-gray-500 font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  defaultValue=""
                  className="w-full px-3 py-2 border rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors [color-scheme:dark] border-gray-600 bg-gray-800"
                  placeholder="--:--"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-300">
                Select Team Members * <span className="text-orange-400">({TEAM.length} selected)</span>
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition-colors font-medium"
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded hover:bg-gray-600 transition-colors font-medium"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2 px-2 py-1.5 bg-orange-900/30 border border-orange-700/50 rounded-lg">
              <ArrowCounterClockwise className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              <span className="text-xs text-orange-300">Pre-filled from last session — deselect anyone not joining today.</span>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
              {TEAM.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="px-4 py-3 rounded-lg border-2 font-medium transition-all flex items-center justify-center space-x-2 border-orange-500 bg-orange-900/40 text-orange-300"
                >
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <HotButton className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors font-semibold">
              Start Bucking
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
