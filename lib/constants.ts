import type { TeamMember, Tag } from '@/types'

export const TEAM_MEMBERS: TeamMember[] = ['Suraj', 'Harsh', 'Twinkle']

export const TAGS: Tag[] = ['frontend', 'backend', 'qa']

export const TAG_COLORS: Record<Tag, string> = {
  frontend: 'bg-blue-100 text-blue-800 border-blue-300',
  backend: 'bg-green-100 text-green-800 border-green-300',
  qa: 'bg-purple-100 text-purple-800 border-purple-300',
}

export const TAG_BADGE_COLORS: Record<Tag, string> = {
  frontend: 'bg-task-frontend',
  backend: 'bg-task-backend',
  qa: 'bg-task-qa',
}

export const STORAGE_KEYS = {
  PASSWORD: 'DESKAID_PASSWORD',
  AUTH: 'DESKAID_AUTH',
  TASKS: 'DESKAID_TASKS',
} as const
