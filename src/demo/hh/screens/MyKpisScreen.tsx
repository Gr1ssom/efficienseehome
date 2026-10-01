import type { ReactNode } from 'react'
import { Scissors, Plant, ListChecks, CalendarCheck, CheckCircle, QrCode, Clock } from '@phosphor-icons/react'

/*
 * HarvestHub: src/components/MyKpis.tsx — the "My KPIs" page an employee opens by
 * scanning the QR on their badge and entering their own PIN. Static recreation with
 * made-up numbers for one trimmer; labels and layout follow the real page.
 */

function Tile({ label, value, sub, tone = 'default' }: { label: string; value: string; sub?: string; tone?: 'default' | 'good' }) {
  const toneClass = tone === 'good' ? 'text-emerald-600' : 'text-gray-900'
  return (
    <div className="min-w-0 rounded-xl bg-gray-50 border border-gray-200 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 truncate">{label}</p>
      <p className={`mt-1 text-3xl font-bold leading-tight tabular-nums truncate ${toneClass}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-500 truncate">{sub}</p>}
    </div>
  )
}

function Section({ icon, title, note, children }: { icon: ReactNode; title: string; note?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white border border-gray-200 p-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
        {icon}
        <span className="min-w-0 truncate">{title}</span>
        {note && <span className="ml-auto flex-shrink-0 text-xs font-medium normal-case tracking-normal text-gray-400">{note}</span>}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

const periods = ['Last 7 days', 'Last 30 days', 'This month']
const topTasks = [
  { task: 'Defoliation — Flower Bay 3', hours: '2.0', sessions: 2 },
  { task: 'Dry room checklist', hours: '1.5', sessions: 3 },
  { task: 'Trim room cleanup', hours: '1.0', sessions: 1 },
]

export default function MyKpisScreen() {
  const periodLabel = periods[0]
  return (
    <div className="min-h-full bg-gray-50 text-gray-900 overflow-x-hidden">
      <div className="mx-auto w-full max-w-md px-4 py-6">
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">My KPIs</p>
            <h1 className="text-2xl font-bold leading-tight break-words">Lena Park</h1>
          </div>
          <button type="button" className="flex-shrink-0 flex items-center gap-1.5 h-11 px-4 rounded-xl bg-gray-900 text-white font-semibold">
            <CheckCircle className="w-5 h-5" weight="duotone" />
            Done
          </button>
        </header>

        <div className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-gray-200 p-1" role="tablist">
          {periods.map((p, i) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={i === 0}
              className={`h-10 rounded-lg text-sm font-semibold ${i === 0 ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-4">
          <Section icon={<Scissors className="w-4 h-4 text-emerald-600" weight="duotone" />} title="Trim" note={periodLabel}>
            <div className="grid grid-cols-2 gap-2.5">
              <Tile label="lb/hr" value="1.42" sub="18.5 hrs trimmed" tone="good" />
              <Tile label="lb/hr all time" value="1.36" sub="Last 30 days: 1.39" />
              <Tile label="Bags" value="11" sub="214 all time" />
              <Tile label="Waste" value="1.8%" sub="Avg 2.1% all time" />
            </div>
          </Section>

          <Section icon={<Plant className="w-4 h-4 text-amber-600" weight="duotone" />} title="Bucking" note={periodLabel}>
            <div className="grid grid-cols-2 gap-2.5">
              <Tile label="Plants" value="64" sub="3 sessions" />
              <Tile label="Plants/hr" value="11.6" sub="5.5 hrs worked" tone="good" />
              <Tile label="Plants/hr all time" value="10.9" sub="2,140 plants total" />
              <Tile label="Sessions all time" value="96" sub="196.3 hrs total" />
            </div>
          </Section>

          <Section icon={<ListChecks className="w-4 h-4 text-blue-600" weight="duotone" />} title="Tasks" note={periodLabel}>
            <div className="grid grid-cols-2 gap-2.5">
              <Tile label="Sessions" value="6" />
              <Tile label="Hours" value="4.5" tone="good" />
            </div>
            <ul className="mt-3 divide-y divide-gray-100">
              {topTasks.map((t) => (
                <li key={t.task} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <span className="min-w-0 truncate text-gray-700">{t.task}</span>
                  <span className="flex-shrink-0 tabular-nums text-gray-500">{t.hours} h · {t.sessions}×</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={<CalendarCheck className="w-4 h-4 text-teal-600" weight="duotone" />} title="Attendance">
            <div className="grid grid-cols-2 gap-2.5">
              <Tile label="Current points" value="0.00" tone="good" />
              <Tile label="Clean periods" value="3/4" />
            </div>
            <div className="mt-2.5 rounded-xl px-3 py-2.5 text-sm font-medium bg-emerald-50 text-emerald-700">Good Standing</div>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-500">Occurrences · {periodLabel}: 0</p>
          </Section>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 text-center">
          <button type="button" className="w-full h-12 rounded-xl bg-gray-100 font-semibold flex items-center justify-center gap-2">
            <QrCode className="w-5 h-5" weight="duotone" /> Show my QR code
          </button>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <Clock className="w-3.5 h-3.5" weight="duotone" />
          Locks after 2 minutes without a touch
        </p>
      </div>
    </div>
  )
}
