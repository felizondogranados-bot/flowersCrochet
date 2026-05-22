import { createContext, useState } from "react"

export const CartContext =
    createContext()

function CartProvider({ children }) {

    const [cart, setCart] =
        useState([])

    const addToCart = (producto) => {

        const productoExistente =
            cart.find(

                (item) =>

                    item.id === producto.id &&
                    item.colorSeleccionado === producto.colorSeleccionado &&
                    item.descripcionPersonalizada === producto.descripcionPersonalizada

            )

        if (productoExistente) {

            setCart(

                cart.map((item) =>

                    item.id === producto.id &&
                    item.colorSeleccionado === producto.colorSeleccionado &&
                    item.descripcionPersonalizada === producto.descripcionPersonalizada

                        ? {

                            ...item,

                            cantidad:
                                item.cantidad + producto.cantidad

                        }

                        : item

                )

            )

        } else {

            setCart([

                ...cart,

                producto

            ])

        }

    }

    const removeFromCart = (id) => {

        setCart(

            cart.filter(

                (item) => item.id !== id

            )

        )

    }

    return (

        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
            }}
        >

            {children}

        </CartContext.Provider>

    )
}

export default CartProvider