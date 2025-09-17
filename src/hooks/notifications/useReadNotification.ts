import { markNotificationAsRead } from "@/api/notifications/endpoints/markNotificationAsRead";
import type { Notification } from "@/domain/notifications";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useReadNotification() {

  const queryClient = useQueryClient();

  const { userInfo } = useAuthStore();

  const markAsReadMutation = useMutation({
    mutationKey: ["notifications", "mark-read"],
    mutationFn: markNotificationAsRead,
    onSuccess: (_, notificationId) => {


      queryClient.setQueryData<Notification[]>(
        ["notifications", userInfo.studentId],
        (oldData) => {
          return oldData?.map(notification => notification.id === notificationId ? notification.markAsRead() : notification)
        }
      )
    }
  })

  return markAsReadMutation

}