import React, { useState } from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  ScaleFade,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

import { useResetPasswordInit } from '@/app/account/account.service';
import { FieldInput, SlideIn, useToastError } from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useRtl } from '@/hooks/useRtl';

export const PageResetPasswordRequest = () => {
  const { rtlValue } = useRtl();
  const { colorModeValue } = useDarkMode();
  const resetPasswordInitForm = useForm();

  const toastError = useToastError();

  const [accountEmail, setAccountEmail] = useState('');

  const {
    mutate: resetPasswordInit,
    isLoading: resetPasswordLoading,
    isSuccess: resetPasswordSuccess,
  } = useResetPasswordInit({
    onMutate: () => {
      setAccountEmail(resetPasswordInitForm.values?.email);
    },
    onError: (error: any) => {
      const { title } = error?.response?.data || {};
      toastError({
        title: 'reset password error',
        description: title,
      });
    },
  });

  const submitResetPasswordInit = async (values) => {
    await resetPasswordInit(values.email);
  };

  if (resetPasswordSuccess) {
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
            maxW="xl"
          >
            <Box fontSize="3rem">✉️</Box>
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {'reset password success'}
            </AlertTitle>
          </Alert>
          <Center mt="8">
            <Button
              as={RouterLink}
              to="/login"
              variant="link"
              color={colorModeValue('brand.500', 'brand.300')}
            >
              {'go to login'}
            </Button>
          </Center>
        </ScaleFade>
      </Center>
    );
  }

  return (
    <SlideIn>
      <Box p="2" pb="4rem" w="22rem" maxW="full" m="auto">
        <Box
          p="6"
          bg={colorModeValue('white', 'blackAlpha.400')}
          borderRadius="md"
          boxShadow="md"
        >
          <Heading size="lg">{'Resetar Senha'}</Heading>
          <Formiz
            id="reset-password-init-form"
            onValidSubmit={submitResetPasswordInit}
            connect={resetPasswordInitForm}
          >
            <form noValidate onSubmit={resetPasswordInitForm.submit}>
              <FieldInput
                name="email"
                label={'email'}
                my="6"
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
                  leftIcon={rtlValue(<FiArrowLeft />, <FiArrowRight />)}
                  as={RouterLink}
                  to="/login"
                  variant="link"
                >
                  {'Login'}
                </Button>
                <Button
                  type="submit"
                  variant="@primary"
                  ms="auto"
                  isLoading={resetPasswordLoading}
                >
                  {'Enviar'}
                </Button>
              </Flex>
            </form>
          </Formiz>
        </Box>
      </Box>
    </SlideIn>
  );
};
