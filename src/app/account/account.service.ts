import Axios from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';

import { Account } from '@/app/account/account.types';

export const useAccount = (config: UseQueryOptions<Account> = {}) => {
  const { data: account, ...rest } = useQuery(
    ['account'],
    (): Promise<Account> => Axios.get('/account'),
    {
      onSuccess: (data) => {
        if (config?.onSuccess) {
          config?.onSuccess(data);
        }
      },
      ...config,
    }
  );
  //const isAdmin = !!account?.role?.includes('DOCTOR');
  return { account, ...rest };
};

export const useCreateAccount = (
  config: UseMutationOptions<
    Account,
    unknown,
    Pick<Account, 'cpf' | 'role'> & { password: string }
  > = {}
) => {
  return useMutation(
    ({
      cpf,
      password,
      role
    }): Promise<Account> =>
      Axios.post('/register', { cpf, password, role: role === null ? 'PATIENT' : 'DOCTOR' }),
    {
      ...config,
    }
  );
};

export const useActivateAccount = (
  config: UseMutationOptions<void, unknown, { key: string }> = {}
) => {
  return useMutation(
    ({ key }): Promise<void> => Axios.get(`/activate?key=${key}`),
    {
      ...config,
    }
  );
};

export const useUpdateAccount = (
  config: UseMutationOptions<Account, unknown, Account> = {}
) => {
  return useMutation(
    (account): Promise<Account> => Axios.post('/account', account),
    {
      onMutate: (data) => {
        if (config?.onMutate) {
          config.onMutate(data);
        }
      },
      ...config,
    }
  );
};

export const useUpdatePassword = (
  config: UseMutationOptions<
    void,
    unknown,
    { currentPassword: string; newPassword: string }
  > = {}
) => {
  return useMutation(
    (payload): Promise<void> => Axios.post('/account/change-password', payload),
    {
      ...config,
    }
  );
};
