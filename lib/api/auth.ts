import { supabase } from '@/lib/supabase'; // Verifique se o caminho para seu cliente supabase está correto

/**
 * Registra um novo usuário usando o Supabase Auth.
 * O nome do usuário é passado nos metadados para que nosso gatilho no banco de dados possa usá-lo.
 */
export async function signUpWithSupabase(name: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
    },
  });
  return { user: data.user, error };
}

/**
 * Realiza o login de um usuário com email e senha.
 */
export async function signInWithSupabase(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { session: data.session, error };
}

/**
 * Realiza o logout do usuário, invalidando a sessão.
 */
export async function signOutWithSupabase() {
  const { error } = await supabase.auth.signOut();
  return { error };
}