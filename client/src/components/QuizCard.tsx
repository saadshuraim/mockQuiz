import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Play } from "lucide-react";
import { Link } from "wouter";

interface QuizCardProps {
  id: string;
  title: string;
  description?: string;
  questionCount: number;
  lastTaken?: number;
}

export default function QuizCard({ id, title, description, questionCount, lastTaken }: QuizCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-200 hover:shadow-lg border-2" data-testid={`card-quiz-${id}`}>
      <CardHeader className="pb-3 bg-gradient-to-br from-background to-background/80">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="font-heading text-xl font-bold bg-gradient-to-r from-[hsl(350,85%,45%)] to-[hsl(220,85%,45%)] bg-clip-text text-transparent line-clamp-1">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1 line-clamp-2 text-foreground/80">{description}</CardDescription>
            )}
          </div>
          <Badge variant="secondary" className="shrink-0 bg-accent text-accent-foreground font-semibold">
            {questionCount} {questionCount === 1 ? 'Q' : 'Qs'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          {lastTaken && (
            <p className="text-sm text-muted-foreground">
              Last taken {new Date(lastTaken).toLocaleDateString()}
            </p>
          )}
          <div className="flex gap-2 ml-auto">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              data-testid={`button-view-${id}`}
              className="hover:bg-accent/10 border-accent text-accent hover:text-accent"
            >
              <Link href={`/preview/${id}`}>
                <BookOpen className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="sm" 
              asChild 
              data-testid={`button-start-${id}`}
              className="bg-primary hover:bg-primary/90"
            >
              <Link href={`/quiz/${id}`}>
                <Play className="h-4 w-4 mr-1" />
                Start
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
