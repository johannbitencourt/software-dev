import React from 'react';

import { Flex, Button, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useQueryClient } from 'react-query';

import { AccountNav } from '@/app/account/AccountNav';
import { useAccount, useUpdateAccount } from '@/app/account/account.service';
import { Page, PageContent } from '@/app/layout';
import {
  FieldInput,
  useToastSuccess,
  useToastError,
} from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';

export const PageProfile = () => {
  const { colorModeValue } = useDarkMode();
  const { account } = useAccount();
  const generalInformationForm = useForm();
  const queryClient = useQueryClient();

  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const { mutate: updateAccount, isLoading: updateLoading } = useUpdateAccount({
    onError: (error: any) => {
      const { title } = error?.response?.data || {};
      toastError({
        title: 'update profile error',
        description: title,
      });
    },
    onSuccess: () => {
      toastSuccess({
        title: 'update success',
      });
      queryClient.invalidateQueries('account');
    },
  });

  const submitGeneralInformation = async (values) => {
    const newAccount = {
      ...account,
      ...values,
    };

    await updateAccount(newAccount);
  };

  return (
    <Page nav={<AccountNav />}>
      <PageContent>
        <Heading size="md" mb="4">
          {'Perfil'}
        </Heading>
        {account && (
          <Formiz
            id="account-form"
            onValidSubmit={submitGeneralInformation}
            connect={generalInformationForm}
            initialValues={account}
          >
            <form noValidate onSubmit={generalInformationForm.submit}>
              <Stack
                direction="column"
                bg={colorModeValue('white', 'blackAlpha.400')}
                p="6"
                borderRadius="lg"
                spacing="6"
                shadow="md"
              >
                <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                  <FieldInput
                    name="firstName"
                    label={'nome'}
                    required={'nome obrigatório'}
                  />
                  <FieldInput
                    name="lastName"
                    label={'sobrenome'}
                    required={'sobrenome obrigatório'}
                  />
                </Stack>
                <FieldInput
                  name="email"
                  label={'email'}
                  required={'email obrigatório'}
                  validations={[
                    {
                      rule: isEmail(),
                      message: 'email inválido',
                    },
                  ]}
                />
                <Flex>
                  <Button
                    type="submit"
                    variant="@primary"
                    ms="auto"
                    isLoading={updateLoading}
                  >
                    {'Salvar'}
                  </Button>
                </Flex>
              </Stack>
            </form>
          </Formiz>
        )}
      </PageContent>
    </Page>
  );
};
