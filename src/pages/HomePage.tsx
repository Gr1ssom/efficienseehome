import { Link } from 'react-router-dom'
import type { ComponentType } from 'react'
import {
  ArrowRight,
  Plant,
  Scissors,
  Flower,
  Flask,
  Cylinder,
  TestTube,
  Truck,
  UsersThree,
  type IconProps,
} from '@phosphor-icons/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BOOKING_URL } from '../lib/signups'
import ui from '../styles/ui.module.css'
import styles from './HomePage.module.css'
import metrcImport from '../assets/screens/metrc-import.jpg'
import trimWeigh from '../assets/screens/trim-weigh.jpg'
import testResults from '../assets/screens/test-results.jpg'
import allocate from '../assets/screens/allocate.jpg'
import facility from '../assets/Aug_22_2025_E.jpg'

const capabilities = ['METRC sync (read-only)', 'LeafLink inventory', 'USB scale capture', 'Growlink & SensorPush sensors', 'PIN sign-in on shared terminals']

const stages = [
  { n: '01', name: 'Import', line: 'Start the batch from the METRC harvest: plant count and wet weight included.' },
  { n: '02', name: 'Dry & buck', line: 'Moisture and water activity logged before a crew starts bucking.' },
  { n: '03', name: 'Sort & cure', line: 'AAA, A and B weighed with tote counts, then a timed burp checklist.' },
  { n: '04', name: 'Trim & QC', line: 'Bags handed out and weighed back by grade, then photos and microbials.' },
  { n: '05', name: 'Test', line: 'Testing batches tagged and sent; results pulled from METRC.' },
  { n: '06', name: 'Allocate & pack', line: 'Split tested flower into product lines and print verified labels.' },
  { n: '07', name: 'Check in', line: 'Unit counts confirmed against packaging before inventory is released.' },
]

const features = [
  {
    kicker: 'Weights',
    title: 'Every hand-off is weighed.',
    body: 'Bucking, sorting, trim bags and QC each record weight by grade, against what the last step recorded. Loss shows up per batch and per person, not at month end.',
    img: trimWeigh,
    alt: 'HarvestHub Weigh Trimmed Bag screen',
  },
  {
    kicker: 'Testing',
    title: 'Lab results come from METRC.',
    body: 'Potency, terpenes and the COA are pulled by source tag and reviewed before a batch can be allocated. The Label Creator checks them again before a single label prints.',
    img: testResults,
    alt: 'HarvestHub Test Results screen searching METRC',
  },
  {
    kicker: 'Allocation',
    title: 'Pack what is actually selling.',
    body: 'Tested flower is split into product lines by grade, with live LeafLink inventory beside it, and drops straight into the packaging and label queues.',
    img: allocate,
    alt: 'HarvestHub Allocation Station screen',
  },
]

const departments: { icon: ComponentType<IconProps>; name: string; line: string }[] = [
  { icon: Plant, name: 'Cultivation', line: 'Crop control, propagation, veg and flower rooms, genetics.' },
  { icon: Scissors, name: 'Harvest', line: 'Live harvest weights and the harvested queue.' },
  { icon: Flower, name: 'Post-harvest flower', line: 'Dry rooms through packaging, one batch at a time.' },
  { icon: Flask, name: 'Hash lab', line: 'Fresh frozen, washing, pressing, rosin and jarring.' },
  { icon: Cylinder, name: 'Pre-roll', line: 'Allocation, grind, machine runs, sort/fix/pack, labeling.' },
  { icon: TestTube, name: 'Testing', line: 'Testing batches, lab hand-off and METRC results.' },
  { icon: Truck, name: 'Fulfillment', line: 'Check-in, LeafLink orders and inventory release.' },
  { icon: UsersThree, name: 'People & tasks', line: 'Attendance, task tracking and daily messages.' },
]

const integrations = [
  { name: 'METRC', what: 'Harvests, plants, packages and lab results', note: 'read-only' },
  { name: 'LeafLink', what: 'Wholesale inventory and orders', note: 'read-only' },
  { name: 'Ohaus scales', what: 'USB weight capture with stable readings', note: 'web serial' },
  { name: 'Growlink', what: 'Room controllers and sensor readings', note: 'live' },
  { name: 'SensorPush', what: 'Temperature and humidity monitoring', note: 'live' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={ui.wrap}>
            <span className={ui.kicker}>HarvestHub · for licensed cultivation &amp; manufacturing</span>
            <h1 className={`${ui.h1} ${styles.heroTitle}`}>
              Every gram <span className={ui.serif}>accounted for</span>, from METRC harvest to finished package.
            </h1>
            <div className={styles.heroRow}>
              <p className={ui.lede}>
                HarvestHub runs the floor of a cannabis facility: dry rooms, bucking, sorting, trim, testing, packaging and
                fulfillment. Batches start from the METRC harvest, and every hand-off is weighed.
              </p>
              <div className={styles.heroActions}>
                <Link to="/demo" className={ui.btn}>
                  Watch the demo <ArrowRight size={16} className={ui.arrow} />
                </Link>
                <Link to="/early-access" className={ui.btnGhost}>Get early access</Link>
              </div>
            </div>

            <figure className={styles.heroShot}>
              <img src={metrcImport} alt="HarvestHub creating a post-harvest batch from a METRC harvest" className={ui.screen} />
              <figcaption className={`${ui.mono} ${ui.muted}`}>
                Dry Rooms → Import from METRC. Plant count and wet weight come in with the harvest.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Capabilities line ────────────────────────────── */}
        <div className={styles.capLine}>
          <div className={`${ui.wrap} ${styles.capInner}`}>
            {capabilities.map((c) => <span key={c} className={ui.mono}>{c}</span>)}
          </div>
        </div>

        {/* ── How a batch moves ────────────────────────────── */}
        <section className={styles.section}>
          <div className={ui.wrap}>
            <div className={styles.sectionHead}>
              <span className={ui.kicker}>How a batch moves</span>
              <h2 className={ui.h2}>One batch, seven hand-offs, <span className={ui.serif}>no re-keying</span>.</h2>
            </div>
            <ol className={styles.stages}>
              {stages.map((s) => (
                <li key={s.n} className={styles.stage}>
                  <span className={`${ui.mono} ${styles.stageNum}`}>{s.n}</span>
                  <h3 className={styles.stageName}>{s.name}</h3>
                  <p className={styles.stageLine}>{s.line}</p>
                </li>
              ))}
            </ol>
            <Link to="/demo" className={`${ui.btnLink} ${styles.stagesLink}`}>
              Walk a batch through it in the demo <ArrowRight size={16} className={ui.arrow} />
            </Link>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={`${ui.wrap} ${styles.features}`}>
            {features.map((f, i) => (
              <article key={f.title} className={`${styles.feature} ${i % 2 ? styles.featureFlip : ''}`}>
                <div className={styles.featureCopy}>
                  <span className={ui.kicker}>{f.kicker}</span>
                  <h3 className={`${ui.h2} ${styles.featureTitle}`}>{f.title}</h3>
                  <p className={ui.body}>{f.body}</p>
                </div>
                <img src={f.img} alt={f.alt} className={ui.screen} loading="lazy" />
              </article>
            ))}
          </div>
        </section>

        {/* ── Departments ──────────────────────────────────── */}
        <section className={`${styles.section} ${styles.band}`}>
          <div className={ui.wrap}>
            <div className={styles.sectionHead}>
              <span className={ui.kicker}>Coverage</span>
              <h2 className={ui.h2}>Every department on the same batch record.</h2>
            </div>
            <ul className={styles.depts}>
              {departments.map((d) => (
                <li key={d.name} className={styles.dept}>
                  <d.icon size={22} weight="regular" className={styles.deptIcon} />
                  <h3 className={styles.deptName}>{d.name}</h3>
                  <p className={styles.deptLine}>{d.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Integrations ─────────────────────────────────── */}
        <section className={styles.section}>
          <div className={`${ui.wrap} ${styles.split}`}>
            <div>
              <span className={ui.kicker}>Integrations</span>
              <h2 className={ui.h2}>Connected to what the floor already uses.</h2>
              <p className={`${ui.body} ${styles.splitBody}`}>
                METRC stays the system of record. HarvestHub reads from it and never writes back, so nothing is filed
                without a person doing it in METRC.
              </p>
            </div>
            <dl className={styles.integrations}>
              {integrations.map((x) => (
                <div key={x.name} className={styles.integration}>
                  <dt>{x.name}</dt>
                  <dd>{x.what}</dd>
                  <dd className={ui.mono}>{x.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Built on the floor ───────────────────────────── */}
        <section className={styles.section}>
          <div className={`${ui.wrap} ${styles.floor}`}>
            <img src={facility} alt="The cultivation facility where HarvestHub is used" className={styles.floorImg} loading="lazy" />
            <div className={styles.floorCopy}>
              <span className={ui.kicker}>Built on the floor</span>
              <p className={styles.quote}>
                HarvestHub was built inside a working cultivation and manufacturing facility, and it runs there every day.
                The forms in the demo are the ones the crew <span className={ui.serif}>fills in every shift</span>.
              </p>
            </div>
          </div>
        </section>

        {/* ── V2 / CTA ─────────────────────────────────────── */}
        <section className={styles.cta}>
          <div className={`${ui.wrap} ${styles.ctaInner}`}>
            <div>
              <span className={ui.kicker}>HarvestHub V2 · coming soon</span>
              <h2 className={ui.h2}>See it with your own batches.</h2>
              <p className={`${ui.body} ${styles.ctaBody}`}>
                Get early access to V2, or book a call and we will walk through your workflow with you.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link to="/early-access" className={ui.btn}>
                Get early access <ArrowRight size={16} className={ui.arrow} />
              </Link>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={ui.btnGhost}>Book a meeting</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
