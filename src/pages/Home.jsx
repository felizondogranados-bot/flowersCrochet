/**
 * Home Page
 * =========
 * Página principal del sitio web. Muestra:
 * - Sección Hero con introducción y carrusel
 * - Banner deslizable de promociones
 * - Categorías de productos
 * - Información sobre pedidos
 * - Footer
 * 
 * @component
 * @returns {JSX.Element} Página principal completa
 */

import Hero from "../components/Hero"
import BannerSlider from "../components/BannerSlider"
import Categories from "../components/Categories"
import OrderInfo from "../components/OrderInfo"
import Footer from "../components/Footer"

/**
 * Componente Home
 * Orquesta la visualización de todos los componentes principales
 */
function Home() {
  return (
    <>
      {/* Sección Hero - Bienvenida e introducción con carrusel de amigurumis */}
      <Hero />
      
      {/* Banner deslizable - Promociones y colecciones destacadas */}
      <BannerSlider />
      
      {/* Categorías - Grid de productos por categoría */}
      <Categories />
      
      {/* Información de pedidos - Detalles sobre cómo pedir */}
      <OrderInfo />
      
      {/* Footer - Pie de página con información */}
      <Footer />
    </>
  )
}

export default Home