import { academicApi } from "@/lib/api/client";

export async function deleteSubject(subjectId: string): Promise<void> {
  const axiosResponse = await academicApi.delete<void>(`/subjects/${subjectId}`);

  if (axiosResponse.status === 409) {
    throw new Error("Cannot delete subject with associated tasks.");
  }

  return;
}