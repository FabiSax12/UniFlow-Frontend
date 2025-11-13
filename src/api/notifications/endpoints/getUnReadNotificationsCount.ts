import { notificationsApi } from "@/lib/api/client"
import type { NotificationsCountResponseDto } from "../dto/response.dto"

export async function getUnReadNotificationsCount(userId: string | number) {
  const axiosResponse = await notificationsApi.get<NotificationsCountResponseDto>(`/user/${userId}/unread-count`)

  return axiosResponse.data
}