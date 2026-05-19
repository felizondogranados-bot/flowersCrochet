import { useState, useContext } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { Link, useNavigate } from "react-router-dom"

import { CartContext } from "../context/CartContext"

function Navbar() {

    const [menuAbierto, setMenuAbierto] = useState(false)

    const { cart } = useContext(CartContext)
    const navigate = useNavigate()

    return (

        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-pink-100">

            <div className="px-8 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-bold text-pink-400"
                >
                    Flowers Crochet 🌸
                </Link>

                {/* Menú Desktop */}
                <ul className="hidden md:flex gap-8 text-gray-700 font-medium">

                    <li>
                        <Link
                            to="/"
                            className="hover:text-pink-400 transition"
                        >
                            Inicio
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/catalogo"
                            className="hover:text-pink-400 transition"
                        >
                            Catálogo
                        </Link>
                    </li>

                    <li>
                        <button

                            onClick={() => {

                                navigate("/")

                                setTimeout(() => {

                                    document
                                        .getElementById("pedidos")
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        })

                                }, 100)

                            }}

                            className="hover:text-pink-400 transition"
                        >

                            Pedidos

                        </button>
                    </li>

                    <li>
                        <button

                            onClick={() => {

                                navigate("/")

                                setTimeout(() => {

                                    document
                                        .getElementById("contacto")
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        })

                                }, 100)

                            }}

                            className="hover:text-pink-400 transition"
                        >

                            Contacto

                        </button>
                    </li>

                </ul>

                {/* Iconos */}
                <div className="hidden md:flex gap-5 text-2xl">

                    {/* Carrito */}
                    <Link
                        to="/carrito"
                        className="relative hover:scale-110 transition"
                    >

                        🛒

                        {cart.length > 0 && (

                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                                {cart.length}

                            </span>

                        )}

                    </Link>

                    {/* Favoritos */}
                    <Link
                        to="/favoritos"
                        className="hover:scale-110 transition"
                    >
                        💖
                    </Link>

                </div>

                {/* Botón móvil */}
                <button
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    className="md:hidden text-3xl text-pink-500"
                >
                    {menuAbierto ? <HiX /> : <HiMenu />}
                </button>

            </div>

            {/* Menú móvil */}
            {menuAbierto && (

                <div className="md:hidden bg-white px-8 pb-6">

                    <ul className="flex flex-col gap-5 text-gray-700 font-medium">

                        <li>
                            <Link
                                to="/"
                                onClick={() => setMenuAbierto(false)}
                                className="hover:text-pink-400 transition"
                            >
                                Inicio
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/catalogo"
                                onClick={() => setMenuAbierto(false)}
                                className="hover:text-pink-400 transition"
                            >
                                Catálogo
                            </Link>
                        </li>

                        <li>
                            <a
                                href="#pedidos"
                                onClick={() => setMenuAbierto(false)}
                                className="hover:text-pink-400 transition"
                            >
                                Pedidos
                            </a>
                        </li>

                        <li>
                            <a
                                href="#contacto"
                                onClick={() => setMenuAbierto(false)}
                                className="hover:text-pink-400 transition"
                            >
                                Contacto
                            </a>
                        </li>

                    </ul>

                    {/* Iconos móvil */}
                    <div className="flex gap-5 text-2xl mt-6">

                        <Link
                            to="/carrito"
                            onClick={() => setMenuAbierto(false)}
                            className="relative hover:scale-110 transition"
                        >

                            🛒

                            {cart.length > 0 && (

                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                                    {cart.length}

                                </span>

                            )}

                        </Link>

                        <Link
                            to="/favoritos"
                            onClick={() => setMenuAbierto(false)}
                            className="hover:scale-110 transition"
                        >
                            💖
                        </Link>

                    </div>

                </div>

            )}

        </nav>
    )
}

export default Navbar