'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'

interface LoginScreenProps {
  passwordExists: boolean
  onCreatePassword: (password: string) => Promise<void>
  onLogin: (password: string) => Promise<boolean>
}

export const LoginScreen = ({
  passwordExists,
  onCreatePassword,
  onLogin,
}: LoginScreenProps) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!password.trim()) {
      setError('Password cannot be empty')
      return
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters')
      return
    }

    if (passwordExists) {
      const success = await onLogin(password)
      if (!success) {
        setError('Incorrect password')
        setPassword('')
      }
    } else {
      await onCreatePassword(password)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Lock size={32} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
            DeskAid Tasks
          </h1>
          <p className="text-center text-slate-600 mb-8">
            {passwordExists ? 'Welcome Back' : 'Create Your Password'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                {passwordExists ? 'Enter Password' : 'Create Password'}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  passwordExists ? 'Enter your password' : 'Create a password (min 4 characters)'
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {passwordExists ? 'Login' : 'Create Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
