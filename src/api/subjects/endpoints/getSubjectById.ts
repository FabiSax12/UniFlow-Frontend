import { Subject } from "@/domain/subjects";
import { academicApi } from "@/lib/api/client";
import type { GetSubjectByIdResponseDto } from "../dto/response.dto";

export async function getSubjectById(subjectId: string): Promise<Subject | null> {
  
  const axiosResponse = await academicApi.get<GetSubjectByIdResponseDto>(`/v1/subjects/${subjectId}`);

  const subjectData = axiosResponse.data;

  return new Subject(
    subjectData.id,
    subjectData.name,
    subjectData.code,
    subjectData.credits,
    subjectData.periodId,
    new Date(subjectData.createdAt),
    new Date(subjectData.updatedAt),
  )
}