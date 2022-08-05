export type Transaction = {
  from: string;
  to: string;
  amount: number;
  transactionHash: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
