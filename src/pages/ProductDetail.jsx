/**
 * Temas demostrados en este archivo:
 * ===================================
 * - React: useState, useEffect, useContext, Renderizado Condicional
 * - React Router: useParams, useNavigate
 * - Asincronía: Carga reactiva mediante hook useProducts (fetch)
 * - Eventos: onClick, onChange
 * - JS Moderno: let/const, destructuring, spread operator, arrow functions, find, template literals
 */

import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { FavoritesContext } from "../context/FavoritesContext"

// [ESM: import] Importa el hook para recuperar productos dinámicamente
import useProducts from "../hooks/useProducts"

/**
 * RESPONSABILIDAD DE LA CARPETA (src/pages):
 * ==========================================
 * Esta carpeta contiene las páginas principales de la aplicación enlazadas a rutas.
 * Actúan como controladores de nivel superior que componen múltiples componentes
 * de interfaz (de src/components) para conformar vistas completas.
 */

function ProductDetail() {
    // [React Context: useContext] Leemos las funciones y estados globales de los contextos
    const { addToCart } = useContext(CartContext)
    const { favorites, toggleFavorite } = useContext(FavoritesContext)

    // [React Router] Obtiene el ID de la URL y la función de navegación
    const { id } = useParams()
    const navigate = useNavigate()

    // [React: Custom Hook] Obtenemos el listado de productos remoto de forma asíncrona
    const { productos, loading, error, retry } = useProducts()

    // Estado local para productos añadidos por el admin
    const [productosAdmin, setProductosAdmin] = useState([])

    // [React: useState] Estados locales para la personalización y cantidad
    const [colorFlor, setColorFlor] = useState("")
    const [otroColorFlor, setOtroColorFlor] = useState("")
    const [colorDecoracion, setColorDecoracion] = useState("")
    const [otraDecoracion, setOtraDecoracion] = useState("")
    const [cantidad, setCantidad] = useState(1)
    const [descripcionCliente, setDescripcionCliente] = useState("")

    // [React: useEffect] Recuperamos los productos locales de localStorage
    useEffect(() => {
        const productosGuardados = JSON.parse(
            localStorage.getItem("productos")
        ) || []
        setProductosAdmin(productosGuardados)
    }, [])

    // [JS Moderno: Spread Operator] Combinamos el JSON remoto y localStorage
    const todosLosProductos = [
        ...productos,
        ...productosAdmin
    ]

    // [React: Renderizado Condicional] Muestra estado de carga solicitado
    if (loading) {
        return (
            <section className="min-h-screen bg-pink-50 px-8 py-20 flex items-center justify-center transition duration-300">
                <div className="text-center">
                    <div className="animate-spin text-5xl mb-4">🌸</div>
                    <p className="text-pink-600 font-bold text-2xl">🌸 Cargando flores...</p>
                </div>
            </section>
        )
    }

    // [React: Renderizado Condicional] Muestra estado de error solicitado
    if (error) {
        return (
            <section className="min-h-screen bg-pink-50 px-8 py-20 flex items-center justify-center transition duration-300">
                <div className="text-center bg-white rounded-[35px] border border-pink-100 p-8 shadow-md">
                    <p className="text-red-500 font-bold text-xl mb-6">{error}</p>
                    <button
                        onClick={retry}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold transition transform hover:scale-105 active:scale-95 shadow-md"
                    >
                        Reintentar
                    </button>
                </div>
            </section>
        )
    }

    // [JS Moderno: find() y destructuring] Busca el producto coincidente
    const producto = todosLosProductos.find(p => p.id === parseInt(id))

    // Si el producto no existe en el catálogo combinado
    if (!producto) {
        return (
            <section className="min-h-screen bg-pink-50 px-8 py-20 flex items-center justify-center transition duration-300">
                <div className="text-center bg-white rounded-[35px] border border-pink-100 p-8 shadow-md">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Producto no encontrado 😢</h1>
                    <button
                        onClick={() => navigate("/catalogo")}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full transition duration-300"
                    >
                        Volver al catálogo
                    </button>
                </div>
            </section>
        )
    }

    // Comprobamos si el artículo ya está en favoritos
    const esFavorito = favorites.find(item => item.id === producto.id)

    // Opciones estáticas para colores de flores especificadas por el usuario
    const coloresFlor = [
        { nombre: "Rojo intenso", codigo: "#f3121b" },
        { nombre: "Rosa fucsia vibrante", codigo: "#fc1553" },
        { nombre: "Rosa medio", codigo: "#f38093" },
        { nombre: "Rosa brillante", codigo: "#fe3a72" },
        { nombre: "Naranja intenso", codigo: "#ff5d00" },
        { nombre: "Naranja cálido", codigo: "#fd7426" },
        { nombre: "Durazno claro", codigo: "#ffc4a4" },
        { nombre: "Blanco", codigo: "#ffffff" },
        { nombre: "Rosa pastel suave", codigo: "#ffc3d2" }
    ]

    // Opciones estáticas para colores de decoración especificadas por el usuario
    const coloresDecoracion = [
        { nombre: "Rojo intenso", codigo: "#f3121b" },
        { nombre: "Rosa fucsia vibrante", codigo: "#fc1553" },
        { nombre: "Rosa medio", codigo: "#f38093" },
        { nombre: "Rosa brillante", codigo: "#fe3a72" },
        { nombre: "Naranja intenso", codigo: "#ff5d00" },
        { nombre: "Naranja cálido", codigo: "#fd7426" },
        { nombre: "Durazno claro", codigo: "#ffc4a4" },
        { nombre: "Blanco", codigo: "#ffffff" },
        { nombre: "Rosa pastel suave", codigo: "#ffc3d2" }
    ]

    // [JS Avanzado: Callback / Función reutilizable] Lógica para añadir artículo al carrito global
    const agregarCarrito = () => {
        if (!colorFlor && !otroColorFlor) {
            alert("Por favor selecciona un color para la flor 🌸")
            return
        }

        // [JS Moderno: Spread Operator y condicionales] Crea el objeto listo para el context
        const productoCarrito = {
            ...producto,
            // Guardamos siempre un objeto { nombre, codigo } para mantener consistencia en la visualización del carrito
            colorFlor: colorFlor === "otro" 
                ? { nombre: otroColorFlor || "Personalizado", codigo: "#ec4899" } 
                : colorFlor,
            colorDecoracion: colorDecoracion === "otro" 
                ? { nombre: otraDecoracion || "Personalizado", codigo: "#ec4899" } 
                : colorDecoracion,
            cantidad,
            descripcionCliente,
            cartId: Date.now() // Generamos ID único para elementos idénticos con personalizaciones distintas
        }

        addToCart(productoCarrito)
        alert(`✨ ¡${producto.nombre} agregado al carrito! ✨`)

        // Reseteo del formulario local
        setColorFlor("")
        setOtroColorFlor("")
        setColorDecoracion("")
        setOtraDecoracion("")
        setCantidad(1)
        setDescripcionCliente("")
    }

    return (
        <section className="min-h-screen bg-pink-50 px-4 md:px-8 py-20 text-gray-800 transition duration-300">
            {/* [Layout: CSS Grid] Dos columnas responsivas para la imagen del producto y sus detalles */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-start">

                {/* Columna Izquierda: Imagen */}
                <div className="flex flex-col gap-6">
                    <div className="relative rounded-3xl shadow-2xl overflow-hidden bg-white border border-pink-100">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-full h-[400px] md:h-[500px] object-cover"
                        />
                    </div>
                </div>

                {/* Columna Derecha: Controles e Información */}
                <div>
                    <div className="flex justify-between items-start mb-3">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                            {producto.nombre}
                        </h1>
                        {/* Botón de Favorito */}
                        <button
                            // [DOM/Eventos: onClick] Alterna el estado de favoritos a través del contexto
                            onClick={() => toggleFavorite(producto)}
                            className="text-3xl p-2 rounded-full hover:bg-pink-100 transition transform hover:scale-110 active:scale-95"
                            title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                        >
                            {esFavorito ? "💖" : "🤍"}
                        </button>
                    </div>

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

                    {/* Separador visual */}
                    <div className="h-1 bg-gradient-to-r from-pink-300 to-pink-100 mb-8 rounded-full"></div>

                    {/* Selector de Color de Flor */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold mb-5 text-gray-800">
                            🌸 Color de la flor
                        </h3>

                        {/* [React: Renderizado Dinámico] Iteración del catálogo de colores */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            {coloresFlor.map((color) => (
                                <button
                                    key={color.codigo}
                                    // [DOM/Eventos: onClick] Asigna el color seleccionado
                                    onClick={() => {
                                        setColorFlor(color)
                                        setOtroColorFlor("")
                                    }}
                                    className={`w-14 h-14 rounded-full border-4 transition transform hover:scale-110 ${
                                        colorFlor?.codigo === color.codigo
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
                            className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                                colorFlor === "otro"
                                    ? "bg-pink-500 text-white"
                                    : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                            }`}
                        >
                            ✨ Otro color
                        </button>

                        {colorFlor === "otro" && (
                            <input
                                type="text"
                                placeholder="Ej: Azul marino, Morado, etc..."
                                value={otroColorFlor}
                                // [DOM/Eventos: onChange] Actualiza el nombre del color personalizado
                                onChange={(e) => setOtroColorFlor(e.target.value)}
                                className="mt-4 w-full px-5 py-3 rounded-xl border-2 border-pink-300 bg-white outline-none focus:border-pink-500 transition"
                            />
                        )}
                    </div>

                    {/* Selector de Color de Decoración */}
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
                                    className={`w-14 h-14 rounded-full border-4 transition transform hover:scale-110 ${
                                        colorDecoracion?.codigo === color.codigo
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
                            className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                                colorDecoracion === "otro"
                                    ? "bg-pink-500 text-white"
                                    : "bg-pink-100 text-pink-700 hover:bg-pink-200"
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
                                className="mt-4 w-full px-5 py-3 rounded-xl border-2 border-pink-300 bg-white outline-none focus:border-pink-500 transition"
                            />
                        )}
                    </div>

                    {/* Selector de Cantidad */}
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
                                // [DOM/Eventos: onChange] Modifica la cantidad controlando que sea >= 1
                                onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                                className="w-20 px-4 py-3 border-2 border-pink-300 bg-white rounded-lg text-center font-bold text-lg outline-none focus:border-pink-500 transition"
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

                    {/* Detalles Adicionales */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold mb-5 text-gray-800">
                            💬 Detalles especiales (Opcional)
                        </h3>

                        <textarea
                            placeholder="Escribe aquí cualquier detalle especial que desees (máximo 200 caracteres)..."
                            value={descripcionCliente}
                            onChange={(e) => setDescripcionCliente(e.target.value.slice(0, 200))}
                            maxLength="200"
                            className="w-full h-24 px-5 py-4 rounded-2xl border-2 border-pink-300 bg-white outline-none focus:border-pink-500 transition resize-none"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            {descripcionCliente.length}/200 caracteres
                        </p>
                    </div>

                    {/* Botón Agregar al Carrito */}
                    <button
                        onClick={agregarCarrito}
                        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition shadow-lg hover:shadow-xl transform hover:scale-103 active:scale-95 flex items-center justify-center gap-3 mb-4 cursor-pointer"
                    >
                        🛒 Agregar al carrito
                    </button>

                    {/* Botón Volver */}
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 px-10 py-3 rounded-2xl text-lg font-semibold transition cursor-pointer"
                    >
                        ← Volver
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail