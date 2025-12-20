"use client"

import { useState, useEffect } from "react"
import GuestView from "./components/GuestView"
import UserView from "./components/UserView"
import AdminView from "./components/AdminView"
import AuthModal from "./components/AuthModal"
import type { User } from "./types"
import { getCurrentUser, logout } from "./utils/storage"

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
  }, [])

  const handleLogin = () => {
    setAuthMode("login")
    setShowAuthModal(true)
  }

  const handleRegister = () => {
    setAuthMode("register")
    setShowAuthModal(true)
  }

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    logout()
    setCurrentUser(null)
  }

  // Render based on user role
  if (!currentUser) {
    return (
      <>
        <GuestView onLogin={handleLogin} onRegister={handleRegister} />
        {showAuthModal && (
          <AuthModal mode={authMode} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />
        )}
      </>
    )
  }

  if (currentUser.role === "admin") {
    return <AdminView onLogout={handleLogout} />
  }

  return <UserView onLogout={handleLogout} />
}
