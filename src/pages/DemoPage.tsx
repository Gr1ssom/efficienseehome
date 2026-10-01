import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DemoPlayer from '../demo/DemoPlayer'
import MyKpisScreen from '../demo/hh/screens/MyKpisScreen'
import { sidebar, workflows } from '../demo/workflows'
import type { DemoWorkflow } from '../demo/types'
import { BOOKING_URL } from '../lib/signups'
import { playMinutes } from '../demo/timing'
import ui from '../styles/ui.module.css'
import styles from './DemoPage.module.css'

type Mode = 'watch' | 'guided'

const SIGN_IN_URL = 'https://hub.efficiensee.io'

const v2Points = [
  { title: 'Rebuilt from the ground up', body: 'A faster, modern app designed around the way facilities actually move product.' },
  { title: 'Audit trail on every change', body: 'Each weight, stage move, QC decision and shipment is written to an append-only history.' },
  { title: 'Built for more than one facility', body: 'Organization-level setup with each team’s own LeafLink connection.' },
]

export default function DemoPage() {
  const [params, setParams] = useSearchParams()
  const [mode, setMode] = useState<Mode>('watch')
  const [finished, setFinished] = useState(false)
  const playerRef = useRef<HTMLElement>(null)

  const selected = workflows.find((w) => w.id === params.get('workflow'))
  const other = workflows.find((w) => w.id !== selected?.id)!

  useEffect(() => {
    // Land on the section a link asked for (e.g. /demo#kpis), otherwise at the top.
    const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const choose = (w: DemoWorkflow, m: Mode = mode) => {
    setFinished(false)
    setMode(m)
    setParams({ workflow: w.id }, { replace: true })
    // On phones, land on the player controls so the caption and app window follow directly.
    window.setTimeout(() => {
      const section = playerRef.current
      const anchor = window.innerWidth <= 640 ? section?.querySelector<HTMLElement>('[data-player-top]') : section
      anchor?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── Intro + picker ────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={ui.wrap}>
            <span className={ui.kicker}>Interactive demo · HarvestHub V1</span>
            <h1 className={`${ui.h1} ${styles.title}`}>
              Walk a batch through <span className={ui.serif}>HarvestHub</span>.
            </h1>
            <p className={`${ui.lede} ${styles.desc}`}>
              Pick a workflow. Watch it play, or click through it yourself. The forms are HarvestHub&rsquo;s own, filled
              with demo data.
            </p>

            <div className={styles.picker}>
              {workflows.map((w, i) => (
                <button
                  key={w.id}
                  className={`${styles.pickCard} ${selected?.id === w.id ? styles.pickCardActive : ''}`}
                  onClick={() => choose(w)}
                >
                  <span className={`${ui.mono} ${styles.pickNum}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.pickBody}>
                    <span className={styles.pickName}>{w.name}</span>
                    <span className={styles.pickTagline}>{w.tagline}</span>
                    <span className={styles.pickSummary}>{w.summary}</span>
                  </span>
                  <span className={styles.pickFoot}>
                    <span className={`${ui.mono} ${ui.muted}`}>{w.steps.length} steps · ~{playMinutes(w)} min</span>
                    <span className={styles.pickCta}>
                      {selected?.id === w.id ? 'Playing' : 'Start'} <ArrowRight size={15} />
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <p className={styles.signIn}>
              Already a customer? <a href={SIGN_IN_URL} target="_blank" rel="noreferrer">Sign in to HarvestHub ↗</a>
            </p>
          </div>
        </section>

        {/* ── Player ────────────────────────────────────────── */}
        {selected && (
          <section className={styles.playerSection} ref={playerRef}>
            <div className={ui.wrap}>
              <div className={styles.playerHead}>
                <span className={ui.kicker}>{selected.name} workflow · {selected.batch}</span>
                <h2 className={styles.playerTitle}>{selected.tagline}</h2>
              </div>

              {finished ? (
                <div className={styles.finish}>
                  <span className={ui.kicker}>Done</span>
                  <h3 className={ui.h2}>
                    That&rsquo;s the {selected.name.toLowerCase()} workflow, <span className={ui.serif}>start to finish</span>.
                  </h3>
                  <p className={`${ui.body} ${styles.finishDesc}`}>
                    Every hand-off you just saw was weighed and tied back to its METRC tag, with nothing re-keyed between
                    departments.
                  </p>
                  <div className={styles.finishActions}>
                    <button className={ui.btn} onClick={() => choose(other)}>
                      Now watch {other.name} <ArrowRight size={16} className={ui.arrow} />
                    </button>
                    <button className={ui.btnGhost} onClick={() => choose(selected)}>Replay</button>
                    <Link to="/early-access?src=demo" className={ui.btnGhost}>Get early access</Link>
                    <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={ui.btnGhost}>Book a meeting</a>
                  </div>
                </div>
              ) : (
                <DemoPlayer
                  key={selected.id}
                  workflow={selected}
                  sidebar={sidebar}
                  mode={mode}
                  onModeChange={setMode}
                  onFinish={() => setFinished(true)}
                />
              )}
              <p className={`${ui.mono} ${styles.disclaimer}`}>
                Demo data only: cultivars, weights, people and tags are made up. Page layouts are simplified; the forms are
                HarvestHub V1&rsquo;s own.
              </p>
            </div>
          </section>
        )}

        {/* ── Employee KPIs (live recreation of My KPIs) ────── */}
        <section id="kpis" className={styles.kpiSection}>
          <div className={`${ui.wrap} ${styles.kpi}`}>
            <div className={styles.kpiCopy}>
              <span className={ui.kicker}>Employee KPIs · My KPIs</span>
              <h2 className={ui.h2}>Everyone sees <span className={ui.serif}>their own</span> numbers.</h2>
              <p className={ui.body}>
                Each employee scans the QR code on their badge and enters their PIN. They see their own trim rate, bucking
                pace, task hours and attendance standing for the last 7 days, 30 days or this month. No account, no sign-in,
                and the page locks itself after two minutes.
              </p>
              <ul className={styles.kpiPoints}>
                <li>Rates use working time: scheduled breaks and paused time don&rsquo;t count against anyone.</li>
                <li>Managers print QR badges from the Personnel Portal, one at a time or as a full sheet.</li>
                <li>Managers see the rankings; employees see only their own page.</li>
              </ul>
            </div>
            <div className={styles.kpiPhone} aria-label="HarvestHub My KPIs screen with demo data">
              <div className={`hh-app ${styles.kpiScreen}`}>
                <MyKpisScreen />
              </div>
            </div>
          </div>
        </section>

        {/* ── V2 coming soon ────────────────────────────────── */}
        <section id="v2" className={styles.v2Section}>
          <div className={`${ui.wrap} ${styles.v2}`}>
            <div className={styles.v2Copy}>
              <span className={ui.kicker}>Coming soon</span>
              <h2 className={ui.h2}>HarvestHub V2</h2>
              <p className={ui.body}>
                The next generation of HarvestHub is in the works. Sign up and we&rsquo;ll let you know when it&rsquo;s ready.
              </p>
              <div className={styles.v2Actions}>
                <Link to="/early-access?src=demo" className={ui.btn}>
                  Get early access <ArrowRight size={16} className={ui.arrow} />
                </Link>
                <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={ui.btnGhost}>Book a meeting</a>
              </div>
            </div>
            <ul className={styles.v2List}>
              {v2Points.map((p) => (
                <li key={p.title} className={styles.v2Item}>
                  <h3 className={ui.h3}>{p.title}</h3>
                  <p className={ui.body}>{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
