import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Catalogo from "./pages/Catalogo"
import Favoritos from "./pages/Favoritos"
import ScrollToTop from "./components/ScrollToTop"
import Carrito from "./pages/Carrito"
import ProductDetail from "./pages/ProductDetail"
import Admin from "./pages/Admin"

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

function App() {

  return (

    <BrowserRouter basename="/flowersCrochet">

      <ScrollToTop />

      <div className="bg-pink-50 min-h-screen">

        <Navbar />

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
          path="/admin" 
          element={<Admin />} />

          <Route
            path="/favoritos"
            element={<Favoritos />}
          />

          <Route
            path="/carrito"
            element={<Carrito />}
          />
          <Route
            path="/producto/:id"
            element={<ProductDetail />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App