'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/navbar/Navbar'


type Food = {
  id: number;
  name: string;
  price: number;
}

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/foods`)
      .then(res => {
        const sorted = res.data.sort((a: Food, b: Food) => a.price - b.price);
        setFoods(sorted);
      })
      .catch(err => console.error(err))
      .finally(() => setIsloading(false));
  }, []);

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-[#FFEFD5]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#4B2E2E] mt-8 tracking-wide">
          🍜 เมนูอาหาร
        </h1>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="ค้นหาเมนูอาหาร..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md sm:max-w-lg p-3 rounded-full border border-orange-200 bg-white text-[#4B2E2E] placeholder-[#7B4B2A] focus:outline-none focus:ring-2 focus:ring-[#E4572E] shadow-sm"
          />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-orange-100">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.length > 0 ? (
              filteredFoods.map(food => (
                <div
                  key={food.id}
                  className="bg-[#FFF1E6] border border-orange-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-xs mx-auto" // ปรับขนาดการ์ดให้แคบลงและอยู่ตรงกลาง
                >
                  <div className="p-6 flex flex-col items-center justify-center h-48"> {/* ใช้ flex-col เพื่อจัดกึ่งกลางทั้งแนวนอนและแนวตั้ง */}
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 text-[#4B2E2E] text-center">
                      {food.name}
                    </h2>
                    <p className="text-[#7B4B2A] mb-4 text-base sm:text-lg font-medium text-center">
                      ราคา: ฿{food.price}
                    </p>
                    <button
                      className="bg-[#E4572E] text-white px-4 sm:px-6 py-2 rounded-full hover:bg-[#C13100] transition-all duration-200 w-3/4 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base"
                      onClick={() => alert(`คุณเลือก: ${food.name}`)}
                    >
                      <span>🍽️</span> สั่งอาหาร
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[#7B4B2A] col-span-full">
                ไม่พบเมนูอาหารที่ตรงกับคำค้นหา
              </p>
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}