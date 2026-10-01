import { X, CaretRight } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_LABEL_UNITS, TAG_PR_TEST } from './data'

/** HarvestHub: src/components/PreRollLabeling.tsx — "Start Labeling" (step 1: units, no split). */
export default function StartLabelingConfigModal() {
  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="bg-slate-800 px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Start Labeling
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              {STRAIN} · 5pk
            </p>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Batch summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Product Line</span>
              <span className="font-semibold text-slate-800">Packs</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Total Units Available</span>
              <span className="font-bold text-slate-900">{PR_LABEL_UNITS}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">METRC Tag</span>
              <span className="font-mono text-xs text-slate-600">{TAG_PR_TEST}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">THC</span>
              <span className="font-semibold text-green-700">24.9%</span>
            </div>
          </div>

          {/* Units to label */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Units to Label
            </label>
            <input
              type="number"
              defaultValue={PR_LABEL_UNITS}
              min="1"
              max={PR_LABEL_UNITS}
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`1 - ${PR_LABEL_UNITS}`}
            />
          </div>

          {/* ReLeaf toggle */}
          <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
            <div className="flex items-center gap-2">
              {/* Real UI shows the ReLeaf logo image here. */}
              <span className="w-5 h-5 rounded bg-slate-200" />
              <span className="text-sm font-medium text-slate-700">ReLeaf Batch</span>
            </div>
            <button className="relative w-11 h-6 rounded-full transition-colors bg-slate-300">
              <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" />
            </button>
          </div>

          {/* Continue button */}
          <HotButton className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2">
            <span>Continue to Team Selection</span>
            <CaretRight className="w-4 h-4" />
          </HotButton>
        </div>
      </div>
    </div>
  )
}
