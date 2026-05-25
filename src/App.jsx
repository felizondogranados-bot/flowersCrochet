/**
 * App.jsx - Componente Principal
 * ==============================
 * Punto de entrada de la aplicación.
 * Configura:
 * - Providers de contexto (CartContext, FavoritesContext)
 * - Router para navegación entre páginas
 * - Estructura de rutas de la aplicación
 * 
 * RUTAS DISPONIBLES:
 * - / (Home)
 * - /catalogo (Catálogo de productos)
 * - /carrito (Carrito de compras)
 * - /favoritos (Productos favoritos)
 * - /producto/:id (Detalle de producto)
 * 
 * @component
 * @returns {JSX.Element} Aplicación completa con Router y Providers
 */

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

// Providers de contexto
import CartProvider from "./context/CartContext"
import FavoritesProvider from "./context/FavoritesContext"

// Componentes principales
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"

// Páginas
import Home from "./pages/Home"
import Catalogo from "./pages/Catalogo"
import Carrito from "./pages/Carrito"
import Favoritos from "./pages/Favoritos"
import ProductDetail from "./pages/ProductDetail"

/**
 * Componente App
 * Estructura principal de la aplicación con routing
 */
function App() {

  return (

    /* Provider de carrito - Proporciona contexto a todos los componentes */
    <CartProvider>

      {/* Provider de favoritos - Proporciona contexto de productos favoritos */}
      <FavoritesProvider>

        {/* Router - Habilita navegación entre páginas */}
        <BrowserRouter basename="/flowersCrochet/">

          {/* Navbar - Navegación principal */}
          <Navbar />

          {/* ScrollToTop - Scroll automático al cambiar de ruta */}
          <ScrollToTop />

          {/* Rutas de la aplicación */}
          <Routes>

            {/* Página de inicio */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Catálogo de productos */}
            <Route
              path="/catalogo"
              element={<Catalogo />}
            />

            {/* Carrito de compras */}
            <Route
              path="/carrito"
              element={<Carrito />}
            />

            {/* Productos favoritos */}
            <Route
              path="/favoritos"
              element={<Favoritos />}
            />

            {/* Detalle de un producto específico */}
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