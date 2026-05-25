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

import { createContext, useState } from "react"

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

  // Estado global de productos favoritos
  const [favorites, setFavorites] = useState([])

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