// transactions.api.ts
import { http } from "./index";
import type {
  GetTransactionsResponse,
  GetTransactionsParams,
  GetSingleTransactionResponse,
} from "@/types/transactions.types";

export const transactionsApi = {
  getTransactions: async (
    params: GetTransactionsParams,
  ): Promise<GetTransactionsResponse> => {
    const response = await http.get<GetTransactionsResponse>(
      "/transactions/admin/list",
      {
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          ...(params.status && { status: params.status }),
          ...(params.type && { type: params.type }),
          ...(params.startDate && { startDate: params.startDate }),
          ...(params.endDate && { endDate: params.endDate }),
          ...(params.minAmount && { minAmount: params.minAmount }),
          ...(params.maxAmount && { maxAmount: params.maxAmount }),
          ...(params.search && { search: params.search }),
        },
      },
    );
    return response.data;
  },

  getSingleTransaction: async (
    id: string,
  ): Promise<GetSingleTransactionResponse> => {
    const response = await http.get<GetSingleTransactionResponse>(
      `/transactions/admin/${id}`,
    );
    return response.data;
  },
};
