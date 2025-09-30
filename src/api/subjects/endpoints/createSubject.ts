import { academicApi } from "@/lib/api/client";
import type { CreateSubjectRequestDto } from "../dto/request.dto";
import type { CreateSubjectResponseDto } from "../dto/response.dto";
import { Subject } from "@/domain/subjects";

export async function createSubject(body: CreateSubjectRequestDto): Promise<Subject> {
  const axiosResponse = await academicApi.post<CreateSubjectResponseDto>('v1/subjects', body);

  return new Subject(
    axiosResponse.data.id,
    axiosResponse.data.name,
    axiosResponse.data.code,
    axiosResponse.data.professor,
    axiosResponse.data.credits,
    axiosResponse.data.periodId,
    new Date(axiosResponse.data.createdAt),
    new Date(axiosResponse.data.updatedAt),
  );
}