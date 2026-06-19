'use client'

import type { Tag } from '@/types'
import { getTagLabel } from '@/lib/utils'

interface TagBadgeProps {
  tag: Tag
  variant?: 'default' | 'outline'
  onClick?: () => void
  isSelected?: boolean
}

const TAG_COLORS: Record<Tag, { default: string; outline: string }> = {
  frontend: {
    default: 'bg-blue-100 text-blue-800',
    outline: 'border-2 border-blue-300 bg-blue-50 text-blue-800',
  },
  backend: {
    default: 'bg-green-100 text-green-800',
    outline: 'border-2 border-green-300 bg-green-50 text-green-800',
  },
  qa: {
    default: 'bg-purple-100 text-purple-800',
    outline: 'border-2 border-purple-300 bg-purple-50 text-purple-800',
  },
}

export const TagBadge = ({
  tag,
  variant = 'default',
  onClick,
  isSelected,
}: TagBadgeProps) => {
  const colors = TAG_COLORS[tag]
  const colorClass = isSelected ? colors.outline : colors[variant]

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer ${colorClass} ${
        onClick ? 'hover:shadow-md' : ''
      }`}
    >
      {getTagLabel(tag)}
    </span>
  )
}
