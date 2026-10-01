import {
  X, Check, Package, User, Tag, FileText, Barcode, Scales, Info, ArrowSquareOut, CaretDown,
} from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { STRAIN, TAG_PKG } from '../demoData'

const BRAND_CONFIGS = [
  { name: 'Robust', activeBg: 'bg-red-50', activeBorder: 'border-red-600', activeText: 'text-red-700' },
  { name: 'Alpha', activeBg: 'bg-slate-800', activeBorder: 'border-slate-800', activeText: 'text-white' },
  { name: 'Packs', activeBg: 'bg-slate-700', activeBorder: 'border-slate-700', activeText: 'text-white' },
  { name: 'RESERVE', activeBg: 'bg-stone-50', activeBorder: 'border-stone-700', activeText: 'text-stone-800' },
]
const SELECTED_BRAND = 'RESERVE'

const qualityChecks = [
  { key: 'hasIngredients', label: 'Ingredients', icon: FileText },
  { key: 'hasServingDose', label: 'Serving/Dose', icon: Package },
  { key: 'hasProducedBy', label: 'Produced By', icon: User },
  { key: 'hasTestedBy', label: 'Tested By', icon: User },
  { key: 'correctTestTag', label: 'Correct Test Tag', icon: Tag },
  { key: 'correctMetrcSrcTag', label: 'Correct METRC Src Tag', icon: Barcode },
  { key: 'correctProductWeight', label: 'Product Weight', icon: Scales },
  { key: 'hasCannabinoids', label: 'Cannabinoids', icon: FileText },
  { key: 'hasTerpeneProfile', label: 'Terpene Profile', icon: FileText },
  { key: 'hasInstructions', label: 'Instructions', icon: FileText },
  { key: 'correctApprovalNumber', label: 'Approval #', icon: Tag },
]

const REFERENCE = [
  { label: 'Cases', value: 15 },
  { label: 'Partial Units', value: 90 },
  { label: 'Total Sample Units', value: 10 },
  { label: 'Total Units', value: 1600, highlight: true },
]

const COUNTS = [
  { label: 'Cases (×100 ea)', value: 15 },
  { label: 'Partial Units', value: 90 },
  { label: 'Total Sample Units', value: 10 },
]

/** HarvestHub: src/components/FulfillmentCheckInModal.tsx — "Fulfillment Check-In" */
export default function FulfillmentCheckInModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-full overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Fulfillment Check-In</h2>
            <p className="text-slate-300 text-sm mt-1">Quality verification before inventory release</p>
          </div>
          <button className="text-slate-300 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Real UI: <form>; a div here so the demo button never submits the page. */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Item header */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</p>
                  <p className="text-slate-900 font-semibold">RESERVE 3.5g Jars</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-medium">lead.fulfillment</span>
              </div>
            </div>

            {/* Lab COA, to check the label against */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Lab COA</span>
                </div>
                <div className="flex items-center gap-2">
                  <a className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-700 rounded-lg hover:bg-slate-800">
                    <ArrowSquareOut className="w-3.5 h-3.5" /> Open
                  </a>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-white"
                  >
                    <CaretDown className="w-3.5 h-3.5" />
                    Show
                  </button>
                </div>
              </div>
            </div>

            {/* Product information */}
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Brand cards */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-3">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {BRAND_CONFIGS.map((brand) => {
                      const isSelected = brand.name === SELECTED_BRAND
                      return (
                        <button
                          key={brand.name}
                          type="button"
                          className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all min-h-[88px] ${
                            isSelected
                              ? `${brand.activeBorder} ${brand.activeBg} shadow-md`
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" weight="bold" />
                            </div>
                          )}
                          {/* Real UI shows the brand logo image here; the text fallback stands in. */}
                          <span className={`text-lg font-bold tracking-tight ${isSelected ? brand.activeText : 'text-slate-700'}`}>
                            {brand.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Product line + image */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1.5">
                        Product Line <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        defaultValue="RESERVE 3.5g Jars"
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-900"
                      >
                        <option value="">Select product line (RESERVE)</option>
                        <option value="RESERVE 3.5g Jars">RESERVE 3.5g Jars</option>
                        <option value="RESERVE 7g Jars">RESERVE 7g Jars</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-full h-28 bg-slate-100 rounded-xl flex flex-col items-center justify-center border border-slate-200 gap-1">
                        <Package className="w-8 h-8 text-slate-300" />
                        <p className="text-xs text-slate-400">No image available</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">METRC Tag</label>
                  <input
                    type="text"
                    defaultValue={TAG_PKG}
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-900"
                    placeholder="Enter METRC tag"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Approval # <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="A-2210"
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-900"
                    placeholder="Enter approval number"
                  />
                </div>
              </div>
            </div>

            {/* Quality verification */}
            <div className="bg-slate-50 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Quality Verification</h3>
                <div className="flex items-center space-x-2">
                  <button type="button"
                    className="px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    Check All
                  </button>
                  <button type="button"
                    className="px-3 py-1.5 text-xs font-medium bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors">
                    Clear All
                  </button>
                </div>
              </div>

              {/* Strain verify */}
              <div className="mb-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all border-green-500 bg-green-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-green-500 text-white">
                      <Check className="w-4 h-4" weight="bold" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-green-800">
                        Strain Name Verified
                      </p>
                      <p className="text-xs mt-0.5 text-green-600">
                        {STRAIN}
                      </p>
                    </div>
                  </div>
                  <Tag className="w-5 h-5 text-green-500" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {qualityChecks.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    className="flex items-center space-x-2 p-3 rounded-lg border-2 transition-all border-green-500 bg-green-50 text-green-800"
                  >
                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-green-500 text-white">
                      <Check className="w-3.5 h-3.5" weight="bold" />
                    </div>
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Unit counts */}
            <div className="bg-slate-50 rounded-lg p-5 space-y-5">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Unit Count Confirmation</h3>

              {/* Reference panel — shows what the previous stage recorded */}
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Previous Stage Recorded
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {REFERENCE.map(({ label, value, highlight }) => (
                    <div key={label} className={`rounded-lg p-3 text-center ${highlight ? 'bg-slate-100 border border-slate-300' : 'bg-slate-50 border border-slate-200'}`}>
                      <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
                      <p className={`text-xl font-bold ${highlight ? 'text-slate-800' : 'text-slate-700'}`}>{value.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input fields */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {COUNTS.map(({ label, value }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-medium text-slate-600">{label}</label>
                    </div>
                    <input
                      type="number"
                      min="0"
                      defaultValue={value}
                      className="w-full px-3 py-2.5 bg-white border-2 rounded-lg focus:ring-2 focus:border-transparent text-slate-900 text-center text-lg font-semibold transition-colors border-green-400 focus:ring-green-400"
                      placeholder="—"
                    />
                  </div>
                ))}
                {/* Total — computed read-only */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Total Units
                  </label>
                  <div className="w-full px-3 py-2.5 rounded-lg text-center text-lg font-bold select-none border bg-green-50 border-green-300 text-green-700">
                    1600
                  </div>
                  <p className="text-xs text-slate-400 text-center mt-1">
                    (Cases×100) + Partial + Sample Units
                  </p>
                </div>
              </div>

              {/* All good indicator */}
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" weight="bold" />
                <p className="text-sm font-medium text-green-700">
                  Counts match the previous stage — 1,600 units confirmed
                </p>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end space-x-3">
            <button
              type="button"
              className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <HotButton className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Complete Check-In</span>
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
