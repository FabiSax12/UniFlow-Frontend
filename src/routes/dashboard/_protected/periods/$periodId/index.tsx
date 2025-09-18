import SectionTitle from '@/components/SectionTitle'
import { SubjectCard } from '@/components/subjects/SubjectCard';
import { TasksTable } from '@/components/tasks/TasksTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePeriod } from '@/hooks/periods';
import { useSubjects } from '@/hooks/subjects';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_protected/periods/$periodId/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { periodId } = Route.useParams()

  const periodQuery = usePeriod(periodId);

  const periodSubjects = useSubjects();

  if (periodQuery.isLoading && !periodQuery.data) return <div>
    Loading...
  </div>

  return <div>
    <SectionTitle>
      {
        periodQuery.data?.getDisplayName()
      }
    </SectionTitle>


    <div className='flex w-full gap-4 mt-4'>
      <PeriodStatCard value='6' label='Cursos' colorStyle="text-green-500" />
      <PeriodStatCard value='18' label='Créditos' colorStyle="text-red-500" />
      <PeriodStatCard value={periodQuery.data!.getCurrentWeek()} label='Semana' colorStyle="text-blue-500" />
    </div>



    <div className="mt-8">
      <SectionTitle>Cursos</SectionTitle>
      <div className='grid grid-cols-4 gap-6 mt-4'>
        {
          periodSubjects.data?.map(subject => <SubjectCard subject={subject} />)
        }
      </div>
    </div>

    {/* <SectionTitle>Tareas</SectionTitle> */}
    <Tabs defaultValue="table" className="w-full mt-8">

      <div className='flex justify-between items-center w-full mb-6'>
        <SectionTitle>Entregas del Semestre</SectionTitle>
        <TabsList>
          <TabsTrigger value="table">Tabla</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="table">
        <TasksTable />
      </TabsContent>
      <TabsContent value="kanban">Kanban View</TabsContent>
    </Tabs>

  </div>
}

const PeriodStatCard = ({ value, label, colorStyle }: { value: number | string, label: string, colorStyle?: string }) => {
  return <div className='flex flex-col justify-center items-center bg-muted rounded-2xl w-full py-10'>
    <span className={cn("text-2xl", colorStyle)} >{value}</span>
    <span>{label}</span>
  </div>
}
