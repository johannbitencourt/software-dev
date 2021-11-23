import React from 'react';

import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

import {
  isPattern,
} from '@formiz/validations';

import { FieldCheckboxes, FieldInput } from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';

import { useUserCreate } from '@/app/admin/users/users.service';
import { Page, PageContent, PageTopBar } from '@/app/layout';
import { useToastError, useToastSuccess } from '@/components';

export const PageUserCreate = () => {
  const history = useHistory();
  const form = useForm({ subscribe: false });
  const { colorModeValue } = useDarkMode();

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: createUser, isLoading: createUserLoading } = useUserCreate({
    onError: (error: AxiosError) => {
      const { title, errorKey } = error.response.data;
      toastError({
        title:'Erro ao atualizar usuário',
        description: title,
      });
      switch (errorKey) {
        case 'userexists':
          form.invalidateFields({
            login: 'login já está sendo usado',
          });
          break;
      }
    },
    onSuccess: () => {
      toastSuccess({
        title: 'Atualizado com sucesso!',
      });
      history.push('/admin/users');
    },
  });

  const submitCreateUser = async (values) => {
    const newUser = {
      ...values,
    };
    await createUser(newUser);
  };

  return (
    <Page containerSize="md" isFocusMode>
      <Formiz
        id="create-user-form"
        onValidSubmit={submitCreateUser}
        connect={form}
      >
        <form noValidate onSubmit={form.submit}>
          <PageTopBar showBack onBack={() => history.goBack()}>
            <Heading size="md">{'Nova Consulta'}</Heading>
          </PageTopBar>
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
                  isLoading={createUserLoading}
                >
                  {'Salvar'}
                </Button>
              </ButtonGroup>
            </Stack>
          </PageContent>
        </form>
      </Formiz>
    </Page>
  );
};
