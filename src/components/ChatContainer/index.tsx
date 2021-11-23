import { Flex, FlexProps } from '@chakra-ui/react';
import React from "react";

export const Container = (props: FlexProps) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      minHeight="100vh"
      bg="_hoveredPurple"
      {...props}
    />
  );
};
