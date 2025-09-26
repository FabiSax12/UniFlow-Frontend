import { usePeriod } from "@/hooks/periods";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  periodId: string;
}

export const PeriodStats = ({ periodId }: Props) => {

  const periodQuery = usePeriod(periodId);

  return <div className='flex w-full gap-4 mt-4'>
    {
      periodQuery.isLoading && !periodQuery.data
        ? <>
          <Skeleton className='h-32 w-full rounded-xl' />
          <Skeleton className='h-32 w-full rounded-xl' />
          <Skeleton className='h-32 w-full rounded-xl' />
        </>
        : <>
          <PeriodStatCard value='6' label='Cursos' colorStyle="text-green-500" />
          <PeriodStatCard value='18' label='Créditos' colorStyle="text-red-500" />
          <PeriodStatCard value={periodQuery.data!.getCurrentWeek()} label='Semana' colorStyle="text-blue-500" />
        </>
    }
  </div>
}

const PeriodStatCard = ({ value, label, colorStyle }: { value: number | string, label: string, colorStyle?: string }) => {
  return <div className='flex flex-col justify-center items-center bg-muted rounded-2xl w-full py-10'>
    <span className={cn("text-2xl", colorStyle)} >{value}</span>
    <span>{label}</span>
  </div>
}