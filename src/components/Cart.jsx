/**
 * Temas demostrados en este archivo:
 * ===================================
 * - React: useState, useContext, Renderizado Condicional, Renderizado Dinámico
 * - Eventos: onSubmit, onClick, onChange
 * - JS Avanzado: reduce() (cálculo de acumuladores), funciones asíncronas reutilizables
 * - JS Moderno: let/const, template literals, destructuring, spread operator, arrow functions, filter
 * - Responsive Design y Layouts (Flexbox, CSS Grid)
 */

import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { generarPDFPedido } from "../utils/generatePDF"

/**
 * RESPONSABILIDAD DE LA CARPETA (src/components):
 * ===============================================
 * Esta carpeta contiene componentes reutilizables de la interfaz de usuario.
 * Son piezas de interfaz modulares que reciben datos por Props o acceden al
 * estado global por Context, encargadas de renderizar la vista y capturar
 * interacciones del usuario mediante eventos de DOM.
 */

/**
 * Calcula la fecha mínima de entrega (3 días hábiles a partir de hoy)
 * @returns {string} Fecha en formato YYYY-MM-DD
 */
const getMinimumDeliveryDate = () => {
    const date = new Date()
    let addedDays = 0
    while (addedDays < 3) {
        date.setDate(date.getDate() + 1)
        const dayOfWeek = date.getDay()
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            addedDays++
        }
    }
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, "0")
    const dd = String(date.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
}

/**
 * Componente Cart
 * Gestiona la visualización del carrito, cantidades, cálculo de totales y datos de facturación.
 */
function Cart() {
    const minimumDeliveryDate = getMinimumDeliveryDate()
    // Estado para mostrar spinner durante generación de PDF
    const [generandoPDF, setGenerandoPDF] = useState(false)
    
    // [React: useContext] Consumimos el contexto global del carrito de compras
    const { cart, removeFromCart } = useContext(CartContext)

    // [React: useState] Estados locales para la información del cliente
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
     * [JS Avanzado / Moderno: reduce()] Recorre el carrito sumando acumulativamente precio x cantidad
     * 
     * @returns {number} Total del carrito
     */
    const calcularTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.precio * item.cantidad)
        }, 0) // El valor inicial de acumulación es 0
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
        
        // Validación de fecha mínima (3 días hábiles)
        const minDate = getMinimumDeliveryDate()
        if (fechaEntrega < minDate) {
            alert(`🌸 Los pedidos requieren un tiempo de preparación de al menos 3 días hábiles. Por favor selecciona una fecha a partir del: ${minDate}.`)
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
     * Genera PDF y luego abre WhatsApp
     * [JS Avanzado: Función asíncrona reutilizable]
     */
    const generarPDFYEnviar = async () => {
        if (!validarFormulario()) return

        setGenerandoPDF(true)

        try {
            // Preparar datos del cliente usando notación shorthand de objetos de ES6
            const datosCliente = {
                nombreCliente,
                fechaEntrega,
                tipoEntrega,
                lugarEntrega: tipoEntrega === "personal" ? lugarEntrega : null,
                telefonoCliente: tipoEntrega === "correo" ? telefonoCliente : null,
                provincia: tipoEntrega === "correo" ? provincia : null,
                canton: tipoEntrega === "correo" ? canton : null,
                distrito: tipoEntrega === "correo" ? distrito : null,
                direccionExacta: tipoEntrega === "correo" ? direccionExacta : null,
            }

            // Generar PDF de forma asíncrona
            const pdfGenerado = await generarPDFPedido(
                cart,
                datosCliente,
                calcularTotal()
            )

            if (pdfGenerado) {
                // [JS Moderno: Template Literals] Crea el mensaje de confirmación formateado
                const mensaje = encodeURIComponent(
                    `🌸 *CONFIRMACIÓN DE PEDIDO - FLOWERS CROCHET*\n\n` +
                    `👤 Nombre: ${nombreCliente}\n` +
                    `📅 Fecha de entrega: ${fechaEntrega}\n` +
                    `📦 Total de productos: ${cart.length}\n` +
                    `💰 Monto total: ₡${calcularTotal().toLocaleString()}\n\n` +
                    `📎 *Por favor adjunta el PDF que se descargó* para confirmar los detalles de tu pedido.\n\n` +
                    `💳 Datos para SINPE Móvil:\n` +
                    `📱 88115650 (Francela Elizondo)\n\n` +
                    `Gracias por tu confianza 💖`
                )

                const url = `https://wa.me/50688115650?text=${mensaje}`
                setTimeout(() => {
                    window.open(url, "_blank")
                }, 500)

                alert("✅ PDF generado y descargado exitosamente!\n\n" +
                    "📎 IMPORTANTE: Se abrirá WhatsApp.\n" +
                    "Adjunta el PDF que se descargó a tu dispositivo para confirmar tu pedido.\n\n" +
                    "El PDF contiene toda la información de tu pedido con detalles, colores e imágenes.")
            } else {
                alert("❌ Error al generar el PDF. Intenta de nuevo.")
            }
        } catch (error) {
            console.error("Error:", error)
            alert("❌ Error al procesar tu pedido. Intenta de nuevo.")
        } finally {
            setGenerandoPDF(false)
        }
    }

    return (
        <section className="px-4 md:px-8 py-20 bg-pink-50 min-h-screen transition duration-300">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">
                    Completa tu pedido 🛒
                </h1>

                {/* [React: Renderizado Condicional] Si el carrito está vacío, muestra aviso; de lo contrario, el layout de pedido */}
                {cart.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-pink-100">
                        <p className="text-gray-500 text-xl mb-6">No hay productos agregados 💔</p>
                        <a href="/flowersCrochet/catalogo" className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl font-bold transition duration-300">
                            Ir al catálogo 🌸
                        </a>
                    </div>
                ) : (
                    /* [Layout: CSS Grid] Divide la pantalla en 3 columnas: 1 para resumen, 2 para formulario de datos */
                    <div className="grid md:grid-cols-3 gap-8">

                        {/* ===== LADO IZQUIERDO: RESUMEN DE PRODUCTOS (1 Columna) ===== */}
                        <div className="md:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <div className="bg-white rounded-3xl shadow-lg p-6 border border-pink-100 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                        Resumen de pedido
                                    </h2>

                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {/* [React: Renderizado Dinámico] Iteración mapeando los productos del carrito */}
                                        {cart.map((item) => (
                                            <div key={item.cartId} className="border-b border-gray-200 pb-4 grid grid-cols-3 gap-3 items-start">
                                                {/* Imagen */}
                                                <div className="col-span-1">
                                                    <img
                                                        src={item.imagen}
                                                        alt={item.nombre}
                                                        className="w-full h-20 object-cover rounded-lg shadow-md border border-pink-50"
                                                        onError={(e) => {
                                                            e.target.src = "https://via.placeholder.com/80?text=Producto"
                                                        }}
                                                    />
                                                </div>

                                                {/* Información de Producto */}
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
                                                            // [DOM/Eventos: onClick] Elimina la personalización específica del carrito
                                                            onClick={() => removeFromCart(item.cartId)}
                                                            className="text-red-500 hover:text-red-700 font-bold text-lg ml-2 cursor-pointer"
                                                            title="Eliminar del carrito"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>

                                                    {item.colorFlor && (
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs text-gray-600">🌸 Flor:</span>
                                                            <div
                                                                className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                                                                style={{ backgroundColor: item.colorFlor.codigo }}
                                                            ></div>
                                                            <span className="text-xs text-gray-500">{item.colorFlor.nombre}</span>
                                                        </div>
                                                    )}

                                                    {item.colorDecoracion && (
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs text-gray-600">🎀 Decoración:</span>
                                                            <div
                                                                className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                                                                style={{ backgroundColor: item.colorDecoracion.codigo }}
                                                            ></div>
                                                            <span className="text-xs text-gray-500">{item.colorDecoracion.nombre}</span>
                                                        </div>
                                                    )}

                                                    {item.esPersonalizado && item.personalizacion && (
                                                        <div className="text-xs text-gray-500 mt-1 space-y-0.5 border-l-2 border-pink-200 pl-2">
                                                            {item.personalizacion.categoria === "ramo" && (
                                                                <>
                                                                    <p>💐 <strong>Flor:</strong> {item.personalizacion.tipoFlor}</p>
                                                                    <p>🎨 <strong>Colores:</strong> {item.personalizacion.colores}</p>
                                                                    <p>🎀 <strong>Envoltura:</strong> {item.personalizacion.conEnvoltura ? "Sí" : "No"}</p>
                                                                    {item.personalizacion.detalles && <p>✍️ <strong>Detalles:</strong> {item.personalizacion.detalles}</p>}
                                                                </>
                                                            )}
                                                            {item.personalizacion.categoria === "amigurumi" && (
                                                                <>
                                                                    <p>🧸 <strong>Tamaño:</strong> {item.personalizacion.tamano === "pequeno" ? "Pequeño (10 cm)" : item.personalizacion.tamano === "mediano" ? "Mediano (14 cm)" : "Grande (20 cm)"}</p>
                                                                    <p>🎨 <strong>Colores:</strong> {item.personalizacion.colores}</p>
                                                                    {item.personalizacion.accesorios?.length > 0 && (
                                                                        <p>🎒 <strong>Accesorios:</strong> {item.personalizacion.accesorios.join(", ")}</p>
                                                                    )}
                                                                    <p>✍️ <strong>Detalles:</strong> {item.personalizacion.descripcion}</p>
                                                                </>
                                                            )}
                                                            {item.personalizacion.categoria === "llavero" && (
                                                                <>
                                                                    <p>🔑 <strong>Colores:</strong> {item.personalizacion.colores}</p>
                                                                    <p>🏷️ <strong>Nombre tejido:</strong> {item.personalizacion.tieneNombreTejido ? "Sí" : "No"}</p>
                                                                    {item.personalizacion.extras?.length > 0 && (
                                                                        <p>✨ <strong>Extras:</strong> {item.personalizacion.extras.join(", ")}</p>
                                                                    )}
                                                                    <p>✍️ <strong>Detalles:</strong> {item.personalizacion.descripcion}</p>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}

                                                    <p className="font-bold text-pink-500 text-sm mt-1">
                                                        Subtotal: ₡{(item.precio * item.cantidad).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t-2 border-pink-300 pt-4 mt-4 space-y-3">
                                        <div className="flex justify-between items-center text-sm md:text-base">
                                            <span className="text-gray-700">Cantidad de productos:</span>
                                            <span className="font-bold text-gray-800">{cart.length}</span>
                                        </div>

                                        <div className="flex justify-between items-center text-sm md:text-base">
                                            <span className="text-gray-700">Total de items:</span>
                                            {/* [JS Avanzado: reduce()] Suma el acumulado de cantidades en el carrito */}
                                            <span className="font-bold text-gray-800">
                                                {cart.reduce((sum, item) => sum + item.cantidad, 0)}
                                            </span>
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

                        {/* ===== LADO DERECHO: FORMULARIO DE DETALLES DEL PEDIDO (2 Columnas) ===== */}
                        <div className="md:col-span-2">
                            {/* [DOM/Eventos: onSubmit] Formulario nativo con control preventDefault para procesar el pedido */}
                            <form 
                                onSubmit={(e) => {
                                    e.preventDefault(); // Detiene el refresco nativo del navegador
                                    generarPDFYEnviar();
                                }} 
                                className="bg-white rounded-3xl shadow-lg p-8 border border-pink-100 space-y-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-800">
                                    Información del pedido
                                </h2>

                                {/* NOMBRE CLIENTE */}
                                <div>
                                    <label className="block font-bold text-lg text-gray-700 mb-3">
                                        👤 Tu nombre
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Juan García"
                                        required
                                        value={nombreCliente}
                                        // [DOM/Eventos: onChange] Actualiza el estado al escribir
                                        onChange={(e) => setNombreCliente(e.target.value)}
                                        className="w-full border-2 border-pink-300 bg-white rounded-2xl p-4 outline-none focus:border-pink-500 transition text-lg"
                                    />
                                </div>

                                {/* FECHA DE ENTREGA */}
                                <div>
                                    <label className="block font-bold text-lg text-gray-700 mb-3">
                                        📅 Fecha de entrega deseada
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        min={minimumDeliveryDate}
                                        value={fechaEntrega}
                                        // [DOM/Eventos: onChange] Actualiza el estado al seleccionar fecha
                                        onChange={(e) => setFechaEntrega(e.target.value)}
                                        className="w-full border-2 border-pink-300 bg-white rounded-2xl p-4 outline-none focus:border-pink-500 transition text-lg"
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        ✨ Las fechas disponibles consideran el tiempo de elaboración artesanal de cada producto (mínimo 3 días hábiles).
                                    </p>
                                </div>

                                {/* TIPO DE ENTREGA */}
                                <div>
                                    <label className="block font-bold text-lg text-gray-700 mb-4">
                                        🚚 Tipo de entrega
                                    </label>

                                    <div className="space-y-3">
                                        {/* Opción Entrega Personal */}
                                        <label 
                                            className="flex items-center p-4 border-2 rounded-2xl cursor-pointer hover:bg-pink-50 transition" 
                                            style={{ borderColor: tipoEntrega === "personal" ? "#ec4899" : "#fce7f3" }}
                                        >
                                            <input
                                                type="radio"
                                                value="personal"
                                                checked={tipoEntrega === "personal"}
                                                // [DOM/Eventos: onChange] Actualiza tipo de entrega activa
                                                onChange={(e) => setTipoEntrega(e.target.value)}
                                                className="w-5 h-5 cursor-pointer accent-pink-500"
                                            />
                                            <span className="ml-3 font-semibold text-gray-700">Entrega Personal</span>
                                        </label>

                                        {/* Detalle lugares entrega personal */}
                                        {tipoEntrega === "personal" && (
                                            <div className="ml-4 space-y-2">
                                                {/* [React: Renderizado Dinámico] Mapea la lista estática de lugares de retiro */}
                                                {lugaresEntrega.map((lugar) => (
                                                    <label key={lugar} className="flex items-center p-3 bg-pink-50 rounded-xl cursor-pointer hover:bg-pink-100 transition">
                                                        <input
                                                            type="radio"
                                                            value={lugar}
                                                            checked={lugarEntrega === lugar}
                                                            onChange={(e) => setLugarEntrega(e.target.value)}
                                                            className="w-4 h-4 cursor-pointer accent-pink-500"
                                                        />
                                                        <span className="ml-3 font-medium text-gray-700">📍 {lugar}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* Opción Envío por Correos */}
                                        <label 
                                            className="flex items-center p-4 border-2 rounded-2xl cursor-pointer hover:bg-pink-50 transition" 
                                            style={{ borderColor: tipoEntrega === "correo" ? "#ec4899" : "#fce7f3" }}
                                        >
                                            <input
                                                type="radio"
                                                value="correo"
                                                checked={tipoEntrega === "correo"}
                                                onChange={(e) => setTipoEntrega(e.target.value)}
                                                className="w-5 h-5 cursor-pointer accent-pink-500"
                                            />
                                            <span className="ml-3 font-semibold text-gray-700">Envío por Correos de Costa Rica</span>
                                        </label>

                                        {/* Formulario envío por Correos de CR */}
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
                                                        className="w-full border-2 border-pink-300 bg-white rounded-xl p-3 outline-none focus:border-pink-500 transition"
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
                                                            className="w-full border-2 border-pink-300 bg-white rounded-xl p-3 outline-none focus:border-pink-500 transition cursor-pointer"
                                                        >
                                                            <option value="">Selecciona una provincia</option>
                                                            {provincias.map((prov) => (
                                                                <option key={prov} value={prov}>{prov}</option>
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
                                                            className="w-full border-2 border-pink-300 bg-white rounded-xl p-3 outline-none focus:border-pink-500 transition"
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
                                                        className="w-full border-2 border-pink-300 bg-white rounded-xl p-3 outline-none focus:border-pink-500 transition"
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
                                                        className="w-full h-24 border-2 border-pink-300 bg-white rounded-xl p-3 outline-none focus:border-pink-500 transition resize-none"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Información de SINPE Móvil */}
                                <div className="bg-gradient-to-r from-pink-50 to-pink-100 border-2 border-pink-300 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-pink-600 mb-3">
                                        💳 Información de pago
                                    </h3>
                                    <ul className="text-gray-700 space-y-2 text-sm md:text-base">
                                        <li>✅ Se requiere un adelanto del <strong>50% por SINPE Móvil</strong></li>
                                        <li>✅ El saldo se cancela <strong>al momento de la entrega</strong></li>
                                        <li>✅ SINPE Móvil: <strong>88115650</strong> a nombre de Francela Elizondo</li>
                                        <li>✅ Tiempo de entrega: <strong>3 a 7 días hábiles</strong></li>
                                    </ul>
                                </div>

                                {/* BOTÓN REALIZAR PEDIDO */}
                                <button
                                    type="submit" // Indica que este botón somete el formulario activando onSubmit
                                    disabled={generandoPDF}
                                    className={`w-full py-5 rounded-2xl text-xl font-bold shadow-lg transition transform flex items-center justify-center gap-3 ${
                                        generandoPDF
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:scale-103 active:scale-95'
                                    } text-white cursor-pointer`}
                                >
                                    {generandoPDF ? (
                                        <>
                                            <span className="animate-spin">⏳</span>
                                            Generando PDF...
                                        </>
                                    ) : (
                                        <>
                                            📄 Generar PDF y enviar por WhatsApp
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                    </div>
                )}

            </div>
        </section>
    )
}

export default Cart