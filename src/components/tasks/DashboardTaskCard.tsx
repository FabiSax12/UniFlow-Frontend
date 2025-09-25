import { Calendar } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { TaskWithSubject } from '@/domain/tasks/entities/taskWithSubject'
import { TaskStatusBadge } from './TaskStatusBadge'
import { TaskPriorityBadge } from './TaskPriorityBadge'

interface Props {
  task: TaskWithSubject
  className?: string  
}

const DashboardTaskCard = ({ task }: Props) => {
  return (
       <Link to="/dashboard/tasks/$taskId" params={{ taskId: task.id }} className={`rounded-xl border-l-8 px-8 py-4 border flex hover:scale-x-105 transition-all duration-300 cursor-pointer hover:border-primary ${className}`}>
      {/* Left side */}
      <div className='flex-1'>
        <div className='mb-2 '>
          <div className={`flex items-start justify-between mb-1 ${className}`}>
            <h3 className='text-2xl ${className}'>
              {task.title}
            </h3>
            <div className='flex gap-3'>
              {/* Status Badge */}
              <TaskStatusBadge status={task.status} />
              {/* Priority Badge con colores dinámicos */}
              <TaskPriorityBadge priority={task.priority} />
            </div>
          </div>
          <span className={`text-muted-foreground text-lg ${className}`}>
            {task.subjectName} | {task.subjectCode}
          </span>
        </div>
        {/* <p className='text-muted-foreground mb-2 text-base'>{task.description}</p> */}
        <div className='flex justify-between'>
          <span className={`flex text-base items-center gap-2 text-muted-foreground ${className}`}>
            <Calendar className='size-4' />
            {task.dueDate.toLocaleDateString('es-CR', { day: '2-digit', month: 'short' })}
            {" a las "}
            {task.dueDate.toLocaleTimeString('es-CR', { timeStyle: "short", hour12: false })}
          </span>
          <span className={`text-destructive text-base font-medium`}>
            {task.getTimeUntilDue()}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default DashboardTaskCard