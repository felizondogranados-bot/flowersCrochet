import { useState } from "react";
import { PRECIOS } from "../../utils/prices";

/**
 * Componente BouquetForm
 * Formulario específico para ramos de flores personalizados.
 * 
 * Temas demostrados:
 * - React: Props, useState para validaciones locales
 * - Eventos: onChange, onClick
 * - JS Moderno: Let/Const, Arrow Functions, Template Literals
 */
function BouquetForm({
  cantidad,
  setCantidad,
  tipoFlor,
  setTipoFlor,
  otroTipo,
  setOtroTipo,
  colores,
  setColores,
  conEnvoltura,
  setConEnvoltura,
  detalles,
  setDetalles,
  onImageChange,
  imagenPreview,
  errors
}) {
  const [fileError, setFileError] = useState("");

  // Manejo de cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validación de tamaño de archivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("⚠️ La imagen supera el tamaño máximo permitido de 5MB.");
      onImageChange(null, "");
      return;
    }

    setFileError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      // Elevamos la imagen cargada y su preview al estado del padre
      onImageChange(file, reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-[35px] shadow-lg p-8 border border-pink-100 space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 border-b border-pink-100 pb-4">
        Configura tu Ramo de Flores 🌷
      </h3>

      {/* Información de precio */}
      <div className="bg-pink-50/50 text-gray-700 p-4 rounded-2xl border border-pink-100 text-sm">
        💡 Cada flor personalizada tiene un precio fijo de <strong>₡{PRECIOS.flor.toLocaleString()}</strong>.
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
              alt="Preview referencia"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Cantidad de Flores */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          📦 Cantidad de flores ({cantidad})
        </label>
        <input
          type="number"
          min="1"
          max="50"
          value={cantidad}
          onChange={(e) => setCantidad(Math.max(1, Math.min(50, Number(e.target.value))))}
          className="w-full border-2 border-pink-200 rounded-xl p-3 outline-none focus:border-pink-500 transition"
        />
        <p className="text-xs text-gray-400">Rango permitido: 1 a 50 flores.</p>
      </div>

      {/* Tipo de Flor */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          🌷 Tipo de flor
        </label>
        <div className="flex flex-wrap gap-3">
          {["Rosa", "Tulipán", "Girasol", "Mixto", "Otro"].map((opcion) => (
            <label
              key={opcion}
              className={`px-4 py-3 rounded-xl border-2 cursor-pointer transition text-sm font-semibold flex items-center gap-2 ${
                tipoFlor === opcion
                  ? "border-pink-500 bg-pink-50 text-pink-700"
                  : "border-pink-100 bg-white text-gray-600 hover:border-pink-200"
              }`}
            >
              <input
                type="radio"
                name="tipoFlor"
                value={opcion}
                checked={tipoFlor === opcion}
                onChange={(e) => setTipoFlor(e.target.value)}
                className="hidden"
              />
              {opcion}
            </label>
          ))}
        </div>

        {tipoFlor === "Otro" && (
          <input
            type="text"
            placeholder="Especifica el tipo de flor..."
            value={otroTipo}
            onChange={(e) => setOtroTipo(e.target.value)}
            className="w-full mt-3 border-2 border-pink-200 rounded-xl p-3 outline-none focus:border-pink-500 transition text-sm"
          />
        )}
      </div>

      {/* Colores Deseados (Obligatorio) */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          🎨 Colores deseados <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Ej: Rosas color rosa pastel y blanco..."
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

      {/* Envoltura Decorativa */}
      <div className="space-y-3">
        <label className="block font-bold text-gray-700">
          🎀 Envoltura decorativa
        </label>
        <div className="flex gap-4">
          <label
            className={`flex-1 p-4 border-2 rounded-2xl cursor-pointer hover:bg-pink-50 transition flex items-center justify-between ${
              conEnvoltura ? "border-pink-500 bg-pink-50/20" : "border-pink-100 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="envoltura"
                checked={conEnvoltura}
                onChange={() => setConEnvoltura(true)}
                className="accent-pink-500 w-4 h-4 cursor-pointer"
              />
              <span className="font-semibold text-gray-700 text-sm">Sí (+₡1.000)</span>
            </div>
          </label>
          <label
            className={`flex-1 p-4 border-2 rounded-2xl cursor-pointer hover:bg-pink-50 transition flex items-center justify-between ${
              !conEnvoltura ? "border-pink-500 bg-pink-50/20" : "border-pink-100 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="envoltura"
                checked={!conEnvoltura}
                onChange={() => setConEnvoltura(false)}
                className="accent-pink-500 w-4 h-4 cursor-pointer"
              />
              <span className="font-semibold text-gray-700 text-sm">No</span>
            </div>
          </label>
        </div>
      </div>

      {/* Detalles Especiales (Opcional) */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700">
          💬 Detalles especiales
        </label>
        <textarea
          placeholder="Ej: Quiero que el ramo tenga envoltura beige..."
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
          className="w-full h-24 border-2 border-pink-200 rounded-xl p-3 outline-none focus:border-pink-500 transition resize-none text-sm"
        />
      </div>
    </div>
  );
}

export default BouquetForm;
