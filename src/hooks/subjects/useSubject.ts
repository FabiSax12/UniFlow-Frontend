import { getSubjectById } from "@/api/subjects";
import { useQuery } from "@tanstack/react-query";

export function useSubject(subjectId: string) {
  const subjectQuery = useQuery({
    queryKey: ["subjects", subjectId],
    queryFn: () => getSubjectById(subjectId)
  })

  return subjectQuery;
}