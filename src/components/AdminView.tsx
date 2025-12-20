"use client"

import { useState, useEffect } from "react"
import PostCard from "./PostCard"
import Header from "./Header"
import type { Post, User, Statistics, Category } from "../types"
import {
  getPosts,
  getUsers,
  updatePost,
  deletePost,
  deleteUser,
  getApprovedPosts,
  getPendingPosts,
  getCurrentUser,
  suspendUser,
  unsuspendUser,
  getCategories,
  addCategory,
  deleteCategory,
} from "../utils/storage"

interface AdminViewProps {
  onLogout: () => void
}

export default function AdminView({ onLogout }: AdminViewProps) {
  const [currentView, setCurrentView] = useState("dashboard")
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [admin, setAdmin] = useState<User | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [stats, setStats] = useState<Statistics>({
    totalUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    pendingPosts: 0,
    postsPerDay: 0,
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    setAdmin(currentUser)
    refreshData()
  }, [])

  const refreshData = () => {
    const allPosts = getPosts()
    const allUsers = getUsers()
    const allCategories = getCategories()
    setPosts(allPosts)
    setUsers(allUsers)
    setCategories(allCategories)

    const today = new Date().setHours(0, 0, 0, 0)
    const postsToday = allPosts.filter((p) => {
      const postDate = new Date(p.createdAt).setHours(0, 0, 0, 0)
      return postDate === today
    }).length

    setStats({
      totalUsers: allUsers.length,
      activeUsers: allUsers.filter((u) => u.role === "user" && !u.suspended).length,
      totalPosts: allPosts.length,
      pendingPosts: allPosts.filter((p) => p.status === "pending").length,
      postsPerDay: postsToday,
    })
  }

  const handleApprovePost = (postId: string) => {
    updatePost(postId, { status: "approved" })
    refreshData()
  }

  const handleRejectPost = (postId: string) => {
    updatePost(postId, { status: "rejected" })
    refreshData()
  }

  const handleDeletePost = (postId: string) => {
    if (confirm("Yakin ingin menghapus postingan ini?")) {
      deletePost(postId)
      refreshData()
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Yakin ingin menghapus pengguna ini?")) {
      deleteUser(userId)
      refreshData()
    }
  }

  const handleSuspendUser = (userId: string) => {
    if (confirm("Yakin ingin suspend pengguna ini?")) {
      suspendUser(userId)
      refreshData()
    }
  }

  const handleUnsuspendUser = (userId: string) => {
    unsuspendUser(userId)
    refreshData()
  }

  const handleAddCategory = () => {
    if (!newCategory.name) return

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      postCount: 0,
      createdAt: new Date().toISOString(),
    }

    addCategory(category)
    setNewCategory({ name: "", description: "" })
    refreshData()
  }

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm("Yakin ingin menghapus kategori ini?")) {
      deleteCategory(categoryId)
      refreshData()
    }
  }

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Dashboard Admin</h2>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-3xl font-bold text-foreground">{stats.totalUsers}</div>
                <div className="text-sm text-muted-foreground mt-1">Total Pengguna</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-3xl font-bold text-foreground">{stats.activeUsers}</div>
                <div className="text-sm text-muted-foreground mt-1">Pengguna Aktif</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-2">📝</div>
                <div className="text-3xl font-bold text-foreground">{stats.totalPosts}</div>
                <div className="text-sm text-muted-foreground mt-1">Total Postingan</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-2">⏳</div>
                <div className="text-3xl font-bold text-primary">{stats.pendingPosts}</div>
                <div className="text-sm text-muted-foreground mt-1">Menunggu Review</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Statistik Hari Ini</h3>
              <div className="flex items-center gap-4">
                <div className="text-4xl">📊</div>
                <div>
                  <div className="text-3xl font-bold text-primary">{stats.postsPerDay}</div>
                  <div className="text-sm text-muted-foreground">Postingan Hari Ini</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Aktivitas Terbaru</h3>
              <div className="space-y-3">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <img
                      src={post.image || post.video || "/placeholder.svg"}
                      alt=""
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{post.username}</p>
                      <p className="text-xs text-muted-foreground">{post.caption.slice(0, 50)}...</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        post.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : post.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "users":
        return (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Kelola Pengguna</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Pengguna</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Bergabung</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar || "/placeholder.svg?height=40&width=40&query=avatar"}
                              alt={user.username}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-medium text-foreground">{user.username}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.role === "admin" ? "bg-primary/10 text-primary" : "bg-neutral-100 text-neutral-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.suspended ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.suspended ? "Suspended" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString("id-ID")}
                        </td>
                        <td className="px-6 py-4">
                          {user.role !== "admin" && (
                            <div className="flex gap-2">
                              {user.suspended ? (
                                <button
                                  onClick={() => handleUnsuspendUser(user.id)}
                                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                                >
                                  Unsuspend
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleSuspendUser(user.id)}
                                  className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                                >
                                  Suspend
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                Hapus
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case "moderation":
        const pendingPosts = getPendingPosts()
        return (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Moderasi Konten</h2>
            <div className="space-y-6">
              {pendingPosts.length > 0 ? (
                pendingPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    showActions
                    onApprove={handleApprovePost}
                    onReject={handleRejectPost}
                    onDelete={handleDeletePost}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-muted rounded-lg">
                  <p className="text-muted-foreground">Tidak ada postingan yang perlu direview</p>
                </div>
              )}
            </div>
          </div>
        )

      case "categories":
        return (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Kelola Kategori</h2>

            {/* Add New Category */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Tambah Kategori Baru</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Nama kategori"
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Deskripsi"
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategory.name}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Tambah
                </button>
              </div>
            </div>

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">#{category.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-primary">{category.postCount}</span>
                    <span className="text-muted-foreground">postingan</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "analytics":
        const approvedPosts = getApprovedPosts()
        return (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Analitik</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Post Status Chart */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Status Postingan</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Disetujui</span>
                      <span className="font-medium text-foreground">{approvedPosts.length}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(approvedPosts.length / posts.length) * 100 || 0}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium text-foreground">{stats.pendingPosts}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: `${(stats.pendingPosts / posts.length) * 100 || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* User Growth */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Pertumbuhan Pengguna</h3>
                <div className="text-center py-8">
                  <div className="text-5xl font-bold text-primary mb-2">{stats.totalUsers}</div>
                  <div className="text-muted-foreground">Total Pengguna Terdaftar</div>
                  <div className="mt-4 text-sm">
                    <span className="font-bold text-green-600">{stats.activeUsers}</span>
                    <span className="text-muted-foreground"> pengguna aktif</span>
                  </div>
                </div>
              </div>
            </div>

            {/* All Posts Overview */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Semua Postingan</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {posts.slice(0, 10).map((post) => (
                  <div key={post.id} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={post.image || post.video || "/placeholder.svg"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {admin && (
        <Header
          user={admin}
          onLogout={onLogout}
          currentView={currentView}
          onViewChange={setCurrentView}
          userRole="admin"
        />
      )}

      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="grid grid-cols-5 py-2">
          {[
            { view: "dashboard", icon: "📊" },
            { view: "users", icon: "👥" },
            { view: "moderation", icon: "🔒" },
            { view: "categories", icon: "📁" },
            { view: "analytics", icon: "📈" },
          ].map(({ view, icon }) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`py-3 text-center ${currentView === view ? "text-primary" : "text-muted-foreground"}`}
            >
              <div className="text-2xl">{icon}</div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
