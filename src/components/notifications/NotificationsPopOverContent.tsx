import { useNotifications } from "@/hooks/notifications/useNotifications"
import { useAuthStore } from "@/stores/auth"
import React from "react";
import { NotificationCard } from "./NotificationCard";
import { useNavigate } from "@tanstack/react-router";
import { Skeleton } from "../ui/skeleton";

export const NotificationsPopOverContent = () => {

  const navigate = useNavigate();

  const { userInfo } = useAuthStore();
  const notifications = useNotifications(userInfo.studentId);

  const handleNotificationAction = (actionUrl: string) => {
    navigate({ to: actionUrl })
  }

  return <React.Fragment>
    {
      notifications.isLoading && <>
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </>
    }
    {
      notifications.data?.map(notification => <NotificationCard notification={notification} onAction={handleNotificationAction} />)
    }
    {
      notifications.isError && <span className="text-red-500">
        Error al cargar las notificationes
      </span>
    }
  </React.Fragment>
}