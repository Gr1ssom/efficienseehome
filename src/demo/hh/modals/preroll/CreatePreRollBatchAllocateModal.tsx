import { X, Check, ArrowLeft, BookOpen, Package } from '@phosphor-icons/react'
import HotButton from '../../HotButton'
import { STRAIN } from '../../demoData'
import { PR_ROUTED_G, PR_SRC_SHORT } from './data'

const PRODUCT_LINES = [
  { name: 'Packs', packSizes: ['2pk', '5pk', '10pk'] },
  { name: 'Robust', packSizes: ['2pk', '5pk'] },
  { name: 'Reserve', packSizes: ['1pk', '2pk', '5pk'] },
  { name: 'Alpha', packSizes: ['2pk', '5pk', '10pk'] },
]

const getProductLineColors = (productLine: string): { bg: string; text: string } => {
  const colors: Record<string, { bg: string; text: string }> = {
    'Packs': { bg: '#ffd400', text: '#282928' },
    'Robust': { bg: '#c8102e', text: '#fafaf8' },
    'Alpha': { bg: '#5B2D8E', text: '#D4AF37' },
    'Reserve': { bg: '#3C3C3C', text: '#C41E3A' },
  }
  return colors[productLine] || { bg: '#e5e7eb', text: '#1f2937' }
}

/* Sales units available for this cultivar, per SKU. */
const STOCK: Record<string, number> = {
  'Packs 2pk': 140, 'Packs 5pk': 0, 'Packs 10pk': 272,
  'Robust 2pk': 96, 'Robust 5pk': 0,
  'Reserve 1pk': 38, 'Reserve 2pk': 0, 'Reserve 5pk': 0,
  'Alpha 2pk': 0, 'Alpha 5pk': 0, 'Alpha 10pk': 0,
}

/* The operator allocates the whole lot to Packs 5pk, the SKU that is out of stock. */
const ALLOCATIONS: Record<string, number> = { 'Packs 5pk': PR_ROUTED_G }

const getAllocationValue = (productLine: string, packSize: string) => ALLOCATIONS[`${productLine} ${packSize}`] || 0

/** HarvestHub: src/components/CreatePreRollBatchModal.tsx — "Create Pre-Roll Batch" (Allocate to SKUs step). */
export default function CreatePreRollBatchAllocateModal() {
  const totalWeight = PR_ROUTED_G
  const totalAllocated = Object.values(ALLOCATIONS).reduce((s, g) => s + g, 0)
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
                  <div className="w-5 h-1 rounded-full bg-green-400" />
                  <div className="w-5 h-1 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-slate-300">Allocate to SKUs</span>
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

        {/* Allocation bar */}
        <div className="sticky top-0 z-10 px-5 py-2.5 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between rounded-lg p-2.5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Total</span>
                <span className="font-bold text-sm text-green-800">{totalWeight.toLocaleString()}g</span>
              </div>
              <div className="w-px h-4 bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Allocated</span>
                <span className="font-bold text-sm text-green-800">{totalAllocated.toLocaleString()}g</span>
              </div>
              <div className="w-px h-4 bg-slate-300" />
              <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all bg-green-500" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium">Remaining</span>
              <span className="text-lg font-bold text-green-600">0g</span>
              <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">FULL</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="mb-3 flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-sm font-semibold text-slate-800">{STRAIN}</span>
            <div className="w-px h-4 bg-slate-300" />
            <span className="text-[11px] text-slate-500 font-mono">{PR_SRC_SHORT}</span>
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all border-slate-200 bg-white hover:border-slate-300"
            >
              <div className="flex items-center gap-2.5">
                {/* Real UI shows the ReLeaf logo image here. */}
                <span className="h-5 w-5 rounded bg-slate-200" />
                <span className="text-xs font-medium text-slate-700">ReLeaf Order</span>
              </div>
              <div className="w-8 h-[18px] rounded-full transition-colors flex items-center bg-slate-300">
                <div className="w-3.5 h-3.5 bg-white rounded-full shadow transition-transform mx-0.5 translate-x-0" />
              </div>
            </button>
          </div>

          <div className="space-y-3">
            {PRODUCT_LINES.map((productLine) => {
              const colors = getProductLineColors(productLine.name)
              const hasAnyAllocation = productLine.packSizes.some((ps) => getAllocationValue(productLine.name, ps) > 0)
              const lineTotal = productLine.packSizes.reduce((sum, ps) => sum + getAllocationValue(productLine.name, ps), 0)
              return (
                <div key={productLine.name} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="px-3 py-1.5 flex items-center justify-between" style={{ backgroundColor: colors.bg }}>
                    <h4 className="font-semibold text-sm" style={{ color: colors.text }}>{productLine.name}</h4>
                    <div className="flex items-center gap-2">
                      {lineTotal > 0 && (
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-black/10" style={{ color: colors.text }}>
                          {lineTotal.toLocaleString()}g
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <div className={`grid gap-3 ${productLine.packSizes.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                      {productLine.packSizes.map((packSize) => {
                        const avail = STOCK[`${productLine.name} ${packSize}`]
                        const value = getAllocationValue(productLine.name, packSize)
                        return (
                          <div key={packSize}>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-xs font-medium text-slate-700">{packSize}</label>
                              <span className={`text-[10px] font-semibold ${avail > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {avail.toLocaleString()} avail
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min="0"
                                step="0.1"
                                defaultValue={value || ''}
                                className="flex-1 px-2 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0"
                              />
                              <span className="text-xs text-slate-400">g</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {hasAnyAllocation && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                        <div className={`grid gap-3 ${productLine.packSizes.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                          {productLine.packSizes.map((packSize) => {
                            if (getAllocationValue(productLine.name, packSize) <= 0) return null
                            return (
                              <div key={packSize}>
                                <label className="block text-[10px] font-medium text-slate-400 mb-0.5">
                                  {packSize} METRC Tag
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 text-xs border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                                  placeholder="1A4..."
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50">
          <button className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <HotButton className="px-4 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" weight="bold" />
              <span>Create Batch</span>
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
