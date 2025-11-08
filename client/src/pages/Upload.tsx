import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, FileUp, ClipboardPaste } from "lucide-react";
import { useLocation } from "wouter";
import { useQuiz } from "@/contexts/QuizContext";
import { parseQuizText, parseQuizFile } from "@/utils/quizParser";
import AiPromptHelper from "@/components/AiPromptHelper";
import PasteTextArea from "@/components/PasteTextArea";
import FileUploadZone from "@/components/FileUploadZone";

export default function Upload() {
  const [pastedText, setPastedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { setParsedQuestions } = useQuiz();

  const handlePreviewPaste = async () => {
    if (!pastedText.trim()) {
      toast({
        title: "No content",
        description: "Please paste some quiz content first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const questions = await parseQuizText(pastedText);
      setParsedQuestions(questions);
      toast({
        title: "Success!",
        description: `Parsed ${questions.length} questions`,
      });
      setLocation("/preview");
    } catch (error) {
      toast({
        title: "Parsing failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const questions = await parseQuizFile(file);
      setParsedQuestions(questions);
      toast({
        title: "Success!",
        description: `Parsed ${questions.length} questions from ${file.name}`,
      });
      setLocation("/preview");
    } catch (error) {
      toast({
        title: "File parsing failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
          Create New Quiz
        </h1>
        <p className="text-muted-foreground">
          Use AI to generate quiz content or upload your own questions
        </p>
      </div>

      <Tabs defaultValue="paste" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="paste" data-testid="tab-paste">
            <ClipboardPaste className="h-4 w-4 mr-2" />
            Paste Text
          </TabsTrigger>
          <TabsTrigger value="upload" data-testid="tab-upload">
            <FileUp className="h-4 w-4 mr-2" />
            Upload File
          </TabsTrigger>
        </TabsList>

        <TabsContent value="paste" className="space-y-6">
          <AiPromptHelper />
          
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Paste Quiz Content</CardTitle>
              <CardDescription>
                Paste JSON, CSV, or simple text format. The parser will automatically detect the format.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <PasteTextArea value={pastedText} onChange={setPastedText} />
              <Button 
                onClick={handlePreviewPaste} 
                size="lg" 
                className="w-full"
                disabled={isProcessing}
                data-testid="button-preview-paste"
              >
                {isProcessing ? "Processing..." : "Preview Quiz"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Upload Quiz File</CardTitle>
              <CardDescription>
                Drop a file or click to browse. Supports JSON, CSV, and TXT formats.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadZone onFileSelect={handleFileSelect} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
