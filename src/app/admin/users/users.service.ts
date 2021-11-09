import Axios from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';

import { User, UserList } from '@/app/admin/users/users.types';

export const useUserList = (
  { page = 0, size = 10 } = {},
  config: UseQueryOptions<UserList> = {}
) => {
  const result = useQuery(
    ['users', { page, size }],
    (): Promise<UserList> =>
      Axios.get('/users', { params: { page, size, sort: 'id,desc' } }),
    {
      keepPreviousData: true,
      ...config,
    }
  );

  const { content: users, totalItems } = result.data || {};
  const totalPages = Math.ceil(totalItems / size);
  const hasMore = page + 1 < totalPages;
  const isLoadingPage = result.isFetching;

  return {
    users,
    totalItems,
    hasMore,
    totalPages,
    isLoadingPage,
    ...result,
  };
};

export const useUser = (
  userLogin: string,
  config: UseQueryOptions<User> = {}
) => {
  const result = useQuery(
    ['user', userLogin],
    (): Promise<User> => Axios.get(`/users/${userLogin}`),
    {
      ...config,
    }
  );

  return {
    user: result.data,
    ...result,
  };
};

export const useUserUpdate = (
  config: UseMutationOptions<User, unknown, User> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.put('/users', payload), {
    ...config,
    onSuccess: (data, payload, ...rest) => {
      queryClient.cancelQueries('users');
      queryClient
        .getQueryCache()
        .findAll('users')
        .forEach(({ queryKey }) => {
          queryClient.setQueryData(queryKey, (cachedData: UserList) => {
            if (!cachedData) return;
            return {
              ...cachedData,
              content: (cachedData.content || []).map((user) =>
                user.id === data.id ? data : user
              ),
            };
          });
        });
      queryClient.invalidateQueries('users');
      queryClient.invalidateQueries(['user', payload.cpf]);
      if (config.onSuccess) {
        config.onSuccess(data, payload, ...rest);
      }
    },
  });
};

export const useUserCreate = (
  config: UseMutationOptions<
    User,
    unknown,
    Pick<
      User,
      'cpf' | 'firstName' | 'lastName' | 'role'
    >
  > = {}
) => {
  return useMutation({
      ...config,
    }
  );
};

type UserWithLoginOnly = Pick<User, 'cpf'>;

export const useUserRemove = (
  config: UseMutationOptions<void, unknown, UserWithLoginOnly> = {}
) => {
  return useMutation(
    (user: UserWithLoginOnly): Promise<void> =>
      Axios.delete(`/users/${user.cpf}`),
    { ...config }
  );
};
