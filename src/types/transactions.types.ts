/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "./users.types";

export interface TransactionMetadata {
  id?: number;
  log?: any;
  fees?: number;
  plan?: any;
  split?: any;
  amount?: number;
  domain?: string;
  paidAt?: string;
  source?: any;
  status?: string;
  channel?: string;
  message?: string | null;
  paid_at?: string;
  currency?: string;
  customer?: any;
  metadata?: {
    type?: string;
    userId?: string;
    meterId?: string;
    kgPurchased?: string;
    gasPricePerKg?: string;
  };
  order_id?: string | null;
  reference?: string;
  created_at?: string;
  fees_split?: any;
  ip_address?: string;
  subaccount?: any;
  authorization?: {
    bin?: string;
    bank?: string;
    brand?: string;
    last4?: string;
    channel?: string;
    exp_year?: string;
    reusable?: boolean;
    card_type?: string;
    exp_month?: string;
    signature?: string;
    account_name?: string | null;
    country_code?: string;
    receiver_bank?: string | null;
    authorization_code?: string;
    receiver_bank_account_number?: string | null;
  };
  fees_breakdown?: any;
  gateway_response?: string;
  requested_amount?: number;
  pos_transaction_data?: any;
  meterId?: string;
  kgPurchased?: string;
  gasPricePerKg?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  walletId: string | null;
  amount: string;
  type: "GAS_PURCHASE_ONLINE" | "WALLET_TOPUP" | "WALLET_DEBIT";
  status: "SUCCESS" | "PENDING" | "FAILED";
  reference: string;
  provider: string;
  description: string;
  metadata: TransactionMetadata | null;
  createdAt: string;
  updatedAt: string;
  userName?: string;
}

export interface TransactionWithUser extends Transaction {
  user?: User;
}

export interface TransactionStats {
  totalRevenue: number;
  processedLast24hrs: number;
  totalTransactions: number;
  percentageIncreasePastMonth: number;
  averageTransactionTimeSeconds: number;
  totalFailedTransactions: number;
}

export interface TransactionPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetTransactionsResponse {
  status: string;
  message: string;
  data: {
    stats: TransactionStats;
    transactions: Transaction[];
    pagination: TransactionPagination;
  };
}

export interface GetTransactionsParams {
  page?: number;
  limit?: number;
  status?: "SUCCESS" | "PENDING" | "FAILED";
  type?: "GAS_PURCHASE_ONLINE" | "WALLET_TOPUP" | "WALLET_DEBIT";
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
}

export interface GetSingleTransactionResponse {
  status: string;
  message: string;
  data: TransactionWithUser;
}

export type TransactionStatusType = "success" | "pending" | "failed";

export interface TransactionTableRow {
  id: string;
  timestamp: string;
  user: string;
  type: string;
  amount: string;
  gasUnit: string;
  status: TransactionStatusType;
  reference: string;
}
