import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Catalogo from "./pages/Catalogo"
import Favoritos from "./pages/Favoritos"
import ScrollToTop from "./components/ScrollToTop"
import Carrito from "./pages/Carrito"

import {
  Routes,
  Route,
} from "react-router-dom"

function App() {

  return (

    <>
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
            path="/favoritos"
            element={<Favoritos />}
          />

          <Route
            path="/carrito"
            element={<Carrito />}
          />

        </Routes>

      </div>
    </>
  )
}

export default App