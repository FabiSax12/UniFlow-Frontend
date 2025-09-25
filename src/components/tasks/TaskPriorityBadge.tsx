import { TaskPriority } from "@/domain/tasks"
import { Badge } from "../ui/badge"

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

interface Props {
  priority: TaskPriority
}

export const TaskPriorityBadge = ({ priority }: Props) => {
  const priorityColor = getPriorityColor(priority)

  return <Badge className={priorityColor}>
    {priority.toUpperCase()}
  </Badge>
}
