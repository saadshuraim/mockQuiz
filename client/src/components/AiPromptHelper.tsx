import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AI_PROMPT_TEMPLATE = `Create a quiz with 10 multiple choice questions about [YOUR TOPIC].

For each question, provide:
- A clear question
- Four options (a, b, c, d)
- The correct answer (letter only)
- A brief explanation

Format as JSON array like this:
[
  {
    "id": "q1",
    "question": "What is 2+2?",
    "options": {
      "a": "3",
      "b": "4",
      "c": "5",
      "d": "6"
    },
    "answer": "b",
    "explanation": "2+2 equals 4"
  }
]`;

export default function AiPromptHelper() {
  const { toast } = useToast();

  const copyPrompt = () => {
    navigator.clipboard.writeText(AI_PROMPT_TEMPLATE);
    toast({
      title: "Copied!",
      description: "AI prompt template copied to clipboard",
    });
  };

  return (
    <Card data-testid="card-ai-helper">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="font-heading text-lg">AI Quiz Generator</CardTitle>
        </div>
        <CardDescription>
          Copy this prompt and use it with ChatGPT, Claude, or any AI assistant to generate quiz content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto font-mono">
            <code>{AI_PROMPT_TEMPLATE}</code>
          </pre>
          <Button
            size="sm"
            variant="outline"
            className="absolute top-2 right-2"
            onClick={copyPrompt}
            data-testid="button-copy-prompt"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
