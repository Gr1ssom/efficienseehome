import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HubPage from './pages/HubPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/hub" element={<HubPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
