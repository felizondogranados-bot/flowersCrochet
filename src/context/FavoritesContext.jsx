import { createContext, useState } from "react"

export const FavoritesContext = createContext()

function FavoritesProvider({ children }) {

  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (producto) => {

    const existe = favorites.find(
      (item) => item.id === producto.id
    )

    if (existe) {

      setFavorites(
        favorites.filter(
          (item) => item.id !== producto.id
        )
      )

    } else {

      setFavorites([
        ...favorites,
        producto
      ])
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider