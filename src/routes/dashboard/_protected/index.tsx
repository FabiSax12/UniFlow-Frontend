import { createFileRoute, Link } from '@tanstack/react-router'
import SectionTitle from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import DashboardTaskCard from '@/components/tasks/DashboardTaskCard'
import { PeriodCard } from '@/components/periods/PeriodCard'
import { usePeriods } from '@/hooks/periods'
import { DashboardTaskCardSkeleton } from '@/components/tasks/DashboardTaskCardSkeleton'
import { useDashboardTasks } from '@/hooks/tasks/useDashboardTasks'

export const Route = createFileRoute('/dashboard/_protected/')({
  component: RouteComponent,
})

function RouteComponent() {

  const tasksQuery = useDashboardTasks(3);

  const periodsQuery = usePeriods();


  return <div className='flex flex-row gap-20'>

    {/* Next 7 days */}
    <article className='flex-1'>
      <header className='flex justify-between items-center mb-4'>
        <SectionTitle>Próximos 7 días</SectionTitle>
        <Button className='cursor-pointer' size="lg" color="primary" asChild>
          <Link to='/dashboard/tasks/create'>
            Crear Tarea
            <Plus />
          </Link>
        </Button>
      </header>
      <main className='flex flex-col w-full gap-4'>

        {
          tasksQuery.isLoading && <>
            <DashboardTaskCardSkeleton />
            <DashboardTaskCardSkeleton />
            <DashboardTaskCardSkeleton />
          </>
        }

        {
          tasksQuery.data?.map(task => <DashboardTaskCard key={task.id} task={task} />)
        }

        {tasksQuery.hasMore && (
          <Button
            variant="outline"
            onClick={tasksQuery.loadMore}
            disabled={tasksQuery.isLoading}
          >
            Mostrar más...
          </Button>
        )}

      </main>
    </article >

    {/* Periods */}
    <article>
      <header className='flex justify-between items-center mb-4'>
        <SectionTitle>Periodos</SectionTitle>
        <Button className='cursor-pointer' size="lg" color="primary" asChild>
          <Link to='/dashboard/periods/create'>
            Añadir Periodo
            <Plus />
          </Link>
        </Button>
      </header>
      {/* <main className='w-full gap-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'> */}
      <main className='w-full gap-4 flex flex-col'>
        {
          periodsQuery.data?.map(period => <PeriodCard key={period.id} period={period} />)
        }
      </main>
    </article>
  </div >
}
