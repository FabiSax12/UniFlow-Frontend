import { useAuthStore } from "@/stores/auth";
import { useOptimisticDelete } from "../useOptimisticDelete";
import { deleteNotification } from "@/api/notifications/endpoints/deleteNotification";

export function useDeleteNotification() {

  const { userInfo } = useAuthStore()

  const deleteNotificationsMutation = useOptimisticDelete(
    ["notifications", userInfo.id],
    deleteNotification,
    "Notificación"
  )

  return { deleteNotificationsMutation }
}