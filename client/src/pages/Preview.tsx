import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import QuestionPreviewCard from "@/components/QuestionPreviewCard";
import ParseErrorAlert from "@/components/ParseErrorAlert";

export default function Preview() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // todo: remove mock functionality - get actual parsed questions from state/context
  const [questions] = useState([
    {
      id: "q1",
      question: "What is the capital of France?",
      options: {
        a: "London",
        b: "Paris",
        c: "Berlin",
        d: "Madrid",
      },
      answer: "b",
      explanation: "Paris has been the capital of France since 987 AD.",
    },
    {
      id: "q2",
      question: "What is 2 + 2?",
      options: {
        a: "3",
        b: "4",
        c: "5",
        d: "22",
      },
      answer: "b",
    },
  ]);

  const [parseError] = useState<string | null>(null);

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your quiz",
        variant: "destructive",
      });
      return;
    }
    console.log("Saving quiz:", { title, description, questions });
    toast({
      title: "Quiz saved!",
      description: `"${title}" has been saved to your library`,
    });
    // todo: remove mock functionality - save to localStorage and navigate to dashboard
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild data-testid="button-back">
          <Link href="/upload">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
          Preview & Save Quiz
        </h1>
        <p className="text-muted-foreground">
          Review your questions and add details before saving
        </p>
      </div>

      {parseError && (
        <div className="mb-6">
          <ParseErrorAlert error={parseError} />
        </div>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-heading">Quiz Details</CardTitle>
          <CardDescription>Give your quiz a title and description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., JavaScript Fundamentals"
              data-testid="input-title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional: Add a description for this quiz"
              className="resize-none"
              rows={3}
              data-testid="textarea-description"
            />
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
          Questions ({questions.length})
        </h2>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <QuestionPreviewCard key={question.id} question={question} index={index} />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" asChild className="flex-1">
          <Link href="/upload">Cancel</Link>
        </Button>
        <Button onClick={handleSave} size="lg" className="flex-1" data-testid="button-save">
          <Save className="h-4 w-4 mr-2" />
          Save Quiz
        </Button>
      </div>
    </div>
  );
}
