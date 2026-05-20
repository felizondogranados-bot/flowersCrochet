import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"

function Cart() {

    const { cart, removeFromCart } =
        useContext(CartContext)

    const [mostrarFormulario, setMostrarFormulario] =
        useState(false)

    const [fecha, setFecha] =
        useState("")

    const [lugarEntrega, setLugarEntrega] =
        useState("")

    const [necesitaEnvio, setNecesitaEnvio] =
        useState(false)

    const [direccionEnvio, setDireccionEnvio] =
        useState("")

    const enviarWhatsApp = () => {

        let mensaje =
            "Hola 🌸 quisiera realizar este pedido:%0A%0A"

        cart.forEach((item) => {

            mensaje +=
                `🧸 ${item.nombre}%0A
Cantidad: ${item.cantidad}%0A
Color: ${item.colorSeleccionado || "No seleccionado"}%0A
Detalles:
${item.descripcionPersonalizada || "Ninguno"}%0A%0A`

        })

        mensaje +=
            `📅 Fecha del pedido:
${fecha}%0A%0A`

        mensaje +=
            `📍 Lugar de entrega:
${lugarEntrega}%0A%0A`

        mensaje +=
            `🚚 ¿Necesita envío?
${necesitaEnvio ? "Sí" : "No"}%0A%0A`

        if (necesitaEnvio) {

            mensaje +=
                `🏡 Dirección de envío:
${direccionEnvio}%0A%0A`

        }

        mensaje +=
            `💖 Entiendo que debo cancelar el 50% por SINPE Móvil para confirmar el pedido.`

        const url =
            `https://wa.me/50688115650?text=${mensaje}`

        window.open(url, "_blank")
    }

    return (

        <section
            id="carrito"
            className="px-8 py-20 bg-pink-50 min-h-screen"
        >

            <h1 className="text-5xl font-bold text-gray-800 mb-10">

                Mi Carrito 🛒

            </h1>

            {/* Productos */}
            <div className="space-y-5">

                {cart.length === 0 && (

                    <p className="text-gray-500 text-lg">

                        No hay productos agregados 💔

                    </p>

                )}

                {cart.map((item) => (

                    <div
                        key={item.id}
                        className="bg-white p-6 rounded-[30px] shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >

                        <div className="flex items-center gap-5">

                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="w-24 h-24 object-cover rounded-2xl"
                            />

                            <div>

                                <h2 className="font-bold text-2xl text-gray-800">

                                    {item.nombre}

                                </h2>

                                <p className="text-pink-500 font-semibold mt-2">

                                    ₡{item.precio}

                                </p>

                                <p className="text-gray-500 mt-1">

                                    Cantidad:
                                    {" "}
                                    {item.cantidad}

                                </p>

                                {

                                    item.colorSeleccionado && (

                                        <div className="flex items-center gap-3 mt-3">

                                            <span className="text-gray-500">

                                                Color:

                                            </span>

                                            <div
                                                className="w-7 h-7 rounded-full border"
                                                style={{
                                                    backgroundColor:
                                                        item.colorSeleccionado
                                                }}
                                            ></div>

                                        </div>

                                    )

                                }

                                {

                                    item.descripcionPersonalizada && (

                                        <p className="text-gray-500 mt-3">

                                            ✨
                                            {" "}
                                            {item.descripcionPersonalizada}

                                        </p>

                                    )

                                }

                            </div>

                        </div>

                        {/* Eliminar */}
                        <button
                            onClick={() =>
                                removeFromCart(item.id)
                            }
                            className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-full transition"
                        >

                            Eliminar

                        </button>

                    </div>

                ))}

            </div>

            {/* Botón mostrar formulario */}
            {

                cart.length > 0 && !mostrarFormulario && (

                    <button

                        onClick={() =>
                            setMostrarFormulario(true)
                        }

                        className="mt-12 bg-pink-500 hover:bg-pink-600 text-white px-10 py-5 rounded-full text-lg shadow-lg transition"
                    >

                        Realizar pedido 🌸

                    </button>

                )

            }

            {/* Formulario */}
            {

                mostrarFormulario && (

                    <div className="mt-14 bg-white rounded-[35px] shadow-lg p-8">

                        <h2 className="text-4xl font-bold text-gray-800 mb-10">

                            Información del pedido 🌸

                        </h2>

                        {/* Fecha */}
                        <div className="mb-7">

                            <label className="block mb-3 font-medium text-gray-700">

                                ¿Para qué fecha necesita el pedido? 📅

                            </label>

                            <input
                                type="date"
                                value={fecha}
                                onChange={(e) =>
                                    setFecha(e.target.value)
                                }
                                className="w-full border border-pink-200 rounded-2xl p-4 outline-none"
                            />

                        </div>

                        {/* Lugar */}
                        <div className="mb-7">

                            <label className="block mb-3 font-medium text-gray-700">

                                Lugar de entrega 📍

                            </label>

                            <input
                                type="text"
                                placeholder="Ejemplo: Cañas, Guanacaste"
                                value={lugarEntrega}
                                onChange={(e) =>
                                    setLugarEntrega(e.target.value)
                                }
                                className="w-full border border-pink-200 rounded-2xl p-4 outline-none"
                            />

                        </div>

                        {/* Envío */}
                        <div className="mb-7">

                            <label className="flex items-center gap-3 text-gray-700 font-medium">

                                <input
                                    type="checkbox"
                                    checked={necesitaEnvio}
                                    onChange={(e) =>
                                        setNecesitaEnvio(e.target.checked)
                                    }
                                />

                                ¿Necesita envío? 🚚

                            </label>

                        </div>

                        {/* Dirección */}
                        {

                            necesitaEnvio && (

                                <div className="mb-7">

                                    <label className="block mb-3 font-medium text-gray-700">

                                        Dirección de envío 🏡

                                    </label>

                                    <textarea
                                        placeholder="Ingrese la dirección completa..."
                                        value={direccionEnvio}
                                        onChange={(e) =>
                                            setDireccionEnvio(e.target.value)
                                        }
                                        className="w-full h-32 border border-pink-200 rounded-2xl p-4 outline-none resize-none"
                                    ></textarea>

                                </div>

                            )

                        }

                        {/* SINPE */}
                        <div className="bg-pink-50 border border-pink-200 rounded-3xl p-6 mt-8">

                            <h3 className="text-2xl font-bold text-pink-500 mb-4">

                                Información importante 💖

                            </h3>

                            <p className="text-gray-600 leading-relaxed text-lg">

                                Para confirmar cualquier pedido se solicita un
                                adelanto del
                                <span className="font-bold text-pink-500">

                                    {" "}50% mediante SINPE Móvil

                                </span>.

                                El restante se cancela al momento de la entrega
                                o retiro del pedido 🌸

                            </p>

                        </div>

                        {/* Botón WhatsApp */}
                        <button

                            onClick={enviarWhatsApp}

                            disabled={
                                !fecha ||
                                !lugarEntrega ||
                                (necesitaEnvio && !direccionEnvio)
                            }

                            className={`mt-10 px-10 py-5 rounded-full text-lg shadow-lg transition text-white

                            ${!fecha ||
                                    !lugarEntrega ||
                                    (necesitaEnvio && !direccionEnvio)
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"
                                }`}
                        >

                            Enviar pedido por WhatsApp 📲

                        </button>

                    </div>

                )

            }

        </section>
    )
}

export default Cart