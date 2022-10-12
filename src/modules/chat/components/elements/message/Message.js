import React from "react";
import { Flex, Avatar, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Message({ message }) {
  const user = useSelector((state) => state.user);
  const { text, sender, timestamp } = message;
  const isMine = sender.uid === user.uid
  return (
    <Flex
      direction={isMine ? "row-reverse" : "row"}
      alignSelf={isMine ? "flex-end" : "flex-start"}
      maxW="400px"
    >
      <Avatar
        size="sm"
        mt={isMine ? 0 : "auto"}
        name={sender.displayName}
        src={sender.photoURL}
      />
      <Text
        fontSize="small"
        borderRadius={isMine ? "20px 0 20px 20px" : "20px 20px 20px 0"}
        border={isMine ? "1px solid" : "none"}
        borderColor={isMine ? "inherit" : "none"}
        bg={isMine ? "none" : "main.Solitude"}
        p="4"
        mx="3"
      >
        {text}
      </Text>
    </Flex>
    
  );
}

export default Message;
