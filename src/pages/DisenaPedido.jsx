import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PedidoTypeSelector from "../components/disenaPedido/PedidoTypeSelector";
import BouquetForm from "../components/disenaPedido/BouquetForm";
import AmigurumiForm from "../components/disenaPedido/AmigurumiForm";
import KeychainForm from "../components/disenaPedido/KeychainForm";
import QuoteSummary from "../components/disenaPedido/QuoteSummary";
import { PRECIOS } from "../utils/prices";
import { CartContext } from "../context/CartContext";

/**
 * Temas demostrados en este archivo para defensa académica:
 * ==========================================================
 * - React Hooks:
 *   - useState: Control de categorías elegidas, variables de formularios, imágenes, cargas y errores
 *   - useContext: Conexión con el estado global CartContext para añadir diseños personalizados al carrito
 *   - Renderizado Condicional: Para mostrar el formulario correcto basado en el estado
 *   - Eventos de DOM: onSubmit y onClick mapeados a métodos reactivos
 * - JavaScript Moderno:
 *   - Template Literals: Interpolación de textos y nombres dinámicos de productos
 *   - ESM: Imports y exports de componentes y constantes
 *   - Métodos de Array: filter() y spread operator para manejar arreglos de accesorios/extras
 */

function DisenaPedido() {
  // [React: useContext] Consumimos el contexto global del carrito para agregar diseños personalizados
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // --- ESTADOS DE SELECCIÓN DE CATEGORÍA ---
  const [categoria, setCategoria] = useState(""); // "ramo", "amigurumi", "llavero"

  // --- ESTADOS DE RAMO ---
  const [ramoCantidad, setRamoCantidad] = useState(1);
  const [ramoTipoFlor, setRamoTipoFlor] = useState("Rosa");
  const [ramoOtroTipo, setRamoOtroTipo] = useState("");
  const [ramoColores, setRamoColores] = useState("");
  const [ramoConEnvoltura, setRamoConEnvoltura] = useState(false);
  const [ramoDetalles, setRamoDetalles] = useState("");
  const [ramoImagen, setRamoImagen] = useState(null);
  const [ramoImagenPreview, setRamoImagenPreview] = useState("");

  // --- ESTADOS DE AMIGURUMI ---
  const [amiNombre, setAmiNombre] = useState("");
  const [amiTamano, setAmiTamano] = useState("pequeno"); // "pequeno", "mediano", "grande"
  const [amiColores, setAmiColores] = useState("");
  const [amiDescripcion, setAmiDescripcion] = useState("");
  const [amiAccesorios, setAmiAccesorios] = useState([]);
  const [amiCantidad, setAmiCantidad] = useState(1);
  const [amiImagen, setAmiImagen] = useState(null);
  const [amiImagenPreview, setAmiImagenPreview] = useState("");

  // --- ESTADOS DE LLAVERO ---
  const [llaveroNombre, setLlaveroNombre] = useState("");
  const [llaveroColores, setLlaveroColores] = useState("");
  const [llaveroDescripcion, setLlaveroDescripcion] = useState("");
  const [llaveroTieneNombre, setLlaveroTieneNombre] = useState(false);
  const [llaveroExtras, setLlaveroExtras] = useState([]);
  const [llaveroCantidad, setLlaveroCantidad] = useState(1);
  const [llaveroImagen, setLlaveroImagen] = useState(null);
  const [llaveroImagenPreview, setLlaveroImagenPreview] = useState("");

  // --- ESTADO DE ERRORES DE VALIDACIÓN ---
  const [errors, setErrors] = useState({});

  // Callback para guardar archivos de imagen y generar preview en base64
  const handleImageChange = (categoriaForm, file, previewUrl) => {
    if (categoriaForm === "ramo") {
      setRamoImagen(file);
      setRamoImagenPreview(previewUrl);
    } else if (categoriaForm === "amigurumi") {
      setAmiImagen(file);
      setAmiImagenPreview(previewUrl);
    } else if (categoriaForm === "llavero") {
      setLlaveroImagen(file);
      setLlaveroImagenPreview(previewUrl);
    }
  };

  // Validación de formulario completo antes de añadir al carrito
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar campos según la categoría seleccionada
    if (categoria === "ramo") {
      if (!ramoColores.trim()) nuevosErrores.colores = "Debes especificar los colores del ramo.";
    } else if (categoria === "amigurumi") {
      if (!amiNombre.trim()) nuevosErrores.nombreDiseno = "El nombre o personaje del amigurumi es requerido.";
      if (!amiColores.trim()) nuevosErrores.colores = "Debes especificar los colores deseados.";
      if (!amiDescripcion.trim()) nuevosErrores.descripcion = "Debes describir cómo deseas la figura.";
    } else if (categoria === "llavero") {
      if (!llaveroNombre.trim()) nuevosErrores.nombreDiseno = "El nombre o diseño del llavero es requerido.";
      if (!llaveroColores.trim()) nuevosErrores.colores = "Debes especificar los colores deseados.";
      if (!llaveroDescripcion.trim()) nuevosErrores.descripcion = "Debes describir el diseño del llavero.";
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Procesa la información del formulario y la añade al carrito global
  const handleAgregarAlCarrito = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    let totalUnitario = 0;
    let nombreProducto = "";
    let descripciones = {};

    if (categoria === "ramo") {
      const precioFlores = ramoCantidad * PRECIOS.flor;
      const precioEnvoltura = ramoConEnvoltura ? PRECIOS.envoltura : 0;
      totalUnitario = precioFlores + precioEnvoltura; // El ramo completo es 1 item en el carrito con su subtotal
      nombreProducto = `Ramo Personalizado (${ramoCantidad} ${ramoTipoFlor === "Otro" ? ramoOtroTipo : ramoTipoFlor})`;
      descripciones = {
        categoria,
        tipoFlor: ramoTipoFlor === "Otro" ? ramoOtroTipo : ramoTipoFlor,
        cantidad: ramoCantidad,
        colores: ramoColores,
        conEnvoltura: ramoConEnvoltura,
        detalles: ramoDetalles
      };
    } 
    else if (categoria === "amigurumi") {
      const sizePriceMap = { pequeno: PRECIOS.amigurumi.pequeno, mediano: PRECIOS.amigurumi.mediano, grande: PRECIOS.amigurumi.grande };
      const precioBaseUnitario = sizePriceMap[amiTamano] || PRECIOS.amigurumi.pequeno;
      const costoAccesoriosUnitario = amiAccesorios.length * 500;
      
      totalUnitario = precioBaseUnitario + costoAccesoriosUnitario;
      nombreProducto = `Amigurumi: ${amiNombre}`;
      descripciones = {
        categoria,
        nombreDiseno: amiNombre,
        tamano: amiTamano,
        colores: amiColores,
        accesorios: amiAccesorios,
        descripcion: amiDescripcion
      };
    } 
    else if (categoria === "llavero") {
      const precioBaseLlaveros = PRECIOS.llavero.base;
      const costoNombreTejido = llaveroTieneNombre ? 500 : 0;
      const costoExtrasUnitario = llaveroExtras.length * PRECIOS.llavero.extra;
      
      totalUnitario = precioBaseLlaveros + costoNombreTejido + costoExtrasUnitario;
      nombreProducto = `Llavero: ${llaveroNombre}`;
      descripciones = {
        categoria,
        nombreDiseno: llaveroNombre,
        colores: llaveroColores,
        tieneNombreTejido: llaveroTieneNombre,
        extras: llaveroExtras,
        descripcion: llaveroDescripcion
      };
    }

    const previewImg = categoria === "ramo" 
      ? ramoImagenPreview 
      : (categoria === "amigurumi" ? amiImagenPreview : llaveroImagenPreview);

    // [JS Moderno: Object Shorthand y Spread Operator] Creamos la estructura del producto para el carrito
    const productoCarrito = {
      id: 100 + Date.now(), // ID numérico único
      cartId: Date.now(),  // Identificador de carrito único
      nombre: nombreProducto,
      categoria: "Personalizados",
      precio: totalUnitario,
      cantidad: categoria === "ramo" ? 1 : (categoria === "amigurumi" ? amiCantidad : llaveroCantidad),
      imagen: previewImg || "/flowersCrochet/logo.png",
      esPersonalizado: true,
      personalizacion: descripciones
    };

    addToCart(productoCarrito);
    
    // Alerta de advertencia elegante obligatoria sobre la referencia de imagen
    alert(
      "✨ ¡Tu diseño personalizado ha sido agregado al carrito! ✨\n\n" +
      "⚠️ Recuerda: La imagen de referencia se mostrará en tu PDF del pedido, " +
      "pero deberás adjuntarla manualmente en el chat de WhatsApp al finalizar tu compra."
    );

    // Reinicio de estados del formulario
    if (categoria === "ramo") {
      setRamoCantidad(1);
      setRamoTipoFlor("Rosa");
      setRamoOtroTipo("");
      setRamoColores("");
      setRamoConEnvoltura(false);
      setRamoDetalles("");
      setRamoImagen(null);
      setRamoImagenPreview("");
    } else if (categoria === "amigurumi") {
      setAmiNombre("");
      setAmiTamano("pequeno");
      setAmiColores("");
      setAmiDescripcion("");
      setAmiAccesorios([]);
      setAmiCantidad(1);
      setAmiImagen(null);
      setAmiImagenPreview("");
    } else if (categoria === "llavero") {
      setLlaveroNombre("");
      setLlaveroColores("");
      setLlaveroDescripcion("");
      setLlaveroTieneNombre(false);
      setLlaveroExtras([]);
      setLlaveroCantidad(1);
      setLlaveroImagen(null);
      setLlaveroImagenPreview("");
    }
    setErrors({});
    navigate("/carrito");
  };

  const getDatosCotizacion = () => {
    if (categoria === "ramo") {
      return { cantidad: ramoCantidad, conEnvoltura: ramoConEnvoltura };
    } else if (categoria === "amigurumi") {
      return { tamano: amiTamano, accesorios: amiAccesorios, cantidad: amiCantidad };
    } else if (categoria === "llavero") {
      return { tieneNombreTejido: llaveroTieneNombre, extras: llaveroExtras, cantidad: llaveroCantidad };
    }
    return {};
  };

  return (
    <section className="px-4 md:px-8 py-20 bg-pink-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Encabezado Principal */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Diseña tu Pedido ✨
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            Personaliza ramos, figuras amigurumi o llaveros a tu gusto. Agrégalos al carrito y completa tu pedido de forma unificada.
          </p>
        </div>

        {/* Sección Informativa: ¿Cómo funciona? */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            ¿Cómo funciona? 🤔
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { num: "1️⃣", title: "Selecciona el tipo de pedido", desc: "Escoge entre un ramo, amigurumi o llavero." },
              { num: "2️⃣", title: "Sube una imagen de referencia", desc: "Carga la imagen con el diseño que deseas para el PDF." },
              { num: "3️⃣", title: "Personaliza colores y detalles", desc: "Elige colores, detalles, extras y tamaños." },
              { num: "4️⃣", title: "Agrégalo al carrito", desc: "Guarda tu diseño personalizado en tu carrito de compras." },
              { num: "5️⃣", title: "Completa tus datos", desc: "Al finalizar la compra, llena la dirección y fecha de entrega." },
              { num: "6️⃣", title: "Envía por WhatsApp", desc: "Genera tu PDF con las imágenes de referencia y confírmalo por chat." }
            ].map((paso, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 shadow-md border border-pink-100/50 transition duration-200 ease-in-out hover:scale-[1.02] space-y-3"
              >
                <span className="text-3xl">{paso.num}</span>
                <h4 className="font-bold text-gray-800 text-base">{paso.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selector de Categoría (Paso 1) */}
        <PedidoTypeSelector
          categoriaSeleccionada={categoria}
          setCategoriaSeleccionada={(cat) => {
            setCategoria(cat);
            setErrors({});
          }}
        />

        {/* Sección Formulario Central + Resumen de Cotización */}
        {categoria && (
          <div id="seccionFormulario" className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Formularios correspondientes */}
            <form onSubmit={handleAgregarAlCarrito} className="lg:col-span-2 space-y-8">
              
              {categoria === "ramo" && (
                <BouquetForm
                  cantidad={ramoCantidad}
                  setCantidad={setRamoCantidad}
                  tipoFlor={ramoTipoFlor}
                  setTipoFlor={setRamoTipoFlor}
                  otroTipo={ramoOtroTipo}
                  setOtroTipo={setRamoOtroTipo}
                  colores={ramoColores}
                  setColores={setRamoColores}
                  conEnvoltura={ramoConEnvoltura}
                  setConEnvoltura={setRamoConEnvoltura}
                  detalles={ramoDetalles}
                  setDetalles={setRamoDetalles}
                  onImageChange={(file, preview) => handleImageChange("ramo", file, preview)}
                  imagenPreview={ramoImagenPreview}
                  errors={errors}
                />
              )}

              {categoria === "amigurumi" && (
                <AmigurumiForm
                  nombreDiseno={amiNombre}
                  setNombreDiseno={setAmiNombre}
                  tamano={amiTamano}
                  setTamano={setAmiTamano}
                  colores={amiColores}
                  setColores={setAmiColores}
                  descripcion={amiDescripcion}
                  setDescripcion={setAmiDescripcion}
                  accesoriosSeleccionados={amiAccesorios}
                  setAccesoriosSeleccionados={setAmiAccesorios}
                  cantidad={amiCantidad}
                  setCantidad={setAmiCantidad}
                  onImageChange={(file, preview) => handleImageChange("amigurumi", file, preview)}
                  imagenPreview={amiImagenPreview}
                  errors={errors}
                />
              )}

              {categoria === "llavero" && (
                <KeychainForm
                  nombreDiseno={llaveroNombre}
                  setNombreDiseno={setLlaveroNombre}
                  colores={llaveroColores}
                  setColores={setLlaveroColores}
                  descripcion={llaveroDescripcion}
                  setDescripcion={setLlaveroDescripcion}
                  tieneNombreTejido={llaveroTieneNombre}
                  setTieneNombreTejido={setLlaveroTieneNombre}
                  extrasSeleccionados={llaveroExtras}
                  setExtrasSeleccionados={setLlaveroExtras}
                  cantidad={llaveroCantidad}
                  setCantidad={setLlaveroCantidad}
                  onImageChange={(file, preview) => handleImageChange("llavero", file, preview)}
                  imagenPreview={llaveroImagenPreview}
                  errors={errors}
                />
              )}

              {/* Botón Agregar al Carrito */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold text-xl py-5 rounded-3xl shadow-lg hover:shadow-xl transform transition duration-200 active:scale-95 cursor-pointer text-center"
              >
                🛒 Agregar al Carrito
              </button>
            </form>

            {/* Resumen de Cotización */}
            <div className="lg:col-span-1">
              <QuoteSummary
                categoria={categoria}
                datos={getDatosCotizacion()}
              />
            </div>

          </div>
        )}
        
      </div>
    </section>
  );
}

export default DisenaPedido;
