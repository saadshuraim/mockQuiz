import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, RotateCcw } from "lucide-react";
import { Link, useParams } from "wouter";
import ScoreSummary from "@/components/ScoreSummary";
import QuestionReview from "@/components/QuestionReview";

export default function Results() {
  const { attemptId } = useParams();
  
  // todo: remove mock functionality - load attempt from localStorage using attemptId
  const [attempt] = useState({
    id: attemptId,
    quizId: "1",
    quizTitle: "JavaScript Fundamentals",
    score: 8,
    totalQuestions: 10,
    finishedAt: Date.now(),
    answers: [
      {
        questionId: "q1",
        question: "What is the primary purpose of React hooks?",
        options: {
          a: "To replace class components entirely",
          b: "To allow state and lifecycle features in function components",
          c: "To improve rendering performance",
          d: "To handle routing in React applications",
        },
        userAnswer: "b",
        correctAnswer: "b",
        explanation: "Hooks allow you to use state and other React features in function components.",
      },
      {
        questionId: "q2",
        question: "Which hook is used for side effects?",
        options: {
          a: "useState",
          b: "useContext",
          c: "useEffect",
          d: "useReducer",
        },
        userAnswer: "a",
        correctAnswer: "c",
        explanation: "useEffect is specifically designed for handling side effects in React.",
      },
    ],
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <ScoreSummary
          score={attempt.score}
          totalQuestions={attempt.totalQuestions}
          quizTitle={attempt.quizTitle}
        />
      </div>

      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
          Question Review
        </h2>
        <div className="space-y-4">
          {attempt.answers.map((answer, index) => (
            <QuestionReview
              key={answer.questionId}
              question={answer.question}
              options={answer.options}
              userAnswer={answer.userAnswer}
              correctAnswer={answer.correctAnswer}
              explanation={answer.explanation}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" asChild className="flex-1" data-testid="button-home">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <Button asChild className="flex-1" data-testid="button-retake">
          <Link href={`/quiz/${attempt.quizId}`}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Link>
        </Button>
      </div>
    </div>
  );
}
