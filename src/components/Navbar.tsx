import { Link, useLocation } from 'react-router-dom'
import { products } from '../data/products'
import styles from './Navbar.module.css'
import { useState } from 'react'
import navLogo from '../assets/Efficiensee.png'

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo} onClick={() => setOpen(false)}>
          <img src={navLogo} alt="Efficiensee" className={styles.logoImg} />
        </Link>

        <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          <li>
            <Link
              to="/"
              className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          {products.map((p) => (
            <li key={p.id}>
              <Link
                to={p.path}
                className={`${styles.link} ${pathname === p.path ? styles.active : ''}`}
                onClick={() => setOpen(false)}
              >
                {p.shortName}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/demo"
              className={`${styles.link} ${pathname === '/demo' ? styles.active : ''}`}
              onClick={() => setOpen(false)}
            >
              Demo
            </Link>
          </li>
          <li className={styles.mobileOnly}>
            <a
              href="https://hub.efficiensee.io"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              Customer sign in ↗
            </a>
          </li>
        </ul>

        <div className={styles.actions}>
          <a
            href="https://hub.efficiensee.io"
            target="_blank"
            rel="noreferrer"
            className={styles.signIn}
          >
            Sign in
          </a>
          <Link to="/demo" className={styles.ctaBtn} onClick={() => setOpen(false)}>
            Get Started
          </Link>
          <Link to="/early-access" className={styles.earlyBtn} onClick={() => setOpen(false)}>
            Early access
          </Link>
          <button
            className={styles.burger}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={open ? styles.lineOpen1 : styles.line} />
            <span className={open ? styles.lineOpen2 : styles.line} />
            <span className={open ? styles.lineOpen3 : styles.line} />
          </button>
        </div>
      </nav>
    </header>
  )
}
