import { Subject } from "@/domain/subjects";
import { academicApi } from "@/lib/api/client";
import type { GetSubjectByIdResponseDto } from "../dto/response.dto";

export async function getSubjectById(subjectId: string): Promise<Subject | null> {
  const axiosResponse = await academicApi.get<GetSubjectByIdResponseDto>(`/subjects/${subjectId}`);

  const subjectData = axiosResponse.data;

  return new Subject(
    subjectData.id,
    subjectData.name,
    subjectData.code,
    // subjectData.professor,
    subjectData.credits,
    subjectData.periodId,
    new Date(subjectData.createdAt),
    new Date(subjectData.updatedAt),
  )
}