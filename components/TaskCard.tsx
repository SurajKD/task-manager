'use client'

import { Trash2, ArrowRight } from 'lucide-react'
import type { Task, TeamMember } from '@/types'
import { TagBadge } from './TagBadge'
import { formatDate } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  onToggleDone: () => void
  onDelete: () => void
  onMove: () => void
  currentMember: TeamMember
}

export const TaskCard = ({
  task,
  onToggleDone,
  onDelete,
  onMove,
  currentMember,
}: TaskCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-3 items-start">
        <input
          type="checkbox"
          checked={task.done}
          onChange={onToggleDone}
          className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer rounded transition-all"
        />

        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium break-words transition-all duration-300 ${
              task.done
                ? 'line-through text-slate-400'
                : 'text-slate-900'
            }`}
          >
            {task.text}
          </p>

          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {task.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}

          <p className="text-xs text-slate-500 mt-2">
            {formatDate(task.createdAt)}
          </p>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={onMove}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-blue-600"
            title="Move task"
          >
            <ArrowRight size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-600 hover:text-red-600"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
