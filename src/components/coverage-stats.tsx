import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

interface CoverageStatsProps {
  modelsCovered: number;
  coveragePercentage: number;
}

export function CoverageStats({ modelsCovered, coveragePercentage }: CoverageStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">
          Indicador de Cobertura
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
          <Target className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">{modelsCovered.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Modelos Cubiertos</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
          <CheckCircle className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">{coveragePercentage}%</p>
            <p className="text-sm text-muted-foreground">Cobertura del Parque Vehicular</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
