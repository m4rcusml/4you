import { router } from 'expo-router'
import { View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useSession } from '@/lib/hooks/useSession'
import { Typography } from '@/components/ui/typography'

import Logo from '@/assets/images/logo-primary.svg'

export default function LogIn() {
  const { signIn } = useSession()

  return (
    <SafeAreaView className='flex-1 items-center justify-center p-6'>
      <Logo />

      <View className='bg-gray-200 rounded p-2'>
        <Typography
          onPress={() => {
            signIn()
          }}>
          Entrar
        </Typography>
      </View>
    </SafeAreaView>
  )
}
