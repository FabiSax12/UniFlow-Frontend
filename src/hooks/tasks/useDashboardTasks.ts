import { getDashboardTasks } from "@/api/tasks/endpoints/getDashboardTasks";
import { useQuery } from "@tanstack/react-query";

export function useDashboardTasks() {
  const tasksQuery = useQuery({
    queryKey: ["dashboardTasks"],
    queryFn: async () => getDashboardTasks()
  });

  return tasksQuery;
}