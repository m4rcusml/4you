import { PostType } from '@/types/post'
import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from './authStore'

interface PostState {
  posts: PostType[]
  fetchPosts: () => Promise<void>
  addPost: ({ content, userId }: { content: string; userId: string }) => Promise<void>
  likePost: (id: string, userId: string) => Promise<void>
  deletePost: (id: string) => Promise<void>
  toggleLike: (postId: string) => Promise<void>

  isLoading: boolean
  error: string | null
  clearError: () => void
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null })
    try {
      // Usamos uma RPC para buscar os posts com o nome de usuário e contagem de curtidas
      const { data, error } = await supabase.rpc('get_posts_with_details')

      if (error) {
        throw new Error(error.message)
      }

      set({ posts: data || [] })
    } catch (error: any) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  addPost: async ({ content, userId }: { content: string; userId: string }) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('posts')
        .insert({ content, user_id: userId }); // A RLS vai validar se o userId é igual ao do usuário logado

      if (error) {
        throw error;
      }

      // Recarrega os posts para mostrar o novo
      await get().fetchPosts();

    } catch (error: any) {
      console.error('Error adding post:', error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  likePost: async (id: string, userId: string) => {
    try {
      // Verifica se o usuário já curtiu
      const { data: existingLike, error: selectError } = await supabase
        .from('users_posts')
        .select('*')
        .eq('post_id', id)
        .eq('user_id', userId)
        .single()

      if (selectError && selectError.code !== 'PGRST116') { // PGRST116: "exact one row" not found
        throw selectError
      }

      if (existingLike) {
        // Descurtir (remover a linha)
        const { error: deleteError } = await supabase
          .from('users_posts')
          .delete()
          .eq('post_id', id)
          .eq('user_id', userId)
        if (deleteError) throw deleteError
      } else {
        // Curtir (inserir a linha)
        const { error: insertError } = await supabase
          .from('users_posts')
          .insert({ post_id: id, user_id: userId })
        if (insertError) throw insertError
      }

      // Atualiza o estado local para refletir a mudança de curtida
      await get().fetchPosts()

    } catch (error: any) {
      set({ error: error.message })
    }
  },

  deletePost: async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }

      set({ posts: get().posts.filter((post) => post.id !== id) })
    } catch (error: any) {
      set({ error: error.message })
    }
  },

  toggleLike: async (postId: string) => {
    const { posts } = get();
    const post = posts.find((p) => p.id === postId);
    const session = useAuthStore.getState().session;

    if (!post || !session) return;

    const userHasLiked = post.liked_by_user;
    const originalLikes = post.likes;

    // 1. Update Otimista: Atualiza a UI imediatamente
    set({
      posts: posts.map((p) =>
        p.id === postId
          ? {
            ...p,
            liked_by_user: !userHasLiked,
            likes: userHasLiked ? p.likes - 1 : p.likes + 1,
          }
          : p
      ),
    });

    try {
      // 2. Ação no Banco de Dados
      if (userHasLiked) {
        // Se já curtiu, descurte (DELETE)
        const { error } = await supabase
          .from('users_posts')
          .delete()
          .match({ user_id: session.user.id, post_id: postId });
        if (error) throw error;
      } else {
        // Se não curtiu, curta (INSERT)
        const { error } = await supabase
          .from('users_posts')
          .insert({ user_id: session.user.id, post_id: postId });
        if (error) throw error;
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // 3. Rollback: Se der erro, desfaz a alteração na UI
      set({
        posts: posts.map((p) =>
          p.id === postId ? { ...p, liked_by_user: userHasLiked, likes: originalLikes } : p
        ),
      });
    }
  },

  clearError: () => set({ error: null }),
}))