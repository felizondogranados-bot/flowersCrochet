/**
 * BannerSlider Component
 * ======================
 * Carrusel automático de banners con promociones y colecciones destacadas.
 * Se desplaza automáticamente cada 3 segundos con efecto loop.
 * 
 * IMÁGENES REQUERIDAS (URLs externas o locales):
 * - Colección Sanrio 🌸
 * - Flores Crochet 💖  
 * - Accesorios Cute 🎀
 * 
 * @component
 * @returns {JSX.Element} Carrusel de banners con autoplay
 */

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

// Estilos de Swiper
import "swiper/css"

/**
 * Componente BannerSlider
 * Muestra un carrusel automático de banners promocionales
 */
function BannerSlider() {

  // Array de banners con título e imagen
  // IMÁGENES REQUERIDAS: Actualizar URLs si deseas usar imágenes locales en /public/
  const banners = [

    {
      titulo: "Amigurumis",
      imagen:
        "/flowersCrochet/imagenesgenerales/amigurumis.png",
    },

    {
      titulo: "Flores",
      imagen:
        "/flowersCrochet/imagenesgenerales/flores.png",
    },

    {
      titulo: "Llaveros",
      imagen:
        "/flowersCrochet/imagenesgenerales/llaveros.png",
    },

  ]

  return (

    <section className="px-8 py-10">

      {/* Swiper: Carrusel automático con autoplay */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000, // Cambiar de banner cada 3 segundos
        }}
        loop={true} // Repetir infinitamente
      >

        {banners.map((banner, index) => (

          <SwiperSlide key={index}>

            {/* Contenedor del banner con altura fija */}
            <div className="relative rounded-3xl overflow-hidden h-[500px]">

              {/* Imagen de fondo del banner */}
              <img
                src={banner.imagen}
                alt={banner.titulo}
                className="w-full h-full object-cover"
              />

              {/* Overlay oscuro para mejorar legibilidad del texto */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">

                {/* Título del banner */}
                <h1 className="text-white text-5xl font-bold text-center">
                  {banner.titulo}
                </h1>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>
  )
}

export default BannerSlider