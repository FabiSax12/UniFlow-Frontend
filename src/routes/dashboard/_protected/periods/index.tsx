import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_protected/periods/')({
  component: RouteComponent,
  beforeLoad: () => { throw redirect({ to: '/dashboard' }) },
})

function RouteComponent() {
  return <div>Hello "/dashboard/periods/"!</div>
}
