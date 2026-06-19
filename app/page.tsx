'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { LoginScreen } from '@/components/LoginScreen'
import { TeamBoard } from '@/components/TeamBoard'
import { useAuth } from '@/hooks/useAuth'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { TEAM_MEMBERS } from '@/lib/constants'
import type { Tasks, TeamMember } from '@/types'
import { Search } from 'lucide-react'

export default function Home() {
  const auth = useAuth()
  const storage = useLocalStorage()
  const [deleteConfirm, setDeleteConfirm] = useState<{
    taskId: string
    member: any
    onConfirm: () => void
  } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<TeamMember>('Suraj')

  if (auth.isLoading || storage.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    return (
      <LoginScreen
        passwordExists={auth.passwordExists}
        onCreatePassword={auth.createPassword}
        onLogin={auth.login}
      />
    )
  }

  const handleLogout = () => {
    auth.logout()
  }

  const handleShowDeleteConfirm = (taskId: string, member: any, onConfirm: () => void) => {
    setDeleteConfirm({ taskId, member, onConfirm })
  }

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      deleteConfirm.onConfirm()
      setDeleteConfirm(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header tasks={storage.tasks} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {storage.tasks && (
          <div className="space-y-6">
            {/* Search Bar + Tabs Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks across all members..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm shadow-sm"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-200 p-1 rounded-xl">
              {TEAM_MEMBERS.map((member) => {
                const count = storage.tasks![member].length
                const completed = storage.tasks![member].filter((t) => t.done).length
                const isActive = activeTab === member

                return (
                  <button
                    key={member}
                    onClick={() => setActiveTab(member)}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <span>{member}</span>
                    <span className={`ml-2 text-xs ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                      {completed}/{count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Active Team Board */}
            <TeamBoard
              key={activeTab}
              member={activeTab}
              tasks={storage.tasks!}
              searchQuery={searchQuery}
              onTasksChange={storage.setTasks}
              onShowDeleteConfirm={handleShowDeleteConfirm}
            />
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Task?</h3>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete this task? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
