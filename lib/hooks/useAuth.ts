import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Simulate async auth check
    setTimeout(() => setIsLoggedIn(false), 500)
  }, [])

  return {
    isLoggedIn
  }
}