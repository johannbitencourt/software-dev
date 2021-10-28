import React from 'react';

import { Button, Stack, Center, Heading, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { useDarkMode } from '@/hooks/useDarkMode';

export const Error403 = () => {
  const { colorModeValue } = useDarkMode();
  const history = useHistory();
  return (
    <Center flex="1" p="8">
      <Stack align="center" textAlign="center">
        <Heading>{'error 403'}</Heading>
        <Text color={colorModeValue('gray.600', 'gray.400')}>
          {'no permission'}
        </Text>
        <Button onClick={() => history.goBack()}>
          {'go back'}
        </Button>
      </Stack>
    </Center>
  );
};
