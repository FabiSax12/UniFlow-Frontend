import { tasksApi } from "@/lib/api/client";

export async function deleteTaskById(taskId: string): Promise<void> {

  const axiosResponse = await tasksApi.delete("/v1/tasks/" + taskId);

  if (axiosResponse.status === 409) {
    throw new Error("Cannot delete completed task")
  }

  return;
}