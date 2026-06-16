import { PRECIOS } from "../../utils/prices";

/**
 * Componente QuoteSummary
 * Muestra el desglose detallado de precios y subtotal en formato cotización.
 * Actualiza los montos instantáneamente en tiempo real.
 * 
 * Temas demostrados:
 * - React: Props, Renderizado Condicional, Renderizado Dinámico
 * - Métodos de Array:
 *   - map(): Para iterar y listar accesorios y extras elegidos
 *   - filter(): Para depurar listas
 *   - reduce(): Para sumar dinámicamente precios de accesorios y extras
 * - JS Moderno: Let/Const, Arrow Functions, Template Literals
 */
function QuoteSummary({ categoria, datos }) {
  // Inicialización de variables de cálculo
  let productoLabel = "";
  let basePrice = 0;
  let lineItems = [];
  let totalEstimado = 0;

  // Cálculos dinámicos dependiendo de la categoría seleccionada
  if (categoria === "ramo") {
    productoLabel = "Ramo de Flores Personalizado";
    const cantidadFlores = datos.cantidad || 1;
    const costoFlores = cantidadFlores * PRECIOS.flor;
    const costoEnvoltura = datos.conEnvoltura ? PRECIOS.envoltura : 0;
    
    totalEstimado = costoFlores + costoEnvoltura;

    // Construimos los elementos de la factura
    lineItems = [
      { label: `Flores (Cantidad: ${cantidadFlores})`, val: costoFlores },
      { label: `Envoltura decorativa`, val: costoEnvoltura }
    ];
  } 
  else if (categoria === "amigurumi") {
    // Obtenemos el nombre legible y precio base del tamaño elegido
    const sizeMap = {
      pequeno: { label: "Pequeño (10 cm)", precio: PRECIOS.amigurumi.pequeno },
      mediano: { label: "Mediano (14 cm)", precio: PRECIOS.amigurumi.mediano },
      grande: { label: "Grande (20 cm)", precio: PRECIOS.amigurumi.grande }
    };
    const tamanoElegido = sizeMap[datos.tamano] || sizeMap.pequeno;
    
    // [JS Avanzado: reduce()] Suma el costo de todos los accesorios seleccionados
    const costoAccesoriosUnitario = (datos.accesorios || []).reduce((acumulado, accesorio) => {
      // Cada accesorio cuesta ₡500
      return acumulado + 500;
    }, 0);

    const cantidadAmis = datos.cantidad || 1;
    const costoBaseAcumulado = tamanoElegido.precio * cantidadAmis;
    const costoAccesoriosAcumulado = costoAccesoriosUnitario * cantidadAmis;

    totalEstimado = costoBaseAcumulado + costoAccesoriosAcumulado;

    lineItems = [
      { label: `Base Amigurumi: ${tamanoElegido.label} x${cantidadAmis}`, val: costoBaseAcumulado },
      { 
        label: `Accesorios (${(datos.accesorios || []).length} seleccionados)`, 
        val: costoAccesoriosAcumulado,
        detalles: (datos.accesorios || []).map(acc => acc.toUpperCase()).join(", ")
      }
    ];
  } 
  else if (categoria === "llavero") {
    productoLabel = "Llavero Personalizado";
    const cantidadLlaveros = datos.cantidad || 1;
    const costoBaseLlaveros = PRECIOS.llavero.base * cantidadLlaveros;
    const costoNombreTejido = datos.tieneNombreTejido ? (500 * cantidadLlaveros) : 0;

    // [JS Avanzado: reduce()] Suma el costo de todos los extras elegidos en el llavero
    const costoExtrasUnitario = (datos.extras || []).reduce((acumulado, extra) => {
      // Cada extra cuesta ₡500
      return acumulado + PRECIOS.llavero.extra;
    }, 0);
    const costoExtrasAcumulado = costoExtrasUnitario * cantidadLlaveros;

    totalEstimado = costoBaseLlaveros + costoNombreTejido + costoExtrasAcumulado;

    lineItems = [
      { label: `Base Llavero x${cantidadLlaveros}`, val: costoBaseLlaveros },
      { label: `Nombre Tejido`, val: costoNombreTejido },
      { 
        label: `Extras (${(datos.extras || []).length} seleccionados)`, 
        val: costoExtrasAcumulado,
        detalles: (datos.extras || []).map(ext => ext.toUpperCase()).join(", ")
      }
    ];
  }

  return (
    <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-[35px] shadow-2xl p-8 sticky top-24 border-2 border-pink-400">
      <h3 className="text-2xl font-bold border-b border-pink-400 pb-4 mb-6 flex justify-between items-center">
        <span>Resumen de Cotización 📋</span>
        <span className="text-xs bg-pink-400 px-3 py-1 rounded-full uppercase tracking-wider">Borrador</span>
      </h3>

      {categoria ? (
        <div className="space-y-6">
          <div>
            <span className="text-xs text-pink-200 block uppercase font-semibold">Producto seleccionado</span>
            <span className="text-lg font-bold">{productoLabel}</span>
          </div>

          <div className="border-t border-pink-400 pt-4 space-y-3">
            {lineItems.map((item, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between font-medium">
                  <span>{item.label}</span>
                  <span>₡{item.val.toLocaleString()}</span>
                </div>
                {item.detalles && (
                  <span className="text-xs text-pink-200 block mt-0.5 italic max-w-full truncate">
                    {item.detalles}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="border-t-2 border-pink-300 pt-6 flex justify-between items-end">
            <div>
              <span className="text-xs text-pink-200 block uppercase font-bold">Total estimado</span>
              <span className="text-4xl font-extrabold tracking-tight">
                ₡{totalEstimado.toLocaleString()}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-pink-200/90 leading-tight">
            * El total mostrado es aproximado. Se confirmará el precio definitivo por WhatsApp dependiendo de la complejidad final del tejido.
          </p>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-pink-100 text-sm">
            Selecciona un tipo de pedido en el paso anterior para calcular tu cotización en tiempo real. 🌸
          </p>
        </div>
      )}
    </div>
  );
}

export default QuoteSummary;
