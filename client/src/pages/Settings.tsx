import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Download, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const { toast } = useToast();

  const handleExport = () => {
    // todo: remove mock functionality - implement actual localStorage export
    const mockData = {
      quizzes: [],
      attempts: [],
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mockquiz_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Data exported",
      description: "Your backup file has been downloaded",
    });
  };

  const handleClearData = () => {
    // todo: remove mock functionality - implement actual localStorage clear
    console.log("Clearing all data from localStorage");
    toast({
      title: "Data cleared",
      description: "All quizzes and results have been deleted",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Button variant="ghost" asChild data-testid="button-back">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your data and preferences
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Data Backup</CardTitle>
            <CardDescription>
              Export all your quizzes and results as a JSON file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExport} variant="outline" data-testid="button-export">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Your data is stored locally in your browser. Export regularly to keep a backup.
            </p>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="font-heading text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions that will permanently delete your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" data-testid="button-clear-trigger">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-heading">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your quizzes,
                    results, and progress from your browser's storage.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-testid="button-cancel">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearData}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-testid="button-clear-confirm"
                  >
                    Yes, delete everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">About</CardTitle>
            <CardDescription>
              MockQuiz is a privacy-first quiz application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                All your data is stored locally in your browser using localStorage.
                No servers, no tracking, 100% private.
              </p>
              <p>
                Works completely offline once loaded. Create quizzes using AI-generated
                content or upload your own questions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
