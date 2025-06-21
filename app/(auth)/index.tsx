import { router } from 'expo-router'
import { ActivityIndicator, Alert, Pressable, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useSession } from '@/lib/hooks/useSession'
import { Typography } from '@/components/ui/typography'

import Logo from '@/assets/images/logo-primary.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LogIn() {
  const { signIn, signUp, isLoading, session, error, clearError } = useSession(); // Obtenha métodos e estado do useSession

  const [tab, setTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // Redireciona se a sessão estiver ativa
  useEffect(() => {
    if (session) {
      router.replace('/(app)'); // Redireciona para a rota principal do app
    }
  }, [session]);

  // Exibe erros
  useEffect(() => {
    if (error) {
      Alert.alert('Erro de Autenticação', error);
      clearError(); // Limpa o erro após exibição
    }
  }, [error, clearError]);

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    const success = await signIn(loginEmail, loginPassword);
    // A navegação será tratada pelo useEffect se o `session` for atualizado
  };

  const handleSignUp = async () => {
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    const success = await signUp(registerName, registerEmail, registerPassword);
    // A navegação será tratada pelo useEffect se o `session` for atualizado
  };

  // Se estiver carregando, você pode mostrar um indicador
  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='#e53888' />
      </View>
    );
  }

  return (
    <SafeAreaView className='flex-1 items-center justify-center p-6'>
      <Logo />

      <View className='p-6 mt-4 w-full max-w-[400px]'>
        <Tabs
          value={tab}
          onValueChange={setTab}
          className='w-full mx-auto flex-col gap-1.5'
        >
          <TabsList className='flex-row w-full gap-2'>
            <Pressable onPress={() => setTab('login')} className='flex-1'>
              <View
                className={`flex-1 items-center justify-center rounded py-1 ${tab === 'login' ? 'bg-background shadow-sm' : ''
                  }`}
              >
                <Typography className={tab === 'login' ? 'font-semibold' : ''}>
                  Entrar
                </Typography>
              </View>
            </Pressable>
            <Pressable onPress={() => setTab('signup')} className='flex-1'>
              <View
                className={`flex-1 items-center justify-center rounded py-1 ${tab === 'signup' ? 'bg-background shadow-sm' : ''
                  }`}
              >
                <Typography className={tab === 'signup' ? 'font-semibold' : ''}>
                  Criar conta
                </Typography>
              </View>
            </Pressable>
          </TabsList>

          <TabsContent value='login'>
            <Card className='bg-gray-100'>
              <CardHeader>
                <CardTitle>Bem vinda de volta</CardTitle>
                <CardDescription>
                  Acesse sua conta para continuar
                </CardDescription>
              </CardHeader>

              <CardContent className='gap-4 native:gap-2'>
                <View className='gap-1'>
                  <Input className='border-[0.5px]' aria-aria-labelledby='email' placeholder='Email' value={loginEmail} onChangeText={setLoginEmail} />
                </View>
                <View className='gap-1'>
                  <Input className='border-[0.5px]' id='password' aria-labelledby='password' placeholder='Senha' value={loginPassword} onChangeText={setLoginPassword} secureTextEntry />
                </View>
              </CardContent>

              <CardFooter className='flex-col gap-2'>
                <Button className='w-full' onPress={handleLogin}>
                  <Typography>Entrar</Typography>
                </Button>
                <Typography>
                  Primeira vez aqui? <Typography className='font-semibold' onPress={() => setTab('signup')}>Criar conta</Typography>
                </Typography>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value='signup'>
            <Card className='bg-gray-100'>
              <CardHeader>
                <CardTitle>Crie sua conta</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para criar sua conta
                </CardDescription>
              </CardHeader>

              <CardContent className='gap-4 native:gap-2'>
                <View className='gap-1'>
                  <Input className='border-[0.5px]' placeholder='Nome' aria-labelledby='name' value={registerName} onChangeText={setRegisterName} />
                </View>
                <View className='gap-1'>
                  <Input className='border-[0.5px]' placeholder='Email' aria-labelledby='email' value={registerEmail} onChangeText={setRegisterEmail} />
                </View>
                <View className='gap-1'>
                  <Input className='border-[0.5px]' placeholder='Senha' aria-labelledby='password' value={registerPassword} onChangeText={setRegisterPassword} secureTextEntry />
                </View>
                <View className='gap-1'>
                  <Input className='border-[0.5px]' placeholder='Confirme sua senha' aria-labelledby='password_confirm' value={registerConfirmPassword} onChangeText={setRegisterConfirmPassword} secureTextEntry />
                </View>
              </CardContent>

              <CardFooter className='flex-col gap-2'>
                <Button className='w-full' onPress={handleSignUp}>
                  <Typography>Criar conta</Typography>
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
