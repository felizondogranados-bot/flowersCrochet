import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import CartProvider from "./context/CartContext"
import FavoritesProvider from "./context/FavoritesContext"

import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"

import Home from "./pages/Home"
import Catalogo from "./pages/Catalogo"
import Carrito from "./pages/Carrito"
import Favoritos from "./pages/Favoritos"
import ProductDetail from "./pages/ProductDetail"

function App() {

  return (

    <CartProvider>

      <FavoritesProvider>

        <BrowserRouter basename="/flowersCrochet/">

          <Navbar />

          <ScrollToTop />

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/catalogo"
              element={<Catalogo />}
            />

            <Route
              path="/carrito"
              element={<Carrito />}
            />

            <Route
              path="/favoritos"
              element={<Favoritos />}
            />

            <Route
              path="/producto/:id"
              element={<ProductDetail />}
            />

          </Routes>

        </BrowserRouter>

      </FavoritesProvider>

    </CartProvider>

  )

}

export default App