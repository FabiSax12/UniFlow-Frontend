import type { GetSubjectsByPeriodResponseDto } from "../dto/response.dto";
import { Subject } from "@/domain/subjects";
import { academicApi } from "@/lib/api/client";

export async function getPeriodSubjects(periodId: string | number): Promise<Subject[] | null> {
  const axiosResponse = await academicApi.get<GetSubjectsByPeriodResponseDto>(`/periods/${periodId}/subjects`);

  if (!axiosResponse.data) {
    return null;
  }

  return axiosResponse.data.subjects.map((subject) => new Subject(
    subject.id,
    subject.name,
    subject.code,
    subject.professor,
    subject.credits,
    subject.periodId,
    new Date(subject.createdAt),
    new Date(subject.updatedAt),
  ));
}