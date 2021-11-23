import dayjs from 'dayjs';
import { name, date, finance } from 'faker';
import { br } from 'faker-br'
import { Factory } from 'miragejs';

type Authority = 'DOCTOR' | 'PATIENT';

export const UserFactory = Factory.extend({
  patient: (): string => `${name.firstName()} ${name.lastName()}`,
  doctor: (): string => `${name.firstName()} ${name.lastName()}`,
  appointment_id: (): string => finance.account(),
  login: (): string => br.cpf(),
  firstName: (): string => name.firstName(),
  lastName: (): string => name.lastName(),
  createdBy: (): string => name.firstName(),
  createdDate: () => dayjs(date.past()).format(),
  lastModifiedBy: (): string => name.firstName(),
  lastModifiedDate: () => dayjs(date.past()).format(),
  activated: (): boolean => true,
  authorities: (): Authority[] => ['PATIENT', 'DOCTOR'],
});
