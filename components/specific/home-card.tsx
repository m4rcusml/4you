import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { View, Image, useWindowDimensions, Pressable, Linking } from "react-native";
import { Typography } from "@/components/ui/typography";

type Props = {
  photoURL: string
  title: string
  description: string
  link: string
  buttonLabel: string
}

export function HomeCard({ photoURL, title, description, link, buttonLabel }: Props) {
  const { width } = useWindowDimensions();

  const handlePress = async () => {
    if (link) {
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        Linking.openURL(link);
      } else {
        console.warn("Can't open URL:", link);
      }
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Card style={{ width: width - 48 }} className={`relative overflow-hidden rounded-lg shadow-xs`}>
        <CardContent className="relative w-full flex flex-col justify-between p-6 gap-4">
          <Image
            source={{ uri: photoURL || 'https://picsum.photos/304/203' }}
            alt="Fundo ilustrativo"
            className="absolute inset-0 w-[calc(100%+24px)] h-[calc(100%-24px)] rounded-md object-cover"
          />
          {/* Dark overlay */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(31,4,22,0.75)',
              borderRadius: 8,
            }}
            pointerEvents="none"
          />
          <Typography className="font-semibold text-white text-xl leading-7 w-60 font-sans">
            {title}
          </Typography>
          <Typography className="text-white text-base leading-5 font-sans font-normal">
            {description}
          </Typography>
          <Button
            onPress={handlePress}
            variant="outline"
            className="w-full rounded-md font-semibold bg-transparent border-2 border-muted"
          >
            <Typography className="text-white font-semibold text-base">
              {buttonLabel}
            </Typography>
          </Button>
        </CardContent>
        <View style={{ height: 24 }} />
      </Card>
    </Pressable>
  );
}