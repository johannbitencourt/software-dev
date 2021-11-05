import React from 'react';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  ScaleFade,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import {
  isMaxLength,
  isMinLength,
  isPattern,
} from '@formiz/validations';
import { Link as RouterLink } from 'react-router-dom';

import { useCreateAccount } from '@/app/account/account.service';
import { FieldInput, SlideIn, FieldCheckboxes, useToastError } from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';

const AUTHORITIES = {
  DOCTOR: 'Médico'
};

export const PageRegister = () => {
  const { colorModeValue } = useDarkMode();
  const form = useForm({
    subscribe: { form: true },
  });
  const toastError = useToastError();
  const authorities = Object.values(AUTHORITIES).map((value) => ({ value }));
  const { mutate: createUser, isLoading, isSuccess } = useCreateAccount({
    onError: (error: any) => {
      const { errorKey, title } = error?.response?.data || {};

      toastError({
        title: 'registration error',
        description: title,
      });

      if (errorKey === 'userexists') {
        form.invalidateFields({
          login: 'login já existe no sistema',
        });
      }
    },
  });

  if (isSuccess) {
    return (
      <Center p="4" m="auto">
        <ScaleFade initialScale={0.9} in>
          <Alert
            status="success"
            variant="solid"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="lg"
            px="8"
            py="4"
          >
            <Box fontSize="3rem">🎉</Box>
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {'Registrado com Sucesso'}
            </AlertTitle>
          </Alert>
          <Center mt="8">
            <Button
              as={RouterLink}
              to="/login"
              variant="link"
              color={colorModeValue('brand.500', 'brand.300')}
            >
              {'volte para o login'}
            </Button>
          </Center>
        </ScaleFade>
      </Center>
    );
  }

  return (
    <SlideIn>
      <Box p="2" pb="4rem" w="22rem" maxW="full" m="auto">
        <Formiz
          id="register-form"
          autoForm
          onValidSubmit={createUser}
          connect={form}
        >
          <Box
            p="6"
            bg={colorModeValue('white', 'blackAlpha.400')}
            borderRadius="md"
            boxShadow="md"
          >
            <Heading size="lg" mb="4">
              {'Sign up'}
            </Heading>
            <Stack spacing="4">
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
              <FieldInput
                name="password"
                type="password"
                label={'senha'}
                required={'senha obrigatória'}
                validations={[
                  {
                    rule: isMinLength(4),
                    message: 'senha muito curta  min: 4',
                  },
                  {
                    rule: isMaxLength(50),
                    message:'senha muito longa max: 50'
                  },
                ]}
              />
              <FieldCheckboxes
                name="authorities"
                options={authorities}
              />
              <Flex>
                <Button
                  isLoading={isLoading}
                  isDisabled={form.isSubmitted && !form.isValid}
                  type="submit"
                  variant="@primary"
                  ms="auto"
                >
                 {'Registrar'}
                </Button>
              </Flex>
            </Stack>
          </Box>
          <Center mt="8">
            <Button as={RouterLink} to="/login" variant="link">
              {'Já possui uma conta?'}{' '}
              <Box
                as="strong"
                color={colorModeValue('brand.500', 'brand.300')}
                ms="2"
              >
                {'Login'}
              </Box>
            </Button>
          </Center>
        </Formiz>
      </Box>
    </SlideIn>
  );
};
