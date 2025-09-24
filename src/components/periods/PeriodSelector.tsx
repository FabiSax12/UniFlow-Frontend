import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import SectionTitle from '../SectionTitle'
import { useNavigate } from '@tanstack/react-router'
import { usePeriods } from '@/hooks/periods';
import { Skeleton } from '../ui/skeleton';

interface Props {
  periodId: string;
}

export const PeriodSelector = ({ periodId }: Props) => {
  const navigate = useNavigate();

  const periodsList = usePeriods();

  const handlePeriodChange = (periodId: string) => {
    navigate({
      to: "/dashboard/periods/$periodId",
      params: { periodId }
    })
  }

  if (periodsList.isLoading && !periodsList.data) return <Skeleton className='h-12 w-60 rounded-lg mb-4' />

  return <Select defaultValue={periodId} onValueChange={handlePeriodChange}>
    <SelectTrigger className='border-0 ring-0 dark:bg-transparent py-6' iconClassname="size-6">
      <SectionTitle>
        <SelectValue placeholder="Periodo" />
      </SectionTitle>
    </SelectTrigger>
    <SelectContent>
      {
        periodsList.data?.map(p => <SelectItem key={p.id} value={p.id}>{p.getDisplayName()}</SelectItem>)
      }
    </SelectContent>
  </Select>


}
