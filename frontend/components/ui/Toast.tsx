import React from 'react'

type ToastType = 'success' | 'error' | 'warning'

const toastStyles: Record<ToastType, string> = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
}

const icons: Record<ToastType, string> = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
}

export function Toast({ message, type = 'success' }: { message: string; type?: ToastType }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-md border shadow-md ${toastStyles[type]}`}
    >
      <span className="text-lg">{icons[type]}</span>
      <span>{message}</span>
    </div>
  )
}
