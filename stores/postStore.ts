import { PostType } from '@/types/post'
import { create } from 'zustand'

interface PostState {
  posts: PostType[]
  setPost: (post: PostType) => void
  likePost: (id: string) => void
  commentPost: (id: string, comment: string) => void
  deletePost: (id: string) => void

  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void

  error: string | null
  setError: (error: string | null) => void
  clearError: () => void
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  setPost: (post: PostType) => set({ posts: [post, ...get().posts] }),
  likePost: (id: string) => set({ posts: get().posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)) }),
  commentPost: (id: string, comment: string) => set({ posts: get().posts.map((post) => (post.id === id ? { ...post, comments: post.comments + 1 } : post)) }),
  deletePost: (id: string) => set({ posts: get().posts.filter((post) => post.id !== id) }),

  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  error: null,
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
}))