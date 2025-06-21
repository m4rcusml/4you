import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text, View, Image, useWindowDimensions } from "react-native";

type Props = {
  photoURL: string
  title: string
  description: string
  link: string
  buttonLabel: string
}

export function HomeCard({ photoURL, title, description, link, buttonLabel }: Props) {
  const { width } = useWindowDimensions()

  return (
    <Card style={{ width: width * 0.8 }} className={`relative overflow-hidden rounded-lg shadow-xs`}>
      <CardContent className="relative w-full flex flex-col justify-between p-6 gap-4">
        <Image
          source={{ uri: photoURL || 'https://picsum.photos/304/203' }}
          alt="Fundo ilustrativo"
          className="absolute inset-0 w-[calc(100%+24px)] h-[calc(100%-24px)] rounded-md object-cover blur-sm"
          style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 2 }}
        />
        <Text className="font-semibold text-white text-lg leading-6 w-60 font-sans">
          {title}
        </Text>
        <Text className="text-white text-sm leading-5 font-sans font-normal">
          {description}
        </Text>
        <Button
          variant="outline"
          className="w-full rounded-md font-medium bg-transparent border-2 border-primary"
        >
          <Text className="text-white">
            {buttonLabel}
          </Text>
        </Button>
      </CardContent>

      <View style={{ height: 24 }} />
    </Card>
  );
}