import { X, MagnifyingGlass } from '@phosphor-icons/react'
import HotButton from '../HotButton'

/** HarvestHub: src/components/EmployeeInputModal.tsx — "Assign Trim Employee" (opened from Trim.tsx) */

const EMPLOYEES = ['D. Ruiz', 'S. Moore', 'A. Diaz', 'K. Patel', 'B. Lee']
const TILE =
  'px-4 py-3 text-left border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-all font-medium text-gray-800 hover:text-primary'

export default function AssignTrimEmployeeModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Assign Trim Employee</h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              defaultValue=""
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search employees..."
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Tapping an employee submits: L. Park is the operator's pick. */}
            <HotButton className={TILE}>
              <div className="font-semibold">L. Park</div>
              <div className="text-xs text-gray-500 mt-1">Trim</div>
            </HotButton>
            {EMPLOYEES.map((name) => (
              <button key={name} className={TILE}>
                <div className="font-semibold">{name}</div>
                <div className="text-xs text-gray-500 mt-1">Trim</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
