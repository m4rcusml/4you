// stores/useRiskFormStore.ts
import { create } from 'zustand';
import { supabase } from '@/lib/supabase'; // Importe seu cliente supabase
import { useAuthStore } from './authStore';

// Adapte seus tipos ou crie novos com base na estrutura do banco
import { FormBlock, Question, AnswerOption } from '@/types/risk-form';
// Estado para guardar as respostas do usuário durante o preenchimento
type UserAnswers = {
  [questionId: number]: {
    selectedOptions: number[]; // Array de IDs das opções selecionadas
    customText?: string;
  }
}

interface RiskFormState {
  formStructure: FormBlock[];
  userAnswers: UserAnswers;
  isLoading: boolean;
  fetchFormStructure: () => Promise<void>;
  setAnswer: (questionId: number, answer: { selectedOptions: number[], customText?: string }) => void;
  saveSubmission: () => Promise<{ submissionId: string, totalScore: number } | null>;
  resetForm: () => void;
  fetchBlockById: (blockId: number) => FormBlock | null;
}

export const useRiskFormStore = create<RiskFormState>((set, get) => ({
  formStructure: [],
  userAnswers: {},
  isLoading: false,

  fetchFormStructure: async () => {
    set({ isLoading: true });
    // Aqui você faria uma chamada RPC para buscar o formulário inteiro de uma vez
    const { data, error } = await supabase.rpc('get_full_form_structure');
    if (data) {
      set({ formStructure: data });
    }
    set({ isLoading: false });
  },

  setAnswer: (questionId, answer) => {
    set(state => ({
      userAnswers: {
        ...state.userAnswers,
        [questionId]: answer,
      }
    }));
  },

  saveSubmission: async () => {
    set({ isLoading: true });
    const answers = get().userAnswers;
    const userId = useAuthStore.getState().session?.user.id;

    if (!userId) {
      set({ isLoading: false });
      return null;
    }

    // 1. Cria a submissão
    const { data: submission, error: submissionError } = await supabase
      .from('form_submissions')
      .insert({ user_id: userId })
      .select()
      .single();

    if (submissionError) {
      console.error(submissionError);
      set({ isLoading: false });
      return null;
    }

    // 2. Formata e insere todas as respostas
    const answersToInsert = Object.entries(answers).flatMap(([questionId, answerData]) =>
      answerData.selectedOptions.map(optionId => ({
        submission_id: submission.id,
        question_id: parseInt(questionId),
        selected_option_id: optionId,
        custom_text_answer: answerData.customText
      }))
    );

    await supabase.from('submission_answers').insert(answersToInsert);

    // 3. (Lógica de cálculo de score iria aqui, talvez em outra função RPC)
    // ...

    set({ isLoading: false });
    get().resetForm();
    return { submissionId: submission.id, totalScore: 0 /* score calculado */ };
  },

  resetForm: () => set({ userAnswers: {} }),

  fetchBlockById: (blockId) => {
    return get().formStructure.find((block) => block.id === blockId) || null;
  },
}));