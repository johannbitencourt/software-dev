import dayjs from 'dayjs';
import { internet, name, date } from 'faker';
import { Factory } from 'miragejs';

type Authority = 'DOCTOR' | 'PATIENT';

export const UserFactory = Factory.extend({
  login: (): string => internet.userName(),
  firstName: (): string => name.firstName(),
  lastName: (): string => name.lastName(),
  createdBy: (): string => name.firstName(),
  createdDate: () => dayjs(date.past()).format(),
  lastModifiedBy: (): string => name.firstName(),
  lastModifiedDate: () => dayjs(date.past()).format(),
  activated: (): boolean => true,
  authorities: (): Authority[] => ['PATIENT', 'DOCTOR'],
});
