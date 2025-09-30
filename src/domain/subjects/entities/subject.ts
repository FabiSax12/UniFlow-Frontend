export class Subject {
  constructor(
    public readonly id: string,
    public name: string,
    public code: string,
    public professor: string,
    public credits: number,
    public readonly periodId: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {
    this.validateCode(code)
    this.validateCredits(credits)
    this.validateName(name)
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Subject name cannot be empty')
    }
  }

  private validateCode(code: string): void {
    if (!code || code.trim().length === 0) {
      throw new Error('Subject code cannot be empty')
    }
    // Validación para formato del TEC (ej: IC-6821)
    const tecCodePattern = /^[A-Z]{2,4}-\d{4}$/
    if (!tecCodePattern.test(code.toUpperCase())) {
      throw new Error('Subject code must follow TEC format (e.g., IC-6821)')
    }
  }

  private validateCredits(credits: number): void {
    if (credits < 0 || credits > 6) {
      throw new Error('Credits must be between 0 and 6')
    }
  }

  updateDetails(
    name: string,
    professor?: string,
  ): Subject {
    return new Subject(
      this.id,
      name,
      this.code,
      professor || this.professor,
      this.credits,
      this.periodId,
      this.createdAt,
      new Date()
    )
  }

  getFormattedCode(): string {
    return this.code.toUpperCase()
  }

  getFullName(): string {
    return `${this.getFormattedCode()} - ${this.name}`
  }
}