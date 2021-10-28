import React from 'react';

import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { isMaxLength, isMinLength } from '@formiz/validations';
import { useHistory } from 'react-router-dom';

import { useResetPasswordFinish } from '@/app/account/account.service';
import { useSearchParams } from '@/app/router';
import {
  FieldInput,
  SlideIn,
  useToastError,
  useToastSuccess,
} from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';

export const PageResetPasswordConfirm = () => {
  const { colorModeValue } = useDarkMode();
  const { searchParams } = useSearchParams();
  const resetPasswordFinishForm = useForm();
  const history = useHistory();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const {
    mutate: resetPasswordFinish,
    isLoading: resetPasswordLoading,
  } = useResetPasswordFinish({
    onError: (error: any) => {
      const { title } = error?.response?.data || {};
      toastError({
        title: 'error reset password',
        description: title,
      });
    },
    onSuccess: () => {
      toastSuccess({
        title: 'reset password',
        description: 'success reset password',
      });
      history.push('/login');
    },
  });

  const submitResetPasswordFinish = async (values) => {
    await resetPasswordFinish({
      key: searchParams.get('key'),
      newPassword: values.password,
    });
  };

  const passwordValidations = [
    {
      rule: isMinLength(4),
      message: 'password too short', min: 4,
    },
    {
      rule: isMaxLength(50),
      message: 'password too long', max: 50,
    },
  ];

  return (
    <SlideIn>
      <Box p="2" pb="4rem" w="22rem" maxW="full" m="auto">
        <Box
          p="6"
          bg={colorModeValue('white', 'blackAlpha.400')}
          borderRadius="md"
          boxShadow="md"
        >
          <Heading size="lg" mb="4">
            {'reset password'}
          </Heading>
          <Formiz
            id="reset-password-finish-form"
            onValidSubmit={submitResetPasswordFinish}
            connect={resetPasswordFinishForm}
          >
            <form noValidate onSubmit={resetPasswordFinishForm.submit}>
              <Stack spacing="4">
                <FieldInput
                  name="password"
                  type="password"
                  label={'new password'}
                  required={'new password required'}
                  validations={passwordValidations}
                />
                <FieldInput
                  name="confirmPassword"
                  type="password"
                  label={'confirm new password'}
                  required={'confirm new password required'}
                  validations={[
                    ...passwordValidations,
                    {
                      rule: (value) =>
                        value === resetPasswordFinishForm?.values?.password,
                      message: 'new password not equal',
                      deps: [resetPasswordFinishForm?.values?.password],
                    },
                  ]}
                />
                <Flex>
                  <Button
                    type="submit"
                    variant="@primary"
                    ms="auto"
                    isLoading={resetPasswordLoading}
                  >
                    {'reset'}
                  </Button>
                </Flex>
              </Stack>
            </form>
          </Formiz>
        </Box>
      </Box>
    </SlideIn>
  );
};
