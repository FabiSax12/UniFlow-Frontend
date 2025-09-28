import { createFileRoute, Link } from '@tanstack/react-router'
import SectionTitle from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import DashboardTaskCard from '@/components/tasks/DashboardTaskCard'
import { PeriodCard } from '@/components/periods/PeriodCard'
import { usePeriods } from '@/hooks/periods'
import { DashboardTaskCardSkeleton } from '@/components/tasks/DashboardTaskCardSkeleton'
import { useDashboardTasks } from '@/hooks/tasks/useDashboardTasks'
import { PeriodCardSkeleton } from '@/components/periods/PeriodCardSkeleton'

export const Route = createFileRoute('/dashboard/_protected/')({
  component: RouteComponent,
})

function RouteComponent() {

  const tasksQuery = useDashboardTasks(3);

  const periodsQuery = usePeriods();


  return <div className='flex flex-col lg:flex-row gap-6 lg:gap-20'>

    {/* Next 7 days */}
    <article className='flex-1 w-full lg:w-auto'>
      <header className='flex flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0'>
        <SectionTitle>Próximos 7 días</SectionTitle>
        <Button className='cursor-pointer' size="sm" color="primary" asChild>
          <Link to='/dashboard/tasks/create' className='flex items-center justify-center gap-2'>
            <span className='inline'>Crear Tarea</span>
            <Plus className='h-4 w-4' />
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
          tasksQuery.error && <div className='text-red-500'>Error al cargar las tareas: {tasksQuery.error.message}</div>
        }

        {
          !tasksQuery.isLoading && tasksQuery.data.length === 0 && <div className='text-red-500'>No hay tareas disponibles</div>
        }

        {
          !tasksQuery.isLoading && tasksQuery.data.length > 0 && tasksQuery.data.map(task => <DashboardTaskCard key={task.id} task={task} />)

        }

        {tasksQuery.hasMore && (
          <Button
            variant="outline"
            onClick={tasksQuery.loadMore}
            disabled={tasksQuery.isLoading}
            className="w-full self-center"
          >
            Mostrar más...
          </Button>
        )}

      </main>
    </article >

    {/* Periods */}
    <article className='w-full lg:w-80 xl:w-96'>
      <header className='flex flex-row justify-between items-center mb-4'>
        <SectionTitle>Periodos</SectionTitle>
        <Button className='cursor-pointer' size="sm" color="primary" asChild>
          <Link to='/dashboard/periods/create' className='flex items-center justify-center gap-2'>
            <span className='inline'>Añadir Periodo</span>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </header>
      <main className='w-full gap-4 flex flex-col'>
        {
          periodsQuery.isLoading && <>
            <PeriodCardSkeleton />
            <PeriodCardSkeleton />
            <PeriodCardSkeleton />
          </>
        }
        {
          periodsQuery.data?.map(period => <PeriodCard key={period.id} period={period} />)
        }
      </main>
    </article>
  </div >
}
