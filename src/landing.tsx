import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IconContext } from '@phosphor-icons/react'
import './index.css'
import Landing from './pages/Landing'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Icons sit next to text that already names them, so hide them from screen readers. */}
    <IconContext.Provider value={{ 'aria-hidden': true }}>
      <Landing />
    </IconContext.Provider>
  </StrictMode>,
)
