import '../global.css'
import { SessionProvider } from '@/providers/session-provider'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { SplashScreenController } from '@/components/ui/splash'
import { useSession } from '@/lib/hooks/useSession'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  )
}

function RootNavigator() {
  const { session } = useSession()

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fff' } }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  )
}