import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { useQuery } from '@tanstack/react-query'
import { academicApi, tasksApi } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

  const periodsQuery = useQuery({
    queryKey: ['periods'],
    queryFn: async () => await academicApi.get(API_ENDPOINTS.academic.periods).then(res => res.data),
    retry: false,
  })

  const studentsQuery = useQuery({
    queryKey: ['students'],
    queryFn: async () => await academicApi.get(API_ENDPOINTS.academic.students).then(res => res.data),
    retry: false,
  })

  return (
    <div>

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
