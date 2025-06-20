import { View } from 'react-native'
import { Typography } from '@/components/ui/typography'
import { useSession } from '@/lib/hooks/useSession'

export default function Settings() {
  const { signOut } = useSession()

  return (
    <View className='flex-1 items-center justify-center'>
      <Typography className="text-2xl font-bold">Settings</Typography>
      <Typography
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut()
        }}>
        Sign Out
      </Typography>
    </View>
  )
}