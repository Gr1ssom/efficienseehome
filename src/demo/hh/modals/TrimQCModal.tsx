import { X, UploadSimple, WarningCircle, Trash, Camera, FloppyDisk, Images } from '@phosphor-icons/react'
import HotButton from '../HotButton'
import { BATCH } from '../demoData'

/** HarvestHub: src/components/TrimQCModal.tsx — "Trim QC" */

const MICROBIAL_SYMBOLS = [
  { key: 'triangle', label: '△' },
  { key: 'circle', label: '●' },
  { key: 'square', label: '□' },
  { key: 'filled_square', label: '■' },
  { key: 'mixup', label: 'Mix-Up' },
  { key: 'seeded', label: 'Seeded' },
]

const BUD_GRADES = [
  { label: 'AAA Bud *', key: 'aaa', weight: '13940', totes: '4', quality: 'A', accentColor: 'border-emerald-500' },
  { label: 'A Bud *', key: 'a', weight: '5610', totes: '2', quality: 'A', accentColor: 'border-blue-500' },
  { label: 'B Bud *', key: 'b', weight: '8060', totes: '3', quality: 'B', accentColor: 'border-amber-500' },
]

const PR_GRADES = [
  { label: 'AAA', key: 'prAaaGrams', max: 13940, color: 'border-emerald-500' },
  { label: 'A', key: 'prAGrams', max: 5610, color: 'border-blue-500' },
  { label: 'B', key: 'prBGrams', max: 8060, color: 'border-amber-500' },
]

// Real UI: renderPhotoSection(...) with an uploaded photo (green "Uploaded" + preview image).
const PHOTOS = ['Batch Photo', 'Average Nug Photo']

export default function TrimQCModal() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-xl sm:mx-4 rounded-t-2xl flex flex-col max-h-full">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 flex-shrink-0">
          <div>
            <h3 className="text-base font-bold text-gray-800">Trim QC</h3>
            <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[240px]">{BATCH}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-gray-400 active:bg-gray-100 touch-manipulation">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real UI: <form>; a div here so the demo button never submits the page. */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="overflow-y-auto flex-1 px-4 py-4 space-y-5">

            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5">
              <p className="text-sm text-gray-600">
                QC Performed By: <span className="font-semibold text-gray-800">qc.lead</span>
              </p>
            </div>

            {/* Microbial Check */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Microbial Check *</label>
              <button
                type="button"
                className="w-full py-3.5 px-4 rounded-lg font-semibold transition-all touch-manipulation bg-green-600 text-white"
              >
                Microbials Checked
              </button>

              <div className="space-y-3 mt-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Mark any issues found:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {MICROBIAL_SYMBOLS.map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        className="px-3 py-2 rounded-lg font-bold text-sm transition-all touch-manipulation border bg-white text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-600"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Microbial Notes (if any)
                  </label>
                  <textarea
                    defaultValue=""
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    rows={2}
                    placeholder="Describe any microbials found..."
                  />
                </div>
              </div>
            </div>

            {/* Batch Photo + Nug Photo */}
            {PHOTOS.map((label) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 border-2 border-dashed rounded-lg transition-colors touch-manipulation text-sm font-medium border-gray-300 text-gray-600 active:border-blue-400 active:bg-blue-50"
                  >
                    <Camera className="w-4 h-4 flex-shrink-0" />
                    <span>Camera</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 border-2 border-dashed rounded-lg transition-colors touch-manipulation text-sm font-medium border-green-400 bg-green-50 text-green-700"
                  >
                    <UploadSimple className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">Uploaded</span>
                  </button>
                </div>
                {/* Photo preview placeholder (real UI: <img className="mt-2 w-full h-32 object-cover rounded-lg border border-slate-200" />) */}
                <div
                  role="img"
                  aria-label={label}
                  className="mt-2 w-full h-32 object-cover rounded-lg border border-slate-200 bg-gray-100 flex items-center justify-center text-gray-400"
                >
                  <Camera className="w-8 h-8" />
                </div>
              </div>
            ))}

            {/* Physical Appearance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Physical Appearance</label>
              <textarea
                defaultValue=""
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                rows={3}
                placeholder="Describe physical appearance..."
              />
            </div>

            {/* Misc Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                <Images className="w-4 h-4 text-gray-500" />
                Additional Photos
                <span className="text-xs font-normal text-gray-400">(optional — for discussion or notation)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 border-2 border-dashed rounded-lg transition-colors touch-manipulation text-sm font-medium border-gray-300 text-gray-600 active:border-blue-400 active:bg-blue-50"
                >
                  <Camera className="w-4 h-4 flex-shrink-0" />
                  <span>Camera</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 border-2 border-dashed rounded-lg transition-colors touch-manipulation text-sm font-medium border-gray-300 text-gray-600 active:border-blue-400 active:bg-blue-50"
                >
                  <UploadSimple className="w-4 h-4 flex-shrink-0" />
                  <span>From Files</span>
                </button>
              </div>
            </div>

            {/* Moisture & Water Activity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Moisture % *</label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue="11.0"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Water Activity *</label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  defaultValue="0.600"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  placeholder="0.650"
                />
                <p className="text-xs text-gray-400 mt-1">0-1 decimal (e.g., 0.650)</p>
              </div>
            </div>

            {/* Bud Weight, Quality & Totes */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-2">
                <WarningCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <h4 className="text-sm font-semibold text-gray-800">Bud Weight, Quality & Totes</h4>
              </div>

              {BUD_GRADES.map((bg) => (
                <div key={bg.key} className={`border-l-4 ${bg.accentColor} pl-3 space-y-2`}>
                  <label className="block text-xs font-semibold text-gray-700">{bg.label}</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-0.5">Weight (g)</label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={bg.weight}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      />
                    </div>
                    <div className="w-16">
                      <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-0.5">Totes</label>
                      <input
                        type="number"
                        min="0"
                        defaultValue={bg.totes}
                        className="w-full px-2 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-center"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-0.5">Grade</label>
                      <div className="flex gap-1">
                        {['A', 'B', 'C'].map((grade) => (
                          <button
                            key={grade}
                            type="button"
                            className={`w-10 h-10 text-sm font-bold rounded-lg transition-all touch-manipulation ${
                              bg.quality === grade
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 active:bg-gray-300'
                            }`}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Waste Weight */}
              <div className="border-l-4 border-red-400 pl-3 pt-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Trash className="w-3.5 h-3.5 text-red-500" />
                    Wasted Weight (g) *
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue="38"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base"
                  placeholder="0"
                />
                <p className="text-xs text-gray-400 mt-1">Enter weight of product that must be discarded</p>
              </div>

              {/* Sifted During QC */}
              <div className="border-l-4 border-emerald-400 pl-3 pt-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Sifted During QC (g) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue="22"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base"
                  placeholder="0"
                />
                <p className="text-xs text-gray-400 mt-1">Weight of trim material sifted during QC</p>
              </div>

              {/* Trim from Other Stages (manual input with estimate) */}
              <div className="border-l-4 border-teal-400 pl-3 pt-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Trim from Other Stages (g)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue=""
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base"
                  placeholder="0"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {/* estimate = sorting trim 1,980g + trim-stage trim across 14 bags (~168g each) */}
                  Combined trim from sorting + trim stages (estimate: 4,332g)
                </p>
              </div>

              {/* Send Bud to Pre-Roll (optional) */}
              <div className="border-l-4 border-orange-400 pl-3 pt-2 space-y-2">
                <label className="block text-xs font-semibold text-gray-700">
                  Send Bud to Pre-Roll <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <p className="text-[10px] text-gray-500">Enter grams per grade to route to Collecting for PR. Leave blank to skip.</p>
                <div className="grid grid-cols-3 gap-3">
                  {PR_GRADES.map(({ label, key, max, color }) => (
                    <div key={key} className={`border-l-4 ${color} pl-2`}>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">
                        {label} <span className="text-gray-400">({max.toLocaleString()}g avail)</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max={max}
                        defaultValue=""
                        className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Footer actions */}
          <div className="flex gap-2 px-4 py-4 border-t border-gray-200 flex-shrink-0">
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg font-medium text-sm border touch-manipulation transition-all bg-gray-50 border-gray-300 text-gray-600 active:bg-gray-100"
            >
              <FloppyDisk className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium touch-manipulation"
            >
              Cancel
            </button>
            <HotButton className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors touch-manipulation">
              Complete QC
            </HotButton>
          </div>
        </div>
      </div>
    </div>
  )
}
