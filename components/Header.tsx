'use client'

import { LogOut } from 'lucide-react'
import type { Tasks } from '@/types'
import { getTaskStats } from '@/lib/storage'

interface HeaderProps {
  tasks: Tasks | null
  onLogout: () => void
}

export const Header = ({ tasks, onLogout }: HeaderProps) => {
  const stats = tasks ? getTaskStats(tasks) : { total: 0, completed: 0, pending: 0 }

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-slate-900">DeskAid Tasks</h1>
            <div className="hidden md:flex gap-6 text-sm">
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs font-medium">Total Tasks</span>
                <span className="text-lg font-semibold text-slate-900">{stats.total}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs font-medium">Completed</span>
                <span className="text-lg font-semibold text-green-600">{stats.completed}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs font-medium">Pending</span>
                <span className="text-lg font-semibold text-slate-600">{stats.pending}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Mobile Stats */}
        <div className="md:hidden grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200">
          <div className="text-center">
            <p className="text-slate-500 text-xs">Total</p>
            <p className="text-lg font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-xs">Completed</p>
            <p className="text-lg font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-xs">Pending</p>
            <p className="text-lg font-bold text-slate-600">{stats.pending}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
