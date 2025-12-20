"use client"

import { useState } from "react"
import type { User } from "../types"

interface HeaderProps {
  user: User
  onLogout: () => void
  currentView?: string
  onViewChange?: (view: string) => void
  userRole?: string
}

export default function Header({ user, onLogout, currentView, onViewChange, userRole }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  const userMenuItems = [
    { id: "home", label: "Beranda", icon: "🏠" },
    { id: "explore", label: "Eksplorasi", icon: "🔍" },
    { id: "users", label: "Pengguna", icon: "👥" },
    { id: "create", label: "Tulis Postingan", icon: "✏️" },
    { id: "profile", label: "Profil", icon: "👤" },
  ]

  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "Kelola Pengguna", icon: "👥" },
    { id: "moderation", label: "Moderasi Konten", icon: "🔍" },
    { id: "categories", label: "Kelola Kategori", icon: "🏷️" },
    { id: "analytics", label: "Analitik", icon: "📈" },
  ]

  const menuItems = userRole === "admin" ? adminMenuItems : userMenuItems

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg text-foreground">NicheHub</h1>
            <p className="text-xs text-muted-foreground">Community</p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          <div className="text-right hidden sm:block">
            <p className="font-medium text-foreground text-sm">{user.username}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={user.avatar || "/placeholder.svg?height=40&width=40&query=user+avatar"}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
            />
            <svg
              className={`w-4 h-4 text-foreground transition-transform ${showDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange?.(item.id)
                      setShowDropdown(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors ${
                      currentView === item.id ? "bg-primary/10 text-primary" : "text-foreground"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}

                <div className="border-t border-border my-2" />
                <button
                  onClick={() => {
                    onLogout()
                    setShowDropdown(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="text-xl">🚪</span>
                  <span className="font-medium">Keluar</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
