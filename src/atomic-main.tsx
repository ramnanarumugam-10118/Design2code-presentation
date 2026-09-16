import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './acko.css'
import './atomic.css'
import AtomicDesignPage from './AtomicDesignPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AtomicDesignPage />
  </StrictMode>,
)
