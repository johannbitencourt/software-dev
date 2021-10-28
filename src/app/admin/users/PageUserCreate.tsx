import React from 'react';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

import { UserForm } from '@/app/admin/users/UserForm';
import { useUserCreate } from '@/app/admin/users/users.service';
import { Page, PageContent, PageBottomBar, PageTopBar } from '@/app/layout';
import { useToastError, useToastSuccess } from '@/components';

export const PageUserCreate = () => {
  const history = useHistory();
  const form = useForm({ subscribe: false });

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
        case 'emailexists':
          form.invalidateFields({
            email: 'email já está sendo usado',
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
            <Heading size="md">{'Create User'}</Heading>
          </PageTopBar>
          <PageContent>
            <UserForm />
          </PageContent>
          <PageBottomBar>
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
          </PageBottomBar>
        </form>
      </Formiz>
    </Page>
  );
};
