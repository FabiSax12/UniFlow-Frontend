import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_protected/periods/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/periods/create"!</div>
}
