import { router } from 'expo-router'
import { Pressable, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useSession } from '@/lib/hooks/useSession'
import { Typography } from '@/components/ui/typography'

import Logo from '@/assets/images/logo-primary.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LogIn() {
  const { signIn } = useSession()
  const [tab, setTab] = useState('login')

  return (
    <SafeAreaView className='flex-1 items-center justify-center p-6'>
      <Logo />

      <View className='p-6 w-full max-w-[400px]'>
        <Tabs
          value={tab}
          onValueChange={setTab}
          className='w-full mx-auto flex-col gap-1.5'
        >
          <TabsList className='flex-row w-full gap-2'>
            <Pressable onPress={() => setTab('login')} className='flex-1'>
              <View
                className={`flex-1 items-center justify-center rounded-sm py-1 ${tab === 'login' ? 'bg-background shadow-sm' : ''
                  }`}
              >
                <Typography className={tab === 'login' ? 'font-semibold' : ''}>
                  Entrar
                </Typography>
              </View>
            </Pressable>
            <Pressable onPress={() => setTab('signup')} className='flex-1'>
              <View
                className={`flex-1 items-center justify-center rounded-sm py-1 ${tab === 'signup' ? 'bg-background shadow-sm' : ''
                  }`}
              >
                <Typography className={tab === 'signup' ? 'font-semibold' : ''}>
                  Criar conta
                </Typography>
              </View>
            </Pressable>
          </TabsList>

          <TabsContent value='login'>
            <Card>
              <CardHeader>
                <CardTitle>Bem vinda de volta</CardTitle>
                <CardDescription>
                  Acesse sua conta para continuar
                </CardDescription>
              </CardHeader>

              <CardContent className='gap-4 native:gap-2'>
                <View className='gap-1'>
                  <Input aria-aria-labelledby='email' placeholder='Email' />
                </View>
                <View className='gap-1'>
                  <Input id='password' secureTextEntry aria-labelledby='password' placeholder='Senha' />
                </View>
              </CardContent>

              <CardFooter className='flex-col gap-2'>
                <Button className='w-full'>
                  <Typography>Entrar</Typography>
                </Button>
                <Typography>
                  Primeira vez aqui? <Typography className='font-semibold' onPress={() => setTab('signup')}>Criar conta</Typography>
                </Typography>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value='signup'>
            <Card>
              <CardHeader>
                <CardTitle>Crie sua conta</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para criar sua conta
                </CardDescription>
              </CardHeader>

              <CardContent className='gap-4 native:gap-2'>
                <View className='gap-1'>
                  <Input placeholder='Nome' aria-labelledby='name' />
                </View>
                <View className='gap-1'>
                  <Input placeholder='Email' aria-labelledby='email' />
                </View>
                <View className='gap-1'>
                  <Input placeholder='Senha' aria-labelledby='password' secureTextEntry />
                </View>
                <View className='gap-1'>
                  <Input placeholder='Confirme sua senha' aria-labelledby='password_confirm' secureTextEntry />
                </View>
              </CardContent>

              <CardFooter className='flex-col gap-2'>
                <Button className='w-full'>
                  <Typography>Continuar</Typography>
                </Button>
                <Typography>
                  Já tem uma conta? <Typography className='font-semibold' onPress={() => setTab('signin')}>Entrar</Typography>
                </Typography>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </View>
    </SafeAreaView>
  )
}
