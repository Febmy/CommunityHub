export type UserRole = "guest" | "user" | "admin"

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  avatar?: string
  bio?: string
  link?: string
  followers: string[]
  following: string[]
  suspended: boolean
  createdAt: string
}

export interface Post {
  id: string
  userId: string
  username: string
  userAvatar?: string
  image?: string
  video?: string
  caption: string
  likes: string[]
  comments: Comment[]
  shares: number
  category: string
  createdAt: string
  status: "pending" | "approved" | "rejected"
}

export interface Comment {
  id: string
  userId: string
  username: string
  userAvatar?: string
  text: string
  createdAt: string
}

export interface Statistics {
  totalUsers: number
  activeUsers: number
  totalPosts: number
  pendingPosts: number
  postsPerDay: number
}

export interface Category {
  id: string
  name: string
  description: string
  postCount: number
  createdAt: string
}
