import { deleteTaskById } from "@/api/tasks";
import { useOptimisticDelete } from "../useOptimisticDelete";

export function useDeleteTask(taskId: string) {

  const deleteTaskMutation = useOptimisticDelete(
    ["tasks"],
    () => deleteTaskById(taskId),
    "Tarea"
  );

  // const queryClient = useQueryClient();

  // const deleteTaskMutation = useMutation({
  //   mutationKey: ["tasks", "delete", taskId],
  //   mutationFn: () => deleteTaskById(taskId),

  //   onMutate: async () => {
  //     await queryClient.cancelQueries({ queryKey: ["tasks"] });

  //     // Snapshot del estado anterior
  //     const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

  //     queryClient.setQueryData<Task[]>(
  //       ["tasks"],
  //       (oldData = []) => {
  //         return oldData.filter(task => task.id !== taskId);
  //       }
  //     );

  //     // Toast de loading
  //     toast.loading("Eliminando tarea...", {
  //       id: `delete-task-${taskId}`,
  //     });

  //     return { previousTasks };
  //   },

  //   onSuccess: () => {
  //     toast.success("Tarea eliminada correctamente", {
  //       id: `delete-task-${taskId}`,
  //     });
  //   },

  //   onError: (error, variables, context) => {
  //     // Revertir al estado anterior
  //     if (context?.previousTasks) {
  //       queryClient.setQueryData<Task[]>(["tasks"], context.previousTasks);
  //     }

  //     // Toast de error
  //     toast.error("Error al eliminar la tarea", {
  //       id: `delete-task-${taskId}`,
  //       description: error instanceof Error ? error.message : "Intenta nuevamente",
  //     });
  //   },

  //   onSettled: () => {
  //     // Invalidar queries para asegurar que tenemos los datos más recientes
  //     // Solo en caso de que algo haya salido mal
  //     queryClient.invalidateQueries({ queryKey: ["tasks"] });
  //   },
  // });

  return { deleteTaskMutation };
}