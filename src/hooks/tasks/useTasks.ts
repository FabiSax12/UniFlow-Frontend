import { getAllTasks } from "@/api/tasks";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  const subjectsQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => getAllTasks()
  });

  return subjectsQuery;
}