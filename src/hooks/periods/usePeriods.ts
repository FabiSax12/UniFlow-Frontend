import { getAllPeriods } from "@/api/periods";
import { useQuery } from "@tanstack/react-query";

export function usePeriods() {
  const periodsQuery = useQuery({
    queryKey: ["periods"],
    queryFn: () => getAllPeriods({})
  })

  return periodsQuery;
}