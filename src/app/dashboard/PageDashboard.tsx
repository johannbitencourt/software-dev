import React from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue
} from '@chakra-ui/react';
import { Page, PageContent } from '@/app/layout';

interface StatsCardProps {
  title: string;
  stat: string;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 2, md: 7 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
      </Flex>
    </Stat>
  );
}

export const PageDashboard = () => {
  return (
    <Page>
      <PageContent>
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 10 }}>
            <StatsCard
              title={'Casos'}
              stat={'5,000'}
            />
            <StatsCard
              title={'Mortes'}
              stat={'1,000'}
            />
            <StatsCard
              title={'Mortalidade (%)'}
              stat={`${'0,55'}%`}
            />
          </SimpleGrid>
        </Box>
      </PageContent>
    </Page>
  );
};
