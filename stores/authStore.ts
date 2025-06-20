import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginUser, registerUser } from '@/lib/api/auth'
import { User } from '@/types/user'

interface AuthState {
  user: User | null
  sessionToken: string | null
  isLoading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  initializeAuth: () => Promise<void>
  clearError: () => void
}

const SESSION_STORAGE_KEY = 'supabase.auth.session'

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  sessionToken: null,
  isLoading: true,
  error: null,

  clearError: () => set({ error: null }),

  initializeAuth: async () => {
    set({ isLoading: true })
    try {
      // Tenta carregar a sessão do AsyncStorage
      const storedSession = await AsyncStorage.getItem(SESSION_STORAGE_KEY)
      if (storedSession) {
        const { sessionToken, user } = JSON.parse(storedSession)
        set({ user, sessionToken, isLoading: false })
      } else {
        set({ user: null, sessionToken: null, isLoading: false })
      }
    } catch (e: any) {
      console.error('Failed to load session from storage:', e)
      set({ user: null, sessionToken: null, isLoading: false, error: 'Failed to initialize session.' })
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await loginUser(email, password) // Chama sua função de API
      if (response.user && response.sessionToken) {
        // Armazene a sessão manualmente
        await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
          sessionToken: response.sessionToken, // Seu token de sessão manual
          user: response.user,
        }))
        set({ user: response.user, sessionToken: response.sessionToken, isLoading: false })
        return true
      } else {
        set({ error: response.error || 'Erro desconhecido ao entrar.', isLoading: false })
        return false
      }
    } catch (e: any) {
      console.error('Sign-in error:', e)
      set({ error: e.message || 'Erro ao entrar. Verifique suas credenciais.', isLoading: false })
      return false
    }
  },

  signUp: async (name, email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await registerUser(name, email, password) // Chama sua função de API
      if (response.user && response.sessionToken) {
        await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
          sessionToken: response.sessionToken,
          user: response.user,
        }))
        set({ user: response.user, sessionToken: response.sessionToken, isLoading: false })
        return true
      } else {
        set({ error: response.error || 'Erro desconhecido ao criar conta.', isLoading: false })
        return false
      }
    } catch (e: any) {
      console.error('Sign-up error:', e)
      set({ error: e.message || 'Erro ao criar conta. Tente novamente.', isLoading: false })
      return false
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null })
    try {
      await AsyncStorage.removeItem(SESSION_STORAGE_KEY)
      // Você pode também querer invalidar o token no lado do servidor se estiver usando JWTs
      // await supabase.auth.signOut() // Removeria a sessão do Supabase Auth se estivesse usando
      set({ user: null, sessionToken: null, isLoading: false })
    } catch (e: any) {
      console.error('Sign-out error:', e)
      set({ error: e.message || 'Erro ao sair.', isLoading: false })
    }
  },
}))