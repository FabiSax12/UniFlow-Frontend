import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { academicApi } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'
import { useAuth } from '@/hooks/auth'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

  const { isAuthenticated, loading, logout } = useAuth()

  const periodsQuery = useQuery({
    queryKey: ['periods'],
    queryFn: async () => await academicApi.get(API_ENDPOINTS.academic.periods).then(res => res.data),
    retry: false,
    enabled: isAuthenticated,
  })

  const studentsQuery = useQuery({
    queryKey: ['students'],
    queryFn: async () => await academicApi.get(API_ENDPOINTS.academic.students).then(res => res.data),
    retry: false,
    enabled: isAuthenticated,
  })

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" > </div>
        < span className="ml-3 text-lg" > Procesando autenticación...</span>
      </div>
    )
  }

  return (
    <div>
      <button onClick={logout} className='px-4 py-2 bg-red-600 text-white rounded'>Cerrar Sesión</button>
      <pre>
        <h1>Periods</h1>
        {JSON.stringify(periodsQuery.data, null, 2)}
      </pre>

      <pre>
        <h1>Students</h1>
        {JSON.stringify(studentsQuery.data, null, 2)}
      </pre>
    </div>
  )
}
