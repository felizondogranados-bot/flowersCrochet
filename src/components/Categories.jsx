function Categories() {

  const categorias = [
    {
      nombre: "Flores 🌷",
      imagen:
        "https://i.pinimg.com/736x/f5/73/9e/f5739ebf5f85c2f6f7dca4b72b0f43d5.jpg",
    },

    {
      nombre: "Llaveros 🧸",
      imagen:
        "https://i.pinimg.com/736x/59/9b/7c/599b7c0d59b28ec8a6d2d4b21dcac8f4.jpg",
    },

    {
      nombre: "Accesorios 🎀",
      imagen:
        "https://i.pinimg.com/736x/9f/92/52/9f9252e68c0e57a8f46db9dc3fc57f0e.jpg",
    },
  ]

  return (
    <section className="px-8 py-20">

      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Categorías 🌸
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {categorias.map((categoria, index) => (

          <div
            key={index}
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
          >

            <img
              src={categoria.imagen}
              alt={categoria.nombre}
              className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">

              <h2 className="text-white text-3xl font-bold">
                {categoria.nombre}
              </h2>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

export default Categories