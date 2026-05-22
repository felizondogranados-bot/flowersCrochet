import { useEffect, useState } from "react"

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

    const [productos, setProductos] =
        useState([])

    const [editandoId, setEditandoId] =
        useState(null)

    useEffect(() => {

        const productosGuardados =

            JSON.parse(
                localStorage.getItem("productos")
            ) || []

        setProductos(
            productosGuardados
        )

    }, [])

    const manejarImagen = (e) => {

        const archivo =
            e.target.files[0]

        if (archivo) {

            const urlImagen =
                URL.createObjectURL(archivo)

            setImagen(urlImagen)

        }

    }

    const guardarProducto = () => {

        if (
            !nombre ||
            !precio ||
            !categoria ||
            !descripcion ||
            !imagen
        ) {

            alert(
                "Complete todos los campos 🌸"
            )

            return

        }

        const productosGuardados =

            JSON.parse(
                localStorage.getItem("productos")
            ) || []

        // EDITAR PRODUCTO
        if (editandoId) {

            const productosActualizados =

                productosGuardados.map((producto) => {

                    if (
                        producto.id === editandoId
                    ) {

                        return {

                            ...producto,

                            nombre,
                            precio,
                            categoria,
                            descripcion,
                            imagen

                        }

                    }

                    return producto

                })

            localStorage.setItem(

                "productos",

                JSON.stringify(
                    productosActualizados
                )

            )

            setProductos(
                productosActualizados
            )

            alert(
                "Producto actualizado 🌸"
            )

            setEditandoId(null)

        }

        // AGREGAR PRODUCTO
        else {

            const nuevoProducto = {

                id: crypto.randomUUID(),

                nombre,

                precio,

                categoria,

                descripcion,

                imagen

            }

            // IMPORTANTE:
            // aquí NO reemplazamos,
            // agregamos el nuevo

            const nuevosProductos = [
                ...productosGuardados,
                nuevoProducto
            ]

            localStorage.setItem(

                "productos",

                JSON.stringify(
                    nuevosProductos
                )

            )

            setProductos(
                nuevosProductos
            )

            alert(
                "Producto agregado 🌸"
            )

        }

        // LIMPIAR FORMULARIO
        setNombre("")
        setPrecio("")
        setCategoria("")
        setDescripcion("")
        setImagen("")

    }

    const eliminarProducto = (id) => {

        const productosActualizados =

            productos.filter(

                (producto) =>
                    producto.id !== id

            )

        localStorage.setItem(

            "productos",

            JSON.stringify(
                productosActualizados
            )

        )

        setProductos(
            productosActualizados
        )

    }

    const editarProducto = (producto) => {

        setNombre(
            producto.nombre
        )

        setPrecio(
            producto.precio
        )

        setCategoria(
            producto.categoria
        )

        setDescripcion(
            producto.descripcion
        )

        setImagen(
            producto.imagen
        )

        setEditandoId(
            producto.id
        )

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        })

    }

    return (

        <section className="min-h-screen bg-pink-50 px-6 py-20">

            <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-xl">

                <h1 className="text-4xl font-bold text-pink-500 mb-10 text-center">

                    Panel Administrador 🌸

                </h1>

                <div className="flex flex-col gap-5">

                    {/* Nombre */}
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                        className="px-5 py-3 rounded-xl border outline-none"
                    />

                    {/* Precio */}
                    <input
                        type="number"
                        placeholder="Precio"
                        value={precio}
                        onChange={(e) =>
                            setPrecio(e.target.value)
                        }
                        className="px-5 py-3 rounded-xl border outline-none"
                    />

                    {/* Categoría */}
                    <select
                        value={categoria}
                        onChange={(e) =>
                            setCategoria(e.target.value)
                        }
                        className="px-5 py-3 rounded-xl border outline-none"
                    >

                        <option value="">
                            Seleccione categoría
                        </option>

                        <option value="Flores">
                            Flores
                        </option>

                        <option value="Ramos">
                            Ramos
                        </option>

                        <option value="Llaveros">
                            Llaveros
                        </option>

                        <option value="Amigurumis">
                            Amigurumis
                        </option>

                        <option value="Accesorios">
                            Accesorios
                        </option>

                    </select>

                    {/* Descripción */}
                    <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) =>
                            setDescripcion(e.target.value)
                        }
                        className="px-5 py-3 rounded-xl border outline-none h-32"
                    />

                    {/* Imagen */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={manejarImagen}
                        className="px-5 py-3 rounded-xl border"
                    />

                    {/* Preview */}
                    {

                        imagen && (

                            <img
                                src={imagen}
                                alt="preview"
                                className="w-52 h-52 object-cover rounded-2xl shadow-lg mx-auto"
                            />

                        )

                    }

                    {/* Botón */}
                    <button
                        onClick={guardarProducto}
                        className="bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl text-lg font-semibold transition"
                    >

                        {

                            editandoId

                                ? "Actualizar Producto 🌸"

                                : "Guardar Producto 🌸"

                        }

                    </button>

                </div>

            </div>

            {/* PRODUCTOS AGREGADOS */}
            <div className="max-w-7xl mx-auto mt-20">

                <h2 className="text-4xl font-bold text-pink-500 mb-10">

                    Productos agregados 🌸

                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {

                        productos.map((producto) => (

                            <div
                                key={producto.id}
                                className="bg-white p-5 rounded-3xl shadow-lg"
                            >

                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="w-full h-64 object-cover rounded-2xl"
                                />

                                <h3 className="text-2xl font-bold mt-4 text-gray-800">

                                    {producto.nombre}

                                </h3>

                                <p className="text-pink-500 font-bold text-lg mt-2">

                                    ₡{producto.precio}

                                </p>

                                <p className="text-gray-500 mt-3">

                                    {producto.descripcion}

                                </p>

                                <div className="flex gap-3 mt-5">

                                    <button

                                        onClick={() =>
                                            editarProducto(producto)
                                        }

                                        className="flex-1 bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-full"
                                    >

                                        Editar ✏️

                                    </button>

                                    <button

                                        onClick={() =>
                                            eliminarProducto(producto.id)
                                        }

                                        className="flex-1 bg-red-400 hover:bg-red-500 text-white py-3 rounded-full"
                                    >

                                        Eliminar ❌

                                    </button>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    )

}

export default Admin