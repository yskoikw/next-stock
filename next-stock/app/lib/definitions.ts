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