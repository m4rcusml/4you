import { SplashScreen } from 'expo-router'
import { useSession } from '@/lib/hooks/useSession'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

export function SplashScreenController() {
  const { isLoading } = useSession()
  const [loaded] = useFonts({
    // SpaceMono: require('../assets/fonts/Inter.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!isLoading && loaded) {
    SplashScreen.hideAsync()
  }

  return null
}
