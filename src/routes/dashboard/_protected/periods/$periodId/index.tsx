import SectionTitle from '@/components/SectionTitle'
import { TasksTable } from '@/components/tasks/TasksTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePeriod } from '@/hooks/periods';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_protected/periods/$periodId/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { periodId } = Route.useParams()

  const subjectQuery = usePeriod(periodId);

  if (subjectQuery.isLoading && !subjectQuery.data) return <div>
    Loading...
  </div>

  return <div>
    <SectionTitle>
      {
        subjectQuery.data?.getDisplayName()
      }
    </SectionTitle>


    <div className='flex w-full gap-4 mt-4'>
      <PeriodStatCard value='6' label='Cursos' colorStyle="text-green-500" />
      <PeriodStatCard value='18' label='Créditos' colorStyle="text-red-500" />
      <PeriodStatCard value={subjectQuery.data!.getCurrentWeek()} label='Semana' colorStyle="text-blue-500" />
    </div>



    <SectionTitle>Cursos</SectionTitle>


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
