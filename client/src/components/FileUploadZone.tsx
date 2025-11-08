import { useCallback } from "react";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.json') || file.name.endsWith('.csv') || file.name.endsWith('.txt'))) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div className="space-y-4">
      <Card
        className="border-2 border-dashed hover-elevate transition-all cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('file-input')?.click()}
        data-testid="dropzone-upload"
      >
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-heading text-lg font-semibold mb-1">
            Drop your file here
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports .json, .csv, and .txt files
          </p>
        </div>
      </Card>
      <input
        id="file-input"
        type="file"
        accept=".json,.csv,.txt"
        onChange={handleFileInput}
        className="hidden"
        data-testid="input-file"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-2">JSON Format</h4>
          <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
{`[{
  "id": "q1",
  "question": "...",
  "options": {...},
  "answer": "a"
}]`}
          </pre>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-2">CSV Format</h4>
          <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
{`id,question,option_a,...
q1,What is...?,Ans1,...`}
          </pre>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-2">TXT Format</h4>
          <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
{`Q: Question here?
A: Option A
B: Option B
Answer: a
---`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
