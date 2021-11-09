export type UserRole = 'DOCTOR' | 'PATIENT';

export interface User {
  id: number;
  cpf: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  activated: boolean;
  role: UserRole[];
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}

export interface Appointment {
  id: string;
  status: string;
  creationDate: string;
  lastUpdate: string;
}

export interface AppointmentList {
  content: Appointment[];
  totalItems: number;
}