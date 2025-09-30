import { createTask, type CreateTaskRequestDto } from "@/api/tasks";
import type { Task } from "@/domain/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateTask() {
  const qc = useQueryClient();

  return useMutation<Task, Error, CreateTaskRequestDto>({
    mutationKey: ["tasks"],
    mutationFn: (data: CreateTaskRequestDto) => createTask(data),
    onSuccess(data) {
      qc.setQueryData<Task[]>(["tasks"], (oldData = []) => [...oldData, data])
      toast.success("Tarea creada satisfactoriamente")
    },
  });
}