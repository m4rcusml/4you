import { createContext, type PropsWithChildren } from 'react'
import { useStorageState } from '@/lib/hooks/useStorageState'

export const AuthContext = createContext<{
  signIn: () => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
})

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session')

  return (
    <AuthContext
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setSession('xxx')
        },
        signOut: () => {
          setSession(null)
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext>
  )
}
