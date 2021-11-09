import Axios from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';

import { Appointment, AppointmentList, User } from '@/app/admin/users/users.types';

export const useAppointmentList = (
  { page = 0, size = 10 } = {},
  config: UseQueryOptions<AppointmentList> = {}
) => {
  const result = useQuery(
    ['appointment/list', { page, size }],
    (): Promise<AppointmentList> =>
      Axios.get('/appointment/list', { params: { page, size, sort: 'id,desc' } }),
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

export const useAppointment = (
  appointmentId: string,
  config: UseQueryOptions<Appointment> = {}
) => {
  const result = useQuery(
    ['appointment', appointmentId],
    (): Promise<Appointment> => Axios.get(`/appointment/${appointmentId}`),
    {
      ...config,
    }
  );

  return {
    appointment: result.data,
    ...result,
  };
};

export const useAppointmentUpdate = (
  config: UseMutationOptions<Appointment, unknown, Appointment> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.put('/appointment', payload), {
    ...config,
    onSuccess: (data, payload, ...rest) => {
      queryClient.cancelQueries('appointment');
      queryClient
        .getQueryCache()
        .findAll('appointment')
        .forEach(({ queryKey }) => {
          queryClient.setQueryData(queryKey, (cachedData: AppointmentList) => {
            if (!cachedData) return;
            return {
              ...cachedData,
              content: (cachedData.content || []).map((appointment) =>
              appointment.id === data.id ? data : appointment
              ),
            };
          });
        });
      queryClient.invalidateQueries('appointment');
      //queryClient.invalidateQueries(['user', payload.cpf]);
      if (config.onSuccess) {
        config.onSuccess(data, payload, ...rest);
      }
    },
  });
};

export const useAppointmentCreate = (
  config: UseMutationOptions<
  Appointment,
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

export const useAppointmentRemove = (
  config: UseMutationOptions<void, unknown, UserWithLoginOnly> = {}
) => {
  return useMutation(
    (user: UserWithLoginOnly): Promise<void> =>
      Axios.delete(`/user/${user.cpf}`),
    { ...config }
  );
};
