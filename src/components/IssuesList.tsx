import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  suggestion: string;
  category: string;
}

interface IssuesListProps {
  issues: Issue[];
  category: string;
  icon: React.ReactNode;
}

export const IssuesList = ({ issues, category, icon }: IssuesListProps) => {
  const getSeverityIcon = (severity: Issue['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'info':
        return <Info className="w-4 h-4 text-primary" />;
      default:
        return <CheckCircle className="w-4 h-4 text-success" />;
    }
  };

  const getSeverityBadge = (severity: Issue['severity']) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive" className="text-xs">Critical</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="text-xs bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case 'info':
        return <Badge variant="secondary" className="text-xs">Info</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">Low</Badge>;
    }
  };

  return (
    <Card className="shadow-card bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {icon}
          {category}
          <Badge variant="secondary" className="ml-auto">
            {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {issues.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success" />
            <p className="font-medium">No issues found!</p>
            <p className="text-sm">This category looks great.</p>
          </div>
        ) : (
          issues.map((issue) => (
            <div key={issue.id} className="border rounded-lg p-4 bg-background/50 space-y-3">
              <div className="flex items-start gap-3">
                {getSeverityIcon(issue.severity)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{issue.title}</h4>
                    {getSeverityBadge(issue.severity)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                  <div className="bg-accent/30 rounded-md p-3 border border-accent/50">
                    <p className="text-sm font-medium text-accent-foreground mb-1">💡 Suggestion:</p>
                    <p className="text-sm text-accent-foreground">{issue.suggestion}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};