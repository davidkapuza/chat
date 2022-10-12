import {
  Avatar,
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { getDatabase } from "firebase/database";
import React, { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import MessageInput from "./components/features/message-input/MessageInput";
import Messages from "./components/features/messages/Messages";

function Chat({ signOut }) {
  const chatId = useSelector((state) => state.chat.id);
  const database = getDatabase();
  const [message, setMessage] = useState("");

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

      <Messages/>
      <MessageInput/>
      
    </VStack>
  );
}

export default Chat;
