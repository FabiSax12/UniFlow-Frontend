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
import { usePeriods } from '@/hooks/periods'
import { useCreateSubject } from '@/hooks/subjects'
import { useForm } from '@tanstack/react-form'
import z from 'zod'

const createSubjectSearchSchema = z.object({
  callbackUrl: z.string().optional()
})

// Schema alineado con el dominio
const createSubjectFormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  code: z.string()
    .min(1, 'El código es requerido')
    .regex(/^[A-Z]{2,4}-\d{4}$/i, 'El código debe seguir el formato TEC (ej: IC-6821)'),
  professor: z.string().optional(),
  credits: z.number()
    .min(0, 'Los créditos deben ser al menos 0')
    .max(6, 'Los créditos no pueden exceder 6'),
  periodId: z.string().min(1, 'Selecciona un periodo')
})

export const Route = createFileRoute('/dashboard/_protected/subjects/create')({
  component: RouteComponent,
  validateSearch: (search) => createSubjectSearchSchema.parse(search)
})

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();
  const createSubjectMutation = useCreateSubject();
  const periodsQuery = usePeriods();

  // Helper para extraer mensaje de error
  const getErrorMessage = (errors: any[]): string | null => {
    if (!errors || errors.length === 0) return null;
    const error = errors[0];
    return typeof error === 'string' ? error : error.message || 'Error de validación';
  };

  const form = useForm({
    defaultValues: {
      name: '',
      code: '',
      professor: undefined as string | undefined,
      credits: 3,
      periodId: ''
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        const data = {
          name: value.name,
          code: value.code.toUpperCase(),
          professor: value.professor,
          credits: value.credits,
          periodId: value.periodId
        };

        await createSubjectMutation.mutateAsync(data);
        formApi.reset();
        // navigate({ to: searchParams.callbackUrl || "/dashboard" });
      } catch (error) {
        console.error('Error creating subject:', error);
      }
    },
  });

  const handleCancel = () => {
    navigate({ to: searchParams.callbackUrl || "/dashboard" })
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Crear Nueva Materia</CardTitle>
          <CardDescription>
            Completa los campos para crear una nueva materia
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
              validators={{
                onSubmit: createSubjectFormSchema.shape.name
              }}
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
                      placeholder="Ej: Programación Orientada a Objetos"
                      className={errorMessage ? 'border-red-500' : ''}
                    />
                    {errorMessage && (
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Código */}
            <form.Field
              name="code"
              validators={{
                onSubmit: createSubjectFormSchema.shape.code
              }}
            >
              {(field) => {
                const errorMessage = getErrorMessage(field.state.meta.errors);
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Código *</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value.toUpperCase())}
                      placeholder="Ej: IC-6821"
                      className={errorMessage ? 'border-red-500' : ''}
                    />
                    <p className="text-xs text-muted-foreground">
                      Formato: 2-4 letras mayúsculas, guion, 4 números (ej: IC-6821)
                    </p>
                    {errorMessage && (
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Profesor */}
            <form.Field name="professor">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Profesor</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value || undefined)}
                    placeholder="Ej: Dr. Juan Pérez (opcional)"
                  />
                </div>
              )}
            </form.Field>

            {/* Créditos */}
            <form.Field
              name="credits"
              validators={{
                onSubmit: createSubjectFormSchema.shape.credits
              }}
            >
              {(field) => {
                const errorMessage = getErrorMessage(field.state.meta.errors);
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Créditos *</Label>
                    <Select
                      value={field.state.value.toString()}
                      onValueChange={(value) => {
                        field.handleChange(parseInt(value));
                        field.handleBlur();
                      }}
                    >
                      <SelectTrigger className={errorMessage ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecciona los créditos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 créditos</SelectItem>
                        <SelectItem value="1">1 crédito</SelectItem>
                        <SelectItem value="2">2 créditos</SelectItem>
                        <SelectItem value="3">3 créditos</SelectItem>
                        <SelectItem value="4">4 créditos</SelectItem>
                        <SelectItem value="5">5 créditos</SelectItem>
                        <SelectItem value="6">6 créditos</SelectItem>
                      </SelectContent>
                    </Select>
                    {errorMessage && (
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Periodo */}
            <form.Field
              name="periodId"
              validators={{
                onSubmit: createSubjectFormSchema.shape.periodId
              }}
            >
              {(field) => {
                const errorMessage = getErrorMessage(field.state.meta.errors);
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Periodo *</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => {
                        field.handleChange(value);
                        field.handleBlur();
                      }}
                    >
                      <SelectTrigger className={errorMessage ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecciona un periodo" />
                      </SelectTrigger>
                      <SelectContent>
                        {periodsQuery.data?.map(period => (
                          <SelectItem key={period.id} value={period.id}>
                            {period.name} - {period.year}
                          </SelectItem>
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

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="flex-1"
                disabled={createSubjectMutation.isPending}
              >
                {createSubjectMutation.isPending ? 'Creando...' : 'Crear Materia'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
                disabled={createSubjectMutation.isPending}
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