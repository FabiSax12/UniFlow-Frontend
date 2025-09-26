import { NotificationType, NotificationPriority } from '../'

export class Notification {
  constructor(
    public readonly id: string,
    public title: string,
    public message: string,
    public type: NotificationType,
    public priority: NotificationPriority,
    public readonly userId: string,
    public isRead: boolean = false,
    public actionUrl?: string,
    public readonly createdAt: Date = new Date(),
    public readAt?: Date
  ) {
    this.validateTitle(title)
    this.validateMessage(message)
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Notification title cannot be empty')
    }
  }

  private validateMessage(message: string): void {
    if (!message || message.trim().length === 0) {
      throw new Error('Notification message cannot be empty')
    }
  }

  markAsRead(): Notification {
    if (this.isRead) return this

    return new Notification(
      this.id,
      this.title,
      this.message,
      this.type,
      this.priority,
      this.userId,
      true,
      this.actionUrl,
      this.createdAt,
      new Date()
    )
  }

  markAsUnread(): Notification {
    if (!this.isRead) return this

    return new Notification(
      this.id,
      this.title,
      this.message,
      this.type,
      this.priority,
      this.userId,
      false,
      this.actionUrl,
      this.createdAt,
      undefined
    )
  }

  isRecent(hoursThreshold: number = 24): boolean {
    const hoursAgo = (new Date().getTime() - this.createdAt.getTime()) / (1000 * 60 * 60)
    return hoursAgo <= hoursThreshold
  }

  isCritical(): boolean {
    return this.priority === NotificationPriority.CRITICAL
  }

  getAgeInHours(): number {
    return (new Date().getTime() - this.createdAt.getTime()) / (1000 * 60 * 60)
  }

  getFormattedAge(): string {
    const hours = this.getAgeInHours()

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${Math.floor(hours)}h ago`

    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`

    const weeks = Math.floor(days / 7)
    return `${weeks}w ago`
  }

  getTypeDisplayName(): string {
    switch (this.type) {
      case NotificationType.TASK_DUE_SOON: return 'Task Due Soon'
      case NotificationType.TASK_OVERDUE: return 'Task Overdue'
      case NotificationType.EXAM_REMINDER: return 'Exam Reminder'
      case NotificationType.ASSIGNMENT_GRADED: return 'Assignment Graded'
      case NotificationType.PERIOD_STARTING: return 'Period Starting'
      case NotificationType.PERIOD_ENDING: return 'Period Ending'
      case NotificationType.SYSTEM_UPDATE: return 'System Update'
      default: return 'Notification'
    }
  }

  hasAction(): boolean {
    return !!this.actionUrl
  }
}