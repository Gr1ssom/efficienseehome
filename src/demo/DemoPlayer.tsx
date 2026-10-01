import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type Ref } from 'react'
import type { Cell, DemoFrame, DemoModal, DemoScreen, DemoStep, DemoWorkflow, Field, SidebarSection } from './types'
import styles from './DemoPlayer.module.css'
import './hh.css'
import { HotContext } from './hh/hotContext'

type Mode = 'watch' | 'guided'

interface Props {
  workflow: DemoWorkflow
  sidebar: SidebarSection[]
  mode: Mode
  onModeChange: (m: Mode) => void
  onFinish: () => void
}

import { CLICK_MS, DONE_MS, FIRST_FRAME_MS, NEXT_FRAME_MS } from './timing'

/** Expands a step into one frame per click, plus the screen shown when it completes. */
function expand(step: DemoStep): { frames: DemoFrame[]; after: DemoScreen } {
  let frames: DemoFrame[]
  if (step.frames) frames = step.frames
  else {
    const screen = step.screen!
    frames = [{ screen }]
    if (step.modal) frames.push({ screen, modal: step.modal })
  }
  const last = frames[frames.length - 1].screen
  const after = step.after ?? { ...last, rows: step.rowsAfter ?? last.rows }
  return { frames, after }
}

function renderCell(c: Cell) {
  if (typeof c === 'string') return c
  return <span className={`${styles.pill} ${styles[`tone_${c.tone}`]}`}>{c.pill}</span>
}

interface HotProps {
  hot: boolean
  targetRef: Ref<HTMLButtonElement>
  onAct: () => void
}

function ScreenView({ s, hot, targetRef, onAct }: { s: DemoScreen } & HotProps) {
  const actionOn = s.actionOn ?? 'header'
  const headerButtons = s.toolbar ?? []
  const showHeaderAction = !!s.action && actionOn === 'header' && !headerButtons.includes(s.action)
  const hotBtn = (label: string, className: string) => (
    <button
      ref={hot ? targetRef : undefined}
      className={`${className} ${hot ? styles.hot : ''}`}
      onClick={hot ? onAct : undefined}
      tabIndex={hot ? 0 : -1}
    >
      {label}
    </button>
  )

  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <div className={styles.crumb}>{s.section} / {s.item}</div>
          <h3 className={styles.pageTitle}>{s.title}</h3>
          {s.subtitle && <p className={styles.pageSub}>{s.subtitle}</p>}
        </div>
        {(headerButtons.length > 0 || showHeaderAction) && (
          <div className={styles.toolbar}>
            {headerButtons.map((b) =>
              b === s.action && actionOn === 'header'
                ? <span key={b}>{hotBtn(b, styles.actionBtn)}</span>
                : <span key={b} className={styles.toolBtn}>{b}</span>,
            )}
            {showHeaderAction && hotBtn(s.action!, styles.actionBtn)}
          </div>
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

      {s.panels && (
        <div className={styles.panels} style={{ gridTemplateColumns: `repeat(${Math.min(s.panels.length, 4)}, minmax(0, 1fr))` }}>
          {s.panels.map((p, pi) => (
            <div key={p.title} className={styles.panel}>
              <div className={`${styles.panelHead} ${p.tone ? styles[`band_${p.tone}`] : ''}`}>
                <span>{p.title}</span>
                <span className={styles.panelCount}>({p.cards.length} batch{p.cards.length === 1 ? '' : 'es'})</span>
              </div>
              <div className={styles.cards}>
                {p.cards.length === 0 && <p className={styles.empty}>No batches</p>}
                {p.cards.map((c, ci) => {
                  const focus = s.focusCard?.[0] === pi && s.focusCard?.[1] === ci
                  return (
                    <div key={c.title + ci} className={`${styles.card} ${c.selected ? styles.cardSelected : ''} ${focus ? styles.cardFocus : ''}`}>
                      {c.band && <div className={`${styles.cardBand} ${styles[`band_${c.band.tone}`]}`}>{c.band.text}</div>}
                      <div className={styles.cardBody}>
                        <div className={styles.cardTitleRow}>
                          {c.checkbox && <span className={`${styles.checkbox} ${c.selected ? styles.checkboxOn : ''}`}>{c.selected ? '✓' : ''}</span>}
                          <span className={styles.cardTitle}>{c.title}</span>
                          {c.tags?.map((t) => (
                            <span key={t.text} className={`${styles.pill} ${styles[`tone_${t.tone}`]}`}>{t.text}</span>
                          ))}
                        </div>
                        {c.fields && (
                          <div className={styles.cardFields}>
                            {c.fields.map(([l, v]) => (
                              <div key={l}>
                                <span className={styles.cardLabel}>{l}</span>
                                <span className={styles.cardValue}>{v}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {focus && actionOn === 'card' && s.action && (
                          <div className={styles.cardActions}>{hotBtn(s.action, styles.rowBtn)}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {s.columns && s.rows && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {s.columns.map((c) => <th key={c}>{c}</th>)}
                {actionOn === 'row' && <th />}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r, ri) => (
                <tr key={ri} className={ri === s.focusRow ? styles.focusRow : undefined}>
                  {r.map((c, ci) => <td key={ci}>{renderCell(c)}</td>)}
                  {actionOn === 'row' && (
                    <td>
                      {ri === s.focusRow && s.action
                        ? hotBtn(s.action, styles.rowBtn)
                        : s.action && <span className={styles.rowBtnGhost}>{s.action}</span>}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

function FieldView({ f }: { f: Field }) {
  const kind = f.kind ?? 'input'
  const label = f.label && (
    <span className={styles.fieldLabel}>
      {f.label}{f.required && <span className={styles.req}> *</span>}
    </span>
  )
  const cls = f.half ? `${styles.field} ${styles.half}` : styles.field
  switch (kind) {
    case 'heading':
      return <div className={styles.fieldHeading}>{f.label}{f.value && <span className={styles.fieldHeadingTag}>{f.value}</span>}</div>
    case 'note':
      return <p className={styles.fieldNote}>{f.label}</p>
    case 'checks':
      return (
        <div className={styles.field}>
          {label}
          <div className={styles.checks}>
            {f.checks!.map((c) => (
              <span key={c.label} className={styles.checkItem}>
                <span className={`${styles.checkbox} ${c.checked ? styles.checkboxOn : ''}`}>{c.checked ? '✓' : ''}</span>
                {c.label}
              </span>
            ))}
          </div>
        </div>
      )
    case 'card':
      return (
        <div className={`${styles.card} ${f.checked ? styles.cardSelected : ''}`}>
          <div className={styles.cardBody}>
            <div className={styles.cardTitleRow}>
              <span className={`${styles.checkbox} ${f.checked ? styles.checkboxOn : ''}`}>{f.checked ? '✓' : ''}</span>
              <span className={styles.cardTitle}>{f.label}</span>
              {f.tag && <span className={`${styles.pill} ${styles.tone_blue}`}>{f.tag}</span>}
              {f.checked && <span className={`${styles.pill} ${styles.tone_green}`}>Selected</span>}
            </div>
            <div className={styles.cardFields}>
              {f.rows!.map(([l, v]) => (
                <div key={l}>
                  <span className={styles.cardLabel}>{l}</span>
                  <span className={styles.cardValue}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    case 'summary':
      return (
        <div className={styles.summary}>
          {f.label && <span className={styles.summaryTitle}>{f.label}</span>}
          {f.rows!.map(([l, v]) => (
            <div key={l} className={styles.summaryRow}><span>{l}</span><strong>{v}</strong></div>
          ))}
        </div>
      )
    case 'scale':
      return (
        <div className={cls}>
          {label}
          <span className={styles.fieldScale}><span className={styles.scaleDot} />{f.value}</span>
        </div>
      )
    default:
      return (
        <div className={cls}>
          {label}
          <span className={styles.fieldValue}>
            <span>{f.value || <span className={styles.placeholder}>—</span>}</span>
            {kind === 'select' && <span className={styles.caret}>▾</span>}
            {kind === 'date' && <span className={styles.caret}>📅</span>}
            {kind === 'time' && <span className={styles.caret}>🕑</span>}
          </span>
          {f.help && <span className={styles.fieldHelp}>{f.help}</span>}
        </div>
      )
  }
}

function ModalView({ m, targetRef, onAct }: { m: DemoModal } & Omit<HotProps, 'hot'>) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={`${styles.modal} ${m.wide ? styles.modalWide : ''}`} role="dialog" aria-label={m.title}>
        <h4 className={styles.modalTitle}>{m.title}</h4>
        {m.subtitle && <p className={styles.modalSub}>{m.subtitle}</p>}
        <div className={styles.fields}>
          {m.fields.map((f, i) => <FieldView key={f.label + i} f={f} />)}
        </div>
        <div className={styles.modalActions}>
          <span className={styles.cancelBtn}>Cancel</span>
          <button ref={targetRef} className={`${styles.confirmBtn} ${styles.hot}`} onClick={onAct}>
            {m.confirm}
          </button>
        </div>
      </div>
    </div>
  )
}

/** Scrolls the target's scrollable ancestors inside `win` (page, modal body) so it is visible. */
function revealInWindow(target: HTMLElement, win: HTMLElement) {
  for (let el = target.parentElement; el && el !== win; el = el.parentElement) {
    const style = getComputedStyle(el)
    const box = el.getBoundingClientRect()
    const t = target.getBoundingClientRect()
    if (/(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight) {
      if (t.bottom > box.bottom - 12) el.scrollTop += t.bottom - box.bottom + 24
      else if (t.top < box.top + 12) el.scrollTop -= box.top - t.top + 24
    }
    if (/(auto|scroll)/.test(style.overflowX) && el.scrollWidth > el.clientWidth) {
      if (t.right > box.right - 8) el.scrollLeft += t.right - box.right + 16
      else if (t.left < box.left + 8) el.scrollLeft -= box.left - t.left + 16
    }
  }
}

function revealInRail(rail: HTMLElement, item: HTMLElement) {
  if (rail.scrollWidth <= rail.clientWidth) return
  rail.scrollLeft = item.offsetLeft - rail.offsetLeft - rail.clientWidth / 2 + item.clientWidth / 2
}

function resetScroll(el: HTMLElement) {
  el.scrollTop = 0
}

export default function DemoPlayer({ workflow, sidebar, mode, onModeChange, onFinish }: Props) {
  const [index, setIndex] = useState(0)
  const [frame, setFrame] = useState(0)
  const [done, setDone] = useState(false)
  const [paused, setPaused] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)

  const windowRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLOListElement>(null)
  const [target, setTarget] = useState<HTMLButtonElement | null>(null)

  const playing = mode === 'watch' && !paused
  const step = workflow.steps[index]
  const { frames, after } = useMemo(() => expand(step), [step])
  const isLast = index === workflow.steps.length - 1
  const current = frames[frame]
  const screen = done ? after : current.screen

  const changeMode = useCallback((m: Mode) => {
    setPaused(false)
    onModeChange(m)
  }, [onModeChange])

  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(workflow.steps.length - 1, i)))
    setFrame(0)
    setDone(false)
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
    if (done) next()
    else if (frame < frames.length - 1) setFrame(frame + 1)
    else setDone(true)
  }, [done, frame, frames.length, next])

  // Bring the highlighted control into view (scrolling only the mock window's own
  // scroll areas, never the website), then glide the demo cursor to it.
  useLayoutEffect(() => {
    const page = pageRef.current
    const win = windowRef.current
    if (!win) return
    if (page && frame === 0 && !done && (!target || !page.contains(target))) resetScroll(page)
    if (!target || done) return
    revealInWindow(target, win)
    const place = () => {
      const w = win.getBoundingClientRect()
      const t = target.getBoundingClientRect()
      setCursor({ x: t.left - w.left + t.width * 0.6, y: t.top - w.top + t.height * 0.65 })
    }
    place()
    const ro = new ResizeObserver(place)
    ro.observe(win)
    return () => ro.disconnect()
  }, [target, index, frame, done, workflow.id])

  // Keep the current step visible in the step list (a sideways strip on phones).
  useEffect(() => {
    const rail = railRef.current
    const active = rail?.children[index] as HTMLElement | undefined
    if (rail && active) revealInRail(rail, active)
  }, [index])

  // Autoplay ("video") mode.
  useEffect(() => {
    if (!playing) return
    const wait = done ? DONE_MS : frame === 0 ? FIRST_FRAME_MS : NEXT_FRAME_MS
    let t2 = 0
    const t1 = window.setTimeout(() => {
      if (done) {
        next()
        return
      }
      setClicking(true)
      t2 = window.setTimeout(() => {
        setClicking(false)
        act()
      }, CLICK_MS)
    }, wait)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [playing, done, frame, index, act, next])

  // Keyboard: ←/→ between steps, space to play/pause.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
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

  const stepProgress = done ? 1 : frame / (frames.length + 1)
  const progress = ((index + stepProgress) / workflow.steps.length) * 100
  const hotLabel = current.modal ? current.modal.confirm : current.screen.action

  return (
    <div className={styles.player}>
      {/* ── Controls ───────────────────────────────────────── */}
      <div className={styles.controls} data-player-top>
        <div className={styles.modeSwitch} role="tablist" aria-label="Demo mode">
          <button role="tab" aria-selected={mode === 'watch'} className={mode === 'watch' ? styles.modeActive : styles.modeBtn} onClick={() => changeMode('watch')}>
            ▶ Watch
          </button>
          <button role="tab" aria-selected={mode === 'guided'} className={mode === 'guided' ? styles.modeActive : styles.modeBtn} onClick={() => changeMode('guided')}>
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
            <span className={styles.url}>hub.efficiensee.io · {screen.item}</span>
            <span className={styles.v1Tag}>V1 · demo data</span>
          </div>

          <div className={styles.app}>
            <aside className={styles.sidebar} aria-hidden>
              <div className={styles.sideBrand}>
                <span className={styles.sideLogo}>H</span>
                <span>HarvestHub</span>
              </div>
              {sidebar.map((sec) => {
                const open = sec.name === screen.section
                return (
                  <div key={sec.name} className={styles.sideSection}>
                    {sec.group && <div className={styles.sideGroup}>{sec.group}</div>}
                    <div className={open ? styles.sideSectionOpen : styles.sideSectionName}>{sec.name}</div>
                    {open && sec.items.map((it) => (
                      <div key={it} className={it === screen.item ? styles.sideItemActive : styles.sideItem}>{it}</div>
                    ))}
                  </div>
                )
              })}
              <div className={styles.sideVersion}>v1.12</div>
            </aside>

            <div className={styles.pageWrap}>
            <div className={styles.page} ref={pageRef} key={`${workflow.id}-${index}-${screen.item}`}>
              <ScreenView
                s={screen}
                hot={!done && !current.modal}
                targetRef={setTarget}
                onAct={act}
              />
            </div>

              {!done && current.modal && ('real' in current.modal
                ? (
                  <div className={`hh-app ${styles.realHost}`}>
                    <HotContext.Provider value={{ bind: setTarget, onClick: act, className: styles.hot }}>
                      <current.modal.real />
                    </HotContext.Provider>
                  </div>
                )
                : <ModalView m={current.modal} targetRef={setTarget} onAct={act} />)}

              {done && (
                <div className={styles.toast} role="status">
                  <span className={styles.toastCheck}>✓</span>
                  {step.result}
                </div>
              )}
            </div>
          </div>

          {mode === 'watch' && cursor && !done && (
            <div
              className={`${styles.cursor} ${clicking ? styles.cursorClick : ''}`}
              style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2l16 10-7 1.5L9.5 21z" fill="#fff" stroke="#0b1520" strokeWidth="1.5" strokeLinejoin="round" /></svg>
            </div>
          )}
        </div>

        {/* ── Narration: the caption sits above the window on phones ── */}
        <div className={styles.narrTop}>
          <span className={styles.stepNum}>Step {index + 1} · {screen.item}</span>
          <h3 className={styles.stepHeading}>{step.heading}</h3>
          {!done && current.note && <p className={styles.frameNote}>→ {current.note}</p>}
          {mode === 'guided' && (
            <p className={styles.hint}>
              {done ? 'Done. Continue to the next step.' : <>Click the glowing <strong>{hotLabel}</strong> button in the app.</>}
            </p>
          )}
          {done && mode === 'guided' && (
            <button className={styles.nextBtn} onClick={next}>
              {isLast ? 'Finish walkthrough →' : 'Next step →'}
            </button>
          )}
        </div>

        <div className={styles.narrRest}>
          <p className={styles.stepBody}>{step.body}</p>
          {step.metrc && (
            <div className={styles.metrc}>
              <span className={styles.metrcTag}>METRC</span>
              <span>{step.metrc}</span>
            </div>
          )}

          <ol className={styles.rail} ref={railRef}>
            {workflow.steps.map((st, i) => (
              <li key={st.id}>
                <button className={i === index ? styles.railActive : i < index ? styles.railDone : styles.railItem} onClick={() => goTo(i)}>
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
