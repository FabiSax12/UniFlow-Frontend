import { getUnReadNotificationsCount } from "@/api/notifications/endpoints/getUnReadNotificationsCount";
import { useQuery } from "@tanstack/react-query";

export function useUnReadNotificationsCount(userId: string | number) {

  const query = useQuery({
    queryKey: ["notifications", "unreadCount"],
    queryFn: async () => await getUnReadNotificationsCount(userId)
  })

  return query
}