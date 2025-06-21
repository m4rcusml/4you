import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { signInWithSupabase, signOutWithSupabase, signUpWithSupabase } from '@/lib/api/auth';
import { supabase } from '@/lib/supabase';
import { User as Profile } from '@/types/user'; // Seu tipo de usuário/perfil

interface AuthState {
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  setAuth: (session: Session | null) => Promise<void>; // Chamado pelo provedor de sessão
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  session: null,
  isLoading: true, // Começa carregando até a sessão ser verificada
  error: null,

  setAuth: async (session) => {
    if (session) {
      // Sessão existe? Busca o perfil correspondente na tabela 'profiles'.
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        set({ session, profile: null, isLoading: false, error: 'Falha ao buscar perfil do usuário.' });
      } else {
        set({ session, profile: profile as Profile, isLoading: false, error: null });
      }
    } else {
      // Sessão não existe? Limpa tudo.
      set({ session: null, profile: null, isLoading: false, error: null });
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    const { error } = await signInWithSupabase(email, password);
    if (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }
    // O estado será atualizado pelo 'onAuthStateChange', não aqui.
    set({ isLoading: false });
    return true;
  },

  signUp: async (name, email, password) => {
    set({ isLoading: true, error: null });
    const { error } = await signUpWithSupabase(name, email, password);
    if (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }
    set({ isLoading: false });
    return true;
  },

  signOut: async () => {
    set({ isLoading: true });
    await signOutWithSupabase();
    // O estado também será limpo pelo 'onAuthStateChange'.
  },
}));