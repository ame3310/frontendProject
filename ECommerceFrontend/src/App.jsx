import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import ProductProvider from "./context/ProductProvider";
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </ProductProvider>
  );
};


export default App;
