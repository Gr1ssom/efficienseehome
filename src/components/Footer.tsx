import { Link } from 'react-router-dom'
import mark from '../assets/mark.png'
import { BOOKING_URL } from '../lib/signups'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <img src={mark} alt="" className={styles.mark} />
            <span>Efficiensee</span>
          </Link>
          <p className={styles.tagline}>
            HarvestHub is facility software for licensed cannabis cultivation and manufacturing.
          </p>
        </div>

        <nav className={styles.cols} aria-label="Footer">
          <div>
            <h4 className={styles.colTitle}>Product</h4>
            <ul className={styles.colList}>
              <li><Link to="/products/hub" className={styles.colLink}>HarvestHub</Link></li>
              <li><Link to="/demo" className={styles.colLink}>Interactive demo</Link></li>
              <li><Link to="/early-access" className={styles.colLink}>HarvestHub V2</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.colTitle}>Talk to us</h4>
            <ul className={styles.colList}>
              <li><Link to="/early-access" className={styles.colLink}>Get early access</Link></li>
              <li><a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.colLink}>Book a meeting</a></li>
              <li><a href="mailto:dylan@efficiensee.io" className={styles.colLink}>dylan@efficiensee.io</a></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.colTitle}>Customers</h4>
            <ul className={styles.colList}>
              <li><a href="https://hub.efficiensee.io" target="_blank" rel="noreferrer" className={styles.colLink}>Sign in ↗</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Efficiensee, LLC</span>
      </div>
    </footer>
  )
}
