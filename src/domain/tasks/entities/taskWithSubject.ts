import { Task } from './task'
import { TaskPriority } from '../enums/task-priority'
import { TaskStatus } from '../enums/task-status'

export class TaskWithSubject extends Task {
  constructor(
    id: string,
    title: string,
    dueDate: Date,
    priority: TaskPriority,
    public readonly subjectName: string,
    public readonly subjectCode: string,
    status: TaskStatus = TaskStatus.TODO,
    description?: string,
    estimatedTimeHours?: number,
    tags: string[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    completedAt?: Date
  ) {
    super(
      id,
      title,
      'unknown',
      dueDate,
      priority,
      status,
      description,
      estimatedTimeHours,
      tags,
      createdAt,
      updatedAt,
      completedAt
    )

  }

  // Override de métodos que retornan Task para que retornen TaskWithSubject
  start(): TaskWithSubject {
    const updatedTask = super.start()
    return this.createFromTask(updatedTask)
  }

  complete(): TaskWithSubject {
    const updatedTask = super.complete()
    return this.createFromTask(updatedTask)
  }

  sendToReview(): TaskWithSubject {
    const updatedTask = super.sendToReview()
    return this.createFromTask(updatedTask)
  }

  updateStatus(newStatus: TaskStatus): TaskWithSubject {
    const updatedTask = super.updateStatus(newStatus)
    return this.createFromTask(updatedTask)
  }

  updateDetails(
    title: string,
    description?: string,
    dueDate?: Date,
    priority?: TaskPriority,
    estimatedTimeHours?: number
  ): TaskWithSubject {
    const updatedTask = super.updateDetails(title, description, dueDate, priority, estimatedTimeHours)
    return this.createFromTask(updatedTask)
  }

  addTag(tag: string): TaskWithSubject {
    const updatedTask = super.addTag(tag)
    return this.createFromTask(updatedTask)
  }

  removeTag(tag: string): TaskWithSubject {
    const updatedTask = super.removeTag(tag)
    return this.createFromTask(updatedTask)
  }

  // Método helper para crear TaskWithSubject desde Task
  private createFromTask(task: Task): TaskWithSubject {
    return new TaskWithSubject(
      task.id,
      task.title,
      task.dueDate,
      task.priority,
      this.subjectName,
      this.subjectCode,
      task.status,
      task.description,
      task.estimatedTimeHours,
      task.tags,
      task.createdAt,
      task.updatedAt,
      task.completedAt
    )
  }

  // Métodos adicionales específicos para TaskWithSubject
  getFullSubjectName(): string {
    return `${this.subjectCode} - ${this.subjectName}`
  }

  getSubjectDisplayName(): string {
    return `[${this.subjectCode}] ${this.subjectName}`
  }
}