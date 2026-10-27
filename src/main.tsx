import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { IconContext } from '@phosphor-icons/react'
import './index.css'
import Landing from './pages/Landing'
import AppLayout from './pages/app/AppLayout'
import History from './pages/app/History'
import Search from './pages/app/Search'
import Results from './pages/app/Results'
import CaseView from './pages/app/CaseView'
import Toolkit from './pages/app/Toolkit'

// The desktop build loads from file://, where only hash URLs work.
const Router = window.location.protocol === 'file:' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Icons sit next to text that already names them, so hide them from screen readers. */}
    <IconContext.Provider value={{ 'aria-hidden': true }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Search />} />
            <Route path="results" element={<Results />} />
            <Route path="history" element={<History />} />
            <Route path="cases/:id" element={<CaseView />} />
            <Route path="toolkit" element={<Toolkit />} />
          </Route>
        </Routes>
      </Router>
    </IconContext.Provider>
  </StrictMode>,
)
