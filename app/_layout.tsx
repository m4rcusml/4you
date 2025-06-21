import '../global.css'
import { SessionProvider } from '@/providers/session-provider'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { SplashScreenController } from '@/components/ui/splash'
import { useSession } from '@/lib/hooks/useSession'
import Header from '@/components/ui/header'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  )
}

export const unstable_settings = {
  initialRouteName: '(auth)',
}

function RootNavigator() {
  const { session } = useSession()

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'simple_push', contentStyle: { backgroundColor: '#fff' } }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name='contents/[id]' options={{
          header: props => <Header {...props} />,
          headerShown: true,
          presentation: 'fullScreenModal'
        }} />
        <Stack.Screen name="add-post" options={{
          presentation: 'transparentModal',
          animation: 'fade_from_bottom',
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' }
        }} />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack.Protected>
    </Stack>
  )
}