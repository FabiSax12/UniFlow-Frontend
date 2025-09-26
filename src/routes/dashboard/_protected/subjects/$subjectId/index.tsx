// app/routes/dashboard/_protected/subjects/$subjectId/index.tsx
import { createFileRoute } from "@tanstack/react-router"
import { useSubject } from "@/hooks/subjects"
import { useTasksBySubject } from "@/hooks/tasks/useTasksBySubject"
import { SubjectSpecific } from "@/components/subjects/SubjectSpecific"
import { TabSubject } from "@/components/subjects/TabSubject"


import '@/styles.css' 
export const Route = createFileRoute(
  "/dashboard/_protected/subjects/$subjectId/"
)({
  component: RouteComponent,
})

function RouteComponent() {


  const { subjectId } = Route.useParams()
  const subjectQuery = useSubject(subjectId)
  const { tasksQuery } = useTasksBySubject(subjectId)

  if (subjectQuery.isLoading) return <div>Cargando curso...</div>
  if (subjectQuery.error) return <div>Error: {subjectQuery.error.message}</div>
  if (!subjectQuery.data) return <div>Curso no encontrado</div>

  const subject = subjectQuery.data
  const tasks = tasksQuery.data ?? []

return (
  <div className="grid grid-cols-1 lg:grid gap-6 max-w-8xl mx-auto ">
      {/* Columna izquierda */}
      <div className="lg space-y-4">
        {/* Card del curso compacta */}
        <SubjectSpecific
          subject={subject}
          progress={85}
          hours={25}
          projects={2}
          tasks={tasks.length}
          professor="Prof. Leo Víquez"
          schedule="Lun 7:55-11:30"
          className="p-4 text-sm"
          onEdit = {(s) => {
              console.log("Edit subject", s);
            }}
          onDelete = {(s) => {
              console.log("Delete subject", s);
            }}
        />

        {/* Tabs compactas */}
        <TabSubject subject={subject} tasks={tasks} defaultTab="resumen" />
      </div>

   

    </div>
  )
}
