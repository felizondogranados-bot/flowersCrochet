/**
 * products.js - Base de Datos de Productos
 * ========================================
 * Array central de todos los productos disponibles en la tienda.
 * 
 * ESTRUCTURA DE PRODUCTO:
 * {
 *   id: number (ID único),
 *   nombre: string (Nombre del producto),
 *   precio: number (Precio en colones),
 *   categoria: string (Flores, Ramos, Llaveros, Amigurumis, Accesorios),
 *   descripcion?: string (Descripción opcional),
 *   colores?: array (Opciones de color disponibles),
 *   personalizable?: boolean (Si se puede personalizar),
 *   subirImagen?: boolean (Si permite subir imagen personalizada),
 *   imagen: string (Ruta de imagen - debe estar en /public/products/)
 * }
 * 
 * IMÁGENES REQUERIDAS EN /public/products/:
 * - Rosas.jpg, Girasol.jpg, Calas.jpg, Lirios.jpg, Claveles.jpg
 * - Margaritas.jpg, Tulipan1.jpg, Tulipan2.jpg, Lavanda.jpg
 * - FlorRapunzel.jpg, FlorRapunzellPascal.jpg, Guaria.jpg
 * - TulipanAmor.jpg, TulipanCorazon.jpg, RosaCombinada.jpg
 * - Corazon.jpg, FlorCorazon.jpg, TulipanGrande.jpg
 * - RamoAraña.jpg, ElRamodelaNoche.jpg, RamoAbejita.jpg
 * - RamoChanchito.jpg, RamoAmorEterno.jpg, RamoAlegria.jpg
 * - amigurumi.jpg
 * 
 * @type {Array}
 */

const productos = [

 {
  id: 1,

  nombre: "Rosas",

  precio: 3000,

  categoria: "Flores",

  descripcion:
    "Hermosas rosas tejidas a crochet ideales para regalos especiales 🌸",

  colores: [
    "#ff0000",
    "#ffc0cb",
    "#ffffff",
    "#000000",
    "#c2185b",
  ],

  personalizable: true,

  subirImagen: false,

  imagen:
    "/flowersCrochet/products/Rosas.jpg",
},
{
  id: 40,

  nombre: "Amigurumi Personalizado",

  precio: 20000,

  categoria: "Amigurumis",

  descripcion:
    "Creamos personajes personalizados totalmente a tu gusto ✨",

  colores: [
    "Personalizado"
  ],

  personalizable: true,

  subirImagen: true,

  imagen:
    "/flowersCrochet/products/amigurumi.jpg",
},
  {
    id: 2,
    nombre: "Girasol",
    precio: 3000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/Girasol.jpg",
  },
 {
    id: 3,
    nombre: "Calas",
    precio: 3000,
    categoria: "Flores",

    imagen: "/flowersCrochet/products/Calas.jpg",
  }, {
    id: 4,
    nombre: "Lirios",
    precio: 5000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/Lirios.jpg",
  }, {
    id: 5,
    nombre: "Claveles",
    precio: 4000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/Claveles.jpg",
  }, {
    id: 6,
    nombre: "Margaritas",
    precio: 3000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/Margaritas.jpg",
  }, {
    id: 7,
    nombre: "Tulipan #1",
    precio: 3000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/Tulipan1.jpg",
  }, {
    id: 8,
    nombre: "Tulipan #2",
    precio: 3500,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/Tulipan2.jpg",
  }, {
    id: 9,
    nombre: "Lavanda",
    precio: 2500,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/Lavanda.jpg",
  }, {
    id: 10,
    nombre: "Flor Rapunzel",
    precio: 5000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/FlorRapunzel.jpg",
  }, {
    id: 11,
    nombre: "Flor Rapunzel y Pascal",
    precio: 13000,
    categoria: "Flores",
    descripcion:
      "Hermosas rosas tejidas a crochet, perfectas para regalar en fechas especiales 🌸",
    imagen: "/flowersCrochet/products/FlorRapunzellPascal.jpg",
  }, {
    id: 12,
    nombre: "Guaria",
    precio: 4000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/Guaria.jpg",
  },{
    id: 13,
    nombre: "Tulipan Amor",
    precio: 4000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/TulipanAmor.jpg",
  },{
    id: 14,
    nombre: "Tulipan Corazon",
    precio: 4000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/TulipanCorazon.jpg",
  },{
    id: 15,
    nombre: "Rosa Combinada",
    precio: 4000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/RosaCombinada.jpg",
  },{
    id: 16,
    nombre: "Corazon",
    precio: 3000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/Corazon.jpg",
  },{
    id: 17,
    nombre: "Flor Corazon",
    precio: 8000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/FlorCorazon.jpg",
  },{
    id: 18,
    nombre: "Tulipan Gigante",
    precio: 20000,
    categoria: "Flores",
    imagen: "/flowersCrochet/products/TulipanGrande.jpg",
  },{
    id: 19,
    nombre: "Ramo Araña",
    precio: 10000,
    categoria: "Ramos",
    imagen: "/flowersCrochet/products/RamoAraña.jpg",
  },{
    id: 20,
    nombre: "El Ramo de la Noche",
    precio: 10000,
    categoria: "Ramos",
    imagen: "/flowersCrochet/products/GuariaElRamodelaNoche.jpg",
  },{
    id: 21,
    nombre: "Ramo Abejita",
    precio: 9500,
    categoria: "Ramos",
    imagen: "/flowersCrochet/products/Guaria.jpg",
  },{
    id: 22,
    nombre: "Ramo Chanchito",
    precio: 9000,
    categoria: "Ramos",
    imagen: "/flowersCrochet/products/RamoChanchito.jpg",
  },{
    id: 23,
    nombre: "Ramo Amor Eterno",
    precio: 14000,
    categoria: "Ramos",
    imagen: "/flowersCrochet/products/RamoAmorEterno.jpg",
  },{
    id: 24,
    nombre: "Ramo Alegria en Flor",
    precio: 8500,
    categoria: "Ramos",
    imagen: "/flowersCrochet/products/RamoAlegria.jpg",
  },

]

export default productos