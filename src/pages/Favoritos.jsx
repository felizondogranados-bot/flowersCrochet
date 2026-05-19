import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import ProductCard from "../components/ProductCard"

function Favoritos() {

  const { favorites } =
    useContext(FavoritesContext)

  return (

    <section className="px-8 py-20">

      <h1 className="text-5xl font-bold text-gray-800 mb-12">
        Mis Favoritos 💖
      </h1>

      {favorites.length === 0 ? (

        <p className="text-gray-500 text-lg">
          No tienes productos favoritos 💔
        </p>

      ) : (

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {favorites.map((producto) => (

            <ProductCard
              key={producto.id}
              producto={producto}
            />

          ))}

        </div>

      )}

    </section>
  )
}

export default Favoritos