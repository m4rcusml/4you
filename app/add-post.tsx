import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { Typography } from "@/components/ui/typography";
import { Link } from "expo-router";
import { KeyboardAvoidingView, Pressable, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

export default function Page() {
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
          <Button className="text-primary-foreground font-medium">Postar</Button>
          <Button variant="outline">Cancelar</Button>
        </View>
      </Animated.View>
    </Animated.View>
  )
}