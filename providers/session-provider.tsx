// providers/session-provider.tsx
import { createContext, type PropsWithChildren, useEffect } from 'react'; // Importe useEffect
import { useAuthStore } from '@/stores/authStore'; // Importe seu store Zustand
import { User } from '@/types/user'; // Importe o tipo User

export const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  session?: string | null; // Seu token de sessão manual
  user: User | null; // Adicione o usuário aqui
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}>({
  signIn: async () => false, // Placeholder
  signUp: async () => false, // Placeholder
  signOut: async () => {}, // Placeholder
  session: null,
  user: null, // Inicialize user como null
  isLoading: true, // Começa como true
  error: null,
  clearError: () => {},
});

export function SessionProvider({ children }: PropsWithChildren) {
  const { user, sessionToken, isLoading, error, signIn, signUp, signOut, initializeAuth, clearError } = useAuthStore();

  // Inicia a autenticação quando o provedor é montado
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]); // initializeAuth é uma função do store, pode ser chamada diretamente

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        session: sessionToken, // Mude para sessionToken
        user,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}