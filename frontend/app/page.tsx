import { useState, useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-[#FFFBF5] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-[#4B2E2E] mb-6">
          🍜 ยินดีต้อนรับสู่ร้านอาหารของเรา
        </h1>
        <p className="text-xl text-[#7B4B2A] mb-10">
          อิ่มอร่อยกับเมนูสุดพิเศษ พร้อมให้คุณเลือกสรรได้ตามใจ!
        </p>
        <Link
          href="/foods"
          className="inline-block bg-[#E4572E] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#C13100] transition"
        >
          ดูเมนูอาหาร
        </Link>
      </div>
    </div>
  )
}
