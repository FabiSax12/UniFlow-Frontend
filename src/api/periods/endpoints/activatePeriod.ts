import { academicApi } from "@/lib/api/client";

export async function activatePeriod(periodId: string | number): Promise<void> {
  const axiosResponse = await academicApi.post(`v1/periods/${periodId}/activate`);

  if (axiosResponse.status !== 200) {
    throw new Error("Failed to activate period");
  }

  return;
}