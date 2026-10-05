import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CalendarBlank } from '@phosphor-icons/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BOOKING_URL, submitSignup } from '../lib/signups'
import styles from './EarlyAccessPage.module.css'

const interestOptions = [
  { id: 'early_access_v2', label: 'Early access to HarvestHub V2' },
  { id: 'info_meeting', label: 'An informational meeting when it’s available' },
  { id: 'v1_demo', label: 'A live walkthrough of HarvestHub today' },
]

const facilityTypes = ['Cultivation', 'Manufacturing', 'Cultivation + manufacturing', 'Dispensary / retail', 'Other']

type Status = 'idle' | 'sending' | 'done' | 'error'

export default function EarlyAccessPage() {
  const [params] = useSearchParams()
  const [status, setStatus] = useState<Status>('idle')
  const [firstName, setFirstName] = useState('')
  const [interests, setInterests] = useState<string[]>(['early_access_v2', 'info_meeting'])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const toggle = (id: string) =>
    setInterests((cur) => (cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id]))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const text = (k: string) => String(form.get(k) ?? '').trim() || undefined
    // Hidden field only bots fill in.
    if (text('website')) {
      setStatus('done')
      return
    }
    const name = text('name') ?? ''
    setStatus('sending')
    try {
      await submitSignup({
        name,
        email: text('email') ?? '',
        phone: text('phone'),
        company: text('company'),
        role: text('role'),
        facility_type: text('facility_type'),
        interests,
        wants_meeting: interests.includes('info_meeting') || interests.includes('v1_demo'),
        notes: text('notes'),
        source: (params.get('src') ?? 'website').slice(0, 60),
      })
      setFirstName(name.split(' ')[0])
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span className={styles.pill}>HarvestHub V2 · coming soon</span>
            <h1 className={styles.title}>Get <span className={styles.serif}>early</span> access</h1>
            <p className={styles.desc}>
              Leave your details and we’ll reach out when HarvestHub V2 is ready, with early access and an
              informational meeting for your team. Want to talk sooner? Grab a time on the calendar.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.bookBtn}>
              <CalendarBlank size={18} /> Schedule a meeting now
            </a>
            <ul className={styles.points}>
              <li>No commitment: this just puts you on the list</li>
              <li>We only use your details to contact you about HarvestHub</li>
              <li>
                Curious what it looks like? <Link to="/demo">Watch the interactive demo</Link>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            {status === 'done' ? (
              <div className={styles.done}>
                <span className={styles.doneCheck}>✓</span>
                <h2 className={styles.doneTitle}>You’re on the list{firstName ? `, ${firstName}` : ''}.</h2>
                <p className={styles.doneDesc}>
                  We’ll be in touch as HarvestHub V2 gets closer. If you’d like to meet now, pick a time that works for you.
                </p>
                <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.submit}>
                  <CalendarBlank size={18} /> Schedule a meeting now
                </a>
                <Link to="/demo" className={styles.secondary}>Watch the demo while you wait</Link>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>Name *</span>
                    <input name="name" required maxLength={120} autoComplete="name" />
                  </label>
                  <label className={styles.field}>
                    <span>Email *</span>
                    <input name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" />
                  </label>
                </div>
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>Phone</span>
                    <input name="phone" type="tel" maxLength={40} autoComplete="tel" inputMode="tel" />
                  </label>
                  <label className={styles.field}>
                    <span>Company</span>
                    <input name="company" maxLength={160} autoComplete="organization" />
                  </label>
                </div>
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>Your role</span>
                    <input name="role" maxLength={120} placeholder="e.g. Director of Cultivation" autoComplete="organization-title" />
                  </label>
                  <label className={styles.field}>
                    <span>Facility type</span>
                    <select name="facility_type" defaultValue="">
                      <option value="">Select…</option>
                      {facilityTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </label>
                </div>

                <fieldset className={styles.interests}>
                  <legend>I’m interested in</legend>
                  {interestOptions.map((o) => (
                    <label key={o.id} className={styles.check}>
                      <input type="checkbox" checked={interests.includes(o.id)} onChange={() => toggle(o.id)} />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </fieldset>

                <label className={styles.field}>
                  <span>Anything we should know?</span>
                  <textarea name="notes" rows={3} maxLength={2000} placeholder="Facility size, current software, best time to reach you…" />
                </label>

                <label className={styles.honeypot} aria-hidden>
                  Website <input name="website" tabIndex={-1} autoComplete="off" />
                </label>

                {status === 'error' && (
                  <p className={styles.error} role="alert">
                    Something went wrong sending that. Please try again, or email{' '}
                    <a href="mailto:dylan@efficiensee.io">dylan@efficiensee.io</a>.
                  </p>
                )}

                <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Sign me up'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
