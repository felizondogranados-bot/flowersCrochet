import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Cart() {

    const { cart, removeFromCart } = useContext(CartContext)

    const enviarWhatsApp = () => {

        let mensaje = "Hola 🌸 quisiera realizar este pedido:%0A%0A"

        cart.forEach((item) => {
            mensaje += `🧸 ${item.nombre} x${item.cantidad}%0A`
        })

        const url = `https://wa.me/50688115650?text=${mensaje}`

        window.open(url, "_blank")
    }

    return (

        <section
            id="carrito"
            className="px-8 py-20"
        >

            <h1 className="text-4xl font-bold text-gray-800 mb-10">
                Mi Carrito 🛒
            </h1>

            <div className="space-y-5">

                {cart.length === 0 && (
                    <p className="text-gray-500">
                        No hay productos agregados 💔
                    </p>
                )}

                {cart.map((item) => (

                    <div
                        key={item.id}
                        className="bg-white p-5 rounded-2xl shadow flex items-center justify-between"
                    >

                        <div className="flex items-center gap-5">

                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="w-20 h-20 object-cover rounded-xl"
                            />

                            <div>

                                <h2 className="font-semibold text-lg">
                                    {item.nombre}
                                </h2>

                                <p className="text-pink-500">
                                    ₡{item.precio}
                                </p>

                                <p className="text-gray-500">
                                    Cantidad: {item.cantidad}
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-full"
                        >
                            Eliminar
                        </button>

                    </div>

                ))}

            </div>

            {cart.length > 0 && (

                <button
                    onClick={enviarWhatsApp}
                    className="mt-10 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg"
                >
                    Enviar pedido por WhatsApp 📲
                </button>

            )}

        </section>
    )
}

export default Cart