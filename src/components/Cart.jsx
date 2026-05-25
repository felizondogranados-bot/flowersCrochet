/**
 * Cart Component
 * ==============
 * Componente principal del carrito de compras. Permite visualizar los productos
 * agregados, gestionar cantidades, y completar el formulario de pedido.
 * 
 * FUNCIONALIDADES:
 * - Mostrar resumen de productos con imágenes
 * - Calcular totales y subtotales
 * - Validar formulario de pedido
 * - Enviar pedido a WhatsApp con detalles completos
 * - Soportar dos tipos de entrega: Personal y por Correos
 * 
 * IMÁGENES REQUERIDAS:
 * - Imágenes de productos individuales en /public/products/
 * 
 * @component
 * @returns {JSX.Element} Página completa del carrito
 */

import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"

/**
 * Componente Cart
 * Gestiona la visualización y procesamiento del carrito de compras
 */
function Cart() {
    // Contexto del carrito - proporciona cart y removeFromCart
    const { cart, removeFromCart } = useContext(CartContext)

    const [nombreCliente, setNombreCliente] = useState("")
    const [fechaEntrega, setFechaEntrega] = useState("")
    const [tipoEntrega, setTipoEntrega] = useState("personal")
    const [lugarEntrega, setLugarEntrega] = useState("")

    // Estados para envío por correos
    const [telefonoCliente, setTelefonoCliente] = useState("")
    const [provincia, setProvincia] = useState("")
    const [canton, setCanton] = useState("")
    const [distrito, setDistrito] = useState("")
    const [direccionExacta, setDireccionExacta] = useState("")

    /**
     * Calcula el total del carrito
     * Suma todos los productos multiplicando precio x cantidad
     * @returns {number} Total del carrito
     */
    const calcularTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.precio * item.cantidad)
        }, 0)
    }

    const lugaresEntrega = ["Tilarán", "Cañas", "Liberia"]
    const provincias = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"]

    /**
     * Valida que todos los campos del formulario estén completos
     * @returns {boolean} true si el formulario es válido, false de lo contrario
     */
    const validarFormulario = () => {
        if (!nombreCliente.trim()) {
            alert("Por favor ingresa tu nombre")
            return false
        }
        if (!fechaEntrega) {
            alert("Por favor selecciona una fecha de entrega")
            return false
        }
        if (tipoEntrega === "personal" && !lugarEntrega) {
            alert("Por favor selecciona un lugar de entrega personal")
            return false
        }
        if (tipoEntrega === "correo") {
            if (!telefonoCliente.trim() || !provincia || !canton || !distrito || !direccionExacta.trim()) {
                alert("Por favor completa toda la información de envío")
                return false
            }
        }
        return true
    }

    /**
     * Construye un mensaje formateado y lo envía por WhatsApp
     * Incluye información del cliente, productos, y detalles de pago
     * Valida el formulario antes de enviar
     * @function
     */
    const enviarWhatsApp = () => {
        if (!validarFormulario()) return

        let mensaje = `🌸 *NUEVO PEDIDO - FLOWERS CROCHET* 🌸%0A%0A`

        mensaje += `*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*%0A`
        mensaje += `*INFORMACIÓN DEL CLIENTE*%0A`
        mensaje += `*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*%0A%0A`

        mensaje += `👤 *Nombre:* ${nombreCliente}%0A`
        mensaje += `📅 *Fecha de entrega:* ${fechaEntrega}%0A`

        if (tipoEntrega === "personal") {
            mensaje += `📍 *Tipo de entrega:* Entrega Personal%0A`
            mensaje += `🏘️ *Lugar:* ${lugarEntrega}%0A%0A`
        } else {
            mensaje += `📍 *Tipo de entrega:* Envío por Correos de Costa Rica%0A`
            mensaje += `📱 *Teléfono:* ${telefonoCliente}%0A`
            mensaje += `🗺️ *Provincia:* ${provincia}%0A`
            mensaje += `📌 *Cantón:* ${canton}%0A`
            mensaje += `🏛️ *Distrito:* ${distrito}%0A`
            mensaje += `🏠 *Dirección:* ${direccionExacta}%0A%0A`
        }

        mensaje += `*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*%0A`
        mensaje += `*DETALLES DE PRODUCTOS*%0A`
        mensaje += `*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*%0A%0A`

        cart.forEach((item, index) => {

            mensaje += `*${index + 1}. ${item.nombre}*%0A`
            mensaje += `💰 Precio unitario: ₡${item.precio.toLocaleString()}%0A`
            mensaje += `📦 Cantidad: ${item.cantidad}%0A`

            if (item.colorFlor) {
                mensaje += `🌸 Color: ${item.colorFlor.nombre}%0A`
            }

            if (item.colorDecoracion) {
                mensaje += `🎀 Decoración: ${item.colorDecoracion.nombre}%0A`
            }

            if (item.descripcionCliente) {
                mensaje += `📝 Detalles especiales: ${item.descripcionCliente}%0A`
            }

            mensaje += `💵 Subtotal: ₡${(item.precio * item.cantidad).toLocaleString()}%0A%0A`

        })

        const total = calcularTotal()
        const adelanto = Math.ceil(total * 0.5)

        mensaje += `*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*%0A`
        mensaje += `💳 *RESUMEN DE PAGO*%0A`
        mensaje += `*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*%0A%0A`
        mensaje += `💰 *Total a pagar:* ₡${total.toLocaleString()}%0A`
        mensaje += `⏳ *Adelanto requerido (50%):* ₡${adelanto.toLocaleString()}%0A`
        mensaje += `*Saldo a la entrega:* ₡${(total - adelanto).toLocaleString()}%0A%0A`

        mensaje += `*Puedes transferir el adelanto por SINPE móvil al: 6862 8115 650*%0A`
        mensaje += `💖 *Gracias por tu pedido! Nos encanta trabajar para ti 🌸*`

        const url = `https://wa.me/50688115650?text=${mensaje}`
        window.open(url, "_blank")
    }

    return (
        <section className="px-4 md:px-8 py-20 bg-pink-50 min-h-screen">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">
                    Completa tu pedido 🛒
                </h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
                        <p className="text-gray-500 text-xl mb-6">No hay productos agregados 💔</p>
                        <a href="/flowersCrochet/catalogo" className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl font-bold transition">
                            Ir al catálogo 🌸
                        </a>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">

                        {/* ===== LADO IZQUIERDO: PRODUCTOS Y TOTAL ===== */}
                        <div className="md:col-span-1">

                            <div className="sticky top-24 space-y-6">

                                {/* PRODUCTOS */}
                                <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">

                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                        Resumen de pedido
                                    </h2>

                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {cart.map((item) => (
                                            <div key={item.cartId} className="border-b border-gray-200 pb-4 grid grid-cols-3 gap-3 items-start">

                                                {/* Imagen del producto - IMAGEN REQUERIDA */}
                                                <div className="col-span-1">
                                                    <img
                                                        src={item.imagen}
                                                        alt={item.nombre}
                                                        className="w-full h-20 object-cover rounded-lg shadow-md"
                                                        onError={(e) => {
                                                            e.target.src = "https://via.placeholder.com/80?text=Producto"
                                                        }}
                                                    />
                                                </div>

                                                {/* Información del producto */}
                                                <div className="col-span-2">

                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex-1">
                                                            <h3 className="font-bold text-gray-800 text-sm">
                                                                {item.nombre}
                                                            </h3>
                                                            <p className="text-xs text-gray-500">
                                                                Cantidad: {item.cantidad}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.cartId)}
                                                            className="text-red-500 hover:text-red-700 font-bold text-lg ml-2"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>

                                                    {item.colorFlor && (
                                                        <div className="flex items-center gap-2 mb-1">

                                                            <span className="text-xs text-gray-600">
                                                                🌸 Color:
                                                            </span>

                                                            <div
                                                                className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                                                                style={{
                                                                    backgroundColor: item.colorFlor.codigo
                                                                }}
                                                            ></div>

                                                            <span className="text-xs text-gray-500">
                                                                {item.colorFlor.nombre}
                                                            </span>

                                                        </div>
                                                    )}

                                                    {item.colorDecoracion && (
                                                        <div className="flex items-center gap-2 mb-1">

                                                            <span className="text-xs text-gray-600">
                                                                🎀 Decoración:
                                                            </span>

                                                            <div
                                                                className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                                                                style={{
                                                                    backgroundColor: item.colorDecoracion.codigo
                                                                }}
                                                            ></div>

                                                            <span className="text-xs text-gray-500">
                                                                {item.colorDecoracion.nombre}
                                                            </span>

                                                        </div>
                                                    )}

                                                    <p className="font-bold text-pink-500 text-sm">
                                                        ₡{(item.precio * item.cantidad).toLocaleString()}
                                                    </p>

                                                </div>

                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t-2 border-pink-300 pt-4 mt-4">

                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-gray-700">Cantidad de productos:</span>
                                            <span className="font-bold text-lg">{cart.length}</span>
                                        </div>

                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-gray-700">Total de items:</span>
                                            <span className="font-bold text-lg">{cart.reduce((sum, item) => sum + item.cantidad, 0)}</span>
                                        </div>

                                        <div className="flex justify-between items-center bg-gradient-to-r from-pink-100 to-pink-50 p-4 rounded-2xl">
                                            <span className="text-lg font-bold text-gray-800">Total:</span>
                                            <span className="text-3xl font-bold text-pink-600">
                                                ₡{calcularTotal().toLocaleString()}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* ===== LADO DERECHO: INFORMACIÓN DEL PEDIDO ===== */}
                        <div className="md:col-span-2">

                            <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">

                                <h2 className="text-3xl font-bold text-gray-800">
                                    Información del pedido
                                </h2>

                                {/* NOMBRE DEL CLIENTE */}
                                <div>
                                    <label className="block font-bold text-lg text-gray-700 mb-3">
                                        👤 Tu nombre
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Juan García"
                                        value={nombreCliente}
                                        onChange={(e) => setNombreCliente(e.target.value)}
                                        className="w-full border-2 border-pink-300 rounded-2xl p-4 outline-none focus:border-pink-500 transition text-lg"
                                    />
                                </div>

                                {/* FECHA DE ENTREGA */}
                                <div>
                                    <label className="block font-bold text-lg text-gray-700 mb-3">
                                        📅 Fecha de entrega deseada
                                    </label>
                                    <input
                                        type="date"
                                        value={fechaEntrega}
                                        onChange={(e) => setFechaEntrega(e.target.value)}
                                        className="w-full border-2 border-pink-300 rounded-2xl p-4 outline-none focus:border-pink-500 transition text-lg"
                                    />
                                </div>

                                {/* TIPO DE ENTREGA */}
                                <div>
                                    <label className="block font-bold text-lg text-gray-700 mb-4">
                                        🚚 Tipo de entrega
                                    </label>

                                    <div className="space-y-3">

                                        {/* Opción Entrega Personal */}
                                        <label className="flex items-center p-4 border-2 border-pink-300 rounded-2xl cursor-pointer hover:bg-pink-50 transition" style={{ borderColor: tipoEntrega === "personal" ? "#ec4899" : "#fce7f3" }}>
                                            <input
                                                type="radio"
                                                value="personal"
                                                checked={tipoEntrega === "personal"}
                                                onChange={(e) => setTipoEntrega(e.target.value)}
                                                className="w-5 h-5 cursor-pointer"
                                            />
                                            <span className="ml-3 font-semibold text-gray-700">Entrega Personal</span>
                                        </label>

                                        {/* Lugares de entrega personal */}
                                        {tipoEntrega === "personal" && (
                                            <div className="ml-4 space-y-2">
                                                {lugaresEntrega.map((lugar) => (
                                                    <label key={lugar} className="flex items-center p-3 bg-pink-50 rounded-xl cursor-pointer hover:bg-pink-100 transition">
                                                        <input
                                                            type="radio"
                                                            value={lugar}
                                                            checked={lugarEntrega === lugar}
                                                            onChange={(e) => setLugarEntrega(e.target.value)}
                                                            className="w-4 h-4 cursor-pointer"
                                                        />
                                                        <span className="ml-3 font-medium text-gray-700">📍 {lugar}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* Opción Envío por Correos */}
                                        <label className="flex items-center p-4 border-2 border-pink-300 rounded-2xl cursor-pointer hover:bg-pink-50 transition" style={{ borderColor: tipoEntrega === "correo" ? "#ec4899" : "#fce7f3" }}>
                                            <input
                                                type="radio"
                                                value="correo"
                                                checked={tipoEntrega === "correo"}
                                                onChange={(e) => setTipoEntrega(e.target.value)}
                                                className="w-5 h-5 cursor-pointer"
                                            />
                                            <span className="ml-3 font-semibold text-gray-700">Envío por Correos de Costa Rica</span>
                                        </label>

                                        {/* Formulario de envío por correos */}
                                        {tipoEntrega === "correo" && (
                                            <div className="ml-4 bg-pink-50 rounded-2xl p-6 space-y-4">

                                                <div>
                                                    <label className="block font-semibold text-gray-700 mb-2">
                                                        📱 Número de teléfono
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        placeholder="Ej: 8765-4321"
                                                        value={telefonoCliente}
                                                        onChange={(e) => setTelefonoCliente(e.target.value)}
                                                        className="w-full border-2 border-pink-300 rounded-xl p-3 outline-none focus:border-pink-500 transition"
                                                    />
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">

                                                    <div>
                                                        <label className="block font-semibold text-gray-700 mb-2">
                                                            🗺️ Provincia
                                                        </label>
                                                        <select
                                                            value={provincia}
                                                            onChange={(e) => setProvincia(e.target.value)}
                                                            className="w-full border-2 border-pink-300 rounded-xl p-3 outline-none focus:border-pink-500 transition"
                                                        >
                                                            <option value="">Selecciona una provincia</option>
                                                            {provincias.map((prov) => (
                                                                <option key={prov} value={prov}>
                                                                    {prov}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block font-semibold text-gray-700 mb-2">
                                                            📌 Cantón
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Ej: San José"
                                                            value={canton}
                                                            onChange={(e) => setCanton(e.target.value)}
                                                            className="w-full border-2 border-pink-300 rounded-xl p-3 outline-none focus:border-pink-500 transition"
                                                        />
                                                    </div>

                                                </div>

                                                <div>
                                                    <label className="block font-semibold text-gray-700 mb-2">
                                                        🏛️ Distrito
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Ej: Carmen"
                                                        value={distrito}
                                                        onChange={(e) => setDistrito(e.target.value)}
                                                        className="w-full border-2 border-pink-300 rounded-xl p-3 outline-none focus:border-pink-500 transition"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block font-semibold text-gray-700 mb-2">
                                                        🏠 Dirección exacta
                                                    </label>
                                                    <textarea
                                                        placeholder="Ej: Calle Principal, Casa #123, frente a la iglesia..."
                                                        value={direccionExacta}
                                                        onChange={(e) => setDireccionExacta(e.target.value)}
                                                        className="w-full h-24 border-2 border-pink-300 rounded-xl p-3 outline-none focus:border-pink-500 transition resize-none"
                                                    />
                                                </div>

                                            </div>
                                        )}

                                    </div>

                                </div>

                                {/* INFORMACIÓN IMPORTANTE */}
                                <div className="bg-gradient-to-r from-pink-50 to-pink-100 border-2 border-pink-300 rounded-2xl p-6">

                                    <h3 className="text-lg font-bold text-pink-600 mb-3">
                                        💳 Información de pago
                                    </h3>

                                    <ul className="text-gray-700 space-y-2 text-sm md:text-base">
                                        <li>✅ Se requiere un adelanto del <strong>50% por SINPE Móvil</strong></li>
                                        <li>✅ El saldo se cancela <strong>al momento de la entrega</strong></li>
                                        <li>✅ SINPE Móvil: <strong>6862 8115 650</strong></li>
                                        <li>✅ Tiempo de entrega: <strong>3 a 7 días hábiles</strong></li>
                                    </ul>

                                </div>

                                {/* BOTÓN REALIZAR PEDIDO */}
                                <button
                                    onClick={enviarWhatsApp}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-5 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-3"
                                >
                                    📲 Realizar pedido por WhatsApp
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </section>
    )
}

export default Cart