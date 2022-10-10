import {
  Avatar,
  Button,
  Flex, FormControl, Heading,
  HStack, Icon, IconButton, Input, Text, VStack
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";

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
      <VStack
        // ! Messeges
        w="100%"
        h="100%"
        p="5"
        overflowY="scroll"
        spacing="20px"
      >
        <Flex
          // ! Messege
          direction="row"
          alignSelf="flex-start"
          maxW="400px"
        >
          <Avatar
            size="sm"
            mt="auto"
            name="Jhon Doe"
            src="https://avatars.dicebear.com/api/open-peeps/JhonDoe.svg?background=%23E2E8F0"
          />
          <Text
            fontSize="small"
            borderRadius="20px 20px 20px 0"
            bg="#E6F5FE"
            p="4"
            mx="3"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Flex>
        <Flex
          // ! MyMessege
          direction="row-reverse"
          alignSelf="flex-end"
          maxW="400px"
        >
          <Avatar
            size="sm"
            mt="auto"
            name="Jhon Doe"
            src="https://avatars.dicebear.com/api/open-peeps/JhonDoe.svg?background=%23E2E8F0"
          />

          <Text
            fontSize="small"
            border="1px solid"
            borderColor="inherit"
            borderRadius="20px 20px 0 20px"
            p="4"
            mx="3"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Flex>
      </VStack>

      <FormControl
        as="form"
        display="flex"
        // @ts-ignore
        direction="row"
        position="absolute"
        bottom="0"
        alignItems="center"
        p="20px 30px 40px"
        bg="white"
      >
        <Input type="text" placeholder="Type a messege..." />
        <IconButton
          ml="5"
          variant="solid"
          colorScheme="brand"
          icon={<Icon color="white" as={RiSendPlaneFill} />}
          aria-label="send message"
        />
      </FormControl>
    </VStack>
  );
}

export default Chat;
