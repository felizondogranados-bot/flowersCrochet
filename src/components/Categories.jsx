import { Link } from "react-router-dom"

function Categories() {

  const categorias = [

    {
      nombre: "Flores 🌷",
      imagen:
        "https://i.pinimg.com/736x/f5/73/9e/f5739ebf5f85c2f6f7dca4b72b0f43d5.jpg",
      ruta: "/catalogo?categoria=Flores",
    },

    {
      nombre: "Llaveros 🧸",
      imagen:
        "https://i.pinimg.com/736x/59/9b/7c/599b7c0d59b28ec8a6d2d4b21dcac8f4.jpg",
      ruta: "/catalogo?categoria=Llaveros",
    },

    {
      nombre: "Amigurumis 🧶",
      imagen:
        "https://i.pinimg.com/736x/84/4f/1c/844f1c1ec9f9a14a0ebc9285a5f5d2cf.jpg",
      ruta: "/catalogo?categoria=Amigurumis",
    },

    {
      nombre: "Accesorios 🎀",
      imagen:
        "https://i.pinimg.com/736x/9f/92/52/9f9252e68c0e57a8f46db9dc3fc57f0e.jpg",
      ruta: "/catalogo?categoria=Accesorios",
    },

  ]

  return (

    <section className="px-8 py-20">

      <h1 className="text-4xl font-bold text-gray-800 mb-12">
        Categorías 🌸
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {categorias.map((categoria, index) => (

          <Link
            to={categoria.ruta}
            key={index}
            className="relative rounded-[35px] overflow-hidden group cursor-pointer shadow-lg"
          >

            <img
              src={categoria.imagen}
              alt={categoria.nombre}
              className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex items-end justify-center p-6">

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