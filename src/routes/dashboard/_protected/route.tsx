import { ThemeSwitch } from '@/components/ThemeSwitch'
import { Button } from '@/components/ui/button'
import { academicApi } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'
import { useAuthStore } from '@/stores/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link, Outlet, redirect, useLocation } from '@tanstack/react-router'
import { GraduationCap, LogOut } from 'lucide-react'
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb'
import { NotificationPopover } from '@/components/notifications/NotificationPopOver'

export const Route = createFileRoute('/dashboard/_protected')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()

    if (!isAuthenticated()) {
      throw redirect({ to: '/auth/login' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {

  const navigate = Route.useNavigate()
  const location = useLocation()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate({ to: '/auth/login' })
  }

  const userQuery = useQuery({
    queryKey: ['students'],
    queryFn: async () => await academicApi.get(API_ENDPOINTS.academic.students).then(res => res.data),
    retry: false
  })

  const userName = userQuery.data?.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("") || ""

  return <div>
    <header className='bg-muted flex justify-between items-center py-4 main-padding fixed w-full z-50'>
      <div>
        <h1 className='text-lg font-bold'>
          <Link to='/'>
            <GraduationCap className='inline mr-2' />
            UniFlow
          </Link>
        </h1>
      </div>
      <div className='flex items-center gap-4'>
        {/* <Trophy /> */}
        <NotificationPopover />
        <ThemeSwitch />
        {
          !userQuery.isLoading && <div className='flex items-center gap-2'>
            <Avatar className='rounded-lg'>
              <AvatarImage src={userQuery.data?.avatar} />
              <AvatarFallback>{userName}</AvatarFallback>
            </Avatar>
            <span>{userQuery.data?.name.split(" ").slice(0, 2).join(" ")}</span>
          </div>
        }
        <Button variant="destructive" onClick={handleLogout} className='cursor-pointer' size="icon">
          <LogOut />
        </Button>
      </div>
    </header>
    <main className='main-padding pt-24 pb-10'>
      <div className='mb-6'>
        <CustomBreadcrumb location={location} showHome={false} />
      </div>
      <Outlet />
    </main>
  </div >
}
