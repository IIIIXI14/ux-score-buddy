import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScoreCard } from './ScoreCard';
import { IssuesList } from './IssuesList';
import { ArrowLeft, ExternalLink, Zap, Shield, Smartphone, Palette, RefreshCw } from 'lucide-react';

interface ResultsDashboardProps {
  url: string;
  onBack: () => void;
}

// Mock data for demonstration
const mockResults = {
  overallScore: 78,
  scores: {
    performance: 85,
    accessibility: 72,
    mobile: 88,
    design: 67
  },
  issues: {
    performance: [
      {
        id: '1',
        title: 'Slow page load time',
        description: 'Page takes 4.2 seconds to load, which is above the recommended 3 seconds.',
        severity: 'warning' as const,
        suggestion: 'Optimize images, minify CSS/JS, and enable compression to reduce load times.',
        category: 'Performance'
      },
      {
        id: '2',
        title: 'Large image files',
        description: 'Several images are larger than 1MB and not optimized.',
        severity: 'warning' as const,
        suggestion: 'Use WebP format and compress images to reduce file sizes by 60-80%.',
        category: 'Performance'
      }
    ],
    accessibility: [
      {
        id: '3',
        title: 'Missing alt text on images',
        description: '3 images are missing descriptive alt text for screen readers.',
        severity: 'critical' as const,
        suggestion: 'Add descriptive alt text to all images to improve accessibility for visually impaired users.',
        category: 'Accessibility'
      },
      {
        id: '4',
        title: 'Low color contrast',
        description: 'Text on buttons has insufficient contrast ratio (2.1:1, needs 4.5:1).',
        severity: 'critical' as const,
        suggestion: 'Increase contrast between text and background colors to meet WCAG AA standards.',
        category: 'Accessibility'
      }
    ],
    mobile: [
      {
        id: '5',
        title: 'Touch targets too small',
        description: 'Some buttons are smaller than the recommended 44px touch target.',
        severity: 'warning' as const,
        suggestion: 'Increase button size to at least 44x44px for better mobile usability.',
        category: 'Mobile UX'
      }
    ],
    design: [
      {
        id: '6',
        title: 'Inconsistent spacing',
        description: 'Margins and padding are inconsistent across different sections.',
        severity: 'info' as const,
        suggestion: 'Use a consistent spacing scale (8px, 16px, 24px, etc.) throughout the design.',
        category: 'Design'
      },
      {
        id: '7',
        title: 'Poor typography hierarchy',
        description: 'Heading sizes don\'t follow a clear hierarchy.',
        severity: 'warning' as const,
        suggestion: 'Establish a clear typography scale with consistent heading sizes and weights.',
        category: 'Design'
      }
    ]
  }
};

export const ResultsDashboard = ({ url, onBack }: ResultsDashboardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Analyze Another Site
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Re-analyze
          </Button>
        </div>

        {/* Site Info */}
        <Card className="shadow-card bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">UX Analysis Results</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{url}</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Overall Score */}
        <Card className="shadow-card bg-gradient-card border-0">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-foreground mb-2">
                {mockResults.overallScore}
              </div>
              <div className="text-xl text-muted-foreground mb-4">Overall UX Score</div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                getScoreColor(mockResults.overallScore) === 'success' 
                  ? 'bg-success/10 text-success border border-success/20' 
                  : getScoreColor(mockResults.overallScore) === 'warning'
                  ? 'bg-warning/10 text-warning border border-warning/20'
                  : 'bg-destructive/10 text-destructive border border-destructive/20'
              }`}>
                {mockResults.overallScore >= 80 ? '🎉 Great' : mockResults.overallScore >= 60 ? '👍 Good' : '⚠️ Needs Work'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScoreCard
            title="Performance"
            score={mockResults.scores.performance}
            icon={<Zap className="w-5 h-5" />}
            color={getScoreColor(mockResults.scores.performance)}
          />
          <ScoreCard
            title="Accessibility"
            score={mockResults.scores.accessibility}
            icon={<Shield className="w-5 h-5" />}
            color={getScoreColor(mockResults.scores.accessibility)}
          />
          <ScoreCard
            title="Mobile UX"
            score={mockResults.scores.mobile}
            icon={<Smartphone className="w-5 h-5" />}
            color={getScoreColor(mockResults.scores.mobile)}
          />
          <ScoreCard
            title="Design"
            score={mockResults.scores.design}
            icon={<Palette className="w-5 h-5" />}
            color={getScoreColor(mockResults.scores.design)}
          />
        </div>

        {/* Issues by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IssuesList
            issues={mockResults.issues.performance}
            category="Performance Issues"
            icon={<Zap className="w-5 h-5" />}
          />
          <IssuesList
            issues={mockResults.issues.accessibility}
            category="Accessibility Issues"
            icon={<Shield className="w-5 h-5" />}
          />
          <IssuesList
            issues={mockResults.issues.mobile}
            category="Mobile UX Issues"
            icon={<Smartphone className="w-5 h-5" />}
          />
          <IssuesList
            issues={mockResults.issues.design}
            category="Design Issues"
            icon={<Palette className="w-5 h-5" />}
          />
        </div>
      </div>
    </div>
  );
};