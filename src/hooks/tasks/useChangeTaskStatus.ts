import { useOptimisticMutation } from "../useOptimisticMutation";
import type { UpdateTaskStateResponseDto } from "@/api/tasks";
import type { Task, TaskStatus } from "@/domain/tasks";
import { updateTaskStatus } from "@/api/tasks/endpoints/updateTaskState";

interface Props {
  queryKey: string[]
}

export function useChangeTaskStatus({ queryKey }: Props) {

  const changeTaskStatusMutation = useOptimisticMutation<UpdateTaskStateResponseDto, { taskId: string, newStatus: TaskStatus }, Task>({
    mutationKey: ["tasks", "update"],
    invalidateOnSeattled: false,
    mutationFn: ({ taskId, newStatus }) => updateTaskStatus(taskId, newStatus),
    queryKey: queryKey,
    optimisticUpdate: (oldData, { taskId, newStatus }) => oldData.map(task => {
      if (task.id === taskId) return task.updateStatus(newStatus);
      return task;
    }),
    onMutateToast: ({ taskId, newStatus }) => ({
      message: `Actualizando Tarea...`,
      id: `update-Tarea-${taskId}-${newStatus}`,
    }),
    onSuccessToast: (_, { taskId, newStatus }) => ({
      message: `Tarea actualizado correctamente`,
      id: `update-Tarea-${taskId}-${newStatus}`,
    }),
    onErrorToast: (error, { taskId, newStatus }) => ({
      message: `Error al actualizar Tarea`,
      description: error.message,
      id: `update-Tarea-${taskId}-${newStatus}`,
    }),
  })

  return { changeTaskStatusMutation }

}