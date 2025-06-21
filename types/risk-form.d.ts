export type AnswerOption = {
  id: number; // <-- Corrigido para number
  text: string;
  weight: number;
};

export type Question = {
  id: number; // <-- Corrigido para number
  text: string;
  type: 'single_choice' | 'multi_select' | 'text'; // Tipo da questão
  options: AnswerOption[];
};

export type FormBlock = {
  id: number; // <-- Mantido como number
  title: string;
  questions: Question[];
};