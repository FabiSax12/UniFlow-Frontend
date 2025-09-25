import { useOptimisticMutation } from "./useOptimisticMutation";

export function useOptimisticCreate<T extends { id: string }>(
  queryKey: string[],
  createFn: (data: Omit<T, 'id'>) => Promise<T>,
  entityName: string = 'elemento'
) {
  return useOptimisticMutation<T, Omit<T, 'id'> & { tempId?: string }, T>({
    mutationKey: [...queryKey, 'create'],
    mutationFn: createFn,
    queryKey,
    optimisticUpdate: (oldData, variables) => [
      ...oldData,
      { ...variables, id: variables.tempId || 'temp-' + Date.now() } as T
    ],
    onMutateToast: () => ({
      message: `Creando ${entityName}...`,
      id: `create-${entityName}-${Date.now()}`,
    }),
    onSuccessToast: () => ({
      message: `${entityName} creado correctamente`,
      id: `create-${entityName}-${Date.now()}`,
    }),
    onErrorToast: (error) => ({
      message: `Error al crear ${entityName}`,
      description: error.message,
      id: `create-${entityName}-${Date.now()}`,
    }),
  });
}