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

  // Helper para extraer mensaje de error
  const getErrorMessage = (errors: any[]): string | null => {
    if (!errors || errors.length === 0) return null;
    const error = errors[0];
    return typeof error === 'string' ? error : error.message || 'Error de validación';
  };

  const form = useForm({
    defaultValues: {
      name: '',
      type: '' as keyof typeof PeriodType,
      year: currentYear,
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      isActive: false
    },
    onSubmit: async ({ value, formApi }) => {
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
        formApi.reset();
        // navigate({ to: searchParams.callbackUrl || "/dashboard" });
      } catch (error) {
        console.error('Error creating period:', error);
      }
    },
    validators: {
      onChange: createPeriodFormSchema,
      onBlur: createPeriodFormSchema,
      onSubmit: createPeriodFormSchema,
      onDynamic: createPeriodFormSchema
    }
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
            >
              {(field) => {
                const errorMessage = getErrorMessage(field.state.meta.errors);
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Nombre *</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Ej: Primer Semestre, Segundo Semestre, Verano"
                      className={errorMessage ? 'border-red-500' : ''}
                    />
                    {errorMessage && (
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Tipo de Periodo */}
            <form.Field
              name="type"
            >
              {(field) => {
                const errorMessage = getErrorMessage(field.state.meta.errors);
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Tipo de Periodo *</Label>
                    <Select
                      value={field.state.value ? field.state.value.toLowerCase() : ''}
                      onValueChange={(periodType) => {
                        field.handleChange(periodType.toUpperCase() as keyof typeof PeriodType);
                        field.handleBlur();
                      }}
                    >
                      <SelectTrigger className={errorMessage ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecciona el tipo de periodo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first_semester">Primer Semestre</SelectItem>
                        <SelectItem value="second_semester">Segundo Semestre</SelectItem>
                        <SelectItem value="summer">Verano</SelectItem>
                      </SelectContent>
                    </Select>
                    {errorMessage && (
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Año */}
            <form.Field
              name="year"
            >
              {(field) => {
                const errorMessage = getErrorMessage(field.state.meta.errors);
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Año *</Label>
                    <Select
                      value={field.state.value.toString()}
                      onValueChange={(value) => {
                        field.handleChange(parseInt(value));
                        field.handleBlur();
                      }}
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
                    {errorMessage && (
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Fecha de inicio */}
            <form.Field
              name="startDate"
            >
              {(field) => {
                const errorMessage = getErrorMessage(field.state.meta.errors);
                return (
                  <div className="space-y-2">
                    <DatePicker
                      label='Fecha de Inicio *'
                      value={field.state.value}
                      onDateChange={(date) => {
                        field.handleChange(date);
                        field.handleBlur();
                      }}
                    />
                    {errorMessage && (
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Fecha de fin */}
            <form.Field
              name="endDate"
            >
              {(field) => {
                const errorMessage = field.state.meta.errors?.[0]
                  ? typeof field.state.meta.errors[0] === 'string'
                    ? field.state.meta.errors[0]
                    : field.state.meta.errors[0].message || 'Error de validación'
                  : null;

                return (
                  <div className="space-y-2">
                    <DatePicker
                      label='Fecha de Fin *'
                      value={field.state.value}
                      onDateChange={(date) => {
                        field.handleChange(date);
                        field.handleBlur();
                      }}
                    />
                    {errorMessage && (
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Estado activo */}
            <form.Field name="isActive">
              {(field) => (
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
                </div>
              )}
            </form.Field>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="flex-1"
                disabled={createPeriodMutation.isPending}
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