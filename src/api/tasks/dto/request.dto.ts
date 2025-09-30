import type { TaskPriority, TaskStatus } from "@/domain/tasks"

export interface CreateTaskRequestDto {
  title: string
  subjectId: string
  dueDate: string
  priority: keyof typeof TaskPriority
  // type: string
  status: keyof typeof TaskStatus
  description?: string
  estimatedTimeHours?: number
  tags: string[]
}

export interface UpdateTaskRequestDto { }
