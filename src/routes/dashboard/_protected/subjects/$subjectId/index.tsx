// app/routes/dashboard/_protected/subjects/$subjectId/index.tsx
import { createFileRoute } from "@tanstack/react-router"
import { useSubject } from "@/hooks/subjects"
import { useTasksBySubject } from "@/hooks/tasks/useTasksBySubject"
import { SubjectSpecific } from "@/components/subjects/SubjectSpecific"
import { TabSubject } from "@/components/subjects/TabSubject"
import { TaskWithSubject } from "@/domain/tasks/entities/taskWithSubject"
import { TaskPriority } from "@/domain/tasks/enums/task-priority"
import { TaskStatus } from "@/domain/tasks/enums/task-status"
import { useDashboardTasks } from "@/hooks/tasks/useDashboardTasks"
import { DashboardTaskCardCompact } from "@/components/tasks/DashboardTaskCardCompact"
import '@/styles.css' 
export const Route = createFileRoute(
  "/dashboard/_protected/subjects/$subjectId/"
)({
  component: RouteComponent,
})

function RouteComponent() {
  const dashboardTasksQuery = useDashboardTasks()
  const globalTasks = dashboardTasksQuery.data ?? []

  const { subjectId } = Route.useParams()
  const subjectQuery = useSubject(subjectId)
  const { tasksQuery } = useTasksBySubject(subjectId)

  if (subjectQuery.isLoading) return <div>Cargando curso...</div>
  if (subjectQuery.error) return <div>Error: {subjectQuery.error.message}</div>
  if (!subjectQuery.data) return <div>Curso no encontrado</div>

  const subject = subjectQuery.data
  const tasks = tasksQuery.data ?? []

return (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-8xl mx-auto ">
      {/* Columna izquierda */}
      <div className="lg:col-span-3 space-y-4">
        {/* Card del curso compacta */}
        <SubjectSpecific
          subject={subject}
          grade={80}
          progress={85}
          hours={25}
          projects={2}
          tasks={tasks.length}
          professor="Prof. Leo Víquez"
          schedule="Lun 7:55-11:30"
          className="p-4 text-sm"
        />

        {/* Tabs compactas */}
        <TabSubject subject={subject} tasks={tasks} defaultTab="resumen" />
      </div>

    {/* Sidebar de próximas tareas (compacto) */}
      <aside className=" lg:col-span-1 border p-2 rounded-xl h-fit hidden lg:block w-full "
      style={{ backgroundColor: 'var(--sidebar)' }}>
      
          <h3 className="text-base font-semibold flex items-center gap-2">
            📅 Próximos Eventos
          </h3>
          {globalTasks.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No hay próximos eventos.
            </p>
          ) : (
            globalTasks
              .sort(
                (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
              )
              .slice(0, 5)
              .map((task) => {
                const taskWithSubject = new TaskWithSubject(
                  task.id,
                  task.title,
                  task.dueDate,
                  task.priority ?? TaskPriority.LOW,
                  task.subjectName ?? "Curso",
                  task.subjectCode ?? "IC-0000",
                  task.status ?? TaskStatus.TODO,
                  task.description,
                  task.estimatedTimeHours,
                  task.tags,
                  task.createdAt,
                  task.updatedAt,
                  task.completedAt
                )
                return (
                  <DashboardTaskCardCompact
                    key={task.id}
                    task={taskWithSubject}
                  />
                )
              })
          )}

      </aside>
    </div>
  )
}
