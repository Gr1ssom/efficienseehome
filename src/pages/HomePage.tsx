import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { products } from '../data/products'
import hubLogo from '../assets/Efficiensee.png'
import oasisLogo from '../assets/HarvestHub_efficiensee.png'
import EfficienseeLogo from '../components/EfficienseeLogo'
import styles from './HomePage.module.css'

const productLogos: Record<string, string> = {
  hub: hubLogo,
  oasis: oasisLogo,
}

const scrollItems = [
  'HarvestHub', 'OrderOasis', 'METRC Integration', 'LeafLink Sync',
  'Real-Time Operations', 'iPad Native', 'Compliance-Ready',
  'Hash Lab Workflow', 'Bulk Import', 'Live Sensor Data',
]

const stats = [
  { value: '40+', label: 'Facility modules' },
  { value: 'Live', label: 'Supabase Realtime' },
  { value: '5', label: 'Hardware integrations' },
  { value: 'Native', label: 'iOS / iPad app' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className={styles.hero}>
          {/* grid lines */}
          <div className={styles.gridLines} aria-hidden />
          <div className={styles.heroGlow} aria-hidden />

          <div className={styles.heroInner}>
            {/* LEFT — copy */}
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroLine1}>The operating</span>
                <span className={styles.heroLine2}>system for</span>
                <span className={styles.heroLine3}>
                  <span className={styles.gradText}>cannabis.</span>
                </span>
              </h1>

              <p className={styles.heroDesc}>
                Two purpose-built platforms that cover your entire supply chain —
                from the first clone in the propagation room to the final delivery at the dispensary door.
              </p>

              <div className={styles.heroActions}>
                <a href="https://hub.efficiensee.io" target="_blank" rel="noreferrer" className={styles.btnPrimary}>
                  Explore HarvestHub
                </a>
                <a href="https://oasis.efficiensee.io" target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                  Explore OrderOasis
                </a>
              </div>

              {/* inline stats */}
              <div className={styles.heroStats}>
                {stats.map((s) => (
                  <div key={s.label} className={styles.heroStat}>
                    <span className={styles.heroStatValue}>{s.value}</span>
                    <span className={styles.heroStatLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — product cards stacked with depth */}
            <div className={styles.heroVisual}>
              <div className={styles.heroCardsStack}>
                {products.map((p, i) => (
                  <div key={p.id} className={styles.heroCardWrap} style={{ '--card-index': i } as React.CSSProperties}>
                    <div
                      className={styles.heroProductIntegBadge}
                      style={
                        p.id === 'hub'
                          ? { color: '#e8b84b', background: 'rgba(232,168,48,0.15)', borderColor: 'rgba(232,168,48,0.35)', animationDelay: '-2.2s' }
                          : { color: '#5bc4e8', background: 'rgba(26,110,142,0.2)', borderColor: 'rgba(91,196,232,0.35)', animationDelay: '-0.6s' }
                      }
                    >
                      {p.id === 'hub' ? 'METRC Ready' : 'LeafLink Ready'}
                    </div>
                    <Link
                      to={p.path}
                      className={styles.heroProductCard}
                    >
                      <div className={styles.heroProductCardInner}>
                        <div className={styles.heroProductImg}>
                          <img src={p.heroImage} alt={p.name} />
                          <div
                            className={styles.heroProductImgOverlay}
                            style={{ background: `linear-gradient(135deg, ${p.accentColor}44, transparent 60%)` }}
                          />
                        </div>
                        <div className={styles.heroProductMeta}>
                          <img
                            src={productLogos[p.id]}
                            alt={p.name}
                            className={styles.heroProductLogo}
                          />
                          <div className={styles.heroProductInfo}>
                            <span className={styles.heroProductName}>{p.name}</span>
                            <span className={styles.heroProductTagline}>{p.tagline}</span>
                          </div>
                          <span className={styles.heroProductArrow}>→</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* floating accent tags */}
              <div className={styles.floatTag1}>Real-Time</div>
              <div className={styles.floatTag3}>iPad Native</div>
            </div>
          </div>

          {/* scroll indicator */}
          <div className={styles.scrollHint}>
            <div className={styles.scrollDot} />
            <span>scroll</span>
          </div>
        </section>

        {/* ── Marquee strip ─────────────────────────────────────── */}
        <div className={styles.marqueeOuter} aria-hidden>
          <div className={styles.marqueeTrack}>
            {[...scrollItems, ...scrollItems, ...scrollItems].map((item, i) => (
              <span key={i} className={styles.marqueeItem}>
                <span className={styles.marqueeDot} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Products ──────────────────────────────────────────── */}
        <section id="products" className={styles.productsSection}>
          <div className={styles.productsInner}>
            <div className={styles.productsSectionHead}>
              <span className={styles.eyebrow}>Our Products</span>
              <h2 className={styles.productsSectionTitle}>Two products. One ecosystem.</h2>
              <p className={styles.productsSectionSub}>
                Built for every stage of the cannabis supply chain — from the first seed
                to the final delivery.
              </p>
            </div>

            <div className={styles.productsGrid}>
              {products.map((p) => (
                <div key={p.id} className={styles.productCard}>
                  <div className={styles.productCardImg}>
                    <img src={p.heroImage} alt={p.name} />
                    <div
                      className={styles.productCardImgGrad}
                      style={{ background: `linear-gradient(to top, #0b1520 10%, transparent)` }}
                    />
                    <div
                      className={styles.productCardAccent}
                      style={{ background: `radial-gradient(circle at 30% 50%, ${p.accentColor}33, transparent 70%)` }}
                    />
                    <img src={productLogos[p.id]} alt="" className={styles.productCardLogoOverlay} />
                  </div>

                  <div className={styles.productCardBody}>
                    <div className={styles.productCardHeader}>
                      <span
                        className={styles.productCardBadge}
                        style={{ color: p.accentColor, background: `${p.accentColor}18`, borderColor: `${p.accentColor}35` }}
                      >
                        {p.shortName}
                      </span>
                    </div>
                    <h3 className={styles.productCardName}>{p.name}</h3>
                    <p className={styles.productCardTagline}>{p.tagline}</p>
                    <p className={styles.productCardDesc}>{p.description}</p>

                    <ul className={styles.productCardFeatures}>
                      {p.features.slice(0, 3).map((f) => (
                        <li key={f.title} className={styles.productCardFeature}>
                          <span className={styles.productCardCheck} style={{ color: p.accentColor }}>✓</span>
                          <span className={styles.productCardFeatureName}>{f.title}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.productCardActions}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.productCardLaunch}
                        style={{ background: p.accentGradient }}
                      >
                        Open {p.shortName} →
                      </a>
                      <Link to={p.path} className={styles.productCardLearn}>
                        Full Overview
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Supply chain strip ────────────────────────────────── */}
        <section className={styles.chainSection}>
          <div className={styles.chainInner}>
            <span className={styles.eyebrow}>End-to-End Coverage</span>
            <h2 className={styles.chainTitle}>Every stage. One platform.</h2>
            <div className={styles.chainSteps}>
              {[
                { step: '01', label: 'Propagation', product: 'HarvestHub', color: '#2d7a22' },
                { step: '02', label: 'Cultivation', product: 'HarvestHub', color: '#2d7a22' },
                { step: '03', label: 'Harvest & Processing', product: 'HarvestHub', color: '#2d7a22' },
                { step: '04', label: 'Packaging & Lab', product: 'HarvestHub', color: '#2d7a22' },
                { step: '05', label: 'Distribution', product: 'OrderOasis', color: '#1a6e8e' },
                { step: '06', label: 'Fulfillment', product: 'OrderOasis', color: '#1a6e8e' },
              ].map((s, i, arr) => (
                <div key={s.step} className={styles.chainStep}>
                  <div className={styles.chainStepNum} style={{ color: s.color, borderColor: `${s.color}40` }}>
                    {s.step}
                  </div>
                  <div className={styles.chainStepLabel}>{s.label}</div>
                  <div className={styles.chainStepProduct} style={{ color: s.color }}>
                    {s.product}
                  </div>
                  {i < arr.length - 1 && <div className={styles.chainConnector} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why section ───────────────────────────────────────── */}
        <section className={styles.whySection}>
          <div className={styles.whyInner}>
            <div className={styles.whyLeft}>
              <span className={styles.eyebrow}>Why Efficiensee</span>
              <h2 className={styles.whyTitle}>Built for operators,<br />by operators.</h2>
              <p className={styles.whyDesc}>
                We understand the regulatory complexity, operational pressure, and competitive
                demands of the cannabis industry — because our products were built inside it.
              </p>
              <a href="https://hub.efficiensee.io" target="_blank" rel="noreferrer" className={styles.btnPrimary}>
                Start for free
              </a>
            </div>
            <div className={styles.whyRight}>
              {[
                {
                  title: 'Compliance First',
                  body: 'METRC integration, audit trails, and manifest generation are baked into every workflow — not added as an afterthought.',
                  num: '01',
                },
                {
                  title: 'Real-Time Visibility',
                  body: "Live sensor data, scale readings, and order status updates — you always know exactly where everything stands.",
                  num: '02',
                },
                {
                  title: 'Operator-Grade UX',
                  body: 'Designed for the floor, the dispatch desk, and the executive suite. Fast, focused, and built for how real teams work.',
                  num: '03',
                },
                {
                  title: 'Integrated Ecosystem',
                  body: 'HarvestHub and OrderOasis share inventory data seamlessly, so nothing falls through the gap between grow and delivery.',
                  num: '04',
                },
              ].map((item) => (
                <div key={item.title} className={styles.whyCard}>
                  <span className={styles.whyCardNum}>{item.num}</span>
                  <div>
                    <h4 className={styles.whyCardTitle}>{item.title}</h4>
                    <p className={styles.whyCardBody}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className={styles.cta}>
          <div className={styles.ctaGlow} aria-hidden />
          <div className={styles.ctaGrid} aria-hidden />
          <div className={styles.ctaInner}>
            <div className={styles.ctaCopy}>
              <EfficienseeLogo size={52} />
              <h2 className={styles.ctaTitle}>
                Ready to run a<br />tighter operation?
              </h2>
              <p className={styles.ctaDesc}>
                Start with HarvestHub, OrderOasis, or both. Purpose-built for cannabis — nothing generic.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <a href="https://hub.efficiensee.io" target="_blank" rel="noreferrer" className={styles.ctaBtnHub}>
                Start with HarvestHub →
              </a>
              <a href="https://oasis.efficiensee.io" target="_blank" rel="noreferrer" className={styles.ctaBtnOasis}>
                Start with OrderOasis →
              </a>
              <p className={styles.ctaNote}>No credit card required</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
