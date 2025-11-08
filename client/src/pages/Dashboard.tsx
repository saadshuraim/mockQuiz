import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ClipboardList, Award } from "lucide-react";
import { Link } from "wouter";
import QuizCard from "@/components/QuizCard";
import ResultCard from "@/components/ResultCard";
import EmptyState from "@/components/EmptyState";

export default function Dashboard() {
  // todo: remove mock functionality - replace with localStorage
  const [quizzes] = useState([
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of core JavaScript concepts",
      questionCount: 15,
      lastTaken: Date.now() - 86400000 * 2,
    },
    {
      id: "2",
      title: "React Hooks",
      description: "Deep dive into React hooks and their use cases",
      questionCount: 10,
      lastTaken: Date.now() - 86400000,
    },
  ]);

  const [results] = useState([
    {
      id: "1",
      quizTitle: "JavaScript Fundamentals",
      score: 12,
      totalQuestions: 15,
      finishedAt: Date.now() - 3600000,
    },
    {
      id: "2",
      quizTitle: "React Hooks",
      score: 8,
      totalQuestions: 10,
      finishedAt: Date.now() - 86400000,
    },
  ]);

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
          {quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
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
              ({results.length})
            </span>
          </div>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((result) => (
                <ResultCard key={result.id} {...result} />
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
