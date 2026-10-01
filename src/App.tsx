import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HubPage from './pages/HubPage'
import EarlyAccessPage from './pages/EarlyAccessPage'

// The demo carries the recreated HarvestHub screens and icons; load it only when opened.
const DemoPage = lazy(() => import('./pages/DemoPage'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/hub" element={<HubPage />} />
      <Route
        path="/demo"
        element={
          <Suspense fallback={<div style={{ minHeight: '100vh', background: '#080f18' }} />}>
            <DemoPage />
          </Suspense>
        }
      />
      <Route path="/early-access" element={<EarlyAccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
