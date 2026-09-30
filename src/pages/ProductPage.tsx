import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { products } from '../data/products'
import { Link } from 'react-router-dom'
import styles from './ProductPage.module.css'

interface Props {
  productId: string
}

export default function ProductPage({ productId }: Props) {
  const product = products.find((p) => p.id === productId)!
  const other = products.find((p) => p.id !== productId)!

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className={styles.hero}
          style={{ background: `linear-gradient(135deg, ${product.accentColor}18, ${product.accentColor}06)` }}
        >
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div
                className={styles.heroBadge}
                style={{ background: product.accentLight, color: product.accentColor, borderColor: `${product.accentColor}40` }}
              >
                {product.name.replace('Efficiensee ', '')} Product
              </div>
              <h1 className={styles.heroTitle}>{product.name}</h1>
              <p className={styles.heroTagline}>{product.tagline}</p>
              <p className={styles.heroDesc}>{product.description}</p>
              <div className={styles.heroCtas}>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.ctaPrimary}
                  style={{ background: product.accentColor }}
                >
                  Open {product.name.replace('Efficiensee ', '')} &rarr;
                </a>
                <a href="#features" className={styles.ctaSecondary}>
                  See Features
                </a>
              </div>
            </div>
            <div className={styles.heroImageWrap}>
              <img src={product.heroImage} alt={product.name} className={styles.heroImage} />
              <div
                className={styles.heroImageFrame}
                style={{ borderColor: `${product.accentColor}30` }}
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className={styles.featuresSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge} style={{ color: product.accentColor, background: product.accentLight }}>
                Features
              </span>
              <h2 className={styles.sectionTitle}>Everything you need, nothing you don't</h2>
              <p className={styles.sectionSub}>
                {product.name} is purposefully built — every feature earns its place by solving a real problem.
              </p>
            </div>

            <div className={styles.featureGrid}>
              {product.features.map((f, i) => (
                <div key={f.title} className={styles.featureCard}>
                  <div
                    className={styles.featureIcon}
                    style={{ background: product.accentLight, color: product.accentColor }}
                  >
                    {i + 1}
                  </div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureBody}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection} style={{ background: product.accentColor }}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Start using {product.name} today</h2>
            <p className={styles.ctaSub}>Free to get started. No credit card required.</p>
            <a
              href={product.url}
              target="_blank"
              rel="noreferrer"
              className={styles.ctaBtn}
            >
              Open {product.name.replace('Efficiensee ', '')} &rarr;
            </a>
          </div>
        </section>

        {/* Also explore */}
        <section className={styles.alsoSection}>
          <div className={styles.alsoInner}>
            <p className={styles.alsoLabel}>Also from Efficiensee</p>
            <div className={styles.alsoCard}>
              <img src={other.heroImage} alt={other.name} className={styles.alsoImage} />
              <div className={styles.alsoCopy}>
                <div
                  className={styles.alsoBadge}
                  style={{ background: other.accentLight, color: other.accentColor }}
                >
                  {other.name.replace('Efficiensee ', '')}
                </div>
                <h3 className={styles.alsoTitle}>{other.name}</h3>
                <p className={styles.alsoTagline}>{other.tagline}</p>
                <p className={styles.alsoDesc}>{other.description}</p>
                <div className={styles.alsoActions}>
                  <Link to={other.path} className={styles.alsoLearn}>
                    Learn More
                  </Link>
                  <a
                    href={other.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.alsoLaunch}
                    style={{ background: other.accentColor }}
                  >
                    Open App &rarr;
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
