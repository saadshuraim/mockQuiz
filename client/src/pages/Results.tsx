import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, RotateCcw } from "lucide-react";
import { Link, useParams, useLocation } from "wouter";
import { getAttemptById, getQuizById } from "@/utils/storage";
import ScoreSummary from "@/components/ScoreSummary";
import QuestionReview from "@/components/QuestionReview";

export default function Results() {
  const { attemptId } = useParams();
  const [, setLocation] = useLocation();
  const [attempt, setAttempt] = useState(() => attemptId ? getAttemptById(attemptId) : null);
  const [quiz, setQuiz] = useState(() => attempt ? getQuizById(attempt.quizId) : null);

  useEffect(() => {
    if (!attempt) {
      setLocation("/");
      return;
    }
    if (!quiz) {
      const loadedQuiz = getQuizById(attempt.quizId);
      setQuiz(loadedQuiz || null);
    }
  }, [attempt, quiz, setLocation]);

  if (!attempt || !quiz) {
    return null;
  }

  const answersWithDetails = attempt.answers.map(answer => {
    const question = quiz.questions.find(q => q.id === answer.questionId);
    return {
      questionId: answer.questionId,
      question: question?.question || '',
      options: question?.options || {},
      userAnswer: answer.selectedKey,
      correctAnswer: question?.answer || '',
      correctBool: answer.correctBool,
      explanation: question?.explanation,
    };
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
          {answersWithDetails.map((answer, index) => (
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
