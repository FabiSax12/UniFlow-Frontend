"use client"

import { TaskStatus } from '@/domain/tasks'
import { useTasks } from '@/hooks/tasks/useTasks'
import { TasksDataTable } from './TasksDataTable'
import { columns } from './task-columns'
import { useTasksByPeriod } from '@/hooks/tasks/useTasksByPeriod'
import { useParams } from '@tanstack/react-router'

export function TasksTable() {
  const { periodId } = useParams({ from: '/dashboard/_protected/periods/$periodId' });

  const { tasksQuery: { data: tasks, isLoading, error } } = useTasksByPeriod(periodId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-muted-foreground">Cargando tareas...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-red-500">
          Error al cargar tareas: {error.message}
        </div>
      </div>
    )
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-muted-foreground">
          No se encontraron tareas.
        </div>
      </div>
    )
  }

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