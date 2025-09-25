import { completeTask } from "@/api/tasks/endpoints/completeTask";
import { useOptimisticMutation } from "../useOptimisticMutation";
import type { CompletedTaskResponseDto } from "@/api/tasks";
import type { Task } from "@/domain/tasks";

export function useCompleteTask(taskId: string) {

  const completeTaskMutation = useOptimisticMutation<CompletedTaskResponseDto, void, Task>({
    mutationKey: ["tasks", "complete"],
    mutationFn: () => completeTask(taskId),
    queryKey: ["tasks"],
    optimisticUpdate: (oldData) => oldData.map(task => {
      if (task.id === taskId) return task.complete();
      return task;
    }),
    onMutateToast: () => ({
      message: `Actualizando Tarea...`,
      id: `update-Tarea-${taskId}`,
    }),
    onSuccessToast: () => ({
      message: `Tarea actualizado correctamente`,
      id: `update-Tarea-${taskId}`,
    }),
    onErrorToast: (error) => ({
      message: `Error al actualizar Tarea`,
      description: error.message,
      id: `update-Tarea-${taskId}`,
    }),
  })

  return { completeTaskMutation }

}