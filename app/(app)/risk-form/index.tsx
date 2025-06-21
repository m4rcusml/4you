import { RiskCard } from "@/components/specific/risk-card"
import { Typography } from "@/components/ui/typography"
import { useRiskFormStore } from "@/stores/riskFormStore"
import { useEffect } from "react"
import { FlatList, View } from "react-native"

export default function Page() {
  const { formStructure, fetchFormStructure } = useRiskFormStore()

  useEffect(() => {
    fetchFormStructure()
  }, [fetchFormStructure])

  return (
    <FlatList
      data={formStructure}
      className='p-6 pb-14'
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <RiskCard data={item} />}
      ListHeaderComponent={
        <>
        <Typography className="text-2xl font-bold mb-3">Avaliação de risco</Typography>
        <Typography className="text-sm text-muted-foreground mb-3">
          O Formulário Nacional de Avaliação de Risco é um instrumento de prevenção e de enfrentamento de crimes e demais atos praticados no contexto da violência doméstica e familiar contra as mulheres, e possibilita diagnosticar e identificar se a mulher se encontra em situação de risco. 
        </Typography>
        </>
      }
      ListEmptyComponent={
        <Typography className="text-lg font-semibold text-ring text-center">Nenhum bloco encontrado</Typography>
      }
      contentContainerStyle={{ gap: 20 }}
    />
  )
}