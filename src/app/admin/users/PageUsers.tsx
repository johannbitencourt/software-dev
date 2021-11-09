import React from 'react';

import {
  Code,
  Badge,
  Wrap,
  WrapItem,
  HStack,
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Heading,
  Portal,
  Button,
  IconButton,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import {
  FiEdit,
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
  FiPlus,
} from 'react-icons/fi';
import { useQueryClient } from 'react-query';
import { Link, useRouteMatch } from 'react-router-dom';

import { UserStatus } from '@/app/admin/users/UserStatus';
import {
  useAppointmentList,
  useAppointmentRemove,
  useAppointmentUpdate,
} from '@/app/admin/users/users.service';
import { Page, PageContent } from '@/app/layout';
import { usePaginationFromUrl } from '@/app/router';
import {
  ActionsButton,
  ConfirmMenuItem,
  DataList,
  DataListCell,
  DataListHeader,
  DataListFooter,
  DataListRow,
  DateAgo,
  Icon,
  useToastError,
  useToastSuccess,
  PaginationButtonFirstPage,
  Pagination,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
} from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';

import { AdminNav } from '../AdminNav';

const AppointmentActions = ({ appointment, ...rest }) => {
  const { url } = useRouteMatch();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const { mutate: appointmentUpdate, ...appointmentUpdateData } = useAppointmentUpdate({
    onSuccess: ({ status, id }) => {
      if (status) {
        toastSuccess({
          title: 'activate user success',
          description: `activate user success: ${id}`,
        });
      } else {
        toastSuccess({
          title: 'deactivate user success',
          description: `deactivate user success: ${id}`
        });
      }
    },
    onError: (_, __, { status, id }) => {
      if (status) {
        toastError({
          title: 'activate user error',
          description: `activate user error: ${id}`
          });
      } else {
        toastError({
          title:'deactivate user error',
          description: `deactivate user error: ${id}`
        });
      }
    },
  });

  const activateAppointment = () => appointmentUpdate({ ...appointment, activated: true });
  const deactivateAppointment = () => appointmentUpdate({ ...appointment, activated: false });
  const isActionsLoading = appointmentUpdateData.isLoading;

  const queryClient = useQueryClient();
  const { mutate: appointmentRemove, ...appointmentRemoveData } = useAppointmentRemove({
    onSuccess: (_, { cpf }) => {
      toastSuccess({
        title: 'delete user success',
        description: `delete user success: ${cpf}`
      });
      queryClient.invalidateQueries('users');
    },
    onError: (_, { cpf }) => {
      toastError({
        title: 'delete user error',
        description: `delete user error: ${cpf}`
      });
    },
  });
  const removeUser = () => appointmentRemove(appointment);
  const isRemovalLoading = appointmentRemoveData.isLoading;

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton
        as={ActionsButton}
        isLoading={isActionsLoading || isRemovalLoading}
      />
      <Portal>
        <MenuList>
          <MenuItem
            as={Link}
            to={`${url}/${appointment.id}`}
            icon={<Icon icon={FiEdit} fontSize="lg" color="gray.400" />}
          >
            {'edit'}
          </MenuItem>
          {appointment.activated ? (
            <MenuItem
              onClick={deactivateAppointment}
              icon={<Icon icon={FiXCircle} fontSize="lg" color="gray.400" />}
            >
              {'deactivate'}
            </MenuItem>
          ) : (
            <MenuItem
              onClick={activateAppointment}
              icon={
                <Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />
              }
            >
              {'activate'}
            </MenuItem>
          )}
          <MenuDivider />
          <ConfirmMenuItem
            icon={<Icon icon={FiTrash2} fontSize="lg" color="gray.400" />}
            onClick={removeUser}
          >
            {'delete'}
          </ConfirmMenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const PageAppointments = () => {
  const { colorModeValue } = useDarkMode();
  const { page, setPage } = usePaginationFromUrl();
  const pageSize = 20;
  /* const { appointment, totalItems, isLoadingPage } = useAppointmentList({
    page: page - 1,
    size: pageSize,
  }); */

  return (
    <Page containerSize="xl" nav={<AdminNav />}>
      <PageContent>
        <HStack mb="4">
          <Box flex="1">
            <Heading size="md">{'Lista de Consulta'}</Heading>
          </Box>
          <Box>
            <Button
              display={{ base: 'none', sm: 'flex' }}
              as={Link}
              to={`appointment/start`}
              variant="@primary"
              leftIcon={<FiPlus />}
            >
              {'Nova Consulta'}
            </Button>
            <IconButton
              display={{ base: 'flex', sm: 'none' }}
              aria-label={'Nova Consulta'}
              as={Link}
              to={`appointment/start`}
              size="sm"
              variant="@primary"
              icon={<FiPlus />}
            />
          </Box>
        </HStack>
        {/* <DataList>
          <DataListHeader isVisible={{ base: false, md: true }}>
            <DataListCell colName="login" colWidth="2">
              {'CPF'}
            </DataListCell>
            <DataListCell
              colName="id"
              colWidth="4rem"
              isVisible={{ base: false, lg: true }}
            >
              {'id'}
            </DataListCell>
            <DataListCell
              colName="authorities"
              isVisible={{ base: false, lg: true }}
            >
              {'authorities'}
            </DataListCell>
            <DataListCell
              colName="created"
              isVisible={{ base: false, lg: true }}
            >
              {'createdBy'}
            </DataListCell>
            <DataListCell
              colName="lastModified"
              isVisible={{ base: false, md: true }}
            >
              {'modifiedBy'}
            </DataListCell>
            <DataListCell
              colName="status"
              colWidth={{ base: '2rem', md: '0.5' }}
              align="center"
            >
              <Box as="span" d={{ base: 'none', md: 'block' }}>
                {'status'}
              </Box>
            </DataListCell>
            <DataListCell colName="actions" colWidth="4rem" align="flex-end" />
          </DataListHeader>
          {users?.map((user) => (
            <DataListRow as={LinkBox} key={user.id}>
              <DataListCell colName="login">
                <HStack maxW="100%">
                  <Avatar size="sm" name={user.firstName} mx="1" />
                  <Box minW="0">
                    <Text isTruncated maxW="full" fontWeight="bold">
                      <LinkOverlay as={Link} to={`${url}/${user.login}`}>
                        {user.login}
                      </LinkOverlay>
                    </Text>
                  </Box>
                </HStack>
              </DataListCell>
              <DataListCell colName="id">
                <Text isTruncated maxW="full" as={Code} fontSize="xs">
                  {user.id}
                </Text>
              </DataListCell>
              <DataListCell colName="authorities">
                <Wrap>
                  {user.authorities?.map((authority) => (
                    <WrapItem key={authority}>
                      <Badge size="sm">{authority}</Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </DataListCell>
              <DataListCell
                colName="created"
                fontSize="sm"
                position="relative"
                pointerEvents="none"
              >
                <Text isTruncated maxW="full">
                  {user.createdBy}
                </Text>
                {!!user.createdDate && (
                  <Text
                    isTruncated
                    maxW="full"
                    color={colorModeValue('gray.600', 'gray.300')}
                    pointerEvents="auto"
                  >
                    <DateAgo date={user.createdDate} />
                  </Text>
                )}
              </DataListCell>
              <DataListCell
                colName="lastModified"
                fontSize="sm"
                position="relative"
                pointerEvents="none"
              >
                <Text isTruncated maxW="full">
                  {user.lastModifiedBy}
                </Text>
                {!!user.lastModifiedDate && (
                  <Text
                    isTruncated
                    maxW="full"
                    color={colorModeValue('gray.600', 'gray.300')}
                    pointerEvents="auto"
                  >
                    <DateAgo position="relative" date={user.lastModifiedDate} />
                  </Text>
                )}
              </DataListCell>
              <DataListCell colName="status">
                <UserStatus isActivated={user.activated} />
              </DataListCell>
              <DataListCell colName="actions">
                <UserActions user={user} />
              </DataListCell>
            </DataListRow>
          ))}
          <DataListFooter>
            <Pagination
              isLoadingPage={isLoadingPage}
              setPage={setPage}
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
            >
              <PaginationButtonFirstPage />
              <PaginationButtonPrevPage />
              <PaginationInfo flex="1" />
              <PaginationButtonNextPage />
              <PaginationButtonLastPage />
            </Pagination>
          </DataListFooter>
        </DataList> */}
      </PageContent>
    </Page>
  );
};
