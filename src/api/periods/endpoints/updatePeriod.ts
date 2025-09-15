import type { UpdatePeriodRequestDto, UpdatePeriodResponseDto } from "@/api/periods";
import { Period, PeriodType } from "@/domain/periods";
import { academicApi } from "@/lib/api/client";

export async function updatePeriod(periodId: string | number, body: UpdatePeriodRequestDto): Promise<Period | null> {
  const axiosResponse = await academicApi.put<UpdatePeriodResponseDto>(`v1/periods/${periodId}`, body);

  if (!axiosResponse.data) {
    return null;
  }

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