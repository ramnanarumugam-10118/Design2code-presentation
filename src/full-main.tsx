import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './acko.css'
import './index.css'
import App from './App.tsx'
import { slidesFull } from './slides'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App deck={slidesFull} />
  </StrictMode>,
)
