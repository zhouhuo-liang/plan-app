import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AppProvider } from './store/AppContext'
import { applyTheme, getTheme } from './lib/theme'

// 尽早应用主题，避免首屏闪烁
applyTheme(getTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
