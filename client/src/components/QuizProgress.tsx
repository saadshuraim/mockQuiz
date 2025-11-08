import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="space-y-2" data-testid="quiz-progress">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-heading font-semibold text-foreground">
          Question {current} of {total}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
