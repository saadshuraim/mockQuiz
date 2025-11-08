import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Eye } from "lucide-react";
import { Link } from "wouter";

interface ResultCardProps {
  id: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  finishedAt: number;
}

export default function ResultCard({ id, quizTitle, score, totalQuestions, finishedAt }: ResultCardProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;

  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`card-result-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="font-heading text-lg text-foreground line-clamp-1">
              {quizTitle}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(finishedAt).toLocaleDateString()} at {new Date(finishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <Badge 
            variant={isPassing ? "default" : "destructive"}
            className={isPassing ? "bg-chart-3 hover:bg-chart-3 text-foreground" : ""}
            data-testid={`badge-score-${id}`}
          >
            {percentage}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-chart-3">
              <CheckCircle2 className="h-4 w-4" />
              <span>{score}</span>
            </div>
            <div className="flex items-center gap-1 text-destructive">
              <XCircle className="h-4 w-4" />
              <span>{totalQuestions - score}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild data-testid={`button-review-${id}`}>
            <Link href={`/results/${id}`}>
              <Eye className="h-4 w-4 mr-1" />
              Review
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
