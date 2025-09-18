import { getUserNotifications } from "@/api/notifications/endpoints/getUserNotifications";
import { useQuery } from "@tanstack/react-query";

export function useNotifications(userId: string) {

  const notificationsQuery = useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const a = await getUserNotifications(userId)
      console.log(a)
      return a
    },
    staleTime: 1000 * 60 * 5
  })

  return notificationsQuery;
}