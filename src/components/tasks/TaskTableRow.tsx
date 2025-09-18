import { Task, TaskPriority, TaskStatus } from "@/domain/tasks";
import { useSubject } from "@/hooks/subjects";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { Link } from "@tanstack/react-router";
import { SquareArrowOutUpRight } from "lucide-react";

export const TaskTableRow = ({ task }: { task: Task }) => {

  const { data: subject } = useSubject(task.subjectId);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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

  const getOverdueIndicator = (task: Task) => {
    if (task.isOverdue()) {
      return <span>⚠️</span>
    }
    if (task.isDueSoon()) {
      return <span>⏰</span>
    }
    return null
  }



  return <TableRow key={task.id} className={task.isOverdue() && false ? 'bg-red-500/30 dark:bg-red-500/30' : ''}>
    <TableCell className="font-medium">
      <div className="flex gap-2">
        {getOverdueIndicator(task)}
        {task.title}
      </div>
    </TableCell>
    <TableCell className="font-mono text-xs">
      {!!subject && (
        <Link to={`/dashboard/subjects/$subjectId`} params={{ subjectId: subject.id }} className="flex items-center gap-2 hover:text-blue-500 max-w-min">
          {subject.name}
          <SquareArrowOutUpRight className="size-4" />
        </Link>
      )}
    </TableCell>
    <TableCell>
      <Badge className={getStatusColor(task.status)} variant="default">
        {task.status.replace('_', ' ').toUpperCase()}
      </Badge>
    </TableCell>
    <TableCell>
      <Badge className={getPriorityColor(task.priority)}>
        {task.priority.toUpperCase()}
      </Badge>
    </TableCell>
    <TableCell>{formatDate(task.dueDate)}</TableCell>
    <TableCell className={task.isOverdue() ? "text-red-500" : task.isDueSoon() ? "text-yellow-500" : undefined}>
      {task.getTimeUntilDue()}
    </TableCell>
    {/* <TableCell className="max-w-xs">
      <div className="truncate" title={task.description}>
        {task.description || '-'}
      </div>
    </TableCell> */}
    <TableCell>
      <div className="flex flex-wrap gap-1">
        {task.tags.length > 0 ? (
          task.tags.map((tag, index) => (
            <Badge key={index}>{tag}</Badge>
          ))
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </div>
    </TableCell>
    <TableCell>
      <Link
        to="/dashboard/tasks/$taskId"
        params={{ taskId: task.id }}
        className="flex items-center gap-2 hover:text-blue-500 max-w-min"
      >
        Abrir
        <SquareArrowOutUpRight className="size-4" />
      </Link>
    </TableCell>
  </TableRow>
}