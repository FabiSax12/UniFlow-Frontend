import type { PaginatedResponseDto } from "@/api/shared/dtos/pagination";

export interface PeriodDto {
  id: string;
  name: string;
  type: 'first-semester' | 'second-semester' | 'summer' | 'special';
  year: number;
  startDate: string;
  endDate: string;
  studentId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type GetPeriodsResponseDto = PaginatedResponseDto<PeriodDto>;

export interface GetCurrentPeriodResponseDto {
  id: string;
  name: string;
  type: 'first-semester' | 'second-semester' | 'summer' | 'special';
  year: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface CreatePeriodResponseDto {
  id: string;
  name: string;
  type: 'first-semester' | 'second-semester' | 'summer' | 'special';
  year: number;
  startDate: string;
  endDate: string;
  studentId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetPeriodByIdResponseDto {
  id: string;
  name: string;
  type: 'first-semester' | 'second-semester' | 'summer' | 'special';
  year: number;
  startDate: string;
  endDate: string;
  studentId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePeriodResponseDto {
  id: string;
  name: string;
  type: 'first-semester' | 'second-semester' | 'summer' | 'special';
  year: number;
  startDate: string;
  endDate: string;
  studentId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Para el endpoint de subjects by period
export interface SubjectByPeriodDto {
  id: string;
  name: string;
  code: string;
  professor: string;
  credits: number;
  color: string;
}

export interface GetSubjectsByPeriodResponseDto {
  subjects: SubjectByPeriodDto[];
}