import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { DatePicker } from '@/components/DatePicker'
import { PeriodType } from '@/domain/periods'
import { useCreatePeriod } from '@/hooks/periods'
import { useForm } from '@tanstack/react-form'
import z from 'zod'

const createPeriodSearchSchema = z.object({
  callbackUrl: z.string().optional()
})

const createPeriodFormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  type: z.enum(["FIRST_SEMESTER", "SECOND_SEMESTER", "SUMMER"], {
    errorMap: () => ({ message: 'Selecciona un tipo de periodo' })
  }),
  year: z.number().min(2000).max(new Date().getFullYear() + 5),
  startDate: z.date({
    required_error: 'La fecha de inicio es requerida'
  }),
  endDate: z.date({
    required_error: 'La fecha de fin es requerida'
  }),
  isActive: z.boolean()
}).refine((data) => data.endDate > data.startDate, {
  message: "La fecha de fin debe ser posterior a la fecha de inicio",
  path: ["endDate"]
})

export const Route = createFileRoute('/dashboard/_protected/periods/create')({
  component: RouteComponent,
  validateSearch: (search) => createPeriodSearchSchema.parse(search)
})

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();
  const createPeriodMutation = useCreatePeriod();

  const currentYear = new Date().getFullYear();

  const form = useForm({
    defaultValues: {
      name: '',
      type: '' as keyof typeof PeriodType,
      year: currentYear,
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      isActive: false
    },
    onSubmit: async ({ value }) => {
      try {
        const data = {
          name: value.name,
          type: value.type,
          year: value.year,
          startDate: value.startDate?.toISOString() || '',
          endDate: value.endDate?.toISOString() || '',
          isActive: value.isActive
        };

        await createPeriodMutation.mutateAsync(data);
        navigate({ to: searchParams.callbackUrl || "/dashboard" });
      } catch (error) {
        console.error('Error creating period:', error);
      }
    },
    validators: {
      onChange: createPeriodFormSchema,
    },
  });

  const handleCancel = () => {
    navigate({ to: searchParams.callbackUrl || "/dashboard" })
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Crear Nuevo Periodo</CardTitle>
          <CardDescription>
            Completa los campos para crear un nuevo periodo académico
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="grid grid-cols-1 gap-6"
          >
            {/* Nombre */}
            <form.Field
              name="name"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Nombre *</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Ej: Primer Semestre, Segundo Semestre, Verano"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">{JSON.stringify(field.state.meta.errors[0]?.message)}</p>
                  )}
                </div>
              )}
            />

            {/* Tipo de Periodo */}
            <form.Field
              name="type"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Tipo de Periodo *</Label>
                  <Select
                    value={field.state.value.toLowerCase()}
                    onValueChange={(periodType) => field.handleChange(periodType.toUpperCase() as keyof typeof PeriodType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de periodo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PeriodType.FIRST_SEMESTER.replace("-", "_")}>Primer Semestre</SelectItem>
                      <SelectItem value={PeriodType.SECOND_SEMESTER.replace("-", "_")}>Segundo Semestre</SelectItem>
                      <SelectItem value={PeriodType.SUMMER.replace("-", "_")}>Verano</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            />

            {/* Año */}
            <form.Field
              name="year"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Año *</Label>
                  <Select
                    value={field.state.value.toString()}
                    onValueChange={(value) => field.handleChange(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el año" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 6 }, (_, i) => currentYear - 2 + i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            />

            {/* Fecha de inicio */}
            <form.Field
              name="startDate"
              children={(field) => (
                <div className="space-y-2">
                  <DatePicker
                    label='Fecha de Inicio *'
                    value={field.state.value}
                    onDateChange={field.handleChange}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            />

            {/* Fecha de fin */}
            <form.Field
              name="endDate"
              children={(field) => (
                <div className="space-y-2">
                  <DatePicker
                    label='Fecha de Fin *'
                    value={field.state.value}
                    onDateChange={field.handleChange}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            />

            {/* Estado activo */}
            <form.Field
              name="isActive"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Estado</Label>
                  <Select
                    value={field.state.value.toString()}
                    onValueChange={(value) => field.handleChange(value === 'true')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Inactivo</SelectItem>
                      <SelectItem value="true">Activo</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            />

            {/* Form-level errors */}
            {/* {form.state.errors && form.state.errors.length > 0 && (
              <div className="space-y-2">
                {form.state.errors.map((error, i) => (
                  <p key={i} className="text-sm text-red-600">{Object.values(error).map(e => e.message)}</p>
                ))}
              </div>
            )} */}

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="flex-1"
                disabled={createPeriodMutation.isPending || !form.state.canSubmit}
              >
                {createPeriodMutation.isPending ? 'Creando...' : 'Crear Periodo'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
                disabled={createPeriodMutation.isPending}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
