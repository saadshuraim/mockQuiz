import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, FileUp, ClipboardPaste } from "lucide-react";
import AiPromptHelper from "@/components/AiPromptHelper";
import PasteTextArea from "@/components/PasteTextArea";
import FileUploadZone from "@/components/FileUploadZone";

export default function Upload() {
  const [pastedText, setPastedText] = useState("");
  const { toast } = useToast();

  const handlePreviewPaste = () => {
    if (!pastedText.trim()) {
      toast({
        title: "No content",
        description: "Please paste some quiz content first",
        variant: "destructive",
      });
      return;
    }
    console.log("Parsing pasted text:", pastedText);
    toast({
      title: "Parsing...",
      description: "Processing your quiz content",
    });
    // todo: remove mock functionality - implement actual parsing and navigation to /preview
  };

  const handleFileSelect = (file: File) => {
    console.log("File selected:", file.name);
    toast({
      title: "File uploaded",
      description: `Processing ${file.name}...`,
    });
    // todo: remove mock functionality - implement file parsing and navigation to /preview
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
                data-testid="button-preview-paste"
              >
                Preview Quiz
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
