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
 * - JavaScript Moderno (const, let, template literals, destructuring, spread operator, arrow functions, filter)
 */

import {
    createContext,
    useState,
    useEffect
} from "react"

/**
 * CartContext - Contexto global del carrito
 * [React: createContext] Inicializa la API del contexto
 */
export const CartContext = createContext()

/**
 * CartProvider - Proveedor del contexto del carrito
 * [JS Moderno: Destructuring] Desestructura { children } desde las props recibidas
 * 
 * @param {Object} props - Props del componente
 * @returns {JSX.Element} Provider con contexto del carrito
 */
function CartProvider({ children }) {

    // [React: useState] Inicializa el estado con una función callback (Lazy initialization)
    // [DOM / Local Storage]: Lee y parsea los datos persistidos en el navegador
    const [cart, setCart] = useState(() => {
        // [JS Moderno: const]
        const cartGuardado = localStorage.getItem('flowersCrochet_cart')
        return cartGuardado ? JSON.parse(cartGuardado) : []
    })

    // [React: useEffect] Hook de efecto para persistir el carrito cada vez que cambia el estado 'cart'
    useEffect(() => {
        localStorage.setItem('flowersCrochet_cart', JSON.stringify(cart))
    }, [cart]) // Array de dependencias que controla la ejecución del efecto

    /**
     * Agrega un producto al carrito
     * [JS Moderno: Arrow Function]
     * 
     * @param {Object} producto - Producto a agregar
     */
    const addToCart = (producto) => {
        // [React / JS Avanzado: Callback de estado] Utiliza el estado previo de forma segura
        // [JS Moderno: Spread Operator] ...prev copia los elementos anteriores e inserta el nuevo producto
        setCart((prev) => [
            ...prev,
            producto
        ])
    }

    /**
     * Elimina un producto del carrito por su ID único
     * [JS Moderno: Arrow Function]
     * 
     * @param {string} cartId - ID único del producto en el carrito
     */
    const removeFromCart = (cartId) => {
        // [JS Avanzado: Métodos de Array] filter() crea un nuevo array excluyendo el producto con cartId coincidente
        setCart((prev) =>
            prev.filter((item) => item.cartId !== cartId)
        )
    }

    return (
        // [React Context: Provider] Provee el estado global y sus modificadores a los componentes descendientes
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider