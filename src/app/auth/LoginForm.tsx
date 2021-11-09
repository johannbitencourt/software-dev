import React from 'react';

import { isPattern } from '@formiz/validations';

import {
  Box,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';

import { useLogin } from '@/app/auth/auth.service';
import { FieldInput, useToastError } from '@/components';


export const LoginForm = ({ onSuccess = () => undefined, ...rest }) => {
  const form = useForm({ subscribe: 'form' });
  const toastError = useToastError();

  const { mutate: login, isLoading } = useLogin({
    onSuccess,
    onError: (error: any) => {
      toastError({
        title: 'Não foi possível logar usando essa conta',
        description: error?.response?.data?.title,
      });
    },
  });

  return (
    <Box {...rest}>
      <Formiz id="login-form" autoForm onValidSubmit={login} connect={form}>
        <Stack spacing="4">
          <FieldInput
            name="cpf"
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
          <FieldInput
            name="password"
            type="password"
            label={'senha'}
            required={'senha obrigatória'}
          />
          <Flex>
            <Button
              isLoading={isLoading}
              isDisabled={form.isSubmitted && !form.isValid}
              type="submit"
              variant="@primary"
              ms="auto"
            >
              {'Entrar'}
            </Button>
          </Flex>
        </Stack>
      </Formiz>
    </Box>
  );
};
