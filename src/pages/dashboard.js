import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Avatar from "boring-avatars";
import { signOut } from "firebase/auth";
import React from "react";
import { BiCheckDouble } from "react-icons/bi";
import { BsBookmarkCheck } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import  {useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import Loader from "@/common/components/elements/loader/Loader";
import { getAuth } from "firebase/auth";

function Dashboard() {
  const auth = getAuth()
  const AuthUser = useAuthUser()

  const signOutHandler = () => {
    signOut(auth)
  };

  return (
    <>
      <Container h="100vh" maxW={"7xl"}>
        <Flex direction={["column", "row"]}>
          {/* Navbar */}
          <Flex
            direction="column"
            borderStart="1px solid"
            borderEnd="1px solid "
            borderColor="inherit"
            align="center"
            h="100vh"
            w="70px"
            pt="40px"
          >
            <Avatar
              size={40}
              name="Maria Mitchell"
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
            <IconButton
              mt="20px"
              variant="ghost"
              icon={<FiMessageSquare />}
            ></IconButton>
            <IconButton variant="ghost" icon={<BsBookmarkCheck />}></IconButton>
          </Flex>
          {/* Sidebar */}
          <Stack
            direction="column"
            borderEnd="1px solid"
            borderColor="inherit"
            align="center"
            h="100vh"
            w="300px"
            pt="40px"
          >
            <Box p="0 15px 15px" w="100%">
              <Input placeholder="Search anything..."></Input>
            </Box>
            {/* ChatItem */}
            <Flex
              w="100%"
              align="center"
              p="15px 15px"
              _hover={{ bg: "gray.100", cursor: "pointer" }}
            >
              <Avatar
                size={40}
                name="Jhon Doe"
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <Box ml="15px">
                <Heading size="sm">Jhon Doe</Heading>
                <Text fontSize="small">Some text from jhonny</Text>
              </Box>
              <Icon ml="auto" color="green.300" as={BiCheckDouble}></Icon>
            </Flex>
            <Flex
              w="100%"
              align="center"
              p="15px 15px"
              _hover={{ bg: "gray.100", cursor: "pointer" }}
            >
              <Avatar
                size={40}
                name="Jane Smith"
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <Box ml="15px">
                <Heading size="sm">Jane Smith</Heading>
                <Text fontSize="small">Some text from jane...</Text>
              </Box>
              <Icon ml="auto" color="green.300" as={BiCheckDouble}></Icon>
            </Flex>
          </Stack>
          <Button onClick={signOutHandler}>Sign Out</Button>
        </Flex>
      </Container>
    </>
  );
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(Dashboard)


