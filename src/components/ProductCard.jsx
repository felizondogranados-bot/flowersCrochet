import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import { FavoritesContext } from "../context/FavoritesContext"
import { CartContext } from "../context/CartContext"

import { motion } from "framer-motion"

function ProductCard({ producto }) {

    const { favorites, toggleFavorite } =
        useContext(FavoritesContext)

    const { addToCart } =
        useContext(CartContext)

    const [mensaje, setMensaje] = useState(false)

    const esFavorito = favorites.find(
        (item) => item.id === producto.id
    )

    return (

        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[35px] shadow-lg overflow-hidden border border-pink-100"
        >

            {/* Imagen */}
            <Link to={`/producto/${producto.id}`}>

                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                />

            </Link>

            <div className="p-5">

                {/* Favoritos */}
                <div className="flex justify-end">

                    <button
                        onClick={() => toggleFavorite(producto)}
                        className="text-2xl hover:scale-110 transition"
                    >

                        {esFavorito ? "💖" : "🤍"}

                    </button>

                </div>

                {/* Nombre */}
                <Link to={`/producto/${producto.id}`}>

                    <h2 className="text-2xl font-bold text-gray-800 hover:text-pink-500 transition">

                        {producto.nombre}

                    </h2>

                </Link>

                {/* Categoría */}
                <p className="text-sm text-gray-400 mt-1">
                    {producto.categoria}
                </p>

                {/* Precio */}
                <p className="text-pink-500 font-bold mt-3 text-2xl">
                    ₡{producto.precio}
                </p>

                {/* Descripción */}
                <p className="text-gray-500 mt-3 text-sm leading-relaxed line-clamp-3">

                    {producto.descripcion}

                </p>

                {/* Botones */}
                <div className="flex flex-col gap-3 mt-5">

                    {/* Ver producto */}
                    <Link
                        to={`/producto/${producto.id}`}
                        className="w-full bg-pink-100 hover:bg-pink-200 text-pink-600 py-3 rounded-full text-center font-medium transition"
                    >

                        Ver producto 🌸

                    </Link>

                    {/* Carrito */}
                    <button

                        onClick={() => {

                            addToCart(producto)

                            setMensaje(true)

                            setTimeout(() => {

                                setMensaje(false)

                            }, 2000)

                        }}

                        className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-full transition font-medium shadow-md"
                    >

                        Agregar al carrito 🛒

                    </button>

                </div>

                {/* Mensaje */}
                {

                    mensaje && (

                        <p className="text-green-500 text-sm mt-4 font-medium text-center">

                            ✅ Producto añadido al carrito

                        </p>

                    )

                }

            </div>

        </motion.div>
    )
}

export default ProductCard