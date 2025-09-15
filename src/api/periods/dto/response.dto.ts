import type { PaginatedResponseDto } from "@/api/shared/dtos/pagination";
import type { PeriodType } from "@/domain/periods";

export interface GetPeriodResponseDto {
  id: string;
  name: string;
  type: keyof typeof PeriodType;
  year: number;
  startDate: string;
  endDate: string;
  studentId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type GetPeriodsResponseDto = PaginatedResponseDto<GetPeriodResponseDto>;

export interface GetCurrentPeriodResponseDto {
  id: string;
  name: string;
  type: keyof typeof PeriodType;
  year: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface CreatePeriodResponseDto {
  id: string;
  name: string;
  type: keyof typeof PeriodType;
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
  type: keyof typeof PeriodType;
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
  type: keyof typeof PeriodType;
  year: number;
  startDate: string;
  endDate: string;
  studentId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Para el endpoint de subjects by period
export interface SubjectByPeriodResponseDto {
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