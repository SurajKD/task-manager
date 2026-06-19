'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Tasks } from '@/types'
import { getAllTasks } from '@/lib/storage'

export const useLocalStorage = () => {
  const [tasks, setTasks] = useState<Tasks | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const loadTasks = async () => {
      try {
        const loadedTasks = await getAllTasks()
        setTasks(loadedTasks)
      } catch (error) {
        console.error('Error loading tasks:', error)
        setTasks({ Suraj: [], Harsh: [], Twinkle: [] })
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  const updateTasks = useCallback(async (newTasks: Tasks) => {
    setTasks(newTasks)
  }, [])

  return {
    tasks,
    setTasks: updateTasks,
    isLoading,
  }
}
