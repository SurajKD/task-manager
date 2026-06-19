'use client'

import { useState } from 'react'
import type { TeamMember, Tasks, Task as TaskType, Tag } from '@/types'
import { TaskCard } from './TaskCard'
import { AddTaskForm } from './AddTaskForm'
import { MoveTaskModal } from './MoveTaskModal'
import {
  deleteTask,
  toggleTaskDone,
  moveTask,
  addTask,
  getAllTasks,
} from '@/lib/storage'

interface TeamBoardProps {
  member: TeamMember
  tasks: Tasks
  searchQuery?: string
  onTasksChange: (tasks: Tasks) => void
  onShowDeleteConfirm: (
    taskId: string,
    member: TeamMember,
    onConfirm: () => void
  ) => void
}

export const TeamBoard = ({
  member,
  tasks,
  searchQuery = '',
  onTasksChange,
  onShowDeleteConfirm,
}: TeamBoardProps) => {
  const [moveModalOpen, setMoveModalOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  let memberTasks = tasks[member]

  // Apply search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase()
    memberTasks = memberTasks.filter(
      (t) =>
        t.text.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    )
  }

  const completedCount = memberTasks.filter((t) => t.done).length
  const totalCount = memberTasks.length
  const allCount = tasks[member].length

  const handleAddTask = async (text: string, tags: Tag[]) => {
    await addTask(member, text, tags)
    const updatedTasks = await getAllTasks()
    onTasksChange(updatedTasks)
  }

  const handleToggleDone = async (taskId: string, currentDone: boolean) => {
    await toggleTaskDone(taskId, !currentDone)
    const updatedTasks = await getAllTasks()
    onTasksChange(updatedTasks)
  }

  const handleDeleteTask = (taskId: string) => {
    onShowDeleteConfirm(taskId, member, async () => {
      await deleteTask(taskId)
      const updatedTasks = await getAllTasks()
      onTasksChange(updatedTasks)
    })
  }

  const handleMoveTask = (taskId: string) => {
    setSelectedTaskId(taskId)
    setMoveModalOpen(true)
  }

  const handleConfirmMove = async (targetMember: TeamMember) => {
    if (selectedTaskId) {
      await moveTask(selectedTaskId, targetMember)
      const updatedTasks = await getAllTasks()
      onTasksChange(updatedTasks)
    }
    setMoveModalOpen(false)
    setSelectedTaskId(null)
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{member}</h2>
            <p className="text-sm text-slate-600 mt-1">
              {completedCount} / {totalCount} Completed
              {searchQuery.trim() && totalCount !== allCount && (
                <span className="text-slate-400 ml-1">(filtered from {allCount})</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Add Task Form - TOP */}
      <div className="p-4 border-b border-slate-200 bg-white">
        <AddTaskForm onAddTask={handleAddTask} />
      </div>

      {/* Tasks Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {memberTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <p className="text-slate-400 text-sm font-medium">
              {searchQuery.trim() ? 'No tasks match your search' : 'No tasks yet'}
            </p>
            <p className="text-slate-300 text-xs mt-1">
              {searchQuery.trim() ? 'Try a different search term' : 'Add your first task above'}
            </p>
          </div>
        ) : (
          memberTasks
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                currentMember={member}
                onToggleDone={() => handleToggleDone(task.id, task.done)}
                onDelete={() => handleDeleteTask(task.id)}
                onMove={() => handleMoveTask(task.id)}
              />
            ))
        )}
      </div>

      {/* Move Modal */}
      <MoveTaskModal
        isOpen={moveModalOpen}
        currentMember={member}
        onConfirm={handleConfirmMove}
        onCancel={() => {
          setMoveModalOpen(false)
          setSelectedTaskId(null)
        }}
      />
    </div>
  )
}
