import { router } from 'expo-router'
import { View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useSession } from '@/lib/hooks/useSession'
import { Typography } from '@/components/ui/typography'

import Logo from '@/assets/images/logo-primary.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function LogIn() {
  const { signIn } = useSession()
  const [tab, setTab] = useState('sign-in')

  return (
    <SafeAreaView className='flex-1 items-center justify-center p-6'>
      <Logo />

      <View className='p-6'>
        <Tabs
          value={tab}
          onValueChange={setTab}
          className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
        >
          <TabsList className='flex-row w-full'>
            <TabsTrigger value='account' className='flex-1'>
              <Typography>Account</Typography>
            </TabsTrigger>
            <TabsTrigger value='password' className='flex-1'>
              <Typography>Password</Typography>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className='gap-4 native:gap-2'>
                <View className='gap-1'>
                  <Label nativeID='name'>Name</Label>
                  <Input aria-aria-labelledby='name' defaultValue='Pedro Duarte' />
                </View>
                <View className='gap-1'>
                  <Label nativeID='username'>Username</Label>
                  <Input id='username' defaultValue='@peduarte' />
                </View>
              </CardContent>
              <CardFooter>
                <Button>
                  <Typography>Save changes</Typography>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value='password'>
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className='gap-4 native:gap-2'>
                <View className='gap-1'>
                  <Label nativeID='current'>Current password</Label>
                  <Input placeholder='********' aria-labelledby='current' secureTextEntry />
                </View>
                <View className='gap-1'>
                  <Label nativeID='new'>New password</Label>
                  <Input placeholder='********' aria-labelledby='new' secureTextEntry />
                </View>
              </CardContent>
              <CardFooter>
                <Button>
                  <Typography>Save password</Typography>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </View>
    </SafeAreaView>
  )
}
