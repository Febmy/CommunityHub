# NicheHub Community Platform

Platform media sosial komunitas niche yang bersih, responsif, dan modern dengan sistem role-based authentication menggunakan React, Next.js, dan TailwindCSS.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=flat-square&logo=tailwind-css)

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi Stack](#-teknologi-stack)
- [Instalasi](#-instalasi)
- [Cara Penggunaan](#-cara-penggunaan)
- [Struktur Proyek](#-struktur-proyek)
- [Role & Permissions](#-role--permissions)
- [Demo Credentials](#-demo-credentials)
- [Wireframe & Layout](#-wireframe--layout)
- [Dokumentasi API](#-dokumentasi-api)
- [Pengembangan](#-pengembangan)
- [Roadmap](#-roadmap)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Proyek

**NicheHub Community** adalah platform media sosial yang dirancang khusus untuk komunitas niche dengan tiga level akses berbeda: Guest, User, dan Admin. Platform ini menyediakan pengalaman yang disesuaikan untuk setiap role dengan fitur-fitur interaktif seperti posting konten, like, comment, share, follow/unfollow, serta panel admin yang lengkap untuk moderasi dan analytics.

### Tujuan Proyek

- Menyediakan platform komunitas yang mudah digunakan dan responsif
- Memfasilitasi interaksi antar anggota komunitas
- Memberikan kontrol penuh kepada admin untuk mengelola konten dan pengguna
- Mengimplementasikan best practices dalam web development modern

---

## ✨ Fitur Utama

### 🔓 Guest View (Pengunjung)
- ✅ Melihat feed postingan yang telah disetujui (read-only)
- ✅ CTA (Call-to-Action) yang jelas untuk mendaftar atau masuk
- ✅ Tidak ada fitur interaksi (like, comment, share)
- ✅ UI yang menarik untuk mendorong registrasi

### 👤 User View (Pengguna)
- ✅ **Beranda** - Feed postingan dengan interaksi penuh
- ✅ **Eksplorasi** - Grid view konten berdasarkan kategori
- ✅ **Pengguna** - Discover dan follow pengguna lain
- ✅ **Tulis Postingan** - Form membuat postingan baru
  - Upload gambar atau video
  - Tambahkan caption
  - Pilih kategori
  - Preview sebelum posting
- ✅ **Profil** - Halaman profil pribadi
  - Avatar dan bio
  - Link website
  - Statistik followers/following
  - Riwayat postingan
- ✅ **Interaksi Sosial**
  - Like postingan
  - Comment pada postingan
  - Share postingan
  - Follow/unfollow pengguna
- ✅ **Edit Profil**
  - Update username
  - Ubah bio
  - Ganti avatar
  - Tambah link website

### 👨‍💼 Admin View (Administrator)
- ✅ **Dashboard** - Statistik real-time
  - Total pengguna
  - Pengguna aktif
  - Total postingan
  - Postingan pending review
  - Postingan per hari
- ✅ **Kelola Pengguna**
  - Tabel pengguna lengkap
  - Suspend/unsuspend akun bermasalah
  - Hapus pengguna
  - Filter berdasarkan role dan status
- ✅ **Moderasi Konten**
  - Review postingan pending
  - Approve/reject postingan
  - Edit atau hapus postingan yang melanggar
  - Sistem review sebelum tayang
- ✅ **Kelola Kategori**
  - Tambah kategori baru
  - Edit deskripsi kategori
  - Hapus kategori
  - Lihat jumlah postingan per kategori
- ✅ **Analitik**
  - Grafik status postingan
  - Pertumbuhan pengguna
  - Overview semua postingan
  - Statistik engagement

### 🎨 Desain & UX
- ✅ Desain responsif (mobile-first)
- ✅ Dark mode support
- ✅ Animasi transisi halus
- ✅ Loading states
- ✅ Empty states yang informatif
- ✅ Header dinamis dengan dropdown navigasi
- ✅ Bottom navigation untuk mobile

---

## 🛠 Teknologi Stack

### Frontend Framework
- **Next.js 16.0** - React framework dengan App Router
- **React 19.2** - UI library dengan React Compiler support
- **TypeScript 5.0** - Type-safe development

### Styling & UI
- **TailwindCSS 4.1** - Utility-first CSS framework
- **Geist Font** - Typography dari Vercel
- **Lucide React** - Icon library
- **Radix UI** - Headless UI components
- **shadcn/ui** - Pre-built components

### Data Management
- **localStorage** - Client-side data persistence
- Custom hooks untuk state management
- Type-safe data models dengan TypeScript

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Vercel Analytics** - Web analytics

---

## 📦 Instalasi

### Prasyarat

Pastikan Anda telah menginstal:
- **Node.js** (v18.0 atau lebih tinggi)
- **npm** atau **yarn** atau **pnpm**
- **Git**

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/username/nichehub-community.git
   cd nichehub-community
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Jalankan production server
npm run start
```

---

## 🚀 Cara Penggunaan

### Sebagai Guest (Pengunjung)

1. Buka aplikasi di browser
2. Lihat feed postingan yang telah disetujui
3. Klik tombol **"Daftar"** atau **"Masuk"** untuk membuat akun atau login

### Sebagai User (Pengguna)

1. **Login** dengan credentials:
   - Email: `john@example.com`
   - Password: `anything` (password apapun)

2. **Navigasi Menu** (klik foto profil di header):
   - **Beranda** - Lihat feed postingan
   - **Eksplorasi** - Jelajahi konten berdasarkan kategori
   - **Pengguna** - Temukan dan follow pengguna lain
   - **Tulis Postingan** - Buat postingan baru
   - **Profil** - Lihat dan edit profil Anda

3. **Membuat Postingan**:
   - Klik menu "Tulis Postingan"
   - Upload gambar atau video
   - Tulis caption
   - Pilih kategori
   - Klik "Posting"
   - Postingan akan masuk queue untuk review admin

4. **Interaksi Sosial**:
   - Klik ❤️ untuk like postingan
   - Klik 💬 untuk comment
   - Klik 📤 untuk share
   - Klik tombol "Follow" untuk follow pengguna

5. **Edit Profil**:
   - Buka halaman Profil
   - Klik tombol "Edit Profil"
   - Update informasi Anda
   - Simpan perubahan

### Sebagai Admin (Administrator)

1. **Login** dengan credentials:
   - Email: `admin@community.com`
   - Password: `anything` (password apapun)

2. **Navigasi Menu** (klik foto profil di header):
   - **Dashboard** - Lihat statistik dan aktivitas
   - **Kelola Pengguna** - Manage semua pengguna
   - **Moderasi Konten** - Review postingan pending
   - **Kelola Kategori** - Tambah/hapus kategori
   - **Analitik** - Lihat analytics platform

3. **Moderasi Postingan**:
   - Buka menu "Moderasi Konten"
   - Review postingan pending
   - Klik "Setujui" untuk approve
   - Klik "Tolak" untuk reject
   - Klik "Hapus" untuk delete

4. **Kelola Pengguna**:
   - Buka menu "Kelola Pengguna"
   - Klik "Suspend" untuk suspend akun
   - Klik "Unsuspend" untuk aktifkan kembali
   - Klik "Hapus" untuk delete pengguna

5. **Kelola Kategori**:
   - Buka menu "Kelola Kategori"
   - Input nama dan deskripsi kategori
   - Klik "Tambah" untuk menambahkan
   - Klik ikon 🗑️ untuk hapus kategori

---

## 📁 Struktur Proyek

```
nichehub-community/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Entry point
│   └── globals.css             # Global styles & theme
├── src/
│   ├── components/
│   │   ├── AdminView.tsx       # Admin dashboard
│   │   ├── AuthModal.tsx       # Login/register modal
│   │   ├── EditProfileModal.tsx # Edit profile dialog
│   │   ├── GuestView.tsx       # Guest landing page
│   │   ├── Header.tsx          # App header with navigation
│   │   ├── PostCard.tsx        # Post card component
│   │   ├── Sidebar.tsx         # Sidebar navigation
│   │   └── UserView.tsx        # User dashboard
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── utils/
│   │   └── storage.ts          # localStorage utilities
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # App entry
│   └── index.css               # Tailwind imports
├── public/
│   ├── admin-avatar.png        # Admin avatar
│   ├── diverse-user-avatars.png # User avatars
│   ├── nature-landscape-sunset.jpg
│   ├── coffee-cafe-latte-art.jpg
│   └── cozy-library-reading.jpg
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

### Komponen Utama

#### `AdminView.tsx`
Dashboard admin dengan fitur lengkap untuk moderasi konten, kelola pengguna, kelola kategori, dan analytics.

#### `UserView.tsx`
Dashboard user dengan feed, explore, users list, create post form, dan profile page.

#### `GuestView.tsx`
Landing page untuk pengunjung dengan read-only feed dan CTA untuk registrasi.

#### `Header.tsx`
Header responsif dengan logo, nama user, foto profil, dan dropdown navigasi sesuai role.

#### `PostCard.tsx`
Kartu postingan dengan fitur like, comment, share, dan action buttons untuk admin.

#### `AuthModal.tsx`
Modal autentikasi dengan form login dan register yang dapat di-toggle.

#### `EditProfileModal.tsx`
Dialog untuk edit profil user dengan form lengkap.

---

## 🔐 Role & Permissions

### Guest (Pengunjung)
| Fitur | Akses |
|-------|-------|
| Lihat feed postingan | ✅ |
| Like postingan | ❌ |
| Comment postingan | ❌ |
| Share postingan | ❌ |
| Buat postingan | ❌ |
| Edit profil | ❌ |
| Follow user | ❌ |

### User (Pengguna)
| Fitur | Akses |
|-------|-------|
| Lihat feed postingan | ✅ |
| Like postingan | ✅ |
| Comment postingan | ✅ |
| Share postingan | ✅ |
| Buat postingan | ✅ |
| Edit profil | ✅ |
| Follow/unfollow user | ✅ |
| Hapus postingan sendiri | ✅ |
| Hapus postingan user lain | ❌ |
| Kelola pengguna | ❌ |
| Moderasi konten | ❌ |

### Admin (Administrator)
| Fitur | Akses |
|-------|-------|
| Semua fitur User | ✅ |
| Lihat dashboard analytics | ✅ |
| Moderasi konten | ✅ |
| Approve/reject postingan | ✅ |
| Hapus postingan apapun | ✅ |
| Kelola pengguna | ✅ |
| Suspend/unsuspend user | ✅ |
| Hapus pengguna | ✅ |
| Kelola kategori | ✅ |
| Lihat statistik platform | ✅ |

---

## 🔑 Demo Credentials

### Admin Account
```
Email: admin@community.com
Password: anything
```

### User Account
```
Email: john@example.com
Password: anything
```

> **Catatan:** Dalam aplikasi demo ini, password apapun akan diterima. Di production, gunakan sistem autentikasi yang proper dengan password hashing.

---

## 🎨 Wireframe & Layout

### Desktop Layout

```
┌─────────────────────────────────────────────────────────┐
│  [Logo] NicheHub Community      [Username ▼] [Avatar]   │  ← Header
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │                 Main Content Area                │   │
│  │  (Dashboard / Feed / Profile / Settings)         │   │
│  │                                                   │   │
│  │  • Guest: Feed + CTA                             │   │
│  │  • User: Feed + Interactions                     │   │
│  │  • Admin: Dashboard + Management Tools           │   │
│  │                                                   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout

```
┌─────────────────────┐
│ [Logo] [User Menu ▼] │  ← Header
├─────────────────────┤
│                     │
│   Main Content      │
│   (Scrollable)      │
│                     │
│                     │
│                     │
│                     │
│                     │
├─────────────────────┤
│ [🏠] [🔍] [✏️] [👤] │  ← Bottom Nav (Mobile)
└─────────────────────┘
```

### Header Dropdown Menu

**User Role:**
- 🏠 Beranda
- 🔍 Eksplorasi
- 👥 Pengguna
- ✏️ Tulis Postingan
- 👤 Profil
- 🚪 Keluar

**Admin Role:**
- 📊 Dashboard
- 👥 Kelola Pengguna
- 🔍 Moderasi Konten
- 🏷️ Kelola Kategori
- 📈 Analitik
- 🚪 Keluar

---

## 📡 Dokumentasi API

### Data Models

#### User
```typescript
interface User {
  id: string
  username: string
  email: string
  role: "guest" | "user" | "admin"
  avatar?: string
  bio?: string
  link?: string
  followers: string[]
  following: string[]
  suspended: boolean
  createdAt: string
}
```

#### Post
```typescript
interface Post {
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
```

#### Comment
```typescript
interface Comment {
  id: string
  userId: string
  username: string
  userAvatar?: string
  text: string
  createdAt: string
}
```

#### Category
```typescript
interface Category {
  id: string
  name: string
  description: string
  postCount: number
  createdAt: string
}
```

### Storage Functions

#### User Management
- `getUsers(): User[]` - Ambil semua pengguna
- `addUser(user: User): void` - Tambah pengguna baru
- `updateUser(userId: string, updates: Partial<User>): void` - Update data pengguna
- `deleteUser(userId: string): void` - Hapus pengguna
- `getCurrentUser(): User | null` - Ambil user yang sedang login
- `setCurrentUser(user: User | null): void` - Set user session
- `suspendUser(userId: string): void` - Suspend akun user
- `unsuspendUser(userId: string): void` - Unsuspend akun user

#### Post Management
- `getPosts(): Post[]` - Ambil semua postingan
- `getApprovedPosts(): Post[]` - Ambil postingan approved
- `getPendingPosts(): Post[]` - Ambil postingan pending
- `addPost(post: Post): void` - Tambah postingan baru
- `updatePost(postId: string, updates: Partial<Post>): void` - Update postingan
- `deletePost(postId: string): void` - Hapus postingan
- `likePost(postId: string, userId: string): void` - Like postingan
- `unlikePost(postId: string, userId: string): void` - Unlike postingan
- `addComment(postId: string, comment: Comment): void` - Tambah komentar
- `sharePost(postId: string): void` - Share postingan

#### Authentication
- `login(email: string, password: string): User | null` - Login user
- `logout(): void` - Logout user
- `register(username: string, email: string, password: string): User` - Register user baru

#### Follow System
- `followUser(followerId: string, followingId: string): void` - Follow user
- `unfollowUser(followerId: string, followingId: string): void` - Unfollow user

#### Category Management
- `getCategories(): Category[]` - Ambil semua kategori
- `addCategory(category: Category): void` - Tambah kategori
- `updateCategory(categoryId: string, updates: Partial<Category>): void` - Update kategori
- `deleteCategory(categoryId: string): void` - Hapus kategori

---

## 💻 Pengembangan

### Development Workflow

1. **Buat branch baru**
   ```bash
   git checkout -b feature/nama-fitur
   ```

2. **Kembangkan fitur**
   - Tulis kode dengan TypeScript
   - Ikuti konvensi penamaan
   - Tambahkan type definitions
   - Test secara manual

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: deskripsi fitur"
   ```

4. **Push ke repository**
   ```bash
   git push origin feature/nama-fitur
   ```

5. **Buat Pull Request**

### Coding Standards

#### TypeScript
- Selalu gunakan type definitions
- Hindari `any` type
- Gunakan interface untuk object shapes
- Export types dari `src/types/index.ts`

#### React Components
- Gunakan functional components
- Implementasikan proper error boundaries
- Tambahkan loading states
- Handle empty states

#### Styling
- Gunakan TailwindCSS classes
- Ikuti design tokens di `globals.css`
- Responsive mobile-first
- Dark mode compatible

#### File Naming
- Components: `PascalCase.tsx`
- Utils: `camelCase.ts`
- Types: `index.ts`
- Styles: `kebab-case.css`

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_APP_NAME=NicheHub Community
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🗺 Roadmap

### Phase 1: Core Features (✅ Selesai)
- ✅ Authentication system
- ✅ Role-based access control
- ✅ Post creation dan management
- ✅ Like, comment, share functionality
- ✅ Follow/unfollow system
- ✅ Admin dashboard
- ✅ Content moderation
- ✅ Category management
- ✅ Analytics dashboard

### Phase 2: Enhancement (🚧 In Progress)
- 🚧 Real database integration (PostgreSQL/MongoDB)
- 🚧 Image upload to cloud storage
- 🚧 Video processing dan streaming
- 🚧 Real-time notifications
- 🚧 Search functionality
- 🚧 Hashtag support
- 🚧 User mentions

### Phase 3: Advanced Features (📋 Planned)
- 📋 Direct messaging
- 📋 Stories feature
- 📋 Live streaming
- 📋 E-commerce integration
- 📋 Events management
- 📋 Groups/Communities
- 📋 Advanced analytics
- 📋 API untuk third-party

### Phase 4: Scale & Optimize (📋 Planned)
- 📋 Performance optimization
- 📋 SEO optimization
- 📋 PWA support
- 📋 Multi-language support
- 📋 Accessibility improvements
- 📋 Unit testing
- 📋 E2E testing
- 📋 CI/CD pipeline

---

## 🤝 Kontribusi

Kami sangat menerima kontribusi dari komunitas! Berikut cara berkontribusi:

### Cara Berkontribusi

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Guidelines

- Ikuti coding standards yang ada
- Tulis commit message yang jelas dan deskriptif
- Update dokumentasi jika diperlukan
- Test fitur sebelum submit PR
- Jelaskan perubahan Anda di PR description

### Code Review Process

1. PR akan di-review oleh maintainer
2. Diskusi dan iterasi jika diperlukan
3. Setelah approved, PR akan di-merge
4. Contributor akan dikreditkan di CHANGELOG

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

```
MIT License

Copyright (c) 2025 NicheHub Community

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Kontak & Support

### Bantuan & Dukungan

- **Dokumentasi**: Baca README ini dengan lengkap
- **Issues**: [GitHub Issues](https://github.com/username/nichehub-community/issues)
- **Discussions**: [GitHub Discussions](https://github.com/username/nichehub-community/discussions)

### Tim Pengembang

- **Lead Developer**: Your Name
- **Contributors**: [Lihat semua contributors](https://github.com/username/nichehub-community/graphs/contributors)

---

## 🙏 Acknowledgments

Terima kasih kepada:

- [Next.js](https://nextjs.org/) - React framework yang powerful
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [Vercel](https://vercel.com/) - Deployment platform
- Semua open-source contributors

---

## 📊 Statistics

![GitHub stars](https://img.shields.io/github/stars/username/nichehub-community?style=social)
![GitHub forks](https://img.shields.io/github/forks/username/nichehub-community?style=social)
![GitHub issues](https://img.shields.io/github/issues/username/nichehub-community)
![GitHub pull requests](https://img.shields.io/github/issues-pr/username/nichehub-community)
![GitHub last commit](https://img.shields.io/github/last-commit/username/nichehub-community)

---

<div align="center">

**Dibuat dengan ❤️ oleh NicheHub Team**

[⬆ Kembali ke atas](#nichehub-community-platform)

</div>
