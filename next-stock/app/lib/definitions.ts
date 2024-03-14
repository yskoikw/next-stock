export type Organization = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationId: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type FechedSaleTransactions = {
  id: string;
  organizationId: string;
  userId: string;
  paymentMethodId: string;
  discountAmount: number;
  taxAmount: number;
  tipAmount: number;
  subTotalAmount: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null; 
  saleItem: 
      {
          id: string;
          stockId: string;
          saleTransactionId: string;
          quantity: number;
          price: number;
          cost: number;
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date | null;
          stock: { name: string ;};
      }[];
  user: {
     firstName: string;
     lastName: string;
  };
  paymentMethod: { name: string; };
};