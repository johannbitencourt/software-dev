import React from 'react';

import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { isMaxLength, isMinLength } from '@formiz/validations';

import { AccountNav } from '@/app/account/AccountNav';
import { useUpdatePassword } from '@/app/account/account.service';
import { Page, PageContent } from '@/app/layout';
import { FieldInput, useToastError, useToastSuccess } from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';

export const PagePassword = () => {
  const { colorModeValue } = useDarkMode();
  const changePasswordForm = useForm();

  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const {
    mutate: changePasswordFinish,
    isLoading: changePasswordLoading,
  } = useUpdatePassword({
    onError: (error: any) => {
      const { title } = error?.response?.data || {};
      if (title === 'Incorrect password') {
        changePasswordForm.invalidateFields({
          currentPassword: 'password incorrect',
        });
        return;
      }
      toastError({
        title: 'password update error',
        description: title,
      });
    },
    onSuccess: () => {
      toastSuccess({
        title: 'password update success',
      });
      changePasswordForm.reset();
    },
  });

  const submitUpdatePassword = async (values) => {
    const { currentPassword, newPassword } = values;

    await changePasswordFinish({ currentPassword, newPassword });
  };

  const passwordValidations = [
    {
      rule: isMinLength(4),
      message: 'account:data.password.too short min: 4'
    },
    {
      rule: isMaxLength(50),
      message: 'password too long max: 50'
    },
  ];

  return (
    <Page nav={<AccountNav />}>
      <PageContent>
        <Heading size="md" mb="4">
          {'Senha'}
        </Heading>
        <Formiz
          id="password-form"
          onValidSubmit={submitUpdatePassword}
          connect={changePasswordForm}
        >
          <form noValidate onSubmit={changePasswordForm.submit}>
            <Stack
              direction="column"
              bg={colorModeValue('white', 'blackAlpha.400')}
              p="6"
              borderRadius="lg"
              spacing="6"
              shadow="md"
            >
              <FieldInput
                name="currentPassword"
                type="password"
                label={'senha atual'}
                required={'senha atual obrigatória'}
                validations={passwordValidations}
              />
              <FieldInput
                name="newPassword"
                type="password"
                label={'nova senha'}
                required={'nova senha obrigatória'}
                validations={passwordValidations}
              />
              <FieldInput
                name="confirmNewPassword"
                type="password"
                label={'confirmar nova senha'}
                required={'confirmar a nova senha é obrigatório'}
                validations={[
                  ...passwordValidations,
                  {
                    rule: (value) =>
                      value === changePasswordForm?.values?.newPassword,
                    message: 'nova senha não é igual a ',
                    deps: [changePasswordForm?.values?.newPassword],
                  },
                ]}
              />
              <Flex>
                <Button
                  type="submit"
                  variant="@primary"
                  ms="auto"
                  isLoading={changePasswordLoading}
                >
                  {'Mudar Senha'}
                </Button>
              </Flex>
            </Stack>
          </form>
        </Formiz>
      </PageContent>
    </Page>
  );
};
