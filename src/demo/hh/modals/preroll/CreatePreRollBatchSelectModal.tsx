import { X, Package, Check, ArrowRight, MagnifyingGlass, BookOpen, CaretDown, ShoppingCart } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_ROUTED_G, PR_SRC_SHORT } from './data'

const getProductLineColors = (productLine: string): { bg: string; text: string } => {
  const colors: Record<string, { bg: string; text: string }> = {
    'Packs': { bg: '#ffd400', text: '#282928' },
    'Robust': { bg: '#c8102e', text: '#fafaf8' },
    'Alpha': { bg: '#5B2D8E', text: '#D4AF37' },
    'Reserve': { bg: '#3C3C3C', text: '#C41E3A' },
  }
  return colors[productLine] || { bg: '#e5e7eb', text: '#1f2937' }
}

/* LeafLink units available for the selected cultivar, per product line (collapsed summary). */
const LEAFLINK_TOTALS = [
  { name: 'Packs', total: 412 },
  { name: 'Robust', total: 96 },
  { name: 'Reserve', total: 38 },
  { name: 'Alpha', total: 0 },
]
const lowStockThreshold = 50

const GROUPS = [
  {
    cultivar: STRAIN,
    avgAge: 0,
    items: [{ id: PR_SRC_SHORT, label: 'Bud', days: 0, grams: PR_ROUTED_G, selected: true }],
  },
  {
    cultivar: 'Lemon Cherry Haze',
    avgAge: 6,
    items: [{ id: '000466', label: 'Trim', days: 6, grams: 2310, selected: false }],
  },
]

/** HarvestHub: src/components/CreatePreRollBatchModal.tsx — "Create Pre-Roll Batch" (Select Materials step). */
export default function CreatePreRollBatchSelectModal() {
  const total = GROUPS.reduce((s, g) => s + g.items.length, 0)
  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-full overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <Package className="w-4.5 h-4.5 text-white" weight="fill" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">Create Pre-Roll Batch</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-1 rounded-full bg-blue-400" />
                  <div className="w-5 h-1 rounded-full bg-white/20" />
                </div>
                <span className="text-xs text-slate-300">Select Materials</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              title="Manage saved blends"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Blends</span>
              <span className="ml-0.5 px-1.5 py-0.5 bg-blue-500/30 text-blue-200 text-[10px] rounded-full font-semibold">4</span>
            </button>
            <button className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* LeafLink Inventory Needs */}
          <div className="mb-5 border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="w-5 h-5 text-slate-500" />
                <span className="font-semibold text-sm text-slate-800">LeafLink Inventory</span>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-700">3 low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  {LEAFLINK_TOTALS.map((pl) => (
                    <span key={pl.name} className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getProductLineColors(pl.name).bg }} />
                      <span className={`font-bold ${pl.total === 0 ? 'text-red-600' : pl.total < lowStockThreshold ? 'text-amber-600' : 'text-slate-700'}`}>
                        {pl.total.toLocaleString()}
                      </span>
                    </span>
                  ))}
                </div>
                <CaretDown className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          </div>

          {/* Batch name field */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Batch Name</label>
            <input
              type="text"
              defaultValue={STRAIN}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter batch name"
            />
          </div>

          {/* Item list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">Select Materials</h3>
              <span className="text-[11px] text-slate-400">{total} of {total}</span>
            </div>
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search by cultivar, tag, batch, or room..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {GROUPS.map(({ cultivar, avgAge, items }) => {
              const totalRemaining = items.reduce((sum, item) => sum + item.grams, 0)
              return (
                <div key={cultivar} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-800 text-sm">{cultivar}</h4>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500">{items.length} lot{items.length !== 1 ? 's' : ''}</span>
                        <span className="text-slate-500">{avgAge}d avg</span>
                        <span className="font-bold text-green-700">{totalRemaining.toLocaleString()}g</span>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`px-3 py-2 flex items-center gap-3 cursor-pointer transition-colors ${item.selected ? 'bg-blue-50/70' : 'bg-white hover:bg-slate-50'}`}
                      >
                        <div className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center ${item.selected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                          {item.selected && <Check className="w-2.5 h-2.5 text-white" weight="bold" />}
                        </div>
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800 font-mono">{item.id}</span>
                          <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] text-slate-400">{item.days}d</span>
                          <span className="text-xs font-semibold text-green-700">{item.grams.toLocaleString()}g</span>
                        </div>
                        {item.selected && (
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <input
                              type="number"
                              min="0"
                              max={item.grams}
                              step="0.1"
                              defaultValue={item.grams}
                              className="w-20 px-2 py-1 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <span className="text-xs text-slate-500">g</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4">
            <label className="block text-xs font-medium text-slate-600 mb-1">Notes (Optional)</label>
            <textarea
              rows={2}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add any notes about this batch..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50">
          <div />
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <HotButton className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5">
              <span>Allocate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
