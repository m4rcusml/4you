import { View } from 'react-native'
import { Heart } from '@nandorojo/heroicons/24/outline'
import { Typography } from '@/components/ui/typography'

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center">
      <Typography className="text-2xl font-bold">Home</Typography>
      <Heart color='red' width={64} height={64} />
    </View>
  )
}