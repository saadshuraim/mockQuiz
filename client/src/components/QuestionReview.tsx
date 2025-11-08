import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuestionReviewProps {
  question: string;
  options: { [key: string]: string };
  userAnswer: string;
  correctAnswer: string;
  explanation?: string;
  index: number;
}

export default function QuestionReview({ 
  question, 
  options, 
  userAnswer, 
  correctAnswer, 
  explanation,
  index 
}: QuestionReviewProps) {
  const isCorrect = userAnswer === correctAnswer;

  return (
    <Card 
      className={isCorrect ? 'border-chart-3/30' : 'border-destructive/30'}
      data-testid={`card-review-${index}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Badge 
            variant={isCorrect ? "default" : "destructive"}
            className={isCorrect ? "bg-chart-3 hover:bg-chart-3 text-foreground" : ""}
          >
            {isCorrect ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
            Q{index + 1}
          </Badge>
          <CardTitle className="font-body text-base font-medium text-foreground flex-1">
            {question}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(options).map(([key, value]) => {
          const isUserAnswer = key === userAnswer;
          const isCorrectOption = key === correctAnswer;
          
          let className = 'flex items-start gap-2 p-2 rounded-md text-sm';
          if (isCorrectOption) {
            className += ' bg-chart-3/10 text-foreground border border-chart-3/30';
          } else if (isUserAnswer && !isCorrect) {
            className += ' bg-destructive/10 text-foreground border border-destructive/30';
          } else {
            className += ' bg-muted/50';
          }

          return (
            <div key={key} className={className}>
              <span className="font-semibold uppercase min-w-6">
                {key})
              </span>
              <span className="flex-1">{value}</span>
              {isCorrectOption && (
                <CheckCircle2 className="h-4 w-4 text-chart-3 shrink-0" />
              )}
              {isUserAnswer && !isCorrect && (
                <XCircle className="h-4 w-4 text-destructive shrink-0" />
              )}
            </div>
          );
        })}
        {explanation && (
          <div className="mt-3 p-3 bg-accent/50 rounded-md text-xs">
            <span className="font-semibold text-foreground">Explanation: </span>
            <span className="text-muted-foreground">{explanation}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
