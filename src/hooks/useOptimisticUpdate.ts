import { useOptimisticMutation } from "./useOptimisticMutation";

export function useOptimisticUpdate<T extends { id: string }>(
  queryKey: string[],
  updateFn: (data: Partial<T> & { id: string }) => Promise<T>,
  entityName: string = 'elemento'
) {
  return useOptimisticMutation<T, Partial<T> & { id: string }, T>({
    mutationKey: [...queryKey, 'update'],
    mutationFn: updateFn,
    queryKey,
    optimisticUpdate: (oldData, variables) =>
      oldData.map(item =>
        item.id === variables.id
          ? { ...item, ...variables } as T
          : item
      ),
    onMutateToast: (variables) => ({
      message: `Actualizando ${entityName}...`,
      id: `update-${entityName}-${variables.id}`,
    }),
    onSuccessToast: (_, variables) => ({
      message: `${entityName} actualizado correctamente`,
      id: `update-${entityName}-${variables.id}`,
    }),
    onErrorToast: (error, variables) => ({
      message: `Error al actualizar ${entityName}`,
      description: error.message,
      id: `update-${entityName}-${variables.id}`,
    }),
  });
}