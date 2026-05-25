import { useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { FavoritesContext } from "../context/FavoritesContext"
import productos from "../data/products"

function ProductDetail() {

    const { addToCart } = useContext(CartContext)
    const { favorites, toggleFavorite } = useContext(FavoritesContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const producto = productos.find(p => p.id === parseInt(id))

    if (!producto) {
        return (
            <section className="min-h-screen bg-pink-50 px-8 py-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Producto no encontrado 😢</h1>
                    <button
                        onClick={() => navigate("/catalogo")}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full transition"
                    >
                        Volver al catálogo
                    </button>
                </div>
            </section>
        )
    }

    const esFavorito = favorites.find(item => item.id === producto.id)

    const coloresFlor = [

        {
            nombre: "Rosado",
            codigo: "#ff69b4"
        },

        {
            nombre: "Rojo",
            codigo: "#ff0000"
        },

        {
            nombre: "Blanco",
            codigo: "#ffffff"
        },

        {
            nombre: "Negro",
            codigo: "#000000"
        },

        {
            nombre: "Lila",
            codigo: "#9370db"
        },

        {
            nombre: "Celeste",
            codigo: "#87ceeb"
        },

        {
            nombre: "Verde",
            codigo: "#90ee90"
        },

        {
            nombre: "Amarillo",
            codigo: "#ffd700"
        },

        {
            nombre: "Naranja",
            codigo: "#ffb347"
        },

        {
            nombre: "Menta",
            codigo: "#98d8c8"
        }

    ]

    const coloresDecoracion = [

        {
            nombre: "Dorado",
            codigo: "#d4af37"
        },

        {
            nombre: "Plateado",
            codigo: "#c0c0c0"
        },

        {
            nombre: "Blanco",
            codigo: "#ffffff"
        },

        {
            nombre: "Negro",
            codigo: "#000000"
        },

        {
            nombre: "Rosado Pastel",
            codigo: "#f8c8dc"
        }

    ]

    const [colorFlor, setColorFlor] = useState("")
    const [otroColorFlor, setOtroColorFlor] = useState("")
    const [colorDecoracion, setColorDecoracion] = useState("")
    const [otraDecoracion, setOtraDecoracion] = useState("")
    const [cantidad, setCantidad] = useState(1)
    const [descripcionCliente, setDescripcionCliente] = useState("")

    const agregarCarrito = () => {
        if (!colorFlor && !otroColorFlor) {
            alert("Por favor selecciona un color para la flor 🌸")
            return
        }

        const productoCarrito = {
            ...producto,
            colorFlor: colorFlor === "otro" ? otroColorFlor : colorFlor,
            colorDecoracion: colorDecoracion === "otro" ? otraDecoracion : colorDecoracion,
            cantidad,
            descripcionCliente,
            cartId: Date.now()
        }

        addToCart(productoCarrito)
        alert(`✨ ¡${producto.nombre} agregado al carrito! ✨`)

        // Resetear formulario
        setColorFlor("")
        setOtroColorFlor("")
        setColorDecoracion("")
        setOtraDecoracion("")
        setCantidad(1)
        setDescripcionCliente("")
    }

    return (
        <section className="min-h-screen bg-pink-50 px-4 md:px-8 py-20">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-start">

                {/* Imagen del Producto */}
                <div className="flex flex-col gap-6">
                    <div className="relative rounded-3xl shadow-2xl overflow-hidden bg-white">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-full h-[400px] md:h-[500px] object-cover"
                        />
                    </div>
                </div>

                {/* Información del Producto */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                        {producto.nombre}
                    </h1>

                    {/* Categoría y Precio */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-pink-200 text-pink-700 px-4 py-2 rounded-full font-semibold">
                            {producto.categoria}
                        </span>
                        <p className="text-3xl md:text-4xl font-bold text-pink-500">
                            ₡{producto.precio.toLocaleString()}
                        </p>
                    </div>

                    {/* Descripción */}
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        {producto.descripcion}
                    </p>

                    {/* Separador */}
                    <div className="h-1 bg-gradient-to-r from-pink-300 to-pink-100 mb-8 rounded-full"></div>

                    {/* COLOR FLOR */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold mb-5 text-gray-800">
                            🌸 Color de la flor
                        </h3>

                        <div className="flex flex-wrap gap-4 mb-6">
                            {coloresFlor.map((color) => (
                                <button
                                    key={color.codigo}
                                    onClick={() => {
                                        setColorFlor(color)
                                        setOtroColorFlor("")
                                    }}
                                    className={`w-14 h-14 rounded-full border-4 transition transform hover:scale-110 ${colorFlor?.codigo === color.codigo
                                        ? "border-gray-900 scale-110 shadow-lg"
                                        : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    style={{ backgroundColor: color.codigo }}
                                    title={color.nombre}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setColorFlor("otro")}
                            className={`px-6 py-3 rounded-full font-semibold transition ${colorFlor === "otro"
                                ? "bg-pink-500 text-white"
                                : "bg-pink-100 hover:bg-pink-200 text-pink-700"
                                }`}
                        >
                            ✨ Otro color
                        </button>

                        {colorFlor === "otro" && (
                            <input
                                type="text"
                                placeholder="Ej: Azul marino, Morado, etc..."
                                value={otroColorFlor}
                                onChange={(e) => setOtroColorFlor(e.target.value)}
                                className="mt-4 w-full px-5 py-3 rounded-xl border-2 border-pink-300 outline-none focus:border-pink-500 transition"
                            />
                        )}

                        {(colorFlor && colorFlor !== "otro") && (
                            <div className="mt-4 p-4 bg-white rounded-xl border-2 border-pink-200 flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    style={{ backgroundColor: colorFlor.codigo }}
                                ></div>
                                <span className="font-semibold text-gray-700">
                                    {colorFlor.nombre}
                                </span>
                            </div>
                        )}

                        {otroColorFlor && (
                            <div className="mt-4 p-4 bg-white rounded-xl border-2 border-pink-200">
                                <span className="font-semibold text-gray-700">Color: {otroColorFlor}</span>
                            </div>
                        )}
                    </div>

                    {/* DECORACIÓN */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold mb-5 text-gray-800">
                            🎀 Color de decoración (Opcional)
                        </h3>

                        <div className="flex flex-wrap gap-4 mb-6">
                            {coloresDecoracion.map((color) => (
                                <button
                                    key={color.codigo}
                                    onClick={() => {
                                        setColorDecoracion(color)
                                        setOtraDecoracion("")
                                    }}
                                    className={`w-14 h-14 rounded-full border-4 transition transform hover:scale-110 ${colorDecoracion?.codigo === color.codigo
                                            ? "border-gray-900 scale-110 shadow-lg"
                                            : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    style={{ backgroundColor: color.codigo }}
                                    title={color.nombre}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setColorDecoracion("otro")}
                            className={`px-6 py-3 rounded-full font-semibold transition ${colorDecoracion === "otro"
                                ? "bg-pink-500 text-white"
                                : "bg-pink-100 hover:bg-pink-200 text-pink-700"
                                }`}
                        >
                            ✨ Otro color
                        </button>

                        {colorDecoracion === "otro" && (
                            <input
                                type="text"
                                placeholder="Ej: Dorado, Plata, etc..."
                                value={otraDecoracion}
                                onChange={(e) => setOtraDecoracion(e.target.value)}
                                className="mt-4 w-full px-5 py-3 rounded-xl border-2 border-pink-300 outline-none focus:border-pink-500 transition"
                            />
                        )}

                        {colorDecoracion && colorDecoracion !== "otro" && (
                            <div className="mt-4 p-4 bg-white rounded-xl border-2 border-pink-200 flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    style={{ backgroundColor: colorDecoracion.codigo }}
                                ></div>
                                <span className="font-semibold text-gray-700">{colorDecoracion.nombre}</span>
                            </div>
                        )}
                    </div>

                    {/* CANTIDAD */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold mb-5 text-gray-800">
                            📦 Cantidad
                        </h3>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                                className="bg-pink-200 hover:bg-pink-300 text-pink-700 w-12 h-12 rounded-lg font-bold text-xl transition"
                            >
                                −
                            </button>

                            <input
                                type="number"
                                min="1"
                                value={cantidad}
                                onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                                className="w-20 px-4 py-3 border-2 border-pink-300 rounded-lg text-center font-bold text-lg outline-none focus:border-pink-500 transition"
                            />

                            <button
                                onClick={() => setCantidad(cantidad + 1)}
                                className="bg-pink-200 hover:bg-pink-300 text-pink-700 w-12 h-12 rounded-lg font-bold text-xl transition"
                            >
                                +
                            </button>

                            <span className="text-gray-600 font-semibold ml-4">
                                Subtotal: ₡{(producto.precio * cantidad).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold mb-5 text-gray-800">
                            💬 Detalles especiales (Opcional)
                        </h3>

                        <textarea
                            placeholder="Escribe aquí cualquier detalle especial que desees (máximo 200 caracteres)..."
                            value={descripcionCliente}
                            onChange={(e) => setDescripcionCliente(e.target.value.slice(0, 200))}
                            maxLength="200"
                            className="w-full h-24 px-5 py-4 rounded-2xl border-2 border-pink-300 outline-none focus:border-pink-500 transition resize-none"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            {descripcionCliente.length}/200 caracteres
                        </p>
                    </div>

                    {/* BOTÓN AGREGAR AL CARRITO */}
                    <button
                        onClick={agregarCarrito}
                        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3 mb-4"
                    >
                        🛒 Agregar al carrito
                    </button>

                    {/* Botón volver */}
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 px-10 py-3 rounded-2xl text-lg font-semibold transition"
                    >
                        ← Volver
                    </button>

                </div>

            </div>
        </section>
    )
}

export default ProductDetail