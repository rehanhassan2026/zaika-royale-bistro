import React, { useState } from 'react'
import { ShieldCheck, Lock, Mail, ArrowRight, X, Sparkles, AlertCircle } from 'lucide-react'

export function AdminLogin({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleFillDemo = (type) => {
    if (type === 'userGmail') {
      setEmail('sandhucosmetics1@gmail.com')
      setPassword('admin123')
    } else {
      setEmail('admin@restaurant.com')
      setPassword('admin123')
    }
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validate credentials
    const validEmails = ['sandhucosmetics1@gmail.com', 'admin@restaurant.com', 'admin@zaikaroyale.com']
    if (validEmails.includes(email.trim().toLowerCase()) && password === 'admin123') {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        onLoginSuccess({ email: email.trim() })
        onClose()
      }, 400)
    } else {
      setError('Invalid credentials! Use demo credentials provided below: admin123')
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-neutral-950/70 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif">Admin Portal Login</h3>
              <p className="text-xs text-neutral-400">Part B: Restrict access to admin only</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          
          {/* Hackathon Submission Credentials Badge */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hackathon Submission Test Credentials:</span>
            </div>
            <div className="text-neutral-300 space-y-1 font-mono text-[11px] bg-neutral-950/70 p-2.5 rounded-xl border border-neutral-800">
              <div>Email: <strong className="text-white">sandhucosmetics1@gmail.com</strong></div>
              <div>Password: <strong className="text-amber-400">admin123</strong></div>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleFillDemo('userGmail')}
                className="flex-1 py-1 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-[11px] transition text-center"
              >
                1-Click Autofill (Gmail)
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="flex-1 py-1 px-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-[11px] transition text-center"
              >
                Autofill admin@
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@restaurant.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  )
}
