import { useRouter } from "expo-router";
import { ActivityIndicator, Alert, Pressable } from "react-native";
import { Typography } from "@/components/ui/typography";
import { FlatList, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRiskFormStore } from "@/stores/riskFormStore";
import { Question } from "@/types/risk-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Importa seu componente
import { Checkbox } from "@/components/ui/checkbox"; // Usaremos o checkbox nativo do Expo para multi-select
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FormBlockPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter(); // Hook para navegação
  const blockId = Number(id);

  // Seleciona os dados e funções do store de forma agrupada e reativa.
  const {
    saveSubmission,
    isLoading,
    formStructure,
    userAnswers,
    setAnswer,
  } = useRiskFormStore();

  const block = formStructure.find(b => b.id === blockId);

  const handleSubmit = async () => {
    // Prevenir duplo clique enquanto está enviando
    if (isLoading) return;

    try {
      const result = await saveSubmission();

      if (result) {
        // Sucesso!
        Alert.alert(
          "Formulário Enviado",
          `Sua avaliação de risco foi registrada com sucesso. Pontuação total: ${result.totalScore}`,
          [{ text: "OK", onPress: () => router.back() }] // Volta para a tela anterior ao pressionar OK
        );
      } else {
        // Falha controlada (ex: usuário não logado)
        Alert.alert("Erro", "Não foi possível enviar o formulário. Tente novamente.");
      }
    } catch (error) {
      // Falha inesperada
      console.error("Erro inesperado ao enviar o formulário:", error);
      Alert.alert("Erro Inesperado", "Ocorreu um problema ao se comunicar com o servidor.");
    }
  };

  // Função para renderizar cada tipo de questão
  const renderQuestion = ({ item: question }: { item: Question }) => {
    const currentAnswer = userAnswers[question.id];

    switch (question.type) {
      // Caso 1: Pergunta de Escolha Única (Usa seu RadioGroup)
      case 'single_choice':
        return (
          <View>
            <Typography className="font-semibold text-base mb-3">{question.text}</Typography>
            <RadioGroup
              // O valor atual é o ID da opção selecionada
              value={currentAnswer?.selectedOptions[0]?.toString()}
              onValueChange={(selectedOptionId) => {
                const idAsNumber = Number(selectedOptionId);
                // Salva a resposta no store
                setAnswer(question.id, { selectedOptions: [idAsNumber] });
              }}
            >
              {question.options.map((option) => (
                <View key={option.id} className="flex-row items-center gap-3 mb-2">
                  <RadioGroupItem value={option.id.toString()} id={option.id.toString()} />
                  <Typography>{option.text}</Typography>
                </View>
              ))}
            </RadioGroup>
          </View>
        );

      case 'multi_select':
        return (
          <View>
            <Typography className="font-semibold text-base mb-2">{question.text}</Typography>
            {question.options.map((option) => {
              // A lógica para saber se está selecionado continua a mesma
              const isSelected = currentAnswer?.selectedOptions?.includes(option.id) ?? false;

              // A lógica para atualizar o estado também continua a mesma
              const handlePress = () => {
                const currentSelection = currentAnswer?.selectedOptions || [];
                const newSelection = isSelected
                  ? currentSelection.filter(id => id !== option.id) // Desmarca
                  : [...currentSelection, option.id]; // Marca
                setAnswer(question.id, { selectedOptions: newSelection });
              };

              return (
                // Usamos nosso componente 'feito à mão'
                <Checkbox
                  key={option.id}
                  label={option.text}
                  checked={isSelected}
                  onPress={handlePress}
                />
              );
            })}
          </View>
        );

      case 'text':
        return (
          <View>
            <Typography className="font-semibold text-base mb-3">{question.text}</Typography>
            {/* Seu componente Input customizado */}
            <Input
              placeholder="Digite sua resposta aqui..."
              value={currentAnswer?.customText || ''}
              onChangeText={(text) => {
                // Atualiza o store preservando as opções selecionadas, se houver
                setAnswer(question.id, {
                  selectedOptions: currentAnswer?.selectedOptions || [],
                  customText: text,
                });
              }}
            />
          </View>
        );

      default:
        return <Typography>Tipo de questão não suportado: {question.type}</Typography>;
    }
  };

  if (!block) {
    return (
      <View className="flex-1 justify-center items-center">
        <Typography>Bloco não encontrado ou carregando...</Typography>
      </View>
    );
  }

  return (
    <FlatList
      data={block.questions}
      className='p-6 pb-14'
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderQuestion}
      ListHeaderComponent={
        <Typography className="text-2xl font-bold mb-6">{block.title}</Typography>
      }
      ListEmptyComponent={
        <Typography className="text-lg font-semibold text-ring text-center">Nenhuma questão encontrada</Typography>
      }
      ListFooterComponent={
        <Button className="mt-3" onPress={handleSubmit} isLoading={isLoading}>
          <Typography className="text-white font-semibold">
            Enviar
          </Typography>
        </Button>
      }
      ItemSeparatorComponent={() => <View className="h-6" />}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
}