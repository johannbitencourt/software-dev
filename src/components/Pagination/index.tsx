import React, { FC, useContext } from 'react';
import {
  HStack,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';

import { Icon } from '@/components';
import { useRtl } from '@/hooks/useRtl';

export const getPaginationInfo = ({
  page = 1,
  pageSize = 10,
  totalItems = 0,
}) => {
  const firstItemOnPage = (page - 1) * pageSize + 1;
  const lastItemOnPage = Math.min(
    (page - 1) * pageSize + pageSize,
    totalItems ?? 0
  );
  const isFirstPage = firstItemOnPage <= 1;
  const isLastPage = lastItemOnPage >= totalItems;
  const firstPage = 1;
  const lastPage = Math.ceil(totalItems / pageSize);

  return {
    firstPage,
    lastPage,
    firstItemOnPage,
    lastItemOnPage,
    isFirstPage,
    isLastPage,
  };
};

export const PaginationContext = React.createContext(null);

export const PaginationButtonFirstPage: FC<
  Omit<IconButtonProps, 'aria-label'>
> = ({ ...rest }) => {
  const { rtlValue } = useRtl();
  const { setPage, firstPage, isFirstPage } = useContext(PaginationContext);
  return (
    <IconButton
      onClick={() => setPage(firstPage)}
      aria-label={'firstPage'}
      icon={
        <Icon icon={rtlValue(FiChevronsLeft, FiChevronsRight)} fontSize="lg" />
      }
      size="sm"
      isDisabled={isFirstPage}
      {...rest}
    />
  );
};

export const PaginationButtonPrevPage: FC<Omit<IconButtonProps, 'aria-label'>> =
  ({ ...rest }) => {
    const { rtlValue } = useRtl();
    const { setPage, page, isFirstPage } = useContext(PaginationContext);
    return (
      <IconButton
        onClick={() => setPage(page - 1)}
        aria-label={'prevPage'}
        icon={
          <Icon icon={rtlValue(FiChevronLeft, FiChevronRight)} fontSize="lg" />
        }
        size="sm"
        isDisabled={isFirstPage}
        {...rest}
      />
    );
  };

export const PaginationButtonLastPage: FC<Omit<IconButtonProps, 'aria-label'>> =
  ({ ...rest }) => {
    const { rtlValue } = useRtl();
    const { setPage, lastPage, isLastPage } = useContext(PaginationContext);
    return (
      <IconButton
        onClick={() => setPage(lastPage)}
        aria-label={'lastPage'}
        icon={
          <Icon
            icon={rtlValue(FiChevronsRight, FiChevronsLeft)}
            fontSize="lg"
          />
        }
        size="sm"
        isDisabled={isLastPage}
        {...rest}
      />
    );
  };

export const PaginationButtonNextPage: FC<Omit<IconButtonProps, 'aria-label'>> =
  ({ ...rest }) => {
    const { rtlValue } = useRtl();
    const { setPage, page, isLastPage } = useContext(PaginationContext);
    return (
      <IconButton
        onClick={() => setPage(page + 1)}
        aria-label={'nextPage'}
        icon={
          <Icon icon={rtlValue(FiChevronRight, FiChevronLeft)} fontSize="lg" />
        }
        size="sm"
        isDisabled={isLastPage}
        {...rest}
      />
    );
  };

export const PaginationInfo = ({ ...rest }) => {
  const { isLoadingPage } = useContext(PaginationContext);
  return (
    <HStack
      spacing="1"
      align="center"
      textAlign="center"
      justify="center"
      {...rest}
    >
      {isLoadingPage ? (
        'pagination loading'
      ) : (
        'pagination showing'
      )}
    </HStack>
  );
};

export const Pagination = ({
  setPage,
  page = 1,
  pageSize = 10,
  totalItems = 0,
  isLoadingPage = false,
  ...rest
}) => {
  const pagination = getPaginationInfo({ page, pageSize, totalItems });
  return (
    <PaginationContext.Provider
      value={{
        setPage,
        page,
        pageSize,
        totalItems,
        isLoadingPage,
        ...pagination,
      }}
    >
      <HStack w="full" {...rest} />
    </PaginationContext.Provider>
  );
};
