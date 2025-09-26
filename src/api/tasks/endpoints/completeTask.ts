import { tasksApi } from "@/lib/api/client";
import type { CompletedTaskResponseDto } from "../dto/response.dto";

export async function completeTask(taskId: string): Promise<CompletedTaskResponseDto> {
  const axiosResponse = await tasksApi.patch<CompletedTaskResponseDto>(`/v1/tasks/${taskId}/complete`);

  return axiosResponse.data
}