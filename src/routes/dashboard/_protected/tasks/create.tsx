import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSubjects } from '@/hooks/subjects'
import { DatePicker } from '@/components/DatePicker'

export const Route = createFileRoute('/dashboard/_protected/tasks/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate();

  const subjectsQuery = useSubjects();

  const handleSubmit = () => {
    navigate({ to: "/dashboard" })
  }

  const handleCancel = () => {
    navigate({ to: "/dashboard" })
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Crear Nueva Tarea</CardTitle>
          <CardDescription>
            Completa los campos para crear una nueva tarea
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Ingresa el título de la tarea"
                required
              />
            </div>

            {/* Materia */}
            <div className="space-y-2">
              <Label htmlFor="subjectId">Materia *</Label>
              <Select name="subjectId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una materia" />
                </SelectTrigger>
                <SelectContent>
                  {
                    subjectsQuery.data?.map(subject => <SelectItem value={subject.id}>{subject.name}</SelectItem>)
                  }
                </SelectContent>
              </Select>
            </div>

            {/* Fecha de entrega */}
            <div className="space-y-2">
              <DatePicker label='Fecha de Entrega *' />
            </div>

            <div className='space-y-2'>
              <Label htmlFor="time" className="px-1">
                Hora de entrega *
              </Label>
              <Input
                type="time"
                id="time"
                step="1"
                defaultValue="23:55:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>

            {/* Prioridad */}
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad *</Label>
              <Select name="priority" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe la tarea (opcional)"
                rows={4}
              />
            </div>

            {/* Tiempo estimado */}
            <div className="space-y-2">
              <Label htmlFor="estimatedTimeHours">
                Tiempo Estimado (horas)
              </Label>
              <Input
                id="estimatedTimeHours"
                name="estimatedTimeHours"
                type="number"
                min="0"
                step="0.5"
                placeholder="Ej: 2.5"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Etiquetas</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="Ej: examen, proyecto, tarea (separadas por comas)"
              />
            </div>


            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" className="flex-1">
                Crear Tarea
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}