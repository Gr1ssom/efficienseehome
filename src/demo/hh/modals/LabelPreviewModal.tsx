import { X, Check } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { LICENSE, STRAIN, TAG_TEST } from '../demoData'

const LABEL_CHECKS = [
  { key: 'strainName', label: 'Strain/flavor name is correct' },
  { key: 'testTag', label: 'Test tag matches batch' },
  { key: 'sourceTag', label: 'Source tag is correct' },
  { key: 'productWeight', label: 'Product weight is correct' },
  { key: 'cannabinoids', label: 'Cannabinoid values are accurate' },
  { key: 'expirationDate', label: 'Expiration date is correct' },
  { key: 'approvalNumber', label: 'Approval number is correct' },
]

/* The real preview draws 40 random-width bars; a fixed pattern keeps the demo stable. */
const BARS = Array.from({ length: 40 }, (_, i) => ((i * 7 + 3) % 5 > 1 ? '2px' : '1px'))

/** HarvestHub: src/components/LabelPreview.tsx — "Label Preview" */
export default function LabelPreviewModal() {
  return (
    <div
      className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-labelledby="preview-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-4xl max-h-full overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h3 id="preview-title" className="text-lg font-bold">Label Preview</h3>
          <button className="text-gray-400 hover:text-gray-500 transition-colors" aria-label="Close preview">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="border-2 border-black bg-white mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>

            {/* Section 1: Active and Other Ingredients */}
            <div className="border-b-2 border-black p-3">
              <h4 className="font-bold text-center text-lg mb-2">
                Active and Other Ingredients
              </h4>
              <p className="text-center italic text-sm">
                Marijuana Flower
              </p>
            </div>

            {/* Section 2: Marijuana Product Information */}
            <div className="border-b-2 border-black p-3">
              <h4 className="font-bold text-center text-lg mb-3">
                Marijuana Product Information
              </h4>

              <div className="grid grid-cols-2 gap-x-6 text-sm">
                <div className="space-y-1">
                  <p><span className="font-medium">Servings/Doses Per Package:</span> 7</p>
                  <p><span className="font-medium">Best If Used By:</span> 10/10/2027</p>
                  <p><span className="font-medium">Produced By:</span> {LICENSE}</p>
                </div>

                <div className="space-y-1">
                  <p><span className="font-medium">Tested By:</span> TES000011</p>
                  <p><span className="font-medium">Test Tag:</span> {TAG_TEST}</p>
                  <p><span className="font-medium">Product Weight:</span> 3.5g</p>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <div className="border border-black p-3 bg-white">
                  <div className="flex space-x-px">
                    {BARS.map((width, i) => (
                      <div key={i} className="bg-black" style={{ width, height: '40px' }} />
                    ))}
                  </div>
                  <p className="font-mono text-xs text-center mt-1">{TAG_TEST}</p>
                </div>
              </div>
            </div>

            {/* Section 3: Cannabinoid Profile */}
            <div className="border-b-2 border-black p-3">
              <h4 className="font-bold text-center text-lg mb-3">Cannabinoid Profile</h4>

              <div className="grid grid-cols-2 gap-x-6 text-sm">
                <div className="space-y-1">
                  <p>Δ9-THC: 4.80 mg/serving-dose</p>
                  <p>THCA: 0.00 mg/serving-dose</p>
                  <p>CBD: 0.00 mg/serving-dose</p>
                  <p>CBDA: 0.00 mg/serving-dose</p>
                  <p className="font-bold">Total THC: 139.000 mg/serving-dose</p>
                </div>

                <div className="space-y-1">
                  <p>CBN: 0.00 mg/serving-dose</p>
                  <p>THCV: 0.00 mg/serving-dose</p>
                  <p>CBDV: 0.00 mg/serving-dose</p>
                  <p>Δ8-THC: 0.00 mg/serving-dose</p>
                  <p className="font-bold">Total CBD: 0.00 mg/serving-dose</p>
                </div>
              </div>
            </div>

            {/* Section 4: Terpene Profile */}
            <div className="border-b-2 border-black p-3">
              <h4 className="font-bold text-center text-lg mb-2">Terpene Profile</h4>
              <p className="text-sm italic text-center leading-relaxed">
                Total Terpenes: 2.41%
              </p>
            </div>

            {/* Section 5: Instructions and Length of Effect */}
            <div className="border-b-2 border-black p-3">
              <h4 className="font-bold text-lg mb-2">Instructions and Length of Effect</h4>
              <p className="text-sm italic">Heat 0.5g of flower to 392F and inhale smoke or vapor. Effects typically last 1-4 hours.</p>
            </div>

            {/* Section 6: Marijuana Approval Number */}
            <div className="border-b-2 border-black p-3">
              <p className="text-sm">
                <span className="font-bold">Marijuana Approval Number:</span> [A-2210]
              </p>
            </div>

            {/* Section 7: Strain/Flavor */}
            <div className="border-b-2 border-black p-3">
              <h4 className="font-bold text-xl text-center">
                Strain/Flavor: {STRAIN}
              </h4>
            </div>

            {/* Section 8: Warning */}
            <div className="p-3">
              <p className="text-sm">
                <span className="font-bold">Warning:</span> Cognitive and physical
                impairment may result from the use of marijuana. Keep out of reach of children.
              </p>
            </div>
          </div>

          {/* Information Panel */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Expiration Date Information</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><span className="font-medium">Test Date:</span> 10/10/2026</p>
              <p><span className="font-medium">Expiration Date:</span> 10/10/2027 (1 year from test date)</p>
            </div>
          </div>
        </div>

        <div className="border-t sticky bottom-0 bg-white z-10">
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-800">Label Verification Checklist</p>
              <div className="flex gap-2">
                <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                  Check All
                </button>
                <span className="text-gray-300">|</span>
                <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                  Clear All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {LABEL_CHECKS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  className="flex items-center gap-2 p-2.5 rounded-lg border-2 transition-all text-left border-emerald-500 bg-emerald-50 text-emerald-800"
                >
                  <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 bg-emerald-500 text-white">
                    <Check className="w-3 h-3" weight="bold" />
                  </div>
                  <span className="text-xs font-medium leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 p-4 pt-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <HotButton className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
              Confirm & Export
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
