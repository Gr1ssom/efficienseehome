import { createContext } from 'react'
import type { Hot } from './types'

export const HotContext = createContext<Hot | null>(null)
