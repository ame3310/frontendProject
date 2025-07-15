import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AppHeader from './components/Header/Header'
import AppFooter from './components/Footer/Footer'
import Cart from './pages/Cart/Cart'
import Products from './pages/Products/Products'

function App() {

  return (
    <>
      <AppHeader />
      <main>
          <Routes>
          {/* <Route path='/' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} /> */}
          <Route path='/products' element={<Products/>} />
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
