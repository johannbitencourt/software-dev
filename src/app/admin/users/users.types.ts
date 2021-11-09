export type UserRole = 'DOCTOR' | 'PATIENT';

export interface User {
  id: number;
  cpf: number;
  firstName?: string;
  lastName?: string;
  activated: boolean;
  role: UserRole[];
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}

export interface UserList {
  content: User[];
  totalItems: number;
}