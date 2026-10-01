import { Package, ArrowRight, Scales } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { HD, STRAIN, TAG_SRC } from '../demoData'

/** HarvestHub: src/components/Allocation.tsx — "<HD> - <cultivar>" (allocation form) */

type Grade = 'aaa' | 'a' | 'b'
const PLACEHOLDER: Record<Grade, string> = { aaa: 'AAA', a: 'A', b: 'B' }
// Only AAA has weight on this batch (A 0g, B 0g), so A/B inputs render disabled like the real form.
const HAS_WEIGHT: Record<Grade, boolean> = { aaa: true, a: false, b: false }

function ProductInput({ label, grades, value = '', isUnits, gpu = 1, total }: {
  label: string
  grades: Grade[]
  value?: string
  isUnits?: boolean
  gpu?: number
  total?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {isUnits && (
        <p className="text-xs text-blue-600 font-medium mb-1">Enter UNITS (1 unit = {gpu}g)</p>
      )}
      <div className="flex gap-1">
        {grades.map((grade) => HAS_WEIGHT[grade] ? (
          <input
            key={grade}
            type="number"
            step={isUnits ? '1' : '0.01'}
            defaultValue={value}
            className="w-full min-w-0 px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder={PLACEHOLDER[grade]}
          />
        ) : (
          <div key={grade} className="w-full min-w-0">
            <input
              type="text"
              value="0"
              disabled
              readOnly
              className="w-full min-w-0 px-2 py-1.5 text-sm border border-gray-200 rounded bg-gray-50 text-gray-400 cursor-not-allowed"
              placeholder={PLACEHOLDER[grade]}
            />
          </div>
        ))}
      </div>
      {total && (
        <div className="text-xs text-gray-600 mt-1">
          {total}
        </div>
      )}
    </div>
  )
}

const FLOWER_STOCK = [
  { size: 'Reserve 3.5g', available: 4.2, alloc: 12.6, reserved: 1.0 },
  { size: 'Robust 3.5g', available: 6.8, alloc: 8.1, reserved: 0.0 },
  { size: 'Packs 3.5g', available: 3.1, alloc: 5.4, reserved: 0.5 },
  { size: '1g', available: 2.4, alloc: 0.0, reserved: 0.0 },
  { size: '7g', available: 5.5, alloc: 3.2, reserved: 0.0 },
  { size: '14g', available: 1.9, alloc: 0.0, reserved: 0.0 },
]

export default function AllocateModal() {
  const title = `${HD} - ${STRAIN}`
  return (
    <div className="absolute inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-full overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-primary to-accent-dark text-white px-6 py-4">
          <h3 className="text-xl font-bold">
            {title}
          </h3>
          <div className="text-white/60 text-xs font-mono mt-0.5">{TAG_SRC}</div>
        </div>
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-3 sm:px-6 py-3">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-blue-900 text-sm">
                Remaining to Allocate
              </h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg p-2 text-center bg-white border border-slate-200">
                <div className="text-xs text-gray-600">AAA Grade</div>
                <div className="text-lg font-bold text-gray-900">
                  0.0g
                </div>
                <div className="text-xs text-gray-500">
                  of 6770.0g
                </div>
              </div>
              <div className="rounded-lg p-2 text-center bg-white border border-slate-200">
                <div className="text-xs text-gray-600">A Grade</div>
                <div className="text-lg font-bold text-gray-900">
                  0.0g
                </div>
                <div className="text-xs text-gray-500">
                  of 0.0g
                </div>
              </div>
              <div className="rounded-lg p-2 text-center bg-white border border-slate-200">
                <div className="text-xs text-gray-600">B Grade</div>
                <div className="text-lg font-bold text-gray-900">
                  0.0g
                </div>
                <div className="text-xs text-gray-500">
                  of 0.0g
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Allocation Form */}
            <div className="md:col-span-2 space-y-4">
              {/* Product Allocation */}
              <div className="bg-accent-cream border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Product Allocation (grams)
                </h4>
                <p className="text-xs text-blue-700 mb-3">
                  Allocate bud grades to product types. Packaging method will be assigned later.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ProductInput label="1g DRAMs" grades={['aaa', 'a', 'b']} isUnits gpu={1.05} />
                  <ProductInput label="Robust 3.5g Bags" grades={['aaa', 'a']} value="890" total="Total: 890.00g" />
                  <ProductInput label="Packs 3.5g" grades={['a', 'b']} />
                  <ProductInput label="RESERVE 3.5g Jars" grades={['aaa', 'a']} isUnits gpu={3.675} value="1600" total="Total: 1600 units (5880.0g)" />
                  <ProductInput label="PACKS 7g Smalls" grades={['a', 'b']} />
                  <ProductInput label="PACKS 14g Smalls" grades={['a', 'b']} />
                  <ProductInput label="28g Shake" grades={['a', 'b']} />
                  <ProductInput label="BULK LBS" grades={['aaa', 'a', 'b']} />
                </div>
              </div>

              {/* Pre-Roll Collection */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-orange-900">Pre-Roll Collection (grams)</h4>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 text-white text-xs font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    Send All
                  </button>
                </div>
                <p className="text-xs text-orange-700 mb-3">Allocate bud grades to send to pre-roll collection.</p>
                <div className="grid grid-cols-1 gap-4">
                  <ProductInput label="Pre-Roll" grades={['aaa', 'a', 'b']} />
                </div>
              </div>
            </div>

            {/* Right column - Batch Info Panel */}
            <div className="space-y-4">
              {/* Batch Details */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-3">Batch Info</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-bold text-gray-900 text-base">
                      {title}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tag:</span>{' '}
                    <span className="font-medium text-gray-500 font-mono text-xs">{TAG_SRC}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-300">
                    <span className="text-gray-600">Total Weight:</span>{' '}
                    <span className="font-bold text-gray-900">6,770g</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total THC:</span>{' '}
                    <span className="font-semibold text-gray-900">27.8%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Δ9-THC:</span>{' '}
                    <span className="font-semibold text-gray-900">0.9%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Terpenes:</span>{' '}
                    <span className="font-semibold text-gray-900">2.41%</span>
                  </div>
                </div>
              </div>

              {/* Flower Products - always shown */}
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-900 flex items-center">
                    <Scales className="w-4 h-4 mr-2 text-blue-600" />
                    Flower Inventory
                  </h4>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-700">
                      23.9 lbs
                    </span>
                    <span className="text-xs text-slate-500 block">
                      29.3 lbs allocated this month
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto"><table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 uppercase tracking-wider">
                      <th className="text-left py-2 font-medium">Size</th>
                      <th className="text-center py-2 font-medium">Available (LBS)</th>
                      <th className="text-center py-2 font-medium">Allocated</th>
                      <th className="text-right py-2 font-medium">Reserved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FLOWER_STOCK.map((item, index) => (
                      <tr key={item.size} className={index % 2 === 0 ? 'bg-green-50/40' : ''}>
                        <td className="py-2.5 pl-2 font-medium text-slate-800">{item.size}</td>
                        <td className="py-2.5 text-center font-bold text-green-700">
                          {item.available.toFixed(1)}
                        </td>
                        <td className={`py-2.5 text-center font-semibold ${item.alloc > 0 ? 'text-blue-700' : 'text-slate-400'}`}>
                          {item.alloc > 0 ? item.alloc.toFixed(1) : '0.0'}
                        </td>
                        <td className={`py-2.5 text-right pr-2 font-medium ${item.reserved > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                          {item.reserved.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table></div>
              </div>

              {/* Pre-Roll Products - always shown */}
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-3">Pre-Roll Inventory</h4>
                <p className="text-sm text-slate-400 text-center py-3">No pre-roll inventory found</p>
              </div>

              {/* Rosin / Concentrate Products */}
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-3">Rosin / Concentrate Inventory</h4>
                <p className="text-sm text-slate-400 text-center py-3">No rosin/concentrate inventory found</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-900">Trim QC Photos</h4>
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors text-sm font-bold">
                      ‹
                    </button>
                    <span className="text-xs text-slate-500 font-medium">1 / 2</span>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors text-sm font-bold">
                      ›
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-2 font-medium">Batch Photo</p>
                <div
                  role="img"
                  aria-label="Batch Photo"
                  className="w-full aspect-[4/3] rounded-lg border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200"
                />
                <div className="flex gap-1.5 mt-3 justify-center">
                  <button className="w-2 h-2 rounded-full transition-colors bg-slate-700" />
                  <button className="w-2 h-2 rounded-full transition-colors bg-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex justify-between space-x-3">
          <button className="px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors">
            Cancel
          </button>
          <HotButton className="flex items-center space-x-2 px-6 py-2 text-white rounded transition-colors bg-primary hover:bg-accent-dark">
            <Package className="w-5 h-5" />
            <span>Send to Packaging Teams</span>
          </HotButton>
        </div>
      </div>
    </div>
  )
}
