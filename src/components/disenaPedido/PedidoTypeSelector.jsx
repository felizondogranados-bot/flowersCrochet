import { PRECIOS } from "../../utils/prices";

/**
 * RESPONSABILIDAD DE LA CARPETA (src/components/disenaPedido):
 * ==========================================================
 * Subcarpeta de componentes dedicados exclusivamente al flujo del pedido personalizado.
 * Separa de manera modular las partes del formulario de cotización.
 * 
 * Temas demostrados en este archivo:
 * - React: Props (comunicación unidireccional de componentes)
 * - JS Moderno: map() para renderizado dinámico, destructuring
 * - CSS/Tailwind: Transiciones CSS nativas, estados seleccionados
 */

function PedidoTypeSelector({ categoriaSeleccionada, setCategoriaSeleccionada }) {
  // Lista de tipos de pedidos con sus iconos, textos y precios importados
  const tiposPedido = [
    {
      id: "ramo",
      icono: "🌷",
      titulo: "Ramo de Flores Personalizado",
      descripcion: "Crea un ramo completamente personalizado con la cantidad de flores que desees.",
      precioInfo: `₡${PRECIOS.flor.toLocaleString()} por flor`
    },
    {
      id: "amigurumi",
      icono: "🧸",
      titulo: "Amigurumi Personalizado",
      descripcion: "Convierte una fotografía o personaje en una figura tejida a crochet.",
      precioInfo: `Desde ₡${PRECIOS.amigurumi.pequeno.toLocaleString()}`
    },
    {
      id: "llavero",
      icono: "🔑",
      titulo: "Llavero Personalizado",
      descripcion: "Diseña un llavero único inspirado en tu idea o fotografía.",
      precioInfo: `Precio base: ₡${PRECIOS.llavero.base.toLocaleString()}`
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Selecciona tu tipo de pedido 🌸
      </h2>

      {/* Grid responsivo: 1 columna en móvil, 3 en desktop */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiposPedido.map((tipo) => {
          const estaSeleccionada = categoriaSeleccionada === tipo.id;

          return (
            <button
              key={tipo.id}
              type="button"
              // [DOM/Eventos: onClick] Captura la selección de categoría y la eleva al componente padre
              onClick={() => setCategoriaSeleccionada(tipo.id)}
              className={`text-left p-8 rounded-[35px] border-2 shadow-lg bg-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex flex-col justify-between h-full ${
                estaSeleccionada
                  ? "border-pink-500 ring-4 ring-pink-100 bg-pink-50/20"
                  : "border-pink-100 hover:border-pink-300"
              }`}
            >
              <div>
                {/* Ícono de categoría */}
                <div className="text-5xl mb-4">{tipo.icono}</div>

                {/* Nombre de la categoría */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {tipo.titulo}
                </h3>

                {/* Breve descripción */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {tipo.descripcion}
                </p>
              </div>

              {/* Precio base */}
              <div className="text-xl font-bold text-pink-500">
                {tipo.precioInfo}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PedidoTypeSelector;
