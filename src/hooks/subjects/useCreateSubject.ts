import { createSubject, type CreateSubjectRequestDto } from "@/api/subjects";
import type { Subject } from "@/domain/subjects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateSubject() {
  const qc = useQueryClient();

  return useMutation<Subject, Error, CreateSubjectRequestDto>({
    mutationKey: ["subjects"],
    mutationFn: (data: CreateSubjectRequestDto) => createSubject(data),
    onSuccess(data) {
      qc.setQueryData<Subject[]>(["subjects"], (oldData = []) => [...oldData, data])
      toast.success("Curso creado satisfactoriamente")
    },
  });
}