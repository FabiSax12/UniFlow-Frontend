import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, SquareArrowOutUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from '@/domain/tasks'
import { TaskStatus, TaskPriority } from '@/domain/tasks'
import { useSubject } from "@/hooks/subjects"
import { Link } from "@tanstack/react-router"
import { useCompleteTask } from "@/hooks/tasks/useCompleteTask"
import { useDeleteTask } from "@/hooks/tasks/useDeleteTask"

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-CR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.URGENT:
      return 'bg-red-600/50 dark:bg-red-600/50 text-foreground'
    case TaskPriority.HIGH:
      return 'bg-yellow-600/50 dark:bg-yellow-600/50 text-foreground'
    case TaskPriority.MEDIUM:
      return 'bg-green-600/50 dark:bg-green-600/50 text-foreground'
    case TaskPriority.LOW:
      return 'bg-gray-600/50 dark:bg-gray-600/50 font-semibold'
    default:
      return 'bg-gray-600/50 dark:bg-gray-600/50'
  }
}

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.TODO:
      return 'bg-red-600/50 text-foreground'
    case TaskStatus.IN_PROGRESS:
      return 'bg-yellow-600/50'
    // case TaskStatus.IN_REVIEW:
    //   return 'bg-orange-600/50'
    case TaskStatus.DONE:
      return 'bg-blue-600/50 text-foreground'
    case TaskStatus.DELIVERED:
      return 'bg-green-600/50'
    default:
      return 'bg-gray-600/50'
  }
}

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const task = row.original
      return (
        <div className="font-medium flex items-center gap-2 w-full">
          {task.isOverdue() && (
            <div className="text-xs text-red-500 font-semibold">
              ⚠️
            </div>
          )}
          {task.isDueSoon() && !task.isOverdue() && (
            <div className="text-xs text-yellow-600 font-semibold">
              ⏰
            </div>
          )}
          <div className="max-w-[250px] truncate">{task.title}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "course",
    header: "Curso",
    cell: ({ row }) => {
      const { data: subject, isLoading } = useSubject(row.getValue("course"));

      if (isLoading) return <div className="font-mono text-xs">Cargando...</div>

      if (!subject) return <div>-</div>

      return <Link to={`/dashboard/subjects/$subjectId`} params={{ subjectId: subject.id }} className="flex items-center gap-2 hover:text-blue-500 max-w-min">
        {subject.name}
        <SquareArrowOutUpRight className="size-4" />
      </Link>
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as TaskStatus
      return (
        <Badge className={getStatusColor(status)}>
          {status.replace('_', ' ')}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prioridad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const priority = row.getValue("priority") as TaskPriority
      return (
        <Badge className={getPriorityColor(priority)}>
          {priority}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return formatDate(row.getValue("dueDate"))
    },
  },
  {
    id: "timeUntilDue",
    header: "Tiempo Restante",
    cell: ({ row }) => {
      const task = row.original
      return (
        <div className={task.isOverdue() ? "text-red-600 font-semibold" : ""}>
          {task.getTimeUntilDue()}
        </div>
      )
    },
  },
  {
    id: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const task = row.original
      return (
        <div className="flex flex-wrap gap-1 max-w-[120px]">
          {task.tags.length > 0 ? (
            task.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-gray-400 text-xs">-</span>
          )}
          {task.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{task.tags.length - 2}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "estimatedTimeHours",
    header: "Tiempo Est.",
    cell: ({ row }) => {
      const hours = row.getValue("estimatedTimeHours") as number
      return hours ? `${hours}h` : "-"
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original

      const { completeTaskMutation } = useCompleteTask(task.id)
      const { deleteTaskMutation } = useDeleteTask(task.id)

      const handleCompleteTask = () => {
        completeTaskMutation.mutate()
      }

      const handleDeleteTask = () => {
        deleteTaskMutation.mutate(task.id)
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={task.status === TaskStatus.DONE}
              onClick={() => {
                console.log('Iniciar tarea:', task.id)
              }}
            >
              Iniciar tarea
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={task.status === TaskStatus.DONE}
              onClick={handleCompleteTask}
            >
              Completar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/tasks/$taskId" params={{ taskId: task.id }}>
                Ver detalles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={handleDeleteTask}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]