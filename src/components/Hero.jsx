import { Link } from "react-router-dom"

function Hero() {

    return (

        <section
            id="inicio"
            className="relative min-h-screen flex items-center justify-center px-6 md:px-10 py-20 overflow-hidden bg-pink-50"
        >

            {/* Fondo floral */}
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

            {/* Contenido */}
            <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 items-center gap-16">

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

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">

                        <a
                            href="#catalogo"
                            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg transition text-center shadow-lg"
                        >
                            Ver catálogo 🌸
                        </a>

                        <a
                            href="https://wa.me/50688115650"
                            target="_blank"
                            className="bg-white hover:bg-pink-50 text-pink-500 border border-pink-300 px-8 py-4 rounded-full text-lg transition text-center shadow-lg"
                        >
                            WhatsApp 📲
                        </a>

                    </div>

                </div>

                {/* Imagen */}
                <div className="flex justify-center">

                    <img
                        src="/flowersCrochet/hero.jpg"
                        alt="Amigurumi"
                        className="rounded-[40px] shadow-2xl w-full max-w-[500px] object-cover"
                    />

                </div>

            </div>

        </section>
    )
}

export default Hero