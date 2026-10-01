import HotButton from '../HotButton'
import { TAG_SRC, TAG_TEST } from '../demoData'

/** HarvestHub: src/components/TestingHub/FlowerTestingSection.tsx — "Send to Testing" */
export default function SendToTestingModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-full overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Send to Testing</h3>
          <button className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
            <div className="flex justify-between"><span className="text-gray-500">Source Tag:</span><span className="font-medium">{TAG_SRC}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Test Tag:</span><span className="font-medium">{TAG_TEST}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Total Weight:</span><span className="font-medium">6,800g</span></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Testing Company *</label>
            <div className="flex gap-3">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-colors text-sm font-semibold border-blue-600 bg-blue-50 text-blue-800">
                <input type="radio" name="testingCompany" value="GPA" defaultChecked className="sr-only" />
                GPA
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-colors text-sm font-semibold border-gray-200 bg-white text-gray-600 hover:border-gray-300">
                <input type="radio" name="testingCompany" value="GCA" className="sr-only" />
                GCA
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-colors text-sm font-semibold border-gray-200 bg-white text-gray-600 hover:border-gray-300">
                <input type="radio" name="testingCompany" value="MOCANN" className="sr-only" />
                MOCANN
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight Taken by Testing (grams) *</label>
            <input type="number" defaultValue="30" placeholder="e.g., 50" min="0" max={6800} step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bud Grade Weight Was Taken From *</label>
            <div className="flex gap-2">
              <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border-2 cursor-pointer transition-colors text-sm font-semibold border-emerald-600 bg-emerald-50 text-emerald-800">
                <input type="radio" name="testingGrade" value="aaa" defaultChecked className="sr-only" />
                AAA
              </label>
              <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border-2 cursor-pointer transition-colors text-sm font-semibold border-gray-200 bg-white text-gray-500 hover:border-gray-300">
                <input type="radio" name="testingGrade" value="a" className="sr-only" />
                A Bud
              </label>
              <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border-2 cursor-pointer transition-colors text-sm font-semibold border-gray-200 bg-white text-gray-500 hover:border-gray-300">
                <input type="radio" name="testingGrade" value="b" className="sr-only" />
                B Bud
              </label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between"><span className="text-blue-700">Remaining after testing:</span><span className="font-semibold text-blue-900">6,770g</span></div>
            <div className="flex justify-between text-xs"><span className="text-blue-600">Deducted from:</span><span className="font-medium text-blue-800">AAA Bud</span></div>
          </div>
        </div>
        <div className="flex space-x-3 p-5 border-t border-gray-200 bg-gray-50">
          <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <HotButton className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-blue-600 hover:bg-blue-700">Send to Testing</HotButton>
        </div>
      </div>
    </div>
  )
}
