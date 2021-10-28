import React, { useEffect } from 'react';
import { Box, HStack, Spinner, Text } from '@chakra-ui/react';
import { useActivateAccount } from '@/app/account/account.service';
import { useSearchParams } from '@/app/router';

export const PageActivate = () => {
  const {
    mutate: activateAccount,
    isError,
    isSuccess,
    isLoading,
  } = useActivateAccount();
  const { searchParams } = useSearchParams();

  useEffect(() => {
    activateAccount({ key: searchParams.get('key') });
  }, [activateAccount, searchParams]);

  return (
    <Box p="4" maxW="20rem" m="auto">
      {isLoading && (
        <HStack>
          <Spinner size="sm" me="2" />
          <Text>{'loaging'}</Text>
        </HStack>
      )}
      {isSuccess && 'activation success'}
      {isError && 'activation error'}
    </Box>
  );
};
