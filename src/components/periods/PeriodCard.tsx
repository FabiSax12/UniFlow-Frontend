import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, DollarSign } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { Period } from '@/domain/periods';

interface Props {
  period: Period
}


const metrics = [
  {
    icon: <BookOpen className="w-6 h-6 " />,
    value: 6,
    label: "cursos"
  },
  {
    icon: <DollarSign className="w-6 h-6 " />,
    value: 6,
    label: "créditos"
  }
];

export const PeriodCard = ({ period }: Props) => {

  return (
    <Link to="/dashboard/periods/$periodId" params={{ periodId: period.id }} className="bg-muted text-muted-foreground px-10 py-8 rounded-2xl space-y-5 hover:ring transition-all duration-300 hover:-translate-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{period.getDisplayName()}</h2>
          <p className="text-sm">{period.startDate.toLocaleDateString("es-CR", { day: "numeric", month: "long" })} - {period.endDate.toLocaleDateString("es-CR", { day: "numeric", month: "long" })}</p>
        </div>
        {
          period.isActive && (
            <Badge className="bg-green-500 text-black px-3 py-1.5 rounded-full text-xs font-semibold">
              Actual
            </Badge>
          )
        }
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">Progreso</span>
          <span className="text-base font-bold text-foreground">{period.getProgress()}%</span>
        </div>

        <Progress value={period.getProgress()} className='bg-accent' />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-3 text-foreground">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-transparent">
            <div className="flex gap-3 items-center">
              {metric.icon}
              <span className="text-sm font-normal ">
                {metric.value} {metric.label}
              </span>
              {/* <div className="text-xs font-medium">

              </div> */}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
};