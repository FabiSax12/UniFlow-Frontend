import { Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Task } from '@/domain/tasks'
import { useSubject } from '@/hooks/subjects/useSubject'
import { Link } from '@tanstack/react-router'

interface Props {
  task: Task
}

const DashboardTaskCard = ({ task }: Props) => {
  const subjectQuery = useSubject(task.subjectId);

  // Función para obtener los colores según el status
  const getStatusStyles = (status: string) => {
    const statusLower = status.toLowerCase();

    switch (statusLower) {
      case 'todo':
        return {
          badgeVariant: 'destructive' as const,
          textColor: 'text-yellow-700',
        };
      case 'in-progress':
        return {
          badgeVariant: 'default' as const,
          textColor: 'text-blue-700',
        };
      case 'done':
        return {
          badgeVariant: 'secondary' as const,
          textColor: 'text-green-700',
        };
      default:
        return {
          badgeVariant: 'outline' as const,
          textColor: 'text-muted-foreground',
        };
    }
  };

  // Función para obtener los colores según la prioridad
  const getPriorityStyles = (priority: string) => {
    const priorityLower = priority.toLowerCase();

    switch (priorityLower) {
      case 'low':
        return {
          badgeVariant: 'secondary' as const,
          customClasses: 'bg-green-100 text-green-800 hover:bg-green-200'
        };
      case 'medium':
        return {
          badgeVariant: 'default' as const,
          customClasses: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
        };
      case 'high':
        return {
          badgeVariant: 'destructive' as const,
          customClasses: 'bg-orange-100 text-orange-800 hover:bg-orange-200'
        };
      case 'urgent':
        return {
          badgeVariant: 'destructive' as const,
          customClasses: 'bg-red-500 text-white hover:bg-red-600'
        };
      default:
        return {
          badgeVariant: 'outline' as const,
          customClasses: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        };
    }
  };

  const statusStyles = getStatusStyles(task.status);
  const priorityStyles = getPriorityStyles(task.priority);

  return (
    <Link to={`/dashboard/tasks/${task.subjectId}`} className="rounded-xl border-l-8 px-8 py-4 border flex hover:scale-x-105 transition-all duration-300 cursor-pointer hover:border-primary">
      {/* Left side */}
      <div className='flex-1'>
        <div className='mb-2'>
          <div className='flex items-start justify-between mb-1'>
            <h3 className='text-2xl'>
              {task.title}
            </h3>
            <div className='flex gap-3'>
              {/* Status Badge */}
              <Badge variant={statusStyles.badgeVariant} className='text-base ml-2'>
                {task.status.toUpperCase()}
              </Badge>
              {/* Priority Badge con colores dinámicos */}
              <Badge
                variant={priorityStyles.badgeVariant}
                className={`text-base ${priorityStyles.customClasses}`}
              >
                {task.priority.toUpperCase()}
              </Badge>
            </div>
          </div>
          {
            subjectQuery.data && (
              <span className='text-muted-foreground text-lg'>
                {subjectQuery.data?.name} | {subjectQuery.data?.code}
              </span>
            )
          }
        </div>
        <p className='text-muted-foreground mb-2 text-base'>{task.description}</p>
        <div className='flex justify-between'>
          <span className='flex text-base items-center gap-2 text-muted-foreground'>
            <Calendar className='size-4' />
            {task.dueDate.toLocaleDateString('es-CR', { day: '2-digit', month: 'short' })}
            {" a las "}
            {task.dueDate.toLocaleTimeString('es-CR', { timeStyle: "short", hour12: false })}
          </span>
          <span className='text-destructive text-base'>
            {task.getTimeUntilDue()}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default DashboardTaskCard