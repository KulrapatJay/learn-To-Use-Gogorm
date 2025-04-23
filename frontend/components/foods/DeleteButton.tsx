'use client'

import axios from 'axios'
import toast from 'react-hot-toast'

export default function DeleteButton({ id }: { id: number }) {

  const handleDelete = async () => {
    const confirmed = window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')

    if (!confirmed) return

    try {
      await toast.promise(
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/food/${id}`),
        {
          loading: 'กำลังลบ...',
          success: 'ลบรายการสำเร็จ ✅',
          error: 'ไม่สามารถลบได้ ❌',
        }
      )
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      console.error('ลบไม่สำเร็จ:', error)
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
    >
      🗑 ลบ
    </button>
  )
}
