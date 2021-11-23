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
  useUserList,
  useUserRemove,
  useUserUpdate,
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

const UserActions = ({ user, ...rest }) => {
  const { url } = useRouteMatch();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const { mutate: userUpdate, ...userUpdateData } = useUserUpdate({
    onSuccess: ({ activated, login }) => {
      if (activated) {
        toastSuccess({
          title: 'activate user success',
          description: `activate user success: ${login}`,
        });
      } else {
        toastSuccess({
          title: 'deactivate user success',
          description: `deactivate user success: ${login}`
        });
      }
    },
    onError: (_, __, { activated, login }) => {
      if (activated) {
        toastError({
          title: 'activate user error',
          description: `activate user error: ${login}`
          });
      } else {
        toastError({
          title:'deactivate user error',
          description: `deactivate user error: ${login}`
        });
      }
    },
  });

  const activateUser = () => userUpdate({ ...user, activated: true });
  const deactivateUser = () => userUpdate({ ...user, activated: false });
  const isActionsLoading = userUpdateData.isLoading;

  const queryClient = useQueryClient();
  const { mutate: userRemove, ...userRemoveData } = useUserRemove({
    onSuccess: (_, { login }) => {
      toastSuccess({
        title: 'delete user success',
        description: `delete user success: ${login}`
      });
      queryClient.invalidateQueries('users');
    },
    onError: (_, { login }) => {
      toastError({
        title: 'delete user error',
        description: `delete user error: ${login}`
      });
    },
  });
  const removeUser = () => userRemove(user);
  const isRemovalLoading = userRemoveData.isLoading;

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
            to={`${url}/${user.login}`}
            icon={<Icon icon={FiEdit} fontSize="lg" color="gray.400" />}
          >
            {'edit'}
          </MenuItem>
          {user.activated ? (
            <MenuItem
              onClick={deactivateUser}
              icon={<Icon icon={FiXCircle} fontSize="lg" color="gray.400" />}
            >
              {'deactivate'}
            </MenuItem>
          ) : (
            <MenuItem
              onClick={activateUser}
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

export const PageUsers = () => {
  const { colorModeValue } = useDarkMode();
  const { url } = useRouteMatch();
  const { page, setPage } = usePaginationFromUrl();
  const pageSize = 20;
  const { users, totalItems, isLoadingPage } = useUserList({
    page: page - 1,
    size: pageSize,
  });

  return (
    <Page containerSize="xl" nav={<AdminNav />}>
      <PageContent>
        <HStack mb="4">
          <Box flex="1">
            <Heading size="md">{'Consultas'}</Heading>
          </Box>
          <Box>
            <Button
              display={{ base: 'none', sm: 'flex' }}
              as={Link}
              to={`${url}/create`}
              variant="@primary"
              leftIcon={<FiPlus />}
            >
              {'Nova Consulta'}
            </Button>
            <IconButton
              display={{ base: 'flex', sm: 'none' }}
              aria-label={'Nova Consulta'}
              as={Link}
              to={`${url}/create`}
              size="sm"
              variant="@primary"
              icon={<FiPlus />}
            />
          </Box>
        </HStack>
        <DataList>
          <DataListHeader isVisible={{ base: false, md: true }}>
            <DataListCell colName="appointment_id" colWidth="2">
              {'Consulta'}
            </DataListCell>
            <DataListCell
              colName="doctor"
              colWidth="2"
              isVisible={{ base: false, lg: true }}
            >
              {'Médico'}
            </DataListCell>
            <DataListCell
              colName="patient"
              colWidth="2"
              isVisible={{ base: false, lg: true }}
            >
              {'Paciente'}
            </DataListCell>
            <DataListCell
              colName="created"
              isVisible={{ base: false, lg: true }}
            >
              {'Data Solicitação'}
            </DataListCell>
            <DataListCell
              colName="lastModified"
              isVisible={{ base: false, md: true }}
            >
              {'Data Atendimento'}
            </DataListCell>
            <DataListCell
              colName="status"
              colWidth={{ base: '2rem', md: '0.5' }}
              align="center"
            >
              <Box as="span" d={{ base: 'none', md: 'block' }}>
                {'Status'}
              </Box>
            </DataListCell>
            <DataListCell colName="actions" colWidth="4rem" align="flex-end" />
          </DataListHeader>
          {users?.map((user) => (
            <DataListRow as={LinkBox} key={user.id}>
              <DataListCell colName="appointment_id">
                <HStack maxW="100%">
                  <Avatar size="sm" name={user.firstName} mx="1" />
                  <Box minW="0">
                    <Text isTruncated maxW="full" fontWeight="bold">
                      <LinkOverlay as={Link} to={`${url}/${user.login}`}>
                        {user.appointment_id}
                      </LinkOverlay>
                    </Text>
                  </Box>
                </HStack>
              </DataListCell>
              <DataListCell colName="doctor">
                <Text isTruncated maxW="full">
                  {Object.values(user.authorities).includes('DOCTOR') ? `${user.firstName} ${user.lastName}` : user.doctor}
                </Text>
              </DataListCell>
              <DataListCell colName="patient">
                <Text isTruncated maxW="full">
                {Object.values(user.authorities).includes('PATIENT') ? `${user.firstName} ${user.lastName}` : user.patient}
                </Text>
              </DataListCell>
              <DataListCell
                colName="created"
                fontSize="sm"
                position="relative"
                pointerEvents="none"
              >
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
        </DataList>
      </PageContent>
    </Page>
  );
};
