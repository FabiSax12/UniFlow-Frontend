export interface CreateSubjectRequestDto {
  name: string;
  code: string;
  professor?: string;
  credits: number;
  periodId: string;
}

export interface UpdateSubjectRequestDto {
  name?: string;
  code?: string;
  professor?: string;
  credits?: number;
  periodId?: string;
}