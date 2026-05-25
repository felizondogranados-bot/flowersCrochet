/**
 * CartContext - Contexto del Carrito
 * ==================================
 * Context API para manejar el estado global del carrito de compras.
 * Proporciona funciones para agregar y eliminar productos del carrito.
 * 
 * ESTRUCTURA DEL PRODUCTO EN CARRITO:
 * {
 *   cartId: string (ID único para el carrito),
 *   id: number,
 *   nombre: string,
 *   precio: number,
 *   cantidad: number,
 *   imagen: string,
 *   colorFlor?: string,
 *   colorDecoracion?: string,
 *   descripcionCliente?: string
 * }
 * 
 * @context
 */

import {
    createContext,
    useState
} from "react"

/**
 * CartContext - Contexto global del carrito
 */
export const CartContext = createContext()

/**
 * CartProvider - Proveedor del contexto del carrito
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} Provider con contexto del carrito
 */
function CartProvider({ children }) {

    // Estado global del carrito
    const [cart, setCart] = useState([])

    /**
     * Agrega un producto al carrito
     * @param {Object} producto - Producto a agregar
     */
    const addToCart = (producto) => {
        setCart((prev) => [
            ...prev,
            producto
        ])
    }

    /**
     * Elimina un producto del carrito por su ID único
     * @param {string} cartId - ID único del producto en el carrito
     */
    const removeFromCart = (cartId) => {
        setCart((prev) =>
            prev.filter((item) => item.cartId !== cartId)
        )
    }

    return (
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