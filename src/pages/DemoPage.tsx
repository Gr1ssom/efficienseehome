import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DemoPlayer from '../demo/DemoPlayer'
import { sidebar, workflows } from '../demo/workflows'
import type { DemoWorkflow } from '../demo/types'
import styles from './DemoPage.module.css'

type Mode = 'watch' | 'guided'

const SIGN_IN_URL = 'https://hub.efficiensee.io'
const CONTACT = 'mailto:hello@efficiensee.io'

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
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const choose = (w: DemoWorkflow, m: Mode = mode) => {
    setFinished(false)
    setMode(m)
    setParams({ workflow: w.id }, { replace: true })
    window.setTimeout(() => playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── Hero + picker ─────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden />
          <div className={styles.inner}>
            <div className={styles.badges}>
              <span className={styles.badgeV1}>HarvestHub V1 · Interactive demo</span>
              <a href="#v2" className={styles.badgeV2}>
                <span className={styles.badgeDot} /> V2 coming soon
              </a>
            </div>
            <h1 className={styles.title}>
              Walk a batch through <span className={styles.gradText}>HarvestHub</span>
            </h1>
            <p className={styles.desc}>
              Pick a workflow and watch it play like a video, or click through it yourself.
              Every screen is from HarvestHub V1, the version facilities run today, filled with demo data.
            </p>

            <div className={styles.picker}>
              {workflows.map((w) => (
                <button
                  key={w.id}
                  className={`${styles.pickCard} ${selected?.id === w.id ? styles.pickCardActive : ''}`}
                  onClick={() => choose(w)}
                >
                  <span className={styles.pickIcon} aria-hidden>{w.icon}</span>
                  <span className={styles.pickBody}>
                    <span className={styles.pickName}>{w.name} workflow</span>
                    <span className={styles.pickTagline}>{w.tagline}</span>
                    <span className={styles.pickSummary}>{w.summary}</span>
                    <span className={styles.pickMeta}>
                      {w.steps.length} steps · about {Math.round((w.steps.length * 9) / 60 * 2) / 2} min
                    </span>
                  </span>
                  <span className={styles.pickCta}>{selected?.id === w.id ? 'Playing ↓' : 'Start →'}</span>
                </button>
              ))}
            </div>

            <p className={styles.signIn}>
              Already a HarvestHub customer? <a href={SIGN_IN_URL} target="_blank" rel="noreferrer">Sign in to your facility →</a>
            </p>
          </div>
        </section>

        {/* ── Player ────────────────────────────────────────── */}
        {selected && (
          <section className={styles.playerSection} ref={playerRef}>
            <div className={styles.inner}>
              <div className={styles.playerHead}>
                <div>
                  <span className={styles.eyebrow}>{selected.icon} {selected.name} workflow · batch {selected.batch}</span>
                  <h2 className={styles.playerTitle}>{selected.tagline}</h2>
                </div>
              </div>

              {finished ? (
                <div className={styles.finish}>
                  <span className={styles.finishCheck}>✓</span>
                  <h3 className={styles.finishTitle}>
                    That’s the {selected.name.toLowerCase()} workflow, start to finish.
                  </h3>
                  <p className={styles.finishDesc}>
                    Every hand-off you just saw was weighed, timed and tied back to the METRC tag, with nothing re-keyed between departments.
                  </p>
                  <div className={styles.finishActions}>
                    <button className={styles.btnPrimary} onClick={() => choose(other)}>
                      {other.icon} Now watch {other.name}
                    </button>
                    <button className={styles.btnSecondary} onClick={() => choose(selected)}>
                      ↺ Replay
                    </button>
                    <a href={CONTACT} className={styles.btnSecondary}>Book a live walkthrough</a>
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
              <p className={styles.disclaimer}>
                Demo data only: cultivars, weights, people and tags are made up. Screens are simplified from HarvestHub V1.
              </p>
            </div>
          </section>
        )}

        {/* ── V2 coming soon ────────────────────────────────── */}
        <section id="v2" className={styles.v2Section}>
          <div className={styles.inner}>
            <div className={styles.v2Card}>
              <div className={styles.v2Copy}>
                <span className={styles.v2Pill}>Coming soon</span>
                <h2 className={styles.v2Title}>HarvestHub V2</h2>
                <p className={styles.v2Desc}>
                  The next generation of HarvestHub is in the works. Sign up for updates and we’ll let you
                  know when it’s ready.
                </p>
                <a href={`${CONTACT}?subject=HarvestHub%20V2%20updates`} className={styles.btnSecondary}>
                  Get V2 updates
                </a>
              </div>
              <ul className={styles.v2List}>
                {v2Points.map((p) => (
                  <li key={p.title} className={styles.v2Item}>
                    <h4>{p.title}</h4>
                    <p>{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
