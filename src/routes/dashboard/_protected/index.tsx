import { useAuth } from '@/hooks/auth'
import { academicApi } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/dashboard/_protected/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { isAuthenticated } = useAuth()

  const studentsQuery = useQuery({
    queryKey: ['students'],
    queryFn: async () => await academicApi.get(API_ENDPOINTS.academic.students).then(res => res.data),
    retry: false,
    enabled: isAuthenticated,
  })

  return <div>
    <pre>
      <h1>Perfil (Prueba de API)</h1>
      {JSON.stringify(studentsQuery.data, null, 2)}
    </pre>
  </div>
}
