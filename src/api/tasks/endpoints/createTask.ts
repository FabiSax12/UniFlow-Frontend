import { tasksApi } from "@/lib/api/client";
import type { CreateTaskRequestDto } from "../dto/request.dto";
import { Task, TaskPriority, TaskStatus } from "@/domain/tasks";
import type { CreateTaskResponseDto } from "../dto/response.dto";

export async function createTask(body: CreateTaskRequestDto): Promise<Task> {

  const axiosResponse = await tasksApi.post<CreateTaskResponseDto>("v1/tasks");

  const taskData = axiosResponse.data;

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