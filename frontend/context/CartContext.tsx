'use client'

import { createContext, useContext, useEffect, useState} from 'react'

export interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
}

interface CartContextType {
    cartItems: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: number) => void
    clearCart: () => void
    updateQuantity: (id: number, quantity: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export const useCart = () => useContext(CartContext)!

export function CartProvider({children}: {children: React.ReactNode}) {

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        const storedItems = localStorage.getItem('cartItems')
        if (storedItems) {
            setCartItems(JSON.parse(storedItems))
        }
    }, [])

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
          const existingItem = prev.find((i) => i.id === item.id)
          if (existingItem) {
            return prev.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          }
          return [...prev, item]
        })
      }

    const removeFromCart = (id: number) => {
        setCartItems((prev) => {
            return prev.filter(
                (i) => i.id !== id)
        })
    }

    const clearCart = () => {
        setCartItems([])
    }
    
    const updateQuantity = (id: number, quantity: number) => {
        setCartItems((prev) => {
            return prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
            ).filter(item => item.quantity > 0);
        });
    }
    
    return (
        <CartContext.Provider value={{cartItems, addItem: addToCart, removeItem: removeFromCart, clearCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    )
    
    
} 

