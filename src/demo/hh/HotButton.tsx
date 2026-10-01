import { useContext, type ReactNode } from 'react'
import { HotContext } from './hotContext'

/**
 * Use in place of the modal's confirm button, keeping HarvestHub's own classes:
 *   <HotButton className="px-4 py-2 bg-blue-600 text-white rounded-lg ...">Load Harvests</HotButton>
 * The demo player wires it up (highlight, click, cursor target).
 */
export default function HotButton({ className = '', children }: { className?: string; children: ReactNode }) {
  const hot = useContext(HotContext)
  return (
    <button ref={hot?.bind} onClick={hot?.onClick} className={`${className} ${hot?.className ?? ''}`}>
      {children}
    </button>
  )
}
