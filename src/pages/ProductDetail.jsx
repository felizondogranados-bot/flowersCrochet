import { useParams } from "react-router-dom"
import { useState, useContext } from "react"

import productos from "../data/products"

import { CartContext } from "../context/CartContext"

function ProductDetail() {

    const { id } = useParams()

    const producto = productos.find(
        (p) => p.id === Number(id)
    )

    const { addToCart } =
        useContext(CartContext)

    const [colorSeleccionado, setColorSeleccionado] =
        useState("")

    const [descripcion, setDescripcion] =
        useState("")

    const [cantidad, setCantidad] =
        useState(1)

    if (!producto) {

        return (

            <h1 className="text-center py-20 text-3xl">

                Producto no encontrado 💔

            </h1>

        )
    }

    return (

        <section className="px-8 py-20 bg-pink-50 min-h-screen">

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

                {/* Imagen */}
                <div>

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full rounded-[40px] shadow-2xl"
                    />

                </div>

                {/* Información */}
                <div>

                    <p className="text-pink-400 font-medium mb-3 text-lg">

                        {producto.categoria}

                    </p>

                    <h1 className="text-5xl font-bold text-gray-800">

                        {producto.nombre}

                    </h1>

                    <p className="text-pink-500 text-4xl font-bold mt-6">

                        ₡{producto.precio}

                    </p>

                    <p className="text-gray-500 leading-relaxed mt-6 text-lg">

                        {producto.descripcion}

                    </p>

                    {/* Colores */}
                    {

                        producto.colores && (

                            <div className="mt-10">

                                <h2 className="text-xl font-semibold mb-5">

                                    Colores disponibles 🌸

                                </h2>

                                <div className="flex flex-wrap gap-4">

                                    {producto.colores.map((color) => (

                                        <button

                                            key={color}

                                            onClick={() =>
                                                setColorSeleccionado(color)
                                            }

                                            className={`w-14 h-14 rounded-full border-4 transition hover:scale-110

                                            ${colorSeleccionado === color
                                                    ? "border-pink-400 scale-110"
                                                    : "border-white"
                                                }`}

                                            style={{
                                                backgroundColor: color
                                            }}

                                        >

                                        </button>

                                    ))}

                                </div>

                            </div>

                        )

                    }

                    {/* Cantidad */}
                    <div className="mt-10">

                        <h2 className="text-xl font-semibold mb-5">

                            Cantidad 🌸

                        </h2>

                        <div className="flex items-center gap-5">

                            <button

                                onClick={() => {

                                    if (cantidad > 1) {
                                        setCantidad(cantidad - 1)
                                    }

                                }}

                                className="w-12 h-12 rounded-full bg-pink-100 hover:bg-pink-200 text-2xl font-bold transition"
                            >

                                -

                            </button>

                            <span className="text-3xl font-bold text-gray-700">

                                {cantidad}

                            </span>

                            <button

                                onClick={() =>
                                    setCantidad(cantidad + 1)
                                }

                                className="w-12 h-12 rounded-full bg-pink-400 hover:bg-pink-500 text-white text-2xl font-bold transition"
                            >

                                +

                            </button>

                        </div>

                    </div>

                    {/* Personalización */}
                    <div className="mt-10">

                        <h2 className="text-xl font-semibold mb-5">

                            Personalización ✨

                        </h2>

                        <textarea
                            placeholder="Describe cómo deseas tu producto..."
                            value={descripcion}
                            onChange={(e) =>
                                setDescripcion(e.target.value)
                            }
                            className="w-full h-40 rounded-3xl border border-pink-200 p-5 outline-none resize-none bg-white"
                        ></textarea>

                    </div>

                    {/* Subir imagen */}
                    {

                        producto.subirImagen && (

                            <div className="mt-10">

                                <h2 className="text-xl font-semibold mb-5">

                                    Imagen de referencia 📸

                                </h2>

                                <input
                                    type="file"
                                    className="w-full border border-pink-200 rounded-2xl p-4 bg-white"
                                />

                            </div>

                        )

                    }

                    {/* Botón carrito */}
                    <button

                        onClick={() => {

                            addToCart({

                                ...producto,

                                cantidad,

                                colorSeleccionado,

                                descripcionPersonalizada:
                                    descripcion,

                            })

                        }}

                        className="mt-12 bg-pink-500 hover:bg-pink-600 text-white px-10 py-5 rounded-full text-lg shadow-lg transition"
                    >

                        Agregar al carrito 🛒

                    </button>

                </div>

            </div>

        </section>
    )
}

export default ProductDetail