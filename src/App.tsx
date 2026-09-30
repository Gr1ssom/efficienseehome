import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HubPage from './pages/HubPage'
import DemoPage from './pages/DemoPage'
import EarlyAccessPage from './pages/EarlyAccessPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/hub" element={<HubPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/early-access" element={<EarlyAccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
