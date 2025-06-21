// Caminho: components/ui/custom-checkbox.tsx

import { Pressable, View } from "react-native";
import { Typography } from "./typography"; // Seu componente de tipografia
import { Check as CheckIcon } from "@nandorojo/heroicons/24/solid"; // Importa o ícone de 'check'

type CustomCheckboxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

export function Checkbox({ label, checked, onPress }: CustomCheckboxProps) {
  return (
    // O Pressable envolve tudo para criar uma área de toque grande e acessível
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 py-2"
      // Props de acessibilidade para leitores de tela
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      {/* A "caixa" do checkbox */}
      <View
        className={`h-5 w-5 items-center justify-center rounded border-2 ${
          checked ? 'border-primary bg-primary' : 'border-gray-400 bg-transparent'
        }`}
      >
        {/* O ícone de 'check' só aparece se o estado for 'checked' */}
        {checked && (
          <CheckIcon height={18} width={18} color="white" />
        )}
      </View>

      {/* O texto/label do checkbox */}
      <Typography className="flex-1 text-base">{label}</Typography>
    </Pressable>
  );
}