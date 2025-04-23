'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../navbar/Navbar'

type Food = {
    name: string;
    price: number;
}

type PopupProps = {
    initialData: Food;
    onSubmit: (data: Food) => void;
}


export default function FoodForm({ initialData, onSubmit }: PopupProps) {
    const [name, setName] = useState(initialData?.name || '');
    const [price, setPrice] = useState(initialData?.price || 0);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit({ name, price });
    setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow p-8 rounded-xl border border-orange-100">
          <div className="mb-6">
            <label className="block text-[#4B2E2E] font-medium mb-2">ชื่ออาหาร</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full p-3 border border-orange-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#4B2E2E] font-medium mb-2">ราคา (บาท)</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              required
              min={0}
              className="w-full p-3 border border-orange-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E4572E] text-white py-3 rounded hover:bg-[#C13100] transition-all shadow"
          >
            {isLoading ? 'กำลังบันทึก...' : 'บันทึกอาหาร'}
          </button>
        </form>
      )
}
