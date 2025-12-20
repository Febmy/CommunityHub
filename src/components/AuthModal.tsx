"use client"

import type React from "react"

import { useState } from "react"
import { login, register } from "../utils/storage"
import type { User } from "../types"

interface AuthModalProps {
  mode: "login" | "register"
  onClose: () => void
  onSuccess: (user: User) => void
}

export default function AuthModal({ mode, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(mode === "login")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (isLogin) {
      const user = login(formData.email, formData.password)
      if (user) {
        onSuccess(user)
      } else {
        setError("Email atau password salah")
      }
    } else {
      if (!formData.username || !formData.email || !formData.password) {
        setError("Semua field harus diisi")
        return
      }
      const user = register(formData.username, formData.email, formData.password)
      onSuccess(user)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-md w-full p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{isLogin ? "Masuk" : "Daftar"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl leading-none">
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="johndoe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            {isLogin ? "Masuk" : "Daftar"}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">{isLogin ? "Belum punya akun?" : "Sudah punya akun?"}</span>
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError("")
            }}
            className="ml-2 text-primary font-medium hover:underline"
          >
            {isLogin ? "Daftar" : "Masuk"}
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
          <div className="bg-muted rounded p-3 text-xs space-y-1">
            <p className="text-foreground">
              <strong>Admin:</strong> admin@community.com
            </p>
            <p className="text-foreground">
              <strong>User:</strong> john@example.com
            </p>
            <p className="text-muted-foreground">(password: anything)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
