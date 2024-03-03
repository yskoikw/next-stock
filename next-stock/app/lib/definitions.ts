export type Organization = {
  id: string;
  name: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deletedAt: Date | null;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};