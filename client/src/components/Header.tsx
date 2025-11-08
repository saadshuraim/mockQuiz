import { Button } from "@/components/ui/button";
import { BookOpen, Moon, Sun } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between bg-gradient-to-r from-[hsl(350,85%,45%)] to-[hsl(220,85%,45%)] bg-clip-text">
        <Link href="/">
          <button className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md transition-all font-bold text-transparent" data-testid="link-home">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-xl text-foreground">
              MockQuiz
            </span>
          </button>
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
