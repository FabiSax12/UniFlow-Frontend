import { Bell, Trash } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Badge } from "../ui/badge"
import { useUnReadNotificationsCount } from "@/hooks/notifications/useNotificationsCount"
import { useAuthStore } from "@/stores/auth"
import { Button } from "../ui/button"
import { NotificationsPopOverContent } from "./NotificationsPopOverContent"
import { useDeleteNotification } from "@/hooks/notifications/useDeleteNotifications"
import { useNotifications } from "@/hooks/notifications/useNotifications"

export const NotificationPopover = () => {

  const { userInfo } = useAuthStore()
  const notificationsCount = useUnReadNotificationsCount(userInfo.id)
  const notificationsQuery = useNotifications(userInfo.id)
  const { deleteNotificationsMutation } = useDeleteNotification()

  const handleDeleteAll = async () => {
    if (!notificationsQuery.data) return
    for (const n of notificationsQuery.data) {
      document.getElementById(`notification-card-${n.id}`)?.classList.add("transition-all", "translate-x-full", "opacity-0")
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    await new Promise(resolve => setTimeout(resolve, 100))

    for (const n of notificationsQuery.data) {
      deleteNotificationsMutation.mutate(n.id)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='relative size-8' variant="ghost" size="icon">
          <Bell className="size-6" />
          <Badge className='rounded-full h-5 w-5 absolute -top-2 -right-2' variant="default">
            {notificationsCount.data?.unreadCount ?? 0}
          </Badge>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          Notificationes
          <Button size="icon" variant="ghost" onClick={handleDeleteAll}>
            <Trash className="text-red-500" />
          </Button>
        </div>
        <NotificationsPopOverContent />
      </PopoverContent>
    </Popover>
  )
}