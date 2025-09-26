import { createPeriod } from "@/api/periods/endpoints/createPeriod";
import type { CreatePeriodRequestDto } from "@/api/periods/dto/request.dto";
import { Period } from "@/domain/periods";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePeriod() {
  const qc = useQueryClient();

  return useMutation<Period, Error, CreatePeriodRequestDto>({
    mutationKey: ["periods"],
    mutationFn: (data: CreatePeriodRequestDto) => createPeriod(data),
    onSuccess(data) {
      qc.setQueryData<Period[]>(["periods"], (oldData = []) => [...oldData, data])
    },
  });
}