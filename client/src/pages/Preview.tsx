import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useQuiz } from "@/contexts/QuizContext";
import { saveQuiz } from "@/utils/storage";
import QuestionPreviewCard from "@/components/QuestionPreviewCard";

export default function Preview() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { parsedQuestions, clearParsedQuestions } = useQuiz();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (parsedQuestions.length === 0) {
      setLocation("/upload");
    }
  }, [parsedQuestions, setLocation]);

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your quiz",
        variant: "destructive",
      });
      return;
    }

    try {
      const savedQuiz = saveQuiz({
        title: title.trim(),
        description: description.trim() || undefined,
        questions: parsedQuestions,
      });
      
      toast({
        title: "Quiz saved!",
        description: `"${title}" has been saved to your library`,
      });
      
      clearParsedQuestions();
      setLocation("/");
    } catch (error) {
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
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
          Questions ({parsedQuestions.length})
        </h2>
        <div className="space-y-4">
          {parsedQuestions.map((question, index) => (
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
