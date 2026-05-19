import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {

    const carritoGuardado = localStorage.getItem("cart")

    return carritoGuardado
      ? JSON.parse(carritoGuardado)
      : []

  })

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    )

  }, [cart])

  const addToCart = (producto) => {

    const productoExistente = cart.find(
      (item) => item.id === producto.id
    )

    if (productoExistente) {

      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      )

    } else {

      setCart([
        ...cart,
        { ...producto, cantidad: 1 }
      ])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
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