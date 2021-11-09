import Axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { useAuthContext } from '@/app/auth/AuthContext';

export const useLogin = (
  config: UseMutationOptions<
    any,
    unknown,
    { cpf: string; password: string }
  > = {}
) => {
  const { updateToken } = useAuthContext();
  return useMutation(
    ({ cpf, password }) =>
      Axios.post('/authenticate', { cpf, password }),
    {
      ...config,
      onSuccess: (data, ...rest) => {
        updateToken(data.token);
        if (config.onSuccess) {
          config.onSuccess(data, ...rest);
        }
      },
    }
  );
};

