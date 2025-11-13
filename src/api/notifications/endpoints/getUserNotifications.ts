import { Notification, NotificationPriority, NotificationType } from "@/domain/notifications";
import { notificationsApi } from "@/lib/api/client";
import type { GetUserNotificationsResponseDto } from "../dto/response.dto";

export async function getUserNotifications(userId: string): Promise<Notification[]> {
  const axiosResponse = await notificationsApi.get<GetUserNotificationsResponseDto>(`/user/${userId}`);

  return axiosResponse.data.notifications.map(notification => new Notification(
    notification.id,
    notification.title,
    notification.message,
    NotificationType[notification.type],
    NotificationPriority[notification.priority],
    notification.userId,
    notification.isRead,
    notification.actionUrl,
    new Date(notification.createdAt),
    notification.readAt ? new Date(notification.readAt) : undefined
  ));
}
