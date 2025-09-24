import { getPeriodSubjects } from "@/api/periods";
import { useQuery } from "@tanstack/react-query";

export function useSubjectsByPeriod(periodId: string) {
  const subjectsByPeriod = useQuery({
    queryKey: ["subjects", { periodId }],
    queryFn: () => getPeriodSubjects(periodId),
    retry: false
  })

  return { subjectsByPeriod }
}
