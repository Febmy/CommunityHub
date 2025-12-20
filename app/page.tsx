"use client"

import { useState, useEffect } from "react"
import "../src/index.css"
import GuestView from "../src/components/GuestView"
import UserView from "../src/components/UserView"
import AdminView from "../src/components/AdminView"
import AuthModal from "../src/components/AuthModal"
import type { User } from "../src/types"
import { getCurrentUser, logout } from "../src/utils/storage"

export default function Page() {
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
