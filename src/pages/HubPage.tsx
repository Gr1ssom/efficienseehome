import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { products } from '../data/products'
import hubLogo from '../assets/Efficiensee.png'
import styles from './HubPage.module.css'

const hub = products.find((p) => p.id === 'hub')!

const moduleIcons: Record<string, string> = {
  'Cultivation': '🌱',
  'Harvest': '✂️',
  'Post-Harvest — Flower': '🌸',
  'Hash Lab': '🧪',
  'Pre-Roll Operations': '🚬',
  'Personnel & Operations': '👥',
  'Analytics & Reporting': '📊',
}

const techStack = [
  { layer: 'Framework', tech: 'React 18 + TypeScript' },
  { layer: 'Build', tech: 'Vite 7' },
  { layer: 'Styling', tech: 'Tailwind CSS 3' },
  { layer: 'Charts', tech: 'Recharts' },
  { layer: 'PDF', tech: 'jsPDF + pdfjs-dist' },
  { layer: 'Database', tech: 'Supabase (PostgreSQL)' },
  { layer: 'Auth', tech: 'Custom PIN sessions' },
  { layer: 'Edge Functions', tech: 'Supabase / Deno' },
]

export default function HubPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.heroPill}>Cannabis Cultivation Platform</div>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroGreen}>Harvest</span>
                <span className={styles.heroAmber}>Hub</span>
              </h1>
              <p className={styles.heroTagline}>{hub.tagline}</p>
              <p className={styles.heroDesc}>{hub.description}</p>
              <div className={styles.heroCtas}>
                <Link to={hub.demoPath} className={styles.ctaLaunch}>
                  Open HarvestHub →
                </Link>
                <a href="#modules" className={styles.ctaGhost}>
                  Explore Modules
                </a>
              </div>
            </div>
            <div className={styles.heroLogoWrap}>
              <img src={hubLogo} alt="HarvestHub" className={styles.heroLogo} />
            </div>
          </div>
          <div className={`${styles.orb} ${styles.orbGreen}`} />
          <div className={`${styles.orb} ${styles.orbAmber}`} />
        </section>

        {/* ── Stats ───────────────────────────────────────────── */}
        <div className={styles.statsBar}>
          <div className={styles.statsInner}>
            {[
              { value: '249+', label: 'Database Tables' },
              { value: '300+', label: 'UI Components' },
              { value: '7', label: 'Core Modules' },
              { value: '5', label: 'Live Integrations' },
            ].map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Key Capabilities ────────────────────────────────── */}
        <section className={styles.capSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Capabilities</span>
              <h2 className={styles.sectionTitle}>Enterprise power. Operator simplicity.</h2>
              <p className={styles.sectionSub}>
                HarvestHub coordinates every team, every workflow, and every compliance obligation in one platform.
              </p>
            </div>
            <div className={styles.capGrid}>
              {hub.features.map((f) => (
                <div key={f.title} className={styles.capCard}>
                  <h3 className={styles.capTitle}>{f.title}</h3>
                  <p className={styles.capBody}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Modules ─────────────────────────────────────────── */}
        <section id="modules" className={styles.modulesSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Platform Modules</span>
              <h2 className={styles.sectionTitle}>Every department. One platform.</h2>
              <p className={styles.sectionSub}>
                From the propagation room to the distribution dock, HarvestHub has a dedicated module for every stage of your operation.
              </p>
            </div>
            <div className={styles.moduleGrid}>
              {hub.modules!.map((mod) => (
                <div key={mod.name} className={styles.moduleCard}>
                  <div className={styles.moduleHeader}>
                    <span className={styles.moduleIcon}>{moduleIcons[mod.name] ?? '📋'}</span>
                    <h3 className={styles.moduleName}>{mod.name}</h3>
                  </div>
                  <ul className={styles.moduleList}>
                    {mod.items.map((item) => (
                      <li key={item} className={styles.moduleItem}>
                        <span className={styles.moduleDot} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Integrations ────────────────────────────────────── */}
        <section className={styles.intSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Integrations</span>
              <h2 className={styles.sectionTitle}>Connected to your ecosystem</h2>
              <p className={styles.sectionSub}>
                HarvestHub speaks natively to the tools your facility already depends on.
              </p>
            </div>
            <div className={styles.intGrid}>
              {hub.integrations!.map((int) => (
                <div key={int.name} className={styles.intCard}>
                  <div className={styles.intIcon}>{int.icon}</div>
                  <div>
                    <h4 className={styles.intName}>{int.name}</h4>
                    <p className={styles.intDesc}>{int.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Label Creator callout ────────────────────────────── */}
        <section className={styles.labelSection}>
          <div className={styles.labelInner}>
            <div className={styles.labelCopy}>
              <span className={styles.eyebrow}>Featured Tool</span>
              <h2 className={styles.labelTitle}>Label Creator</h2>
              <p className={styles.labelDesc}>
                Multi-step compliance label generation with METRC test result retrieval, individual cannabinoid and terpene profiles, per-serving-dose calculations, cartridge halving toggle, dummy label mode, and Bartender-compatible JSON export. Fully integrated with your packaging workflow.
              </p>
              <ul className={styles.labelFeatures}>
                {[
                  'Δ9-THC, THCA, CBD, CBDA, CBN, THCV, CBDV, Δ8-THC profiles',
                  'Per-terpene breakdown pulled directly from METRC',
                  'Per-serving dose auto-calculation',
                  'Bartender-compatible JSON export (current_results.json)',
                  'File System Access API with download fallback',
                  'Dummy label mode for proofing',
                ].map((f) => (
                  <li key={f} className={styles.labelFeature}>
                    <span className={styles.labelCheck}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.labelVisual}>
              <div className={styles.labelCard}>
                <div className={styles.labelCardHeader}>
                  <span className={styles.labelCardBadge}>METRC SYNCED</span>
                  <span className={styles.labelCardBadge2}>COMPLIANT</span>
                </div>
                <div className={styles.labelCardBody}>
                  <div className={styles.labelRow}>
                    <span className={styles.labelKey}>Δ9-THC</span>
                    <span className={styles.labelVal}>22.4%</span>
                  </div>
                  <div className={styles.labelRow}>
                    <span className={styles.labelKey}>THCA</span>
                    <span className={styles.labelVal}>25.1%</span>
                  </div>
                  <div className={styles.labelRow}>
                    <span className={styles.labelKey}>CBD</span>
                    <span className={styles.labelVal}>0.08%</span>
                  </div>
                  <div className={styles.labelRow}>
                    <span className={styles.labelKey}>Total THC</span>
                    <span className={styles.labelValBold}>44.5%</span>
                  </div>
                  <div className={styles.labelDivider} />
                  <div className={styles.labelRow}>
                    <span className={styles.labelKey}>Myrcene</span>
                    <span className={styles.labelVal}>0.42%</span>
                  </div>
                  <div className={styles.labelRow}>
                    <span className={styles.labelKey}>Caryophyllene</span>
                    <span className={styles.labelVal}>0.31%</span>
                  </div>
                  <div className={styles.labelRow}>
                    <span className={styles.labelKey}>Limonene</span>
                    <span className={styles.labelVal}>0.19%</span>
                  </div>
                </div>
                <div className={styles.labelCardFooter}>
                  <span>Export → Bartender JSON</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Auth & Permissions ───────────────────────────────── */}
        <section className={styles.authSection}>
          <div className={styles.sectionInner}>
            <div className={styles.authGrid}>
              <div>
                <span className={styles.eyebrow}>Authentication</span>
                <h2 className={styles.authTitle}>Built for the floor</h2>
                <p className={styles.authDesc}>
                  HarvestHub uses a username + PIN authentication system — no passwords, no OAuth friction. Sessions are stored locally with a 30-minute idle timeout, so your crew can clock in and get to work fast, on any shared terminal.
                </p>
                <div className={styles.roleGrid}>
                  {[
                    { role: 'Owner', desc: 'Full system access' },
                    { role: 'Admin', desc: 'All administrative functions' },
                    { role: 'Staff', desc: 'Role-based module access' },
                    { role: 'Viewer', desc: 'Read-only visibility' },
                  ].map((r) => (
                    <div key={r.role} className={styles.roleCard}>
                      <span className={styles.roleName}>{r.role}</span>
                      <span className={styles.roleDesc}>{r.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className={styles.eyebrow}>Permission Model</span>
                <h2 className={styles.authTitle}>Three-level access control</h2>
                <p className={styles.authDesc}>
                  Permissions are stored as a JSON object per user and enforced consistently across the sidebar, route rendering, and database queries.
                </p>
                <div className={styles.permLevels}>
                  {[
                    { level: 'Category', example: 'cultivation, harvest, post_harvest, management', desc: 'Broad department access' },
                    { level: 'Module', example: 'trim, hash_labeling, crop_control', desc: 'Individual section access' },
                    { level: 'Stage', example: 'specific cultivation stages', desc: 'Granular workflow step access' },
                  ].map((p) => (
                    <div key={p.level} className={styles.permLevel}>
                      <div className={styles.permLevelBadge}>{p.level}</div>
                      <div>
                        <p className={styles.permDesc}>{p.desc}</p>
                        <code className={styles.permCode}>{p.example}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tech Stack ──────────────────────────────────────── */}
        <section className={styles.techSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Tech Stack</span>
              <h2 className={styles.sectionTitle}>Modern. Proven. Fast.</h2>
            </div>
            <div className={styles.techGrid}>
              {techStack.map((t) => (
                <div key={t.layer} className={styles.techRow}>
                  <span className={styles.techLayer}>{t.layer}</span>
                  <span className={styles.techTech}>{t.tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaGlow} />
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Ready to run a tighter operation?</h2>
            <p className={styles.ctaSub}>
              HarvestHub is purpose-built for cannabis cultivation facilities that demand compliance, coordination, and real-time visibility.
            </p>
            <Link to={hub.demoPath} className={styles.ctaBtn}>
              Open HarvestHub →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
