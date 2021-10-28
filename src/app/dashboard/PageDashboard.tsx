import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Heading
} from '@chakra-ui/react';
import { Page, PageContent } from '@/app/layout';

export const PageDashboard = () => {
  return (
    <Page>
      <PageContent>
        <Heading size="md" mb="4">
          {'Dashboard'}
        </Heading>
        <Alert status="success" colorScheme="brand" borderRadius="md">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle fontSize="lg">
              {'welcome'}
            </AlertTitle>
            <AlertDescription display="block">
              {'welcome description'}
              <br />
            </AlertDescription>
          </Box>
        </Alert>
      </PageContent>
    </Page>
  );
};
