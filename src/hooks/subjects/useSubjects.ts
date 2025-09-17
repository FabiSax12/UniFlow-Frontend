import { getAllSubjects } from "@/api/subjects";
import { useQuery } from "@tanstack/react-query";

export function useSubjects() {
  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: () => getAllSubjects({})
  })

  return subjectsQuery;
}