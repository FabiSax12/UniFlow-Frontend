import { getPeriodById } from "@/api/periods";
import { useQuery } from "@tanstack/react-query";

export function usePeriod(periodId: string) {
  const periodQuery = useQuery({
    queryKey: ["periods", periodId],
    queryFn: () => getPeriodById(periodId)
  })

  return periodQuery;
}