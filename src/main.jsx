import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'C:/Users/manumiki/Documents/sistemaLogin/node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'C:/Users/manumiki/Documents/sistemaLogin/node_modules/bootstrap/dist/js/bootstrap.min.js';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
