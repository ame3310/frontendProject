import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "./components/Header/Header";
import AppFooter from "./components/Footer/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductsDetail";
import { ProductsProvider } from "./context/ProductsContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductsProvider>
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <RequireAuth>
                <Route path="/profile" element={<Profile />} />
              </RequireAuth>
              <Route path="/products" element={<Products />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <AppFooter />
        </ProductsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
