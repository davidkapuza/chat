import { VStack } from "@chakra-ui/react";
import React, { memo } from "react";
import ChatHeader from "./components/features/chat-header/ChatHeader";
import MessageInput from "./components/features/message-input/MessageInput";
import Messages from "./components/features/messages/Messages";

function Chat() {
  return (
    <VStack
      flex="1"
      p="40px 30px"
      direction="column"
      display="flex"
      position="relative"
      h="100vh"
    >
      <ChatHeader />
      <Messages />
      <MessageInput />
    </VStack>
  );
}

export default Chat;
