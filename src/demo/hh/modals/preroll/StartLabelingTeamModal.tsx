import { X, Play } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { STRAIN, TEAM } from '../../demoData'
import { PR_LABEL_TEAM, PR_LABEL_UNITS } from './data'

const EMPLOYEES = [...TEAM, 'K. Patel', 'B. Lee']

/** HarvestHub: src/components/PreRollLabeling.tsx — "Select Team" (step 2 of Start Labeling). */
export default function StartLabelingTeamModal() {
  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="bg-slate-800 px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Select Team
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
          {/* Summary pill */}
          <div className="flex items-center gap-2 text-sm bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
            <span className="text-blue-800 font-medium">
              {`All ${PR_LABEL_UNITS} units`}
            </span>
          </div>

          {/* Team member selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select Team Members *
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
              {EMPLOYEES.map((name) => (
                <button
                  key={name}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    PR_LABEL_TEAM.includes(name)
                      ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Other name */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Other (Type Name)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter name if not listed above"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-1">
            <button className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
              Back
            </button>
            <HotButton className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold flex items-center justify-center gap-2">
              <Play className="w-4 h-4" weight="fill" />
              <span>Start Labeling</span>
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
