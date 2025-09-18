import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/_protected/subjects/create',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/periods/$periodId/subjects/create"!</div>
}
