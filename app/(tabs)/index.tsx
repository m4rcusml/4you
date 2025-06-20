import { Text, View } from 'react-native'
import { Heart } from '@nandorojo/heroicons/24/solid'

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Tab One</Text>
      <Heart color='red' width={64} height={64} />
    </View>
  )
}