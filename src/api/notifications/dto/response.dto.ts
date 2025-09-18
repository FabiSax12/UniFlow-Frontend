import type {
  NotificationPriority,
  NotificationType
} from "@/domain/notifications"

export interface NotificationsCountResponseDto {
  userId: string
  unreadCount: number
  lastChecked: string
}

export interface GetUserNotificationsResponseDto {
  notifications: {
    id: string,
    userId: string,
    title: string,
    message: string,
    type: keyof typeof NotificationType,
    priority: keyof typeof NotificationPriority,
    isRead: false,
    createdAt: string,
    taskId: string,
    subjectId: string,
    readAt?: string,
    actionUrl: string
  }[],
  total: number,
  hasMore: boolean
}

export interface MarkNotificationAsReadResponseDto {
  id: string,
  isRead: boolean,
  markedAt: string,
  success: boolean
}