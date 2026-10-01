import { X, Tag, Eye, CheckCircle } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { STRAIN, TAG_SRC } from '../demoData'

/** HarvestHub: src/components/LabelCreatorModal.tsx — "Label Creator" (Step 2: Source Package Tag & Unit Count) */
export default function LabelCreatorStep2Modal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Tag className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Label Creator</h2>
              <p className="text-sm text-gray-600">Step 2: Source Package Tag & Unit Count</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
              <p className="text-sm text-blue-800">
                <strong>Product:</strong> RESERVE 3.5g Jars
              </p>
              <p className="text-sm text-blue-800">
                <strong>Strain:</strong> {STRAIN}
              </p>
              <p className="text-sm text-blue-700">
                <strong>Unit Weight:</strong> 3.5g
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source Package Tag *
              </label>
              <p className="text-xs text-gray-500 mb-2">The METRC source package tag (not the testing tag)</p>
              <input
                type="text"
                defaultValue={TAG_SRC}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                placeholder="e.g. 1A40603000085B8000025635"
              />
              <p className="text-xs text-green-700 mt-1.5 font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" weight="fill" />
                Source package tag set
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Units to Print *
              </label>
              <input
                type="number"
                defaultValue={1600}
                min="1"
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter number of labels to print"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors">
            Back
          </button>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors">
              Cancel
            </button>
            <HotButton className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50">
              <Eye className="w-4 h-4" />
              <span>Preview & Export</span>
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
