export type UserRole = 'DOCTOR' | 'PATIENT';

export interface User {
  id: number;
  login: number;
  firstName?: string;
  lastName?: string;
  activated: boolean;
  authorities: UserRole[];
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  appointment_id?: string;
  doctor?: string;
  patient?: string;
}

export interface UserList {
  content: User[];
  totalItems: number;
}