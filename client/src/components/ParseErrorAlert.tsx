import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ParseErrorAlertProps {
  error: string;
}

export default function ParseErrorAlert({ error }: ParseErrorAlertProps) {
  return (
    <Alert variant="destructive" data-testid="alert-parse-error">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-heading">Parsing Error</AlertTitle>
      <AlertDescription className="text-sm">
        {error}
      </AlertDescription>
    </Alert>
  );
}
