import { Pressable, View } from "react-native";
import { Typography } from "../ui/typography";
import { BlockType } from "@/types/risk-form";
import { ChevronRight } from "@nandorojo/heroicons/24/solid";
import { router } from "expo-router";

type Props = {
  data: Partial<BlockType>
}

export function RiskCard({ data }: Props) {
  const onPress = () => {
    router.push(`/risk-form/${data.id}`)
  }

  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-2 shadow-lg rounded-lg p-4">
      <View className="flex-1">
        <Typography className="text-base font-semibold text-card-foreground">
          {data.title}
        </Typography>
        <Typography className="text-sm text-muted-foreground">
          {data.questions?.length || 0} perguntas
        </Typography>
      </View>

      <ChevronRight width={24} height={24} strokeWidth={2} color="gray" />
    </Pressable>
  )
}