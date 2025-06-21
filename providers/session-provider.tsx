import { createContext, useContext, type PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { User as Profile } from '@/types/user';

// Definimos o tipo de dados que nosso contexto irá fornecer
type AuthContextType = {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  session: Session | null;
  user: Profile | null; // Note que 'user' agora é nosso 'profile'
  isLoading: boolean;
};

// Criamos o contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// O componente Provedor
export function SessionProvider({ children }: PropsWithChildren) {
  const { profile, session, isLoading, signIn, signUp, signOut, setAuth } = useAuthStore();

  useEffect(() => {
    // Ao carregar o app, verifica a sessão imediatamente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(session);
    });

    // O "ouvinte" mágico: reage a LOGIN, LOGOUT, etc.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session);
    });

    // Limpa o ouvinte quando o app é fechado para evitar vazamentos de memória
    return () => subscription.unsubscribe();
  }, [setAuth]);

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, session, user: profile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}