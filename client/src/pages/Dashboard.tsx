import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ClipboardList, Award } from "lucide-react";
import { Link } from "wouter";
import { getQuizzes, getAttempts, getAttemptsByQuizId } from "@/utils/storage";
import QuizCard from "@/components/QuizCard";
import ResultCard from "@/components/ResultCard";
import EmptyState from "@/components/EmptyState";

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState(() => getQuizzes());
  const [attempts, setAttempts] = useState(() => getAttempts());

  useEffect(() => {
    const handleStorageChange = () => {
      setQuizzes(getQuizzes());
      setAttempts(getAttempts());
    };

    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const quizzesWithLastTaken = quizzes.map(quiz => {
    const quizAttempts = getAttemptsByQuizId(quiz.id);
    const lastAttempt = quizAttempts.sort((a, b) => b.finishedAt - a.finishedAt)[0];
    return {
      ...quiz,
      questionCount: quiz.questions.length,
      lastTaken: lastAttempt?.finishedAt,
    };
  });

  const sortedAttempts = [...attempts].sort((a, b) => b.finishedAt - a.finishedAt).slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
            My Quizzes
          </h1>
          <p className="text-muted-foreground">
            Create, manage, and take quizzes - 100% private and offline
          </p>
        </div>
        <Button asChild size="lg" data-testid="button-create-quiz">
          <Link href="/upload">
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Quiz
          </Link>
        </Button>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              My Quizzes
            </h2>
            <span className="text-sm text-muted-foreground">
              ({quizzes.length})
            </span>
          </div>
          {quizzesWithLastTaken.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzesWithLastTaken.map((quiz) => (
                <QuizCard key={quiz.id} {...quiz} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ClipboardList}
              title="No quizzes yet"
              description="Create your first quiz using AI-generated content or upload your own questions."
              actionLabel="Create New Quiz"
              onAction={() => (window.location.href = "/upload")}
            />
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              Recent Results
            </h2>
            <span className="text-sm text-muted-foreground">
              ({sortedAttempts.length})
            </span>
          </div>
          {sortedAttempts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedAttempts.map((attempt) => (
                <ResultCard key={attempt.id} {...attempt} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Award}
              title="No results yet"
              description="Take a quiz to see your results and track your progress over time."
            />
          )}
        </section>
      </div>
    </div>
  );
}
