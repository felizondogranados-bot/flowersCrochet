import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import ProductCard from "../components/ProductCard"

function Favoritos() {

  const { favorites } = useContext(FavoritesContext)

  return (

    <section className="px-8 py-20 bg-pink-50 min-h-screen">

      <h1 className="text-5xl font-bold text-gray-800 mb-10">

        Mis Favoritos 💖

      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {favorites.length === 0 ? (

          <p className="text-gray-500 text-lg">

            No hay productos favoritos aún 💔

          </p>

        ) : (

          favorites.map((producto) => (

            <ProductCard 
              key={String(producto.id)} 
              producto={producto} 
            />

          ))

        )}

      </div>

    </section>

  )

}

export default Favoritos