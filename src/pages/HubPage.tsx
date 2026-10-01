import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { products } from '../data/products'
import ui from '../styles/ui.module.css'
import styles from './HubPage.module.css'
import dryRooms from '../assets/screens/dry-rooms.jpg'
import labelCreator from '../assets/screens/label-creator.jpg'
import bucking from '../assets/screens/bucking.jpg'
import sorting from '../assets/screens/sorting-complete.jpg'
import trimQc from '../assets/screens/trim-qc.jpg'
import fulfillment from '../assets/screens/fulfillment.jpg'

const hub = products.find((p) => p.id === 'hub')!

const labelPoints = [
  'Pulls potency and terpene results from METRC by source package tag',
  'Shows them beside the results stored in Testing and flags any mismatch',
  'Calculates per-serving dose for each product size',
  'Exports Bartender-ready label files, with a proofing mode',
]

const access = [
  { title: 'PIN sign-in', body: 'Username and PIN on shared terminals, with a 30-minute idle timeout. Quick to switch between people on one tablet.' },
  { title: 'Access by department', body: 'Permissions at three levels — department, module and workflow stage — so a trimmer sees trim, not allocation.' },
  { title: 'Kiosk terminals', body: 'Full-screen terminals for bucking, pre-roll sorting/fixing/packaging and packaging, with large touch targets for tablets.' },
]

const gallery = [
  { img: bucking, caption: 'Bucking — start a session with the crew' },
  { img: sorting, caption: 'Sorting — weights and totes by grade' },
  { img: trimQc, caption: 'Trim QC — microbials, photos, readings' },
  { img: fulfillment, caption: 'Fulfillment — check-in before release' },
]

export default function HubPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={`${ui.wrap} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={ui.kicker}>Product</span>
              <h1 className={`${ui.h1} ${styles.heroTitle}`}>HarvestHub</h1>
              <p className={ui.lede}>
                Facility software for licensed cannabis cultivation and manufacturing. It follows each batch from the METRC
                harvest through drying, trim, testing and packaging to fulfillment, with weights recorded at every hand-off.
              </p>
              <div className={styles.heroActions}>
                <Link to="/demo" className={ui.btn}>
                  Watch the demo <ArrowRight size={16} className={ui.arrow} />
                </Link>
                <Link to="/early-access" className={ui.btnGhost}>Get early access</Link>
              </div>
            </div>
            <img src={dryRooms} alt="HarvestHub Dry Rooms with a batch ready to buck" className={ui.screen} />
          </div>
        </section>

        {/* ── Modules ──────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={ui.wrap}>
            <div className={styles.sectionHead}>
              <span className={ui.kicker}>Modules</span>
              <h2 className={ui.h2}>A screen for every station.</h2>
            </div>
            <div className={styles.modules}>
              {hub.modules!.map((m) => (
                <div key={m.name} className={styles.module}>
                  <h3 className={styles.moduleName}>{m.name}</h3>
                  <ul className={styles.moduleList}>
                    {m.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Label Creator ────────────────────────────────── */}
        <section className={`${styles.section} ${styles.band}`}>
          <div className={`${ui.wrap} ${styles.feature}`}>
            <div className={styles.featureCopy}>
              <span className={ui.kicker}>Label Creator</span>
              <h2 className={ui.h2}>Labels that match the lab, <span className={ui.serif}>every time</span>.</h2>
              <ul className={styles.points}>
                {labelPoints.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <img src={labelCreator} alt="HarvestHub Label Creator retrieving test results from METRC" className={ui.screen} loading="lazy" />
          </div>
        </section>

        {/* ── Built for the floor ──────────────────────────── */}
        <section className={styles.section}>
          <div className={ui.wrap}>
            <div className={styles.sectionHead}>
              <span className={ui.kicker}>Built for the floor</span>
              <h2 className={ui.h2}>Fast on a shared tablet. Locked down where it matters.</h2>
            </div>
            <div className={styles.access}>
              {access.map((a) => (
                <div key={a.title} className={styles.accessItem}>
                  <h3 className={ui.h3}>{a.title}</h3>
                  <p className={ui.body}>{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery ──────────────────────────────────────── */}
        <section className={`${styles.section} ${styles.galleryWrap}`}>
          <div className={ui.wrap}>
            <div className={styles.gallery}>
              {gallery.map((g) => (
                <figure key={g.caption} className={styles.shot}>
                  <img src={g.img} alt={g.caption} className={ui.screen} loading="lazy" />
                  <figcaption className={`${ui.mono} ${ui.muted}`}>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className={styles.cta}>
          <div className={`${ui.wrap} ${styles.ctaInner}`}>
            <h2 className={ui.h2}>Walk a batch through it yourself.</h2>
            <div className={styles.heroActions}>
              <Link to="/demo" className={ui.btn}>
                Open the demo <ArrowRight size={16} className={ui.arrow} />
              </Link>
              <Link to="/early-access" className={ui.btnGhost}>Get early access</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
