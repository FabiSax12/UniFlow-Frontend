export interface GetSubjectResponseDto {
  id: string;
  name: string;
  code: string;
  professor: string;
  credits: number;
  periodId: string;
  createdAt: string;
  updatedAt: string;
};

export interface GetAllSubjectsResponseDto {
  data: GetSubjectResponseDto[];
}

export interface CreateSubjectResponseDto {
  id: string;
  name: string;
  code: string;
  professor: string;
  credits: number;
  periodId: string;
  createdAt: string;
  updatedAt: string;
};

export interface GetSubjectByIdResponseDto {
  id: string;
  name: string;
  code: string;
  professor: string;
  credits: number;
  periodId: string;
  createdAt: string;
  updatedAt: string;
};