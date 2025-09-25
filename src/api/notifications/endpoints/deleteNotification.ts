import { notificationsApi } from "@/lib/api/client";

export async function deleteNotification(notificationId: string): Promise<void> {
  const axiosResponse = await notificationsApi.delete(`/v1/notifications/${notificationId}`)

  if (axiosResponse.status !== 204) throw new Error("No se pudo eliminar la tarea")

  return
}