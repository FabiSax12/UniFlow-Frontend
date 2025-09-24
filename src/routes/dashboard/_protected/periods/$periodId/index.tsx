import SectionTitle from '@/components/SectionTitle'
import { SubjectCard } from '@/components/subjects/SubjectCard';
import { TaskKanbanBoard } from '@/components/tasks/kanban/TaskKanbanBoard';
import { TasksTable } from '@/components/tasks/TasksTable2';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePeriod, usePeriods } from '@/hooks/periods';
import { useSubjects } from '@/hooks/subjects';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

export const Route = createFileRoute('/dashboard/_protected/periods/$periodId/')({
  component: RouteComponent,
  validateSearch: (search) => z.object({
    tab: z.enum(["table", "kanban"]).optional()
  }).parse(search)
})

function RouteComponent() {
  const { periodId } = Route.useParams();
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const periodQuery = usePeriod(periodId);
  const periodsList = usePeriods();
  const periodSubjects = useSubjects();

  if (periodQuery.isLoading && !periodQuery.data) return <div>
    Loading...
  </div>

  const handlePeriodChange = (periodId: string) => {
    navigate({
      to: "/dashboard/periods/$periodId",
      params: { periodId }
    })
  }

  const handleTabChange = (tabValue: string) => {
    navigate({
      search: { tab: tabValue as "table" | "kanban" },
      replace: true
    })
  }

  return <div>
    <Select defaultValue={periodId} onValueChange={handlePeriodChange}>
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

    <div className='flex w-full gap-4 mt-4'>
      <PeriodStatCard value='6' label='Cursos' colorStyle="text-green-500" />
      <PeriodStatCard value='18' label='Créditos' colorStyle="text-red-500" />
      <PeriodStatCard value={periodQuery.data!.getCurrentWeek()} label='Semana' colorStyle="text-blue-500" />
    </div>

    <div className="mt-8">
      <SectionTitle>Cursos</SectionTitle>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-4'>
        {
          periodSubjects.data?.map(subject => <SubjectCard key={subject.id} subject={subject} />)
        }
      </div>
    </div>

    <Tabs value={searchParams.tab || "table"} onValueChange={handleTabChange} className="w-full mt-8">
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
      <TabsContent value="kanban">
        <TaskKanbanBoard />
      </TabsContent>
    </Tabs>
  </div>
}

const PeriodStatCard = ({ value, label, colorStyle }: { value: number | string, label: string, colorStyle?: string }) => {
  return <div className='flex flex-col justify-center items-center bg-muted rounded-2xl w-full py-10'>
    <span className={cn("text-2xl", colorStyle)} >{value}</span>
    <span>{label}</span>
  </div>
}