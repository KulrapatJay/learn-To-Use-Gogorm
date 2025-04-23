'use client'

import { useCart } from "../../context/CartContext"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { ShoppingCart } from 'lucide-react';
import Navbar from "../../components/navbar/Navbar"

export default function Cart() {

    const {cartItems, removeItem, clearCart, updateQuantity } = useCart()   
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-[#FFEFD5]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold mb-6">🛒 ตะกร้าอาหาร</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">ยังไม่มีรายการอาหารในตะกร้า</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-6 h-6 text-gray-500" />
                      <span className="text-lg font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="text-red-500 hover:text-red-600">
                        ลบ
                      </button>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                        className="text-gray-500 hover:text-gray-600">
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className="text-gray-500 hover:text-gray-600">
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6">รวม: ฿{totalPrice}</div>
              <button 
                onClick={() => {
                    clearCart()
                    toast.success('สั่งอาหารเรียบร้อย')
                }}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4">
                สั่งอาหาร
              </button>
              <button 
                onClick={() => {
                    clearCart()
                    toast.success('ล้างคำสั่งซื้อเรียบร้อย')
                }}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                ล้างคำสั่งซื้อ
              </button>
            </>
          )}
        </div>
            </div>
        </div>
        </>
    )
}
