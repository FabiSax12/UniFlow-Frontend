import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TaskStatus } from '@/domain/tasks'
import { useTasks } from '@/hooks/tasks/useTasks'
import { TaskTableRow } from "./TaskTableRow"

export function TasksTable() {
  const { data: tasks, isLoading, error } = useTasks()

  if (isLoading) {
    return <div className="p-4">Loading tasks...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading tasks: {error.message}</div>
  }

  if (!tasks || tasks.length === 0) {
    return <div className="p-4">No tasks found.</div>
  }

  const completedTasks = tasks.filter(task => task.status === TaskStatus.DONE).length
  const totalTasks = tasks.length

  return (
    <Table>
      <TableCaption>
        Lista de tus tareas. {completedTasks} de {totalTasks} completadas.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Título</TableHead>
          <TableHead>Curso</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Prioridad</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Tiempo Restante</TableHead>
          {/* <TableHead>Descripción</TableHead> */}
          <TableHead>Tags</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => <TaskTableRow task={task} />)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10}>Total Tasks</TableCell>
          <TableCell colSpan={4} className="text-right">
            <div className="space-y-1">
              <div>Total: {totalTasks}</div>
              <div>Completed: {completedTasks}</div>
              <div>Pending: {totalTasks - completedTasks}</div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
