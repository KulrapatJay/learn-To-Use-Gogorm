'use client'

type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

const variantStyles: Record<Variant, string> = {
  default: 'bg-neutral-100 text-neutral-800 border border-neutral-300',
  primary: 'bg-blue-100 text-blue-800 border border-blue-300',
  secondary: 'bg-purple-100 text-purple-800 border border-purple-300',
  success: 'bg-green-100 text-green-800 border border-green-300',
  warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  danger: 'bg-red-100 text-red-800 border border-red-300',
}

const icons: Record<Variant, string> = {
  default: 'ℹ️',
  primary: '🔵',
  secondary: '🟣',
  success: '✅',
  warning: '⚠️',
  danger: '❌',
}

export function Alert({
  title,
  variant = 'default',
  className,
  description,
}: {
  title: string
  variant?: Variant
  className?: string
  description?: string
}) {
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-md shadow-sm ${variantStyles[variant]} ${className ?? ''}`}
    >
      <span className="text-xl">{icons[variant]}</span>
      <span className="font-medium">{title}</span>
      <span className="text-sm">{description}</span>
    </div>
  )
}
