'use client'

import { useState, useEffect, useCallback } from 'react'
import { verifyPassword, setPassword, getAuth, setAuth, clearAuth } from '@/lib/storage'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordExists, setPasswordExists] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      const auth = getAuth()
      setIsAuthenticated(auth)

      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'check' }),
        })
        const data = await res.json()
        setPasswordExists(data.exists ?? false)
      } catch {
        setPasswordExists(false)
      }

      setIsLoading(false)
    }

    init()
  }, [])

  const login = useCallback(async (password: string) => {
    try {
      const success = await verifyPassword(password)
      if (success) {
        setAuth(true)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }, [])

  const createPassword = useCallback(async (password: string) => {
    try {
      const success = await setPassword(password)
      if (success) {
        setPasswordExists(true)
        setAuth(true)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Create password error:', error)
    }
  }, [])

  const logout = useCallback(() => {
    clearAuth()
    setIsAuthenticated(false)
  }, [])

  return {
    isAuthenticated,
    passwordExists,
    isLoading,
    login,
    createPassword,
    logout,
  }
}
