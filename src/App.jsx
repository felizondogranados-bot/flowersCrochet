/**
 * Temas demostrados en este archivo:
 * ===================================
 * - React: JSX, Componentes
 * - React Router: BrowserRouter, Routes, Route
 * - Context Providers: CartProvider, FavoritesProvider (Composición de componentes)
 * - Módulos ESM: import, export default
 */

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

// Providers de contexto (Estados globales compartidos)
import CartProvider from "./context/CartContext"
import FavoritesProvider from "./context/FavoritesContext"

// Componentes principales de la UI
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"

// Páginas correspondientes a las diferentes rutas
import Home from "./pages/Home"
import Catalogo from "./pages/Catalogo"
import Carrito from "./pages/Carrito"
import Favoritos from "./pages/Favoritos"
import ProductDetail from "./pages/ProductDetail"

/**
 * RESPONSABILIDAD DE LA CARPETA (src/):
 * =====================================
 * Carpeta raíz de código fuente de la aplicación. Contiene el punto de entrada
 * (main.jsx), el componente principal (App.jsx) que estructura la navegación y
 * las configuraciones de estilos globales.
 */

/**
 * Componente App
 * Configura los proveedores de contexto global, define el enrutador y las rutas asociadas.
 */
function App() {

  return (
    /* [JS Avanzado: Composición de Componentes] Anidación limpia de proveedores para inyectar estados globales */
    <CartProvider>
      <FavoritesProvider>

        {/* [React Router] Habilita la navegación SPA usando HTML5 History API */}
        <BrowserRouter basename="/flowersCrochet/">

          {/* Barra de Navegación común */}
          <Navbar />

          {/* Resetea la posición del scroll a 0 al cambiar de ruta */}
          <ScrollToTop />

          {/* Enrutador central con renderizado condicional según la ruta activa */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
          </Routes>

        </BrowserRouter>

      </FavoritesProvider>
    </CartProvider>
  )
}

export default App