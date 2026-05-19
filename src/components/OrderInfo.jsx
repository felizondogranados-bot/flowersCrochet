import { motion } from "framer-motion"

function OrderInfo() {

  const info = [

    {
      titulo: "💳 Métodos de Pago",
      descripcion:
        "SINPE Móvil y transferencias bancarias.",
    },

    {
      titulo: "🚚 Envíos",
      descripcion:
        "Realizamos envíos a todo Costa Rica.",
    },

    {
      titulo: "🌸 Pedidos Personalizados",
      descripcion:
        "Puedes solicitar colores y diseños especiales.",
    },

    {
      titulo: "⏰ Tiempo de Entrega",
      descripcion:
        "Los pedidos tardan entre 3 y 7 días hábiles.",
    },

  ]

  return (

    <section
      id="pedidos"
      className="px-8 py-20 bg-pink-100"
    >

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-14">
        Información de Pedidos 🌸
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {info.map((item, index) => (

          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-8 shadow-md"
          >

            <h2 className="text-2xl font-semibold text-pink-500 mb-4">
              {item.titulo}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {item.descripcion}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  )
}

export default OrderInfo