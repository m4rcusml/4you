// providers/session-provider.tsx
import { createContext, type PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { User } from '@/types/user';

export const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  session?: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}>({
  signIn: async () => false,
  signUp: async () => false,
  signOut: async () => { },
  session: null,
  user: null,
  isLoading: true,
  error: null,
  clearError: () => { },
});

export function SessionProvider({ children }: PropsWithChildren) {
  const { user, sessionToken, isLoading, error, signIn, signUp, signOut, initializeAuth, clearError } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        session: sessionToken,
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