import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AppHeader from './components/Header/Header'
import AppFooter from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Products from './pages/Products/Products'
import ProductDetail from './pages/Products/ProductsDetail'
import AdminPanel from './pages/Admin/Admin'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { ProfilePage } from './pages/Profile/ProfilePage'
import { RequireAuth } from './components/RequireAuth'

function App() {
  return (
    <>
      <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path='/products' element={<Products />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/register' element={<RegisterForm/>} />
            <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>}/>
            <Route path="/admin" 
              element={<RequireAuth
              requiredRole="admin">
              <AdminPanel /></RequireAuth>}
            />
          </Routes>
        </main>
      <AppFooter />  
    </>
  )
}

export default App
