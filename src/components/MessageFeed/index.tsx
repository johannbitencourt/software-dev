import { Box } from '@chakra-ui/react';
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { MessageBox } from '@/components/MessageBox';


const MessageFeed: React.FC<any> = ({
  me,
  messages = ['dasdasdasd', 'bcvbncvnvcnm', 'vbnbvnbvnbvn', '4823904823904'],
}) => {
  return (
    
      <Box p={6}>
        {messages?.map((message: any, key) => (
          <MessageBox
            message={message}
            isMine={me?.me?.user?.username === message.sender}
            isUnsent={false}
            key={key}
          />
        ))}
      </Box>
    
  );
};

export default MessageFeed;
