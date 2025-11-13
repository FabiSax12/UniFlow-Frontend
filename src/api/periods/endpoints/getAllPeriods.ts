import type { GetPeriodsResponseDto, GetPeriodResponseDto } from "@/api/periods";
import type { PaginationRequestDto } from "@/api/shared";
import { Period, PeriodType } from "@/domain/periods";
import { academicApi } from "@/lib/api/client";

interface GetAllPeriodsParams {
  pagination?: PaginationRequestDto;
  filters?: Partial<GetPeriodResponseDto>;
}

export async function getAllPeriods(params: GetAllPeriodsParams): Promise<Period[]> {
  const axiosResponse = await academicApi.get<GetPeriodsResponseDto>('/periods', { params });

  return axiosResponse.data.data.map(period => new Period(
    period.id,
    period.name,
    PeriodType[period.type],
    period.year,
    new Date(period.startDate),
    new Date(period.endDate),
    period.studentId,
    period.isActive,
    new Date(period.createdAt),
    new Date(period.updatedAt)
  ));
}