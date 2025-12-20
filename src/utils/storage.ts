import type { User, Post, Category, Comment } from "../types"

const STORAGE_KEYS = {
  USERS: "communityApp_users",
  POSTS: "communityApp_posts",
  CURRENT_USER: "communityApp_currentUser",
  CATEGORIES: "communityApp_categories", // Added categories storage key
}

// Initialize with mock data
const initializeMockData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const mockUsers: User[] = [
      {
        id: "1",
        username: "admin",
        email: "admin@community.com",
        role: "admin",
        avatar: "/admin-avatar.png",
        bio: "Platform Administrator",
        followers: [],
        following: [],
        suspended: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        username: "johndoe",
        email: "john@example.com",
        role: "user",
        avatar: "/diverse-user-avatars.png",
        bio: "Passionate about community building and sharing experiences",
        link: "https://johndoe.com",
        followers: ["1"],
        following: [],
        suspended: false,
        createdAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers))
  }

  if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
    const mockPosts: Post[] = [
      {
        id: "1",
        userId: "2",
        username: "johndoe",
        userAvatar: "/diverse-user-avatars.png",
        image: "/nature-landscape-sunset.jpg",
        caption: "Beautiful sunset at the mountains today! Nature never fails to amaze me.",
        likes: ["1"],
        comments: [],
        shares: 5,
        category: "nature",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        status: "approved",
      },
      {
        id: "2",
        userId: "2",
        username: "johndoe",
        userAvatar: "/diverse-user-avatars.png",
        image: "/coffee-cafe-latte-art.jpg",
        caption: "Morning coffee ritual ☕ Starting the day right!",
        likes: [],
        comments: [],
        shares: 2,
        category: "lifestyle",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        status: "approved",
      },
      {
        id: "3",
        userId: "2",
        username: "johndoe",
        userAvatar: "/diverse-user-avatars.png",
        image: "/cozy-library-reading.jpg",
        caption: "Diving into some great reads this week. What are you reading?",
        likes: ["1"],
        comments: [],
        shares: 1,
        category: "books",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        status: "approved",
      },
    ]
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(mockPosts))
  }

  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    const mockCategories: Category[] = [
      {
        id: "1",
        name: "nature",
        description: "Nature and outdoor content",
        postCount: 1,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "lifestyle",
        description: "Lifestyle and daily activities",
        postCount: 1,
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "books",
        description: "Books and reading",
        postCount: 1,
        createdAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(mockCategories))
  }
}

// User Management
export const getUsers = (): User[] => {
  initializeMockData()
  const users = localStorage.getItem(STORAGE_KEYS.USERS)
  return users ? JSON.parse(users) : []
}

export const addUser = (user: User): void => {
  const users = getUsers()
  users.push(user)
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

export const updateUser = (userId: string, updates: Partial<User>): void => {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === userId)
  if (index !== -1) {
    users[index] = { ...users[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  }
}

export const deleteUser = (userId: string): void => {
  const users = getUsers().filter((u) => u.id !== userId)
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

// Current User Management
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  return user ? JSON.parse(user) : null
}

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }
}

// Post Management
export const getPosts = (): Post[] => {
  initializeMockData()
  const posts = localStorage.getItem(STORAGE_KEYS.POSTS)
  return posts ? JSON.parse(posts) : []
}

export const getApprovedPosts = (): Post[] => {
  return getPosts().filter((post) => post.status === "approved")
}

export const getPendingPosts = (): Post[] => {
  return getPosts().filter((post) => post.status === "pending")
}

export const addPost = (post: Post): void => {
  const posts = getPosts()
  posts.unshift(post)
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
}

export const updatePost = (postId: string, updates: Partial<Post>): void => {
  const posts = getPosts()
  const index = posts.findIndex((p) => p.id === postId)
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
  }
}

export const deletePost = (postId: string): void => {
  const posts = getPosts().filter((p) => p.id !== postId)
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
}

// Authentication
export const login = (email: string, password: string): User | null => {
  initializeMockData()
  const users = getUsers()
  // Simple mock authentication (in production, use proper auth)
  const user = users.find((u) => u.email === email)
  if (user) {
    setCurrentUser(user)
    return user
  }
  return null
}

export const logout = (): void => {
  setCurrentUser(null)
}

export const register = (username: string, email: string, password: string): User => {
  const newUser: User = {
    id: Date.now().toString(),
    username,
    email,
    role: "user",
    bio: "",
    createdAt: new Date().toISOString(),
  }
  addUser(newUser)
  setCurrentUser(newUser)
  return newUser
}

// Follow/Unfollow Functions
export const followUser = (followerId: string, followingId: string): void => {
  const users = getUsers()
  const followerIndex = users.findIndex((u) => u.id === followerId)
  const followingIndex = users.findIndex((u) => u.id === followingId)

  if (followerIndex !== -1 && followingIndex !== -1) {
    if (!users[followerIndex].following.includes(followingId)) {
      users[followerIndex].following.push(followingId)
    }
    if (!users[followingIndex].followers.includes(followerId)) {
      users[followingIndex].followers.push(followerId)
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  }
}

export const unfollowUser = (followerId: string, followingId: string): void => {
  const users = getUsers()
  const followerIndex = users.findIndex((u) => u.id === followerId)
  const followingIndex = users.findIndex((u) => u.id === followingId)

  if (followerIndex !== -1 && followingIndex !== -1) {
    users[followerIndex].following = users[followerIndex].following.filter((id) => id !== followingId)
    users[followingIndex].followers = users[followingIndex].followers.filter((id) => id !== followerId)
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  }
}

// Suspend/Unsuspend User Functions
export const suspendUser = (userId: string): void => {
  updateUser(userId, { suspended: true })
}

export const unsuspendUser = (userId: string): void => {
  updateUser(userId, { suspended: false })
}

// Like/Unlike Post Functions
export const likePost = (postId: string, userId: string): void => {
  const posts = getPosts()
  const post = posts.find((p) => p.id === postId)
  if (post && !post.likes.includes(userId)) {
    post.likes.push(userId)
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
  }
}

export const unlikePost = (postId: string, userId: string): void => {
  const posts = getPosts()
  const post = posts.find((p) => p.id === postId)
  if (post) {
    post.likes = post.likes.filter((id) => id !== userId)
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
  }
}

// Comment Functions
export const addComment = (postId: string, comment: Comment): void => {
  const posts = getPosts()
  const post = posts.find((p) => p.id === postId)
  if (post) {
    post.comments.push(comment)
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
  }
}

// Share Post Function
export const sharePost = (postId: string): void => {
  const posts = getPosts()
  const post = posts.find((p) => p.id === postId)
  if (post) {
    post.shares++
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
  }
}

// Category Management Functions
export const getCategories = (): Category[] => {
  initializeMockData()
  const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES)
  return categories ? JSON.parse(categories) : []
}

export const addCategory = (category: Category): void => {
  const categories = getCategories()
  categories.push(category)
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
}

export const updateCategory = (categoryId: string, updates: Partial<Category>): void => {
  const categories = getCategories()
  const index = categories.findIndex((c) => c.id === categoryId)
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
  }
}

export const deleteCategory = (categoryId: string): void => {
  const categories = getCategories().filter((c) => c.id !== categoryId)
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
}
