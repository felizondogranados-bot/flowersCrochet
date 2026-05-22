import express from "express"
import cors from "cors"
import multer from "multer"
import path from "path"

const app = express()

app.use(cors())
app.use(express.json())

// CARPETA IMÁGENES
app.use(
    "/uploads",
    express.static("uploads")
)

// CONFIGURAR MULTER
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads")

    },

    filename: (req, file, cb) => {

        cb(

            null,

            Date.now() +
            path.extname(file.originalname)

        )

    }

})

const upload = multer({ storage })

// PRODUCTOS TEMPORALES
let productos = []

// SUBIR PRODUCTO
app.post(

    "/productos",

    upload.single("imagen"),

    (req, res) => {

        const nuevoProducto = {

            id: Date.now(),

            nombre: req.body.nombre,

            precio: req.body.precio,

            categoria: req.body.categoria,

            descripcion: req.body.descripcion,

            imagen:
                `http://localhost:3001/uploads/${req.file.filename}`

        }

        productos.push(
            nuevoProducto
        )

        res.json(nuevoProducto)

    }

)

// OBTENER PRODUCTOS
app.get("/productos", (req, res) => {

    res.json(productos)

})

// ELIMINAR
app.delete("/productos/:id", (req, res) => {

    productos = productos.filter(

        (producto) =>
            producto.id != req.params.id

    )

    res.json({
        mensaje: "Producto eliminado"
    })

})

app.listen(3001, () => {

    console.log(
        "Servidor corriendo 🌸"
    )

})