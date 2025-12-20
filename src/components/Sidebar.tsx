"use client"

import type { UserRole } from "../types"

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
  userRole: UserRole
  onLogout?: () => void
  showUsers?: boolean
  showCategories?: boolean
}

export default function Sidebar({
  currentView,
  onViewChange,
  userRole,
  onLogout,
  showUsers,
  showCategories,
}: SidebarProps) {
  const userLinks = [
    { id: "home", label: "Beranda", icon: "🏠" },
    { id: "explore", label: "Eksplorasi", icon: "🔍" },
    { id: "users", label: "Pengguna", icon: "👥" },
    { id: "create", label: "Tulis Postingan", icon: "✏️" },
    { id: "profile", label: "Profil", icon: "👤" },
  ]

  const adminLinks = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "Kelola Pengguna", icon: "👥" },
    { id: "moderation", label: "Moderasi Konten", icon: "🔒" },
    { id: "categories", label: "Kelola Kategori", icon: "📁" },
    { id: "analytics", label: "Analitik", icon: "📈" },
  ]

  const links = userRole === "admin" ? adminLinks : userLinks

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">NicheHub</h1>
            <p className="text-xs text-muted-foreground">Community Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => onViewChange(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  currentView === link.id ? "bg-primary text-white" : "hover:bg-muted text-foreground"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      {userRole !== "guest" && (
        <div className="p-4 border-t border-border">
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-left flex items-center gap-2"
          >
            <span className="text-xl">🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      )}
    </aside>
  )
}
