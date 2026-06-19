import type { Tasks, TeamMember, Task } from '@/types'

const API_BASE = '/api'

// Database operations
export const addTask = async (
  member: TeamMember,
  text: string,
  tags: string[]
) => {
  try {
    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        member,
        text,
        tags,
      }),
    })
    const json = await response.json()
    return json.success ? json.data : null
  } catch (error) {
    console.error('Error adding task:', error)
    return null
  }
}

export const deleteTask = async (taskId: string) => {
  try {
    const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: 'DELETE',
    })
    const json = await response.json()
    return json.success
  } catch (error) {
    console.error('Error deleting task:', error)
    return false
  }
}

export const toggleTaskDone = async (taskId: string, done: boolean) => {
  try {
    const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done }),
    })
    const json = await response.json()
    return json.success ? json.data : null
  } catch (error) {
    console.error('Error toggling task:', error)
    return null
  }
}

export const moveTask = async (
  taskId: string,
  toMember: TeamMember
) => {
  try {
    const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ member: toMember }),
    })
    const json = await response.json()
    return json.success ? json.data : null
  } catch (error) {
    console.error('Error moving task:', error)
    return null
  }
}

export const getTasks = async (member?: TeamMember) => {
  try {
    const url = member ? `${API_BASE}/tasks?member=${member}` : `${API_BASE}/tasks`
    const response = await fetch(url)
    const json = await response.json()
    return json.success ? json.data : []
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
}

export const getAllTasks = async (): Promise<Tasks> => {
  try {
    const response = await fetch(`${API_BASE}/tasks`)
    const json = await response.json()

    if (!json.success || !json.data) {
      return { Suraj: [], Harsh: [], Twinkle: [] }
    }

    const tasks: Tasks = {
      Suraj: [],
      Harsh: [],
      Twinkle: [],
    }

    json.data.forEach((task: any) => {
      if (task.member in tasks) {
        tasks[task.member as TeamMember].push({
          id: task._id,
          text: task.text,
          done: task.done,
          tags: task.tags,
          createdAt: task.createdAt,
        })
      }
    })

    return tasks
  } catch (error) {
    console.error('Error fetching all tasks:', error)
    return { Suraj: [], Harsh: [], Twinkle: [] }
  }
}

// Authentication
export const setPassword = async (password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create-password', password }),
    })
    return (await response.json()).success
  } catch (error) {
    console.error('Error setting password:', error)
    return false
  }
}

export const verifyPassword = async (password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', password }),
    })
    return (await response.json()).success
  } catch (error) {
    console.error('Error verifying password:', error)
    return false
  }
}


export const getTaskStats = (tasks: Tasks) => {
  let totalTasks = 0
  let completedTasks = 0

  Object.values(tasks).forEach((memberTasks) => {
    memberTasks.forEach((task) => {
      totalTasks++
      if (task.done) completedTasks++
    })
  })

  return {
    total: totalTasks,
    completed: completedTasks,
    pending: totalTasks - completedTasks,
  }
}

// Auth session management (localStorage for session token only)
export const getAuth = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('DESKAID_AUTH') === 'true'
}

export const setAuth = (isAuthenticated: boolean): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('DESKAID_AUTH', String(isAuthenticated))
}

export const clearAuth = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('DESKAID_AUTH')
}
