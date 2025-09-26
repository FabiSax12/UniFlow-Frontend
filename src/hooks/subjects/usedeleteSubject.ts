
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteSubject } from "@/api/subjects/endpoints/deleteSubject"

export function useDeleteSubject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (subjectId: string) => deleteSubject(subjectId),
    onSuccess: () => {
      // Invalida cache para refrescar lista de materias
      queryClient.invalidateQueries({ queryKey: ["subjects"] })
    },
    onError: (error: unknown) => {
      console.error("Error al eliminar el curso:", error)
    },
  })
}
