import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AppHeader from './components/Header/Header'
import AppFooter from './components/Footer/Footer'
import Home from './pages/Home'
import Cart from './pages/Cart/Cart'
import Products from './pages/Products'
import ProductDetail from './pages/ProductsDetail'
import AdminPanel from './pages/Admin/Admin'

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/products/:id' element={<ProductDetail />} />
          {/* <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} /> */}
          <Route path='/admin' element={<AdminPanel />} /> 
        </Routes>
      </main>
      <AppFooter />  
    </>
  )
}

export default App
