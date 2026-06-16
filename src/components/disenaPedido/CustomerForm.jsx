import { useEffect } from "react";
import { getMinimumDeliveryDate } from "../../utils/deliveryDate";

/**
 * Componente CustomerForm
 * Solicita los datos de contacto del cliente y la fecha deseada de entrega.
 * Persiste los datos de contacto en Local Storage para autocompletarse en futuras visitas.
 * 
 * Temas demostrados:
 * - React: Props, useEffect para lectura y escritura en Local Storage
 * - Local Storage: JSON.parse(), JSON.stringify()
 * - Eventos: onChange
 * - JS Moderno: const, destructuring, arrow functions
 */
function CustomerForm({
  nombreCliente,
  setNombreCliente,
  telefonoCliente,
  setTelefonoCliente,
  provincia,
  setProvincia,
  canton,
  setCanton,
  distrito,
  setDistrito,
  fechaEntrega,
  setFechaEntrega,
  errors
}) {
  const provincias = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];
  
  // Obtenemos la fecha mínima calculada por la función utilitaria
  const minDate = getMinimumDeliveryDate();

  // [React: useEffect / Local Storage] Carga los datos del cliente al montar el componente
  useEffect(() => {
    const datosGuardados = localStorage.getItem("datosClientePersonalizado");
    if (datosGuardados) {
      try {
        const datos = JSON.parse(datosGuardados);
        if (datos.nombre) setNombreCliente(datos.nombre);
        if (datos.telefono) setTelefonoCliente(datos.telefono);
        if (datos.provincia) setProvincia(datos.provincia);
        if (datos.canton) setCanton(datos.canton);
        if (datos.distrito) setDistrito(datos.distrito);
      } catch (e) {
        console.error("Error cargando datos desde localStorage", e);
      }
    }
  }, [setNombreCliente, setTelefonoCliente, setProvincia, setCanton, setDistrito]);

  // [React: useEffect / Local Storage] Guarda automáticamente los datos cuando cambia algún campo
  useEffect(() => {
    const datosA_Guardar = {
      nombre: nombreCliente,
      telefono: telefonoCliente,
      provincia,
      canton,
      distrito
    };
    localStorage.setItem("datosClientePersonalizado", JSON.stringify(datosA_Guardar));
  }, [nombreCliente, telefonoCliente, provincia, canton, distrito]);

  return (
    <div className="bg-white rounded-[35px] shadow-lg p-8 border border-pink-100 space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 border-b border-pink-100 pb-4">
        Datos de Contacto y Entrega 📦
      </h3>

      {/* Nombre Completo */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700 text-sm">
          👤 Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: María Rodríguez"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          className={`w-full border-2 rounded-xl p-3 outline-none focus:border-pink-500 transition text-sm ${
            errors.nombreCliente ? "border-red-500" : "border-pink-200"
          }`}
        />
        {errors.nombreCliente && (
          <p className="text-red-500 text-xs mt-1">{errors.nombreCliente}</p>
        )}
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700 text-sm">
          📞 Número de teléfono <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          placeholder="Ej: 8888-8888"
          value={telefonoCliente}
          onChange={(e) => setTelefonoCliente(e.target.value)}
          className={`w-full border-2 rounded-xl p-3 outline-none focus:border-pink-500 transition text-sm ${
            errors.telefonoCliente ? "border-red-500" : "border-pink-200"
          }`}
        />
        {errors.telefonoCliente && (
          <p className="text-red-500 text-xs mt-1">{errors.telefonoCliente}</p>
        )}
      </div>

      {/* Provincia */}
      <div className="space-y-2">
        <label className="block font-bold text-gray-700 text-sm">
          🗺️ Provincia <span className="text-red-500">*</span>
        </label>
        <select
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
          className={`w-full border-2 rounded-xl p-3 outline-none focus:border-pink-500 transition text-sm bg-white cursor-pointer ${
            errors.provincia ? "border-red-500" : "border-pink-200"
          }`}
        >
          <option value="">Selecciona una provincia</option>
          {provincias.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
        {errors.provincia && (
          <p className="text-red-500 text-xs mt-1">{errors.provincia}</p>
        )}
      </div>

      {/* Cantón y Distrito */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block font-bold text-gray-700 text-sm">
            📌 Cantón <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej: San José"
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
            className={`w-full border-2 rounded-xl p-3 outline-none focus:border-pink-500 transition text-sm ${
              errors.canton ? "border-red-500" : "border-pink-200"
            }`}
          />
          {errors.canton && (
            <p className="text-red-500 text-xs mt-1">{errors.canton}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block font-bold text-gray-700 text-sm">
            🏛️ Distrito <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej: Carmen"
            value={distrito}
            onChange={(e) => setDistrito(e.target.value)}
            className={`w-full border-2 rounded-xl p-3 outline-none focus:border-pink-500 transition text-sm ${
              errors.distrito ? "border-red-500" : "border-pink-200"
            }`}
          />
          {errors.distrito && (
            <p className="text-red-500 text-xs mt-1">{errors.distrito}</p>
          )}
        </div>
      </div>

      {/* Fecha de Entrega */}
      <div className="space-y-2 border-t border-pink-100 pt-4">
        <label className="block font-bold text-gray-700 text-sm">
          📅 Fecha de entrega solicitada <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          min={minDate}
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
          className={`w-full border-2 rounded-xl p-3 outline-none focus:border-pink-500 transition text-sm bg-white cursor-pointer ${
            errors.fechaEntrega ? "border-red-500" : "border-pink-200"
          }`}
        />
        {errors.fechaEntrega && (
          <p className="text-red-500 text-xs mt-1">{errors.fechaEntrega}</p>
        )}
        <p className="text-xs text-amber-600 font-semibold mt-2">
          ⏳ Los pedidos personalizados requieren al menos 3 días hábiles de elaboración.
        </p>
      </div>
    </div>
  );
}

export default CustomerForm;
