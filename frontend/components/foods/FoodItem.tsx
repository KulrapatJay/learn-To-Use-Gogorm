'use client'

import Link from 'next/link'
import DeleteButton from './DeleteButton'
import toast from 'react-hot-toast'
import { useCart } from '../../context/CartContext'

interface Food {
  id: number
  name: string
  price: number
}

export default function FoodItem({ food }: { food: Food }) {
    const { addItem } = useCart()

  return (
    <div className="flex flex-col justify-between border border-[#e6cdb3] rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white text-[#4B2E2E]">
      <div>
        <h2 className="text-lg font-bold mb-1">{food.name}</h2>
        <p className="text-sm text-gray-500">ราคา {food.price} บาท</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/foods/${food.id}`}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded bg-green-400 text-white hover:bg-green-500"
        >
          ✏️ แก้ไข
        </Link>

        <DeleteButton id={food.id} />

        <button
          onClick={() => {
            addItem({id: food.id, name: food.name, price: food.price, quantity: 1})
            toast.success(`คุณสั่ง ${food.name}`)
          }}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded bg-orange-400 text-white hover:bg-orange-500"

        >
          🍽 สั่งอาหาร
        </button>
      </div>
    </div>
  )
}
