import { createContext, useContext, useState, ReactNode } from 'react';
import { Question } from '@/utils/storage';

interface QuizContextType {
  parsedQuestions: Question[];
  setParsedQuestions: (questions: Question[]) => void;
  clearParsedQuestions: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);

  const clearParsedQuestions = () => {
    setParsedQuestions([]);
  };

  return (
    <QuizContext.Provider value={{ parsedQuestions, setParsedQuestions, clearParsedQuestions }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
