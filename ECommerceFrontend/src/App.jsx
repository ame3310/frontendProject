
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductsDetail.jsx";
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AppHeader from './components/Header/Header'
import AppFooter from './components/Footer/Footer'
import Home from './pages/Home'
import Cart from './pages/Cart/Cart'
import Products from './pages/Products'


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
      <AppHeader />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart/>} />
          {/* <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} /> */}
        </Routes>
      </main>
      <AppFooter />
    </>
  );
}

export default App;
