import { notificationsApi } from "@/lib/api/client";
import type { MarkNotificationAsReadResponseDto } from "../dto/response.dto";

export async function markNotificationAsRead(notificationId: string): Promise<MarkNotificationAsReadResponseDto> {

  const axiosResponse = await notificationsApi.put<MarkNotificationAsReadResponseDto>(`/v1/notifications/${notificationId}/mark-read`);

  if (axiosResponse.status === 404) throw new Error("Notification with ID" + notificationId + " not found");

  return axiosResponse.data
}