"use client"

import { useState, useEffect } from "react"
import PostCard from "./PostCard"
import type { Post } from "../types"
import { getApprovedPosts } from "../utils/storage"

interface GuestViewProps {
  onLogin: () => void
  onRegister: () => void
}

export default function GuestView({ onLogin, onRegister }: GuestViewProps) {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    setPosts(getApprovedPosts())
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-primary">Community</h1>
              <p className="text-xs text-muted-foreground">Niche Social Platform</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onLogin}
                className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
              >
                Masuk
              </button>
              <button
                onClick={onRegister}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-accent text-white rounded-xl p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-3 text-balance">Bergabung dengan Komunitas Kami</h2>
          <p className="text-lg mb-6 text-white/90 text-pretty">
            Bagikan momen, temukan inspirasi, dan terhubung dengan orang-orang yang memiliki minat yang sama
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onRegister}
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-neutral-100 transition-colors font-semibold"
            >
              Mulai Sekarang
            </button>
            <button
              onClick={onLogin}
              className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold"
            >
              Sudah Punya Akun?
            </button>
          </div>
        </div>

        {/* Feed Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Postingan Terbaru</h2>
          <p className="text-muted-foreground mt-1">Lihat apa yang dibagikan komunitas kami</p>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground">Belum ada postingan</p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-card border border-border rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Ingin berbagi cerita Anda?</h3>
          <p className="text-muted-foreground mb-4">
            Daftar sekarang untuk mulai memposting dan berinteraksi dengan komunitas
          </p>
          <button
            onClick={onRegister}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            Buat Akun Gratis
          </button>
        </div>
      </main>
    </div>
  )
}
