import { OAuthProvider } from '@/domain/auth'

export class Student {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public readonly provider: OAuthProvider,
    public readonly providerId: string, // githubId o googleId
    public studentId?: string, // Carné del TEC (opcional hasta que lo configure)
    public avatar?: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {
    this.validateEmail(email)
    if (studentId) {
      this.validateStudentId(studentId)
    }
  }

  // Validations
  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format')
    }
  }

  private validateStudentId(studentId: string): void {
    const tecPattern = /^\d{10}$/
    if (!tecPattern.test(studentId)) {
      throw new Error('Student ID must be a 10-digit number')
    }
  }

  // Utility Functions
  updateProfile(name: string, avatar?: string): Student {
    return new Student(
      this.id,
      name,
      this.email,
      this.provider,
      this.providerId,
      this.studentId,
      avatar,
      this.createdAt,
      new Date()
    )
  }

  setStudentId(studentId: string): Student {
    this.validateStudentId(studentId)
    return new Student(
      this.id,
      this.name,
      this.email,
      this.provider,
      this.providerId,
      studentId,
      this.avatar,
      this.createdAt,
      new Date()
    )
  }

  getDisplayName(): string {
    return this.name || this.email.split('@')[0]
  }
}