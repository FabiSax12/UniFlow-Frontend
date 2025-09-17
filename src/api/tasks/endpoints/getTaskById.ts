import { Task, TaskPriority, TaskStatus } from "@/domain/tasks";
import { tasksApi } from "@/lib/api/client";
import type { GetTaskResponseDto } from "../dto/response.dto";

export async function getTaskById(taskId: string): Promise<Task> {
  const axiosResponse = await tasksApi.get<GetTaskResponseDto>("/v1/tasks/" + taskId)

  const taskData = axiosResponse.data

  return new Task(
    taskData.id,
    taskData.title,
    taskData.subjectId,
    new Date(taskData.dueDate),
    TaskPriority[taskData.priority],
    TaskStatus[taskData.status],
    taskData.description,
    taskData.estimatedTimeHours,
    taskData.tags,
    new Date(taskData.createdAt),
    new Date(taskData.updatedAt),
    taskData.completedAt ? new Date(taskData.completedAt) : undefined
  )
}