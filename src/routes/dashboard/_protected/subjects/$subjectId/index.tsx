import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/_protected/periods/$periodId/subjects/$subjectId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/periods/$periodId/subjects/$subjectId/"!</div>
}
