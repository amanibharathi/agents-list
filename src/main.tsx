import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactQueryProvider from './provider/ReactQueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider>
    <App />
  </ReactQueryProvider>
)
