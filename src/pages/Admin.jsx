import { useState } from "react"

import {
    collection,
    addDoc
} from "firebase/firestore"

import { db } from "../firebase/firebase"

function Admin() {

    const [nombre, setNombre] =
        useState("")

    const [precio, setPrecio] =
        useState("")

    const [categoria, setCategoria] =
        useState("")

    const [descripcion, setDescripcion] =
        useState("")

    const [imagen, setImagen] =
        useState("")

    const agregarProducto =
        async (e) => {

            e.preventDefault()

            try {

                await addDoc(

                    collection(db, "productos"),

                    {

                        nombre,

                        precio: Number(precio),

                        categoria,

                        descripcion,

                        imagen

                    }

                )

                alert(
                    "Producto agregado 😭💖"
                )

                setNombre("")
                setPrecio("")
                setCategoria("")
                setDescripcion("")
                setImagen("")

            } catch (error) {

                console.log(error)

            }

        }

    return (

        <section className="min-h-screen px-8 py-20 bg-pink-50">

            <h1 className="text-5xl font-bold text-gray-800 mb-10">

                Panel Admin 🌸

            </h1>

            <form
                onSubmit={agregarProducto}
                className="bg-white p-10 rounded-[40px] shadow-xl max-w-3xl space-y-6"
            >

                {/* Nombre */}
                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        Nombre

                    </label>

                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                        className="w-full border border-pink-200 rounded-2xl p-4 outline-none"
                        required
                    />

                </div>

                {/* Precio */}
                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        Precio

                    </label>

                    <input
                        type="number"
                        value={precio}
                        onChange={(e) =>
                            setPrecio(e.target.value)
                        }
                        className="w-full border border-pink-200 rounded-2xl p-4 outline-none"
                        required
                    />

                </div>

                {/* Categoria */}
                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        Categoría

                    </label>

                    <select
                        value={categoria}
                        onChange={(e) =>
                            setCategoria(e.target.value)
                        }
                        className="w-full border border-pink-200 rounded-2xl p-4 outline-none"
                        required
                    >

                        <option value="">
                            Seleccione
                        </option>

                        <option>
                            Flores
                        </option>

                        <option>
                            Ramos
                        </option>

                        <option>
                            Amigurumis
                        </option>

                        <option>
                            Llaveros
                        </option>

                        <option>
                            Accesorios
                        </option>

                    </select>

                </div>

                {/* Descripcion */}
                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        Descripción

                    </label>

                    <textarea
                        value={descripcion}
                        onChange={(e) =>
                            setDescripcion(e.target.value)
                        }
                        className="w-full border border-pink-200 rounded-2xl p-4 outline-none h-32 resize-none"
                    />

                </div>

                {/* Imagen */}
                <div>

                    <label className="block mb-2 font-medium text-gray-700">

                        URL Imagen

                    </label>

                    <input
                        type="text"
                        value={imagen}
                        onChange={(e) =>
                            setImagen(e.target.value)
                        }
                        className="w-full border border-pink-200 rounded-2xl p-4 outline-none"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-full text-lg transition"
                >

                    Agregar producto 🌸

                </button>

            </form>

        </section>
    )

}

export default Admin