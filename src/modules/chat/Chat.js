import {
  Avatar,
  Button,
  Heading,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import MessageInput from "./components/features/message-input/MessageInput";
import Messages from "./components/features/messages/Messages";

function Chat({ signOut }) {
  return (
    <VStack
      // ! Chat
      w="100%"
      p="40px 30px"
      direction="column"
      display={{ base: "none", md: "flex" }}
      position="relative"
      h="100vh"
    >
      <HStack
        w="100%"
        spacing="4"
        // ! ChatHeader
      >
        {/* 
          // * Only on mobile
          <IconButton variant="ghost" icon={<IoIosArrowBack />} /> 
          */}
        <Avatar
          size="md"
          name="Jhon Doe"
          src="https://avatars.dicebear.com/api/open-peeps/JhonDoe.svg?background=%23E2E8F0"
        />

        <Heading mr="auto !important" size="sm">
          Jhon Doe
        </Heading>
        <Button variant="solidSm" colorScheme="main" onClick={signOut}>
          Sign Out
        </Button>

        <Button
          variant="solidSm"
          colorScheme="main"
          leftIcon={<IoMdCheckmark />}
        >
          Friends
        </Button>
        <IconButton
          variant="ghost"
          icon={<AiOutlineMore />}
          aria-label="more"
        />
      </HStack>

      <Messages />
      <MessageInput />
    </VStack>
  );
}

export default Chat;
