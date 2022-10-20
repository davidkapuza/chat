import {
  Avatar,
  Button,
  Heading,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import MessageInput from "./components/features/message-input/MessageInput";
import Messages from "./components/features/messages/Messages";

let counter = 0;

function Chat({ signOut }) {
console.log(`Chat renders ${++counter} times`)

  // const otherMember = useSelector(({chat}) => chat.with)
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
        {/* <Avatar
          size="md"
          name={otherMember?.displayName}
          src={otherMember?.photoURL}
        /> */}

        <Heading mr="auto !important" size="sm">
          {/* {otherMember?.displayName} */}
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
