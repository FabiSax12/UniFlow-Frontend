import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_protected/tasks/')({
  component: RouteComponent,
  beforeLoad: () => { throw redirect({ to: '/dashboard' }) },
})

function RouteComponent() {
  return <div>Hello "/dashboard/tasks/"!</div>
}
