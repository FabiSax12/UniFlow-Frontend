import { Subject } from "@/domain/subjects";
import { academicApi } from "@/lib/api/client";
import type { GetAllSubjectsResponseDto } from "../dto/response.dto";

interface GetAllSubjectsParams {
  // periodId=<string>&professor=<string>&credits=<integer>&search=<string>
  periodId?: string;
  professor?: string;
  credits?: number;
  search?: string;
}

export async function getAllSubjects(params: GetAllSubjectsParams): Promise<Subject[]> {
  const axiosResponse = await academicApi.get<GetAllSubjectsResponseDto>('v1/subjects', { params });

  if (!axiosResponse.data.data) {
    return [];
  }

  return axiosResponse.data.data.map((subject) => new Subject(
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