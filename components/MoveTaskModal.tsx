'use client'

import type { TeamMember } from '@/types'
import { TEAM_MEMBERS } from '@/lib/constants'
import { X } from 'lucide-react'

interface MoveTaskModalProps {
  isOpen: boolean
  currentMember: TeamMember
  onConfirm: (targetMember: TeamMember) => void
  onCancel: () => void
}

export const MoveTaskModal = ({
  isOpen,
  currentMember,
  onConfirm,
  onCancel,
}: MoveTaskModalProps) => {
  const targetMembers = TEAM_MEMBERS.filter((member) => member !== currentMember)
  const [selectedMember, setSelectedMember] = React.useState<TeamMember>(
    targetMembers[0]
  )

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm(selectedMember)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Move Task To</h2>
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {targetMembers.map((member) => (
              <label
                key={member}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <input
                  type="radio"
                  name="target-member"
                  value={member}
                  checked={selectedMember === member}
                  onChange={(e) => setSelectedMember(e.target.value as TeamMember)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="font-medium text-slate-900">{member}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Confirm Move
          </button>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
