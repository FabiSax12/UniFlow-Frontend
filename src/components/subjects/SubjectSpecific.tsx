import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Clock, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import type { Subject } from "@/domain/subjects"


interface SubjectSpecificProps {
  subject: Subject
  professor?: string
  grade: number
  progress: number
  hours: number
  projects: number
  tasks: number
  schedule?: string
  className?: string
}

export const SubjectSpecific: React.FC<SubjectSpecificProps> = ({
  subject,
  professor = "Prof. Leo Víquez",
  grade,
  progress,
  hours,
  projects,
  tasks,
  schedule,
  className,
}) => {


return (
  <Card className={`w-full max-w-6xl mx-auto transition-all duration-200 hover:shadow-lg cursor-default ${className} flex flex-col`}>
    <CardHeader className="flex flex-col items-start justify-between sm:flex-row sm:items-center pb-2 flex-grow">
      <div className="sm:pr-4">
        <h3 className="text-2xl font-semibold leading-tight">{subject.name}</h3>
        <p className="text-lg text-muted-foreground">
          {subject.getFormattedCode()} • {professor} • {subject.credits} Créditos
        </p>
        {schedule && (
          <p className="text-sm text-muted-foreground">{schedule}</p>
        )}
      </div>

      <div className="text-right mt-2 sm:mt-0">
        <p className="text-3xl font-semibold text-green-500">{grade}</p>
        <p className="text-sm text-muted-foreground">Nota</p>
      </div>
    </CardHeader>

    <CardContent className="flex-grow">
    

       {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-2 rounded-xl bg-muted flex items-center justify-start">
          <Loader2 className="w-5 h-5 text-purple-500  ml-2" />
          <div>
            <p className="text-lg font-semibold  ml-2">{progress}%</p>
            <p className="text-sm text-muted-foreground  ml-2">Progreso</p>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-muted flex items-center justify-start">
          <Clock className="w-5 h-5 text-blue-500 ml-2" />
          <div>
            <p className="text-lg font-semibold  ml-2">{hours}h</p>
            <p className="text-sm text-muted-foreground  ml-2">Dedicadas</p>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-muted flex items-center justify-start">
          <AlertCircle className="w-5 h-5 text-red-500 ml-2" />
          <div>
            <p className="text-lg font-semibold  ml-2">{projects}</p>
            <p className="text-sm text-muted-foreground  ml-2">Proyectos</p>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-muted flex items-center justify-start">
          <CheckCircle2 className="w-5 h-5 text-green-500 ml-2" />
          <div>
            <p className="text-lg font-semibold  ml-2">{tasks}</p>
            <p className="text-sm text-muted-foreground  ml-2">Tareas Pendientes</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)
}
