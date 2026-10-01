import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import mark from '../assets/mark.png'
import styles from './Navbar.module.css'

const SIGN_IN = 'https://hub.efficiensee.io'

const links = [
  { to: '/products/hub', label: 'Product' },
  { to: '/demo', label: 'Demo' },
  { to: '/early-access', label: 'HarvestHub V2' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand} onClick={close}>
          <img src={mark} alt="" className={styles.mark} />
          <span className={styles.word}>Efficiensee</span>
        </Link>

        <ul className={`${styles.links} ${open ? styles.open : ''}`}>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} onClick={close}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className={styles.mobileOnly}>
            <a href={SIGN_IN} target="_blank" rel="noreferrer" className={styles.link} onClick={close}>
              Customer sign in ↗
            </a>
          </li>
        </ul>

        <div className={styles.actions}>
          <a href={SIGN_IN} target="_blank" rel="noreferrer" className={styles.signIn}>
            Sign in
          </a>
          <Link to="/early-access" className={styles.cta} onClick={close}>
            Get early access
          </Link>
          <button className={styles.burger} aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
