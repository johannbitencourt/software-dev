import React from 'react';

import {
  Alert,
  AlertDescription,
  Box,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { Link as RouterLink } from 'react-router-dom';

import { useLogin } from '@/app/auth/auth.service';
import { FieldInput, useToastError } from '@/components';


export const LoginForm = ({ onSuccess = () => undefined, ...rest }) => {
  const form = useForm({ subscribe: 'form' });
  const toastError = useToastError();

  const { mutate: login, isLoading } = useLogin({
    onSuccess,
    onError: (error: any) => {
      toastError({
        title: 'title',
        description: error?.response?.data?.title,
      });
    },
  });

  return (
    <Box {...rest}>
      <Formiz id="login-form" autoForm onValidSubmit={login} connect={form}>
        <Stack spacing="4">
          <FieldInput
            name="username"
            label={'usuário'}
            required={'usuário obrigatório'}
          />
          <FieldInput
            name="password"
            type="password"
            label={'senha'}
            required={'senha obrigatória'}
          />
          <Flex>
            <Button
              as={RouterLink}
              to="/account/reset"
              size="sm"
              variant="link"
              whiteSpace="initial"
            >
              {'Esqueceu a senha?'}
            </Button>
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
