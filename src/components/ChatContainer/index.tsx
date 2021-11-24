import { Flex, FlexProps } from '@chakra-ui/react';
import React from "react";

export const ChatContainer = (props: FlexProps) => {
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
