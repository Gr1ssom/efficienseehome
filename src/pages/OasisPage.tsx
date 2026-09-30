import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { products } from '../data/products'
import oasisLogo from '../assets/HarvestHub_efficiensee.png'
import styles from './OasisPage.module.css'

const oasis = products.find((p) => p.id === 'oasis')!
const hub = products.find((p) => p.id === 'hub')!

const moduleIcons: Record<string, string> = {
  'Order Management': '📋',
  'LeafLink': '🛒',
  'METRC': '⚖️',
  'Mobile / iOS': '📱',
  'Analytics': '📊',
}

const techStack = [
  { layer: 'Framework', tech: 'React + TypeScript' },
  { layer: 'Build', tech: 'Vite' },
  { layer: 'Styling', tech: 'Tailwind CSS' },
  { layer: 'Database', tech: 'Supabase (PostgreSQL)' },
  { layer: 'Auth', tech: 'Supabase Auth' },
  { layer: 'Realtime', tech: 'Supabase Realtime' },
  { layer: 'Edge Functions', tech: 'Supabase / Deno' },
  { layer: 'Mobile', tech: 'Capacitor (iOS / iPad)' },
]

export default function OasisPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.heroPill}>Cannabis Distribution Platform</div>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroGreen}>Order</span>
                <span className={styles.heroBlue}>Oasis</span>
              </h1>
              <p className={styles.heroTagline}>{oasis.tagline}</p>
              <p className={styles.heroDesc}>{oasis.description}</p>
              <div className={styles.heroCtas}>
                <a
                  href={oasis.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.ctaLaunch}
                >
                  Open OrderOasis →
                </a>
                <a href="#modules" className={styles.ctaGhost}>
                  Explore Modules
                </a>
              </div>
            </div>
            <div className={styles.heroLogoWrap}>
              <img src={oasisLogo} alt="OrderOasis" className={styles.heroLogo} />
            </div>
          </div>
          <div className={`${styles.orb} ${styles.orbTeal}`} />
          <div className={`${styles.orb} ${styles.orbGreen}`} />
        </section>

        {/* ── Stats ───────────────────────────────────────────── */}
        <div className={styles.statsBar}>
          <div className={styles.statsInner}>
            {[
              { value: 'Realtime', label: 'Order Pipeline' },
              { value: 'Native', label: 'iPad / iOS App' },
              { value: '4', label: 'Live Integrations' },
              { value: 'Bulk', label: 'PDF & CSV Import' },
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
              <h2 className={styles.sectionTitle}>Distribution operations, end to end.</h2>
              <p className={styles.sectionSub}>
                OrderOasis connects your order queue, wholesale inventory, compliance manifests, and mobile team in one real-time platform.
              </p>
            </div>
            <div className={styles.capGrid}>
              {oasis.features.map((f) => (
                <div key={f.title} className={styles.capCard}>
                  <h3 className={styles.capTitle}>{f.title}</h3>
                  <p className={styles.capBody}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Realtime pipeline callout ────────────────────────── */}
        <section className={styles.pipelineSection}>
          <div className={styles.pipelineInner}>
            <div className={styles.pipelineCopy}>
              <span className={styles.eyebrow}>Featured Capability</span>
              <h2 className={styles.pipelineTitle}>Live order pipeline with team chat</h2>
              <p className={styles.pipelineDesc}>
                Every order in your queue updates in real time — no refresh, no polling. Status changes, inventory confirmations, and team messages are pushed instantly via Supabase Realtime, so your dispatch team and fulfillment crew always see the same picture.
              </p>
              <ul className={styles.pipelineFeatures}>
                {[
                  'Supabase Realtime — live updates to all connected clients',
                  'Per-order team chat threaded alongside the order record',
                  'Status transitions with full audit trail',
                  'LeafLink price verification on every line item',
                  'METRC manifest generated at fulfillment',
                  'Push notifications on status changes (iOS/iPad)',
                ].map((f) => (
                  <li key={f} className={styles.pipelineFeature}>
                    <span className={styles.pipelineCheck}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.pipelineVisual}>
              <div className={styles.orderCard}>
                <div className={styles.orderCardHeader}>
                  <div>
                    <span className={styles.orderNum}>#ORD-2847</span>
                    <span className={styles.orderCustomer}>Green Leaf Dispensary</span>
                  </div>
                  <span className={styles.orderStatus}>In Progress</span>
                </div>
                <div className={styles.orderItems}>
                  {[
                    { name: 'Blue Dream — 1/8oz', qty: '48 units', verified: true },
                    { name: 'OG Kush — Preroll 5pk', qty: '24 units', verified: true },
                    { name: 'Wedding Cake — 1g Cart', qty: '36 units', verified: false },
                  ].map((item) => (
                    <div key={item.name} className={styles.orderItem}>
                      <div className={styles.orderItemInfo}>
                        <span className={styles.orderItemName}>{item.name}</span>
                        <span className={styles.orderItemQty}>{item.qty}</span>
                      </div>
                      <span className={item.verified ? styles.orderVerified : styles.orderPending}>
                        {item.verified ? '✓ Verified' : '⏳ Pending'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className={styles.orderChat}>
                  <div className={styles.chatMsg}>
                    <span className={styles.chatAuthor}>Jordan</span>
                    <span className={styles.chatText}>Wedding Cake carts syncing from LeafLink now</span>
                  </div>
                  <div className={styles.chatMsg}>
                    <span className={styles.chatAuthor}>Alex</span>
                    <span className={styles.chatText}>METRC manifest ready when you are</span>
                  </div>
                </div>
                <div className={styles.orderFooter}>
                  <span className={styles.orderFooterText}>Realtime · LeafLink synced · METRC ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Modules ─────────────────────────────────────────── */}
        <section id="modules" className={styles.modulesSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Platform Modules</span>
              <h2 className={styles.sectionTitle}>Every part of the operation.</h2>
              <p className={styles.sectionSub}>
                From the first order in the queue to the final manifest at delivery — OrderOasis handles it all in one place.
              </p>
            </div>
            <div className={styles.moduleGrid}>
              {oasis.modules!.map((mod) => (
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
              <h2 className={styles.sectionTitle}>Connected to the tools you depend on</h2>
              <p className={styles.sectionSub}>
                OrderOasis speaks natively to LeafLink, METRC, Supabase Realtime, and deploys natively to iPad — no workarounds.
              </p>
            </div>
            <div className={styles.intGrid}>
              {oasis.integrations!.map((int) => (
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

        {/* ── iPad callout ────────────────────────────────────── */}
        <section className={styles.ipadSection}>
          <div className={styles.ipadInner}>
            <div className={styles.ipadCopy}>
              <span className={styles.eyebrow}>Native Mobile</span>
              <h2 className={styles.ipadTitle}>Built for the iPad. Built for the floor.</h2>
              <p className={styles.ipadDesc}>
                OrderOasis ships as a true native iPad app via Capacitor — the same codebase, compiled to iOS with biometric unlock, push notifications through APNs, and a touch-optimized layout designed for dispatch desks and fulfillment teams.
              </p>
              <div className={styles.ipadFeatures}>
                {[
                  { icon: '🔒', title: 'Biometric Unlock', desc: 'Face ID and Touch ID support — fast, secure access on shared tablets.' },
                  { icon: '🔔', title: 'Push Notifications', desc: 'APNs-powered alerts for order status changes, new assignments, and team messages.' },
                  { icon: '📐', title: 'iPad-Optimized UI', desc: 'Layouts designed for the larger screen with split-view and touch-first interactions.' },
                  { icon: '✈️', title: 'TestFlight Distribution', desc: 'Internal builds distributed via TestFlight for fast iteration and team rollout.' },
                ].map((f) => (
                  <div key={f.title} className={styles.ipadFeature}>
                    <span className={styles.ipadFeatureIcon}>{f.icon}</span>
                    <div>
                      <span className={styles.ipadFeatureTitle}>{f.title}</span>
                      <span className={styles.ipadFeatureDesc}>{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.ipadVisual}>
              <div className={styles.ipadFrame}>
                <div className={styles.ipadScreen}>
                  <div className={styles.ipadHeader}>
                    <span className={styles.ipadAppName}>OrderOasis</span>
                    <span className={styles.ipadLive}>● LIVE</span>
                  </div>
                  <div className={styles.ipadContent}>
                    {[
                      { id: '#2847', name: 'Green Leaf', status: 'In Progress', color: '#e8a830' },
                      { id: '#2848', name: 'The Dispensary', status: 'Ready', color: '#7dd87a' },
                      { id: '#2849', name: 'Bloom Co.', status: 'Pending', color: '#5a7a96' },
                      { id: '#2850', name: 'Roots & Remedy', status: 'Delivered', color: '#4aad44' },
                    ].map((order) => (
                      <div key={order.id} className={styles.ipadOrder}>
                        <div className={styles.ipadOrderLeft}>
                          <span className={styles.ipadOrderId}>{order.id}</span>
                          <span className={styles.ipadOrderName}>{order.name}</span>
                        </div>
                        <span className={styles.ipadOrderStatus} style={{ color: order.color }}>
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.ipadHomeBar} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Tech Stack ──────────────────────────────────────── */}
        <section className={styles.techSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Tech Stack</span>
              <h2 className={styles.sectionTitle}>Modern. Realtime. Native.</h2>
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
            <h2 className={styles.ctaTitle}>Ready to streamline your distribution?</h2>
            <p className={styles.ctaSub}>
              OrderOasis is purpose-built for cannabis distributors who need real-time coordination, compliance confidence, and native mobile access.
            </p>
            <a href={oasis.url} target="_blank" rel="noreferrer" className={styles.ctaBtn}>
              Open OrderOasis →
            </a>
          </div>
        </section>

        {/* ── Also explore HarvestHub ──────────────────────────── */}
        <section className={styles.alsoSection}>
          <div className={styles.alsoInner}>
            <p className={styles.alsoLabel}>Also from Efficiensee</p>
            <div className={styles.alsoCard}>
              <img src={hub.heroImage} alt={hub.name} className={styles.alsoImage} />
              <div className={styles.alsoCopy}>
                <div className={styles.alsoBadge}>HarvestHub</div>
                <h3 className={styles.alsoTitle}>{hub.name}</h3>
                <p className={styles.alsoTagline}>{hub.tagline}</p>
                <p className={styles.alsoDesc}>{hub.description}</p>
                <div className={styles.alsoActions}>
                  <Link to={hub.path} className={styles.alsoLearn}>Full Overview</Link>
                  <a href={hub.url} target="_blank" rel="noreferrer" className={styles.alsoLaunch}>
                    Open HarvestHub →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
