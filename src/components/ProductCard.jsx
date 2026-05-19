import { useContext, useState } from "react"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl shadow-md overflow-hidden"
        >

            {/* Imagen */}
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-64 object-cover"
            />

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
                <h2 className="text-xl font-semibold text-gray-800">
                    {producto.nombre}
                </h2>

                {/* Categoría */}
                <p className="text-sm text-gray-400 mt-1">
                    {producto.categoria}
                </p>

                {/* Precio */}
                <p className="text-pink-500 font-bold mt-2 text-lg">
                    ₡{producto.precio}
                </p>

                {/* Botón carrito */}
                <button

                    onClick={() => {

                        addToCart(producto)

                        setMensaje(true)

                        setTimeout(() => {
                            setMensaje(false)
                        }, 2000)

                    }}

                    className="mt-4 w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-full transition"
                >
                    Agregar al carrito 🛒
                </button>

                {/* Mensaje */}
                {

                    mensaje && (

                        <p className="text-green-500 text-sm mt-3 font-medium text-center">
                            ✅ Producto añadido al carrito
                        </p>

                    )

                }

            </div>

        </motion.div>
    )
}

export default ProductCard