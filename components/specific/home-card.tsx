import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "react-native";

export function HomeCard() {
  return (
    <Card className="relative w-72 h-44 overflow-hidden rounded-lg shadow-xs p-0">
      <img
        src="https://picsum.photos/304/203"
        alt="Fundo ilustrativo"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
        style={{ boxShadow: "2px 2px 2px rgba(0,0,0,0.08)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(73,71,71,0.56) 0%, rgba(0,0,0,0.80) 100%)",
        }}
      />
      <CardContent className="absolute inset-0 flex flex-col justify-between p-0">
        <div
          className="mt-6 ml-6 font-semibold text-white text-lg leading-6 w-60"
          style={{
            fontFamily: "var(--font-sans)",
          }}
        >
          Maria da Penha
        </div>
        <div
          className="ml-6 mt-2 text-white text-xs leading-5 w-60"
          style={{
            fontFamily: "var(--font-sans)",
          }}
        >
          <Text style={{ color: "var(--light-1, #fff)", fontWeight: 400 }}>
            Sua voz importa! Registre a ocorrência e comece a mudar sua história
            agora.
          </Text>
        </div>
        <Button
          variant="outline"
          className="w-60 h-10 ml-6 mt-2 mb-6 rounded-md font-medium bg-transparent border-2 border-primary"
        >
          <Text className="text-white">Registrar Agora</Text>
        </Button>
      </CardContent>
    </Card>
  );
}