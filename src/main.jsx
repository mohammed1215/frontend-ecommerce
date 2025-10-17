import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductsProvider from './context/ProductsProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './context/CartProvider.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
