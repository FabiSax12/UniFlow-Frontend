import type { CreatePeriodRequestDto, CreatePeriodResponseDto } from "@/api/periods";
import { Period, PeriodType } from "@/domain/periods";
import { academicApi } from "@/lib/api/client";

export async function createPeriod(body: CreatePeriodRequestDto): Promise<Period> {
  const axiosResponse = await academicApi.post<CreatePeriodResponseDto>('v1/periods', body);

  return new Period(
    axiosResponse.data.id,
    axiosResponse.data.name,
    PeriodType[axiosResponse.data.type],
    axiosResponse.data.year,
    new Date(axiosResponse.data.startDate),
    new Date(axiosResponse.data.endDate),
    axiosResponse.data.studentId,
    axiosResponse.data.isActive,
    new Date(axiosResponse.data.createdAt),
    new Date(axiosResponse.data.updatedAt)
  );
}
