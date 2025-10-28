import { useContext, useEffect, useState } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard.jsx'
import axios from 'axios'
import { ProductContext } from './context/ProductsProvider'
import { Routes, Route } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MainLayout from './components/MainLayout'
import Products from './pages/Products'
import Admin from './pages/Admin'
import SearchPage from './pages/SearchPage'
import SuccessPage from './pages/SuccessPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import ProtectedRouteAuth from './ProtectedRouteAuth.jsx'
import AccountDetails from './pages/AccountDetails.jsx'
import { useTitle } from './customHooks.jsx'
import Info from './components/AccountDetails/Info.jsx'
import { useAuth } from './context/AuthProvider.jsx'

function App() {
  useTitle()
  const { products, setProducts } = useContext(ProductContext)
  const { user } = useAuth()
  const [avatar, setAvatar] = useState(null)
  const [preview, setPreview] = useState(user?.imgPath)



  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchAllData() {
      const { data: products } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, { signal });

      setProducts(products)
    }
    fetchAllData()

    return () => {
      // controller.abort()
    }
  }, [])


  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/account/profile' element={<AccountDetails setAvatar={setAvatar} preview={preview} children={<Info avatar={avatar} setPreview={setPreview} />} />} />
          <Route element={<ProtectedRouteAuth />}>
            <Route path='/account/dashboard' element={<AccountPage />} />
          </Route>
        </Route>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:productId' element={<ProductDetails />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/orders/success' element={<SuccessPage />} />
          <Route path='/account/orders' element={<OrdersPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/admin' element={<Admin />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
