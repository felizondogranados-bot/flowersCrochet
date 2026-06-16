import { useState } from "react";
import { PRECIOS } from "../../utils/prices";

/**
 * Componente AmigurumiForm
 * Formulario específico para amigurumis personalizados.
 * 
 * Temas demostrados:
 * - React: Props, useState para validaciones locales
 * - Eventos: onChange, onClick
 * - JS Moderno: map(), filter(), includes()
 */
function AmigurumiForm({
  nombreDiseno,
  setNombreDiseno,
  tamano,
  setTamano,
  colores,
  setColores,
  descripcion,
  setDescripcion,
  accesoriosSeleccionados,
  setAccesoriosSeleccionados,
  cantidad,
  setCantidad,
  onImageChange,
  imagenPreview,
  errors
}) {
  const [fileError, setFileError] = useState("");

  const listaAccesorios = [
    { id: "anteojos", label: "Anteojos" },
    { id: "espada", label: "Espada" },
    { id: "corona", label: "Corona" },
    { id: "sombrero", label: "Sombrero" },
    { id: "lazo", label: "Lazo" },
    { id: "mochila", label: "Mochila" },
    { id: "corazon", label: "Corazón" },
    { id: "flor", label: "Flor decorativa" }
  ];

  // Manejo de cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFileError("⚠️ La imagen supera el tamaño máximo permitido de 5MB.");
      onImageChange(null, "");
      return;
    }

    setFileError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageChange(file, reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Manejo de clicks en accesorios (añadir o quitar del array)
  const toggleAccesorio = (accId) => {
    if (accesoriosSeleccionados.includes(accId)) {
      // [JS Moderno: filter] Quitamos el accesorio si ya estaba seleccionado
      setAccesoriosSeleccionados(accesoriosSeleccionados.filter(id => id !== accId));
    } else {
      // [JS Moderno: Spread Operator] Añadimos el accesorio nuevo
      setAccesoriosSeleccionados([...accesoriosSeleccionados, accId]);
    }
  };

  return (
    <div className="bg-white rounded-[35px] shadow-lg p-8 border border-pink-100 space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 border-b border-pink-100 pb-4">
        Configura tu Amigurumi 🧸
      </h3>

      {/* Imagen de Referencia */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          📸 Imagen de referencia
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 cursor-pointer"
        />
        {fileError && <p className="text-red-500 text-xs mt-1">{fileError}</p>}
        {imagenPreview && (
          <div className="mt-4 relative w-32 h-32 rounded-xl overflow-hidden border border-pink-200">
            <img
              src={imagenPreview}
              alt="Preview amigurumi"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Nombre del Diseño (Obligatorio) */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          🧸 Nombre del diseño <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Pikachu, Mario Bros, Mi mascota, etc..."
          value={nombreDiseno}
          onChange={(e) => setNombreDiseno(e.target.value)}
          className={`w-full border-2 rounded-xl p-3 outline-none focus:border-pink-500 transition text-sm ${
            errors.nombreDiseno ? "border-red-500" : "border-pink-200"
          }`}
        />
        {errors.nombreDiseno && (
          <p className="text-red-500 text-xs mt-1">{errors.nombreDiseno}</p>
        )}
      </div>

      {/* Tamaño (Pequeño, Mediano, Grande) */}
      <div className="space-y-3">
        <label className="block font-bold text-gray-700">
          📏 Elige el tamaño
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: "pequeno", label: "Pequeño", desc: "10 cm de alto", precio: PRECIOS.amigurumi.pequeno },
            { id: "mediano", label: "Mediano", desc: "14 cm de alto", precio: PRECIOS.amigurumi.mediano },
            { id: "grande", label: "Grande", desc: "20 cm de alto", precio: PRECIOS.amigurumi.grande }
          ].map((item) => {
            const elegido = tamano === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTamano(item.id)}
                className={`p-4 rounded-2xl border-2 text-left bg-white transition duration-200 cursor-pointer flex flex-col justify-between ${
                  elegido ? "border-pink-500 bg-pink-50/20" : "border-pink-100 hover:border-pink-200"
                }`}
              >
                <div>
                  <span className="font-bold text-gray-800 text-sm block">{item.label}</span>
                  <span className="text-xs text-gray-400 block mb-3">{item.desc}</span>
                </div>
                <span className="font-bold text-pink-500 text-sm">₡{item.precio.toLocaleString()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Colores Deseados (Obligatorio) */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          🎨 Colores del personaje <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Ej: Cuerpo amarillo, detalles rojos y mejillas coloradas..."
          value={colores}
          onChange={(e) => setColores(e.target.value)}
          className={`w-full h-24 border-2 rounded-xl p-3 outline-none focus:border-pink-500 transition resize-none text-sm ${
            errors.colores ? "border-red-500" : "border-pink-200"
          }`}
        />
        {errors.colores && (
          <p className="text-red-500 text-xs mt-1">{errors.colores}</p>
        )}
      </div>

      {/* Descripción del personaje (Obligatorio) */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          💬 Descripción del personaje <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Ej: Quiero un Pikachu con detalles personalizados basado en la imagen..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className={`w-full h-24 border-2 rounded-xl p-3 outline-none focus:border-pink-500 transition resize-none text-sm ${
            errors.descripcion ? "border-red-500" : "border-pink-200"
          }`}
        />
        {errors.descripcion && (
          <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>
        )}
      </div>

      {/* Accesorios Checkboxes */}
      <div className="space-y-3">
        <label className="block font-bold text-gray-700">
          👑 Accesorios adicionales (+₡500 c/u)
        </label>
        {/* Grid de checkboxes en 2 columnas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {listaAccesorios.map((acc) => {
            const estaElegido = accesoriosSeleccionados.includes(acc.id);
            return (
              <button
                key={acc.id}
                type="button"
                onClick={() => toggleAccesorio(acc.id)}
                className={`p-3 rounded-xl border-2 transition text-xs font-semibold cursor-pointer text-center ${
                  estaElegido
                    ? "border-pink-500 bg-pink-50 text-pink-700"
                    : "border-pink-100 bg-white text-gray-600 hover:border-pink-200"
                }`}
              >
                {acc.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cantidad Selector */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          📦 Cantidad de amigurumis
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
            className="bg-pink-100 hover:bg-pink-200 text-pink-700 w-10 h-10 rounded-lg font-bold text-lg transition"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
            className="w-16 p-2 border-2 border-pink-200 rounded-lg text-center font-bold text-sm outline-none focus:border-pink-500"
          />
          <button
            type="button"
            onClick={() => setCantidad(cantidad + 1)}
            className="bg-pink-100 hover:bg-pink-200 text-pink-700 w-10 h-10 rounded-lg font-bold text-lg transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default AmigurumiForm;
