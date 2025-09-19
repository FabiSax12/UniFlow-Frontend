import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface OptimisticMutationOptions<TData, TVariables, TQueryData, TContext> {
  mutationKey: string[];
  mutationFn: (variables: TVariables) => Promise<TData>;
  queryKey: string[];

  // Funciones optimistas
  optimisticUpdate: (oldData: TQueryData[], variables: TVariables) => TQueryData[];
  onMutateToast?: (variables: TVariables) => { message: string; id: string };
  onSuccessToast?: (data: TData, variables: TVariables) => { message: string; id: string };
  onErrorToast?: (error: Error, variables: TVariables) => { message: string; description?: string; id: string };
}

export function useOptimisticMutation<TData, TVariables, TQueryData, TContext = unknown>({
  mutationKey,
  mutationFn,
  queryKey,
  optimisticUpdate,
  onMutateToast,
  onSuccessToast,
  onErrorToast,
}: OptimisticMutationOptions<TData, TVariables, TQueryData, TContext>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey,
    mutationFn,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<TQueryData[]>(queryKey);

      queryClient.setQueryData<TQueryData[]>(queryKey, (oldData = []) =>
        optimisticUpdate(oldData, variables)
      );

      if (onMutateToast) {
        const { message, id } = onMutateToast(variables);
        toast.loading(message, { id });
      }

      return { previousData };
    },

    onSuccess: (data, variables) => {
      if (onSuccessToast) {
        const { message, id } = onSuccessToast(data, variables);
        toast.success(message, { id });
      }
    },

    onError: (error, variables, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData<TQueryData[]>(queryKey, context.previousData);
      }

      if (onErrorToast) {
        const { message, description, id } = onErrorToast(
          error instanceof Error ? error : new Error('Unknown error'),
          variables
        );
        toast.error(message, { id, description });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}