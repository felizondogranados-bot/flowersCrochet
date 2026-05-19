import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import { CartContext } from "../context/CartContext"
import { motion } from "framer-motion"

function ProductCard({ producto }) {

    const { favorites, toggleFavorite } =
        useContext(FavoritesContext)

    const { addToCart } =
        useContext(CartContext)

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

            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-64 object-cover"
            />

            <div className="p-5">

                <div className="flex justify-end">

                    <button
                        onClick={() => toggleFavorite(producto)}
                        className="text-2xl"
                    >
                        {esFavorito ? "💖" : "🤍"}
                    </button>

                </div>

                <h2 className="text-xl font-semibold text-gray-800">
                    {producto.nombre}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                    {producto.categoria}
                </p>

                <p className="text-pink-500 font-bold mt-2">
                    ₡{producto.precio}
                </p>

                <button
                    onClick={() => addToCart(producto)}
                    className="mt-4 w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-full transition"
                >
                    Agregar al carrito 🛒
                </button>

            </div>

        </motion.div>
    )
}

export default ProductCard