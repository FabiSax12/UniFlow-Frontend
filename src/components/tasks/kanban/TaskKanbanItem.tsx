import { Calendar, Clock, AlertTriangle, CheckCircle2, User, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Task } from '@/domain/tasks'
import { TaskStatus, TaskPriority } from '@/domain/tasks'
import { cn } from "@/lib/utils"
import { useSubject } from "@/hooks/subjects"

interface TaskKanbanItemProps {
  task: Task
  className?: string
}

export function TaskKanbanItem({ task, className }: TaskKanbanItemProps) {

  const subjectQuery = useSubject(task.subjectId);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getPriorityConfig = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return {
          variant: "destructive" as const,
          icon: "🔥",
          className: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
        }
      case TaskPriority.MEDIUM:
        return {
          variant: "secondary" as const,
          icon: "⚡",
          className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
        }
      case TaskPriority.LOW:
        return {
          variant: "outline" as const,
          icon: "📝",
          className: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
        }
      default:
        return {
          variant: "outline" as const,
          icon: "📋",
          className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
        }
    }
  }

  const getUrgencyIndicator = () => {
    if (task.isOverdue()) {
      return {
        show: true,
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/50",
        borderColor: "border-l-red-500",
        icon: AlertTriangle,
        text: "VENCIDA"
      }
    }

    if (task.isDueSoon()) {
      return {
        show: true,
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-50 dark:bg-amber-950/50",
        borderColor: "border-l-amber-500",
        icon: Clock,
        text: "PRÓXIMA"
      }
    }

    return { show: false }
  }

  const priorityConfig = getPriorityConfig(task.priority)
  const urgencyIndicator = getUrgencyIndicator()
  const progress = task.getProgressPercentage()

  return (
    <TooltipProvider>
      <Card
        draggable
        className={cn(
          "w-full max-w-sm transition-all duration-200 hover:shadow-md cursor-pointer",
          "border border-border/50 hover:border-border",
          "bg-card hover:bg-accent/5 gap-2",
          "select-none",
          urgencyIndicator.show && [
            urgencyIndicator.bgColor,
            "border-l-4",
            urgencyIndicator.borderColor
          ],
          className
        )}
      >
        <CardHeader className="pb-3 space-y-2">

          {/* Título */}
          <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-2">
            {task.title}
          </h3>

          {/* Subject */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="size-4" />
            <span className="font-mono">{subjectQuery.data?.getFullName()}</span>
          </div>
        </CardHeader>

        <CardContent className="pt-0space-y-3">
          {/* Descripción */}
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Footer con fecha y tiempo estimado */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <Tooltip>
              <TooltipTrigger>
                <div className={cn(
                  "flex items-center gap-1 text-xs",
                  task.isOverdue()
                    ? "text-red-600 dark:text-red-400 font-medium"
                    : "text-muted-foreground"
                )}>
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fecha de entrega: {task.getTimeUntilDue()}</p>
              </TooltipContent>
            </Tooltip>

            {/* Header con prioridad y estado de urgencia */}
            <div className="flex items-start justify-between gap-2">
              {/* <Badge
              className={cn(
                "text-xs font-medium",
                priorityConfig.className
              )}
            >
              <span className="mr-1">{priorityConfig.icon}</span>
              {task.priority}
            </Badge> */}

              {urgencyIndicator.show && urgencyIndicator.icon && (
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-semibold border-0",
                        urgencyIndicator.color
                      )}
                    >
                      <urgencyIndicator.icon className="w-3 h-3 mr-1" />
                      {urgencyIndicator.text}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{task.getTimeUntilDue()}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>


            {task.estimatedTimeHours && (
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{task.estimatedTimeHours}h</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tiempo estimado: {task.estimatedTimeHours} hora(s)</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Completion indicator para tareas completadas */}
          {task.status === TaskStatus.DONE && (
            <div className="flex items-center justify-start pt-2">
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>Completada</span>
                {task.completedAt && (
                  <span className="text-muted-foreground">
                    {formatDate(task.completedAt)}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}