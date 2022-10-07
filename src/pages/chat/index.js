import Loader from "@/common/components/elements/loader/Loader";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  AiOutlineMore,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { BiCheckDouble } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";
import { IoBookmarkOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { RiSearchLine, RiSendPlaneFill } from "react-icons/ri";
import Chat from "./[...slug]";
const SearchUsersModal = dynamic(() =>
  import("@/common/components/modals/users-search/SearchUsersModal")
);

function Dashboard() {
  const auth = getAuth();
  const router = useRouter();
  const AuthUser = useAuthUser();
  const db = getFirestore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSmallerThanMD] = useMediaQuery("(max-width: 48em)");
  const signOutHandler = () => {
    signOut(auth);
  };

  return (
    <>
      {isOpen && <SearchUsersModal isOpen={isOpen} onClose={onClose} />}
      <Flex direction="row">
        <Stack
          // ! Navbar
          position={{ base: "fixed", md: "relative" }}
          bottom="0"
          zIndex="10"
          bg="white"
          direction={{ base: "row", md: "column" }}
          justify={{ base: "center", md: "start" }}
          align="center"
          h={{ base: "120px", md: "100vh" }}
          minW={{ base: "100%", md: "100px" }}
          pt="40px"
        >
          {isSmallerThanMD ? (
            <IconButton variant="ghost" icon={<AiOutlineUser />} />
          ) : (
            <Avatar
              name={AuthUser.displayName}
              src={AuthUser.photoURL}
              mb="8"
            />
          )}

          <IconButton
            variant="ghost"
            icon={<IoChatboxEllipsesOutline />}
          ></IconButton>
          <IconButton variant="ghost" icon={<IoBookmarkOutline />} />
        </Stack>

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
            <IconButton
              variant="ghost"
              onClick={onOpen}
              icon={<AiOutlineUsergroupAdd />}
            />
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
            // ! SidebarItem
            w="100%"
            align="center"
            p="15px 10px"
            borderRadius="2xl"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            onClick={() => router.push("/chat/id")}
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
            <Button
              variant="solidSm"
              colorScheme="main"
              onClick={signOutHandler}
            >
              Sign Out
            </Button>

            <Button
              variant="solidSm"
              colorScheme="main"
              leftIcon={<IoMdCheckmark />}
            >
              Friends
            </Button>
            <IconButton variant="ghost" icon={<AiOutlineMore />} />
          </HStack>
          <VStack
            // ! Messeges
            w="100%"
            h="100%"
            p="5"
            overflowY="scroll"
            spacing="20px"
          >
            <Chat />
          </VStack>

          <FormControl
            as="form"
            display="flex"
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
            />
          </FormControl>
        </VStack>
      </Flex>
    </>
  );
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(Dashboard);
