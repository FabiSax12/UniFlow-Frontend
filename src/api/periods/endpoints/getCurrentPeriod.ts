import type { GetCurrentPeriodResponseDto } from "@/api/periods";
import { academicApi } from "@/lib/api/client";
// import { Period, PeriodType } from "@/domain/periods";

export async function getCurrentPeriod(): Promise<GetCurrentPeriodResponseDto> {
  const axiosResponse = await academicApi.get<GetCurrentPeriodResponseDto>('v1/periods/current');

  return axiosResponse.data;

  // return new Period(
  //   axiosResponse.data.id,
  //   axiosResponse.data.name,
  //   PeriodType[axiosResponse.data.type],
  //   axiosResponse.data.year,
  //   new Date(axiosResponse.data.startDate),
  //   new Date(axiosResponse.data.endDate),
  //   axiosResponse.data.studentId,
  //   axiosResponse.data.isActive,
  //   new Date(axiosResponse.data.createdAt),
  //   new Date(axiosResponse.data.updatedAt)
  // );
}