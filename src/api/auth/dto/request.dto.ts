export interface GetPeriodsRequestDto {
  page?: number;
  limit?: number;
  type?: 'first-semester' | 'second-semester' | 'summer' | 'special';
  year?: number;
  isActive?: boolean;
}

export interface CreatePeriodRequestDto {
  name: string;
  type: 'first-semester' | 'second-semester' | 'summer' | 'special';
  year: number;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  isActive?: boolean;
}

export interface UpdatePeriodRequestDto {
  name?: string;
  type?: 'first-semester' | 'second-semester' | 'summer' | 'special';
  year?: number;
  startDate?: string; // ISO date string
  endDate?: string;   // ISO date string
  isActive?: boolean;
}