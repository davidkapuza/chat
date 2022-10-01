import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  Avatar,
  HStack,
  InputGroup,
  useMediaQuery,
  InputLeftElement,
  Container,
  VStack,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { BiCheckDouble } from "react-icons/bi";
import {
  AiOutlineUsergroupAdd,
  AiOutlineMore,
  AiOutlineUser,
} from "react-icons/ai";
import { IoChatboxEllipsesOutline, IoBookmarkOutline } from "react-icons/io5";
import { IoIosArrowBack, IoMdCheckmark } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import Loader from "@/common/components/elements/loader/Loader";
import { getAuth } from "firebase/auth";

function Chat() {
  const auth = getAuth();
  const AuthUser = useAuthUser();
  const [isSmallerThanMD] = useMediaQuery("(max-width: 48em)");

  const signOutHandler = () => {
    signOut(auth);
  };

  return (
    <Stack direction="row">
      <Flex
        // ! Navbar
        position={{ base: "fixed", md: "relative" }}
        bottom="0"
        zIndex="10"
        bg="white"
        direction={{ base: "row", md: "column" }}
        justify={{ base: "center", md: "start" }}
        align="center"
        h={{ base: "120px", md: "100vh" }}
        w={{ base: "100%", md: "100px" }}
        pt="40px"
      >
        {isSmallerThanMD ? (
          <IconButton variant="ghost" icon={<AiOutlineUser />} />
        ) : (
          <Avatar name={AuthUser.displayName} src={AuthUser.photoURL} />
        )}

        <IconButton
          variant="ghost"
          icon={<IoChatboxEllipsesOutline />}
        ></IconButton>
        <IconButton variant="ghost" icon={<IoBookmarkOutline />} />
      </Flex>

      <Stack
        // ! Sidebar
        direction="column"
        borderEnd="1px solid"
        borderColor="inherit"
        h="100vh"
        w={{ base: "100%", md: "500px" }}
        p="40px 15px"
        overflowY="scroll"
      >
        <HStack
        // ! SidebarHeader
        >
          <Heading size="lg" mr="auto">
            Chat
          </Heading>
          <IconButton variant="ghost" icon={<AiOutlineUsergroupAdd />} />
          <IconButton variant="ghost" icon={<AiOutlineMore />} />
        </HStack>
        <Box w="100%">
          <InputGroup m="25px 0">
            <InputLeftElement>
              <RiSearchLine />
            </InputLeftElement>
            <Input type="text" variant="filled" placeholder="Search..." />
          </InputGroup>
        </Box>
        <Flex
          // ! ChatItem
          w="100%"
          align="center"
          p="15px 10px"
          borderRadius="2xl"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
        >
          <Avatar
            name="Jhon Doe"
            src="https://avatars.dicebear.com/api/open-peeps/JhonDoe.svg?background=%23E2E8F0"
          />
          <Box ml="15px">
            <Heading size="sm">Jhon Doe</Heading>
            <Text fontSize="small">Some text from jhonny</Text>
          </Box>
          <Icon ml="auto" color="green.300" as={BiCheckDouble}></Icon>
        </Flex>
      </Stack>
      <VStack
        // ! Chat
        w="100%"
        pt="40px"
        direction="column"
        display={{ base: "none", md: "flex" }}
      >
        <HStack
          w="100%"
          // ! ChatHeader
        >
          <IconButton variant="ghost" icon={<IoIosArrowBack />} />
          <Avatar
            mr="auto !important"
            name="Jhon Doe"
            src="https://avatars.dicebear.com/api/open-peeps/JhonDoe.svg?background=%23E2E8F0"
          />

          <Button onClick={signOutHandler}>Sign Out</Button>

          <Button variant="solid" leftIcon={<IoMdCheckmark />}>
            Friends
          </Button>
          <IconButton variant="ghost" icon={<AiOutlineMore />} />
        </HStack>
        <VStack
          // ! Messeges
          w="100%"
          p="40px 40px"
          overflowY="scroll"
        >
          <Flex
            // ! Messege
            direction="row"
            alignSelf="flex-start" maxW="300px">
            <Avatar
              mr="15px"
              name="Jhon Doe"
              src="https://avatars.dicebear.com/api/open-peeps/JhonDoe.svg?background=%23E2E8F0"
            />
            <Box>
              <Text fontSize="small">Jhon Doe</Text>
              <Text
                fontSize="small"
                borderRadius="0 20px 20px 20px"
                bg="#E6F5FE"
                p="4"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Box>
          </Flex>
          <Flex
            // ! MyMessege
            direction="row-reverse"
            alignSelf="flex-end" maxW="300px">
            <Avatar
              ml="15px"
              name={AuthUser.displayName}
              src={AuthUser.photoURL}
            />
            <Box>
              <Text fontSize="small" textAlign="right">{AuthUser.displayName}</Text>
              <Text
                fontSize="small"
                borderRadius="20px 0 20px 20px"
                bg="gray.100"
                p="4"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Box>
          </Flex>
        </VStack>
      </VStack>
    </Stack>
  );
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(Chat);
