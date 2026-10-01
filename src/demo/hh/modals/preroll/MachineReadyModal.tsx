import { X, Play } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_FINAL_G, TAG_PROD } from './data'

/** HarvestHub: src/components/PreRollQueue.tsx — "Machine Ready?" (machine loaded confirmation). */
export default function MachineReadyModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Machine Ready?</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-lg text-gray-700 mb-4">
            Is the machine loaded and ready to start?
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-blue-900">
              <strong>Blend:</strong> {STRAIN}
            </p>
            <p className="text-sm text-blue-900">
              <strong>Actual Start Weight:</strong> {PR_FINAL_G}g
            </p>
            <p className="text-sm text-blue-900">
              <strong>Machine:</strong> Machine 1
            </p>
            <p className="text-sm text-blue-900">
              <strong>New Tag:</strong> {TAG_PROD}
            </p>
            <p className="text-sm text-blue-900">
              <strong>Allocation:</strong>{' '}
              Packs 5pk
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
            Go Back
          </button>
          <HotButton className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Play className="w-5 h-5" />
            <span>Start Machine</span>
          </HotButton>
        </div>
      </div>
    </div>
  )
}
