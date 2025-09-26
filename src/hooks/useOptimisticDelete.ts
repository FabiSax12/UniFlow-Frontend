import { useOptimisticMutation } from "./useOptimisticMutation";

export function useOptimisticDelete<T extends { id: string }>(
  queryKey: string[],
  deleteFn: (id: string) => Promise<void>,
  entityName: string = 'elemento'
) {
  return useOptimisticMutation<void, string, T>({
    mutationKey: [...queryKey, 'delete'],
    mutationFn: deleteFn,
    queryKey,
    optimisticUpdate: (oldData, id) => oldData.filter(item => item.id !== id),
    onMutateToast: (id) => ({
      message: `Eliminando ${entityName}...`,
      id: `delete-${entityName}-${id}`,
    }),
    onSuccessToast: (_, id) => ({
      message: `${entityName} eliminado correctamente`,
      id: `delete-${entityName}-${id}`,
    }),
    onErrorToast: (error, id) => ({
      message: `Error al eliminar ${entityName}`,
      description: error.message,
      id: `delete-${entityName}-${id}`,
    }),
  });
}