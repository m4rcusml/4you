import { View, Text, ImageBackground, Pressable, Linking } from "react-native"
import { ChatBubbleOvalLeftEllipsis } from "@nandorojo/heroicons/24/outline"

export function HomeLuma() {
  const handlePress = () => {
    Linking.openURL("https://api.whatsapp.com/send/?phone=55 11969655515&text=Ol%C3%A1%2C+estou+entrando+em+contato+pelo+app+4YOU.&type=phone_number&app_absent=0")
  }

  return (
    <Pressable onPress={handlePress}>
      <View className="w-full max-w-[350px] rounded-xl overflow-hidden shadow bg-transparent" style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
      }}>
        <ImageBackground
          source={require("@/assets/images/luma-card-bg.png")}
          resizeMode="cover"
          imageStyle={{ borderRadius: 12, width: "110%", height: "105%" }}
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
    </Pressable>
  )
}