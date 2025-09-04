import { useState } from 'react';
import { URLAnalyzer } from '@/components/URLAnalyzer';
import { ResultsDashboard } from '@/components/ResultsDashboard';

const Index = () => {
  const [analyzedUrl, setAnalyzedUrl] = useState<string | null>(null);

  const handleAnalyze = (url: string) => {
    setAnalyzedUrl(url);
  };

  const handleBack = () => {
    setAnalyzedUrl(null);
  };

  if (analyzedUrl) {
    return <ResultsDashboard url={analyzedUrl} onBack={handleBack} />;
  }

  return <URLAnalyzer onAnalyze={handleAnalyze} />;
};

export default Index;
