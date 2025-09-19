import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@sbddesign/bui-ui/tokens.css'
import './tokens.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
