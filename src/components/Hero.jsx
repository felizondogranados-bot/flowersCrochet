import { Link } from "react-router-dom"

function Hero() {

  return (

    <section
      id="inicio"
      className="bg-pink-100 min-h-screen flex items-center justify-center px-6 md:px-10 py-20"
    >

      <div className="max-w-7xl w-full grid md:grid-cols-2 items-center gap-16">

        {/* Texto */}
        <div>

          <p className="text-pink-500 font-semibold mb-4 text-lg">
            Nueva colección 🌸
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
            Amigurumis & Accesorios Cute
          </h1>

          <p className="text-gray-600 mt-6 text-lg md:text-xl leading-relaxed">
            Descubre flores tejidas, llaveros, accesorios y detalles
            personalizados hechos con mucho amor 💖
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            {/* Catálogo */}
            <Link
              to="/catalogo"
              className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 rounded-full text-lg transition text-center shadow-md"
            >
              Ver catálogo 🌸
            </Link>

            {/* WhatsApp */}
            <a
              href="https://wa.me/50688115650"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-pink-50 text-pink-500 border border-pink-300 px-8 py-4 rounded-full text-lg transition text-center shadow-md"
            >
              WhatsApp 📲
            </a>

          </div>

        </div>

        {/* Imagen */}
        <div className="flex justify-center">

          <img
            src="https://i.pinimg.com/736x/5f/52/88/5f5288c0a88d16e8db3f0ef6f9b9f4a7.jpg"
            alt="Amigurumi"
            className="rounded-[40px] shadow-2xl w-full max-w-[500px] object-cover"
          />

        </div>

      </div>

    </section>
  )
}

export default Hero