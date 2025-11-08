import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";

interface ScoreSummaryProps {
  score: number;
  totalQuestions: number;
  quizTitle: string;
}

export default function ScoreSummary({ score, totalQuestions, quizTitle }: ScoreSummaryProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;

  return (
    <Card className={`${isPassing ? 'bg-chart-3/5' : 'bg-destructive/5'}`} data-testid="card-score-summary">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4">
          {isPassing ? (
            <div className="rounded-full bg-chart-3 p-4">
              <Trophy className="h-10 w-10 text-foreground" />
            </div>
          ) : (
            <div className="rounded-full bg-destructive/20 p-4">
              <XCircle className="h-10 w-10 text-destructive" />
            </div>
          )}
        </div>
        <CardTitle className="font-heading text-2xl text-foreground">
          {isPassing ? 'Great Job!' : 'Keep Practicing!'}
        </CardTitle>
        <p className="text-muted-foreground mt-1">{quizTitle}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-foreground" data-testid="text-percentage">
              {percentage}%
            </div>
            <div className="text-sm text-muted-foreground mt-1">Score</div>
          </div>
          <div className="h-16 w-px bg-border" />
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-foreground" data-testid="text-score">
              {score}/{totalQuestions}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Correct</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-chart-3">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">{score} Correct</span>
          </div>
          <div className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5" />
            <span className="font-semibold">{totalQuestions - score} Wrong</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
