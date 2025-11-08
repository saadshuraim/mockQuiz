import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

interface PasteTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PasteTextArea({ value, onChange }: PasteTextAreaProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <Label htmlFor="paste-text" className="font-medium">
          Paste your quiz text here
        </Label>
      </div>
      <Textarea
        id="paste-text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste JSON, CSV, or simple text format quiz content here..."
        className="min-h-64 font-mono text-sm resize-y"
        data-testid="textarea-paste"
      />
      <p className="text-xs text-muted-foreground">
        Supports JSON array, CSV (with headers), or simple text format. The parser will auto-detect the format.
      </p>
    </div>
  );
}
