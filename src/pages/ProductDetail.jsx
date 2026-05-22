import { useParams } from "react-router-dom"

import productos from "../data/products"

function ProductDetail() {

    const { id } =
        useParams()

    const productosAdmin =

        JSON.parse(
            localStorage.getItem("productos")
        ) || []

    const todosLosProductos = [
        ...productos,
        ...productosAdmin
    ]

    const producto =
        todosLosProductos.find(

            (item) =>
                item.id == id

        )

    if (!producto) {

        return (

            <section className="min-h-screen flex items-center justify-center">

                <h1 className="text-4xl font-bold text-pink-500">

                    Producto no encontrado 💔

                </h1>

            </section>

        )

    }

    return (

        <section className="min-h-screen px-8 py-20 bg-pink-50">

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                {/* Imagen */}
                <div>

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full rounded-3xl shadow-xl"
                    />

                </div>

                {/* Info */}
                <div>

                    <h1 className="text-5xl font-bold text-gray-800">

                        {producto.nombre}

                    </h1>

                    <p className="text-pink-500 text-3xl font-bold mt-5">

                        ₡{producto.precio}

                    </p>

                    <p className="text-gray-600 mt-8 text-lg leading-relaxed">

                        {producto.descripcion}

                    </p>

                </div>

            </div>

        </section>

    )

}

export default ProductDetail