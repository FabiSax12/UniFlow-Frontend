import { getTasksByPeriod } from "@/api/tasks/endpoints/getTasksByPeriod";
import { useQuery } from "@tanstack/react-query";

export function useTasksByPeriod(periodId: string) {

  const tasksQuery = useQuery({
    queryKey: ["tasks", "period", periodId],
    queryFn: () => getTasksByPeriod(periodId),
    retry: false
  })

  return { tasksQuery }

}