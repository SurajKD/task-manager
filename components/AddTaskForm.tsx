'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Tag } from '@/types'
import { TAGS } from '@/lib/constants'
import { TagBadge } from './TagBadge'

interface AddTaskFormProps {
  onAddTask: (text: string, tags: Tag[]) => void
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [taskText, setTaskText] = useState('')
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  const handleAddTask = () => {
    if (taskText.trim()) {
      onAddTask(taskText, selectedTags)
      setTaskText('')
      setSelectedTags([])
      setIsExpanded(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddTask()
    }
  }

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
      <div className="space-y-3">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsExpanded(true)}
          placeholder="Add a new task..."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />

        {isExpanded && (
          <>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <div
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="cursor-pointer"
                >
                  <TagBadge
                    tag={tag}
                    variant="outline"
                    isSelected={selectedTags.includes(tag)}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setIsExpanded(false)
                  setTaskText('')
                  setSelectedTags([])
                }}
                className="px-3 py-2 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={!taskText.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg transition-colors font-medium text-sm"
              >
                <Plus size={18} />
                Add Task
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
