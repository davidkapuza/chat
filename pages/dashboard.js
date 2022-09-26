import {
  Button,
  Container,
  Stack,
  Flex,
  IconButton,
  Heading,
  Text,
  Icon,
  HStack,
  VStack,
  Box,
  Input,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import Loader from "../src/components/elements/loader/Loader";
import Avatar from "boring-avatars";
import { FiMessageSquare } from "react-icons/fi";
import { BsBookmarkCheck } from "react-icons/bs";
import { BiCheckDouble } from "react-icons/bi";

function Dashboard() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  console.log(user)
  const signOutHandler = () => {
    signOut(auth).then(() => {
      router.push("/login");
    });
  };
  if (loading) {
    return <Loader></Loader>;
  }
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

export default Dashboard;
