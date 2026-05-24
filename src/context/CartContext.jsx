import {

    createContext,

    useState

} from "react"

export const CartContext =
    createContext()

function CartProvider({

    children

}) {

    const [cart, setCart] =
        useState([])

    const addToCart =
        (producto) => {

            setCart((prev) => [

                ...prev,

                producto

            ])

        }

    const removeFromCart =
        (cartId) => {

            setCart((prev) =>

                prev.filter(

                    (item) => item.cartId !== cartId

                )

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