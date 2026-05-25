/**
 * Categories Component
 * ====================
 * Grid de categorías de productos con efectos hover.
 * Cada categoría es un enlace navegable que filtra por categoría.
 * 
 * IMÁGENES REQUERIDAS (URLs externas):
 * - Flores 🌷
 * - Llaveros 🧸
 * - Amigurumis 🧶
 * - Accesorios 🎀
 * 
 * @component
 * @returns {JSX.Element} Grid de 4 categorías
 */

import { Link } from "react-router-dom"

/**
 * Componente Categories
 * Muestra las categorías principales de productos
 */
function Categories() {

  // Array de categorías con nombre, imagen y ruta de filtrado
  const categorias = [

    {
      nombre: "Flores",
      imagen:
        "/flowersCrochet/imagenesgenerales/flor.png",
      ruta: "/catalogo?categoria=Flores",
    },

    {
      nombre: "Llaveros",
      imagen:
        "/flowersCrochet/imagenesgenerales/llaveroparejas.png",
      ruta: "/catalogo?categoria=Llaveros",
    },

    {
      nombre: "Amigurumis",
      imagen:
        "/flowersCrochet/imagenesgenerales/cristiano.png",
      ruta: "/catalogo?categoria=Amigurumis",
    },

    {
      nombre: "Accesorios",
      imagen:
        "/flowersCrochet/imagenesgenerales/accesorioperro.png",
      ruta: "/catalogo?categoria=Accesorios",
    },

  ]

  return (

    <section className="px-8 py-20">

      {/* Encabezado de categorías */}
      <h1 className="text-4xl font-bold text-gray-800 mb-12">
        ✨Categorías Destacadas✨
      </h1>

      {/* Grid responsivo: 2 columnas en móvil, 4 en desktop */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {categorias.map((categoria, index) => (

          /* Enlace a la categoría - RUTA: /catalogo?categoria=NombreCategoria */
          <Link
            to={categoria.ruta}
            key={index}
            className="relative rounded-[35px] overflow-hidden group cursor-pointer shadow-lg"
          >

            {/* Imagen de la categoría */}
            <img
              src={categoria.imagen}
              alt={categoria.nombre}
              className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Overlay gradiente con texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex items-end justify-center p-6">

              {/* Nombre de la categoría */}
              <h2 className="text-white text-3xl font-bold text-center drop-shadow-lg">
                {categoria.nombre}
              </h2>

            </div>

          </Link>

        ))}

      </div>

    </section>
  )
}

export default Categories