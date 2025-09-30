import { Subject } from "@/domain/subjects";
import { academicApi } from "@/lib/api/client";
import type { UpdateSubjectRequestDto } from "../dto/request.dto";

export async function updateSubject(subjectId: string, body: UpdateSubjectRequestDto): Promise<Subject | null> {
  const axiosResponse = await academicApi.put(`/subjects/${subjectId}`, body);

  const subjectData = axiosResponse.data;

  return new Subject(
    subjectData.id,
    subjectData.name,
    subjectData.code,
    subjectData.professor,
    subjectData.credits,
    subjectData.periodId,
    new Date(subjectData.createdAt),
    new Date(subjectData.updatedAt),
  );
}