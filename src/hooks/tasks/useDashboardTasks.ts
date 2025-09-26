import { getDashboardTasks } from "@/api/tasks/endpoints/getDashboardTasks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";

export function useDashboardTasks(initialLimit: number = 4) {
  const [visibleCount, setVisibleCount] = useState(initialLimit);

  const tasksQuery = useQuery({
    queryKey: ["dashboardTasks"],
    queryFn: async () => (await getDashboardTasks()).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
  });

  const visibleTasks = useMemo(() => {
    return tasksQuery.data?.slice(0, visibleCount) || [];
  }, [tasksQuery.data, visibleCount]);

  const hasMore = useMemo(() => {
    return (tasksQuery.data?.length || 0) > visibleCount;
  }, [tasksQuery.data, visibleCount]);

  const loadMore = () => {
    setVisibleCount(prev => prev + initialLimit);
  };

  return {
    ...tasksQuery,
    data: visibleTasks,
    hasMore,
    loadMore,
    totalCount: tasksQuery.data?.length || 0
  };
}