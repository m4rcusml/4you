import { View } from 'react-native'
import { Heart } from '@nandorojo/heroicons/24/solid'
import { Typography } from '@/components/ui/typography'

export default function Profile() {
  return (
    <View className="flex-1 items-center justify-center">
      <Typography className="text-2xl font-bold">Tela do botão do meio sla</Typography>
      <Heart color='red' width={64} height={64} />
    </View>
  )
}