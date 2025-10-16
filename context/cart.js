import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart')
      if (raw) setItems(JSON.parse(raw))
    } catch (e) {}
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function add(item) {
    setItems((cur) => {
      const found = cur.find((c) => c.productId === item.productId)
      if (found) return cur.map((c) => (c.productId === item.productId ? { ...c, quantity: c.quantity + item.quantity } : c))
      return [...cur, item]
    })
  }

  function remove(productId) {
    setItems((cur) => cur.filter((c) => c.productId !== productId))
  }

  function clear() {
    setItems([])
  }

  return <CartContext.Provider value={{ items, add, remove, clear }}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
