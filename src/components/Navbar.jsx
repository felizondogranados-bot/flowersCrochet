/**
 * Temas demostrados en este archivo:
 * ===================================
 * - React: useState, useContext
 * - React Router: Link, useNavigate
 * - Eventos: onClick
 * - JS Moderno: const/let, arrow functions, destructuring
 */

import { useState, useContext } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { Link, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"

/**
 * RESPONSABILIDAD DE LA CARPETA (src/components):
 * ===============================================
 * Esta carpeta contiene componentes reutilizables de la interfaz de usuario.
 * Son piezas de interfaz modulares que reciben datos por Props o acceden al
 * estado global por Context, encargadas de renderizar la vista y capturar
 * interacciones del usuario mediante eventos de DOM.
 */

/**
 * Componente Navbar
 * Barra de navegación principal que permite alternar rutas y ver estado del carrito/favoritos.
 */
function Navbar() {
    // [React: useState] Estado local para rastrear si el menú móvil está abierto o cerrado
    const [menuAbierto, setMenuAbierto] = useState(false)

    // [React: useContext] Leemos la longitud del carrito desde el contexto global
    const { cart } = useContext(CartContext)
    const navigate = useNavigate()

    return (
        <nav className="sticky top-0 z-50 bg-[#fbd8e0] border-b border-pink-200 transition duration-300">
            <div className="px-8 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-bold text-pink-400"
                >
                    <img
                        src="/flowersCrochet/logo.png"
                        alt="Flowers Crochet"
                        className="h-10 object-contain"
                    />
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
                            // [DOM/Eventos: onClick] Manejador de evento que redirige a inicio y hace scroll suave a la sección información
                            onClick={() => {
                                navigate("/")
                                setTimeout(() => {
                                    document
                                        .getElementById("información")
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        })
                                }, 100)
                            }}
                            className="hover:text-pink-400 transition cursor-pointer"
                        >
                            Información
                        </button>
                    </li>

                    <li>
                        <button
                            // [DOM/Eventos: onClick] Redirige e implementa scroll suave hacia la sección de contacto
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
                            className="hover:text-pink-400 transition cursor-pointer"
                        >
                            Contacto
                        </button>
                    </li>
                </ul>

                {/* Iconos (Desktop) */}
                <div className="hidden md:flex gap-6 items-center text-2xl">

                    {/* Carrito */}
                    <Link
                        to="/carrito"
                        className="relative hover:scale-110 transition"
                        title="Ver Carrito"
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
                        title="Ver Favoritos"
                    >
                        💖
                    </Link>

                </div>

                {/* Botón menú móvil */}
                <button
                    // [DOM/Eventos: onClick] Alterna el estado del menú colapsable móvil
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    className="md:hidden text-3xl text-pink-500 cursor-pointer"
                >
                    {menuAbierto ? <HiX /> : <HiMenu />}
                </button>

            </div>

            {/* Menú móvil */}
            {menuAbierto && (
                <div className="md:hidden bg-white px-8 pb-6 border-b border-pink-100 transition duration-300">
                    <ul className="flex flex-col gap-5 text-gray-700 font-medium">
                        <li>
                            <Link
                                to="/"
                                onClick={() => setMenuAbierto(false)}
                                className="hover:text-pink-400 transition block"
                            >
                                Inicio
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/catalogo"
                                onClick={() => setMenuAbierto(false)}
                                className="hover:text-pink-400 transition block"
                            >
                                Catálogo
                            </Link>
                        </li>

                        <li>
                            <a
                                href="#información"
                                onClick={() => setMenuAbierto(false)}
                                className="hover:text-pink-400 transition block"
                            >
                                Información
                            </a>
                        </li>

                        <li>
                            <a
                                href="#contacto"
                                onClick={() => setMenuAbierto(false)}
                                className="hover:text-pink-400 transition block"
                            >
                                Contacto
                            </a>
                        </li>
                    </ul>

                    {/* Iconos móvil */}
                    <div className="flex gap-6 items-center text-2xl mt-6 pt-4 border-t border-gray-100">

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