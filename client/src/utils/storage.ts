const QUIZZES_KEY = 'mockquiz_quizzes';
const ATTEMPTS_KEY = 'mockquiz_attempts';

export interface Question {
  id: string;
  category?: string;
  level?: string;
  question: string;
  options: { [key: string]: string };
  answer: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: number;
}

export interface AttemptAnswer {
  questionId: string;
  selectedKey: string;
  correctBool: boolean;
}

export interface Attempt {
  id: string;
  quizId: string;
  quizTitle: string;
  finishedAt: number;
  score: number;
  totalQuestions: number;
  answers: AttemptAnswer[];
}

const getStorageData = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return [];
  }
};

const setStorageData = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
};

export const getQuizzes = (): Quiz[] => {
  return getStorageData<Quiz>(QUIZZES_KEY);
};

export const getQuizById = (quizId: string): Quiz | undefined => {
  return getQuizzes().find((q) => q.id === quizId);
};

export const saveQuiz = (quizData: { title: string; description?: string; questions: Question[] }): Quiz => {
  const quizzes = getQuizzes();
  const newQuiz: Quiz = {
    ...quizData,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  quizzes.push(newQuiz);
  setStorageData(QUIZZES_KEY, quizzes);
  return newQuiz;
};

export const deleteQuiz = (quizId: string): void => {
  const quizzes = getQuizzes().filter((q) => q.id !== quizId);
  setStorageData(QUIZZES_KEY, quizzes);
};

export const getAttempts = (): Attempt[] => {
  return getStorageData<Attempt>(ATTEMPTS_KEY);
};

export const getAttemptById = (attemptId: string): Attempt | undefined => {
  return getAttempts().find((a) => a.id === attemptId);
};

export const getAttemptsByQuizId = (quizId: string): Attempt[] => {
  return getAttempts().filter((a) => a.quizId === quizId);
};

export const saveAttempt = (attemptData: {
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  answers: AttemptAnswer[];
}): Attempt => {
  const attempts = getAttempts();
  const newAttempt: Attempt = {
    ...attemptData,
    id: crypto.randomUUID(),
    finishedAt: Date.now(),
  };
  attempts.push(newAttempt);
  setStorageData(ATTEMPTS_KEY, attempts);
  return newAttempt;
};

export const exportData = (): void => {
  const backupData = JSON.stringify(
    {
      quizzes: getQuizzes(),
      attempts: getAttempts(),
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );
  const blob = new Blob([backupData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mockquiz_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importData = (jsonString: string): { success: boolean; message: string } => {
  try {
    const data = JSON.parse(jsonString);
    if (!data.quizzes || !Array.isArray(data.quizzes)) {
      return { success: false, message: 'Invalid backup file format: missing quizzes array' };
    }
    if (!data.attempts || !Array.isArray(data.attempts)) {
      return { success: false, message: 'Invalid backup file format: missing attempts array' };
    }

    setStorageData(QUIZZES_KEY, data.quizzes);
    setStorageData(ATTEMPTS_KEY, data.attempts);
    
    return { 
      success: true, 
      message: `Imported ${data.quizzes.length} quizzes and ${data.attempts.length} attempts` 
    };
  } catch (err) {
    return { success: false, message: `Import failed: ${err instanceof Error ? err.message : 'Unknown error'}` };
  }
};

export const clearAllData = (): void => {
  localStorage.removeItem(QUIZZES_KEY);
  localStorage.removeItem(ATTEMPTS_KEY);
};
