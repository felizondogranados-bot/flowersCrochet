import { useState } from "react";
import { PRECIOS } from "../../utils/prices";

/**
 * Componente KeychainForm
 * Formulario específico para llaveros personalizados.
 * 
 * Temas demostrados:
 * - React: Props, useState para validaciones locales
 * - Eventos: onChange, onClick
 * - JS Moderno: map(), filter(), includes()
 */
function KeychainForm({
  nombreDiseno,
  setNombreDiseno,
  colores,
  setColores,
  descripcion,
  setDescripcion,
  tieneNombreTejido,
  setTieneNombreTejido,
  extrasSeleccionados,
  setExtrasSeleccionados,
  cantidad,
  setCantidad,
  onImageChange,
  imagenPreview,
  errors
}) {
  const [fileError, setFileError] = useState("");

  const listaExtras = [
    { id: "inicial", label: "Inicial personalizada" },
    { id: "corazon", label: "Corazón" },
    { id: "flor", label: "Flor decorativa" },
    { id: "lazo", label: "Lazo" }
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

  // Manejo de clicks en extras (añadir o quitar del array)
  const toggleExtra = (extraId) => {
    if (extrasSeleccionados.includes(extraId)) {
      setExtrasSeleccionados(extrasSeleccionados.filter(id => id !== extraId));
    } else {
      setExtrasSeleccionados([...extrasSeleccionados, extraId]);
    }
  };

  return (
    <div className="bg-white rounded-[35px] shadow-lg p-8 border border-pink-100 space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 border-b border-pink-100 pb-4">
        Configura tu Llavero 🔑
      </h3>

      {/* Precio base claramente visible */}
      <div className="bg-pink-50/50 text-pink-600 p-4 rounded-2xl border border-pink-100 text-center">
        <span className="text-sm font-semibold block text-gray-500">Precio base por llavero</span>
        <span className="text-3xl font-extrabold">₡{PRECIOS.llavero.base.toLocaleString()}</span>
      </div>

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
              alt="Preview llavero"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Nombre del Diseño (Obligatorio) */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          🔑 Nombre del diseño <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Llavero de cerdito, Inicial con flor, etc..."
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

      {/* Colores Deseados (Obligatorio) */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          🎨 Colores del llavero <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Ej: Inicial en color lila y flor decorativa en color blanco con amarillo..."
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

      {/* Descripción del llavero (Obligatorio) */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          💬 Descripción del diseño <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Ej: Inicial M tejida a crochet con llavero metálico..."
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

      {/* Nombre Tejido */}
      <div className="space-y-3">
        <label className="block font-bold text-gray-700">
          🏷️ Nombre tejido
        </label>
        <div className="flex gap-4">
          <label
            className={`flex-1 p-4 border-2 rounded-2xl cursor-pointer hover:bg-pink-50 transition flex items-center justify-between ${
              tieneNombreTejido ? "border-pink-500 bg-pink-50/20" : "border-pink-100 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="nombreTejido"
                checked={tieneNombreTejido}
                onChange={() => setTieneNombreTejido(true)}
                className="accent-pink-500 w-4 h-4 cursor-pointer"
              />
              <span className="font-semibold text-gray-700 text-sm">Sí (+₡500)</span>
            </div>
          </label>
          <label
            className={`flex-1 p-4 border-2 rounded-2xl cursor-pointer hover:bg-pink-50 transition flex items-center justify-between ${
              !tieneNombreTejido ? "border-pink-500 bg-pink-50/20" : "border-pink-100 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="nombreTejido"
                checked={!tieneNombreTejido}
                onChange={() => setTieneNombreTejido(false)}
                className="accent-pink-500 w-4 h-4 cursor-pointer"
              />
              <span className="font-semibold text-gray-700 text-sm">No</span>
            </div>
          </label>
        </div>
      </div>

      {/* Extras Checklist */}
      <div className="space-y-3">
        <label className="block font-bold text-gray-700">
          ✨ Extras adicionales (+₡500 c/u)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {listaExtras.map((ext) => {
            const estaElegido = extrasSeleccionados.includes(ext.id);
            return (
              <button
                key={ext.id}
                type="button"
                onClick={() => toggleExtra(ext.id)}
                className={`p-3 rounded-xl border-2 transition text-xs font-semibold cursor-pointer text-center ${
                  estaElegido
                    ? "border-pink-500 bg-pink-50 text-pink-700"
                    : "border-pink-100 bg-white text-gray-600 hover:border-pink-200"
                }`}
              >
                {ext.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cantidad */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          📦 Cantidad de llaveros
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

export default KeychainForm;
