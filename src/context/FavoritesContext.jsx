/**
 * RESPONSABILIDAD DE LA CARPETA (src/context):
 * ============================================
 * Esta carpeta contiene los archivos de React Context API. El contexto permite
 * compartir estados globales y funciones asociadas a través de todo el árbol
 * de componentes de la aplicación sin tener que pasar "props" manualmente 
 * en cada nivel intermediario ("prop drilling").
 * 
 * Temas demostrados en este archivo:
 * - React Context (createContext, useContext, Provider)
 * - Manejo de Estado Global y Local (useState, useEffect)
 * - Persistencia de datos en el navegador (Local Storage)
 * - JavaScript Moderno (const, let, destructuring, spread operator, arrow functions, find, filter)
 */

import { createContext, useState, useEffect } from "react"

/**
 * FavoritesContext - Contexto global de favoritos
 * [React: createContext] Inicializa la API del contexto
 */
export const FavoritesContext = createContext()

/**
 * FavoritesProvider - Proveedor del contexto de favoritos
 * [JS Moderno: Destructuring] Desestructura { children } desde las props recibidas
 * 
 * @param {Object} props - Props del componente
 * @returns {JSX.Element} Provider con contexto de favoritos
 */
function FavoritesProvider({ children }) {

  // [React: useState] Inicializa el estado de favoritos de forma perezosa (Lazy initialization)
  // [DOM / Local Storage]: Lee y parsea los datos persistidos en el navegador
  const [favorites, setFavorites] = useState(() => {
    // [JS Moderno: const]
    const favoritosGuardados = localStorage.getItem('flowersCrochet_favorites')
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : []
  })

  // [React: useEffect] Hook de efecto para guardar favoritos en localStorage cuando cambia 'favorites'
  useEffect(() => {
    localStorage.setItem('flowersCrochet_favorites', JSON.stringify(favorites))
  }, [favorites]) // Array de dependencias del efecto

  /**
   * Alterna un producto entre favoritos y no favoritos
   * Si existe, lo elimina; si no existe, lo agrega
   * [JS Moderno: Arrow Function]
   * 
   * @param {Object} producto - Producto a agregar o eliminar
   */
  const toggleFavorite = (producto) => {

    // [JS Avanzado: Métodos de Array] find() busca el primer elemento coincidente según la condición
    // [JS Moderno: Arrow Function] Evaluada en cada iteración
    const existe = favorites.find(
      (item) => item.id === producto.id
    )

    if (existe) {
      // Si existe, se filtra el arreglo para eliminarlo
      // [JS Avanzado: Métodos de Array] filter() devuelve un nuevo array excluyendo el ID seleccionado
      setFavorites(
        favorites.filter(
          (item) => item.id !== producto.id
        )
      )
    } else {
      // Si no existe, se inserta al arreglo utilizando copia por propagación
      // [JS Moderno: Spread Operator] ...favorites copia y concatena el nuevo producto
      setFavorites([
        ...favorites,
        producto
      ])
    }
  }

  return (
    // [React Context: Provider] Provee el estado global y la función de toggle a los componentes descendientes
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