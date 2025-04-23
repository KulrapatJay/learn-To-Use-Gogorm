'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../../components/navbar/Navbar'
import FoodForm from '../../../components/foods/FoodForm'
import toast from 'react-hot-toast'

interface Food {
    id: number
    name: string
    price: number
}

export default function FoodEditPage() {
    const { id } = useParams()
    const [food, setFood] = useState<Food | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    
    useEffect(() => {
        if (!id) return
        const fetchFood = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/food/${id}`)
                setFood(res.data)
            } catch (error) {
                toast.error('เกิดข้อผิดพลาดในการดึงข้อมูลอาหาร')
            } finally {
                setIsLoading(false)
            }
        }

        fetchFood()

    }, [id])

    const handleUpdate = async (data:{name: string, price: number}) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/food/${id}`, data)
            toast.success('อาหารถูกอัพเดตเรียบร้อย')
            setTimeout(() => {
                window.location.href = '/foods';
            }, 3000);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัพเดตอาหาร:', error)
            toast.error('เกิดข้อผิดพลาดในการอัพเดตอาหาร')
        }
    }

    if (isLoading) return <div className="text-center p-8">กำลังโหลดข้อมูล...</div>
    if (!food) return <div className="text-center text-red-500 mt-8">ไม่พบข้อมูลอาหาร</div>

return (
    <>
    <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-[#FFEFD5]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#4B2E2E] mt-8 tracking-wide">
                    แก้ไขเมนูอาหาร
                </h1>

                <FoodForm initialData={food} onSubmit={handleUpdate} /> 
                
            </div>
        </div>
    </>
)

}
