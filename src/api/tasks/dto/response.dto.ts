import type { PaginatedResponseDto } from "@/api/shared"
import type { TaskPriority, TaskStatus, TaskType } from "@/domain/tasks"

export interface GetTaskResponseDto {
  id: string
  title: string
  subjectId: string
  dueDate: string
  priority: keyof typeof TaskPriority
  type: string
  status: keyof typeof TaskStatus
  description: string
  estimatedTimeHours: number
  tags: string[]
  createdAt: string
  updatedAt: string
  completedAt: string | null
}

export type GetAllTasksResponseDto = PaginatedResponseDto<GetTaskResponseDto>

export interface CreateTaskResponseDto {
  id: string,
  title: string,
  subjectId: string,
  dueDate: string,
  priority: keyof typeof TaskPriority,
  type: keyof typeof TaskType,
  status: keyof typeof TaskStatus,
  description: string,
  estimatedTimeHours: number,
  tags: string[],
  createdAt: string,
  updatedAt: string,
  completedAt: string | null
}

export interface GetDashboardTasks {
  upcomingTasks: UpcomingTask[]
  todayTasks: UpcomingTask[]
  overdueCount: number
  totalPending: number
  completedThisWeek: number
}

export interface UpcomingTask {
  id: string
  title: string
  subjectName: string
  subjectCode: string
  subjectColor: string
  dueDate: string
  priority: keyof typeof TaskPriority
  status: keyof typeof TaskStatus
  type: string
}

export type GetTasksBySubjectResponseDto = {
  subjectId: string
  count: number
  tasks: GetTaskResponseDto[]
}
export type GetTasksByPeriodResponseDto = {
  count: number,
  periodId: string,
  tasks: GetTaskResponseDto[]
}

export interface CompletedTaskResponseDto {
  id: string
  status: string
  completedAt: string
  updatedAt: string
  message: string
}

export interface UpdateTaskStateResponseDto {
  id: string
  status: string
  updatedAt: string
  message: string
}
