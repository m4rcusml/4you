import { View } from 'react-native'
import { Typography } from '@/components/ui/typography'
import Logo from '@/assets/images/logo-primary.svg'

export default function Profile() {
  return (
    <View className="flex-1 p-6 gap-4 items-center justify-center">
      <Logo className="w-32 h-32" />

      <Typography className="text-center text-2xl font-bold">
        Fique calmo, em breve alguém irá até você.
      </Typography>

      <Typography className="text-center text-lg mt-2">
        Estamos chamando seus contatos de emergência e compartilhando sua localização.
      </Typography>
    </View>
  )
}