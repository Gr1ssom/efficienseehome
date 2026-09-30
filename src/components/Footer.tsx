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
            Purpose-built software for the cannabis industry — from seed to shelf.
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
                <Link to={p.demoPath} className={styles.colLink}>
                  {p.name} demo &rarr;
                </Link>
              </li>
            ))}
            {products.map((p) => (
              <li key={`${p.id}-signin`}>
                <a href={p.url} target="_blank" rel="noreferrer" className={styles.colLink}>
                  Customer sign in
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.colList}>
            <li><Link to="/" className={styles.colLink}>Home</Link></li>
            <li><Link to="/early-access" className={styles.colLink}>Early access</Link></li>
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
