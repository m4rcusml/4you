// api/auth.ts
import { supabase } from '@/lib/supabase' // Ajuste o caminho
import { User } from '@/types/user' // Ajuste o caminho
import * as Crypto from 'expo-crypto' // Para hashing de senha no cliente (APENAS PARA DEMONSTRAÇÃO)
// Para produção, hash de senha deve ser feito no backend (e.g., Supabase Edge Function ou seu próprio servidor)
// import bcrypt from 'bcryptjs' // Se estivesse usando um Node.js backend

// Função auxiliar para hashing simples (PARA DEMONSTRAÇÃO SOMENTE)
// Em produção, use uma função de hash segura no servidor!
async function hashPassword(password: string): Promise<string> {
  // Isso é um hashing SIMPLES e NÃO SEGURO para produção em cliente.
  // Use um algoritmo de hashing robusto como bcrypt ou Argon2 no seu BACKEND.
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password,
    { encoding: Crypto.CryptoEncoding.HEX }
  )
  return digest
}

export async function registerUser(name: string, email: string, password: string): Promise<{ user?: User; sessionToken?: string; error?: string }> {
  try {
    const password_hash = await hashPassword(password) // Hashing no cliente (AVISO: NÃO SEGURO PARA PROD.)

    const { data, error } = await supabase
      .from('users')
      .insert({ name, email, password_hash })
      .select()
      .single()

    if (error) {
      console.error('Supabase registration error:', error)
      // Erro comum: email duplicado
      if (error.code === '23505') { // Código de erro para violação de unique constraint
        return { error: 'Email já registrado. Por favor, faça login.' }
      }
      return { error: error.message || 'Erro ao registrar usuário.' }
    }

    if (data) {
      // Se o registro for bem-sucedido, você pode "autologar" o usuário
      // Gerar um token de sessão simples para demonstração (em produção, use JWT ou tokens mais robustos)
      const sessionToken = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${data.id}-${Date.now()}`,
        { encoding: Crypto.CryptoEncoding.HEX }
      )

      return { user: data as User, sessionToken }
    }

    return { error: 'Nenhum dado de usuário retornado após o registro.' }
  } catch (e: any) {
    console.error('Unexpected register error:', e)
    return { error: e.message || 'Erro inesperado ao registrar.' }
  }
}

export async function loginUser(email: string, password: string): Promise<{ user?: User; sessionToken?: string; error?: string }> {
  try {
    const password_hash = await hashPassword(password) // Hashing no cliente (AVISO: NÃO SEGURO PARA PROD.)

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password_hash', password_hash) // Compara o hash da senha
      .single()

    if (error) {
      console.error('Supabase login error:', error)
      return { error: 'Credenciais inválidas. Verifique seu email e senha.' }
    }

    if (data) {
      // Gerar um token de sessão simples para demonstração
      const sessionToken = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${data.id}-${Date.now()}`,
        { encoding: Crypto.CryptoEncoding.HEX }
      )

      return { user: data as User, sessionToken }
    }

    return { error: 'Credenciais inválidas. Verifique seu email e senha.' }
  } catch (e: any) {
    console.error('Unexpected login error:', e)
    return { error: e.message || 'Erro inesperado ao entrar.' }
  }
}