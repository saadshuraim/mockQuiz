import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link, useParams, useLocation } from "wouter";
import QuizProgress from "@/components/QuizProgress";
import QuestionCard from "@/components/QuestionCard";

export default function TakeQuiz() {
  const { quizId } = useParams();
  const [, setLocation] = useLocation();
  
  // todo: remove mock functionality - load quiz from localStorage using quizId
  const [quiz] = useState({
    id: quizId,
    title: "JavaScript Fundamentals",
    questions: [
      {
        id: "q1",
        question: "What is the primary purpose of React hooks?",
        options: {
          a: "To replace class components entirely",
          b: "To allow state and lifecycle features in function components",
          c: "To improve rendering performance",
          d: "To handle routing in React applications",
        },
        answer: "b",
        explanation: "Hooks allow you to use state and other React features in function components.",
      },
      {
        id: "q2",
        question: "Which hook is used for side effects?",
        options: {
          a: "useState",
          b: "useContext",
          c: "useEffect",
          d: "useReducer",
        },
        answer: "c",
        explanation: "useEffect is specifically designed for handling side effects in React.",
      },
    ],
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleSelectAnswer = (answerKey: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answerKey });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = () => {
    console.log("Quiz finished with answers:", answers);
    // todo: remove mock functionality - grade quiz, save attempt to localStorage, navigate to results
    setLocation("/results/mock-attempt-id");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild data-testid="button-back">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Exit Quiz
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
          {quiz.title}
        </h1>
        <QuizProgress 
          current={currentQuestionIndex + 1} 
          total={quiz.questions.length} 
        />
      </div>

      <div className="mb-8">
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedAnswer={answers[currentQuestion.id] || null}
          onSelectAnswer={handleSelectAnswer}
        />
      </div>

      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          data-testid="button-previous"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={handleFinish}
            size="lg"
            disabled={Object.keys(answers).length !== quiz.questions.length}
            data-testid="button-finish"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Finish Quiz
          </Button>
        ) : (
          <Button onClick={handleNext} data-testid="button-next">
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
