import type { Notification } from "@/domain/notifications";
import { useAuthStore } from "@/stores/auth";
import type { MarkNotificationAsReadResponseDto } from "@/api/notifications";
import { useOptimisticMutation } from "../useOptimisticMutation";
import { markNotificationAsRead } from "@/api/notifications/endpoints/markNotificationAsRead";

export function useReadNotification() {

  const { userInfo } = useAuthStore();
  const authStore = useAuthStore()
  console.log(authStore)

  const markAsReadMutation = useOptimisticMutation<MarkNotificationAsReadResponseDto, { id: string }, Notification>({
    mutationKey: ["notifications", "mark-read"],
    invalidateOnSeattled: false,
    mutationFn: ({ id }) => markNotificationAsRead(id),
    queryKey: ["notifications", userInfo.id],
    optimisticUpdate: (oldData, { id }) => oldData.map(n => {
      console.log("Notificacion: ", n.id, "id readed", id)
      if (n.id === id) return n.markAsRead();
      return n;
    }),
    onMutateToast: ({ id }) => ({
      message: `Actualizando Notificacion...`,
      id: `update-Notificacion-${id}`,
    }),
    onSuccessToast: (_, { id }) => ({
      message: `Notificacion actualizado correctamente`,
      id: `update-Notificacion-${id}`,
    }),
    onErrorToast: (error, { id }) => ({
      message: `Error al actualizar Notificacion`,
      description: error.message,
      id: `update-Notificacion-${id}`,
    }),
  })

  return markAsReadMutation

}