/**
 * CarouselAmigurumisCute Component
 * ================================
 * Componente que muestra un carrusel interactivo de imágenes de amigurumis
 * y accesorios cute con animaciones de deslizamiento de derecha a izquierda.
 * 
 * @component
 * @returns {JSX.Element} Carrusel con imágenes deslizables
 * 
 * IMAGEN REQUERIDA: /public/products/amigurumi.jpg (múltiples imágenes de amigurumis)
 */

import { useState, useEffect } from "react"

function CarouselAmigurumisCute() {
  // Array de imágenes del carrusel - AGREGAR MÁS IMÁGENES AQUÍ
  const imagenes = [
    {
      url: "https://i.pinimg.com/736x/84/4f/1c/844f1c1ec9f9a14a0ebc9285a5f5d2cf.jpg",
      alt: "Amigurumi Cute 1",
    },
    {
      url: "https://i.pinimg.com/736x/9f/92/52/9f9252e68c0e57a8f46db9dc3fc57f0e.jpg",
      alt: "Accesorios Cute 1",
    },
    {
      url: "https://i.pinimg.com/736x/0d/88/47/0d88471975efc60f38c4bcb3f62ef5dd.jpg",
      alt: "Sanrio Collection",
    },
    {
      url: "https://i.pinimg.com/736x/9e/14/6d/9e146d5c6815fc39e01cfe1a4f9f4fcb.jpg",
      alt: "Accesorios Cute 2",
    },
  ]

  // Estado del índice actual del carrusel
  const [indexActual, setIndexActual] = useState(0)

  // Efecto para auto-avance del carrusel cada 4 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexActual((prevIndex) => (prevIndex + 1) % imagenes.length)
    }, 4000)

    return () => clearInterval(intervalo)
  }, [imagenes.length])

  /**
   * Navega hacia la siguiente imagen (derecha a izquierda)
   * @function
   */
  const siguienteImagen = () => {
    setIndexActual((prevIndex) => (prevIndex + 1) % imagenes.length)
  }

  /**
   * Navega hacia la imagen anterior (izquierda a derecha)
   * @function
   */
  const imagenAnterior = () => {
    setIndexActual((prevIndex) =>
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="px-8 py-20 bg-gradient-to-b from-pink-100 to-white">
      {/* Encabezado */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Amigurumis & Accesorios Cute 🧶
        </h2>
        <p className="text-gray-600 text-lg">
          Descubre nuestras creaciones más adorables tejidas con mucho amor 💖
        </p>
      </div>

      {/* Contenedor del Carrusel */}
      <div className="max-w-5xl mx-auto">
        {/* Carrusel Principal */}
        <div className="relative rounded-[40px] overflow-hidden shadow-2xl bg-gray-100 h-[400px] md:h-[600px]">
          {/* Imagen actual con transición suave */}
          <img
            src={imagenes[indexActual].url}
            alt={imagenes[indexActual].alt}
            className="w-full h-full object-cover transition-opacity duration-700"
          />

          {/* Overlay oscuro opcional */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          {/* Botón Anterior - FUNCIONALIDAD: Mover a la imagen anterior */}
          <button
            onClick={imagenAnterior}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition-all duration-300 ml-4 md:ml-6"
            aria-label="Imagen anterior"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Botón Siguiente - FUNCIONALIDAD: Mover a la siguiente imagen */}
          <button
            onClick={siguienteImagen}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition-all duration-300 mr-4 md:mr-6"
            aria-label="Siguiente imagen"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Indicadores de posición (puntitos) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {imagenes.map((_, index) => (
              <button
                key={index}
                onClick={() => setIndexActual(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === indexActual
                    ? "bg-white w-8 h-2"
                    : "bg-white/50 w-2 h-2 hover:bg-white/75"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Información y Contador */}
        <div className="mt-8 flex justify-between items-center text-center md:text-left">
          <div className="text-gray-700">
            <p className="font-semibold">
              {indexActual + 1} de {imagenes.length}
            </p>
            <p className="text-sm text-gray-500">
              {imagenes[indexActual].alt}
            </p>
          </div>

          {/* Botón para ir al catálogo */}
          <a
            href="/flowersCrochet/catalogo?categoria=Amigurumis"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg"
          >
            Ver todos 🌸
          </a>
        </div>
      </div>
    </section>
  )
}

export default CarouselAmigurumisCute
