"use client"

import { useState, useEffect } from "react"
import PostCard from "./PostCard"
import Header from "./Header"
import EditProfileModal from "./EditProfileModal"
import type { Post, User, Comment } from "../types"
import {
  getApprovedPosts,
  addPost,
  getCurrentUser,
  updateUser,
  likePost,
  unlikePost,
  addComment,
  sharePost,
  getUsers,
  followUser,
  unfollowUser,
  getCategories,
} from "../utils/storage"

interface UserViewProps {
  onLogout: () => void
}

export default function UserView({ onLogout }: UserViewProps) {
  const [currentView, setCurrentView] = useState("home")
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [newPost, setNewPost] = useState({ image: "", video: "", caption: "", category: "" })
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const categories = getCategories()

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setAllUsers(getUsers())
    refreshPosts()
  }, [])

  const refreshPosts = () => {
    setPosts(getApprovedPosts())
  }

  const handleCreatePost = () => {
    if ((!newPost.image && !newPost.video) || !newPost.caption || !user) return

    const post: Post = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      image: newPost.image,
      video: newPost.video,
      caption: newPost.caption,
      likes: [],
      comments: [],
      shares: 0,
      category: newPost.category,
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    addPost(post)
    setNewPost({ image: "", video: "", caption: "", category: "" })
    setCurrentView("home")
    alert("Postingan berhasil dibuat! Menunggu persetujuan admin.")
  }

  const handleLike = (postId: string) => {
    if (!user) return
    const post = posts.find((p) => p.id === postId)
    if (post?.likes.includes(user.id)) {
      unlikePost(postId, user.id)
    } else {
      likePost(postId, user.id)
    }
    refreshPosts()
  }

  const handleComment = (postId: string, comment: Comment) => {
    addComment(postId, comment)
    refreshPosts()
  }

  const handleShare = (postId: string) => {
    sharePost(postId)
    refreshPosts()
  }

  const handleEditProfile = (updates: Partial<User>) => {
    if (!user) return
    updateUser(user.id, updates)
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    setAllUsers(getUsers())
  }

  const handleFollowToggle = (targetUserId: string) => {
    if (!user) return
    if (user.following.includes(targetUserId)) {
      unfollowUser(user.id, targetUserId)
    } else {
      followUser(user.id, targetUserId)
    }
    const updatedUser = getCurrentUser()
    setUser(updatedUser)
    setAllUsers(getUsers())
  }

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Beranda</h2>
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={user}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-muted rounded-lg">
                  <p className="text-muted-foreground">Belum ada postingan</p>
                </div>
              )}
            </div>
          </div>
        )

      case "explore":
        return (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Eksplorasi</h2>

            <div className="mb-6 flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm font-medium transition-colors"
                >
                  #{cat.name} ({cat.postCount})
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group"
                >
                  <img
                    src={post.image || post.video || "/placeholder.svg"}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-bold">{post.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-bold">{post.comments.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "create":
        return (
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">Tulis Postingan</h2>
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kategori</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">URL Gambar</label>
                <input
                  type="text"
                  value={newPost.image}
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value, video: "" })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Atau URL Video</label>
                <input
                  type="text"
                  value={newPost.video}
                  onChange={(e) => setNewPost({ ...newPost, video: e.target.value, image: "" })}
                  placeholder="https://example.com/video.mp4"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {(newPost.image || newPost.video) && (
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  {newPost.video ? (
                    <video src={newPost.video} controls className="w-full h-full object-cover" />
                  ) : (
                    <img
                      src={newPost.image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Caption</label>
                <textarea
                  value={newPost.caption}
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                  placeholder="Tulis caption untuk postingan Anda..."
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button
                onClick={handleCreatePost}
                disabled={(!newPost.image && !newPost.video) || !newPost.caption}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Posting
              </button>
            </div>
          </div>
        )

      case "users":
        return (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Temukan Pengguna</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allUsers
                .filter((u) => u.id !== user?.id && u.role === "user")
                .map((otherUser) => (
                  <div key={otherUser.id} className="bg-card border border-border rounded-lg p-6">
                    <div className="text-center">
                      <img
                        src={otherUser.avatar || "/placeholder.svg?height=80&width=80&query=avatar"}
                        alt={otherUser.username}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                      />
                      <h3 className="font-bold text-foreground text-lg">{otherUser.username}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {otherUser.bio || "Belum ada bio"}
                      </p>
                      <div className="flex justify-center gap-6 mt-3 text-sm">
                        <div>
                          <span className="font-bold text-foreground">{otherUser.followers.length}</span>
                          <span className="text-muted-foreground ml-1">Pengikut</span>
                        </div>
                        <div>
                          <span className="font-bold text-foreground">{otherUser.following.length}</span>
                          <span className="text-muted-foreground ml-1">Mengikuti</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleFollowToggle(otherUser.id)}
                        className={`mt-4 w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                          user?.following.includes(otherUser.id)
                            ? "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
                            : "bg-primary text-white hover:bg-primary-dark"
                        }`}
                      >
                        {user?.following.includes(otherUser.id) ? "Berhenti Mengikuti" : "Ikuti"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )

      case "profile":
        if (!user) return null
        const userPosts = posts.filter((p) => p.userId === user.id)

        return (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Profil</h2>

            {/* Profile Header */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <img
                  src={user.avatar || "/placeholder.svg?height=120&width=120&query=user+avatar"}
                  alt={user.username}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{user.username}</h3>
                      <p className="text-muted-foreground mt-1">{user.email}</p>
                    </div>
                    <button
                      onClick={() => setShowEditProfile(true)}
                      className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                    >
                      Edit Profil
                    </button>
                  </div>
                  <p className="text-foreground mt-3 leading-relaxed">{user.bio || "Belum ada bio"}</p>
                  {user.link && (
                    <a
                      href={user.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mt-2 inline-block"
                    >
                      {user.link}
                    </a>
                  )}
                  <div className="flex gap-6 mt-4">
                    <div>
                      <span className="font-bold text-foreground">{userPosts.length}</span>
                      <span className="text-muted-foreground ml-1">Postingan</span>
                    </div>
                    <div>
                      <span className="font-bold text-foreground">{user.followers.length}</span>
                      <span className="text-muted-foreground ml-1">Pengikut</span>
                    </div>
                    <div>
                      <span className="font-bold text-foreground">{user.following.length}</span>
                      <span className="text-muted-foreground ml-1">Mengikuti</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User's Posts */}
            <h3 className="text-xl font-bold text-foreground mb-4">Postingan Saya</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    <img
                      src={post.image || post.video || "/placeholder.svg"}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                    {post.status === "pending" && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                        Pending
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-muted rounded-lg">
                  <p className="text-muted-foreground">Belum ada postingan</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {user && (
        <Header
          user={user}
          onLogout={onLogout}
          currentView={currentView}
          onViewChange={setCurrentView}
          userRole="user"
        />
      )}

      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 pb-20 lg:pb-8">
          <div className="max-w-5xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around py-2">
          {[
            { view: "home", icon: "🏠" },
            { view: "explore", icon: "🔍" },
            { view: "users", icon: "👥" },
            { view: "create", icon: "✏️" },
            { view: "profile", icon: "👤" },
          ].map(({ view, icon }) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`flex-1 py-3 text-center ${currentView === view ? "text-primary" : "text-muted-foreground"}`}
            >
              <div className="text-2xl">{icon}</div>
            </button>
          ))}
        </div>
      </nav>

      {showEditProfile && user && (
        <EditProfileModal user={user} onClose={() => setShowEditProfile(false)} onSave={handleEditProfile} />
      )}
    </div>
  )
}
