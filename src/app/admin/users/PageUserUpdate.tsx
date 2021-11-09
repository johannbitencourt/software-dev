import React from 'react';

import {
  Text,
  Box,
  Heading,
  HStack,
  Stack,
  Button,
  ButtonGroup,
  SkeletonText,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { AxiosError } from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useUser, useUserUpdate } from '@/app/admin/users/users.service';
import {
  Page,
  PageContent,
  PageTopBar,
  Loader,
} from '@/app/layout';

import {
  isPattern,
} from '@formiz/validations';

import { useToastError, useToastSuccess, FieldInput } from '@/components';
import { Error404 } from '@/errors';
import { useDarkMode } from '@/hooks/useDarkMode';

import { UserStatus } from './UserStatus';

export const PageUserUpdate = () => {
  const { colorModeValue } = useDarkMode();
  const { login } = useParams();
  const history = useHistory();
  const {
    user,
    isLoading: userIsLoading,
    isFetching: userIsFetching,
    isError: userIsError,
  } = useUser(login, { refetchOnWindowFocus: false });

  const form = useForm({ subscribe: false });
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const { mutate: editUser, isLoading: editUserIsLoading } = useUserUpdate({
    onError: (error: AxiosError) => {
      const { title, errorKey } = error.response.data;
      toastError({
        title: 'update error',
        description: title,
      });
      switch (errorKey) {
        case 'userexists':
          form.invalidateFields({
            login: 'login already used',
          });
          break;
      }
    },
    onSuccess: () => {
      toastSuccess({
        title: 'update success',
      });
      history.goBack();
    },
  });
  const submitEditUser = (values) => {
    const userToSend = {
      id: user?.id,
      ...values,
    };
    editUser(userToSend);
  };

  return (
    <Page containerSize="md" isFocusMode>
      <PageTopBar showBack onBack={() => history.goBack()}>
        <HStack spacing="4">
          <Box flex="1">
            {userIsLoading || userIsError ? (
              <SkeletonText maxW="6rem" noOfLines={2} />
            ) : (
              <Stack spacing="0">
                <Heading size="sm">{user?.cpf}</Heading>
                <Text
                  fontSize="xs"
                  color={colorModeValue('gray.600', 'gray.300')}
                >
                  {'id'}: {user?.id}
                </Text>
              </Stack>
            )}
          </Box>
          {!!user && (
            <Box>
              <UserStatus isActivated={user?.activated} />
            </Box>
          )}
        </HStack>
      </PageTopBar>
      {userIsFetching && <Loader />}
      {userIsError && !userIsFetching && <Error404 />}
      {!userIsError && !userIsFetching && (
        <Formiz
          id="create-user-form"
          onValidSubmit={submitEditUser}
          connect={form}
          initialValues={user}
        >
          <form noValidate onSubmit={form.submit}>
            <PageContent>
              <Stack
                direction="column"
                bg={colorModeValue('white', 'gray.900')}
                p="6"
                borderRadius="lg"
                spacing="6"
                shadow="md"
              >
                <FieldInput
                  name="login"
                  label={'usuário (CPF)'}
                  mask={'***.***.***-**'}
                  required={'usuário obrigatório'}
                  validations={[
                    {
                      rule: isPattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})'),
                      message: 'apenas números são permitidos',
                    },
                  ]}
                />
                <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                  <FieldInput name="firstName" label={'nome'} />
                  <FieldInput name="lastName" label={'sobrenome'} />
                </Stack>
                <ButtonGroup justifyContent="space-between">
                  <Button onClick={() => history.goBack()}>
                    {'Cancelar'}
                  </Button>
                  <Button
                    type="submit"
                    variant="@primary"
                    isLoading={editUserIsLoading}
                  >
                    {'Salvar'}
                  </Button>
                </ButtonGroup>
              </Stack>
            </PageContent>
          </form>
        </Formiz>
      )}
    </Page>
  );
};
