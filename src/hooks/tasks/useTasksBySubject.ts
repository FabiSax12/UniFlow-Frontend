import { getTasksBySubject } from "@/api/tasks/endpoints/getTasksBySubject";
import { useQuery } from "@tanstack/react-query";

export function useTasksBySubject(subjectId: string) {

  const tasksQuery = useQuery({
    queryKey: ["tasks", "subject", subjectId],
    queryFn: () => getTasksBySubject(subjectId),
    retry: false
  })

  return { tasksQuery }

}