import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Cell, DemoWorkflow, SidebarSection } from './types'
import styles from './DemoPlayer.module.css'

type Phase = 'screen' | 'modal' | 'done'
type Mode = 'watch' | 'guided'

interface Props {
  workflow: DemoWorkflow
  sidebar: SidebarSection[]
  mode: Mode
  onModeChange: (m: Mode) => void
  onFinish: () => void
}

/* Autoplay timings (ms) — tuned so a full workflow plays in ~1.5 minutes. */
const READ_MS = 3400
const MODAL_MS = 2600
const DONE_MS = 2400
const CLICK_MS = 650

function renderCell(c: Cell) {
  if (typeof c === 'string') return c
  return <span className={`${styles.pill} ${styles[`tone_${c.tone}`]}`}>{c.pill}</span>
}

export default function DemoPlayer({ workflow, sidebar, mode, onModeChange, onFinish }: Props) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('screen')
  const [paused, setPaused] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)

  const windowRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLButtonElement>(null)

  const playing = mode === 'watch' && !paused
  const step = workflow.steps[index]
  const isLast = index === workflow.steps.length - 1
  const rows = phase === 'done' && step.rowsAfter ? step.rowsAfter : step.screen.rows

  const changeMode = useCallback((m: Mode) => {
    setPaused(false)
    onModeChange(m)
  }, [onModeChange])

  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(workflow.steps.length - 1, i)))
    setPhase('screen')
  }, [workflow.steps.length])

  const next = useCallback(() => {
    if (isLast) {
      onFinish()
      return
    }
    goTo(index + 1)
  }, [goTo, index, isLast, onFinish])

  /** The operator's click on the highlighted control. */
  const act = useCallback(() => {
    if (phase === 'screen') setPhase(step.modal ? 'modal' : 'done')
    else if (phase === 'modal') setPhase('done')
    else next()
  }, [next, phase, step.modal])

  // Track the highlighted control so the demo cursor can glide to it.
  useLayoutEffect(() => {
    const win = windowRef.current
    const target = targetRef.current
    if (!win || !target || phase === 'done') return
    const place = () => {
      const w = win.getBoundingClientRect()
      const t = target.getBoundingClientRect()
      setCursor({ x: t.left - w.left + t.width * 0.6, y: t.top - w.top + t.height * 0.65 })
    }
    place()
    const ro = new ResizeObserver(place)
    ro.observe(win)
    return () => ro.disconnect()
  }, [index, phase, workflow.id])

  // Autoplay ("video") mode.
  useEffect(() => {
    if (!playing) return
    const wait = phase === 'screen' ? READ_MS : phase === 'modal' ? MODAL_MS : DONE_MS
    const t1 = window.setTimeout(() => {
      if (phase === 'done') {
        next()
        return
      }
      setClicking(true)
      window.setTimeout(() => {
        setClicking(false)
        act()
      }, CLICK_MS)
    }, wait)
    return () => window.clearTimeout(t1)
  }, [playing, phase, index, act, next])

  // Keyboard: ←/→ between steps, space to play/pause.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === 'ArrowRight') goTo(index + 1)
      else if (e.key === 'ArrowLeft') goTo(index - 1)
      else if (e.key === ' ') {
        e.preventDefault()
        if (mode !== 'watch') changeMode('watch')
        else setPaused((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [changeMode, goTo, index, mode])

  const progress = ((index + (phase === 'screen' ? 0 : phase === 'modal' ? 0.5 : 1)) / workflow.steps.length) * 100
  const s = step.screen

  return (
    <div className={styles.player}>
      {/* ── Controls ───────────────────────────────────────── */}
      <div className={styles.controls}>
        <div className={styles.modeSwitch} role="tablist" aria-label="Demo mode">
          <button
            role="tab"
            aria-selected={mode === 'watch'}
            className={mode === 'watch' ? styles.modeActive : styles.modeBtn}
            onClick={() => changeMode('watch')}
          >
            ▶ Watch
          </button>
          <button
            role="tab"
            aria-selected={mode === 'guided'}
            className={mode === 'guided' ? styles.modeActive : styles.modeBtn}
            onClick={() => changeMode('guided')}
          >
            ☝ Click through
          </button>
        </div>
        <div className={styles.transport}>
          <button className={styles.iconBtn} onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous step">‹</button>
          {mode === 'watch' && (
            <button className={styles.iconBtn} onClick={() => setPaused((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? '❚❚' : '▶'}
            </button>
          )}
          <button className={styles.iconBtn} onClick={next} aria-label="Next step">›</button>
          <span className={styles.counter}>Step {index + 1} / {workflow.steps.length}</span>
        </div>
      </div>
      <div className={styles.progress}><div className={styles.progressFill} style={{ width: `${progress}%` }} /></div>

      <div className={styles.stage}>
        {/* ── Mock app window ───────────────────────────────── */}
        <div className={styles.window} ref={windowRef}>
          <div className={styles.chrome}>
            <span className={styles.dot} style={{ background: '#ff5f57' }} />
            <span className={styles.dot} style={{ background: '#febc2e' }} />
            <span className={styles.dot} style={{ background: '#28c840' }} />
            <span className={styles.url}>hub.efficiensee.io · {s.item}</span>
            <span className={styles.v1Tag}>V1 · demo data</span>
          </div>

          <div className={styles.app}>
            <aside className={styles.sidebar} aria-hidden>
              <div className={styles.sideBrand}>
                <span className={styles.sideLogo}>H</span>
                <span>HarvestHub</span>
              </div>
              {sidebar.map((sec) => {
                const open = sec.name === s.section
                return (
                  <div key={sec.name} className={styles.sideSection}>
                    {sec.group && <div className={styles.sideGroup}>{sec.group}</div>}
                    <div className={open ? styles.sideSectionOpen : styles.sideSectionName}>{sec.name}</div>
                    {open && sec.items.map((it) => (
                      <div key={it} className={it === s.item ? styles.sideItemActive : styles.sideItem}>{it}</div>
                    ))}
                  </div>
                )
              })}
              <div className={styles.sideVersion}>v1.12</div>
            </aside>

            <div className={styles.page} key={`${workflow.id}-${index}`}>
              <div className={styles.pageHead}>
                <div>
                  <div className={styles.crumb}>{s.section} / {s.item}</div>
                  <h3 className={styles.pageTitle}>{s.title}</h3>
                  {s.subtitle && <p className={styles.pageSub}>{s.subtitle}</p>}
                </div>
                {s.actionOn !== 'row' && (
                  <button
                    ref={phase === 'screen' ? targetRef : undefined}
                    className={`${styles.actionBtn} ${phase === 'screen' ? styles.hot : ''}`}
                    onClick={phase === 'screen' ? act : undefined}
                  >
                    {s.action}
                  </button>
                )}
              </div>

              {s.kpis && (
                <div className={styles.kpis}>
                  {s.kpis.map((k) => (
                    <div key={k.label} className={styles.kpi}>
                      <span className={`${styles.kpiValue} ${k.tone ? styles[`text_${k.tone}`] : ''}`}>{k.value}</span>
                      <span className={styles.kpiLabel}>{k.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {s.columns && rows && (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {s.columns.map((c) => <th key={c}>{c}</th>)}
                        {s.actionOn === 'row' && <th />}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, ri) => (
                        <tr key={ri} className={ri === s.focusRow ? styles.focusRow : undefined}>
                          {r.map((c, ci) => <td key={ci}>{renderCell(c)}</td>)}
                          {s.actionOn === 'row' && (
                            <td>
                              {ri === s.focusRow ? (
                                <button
                                  ref={phase === 'screen' ? targetRef : undefined}
                                  className={`${styles.rowBtn} ${phase === 'screen' ? styles.hot : ''}`}
                                  onClick={phase === 'screen' ? act : undefined}
                                >
                                  {s.action}
                                </button>
                              ) : (
                                <span className={styles.rowBtnGhost}>{s.action}</span>
                              )}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {phase === 'modal' && step.modal && (
                <div className={styles.modalBackdrop}>
                  <div className={styles.modal} role="dialog" aria-label={step.modal.title}>
                    <h4 className={styles.modalTitle}>{step.modal.title}</h4>
                    <div className={styles.fields}>
                      {step.modal.fields.map((f) => (
                        <div key={f.label} className={styles.field}>
                          <span className={styles.fieldLabel}>{f.label}</span>
                          <span className={f.scale ? styles.fieldScale : styles.fieldValue}>
                            {f.scale && <span className={styles.scaleDot} />}
                            {f.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    {step.modal.note && <p className={styles.modalNote}>{step.modal.note}</p>}
                    <div className={styles.modalActions}>
                      <span className={styles.cancelBtn}>Cancel</span>
                      <button ref={targetRef} className={`${styles.confirmBtn} ${styles.hot}`} onClick={act}>
                        {step.modal.confirm}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {phase === 'done' && (
                <div className={styles.toast} role="status">
                  <span className={styles.toastCheck}>✓</span>
                  {step.result}
                </div>
              )}
            </div>
          </div>

          {mode === 'watch' && cursor && phase !== 'done' && (
            <div
              className={`${styles.cursor} ${clicking ? styles.cursorClick : ''}`}
              style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2l16 10-7 1.5L9.5 21z" fill="#fff" stroke="#0b1520" strokeWidth="1.5" strokeLinejoin="round" /></svg>
            </div>
          )}
        </div>

        {/* ── Narration ─────────────────────────────────────── */}
        <div className={styles.narration}>
          <span className={styles.stepNum}>Step {index + 1} · {s.item}</span>
          <h3 className={styles.stepHeading}>{step.heading}</h3>
          <p className={styles.stepBody}>{step.body}</p>
          {step.metrc && (
            <div className={styles.metrc}>
              <span className={styles.metrcTag}>METRC</span>
              <span>{step.metrc}</span>
            </div>
          )}
          {mode === 'guided' && (
            <p className={styles.hint}>
              {phase === 'done'
                ? 'Done. Continue to the next step.'
                : <>Click the glowing <strong>{phase === 'modal' ? step.modal!.confirm : s.action}</strong> button in the app.</>}
            </p>
          )}
          {phase === 'done' && mode === 'guided' && (
            <button className={styles.nextBtn} onClick={next}>
              {isLast ? 'Finish walkthrough →' : 'Next step →'}
            </button>
          )}

          <ol className={styles.rail}>
            {workflow.steps.map((st, i) => (
              <li key={st.id}>
                <button
                  className={i === index ? styles.railActive : i < index ? styles.railDone : styles.railItem}
                  onClick={() => goTo(i)}
                >
                  <span className={styles.railDot}>{i < index ? '✓' : i + 1}</span>
                  {st.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
