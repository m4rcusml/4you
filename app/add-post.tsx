import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/text-area"
import { Typography } from "@/components/ui/typography"
import { useSession } from "@/lib/hooks/useSession"
import { usePostStore } from "@/stores/postStore"
import { Link } from "expo-router"
import { useState } from "react"
import { Pressable, View } from "react-native"
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated"

export default function Page() {
  const { addPost, isLoading, error } = usePostStore()
  const { user } = useSession()
  const [content, setContent] = useState('')

  async function handlePost() {
    console.log("Botão 'Enviar' pressionado. Iniciando handlePost...");

    if (isLoading || !content.trim()) return;
    if (!user) {
      // Opcional: redirecionar para o login ou mostrar uma mensagem
      console.error("Usuário não autenticado.");
      return;
    }

    await addPost({ content, userId: user.id });

    // Se não houve erro, limpa o campo de texto
    if (!usePostStore.getState().error) {
      setContent('');
    }
  }

  return (
    <Animated.View entering={FadeIn} className="flex-1 items-center justify-center bg-black/30">
      <Link className="absolute w-screen h-screen" href={'/'} asChild>
        <Pressable className="w-screen h-screen" />
      </Link>

      <Animated.View entering={SlideInDown} className="w-[90%] gap-4 bg-background rounded-2xl p-6">
        <View>
          <Typography className="text-2xl font-bold">Faça seu post</Typography>
          <Typography>
            Compartilhe sua história
          </Typography>
        </View>

        <Textarea placeholder="Digite aqui" />

        <View className="gap-2">
          <Button onPress={handlePost}>
            <Typography className="text-primary-foreground font-medium">Postar</Typography>
          </Button>
          <Button variant="outline">
            <Typography>Cancelar</Typography>
          </Button>
        </View>
      </Animated.View>
    </Animated.View>
  )
}