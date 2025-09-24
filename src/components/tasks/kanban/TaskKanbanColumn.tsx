import { Plus, MoreHorizontal } from "lucide-react"
import { Card, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TaskKanbanItem } from "./TaskKanbanItem"
import { Task } from '@/domain/tasks'
import { TaskStatus } from '@/domain/tasks'
import { cn } from "@/lib/utils"

interface TaskKanbanColumnProps {
  title: string
  status: TaskStatus
  tasks: Task[]
  onAddTask?: () => void
  onColumnAction?: (action: string) => void
  className?: string
}

export function TaskKanbanColumn({
  title,
  status,
  tasks,
  onAddTask,
  onColumnAction,
  className
}: TaskKanbanColumnProps) {

  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return {
          color: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
          headerColor: "border-slate-200 dark:border-slate-700",
          accentColor: "bg-slate-500"
        }
      case TaskStatus.IN_PROGRESS:
        return {
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
          headerColor: "border-blue-200 dark:border-blue-700",
          accentColor: "bg-blue-500"
        }
      case TaskStatus.IN_REVIEW:
        return {
          color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
          headerColor: "border-amber-200 dark:border-amber-700",
          accentColor: "bg-amber-500"
        }
      case TaskStatus.DONE:
        return {
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          headerColor: "border-green-200 dark:border-green-700",
          accentColor: "bg-green-500"
        }
      case TaskStatus.DELIVERED:
        return {
          color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
          headerColor: "border-purple-200 dark:border-purple-700",
          accentColor: "bg-purple-500"
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
          headerColor: "border-gray-200 dark:border-gray-700",
          accentColor: "bg-gray-500"
        }
    }
  }

  const statusConfig = getStatusConfig(status)
  const taskCount = tasks.length
  const overdueTasks = tasks.filter(task => task.isOverdue()).length

  return (
    <div className={cn("flex flex-col h-full min-w-[320px] max-w-[400px]", className)}>
      {/* Column Header */}
      <Card className={cn(
        "mb-4 transition-colors",
        //statusConfig.headerColor
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Status Indicator */}
              <div className={cn("w-3 h-3 rounded-full", statusConfig.accentColor)} />

              {/* Title and Count */}
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <Badge
                  variant="secondary"
                  className={cn("text-xs font-medium", statusConfig.color)}
                >
                  {taskCount}
                </Badge>
              </div>
            </div>

            {/* Column Actions */}
            <div className="flex items-center gap-1">
              {onAddTask && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAddTask}
                  className="h-8 w-8 p-0 hover:bg-accent"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Agregar tarea</span>
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-accent"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Opciones de columna</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onColumnAction?.('sort-date')}>
                    Ordenar por fecha
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onColumnAction?.('sort-priority')}>
                    Ordenar por prioridad
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onColumnAction?.('expand-all')}>
                    Expandir todas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onColumnAction?.('collapse-all')}>
                    Colapsar todas
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Additional Stats */}
          {/* {overdueTasks > 0 && (
            <div className="pt-2">
              <Badge
                variant="destructive"
                className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              >
                🚨 {overdueTasks} vencida{overdueTasks > 1 ? 's' : ''}
              </Badge>
            </div>
          )} */}
        </CardHeader>
      </Card>

      {/* Tasks Container */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full pr-2">
          {taskCount > 0 ? (
            <div className="space-y-3 pb-4">
              {tasks.map((task) => (
                <TaskKanbanItem
                  key={task.id}
                  task={task}
                  className="w-full"
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                statusConfig.color.replace('text-', 'text-').replace('bg-', 'bg-') + "/20"
              )}>
                <div className={cn("w-6 h-6 rounded-full", statusConfig.accentColor, "opacity-40")} />
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                No hay tareas aquí
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Las tareas aparecerán cuando las muevas a esta columna
              </p>
              {onAddTask && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAddTask}
                  className="mt-3 text-xs h-8"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Agregar tarea
                </Button>
              )}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Drop Zone Indicator (for future drag & drop) */}
      <div className={cn(
        "hidden h-2 mx-2 mb-2 rounded-full transition-all duration-200",
        statusConfig.accentColor,
        "opacity-0 scale-y-0"
        // Future: show when dragging over this column
        // "opacity-100 scale-y-100"
      )} />
    </div>
  )
}