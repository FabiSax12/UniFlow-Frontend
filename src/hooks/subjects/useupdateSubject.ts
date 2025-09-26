
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSubject } from "@/api/subjects/endpoints/updateSubject"
import type { Subject } from "@/domain/subjects"

export function useUpdateSubject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ subjectId, payload }: { subjectId: string; payload: Partial<Subject> }) =>
      updateSubject(subjectId, payload),
    onSuccess: () => {
      // Invalida las queries de subjects para refrescar la UI
      queryClient.invalidateQueries({ queryKey: ["subjects"] })
    },
    onError: (error: unknown) => {
      console.error("Error al editar el curso:", error)
    },
  })
}
