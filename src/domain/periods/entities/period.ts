import { PeriodType } from '../enums/period-type'

export class Period {
  constructor(
    public readonly id: string,
    public name: string,
    public type: PeriodType,
    public year: number,
    public startDate: Date,
    public endDate: Date,
    public readonly studentId: string,
    public isActive: boolean = false,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {
    this.validateName(name)
    this.validateDates(startDate, endDate)
    this.validateYear(year)
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Period name cannot be empty')
    }
  }

  private validateDates(startDate: Date, endDate: Date): void {
    if (startDate >= endDate) {
      throw new Error('End date must be after start date')
    }
  }

  private validateYear(year: number): void {
    const currentYear = new Date().getFullYear()
    if (year < 2000 || year > currentYear + 5) {
      throw new Error('Invalid academic year')
    }
  }

  updateDetails(name: string, startDate: Date, endDate: Date): Period {
    return new Period(
      this.id,
      name,
      this.type,
      this.year,
      startDate,
      endDate,
      this.studentId,
      this.isActive,
      this.createdAt,
      new Date()
    )
  }

  activate(): Period {
    return new Period(
      this.id,
      this.name,
      this.type,
      this.year,
      this.startDate,
      this.endDate,
      this.studentId,
      true,
      this.createdAt,
      new Date()
    )
  }

  deactivate(): Period {
    return new Period(
      this.id,
      this.name,
      this.type,
      this.year,
      this.startDate,
      this.endDate,
      this.studentId,
      false,
      this.createdAt,
      new Date()
    )
  }

  getDurationInWeeks(): number {
    const diffTime = this.endDate.getTime() - this.startDate.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
  }

  getCurrentWeek(): number {
    const diffTime = new Date().getTime() - this.startDate.getTime()
    const passedWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))

    return Math.min(this.getDurationInWeeks(), passedWeeks)
  }

  getDurationInDays(): number {
    const diffTime = this.endDate.getTime() - this.startDate.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  isCurrentPeriod(): boolean {
    const now = new Date()
    return now >= this.startDate && now <= this.endDate
  }

  isUpcoming(): boolean {
    return this.startDate > new Date()
  }

  isFinished(): boolean {
    return this.endDate < new Date()
  }

  getProgress(): number {
    const now = new Date()
    if (now < this.startDate) return 0
    if (now > this.endDate) return 100

    const totalDuration = this.endDate.getTime() - this.startDate.getTime()
    const elapsed = now.getTime() - this.startDate.getTime()

    return Math.round((elapsed / totalDuration) * 100)
  }

  getTimeRemaining(): string {
    const now = new Date()

    if (now > this.endDate) return 'Finished'
    if (now < this.startDate) return 'Not started'

    const diff = this.endDate.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

    if (days > 7) {
      const weeks = Math.ceil(days / 7)
      return `${weeks} week${weeks !== 1 ? 's' : ''} remaining`
    }

    return `${days} day${days !== 1 ? 's' : ''} remaining`
  }

  getDisplayName(): string {
    return `${this.name} ${this.year}`
  }

  getShortName(): string {
    switch (this.type) {
      case PeriodType.FIRST_SEMESTER:
        return `I-${this.year}`
      case PeriodType.SECOND_SEMESTER:
        return `II-${this.year}`
      case PeriodType.SUMMER:
        return `V-${this.year}`
      default:
        return `${this.year}`
    }
  }
}