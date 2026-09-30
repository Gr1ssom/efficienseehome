import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HubPage from './pages/HubPage'
import OasisPage from './pages/OasisPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/hub" element={<HubPage />} />
      <Route path="/products/oasis" element={<OasisPage />} />
    </Routes>
  )
}
