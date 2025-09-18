import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/_protected/subjects/_layout',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/periods/$periodId/subjects/_layout"!</div>
}
