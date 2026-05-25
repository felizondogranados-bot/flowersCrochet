/**
 * FavoritesContext - Contexto de Productos Favoritos
 * ==================================================
 * Context API para manejar el estado global de productos favoritos.
 * Permite agregar y eliminar productos del estado de favoritos.
 * 
 * ESTRUCTURA DEL PRODUCTO:
 * {
 *   id: number,
 *   nombre: string,
 *   precio: number,
 *   categoria: string,
 *   imagen: string,
 *   ...otros campos del producto
 * }
 * 
 * @context
 */

import { createContext, useState, useEffect } from "react"

/**
 * FavoritesContext - Contexto global de favoritos
 */
export const FavoritesContext = createContext()

/**
 * FavoritesProvider - Proveedor del contexto de favoritos
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} Provider con contexto de favoritos
 */
function FavoritesProvider({ children }) {

  // Estado global de productos favoritos - persistente en localStorage
  const [favorites, setFavorites] = useState(() => {
    const favoritosGuardados = localStorage.getItem('flowersCrochet_favorites')
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : []
  })

  // Guardar favoritos en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('flowersCrochet_favorites', JSON.stringify(favorites))
  }, [favorites])

  /**
   * Alterna un producto entre favoritos y no favoritos
   * Si existe, lo elimina; si no existe, lo agrega
   * @param {Object} producto - Producto a agregar o eliminar
   */
  const toggleFavorite = (producto) => {

    // Busca si el producto ya existe en favoritos
    const existe = favorites.find(
      (item) => item.id === producto.id
    )

    if (existe) {
      // Si existe, eliminarlo de favoritos
      setFavorites(
        favorites.filter(
          (item) => item.id !== producto.id
        )
      )
    } else {
      // Si no existe, agregarlo a favoritos
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