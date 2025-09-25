import { useTask } from '@/hooks/tasks'
import { createFileRoute } from '@tanstack/react-router'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { TaskDetail } from '@/components/tasks/TaskDetail'
import { TaskDetailSkeleton } from '@/components/tasks/TaskDetailSkeleton'

export const Route = createFileRoute(
  '/dashboard/_protected/tasks/$taskId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { taskId } = Route.useParams()
  const taskQuery = useTask(taskId)

  if (taskQuery.isLoading) {
    return <TaskDetailSkeleton />
  }

  if (taskQuery.isError) {
    return (
      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Error al cargar los detalles de la tarea. Por favor, intenta nuevamente.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!taskQuery.data) {
    return (
      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            No se encontró la tarea solicitada.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return <TaskDetail task={taskQuery.data} />
}
