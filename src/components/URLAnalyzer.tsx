import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Zap, Search } from 'lucide-react';

interface URLAnalyzerProps {
  onAnalyze: (url: string) => void;
}

export const URLAnalyzer = ({ onAnalyze }: URLAnalyzerProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    setIsLoading(true);
    // Simulate analysis delay
    setTimeout(() => {
      setIsLoading(false);
      onAnalyze(url);
    }, 2000);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6 shadow-glow">
            <Zap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Auto UX Tester
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Instantly analyze any website for performance, accessibility, and user experience issues. 
            Get actionable insights in seconds.
          </p>
        </div>

        {/* URL Input Form */}
        <Card className="shadow-card bg-gradient-card border-0 overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium text-foreground">
                  Website URL to analyze
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-12 h-14 text-lg bg-background/50 border-border/50 focus:bg-background transition-all"
                    disabled={isLoading}
                  />
                </div>
                {url && !isValidUrl(url) && (
                  <p className="text-sm text-destructive">Please enter a valid URL</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!url.trim() || !isValidUrl(url) || isLoading}
                className="w-full h-14 text-lg bg-gradient-primary hover:opacity-90 transition-all shadow-soft disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
                    Analyzing Website...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5" />
                    Analyze UX & Accessibility
                  </div>
                )}
              </Button>
            </form>

            {/* Features Preview */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-center text-sm text-muted-foreground mb-6">
                What we'll analyze for you:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '⚡', label: 'Performance' },
                  { icon: '♿', label: 'Accessibility' },
                  { icon: '📱', label: 'Mobile UX' },
                  { icon: '🎨', label: 'Design Issues' }
                ].map((feature, index) => (
                  <div key={index} className="text-center p-3 rounded-lg bg-accent/50">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <p className="text-sm font-medium text-accent-foreground">{feature.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};