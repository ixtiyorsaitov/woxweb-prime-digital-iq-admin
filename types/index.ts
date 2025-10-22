export enum ROLE {
  ADMIN = "admin",
  SUPERADMIN = "superAdmin",
  USER = "user",
}

export interface PaginationType {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
export interface ChildProps {
  children: React.ReactNode;
}

export interface IError extends Error {
  response: { data: { message: string } };
}
