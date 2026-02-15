import { useQuery } from "@tanstack/react-query";
import { transactionsApi } from "@/api/transactions.api";
import type { GetTransactionsParams } from "@/types/transactions.types";

export const useGetTransactions = (params: GetTransactionsParams) => {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => transactionsApi.getTransactions(params),
    staleTime: 30000,
    retry: 2,
  });
};

export const useGetSingleTransaction = (
  id: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => transactionsApi.getSingleTransaction(id),
    enabled: enabled && !!id,
    staleTime: 30000,
    retry: 2,
  });
};
