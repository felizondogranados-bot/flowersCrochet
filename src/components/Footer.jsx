function Footer() {
  return (

    <footer
      id="contacto"
      className="bg-white mt-20 border-t border-pink-100"
    >

      <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-10">

        {/* Marca */}
        <div>

          <h1 className="text-3xl font-bold text-pink-400">
            Flowers Crochet 🌸
          </h1>

          <p className="text-gray-500 mt-4 leading-relaxed">
            Amigurumis, flores y accesorios tejidos
            hechos con amor 💖
          </p>

        </div>

        {/* Información */}
        <div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Información
          </h2>

          <ul className="space-y-3 text-gray-500">

            <li>📦 Pedidos personalizados</li>
            <li>🚚 Envíos nacionales</li>
            <li>💳 SINPE móvil</li>
            <li>🌸 Atención por WhatsApp</li>

          </ul>

        </div>

        {/* Redes */}
        <div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Redes Sociales
          </h2>

          <div className="flex gap-4 text-3xl">

            <a
              href="https://instagram.com/"
              target="_blank"
              className="hover:scale-110 transition"
            >
              📸
            </a>

            <a
              href="https://wa.me/50688115650"
              target="_blank"
              className="hover:scale-110 transition"
            >
              📲
            </a>

            <a
              href="https://tiktok.com/"
              target="_blank"
              className="hover:scale-110 transition"
            >
              🎵
            </a>

          </div>

        </div>

      </div>

      {/* Parte abajo */}
      <div className="border-t border-pink-100 py-5 text-center text-gray-400">

        © 2026 Flowers Crochet 🌸 Todos los derechos reservados.

      </div>

    </footer>
  )
}

export default Footer