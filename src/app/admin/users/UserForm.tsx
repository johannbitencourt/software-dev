import React from 'react';
import { Stack } from '@chakra-ui/react';
import {
  isEmail,
  isMaxLength,
  isMinLength,
  isPattern,
} from '@formiz/validations';

import { FieldCheckboxes, FieldInput } from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';

const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
};

export const UserForm = () => {
  const { colorModeValue } = useDarkMode();
  const authorities = Object.values(AUTHORITIES).map((value) => ({ value }));
  return (
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
        label={'login'}
        required={'login obrigatório'}
        validations={[
          {
            rule: isMinLength(2),
            message: 'login muito curto min: 2',
          },
          {
            rule: isMaxLength(50),
            message:'login muito longo max: 50',
          },
          {
            rule: isPattern(
              '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'
            ),
            message: 'login inválido',
          },
        ]}
      />
      <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
        <FieldInput name="firstName" label={'nome'} />
        <FieldInput name="lastName" label={'sobrenome'} />
      </Stack>
      <FieldInput
        name="email"
        label={'email'}
        required={'email obrigatório'}
        validations={[
          {
            rule: isMinLength(5),
            message: 'email muito curto min: 5',
          },
          {
            rule: isMaxLength(254),
            message:'email muito longo max: 254',
          },
          {
            rule: isEmail(),
            message: 'email inválido',
          },
        ]}
      />
      <FieldCheckboxes
        name="authorities"
        label={'autorização'}
        options={authorities}
        required={'autorização obrigatória'}
      />
    </Stack>
  );
};
