'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import Navbar from '../../components/navbar/Navbar'
import FoodForm from '../../components/foods/FoodForm'
import toast from 'react-hot-toast'


export default function CreateFood() {
    const handleCreate = async (data: { name: string, price: number }) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/food`, data);
            toast.success('รายการอาหารถูกเพิ่มเรียบร้อย');
            setTimeout(() => {
                window.location.href = '/foods';
            }, 3000);
        } catch (error) {
            console.error('Error creating food:', error);
            toast.error('เกิดข้อผิดพลาดในการเพิ่มรายการอาหาร');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-[#FFEFD5]">
          <Navbar />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#4B2E2E] mt-8 tracking-wide">
              เพิ่มเมนูอาหารใหม่ 🍛
            </h1>
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-orange-100">
              <FoodForm onSubmit={handleCreate} initialData={{ name: '', price: 0 }} />
            </div>
          </div>
        </div>
      )
}