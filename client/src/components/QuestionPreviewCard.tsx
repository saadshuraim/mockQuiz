import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: { [key: string]: string };
  answer: string;
  explanation?: string;
}

interface QuestionPreviewCardProps {
  question: Question;
  index: number;
}

export default function QuestionPreviewCard({ question, index }: QuestionPreviewCardProps) {
  return (
    <Card data-testid={`card-question-preview-${question.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Badge variant="outline" className="shrink-0">
            Q{index + 1}
          </Badge>
          <CardTitle className="font-body text-base font-medium text-foreground">
            {question.question}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(question.options).map(([key, value]) => (
          <div
            key={key}
            className={`flex items-start gap-2 p-2 rounded-md text-sm ${
              key === question.answer.toLowerCase()
                ? 'bg-chart-3/10 text-foreground'
                : 'bg-muted/50'
            }`}
          >
            <span className="font-semibold uppercase min-w-6">
              {key})
            </span>
            <span className="flex-1">{value}</span>
            {key === question.answer.toLowerCase() && (
              <CheckCircle2 className="h-4 w-4 text-chart-3 shrink-0" />
            )}
          </div>
        ))}
        {question.explanation && (
          <div className="mt-3 p-3 bg-accent/50 rounded-md text-xs text-muted-foreground">
            <span className="font-semibold">Explanation: </span>
            {question.explanation}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
