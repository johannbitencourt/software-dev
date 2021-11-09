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
    ['user'],
    (): Promise<Account> => Axios.get('/user'),
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

export const useUpdateAccount = (
  config: UseMutationOptions<Account, unknown, Account> = {}
) => {
  return useMutation(
    ({ firstName, lastName }): Promise<Account> => Axios.put('/user', { firstName, lastName}),
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
    (payload): Promise<void> => Axios.post('/user/change-password', payload),
    {
      ...config,
    }
  );
};
