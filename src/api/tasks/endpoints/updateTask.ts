import { Task, TaskPriority, TaskStatus } from "@/domain/tasks";
import type { UpdateTaskRequestDto } from "../dto/request.dto";
import { tasksApi } from "@/lib/api/client";
import { type GetTaskResponseDto } from "../dto/response.dto";

export async function updateTask(taskId: string, body: UpdateTaskRequestDto): Promise<Task> {

  const axiosResponse = await tasksApi.put<GetTaskResponseDto>("/tasks/" + taskId, body)

  const taskData = axiosResponse.data

  return new Task(
    taskData.id,
    taskData.title,
    taskData.subjectId,
    new Date(taskData.dueDate),
    TaskPriority[taskData.priority.toUpperCase() as keyof typeof TaskPriority],
    TaskStatus[taskData.status.replace("-", "_").toUpperCase() as keyof typeof TaskStatus],
    taskData.description,
    taskData.estimatedTimeHours,
    taskData.tags,
    new Date(taskData.createdAt),
    new Date(taskData.updatedAt),
    taskData.completedAt ? new Date(taskData.completedAt) : undefined
  )
}