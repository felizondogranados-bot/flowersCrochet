/**
 * Temas demostrados en este archivo:
 * ===================================
 * - React: useState, useEffect, Renderizado Condicional, Renderizado Dinámico
 * - Custom Hooks: useProducts (gestión de asincronía)
 * - Módulos ESM: import, export default
 * - Eventos: onClick, onChange
 * - Layouts: CSS Grid, Flexbox, Responsive Design
 * - JS Moderno: const/let, destructuring, spread operator, arrow functions, filter, template literals
 */

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "./ProductCard"

// [ESM: import] Importa el hook personalizado que consume productos.json
import useProducts from "../hooks/useProducts"

/**
 * RESPONSABILIDAD DE LA CARPETA (src/components):
 * ===============================================
 * Esta carpeta contiene componentes reutilizables de la interfaz de usuario.
 * Son piezas modulares que renderizan vistas y capturan interacciones del
 * usuario mediante eventos, desacoplando la lógica de presentación.
 */

/**
 * Componente Products
 * Renderiza el catálogo principal de productos, permitiendo búsquedas y filtrados.
 */
function Products() {
    // [React: Custom Hook & Destructuring] Obtenemos los estados y la función de reintento del hook
    const { productos, loading, error, retry } = useProducts()

    // [React Router] Parámetros de búsqueda en la URL
    const [searchParams] = useSearchParams()

    // [JS Moderno: let y const]
    const categoriaURL = searchParams.get("categoria") || "Todos"

    // [React: useState] Estados locales para búsqueda de texto, categoría activa y productos del admin
    const [busqueda, setBusqueda] = useState("")
    const [categoria, setCategoria] = useState(categoriaURL)
    const [productosAdmin, setProductosAdmin] = useState([])

    // [React: useEffect] Carga productos guardados por el administrador en LocalStorage
    useEffect(() => {
        // [DOM: Local Storage] Lectura de datos persistidos de productos administrados
        const productosGuardados = JSON.parse(
            localStorage.getItem("productos")
        ) || []
        setProductosAdmin(productosGuardados)
    }, [])

    // [JS Moderno: Spread Operator] Fusionamos el catálogo remoto (JSON) y local (LocalStorage)
    const todosLosProductos = [
        ...productos,
        ...productosAdmin
    ]

    // [JS Moderno: Arrow Function y filter()] Filtra productos según categoría y texto buscado
    const productosFiltrados = todosLosProductos.filter((producto) => {
        // [JS Moderno: Template Literals y métodos de string]
        const coincideBusqueda = producto.nombre
            ?.toLowerCase()
            .includes(busqueda.toLowerCase())

        const coincideCategoria =
            categoria === "Todos" || producto.categoria === categoria

        return coincideBusqueda && coincideCategoria
    })

    return (
        <section
            id="catalogo"
            className="px-8 py-20 min-h-screen transition duration-300"
        >
            {/* [Layout: Flexbox] Alinear cabecera y controles horizontalmente (desktop) y en columna (móvil) */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-5">
                <h1 className="text-4xl font-bold text-gray-800">
                    ✨Catálogo de Productos✨
                </h1>

                {/* Controles de Búsqueda y Filtro */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Buscador */}
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={busqueda}
                        // [DOM/Eventos: onChange] Captura las pulsaciones de teclas para actualizar el estado 'busqueda'
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="bg-white px-5 py-3 rounded-full shadow border border-transparent outline-none w-full md:w-80 transition focus:border-pink-300"
                    />

                    {/* Categorías */}
                    <select
                        value={categoria}
                        // [DOM/Eventos: onChange] Se dispara al seleccionar otra opción del dropdown
                        onChange={(e) => setCategoria(e.target.value)}
                        className="bg-white px-5 py-3 rounded-full shadow border border-transparent outline-none cursor-pointer transition focus:border-pink-300"
                    >
                        <option>Todos</option>
                        <option>Flores</option>
                        <option>Llaveros</option>
                        <option>Amigurumis</option>
                        <option>Accesorios</option>
                        <option>Ramos</option>
                    </select>
                </div>
            </div>

            {/* [React: Renderizado Condicional] Carga, Error o Cuadrícula de Productos */}
            {loading ? (
                // Estado Loading solicitado por el curso
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="animate-spin text-5xl mb-4">🌸</div>
                    <p className="text-pink-600 font-bold text-2xl">🌸 Cargando flores...</p>
                </div>
            ) : error ? (
                // Estado Error solicitado por el curso con botón de Reintentar
                <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[35px] border border-pink-100 p-8 shadow-md">
                    <p className="text-red-500 font-bold text-xl mb-6">{error}</p>
                    <button
                        // [DOM/Eventos: onClick] Ejecuta el callback 'retry' para disparar el fetch de nuevo
                        onClick={retry}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold transition transform hover:scale-105 active:scale-95 shadow-md"
                    >
                        Reintentar
                    </button>
                </div>
            ) : (
                /* [Layout: CSS Grid] Distribución responsiva en columnas usando CSS Grid */
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productosFiltrados.length > 0 ? (
                        /* [React: Renderizado Dinámico] Renderiza ProductCard iterando el array filtrado con map() */
                        productosFiltrados.map((producto) => (
                            <ProductCard
                                key={String(producto.id)}
                                producto={producto}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-lg col-span-full text-center py-10">
                            No hay productos 😢
                        </p>
                    )}
                </div>
            )}
        </section>
    )
}

export default Products