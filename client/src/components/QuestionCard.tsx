import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: string;
  options: { [key: string]: string };
  selectedAnswer: string | null;
  onSelectAnswer: (key: string) => void;
}

export default function QuestionCard({ question, options, selectedAnswer, onSelectAnswer }: QuestionCardProps) {
  return (
    <Card data-testid="card-question">
      <CardHeader>
        <CardTitle className="font-heading text-xl text-foreground leading-relaxed">
          {question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(options).map(([key, value]) => {
          const isSelected = selectedAnswer === key;
          return (
            <Button
              key={key}
              variant={isSelected ? "default" : "outline"}
              className={`w-full justify-start text-left h-auto py-3 px-4 ${
                isSelected ? '' : 'hover-elevate'
              }`}
              onClick={() => onSelectAnswer(key)}
              data-testid={`button-option-${key}`}
            >
              <span className="font-semibold uppercase mr-3 min-w-6">
                {key})
              </span>
              <span className="flex-1">{value}</span>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
