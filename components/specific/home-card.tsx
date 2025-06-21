import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text, View, Image } from "react-native";
import { Typography } from "@/components/ui/typography";

export function HomeCard() {
  return (
    <Card className="relative w-72 h-44 overflow-hidden rounded-lg shadow-xs p-0">
      <Image
        source={{ uri: "https://picsum.photos/304/203" }}
        alt="Fundo ilustrativo"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
        style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 2 }}
      />
      <View
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      />
      <CardContent className="absolute inset-0 flex flex-col justify-between p-0">
        <Typography className="mt-6 ml-6 font-semibold text-white text-lg leading-6 w-60 font-sans">
          Maria da Penha
        </Typography>
        <Typography className="ml-6 mt-2 text-white text-xs leading-5 w-60 font-sans font-normal">
          Sua voz importa! Registre a ocorrência e comece a mudar sua história agora.
        </Typography>
        <Button
          variant="outline"
          className="w-60 h-10 ml-6 mt-2 mb-6 rounded-md font-medium bg-transparent border-2 border-primary"
        >
          <Typography className="text-white">Registrar Agora</Typography>
        </Button>
      </CardContent>
    </Card>
  );
}