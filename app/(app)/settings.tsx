import { View, Switch, Pressable } from 'react-native'
import { Typography } from '@/components/ui/typography'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { useColorScheme } from '@/lib/hooks/useColorScheme'
import { useState } from 'react'

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
}

export default function Settings() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const [camouflage, setCamouflage] = useState(false)
  const [notifications, setNotifications] = useState(false)

  return (
    <View className="flex-1 bg-background px-6 pt-6">
      <Typography className="text-2xl font-bold mb-4">Configurações</Typography>

      {/* Geral */}
      <Card className="mb-4" style={shadowStyle}>
        <CardHeader className="pb-2">
          <Typography className="font-bold text-lg">Geral</Typography>
        </CardHeader>
        <CardContent className="pt-0">
          <View className="flex-row items-center justify-between py-3">
            <Typography>Notificações</Typography>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ccc', true: '#e53888' }}
              thumbColor={notifications ? '#fff' : '#fff'}
            />
          </View>
        </CardContent>
      </Card>
      
      {/* Preferências */}
      <Card className="mb-4" style={shadowStyle}>
        <CardHeader className="pb-2">
          <Typography className="font-bold text-lg">Preferências</Typography>
        </CardHeader>
        <CardContent className="pt-0">
          <View className="flex-row items-center justify-between py-3">
            <Typography>Modo Escuro</Typography>
            <Switch
              value={colorScheme === 'dark'}
              onValueChange={toggleColorScheme}
              trackColor={{ false: '#ccc', true: '#e53888' }}
              thumbColor={colorScheme === 'dark' ? '#fff' : '#fff'}
            />
          </View>
          <View className="flex-row items-center justify-between py-3">
            <Typography>Modo Camuflagem</Typography>
            <Switch
              value={camouflage}
              onValueChange={setCamouflage}
              trackColor={{ false: '#ccc', true: '#e53888' }}
              thumbColor={camouflage ? '#fff' : '#fff'}
            />
          </View>
          <Pressable className="py-3">
            <Typography>Privacidade e Segurança</Typography>
          </Pressable>
        </CardContent>
      </Card>

      {/* Sobre */}
      <Card style={shadowStyle}>
        <CardHeader className="pb-2">
          <Typography className="font-bold text-lg">Sobre</Typography>
        </CardHeader>
        <CardContent className="pt-0">
          <Pressable className="py-3">
            <Typography>Mais informações</Typography>
          </Pressable>
        </CardContent>
      </Card>
    </View>
  )
}