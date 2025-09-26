import { Task, TaskStatus } from '@/domain/tasks'
import { TasksDataTable } from './TasksDataTable'
import { columns } from './task-columns'
import { Button } from '../ui/button'

type TasksTableProps = {
  tasks: Task[] | undefined,
  isLoading: boolean,
  error: Error | null,
}

export function TasksTable({ tasks, isLoading, error }: TasksTableProps) {

  // Render states
  if (isLoading) return <IsLoadingComponent />
  if (error) return <IsErrorComponent error={error} />
  if (!tasks || tasks.length === 0) return <IsEmptyComponent />

  // Main render
  return (
    <div className="space-y-4">
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-3 bg-card rounded-lg border">
          <div className="text-2xl font-bold">{tasks.length}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="p-3 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {tasks.filter(task => task.status === TaskStatus.DONE).length}
          </div>
          <div className="text-sm text-muted-foreground">Completadas</div>
        </div>
        <div className="p-3 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">
            {tasks.filter(task => task.status === TaskStatus.IN_PROGRESS).length}
          </div>
          <div className="text-sm text-muted-foreground">En progreso</div>
        </div>
        <div className="p-3 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-red-600">
            {tasks.filter(task => task.isOverdue()).length}
          </div>
          <div className="text-sm text-muted-foreground">Vencidas</div>
        </div>
      </div>

      {/* Data Table */}
      <TasksDataTable columns={columns} data={tasks} />
    </div>
  )
}

const IsLoadingComponent = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-sm text-muted-foreground">Cargando tabla...</p>
      </div>
    </div>
  )
}

const IsErrorComponent = ({ error }: { error: Error }) => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center space-y-4">
        <div className="text-red-500 text-sm font-medium">
          Error al cargar las tareas: {error.message}
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      </div>
    </div>
  )
}

const IsEmptyComponent = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-sm text-muted-foreground">
        No se encontraron tareas.
      </div>
    </div>
  )
}