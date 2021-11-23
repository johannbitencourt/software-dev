import { Badge, Box } from '@chakra-ui/react';
import { FiCheck, FiX } from 'react-icons/fi';
import { Icon } from '@/components';

export const UserStatus = ({ isActivated = false, ...rest }) => {
  return isActivated ? (
    <Badge size="sm" colorScheme="success" {...rest}>
      <Box as="span" d={{ base: 'none', md: 'block' }}>
        {'consulta aberta'}
      </Box>
      <Icon
        icon={FiCheck}
        aria-label={'consulta aberta'}
        d={{ base: 'inline-flex', md: 'none' }}
      />
    </Badge>
  ) : (
    <Badge size="sm" colorScheme="warning" {...rest}>
      <Box as="span" d={{ base: 'none', md: 'block' }}>
        {'consulta encerrada'}
      </Box>
      <Icon
        icon={FiX}
        aria-label={'consulta encerrada'}
        d={{ base: 'inline-flex', md: 'none' }}
      />
    </Badge>
  );
};
