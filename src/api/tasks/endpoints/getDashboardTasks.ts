import { tasksApi } from "@/lib/api/client";
import type { GetDashboardTasks } from "../dto/response.dto";
import { TaskWithSubject } from "@/domain/tasks/entities/taskWithSubject";
import { TaskPriority, TaskStatus } from "@/domain/tasks";

export async function getDashboardTasks(): Promise<TaskWithSubject[]> {

  const axiosResponse = await tasksApi.get<GetDashboardTasks>("/tasks/dashboard");

  let tasks: TaskWithSubject[] = []

  tasks.push(...axiosResponse.data.todayTasks.map(task => new TaskWithSubject(
    task.id,
    task.title,
    new Date(task.dueDate),
    TaskPriority[task.priority.toUpperCase() as keyof typeof TaskPriority],
    task.subjectName,
    task.subjectCode,
    TaskStatus[task.status.replace("-", "_").toUpperCase() as keyof typeof TaskStatus]
  )))

  tasks.push(...axiosResponse.data.upcomingTasks.map(task => new TaskWithSubject(
    task.id,
    task.title,
    new Date(task.dueDate),
    TaskPriority[task.priority.toUpperCase() as keyof typeof TaskPriority],
    task.subjectName,
    task.subjectCode,
    TaskStatus[task.status.replace("-", "_").toUpperCase() as keyof typeof TaskStatus]
  )))

  return tasks;
}