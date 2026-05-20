import { useState } from "react"
import { useSearchParams } from "react-router-dom"

import ProductCard from "./ProductCard"
import productos from "../data/products"

function Products() {

    const [searchParams] = useSearchParams()

    const categoriaURL =
        searchParams.get("categoria") || "Todos"

    const [busqueda, setBusqueda] = useState("")

    const [categoria, setCategoria] =
        useState(categoriaURL)

    const productosFiltrados = productos.filter((producto) => {

        const coincideBusqueda =
            producto.nombre.toLowerCase().includes(
                busqueda.toLowerCase()
            )

        const coincideCategoria =
            categoria === "Todos" ||
            producto.categoria === categoria

        return coincideBusqueda && coincideCategoria
    })

    return (

        <section
            id="catalogo"
            className="px-8 py-20"
        >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-5">

                <h1 className="text-4xl font-bold text-gray-800">
                    Productos Destacados 🌸
                </h1>

                <div className="flex flex-col md:flex-row gap-4">

                    {/* Buscador */}
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={busqueda}
                        onChange={(e) =>
                            setBusqueda(e.target.value)
                        }
                        className="bg-white px-5 py-3 rounded-full shadow outline-none w-full md:w-80"
                    />

                    {/* Categorías */}
                    <select
                        value={categoria}
                        onChange={(e) =>
                            setCategoria(e.target.value)
                        }
                        className="bg-white px-5 py-3 rounded-full shadow outline-none"
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

            {/* Productos */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {productosFiltrados.map((producto) => (

                    <ProductCard
                        key={producto.id}
                        producto={producto}
                    />

                ))}

            </div>

        </section>
    )
}

export default Products