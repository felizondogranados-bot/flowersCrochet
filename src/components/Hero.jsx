/**
 * Hero Component
 * ==============
 * Sección principal (Hero) con presentación de la marca.
 * Contiene texto introductorio, botones de acción y un CARRUSEL de imágenes
 * de amigurumis que permite navegar de derecha a izquierda.
 * 
 * IMÁGENES REQUERIDAS:
 * - Múltiples imágenes para el carrusel de amigurumis
 * - /public/patternFlowers.png (patrón de fondo floral)
 * 
 * @component
 * @returns {JSX.Element} Sección Hero con contenido y carrusel
 */

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

/**
 * Componente Hero
 * Sección de bienvenida con llamadas a la acción y carrusel de imágenes
 */
function Hero() {

    // Array de imágenes del carrusel de amigurumis
    const imagenes = [
        {
            url: "https://i.pinimg.com/736x/84/4f/1c/844f1c1ec9f9a14a0ebc9285a5f5d2cf.jpg",
            alt: "Amigurumi Cute 1",
        },
        {
            url: "https://i.pinimg.com/736x/0d/88/47/0d88471975efc60f38c4bcb3f62ef5dd.jpg",
            alt: "Sanrio Collection",
        },
        {
            url: "https://i.pinimg.com/736x/9f/92/52/9f9252e68c0e57a8f46db9dc3fc57f0e.jpg",
            alt: "Accesorios Cute",
        },
        {
            url: "https://i.pinimg.com/736x/9e/14/6d/9e146d5c6815fc39e01cfe1a4f9f4fcb.jpg",
            alt: "Accesorios Cute 2",
        },
    ]

    // Estado del índice actual del carrusel
    const [indexActual, setIndexActual] = useState(0)

    // Efecto para auto-avance del carrusel cada 5 segundos
    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndexActual((prevIndex) => (prevIndex + 1) % imagenes.length)
        }, 5000)

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

        <section
            id="inicio"
            className="relative min-h-screen flex items-center justify-center px-6 md:px-10 py-20 overflow-hidden bg-pink-50"
        >

            {/* Fondo floral - Patrón decorativo */}
            <div

                className="absolute inset-0 opacity-50"

                style={{
                    backgroundImage:
                        "linear-gradient(rgba(244, 132, 166, 0.85), rgba(244, 132, 166, 0.85)), url('/flowersCrochet/patternFlowers.png')",

                    backgroundSize: "cover",

                    backgroundPosition: "center",

                    backgroundRepeat: "no-repeat",
                }}

            ></div>

            {/* Contenido Principal */}
            <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 items-center gap-16">

                {/* Sección de Texto */}
                <div>

                    {/* Subtítulo */}
                    <p className="text-pink-500 font-semibold mb-4 text-lg">
                        Nueva colección 🌸
                    </p>

                    {/* Título principal */}
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
                        Amigurumis & Accesorios Cute
                    </h1>

                    {/* Descripción */}
                    <p className="text-gray-600 mt-6 text-lg md:text-xl leading-relaxed">
                        Descubre flores tejidas, llaveros, accesorios y detalles
                        personalizados hechos con mucho amor 💖
                    </p>

                    {/* Botones de Acción */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-10">

                        {/* Botón Ver Catálogo - RUTA: /catalogo */}
                        <Link
                            to="/catalogo"
                            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg transition text-center shadow-lg"
                        >

                            Ver catálogo 🌸

                        </Link>

                        {/* Botón WhatsApp - Abre chat en WhatsApp */}
                        <a
                            href="https://wa.me/50688115650"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-pink-50 text-pink-500 border border-pink-300 px-8 py-4 rounded-full text-lg transition text-center shadow-lg"
                        >

                            WhatsApp 📲

                        </a>

                    </div>

                </div>

                {/* Sección de CARRUSEL - Reemplaza imagen estática */}
                <div className="flex justify-center relative">

                    {/* Contenedor del Carrusel */}
                    <div className="relative w-full max-w-[500px] rounded-[40px] overflow-hidden shadow-2xl bg-gray-100 h-[500px]">

                        {/* Imagen actual del carrusel con transición suave */}
                        <img
                            src={imagenes[indexActual].url}
                            alt={imagenes[indexActual].alt}
                            className="w-full h-full object-cover transition-opacity duration-700"
                        />

                        {/* Overlay oscuro opcional */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

                        {/* Botón Anterior - Navegar a imagen anterior */}
                        <button
                            onClick={imagenAnterior}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/40 hover:bg-white/70 text-white rounded-full p-2 transition-all duration-300 ml-3"
                            aria-label="Imagen anterior"
                        >
                            <svg
                                className="w-6 h-6"
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

                        {/* Botón Siguiente - Navegar a siguiente imagen */}
                        <button
                            onClick={siguienteImagen}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/40 hover:bg-white/70 text-white rounded-full p-2 transition-all duration-300 mr-3"
                            aria-label="Siguiente imagen"
                        >
                            <svg
                                className="w-6 h-6"
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

                        {/* Contador de imágenes */}
                        <div className="absolute top-4 right-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {indexActual + 1} / {imagenes.length}
                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Hero