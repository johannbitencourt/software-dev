import { Box } from '@chakra-ui/react';
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { MessageBox } from '@/components/MessageBox';
import misc from '../styles/misc.module.css';



const MessageFeed: React.FC<any> = ({
  unsentMessages,
  me,
  messages,
}) => {
  return (
    <ScrollableFeed className={misc.hideScroll}>
      <Box p={6}>
        {messages?.map((message: any, key) => (
          <MessageBox
            message={message}
            isMine={me?.me?.user?.username === message.sender}
            isUnsent={false}
            key={key}
          />
        ))}
        {unsentMessages?.map((message: any, key) => (
          <MessageBox
            message={message}
            isMine={me?.me?.user?.username === message.sender}
            isUnsent={true}
            key={key}
          />
        ))}
      </Box>
    </ScrollableFeed>
  );
};

export default MessageFeed;
