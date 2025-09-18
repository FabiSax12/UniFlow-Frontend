import { getTaskById } from "@/api/tasks";
import { useQuery } from "@tanstack/react-query";

export function useTask(taskId: string) {
  const taskQuery = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => getTaskById(taskId)
  })

  return taskQuery;
}