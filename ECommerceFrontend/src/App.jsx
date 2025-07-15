import {Routes, Route} from 'react-router-dom'
import AppHeader from './components/Header/Header'
import AppFooter from './components/Footer/Footer'
import { OrderProvider } from './context/OrderState/OrderState'
import Cart from './pages/Cart/Cart'

function App() {

  return (
    <>
      <AppHeader />
      <main>
        <Routes>
          {/* <Route path='/' element={<Home/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/profile' element={<Profile/>} /> */}
          <Route path='/cart' element={<Cart/>} />
          {/* <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} /> */}
        </Routes>
      </main>
      <AppFooter/>
    </>
  )
}

export default App
