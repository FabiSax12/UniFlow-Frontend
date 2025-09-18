import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_protected/periods/$periodId/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/periods/$periodId/_layout"!</div>
}
