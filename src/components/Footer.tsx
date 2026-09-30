import { Link } from 'react-router-dom'
import { products } from '../data/products'
import styles from './Footer.module.css'
import EfficienseeLogo from './EfficienseeLogo'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <EfficienseeLogo size={48} />
            <div className={styles.logoTextWrap}>
              <span className={styles.logoText}>Efficiensee</span>
              <span className={styles.logoSub}>LLC</span>
            </div>
          </div>
          <p className={styles.tagline}>
            Purpose-built software for the cannabis industry — from seed to delivery.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Products</h4>
          <ul className={styles.colList}>
            {products.map((p) => (
              <li key={p.id}>
                <Link to={p.path} className={styles.colLink}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Launch</h4>
          <ul className={styles.colList}>
            {products.map((p) => (
              <li key={p.id}>
                <a href={p.url} target="_blank" rel="noreferrer" className={styles.colLink}>
                  Open {p.name.replace('Efficiensee ', '')} &rarr;
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.colList}>
            <li><Link to="/" className={styles.colLink}>Home</Link></li>
            <li><a href="mailto:hello@efficiensee.io" className={styles.colLink}>Contact</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Efficiensee, LLC. All rights reserved.</p>
      </div>
    </footer>
  )
}
