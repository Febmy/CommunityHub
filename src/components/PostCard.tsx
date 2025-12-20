"use client"

import { useState } from "react"
import type { Post, Comment, User } from "../types"

interface PostCardProps {
  post: Post
  currentUser?: User | null
  showActions?: boolean
  onApprove?: (postId: string) => void
  onReject?: (postId: string) => void
  onDelete?: (postId: string) => void
  onLike?: (postId: string) => void
  onComment?: (postId: string, comment: Comment) => void
  onShare?: (postId: string) => void
}

export default function PostCard({
  post,
  currentUser,
  showActions = false,
  onApprove,
  onReject,
  onDelete,
  onLike,
  onComment,
  onShare,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Hari ini"
    if (diffDays === 1) return "Kemarin"
    if (diffDays < 7) return `${diffDays} hari lalu`
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
  }

  const handleAddComment = () => {
    if (!commentText.trim() || !currentUser) return

    const newComment: Comment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      text: commentText,
      createdAt: new Date().toISOString(),
    }

    onComment?.(post.id, newComment)
    setCommentText("")
  }

  const handleShare = () => {
    onShare?.(post.id)
    alert("Postingan telah dibagikan!")
  }

  const isLiked = currentUser ? (post.likes || []).includes(currentUser.id) : false
  const likesCount = (post.likes || []).length
  const commentsArray = post.comments || []
  const sharesCount = post.shares || 0

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3">
        <img
          src={post.userAvatar || "/placeholder.svg?height=40&width=40&query=avatar"}
          alt={post.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{post.username}</h3>
          <p className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</p>
        </div>
        {post.status === "pending" && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
        )}
        {post.category && (
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">#{post.category}</span>
        )}
      </div>

      {/* Post Media */}
      <div className="w-full aspect-[4/3] bg-muted">
        {post.video ? (
          <video src={post.video} controls className="w-full h-full object-cover">
            Browser Anda tidak mendukung video.
          </video>
        ) : (
          <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-full object-cover" />
        )}
      </div>

      {currentUser && currentUser.role !== "guest" && !showActions && (
        <div className="px-4 py-3 flex items-center gap-6 border-b border-border">
          <button
            onClick={() => onLike?.(post.id)}
            className={`flex items-center gap-2 transition-colors ${
              isLiked ? "text-red-500" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="font-medium">{likesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="font-medium">{commentsArray.length}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span className="font-medium">{sharesCount}</span>
          </button>
        </div>
      )}

      {/* Post Caption */}
      <div className="p-4">
        <p className="text-foreground leading-relaxed">{post.caption}</p>
      </div>

      {showComments && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
            {commentsArray.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.userAvatar || "/placeholder.svg?height=32&width=32&query=avatar"}
                  alt={comment.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 bg-muted rounded-lg p-3">
                  <p className="font-semibold text-sm text-foreground">{comment.username}</p>
                  <p className="text-sm text-foreground mt-1">{comment.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(comment.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>

          {currentUser && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Tulis komentar..."
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                Kirim
              </button>
            </div>
          )}
        </div>
      )}

      {/* Admin Actions */}
      {showActions && (
        <div className="px-4 pb-4 flex gap-2">
          {post.status === "pending" && (
            <>
              <button
                onClick={() => onApprove?.(post.id)}
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium"
              >
                Approve
              </button>
              <button
                onClick={() => onReject?.(post.id)}
                className="flex-1 px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors font-medium"
              >
                Reject
              </button>
            </>
          )}
          <button
            onClick={() => onDelete?.(post.id)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
