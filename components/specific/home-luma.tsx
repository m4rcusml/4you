import { View, Text, ImageBackground } from "react-native"
import { ChatBubbleOvalLeftEllipsis } from "@nandorojo/heroicons/24/outline"

export function HomeLuma() {
  return (
    <View className="w-full max-w-[350px] rounded-xl overflow-hidden shadow bg-transparent">
      <ImageBackground
        source={require("@/assets/images/luma-card-bg.png")}
        resizeMode="cover"
        imageStyle={{ borderRadius: 12 }}
      >
        <View className="flex-1 bg-primary/90 p-4">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-white font-bold text-lg">
                Luma <Text className="font-normal">(ajudante)</Text>
              </Text>
              <Text className="text-white/90 text-sm mt-0.5">
                Sua assistente pessoal
              </Text>
            </View>
            <View className="bg-white/90 rounded-xl p-2 items-center justify-center w-11 h-11 shadow-sm">
              <ChatBubbleOvalLeftEllipsis width={24} height={24} color="#E94E8A" />
            </View>
          </View>
          <Text className="text-white text-sm mt-4 leading-[18px] opacity-95">
            Luma está aqui para te ajudar com qualquer dúvida ou suporte que você precisar.
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}