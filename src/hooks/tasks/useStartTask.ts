import { useOptimisticMutation } from "../useOptimisticMutation";
import type { UpdateTaskStateResponseDto } from "@/api/tasks";
import { TaskStatus, type Task } from "@/domain/tasks";
import { updateTaskStatus } from "@/api/tasks/endpoints/updateTaskState";

export function useStartTask(taskId: string) {

  const startTaskMutation = useOptimisticMutation<UpdateTaskStateResponseDto, void, Task>({
    mutationKey: ["tasks", "start"],
    mutationFn: () => updateTaskStatus(taskId, TaskStatus.IN_PROGRESS),
    queryKey: ["tasks"],
    optimisticUpdate: (oldData) => oldData.map(task => {
      if (task.id === taskId) return task.start();
      return task;
    }),
    onMutateToast: () => ({
      message: `Iniciando Tarea...`,
      id: `start-Tarea-${taskId}`,
    }),
    onSuccessToast: () => ({
      message: `Tarea iniciada correctamente`,
      id: `start-Tarea-${taskId}`,
    }),
    onErrorToast: (error) => ({
      message: `Error al iniciar Tarea`,
      description: error.message,
      id: `start-Tarea-${taskId}`,
    }),
  })

  return { startTaskMutation }

}