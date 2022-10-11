import formateDate from "@/utils/formateDate";
import Loader from "@/components/elements/loader/Loader";
import {
  Avatar,
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  collection,
  endAt,
  getFirestore,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiOutlineMore, AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@/components/elements/alert/Alert";

function Sidebar({ onOpen, loadMessages }) {
  const firestore = getFirestore();
  // @ts-ignore
  const user = useSelector((state) => state.user.props)

  const dispatch = useDispatch()
  const [userNameQuery, setUserNameQuery] = useState("");
  const q = userNameQuery
    ? query(
        collection(firestore, "users", user.uid, "user-chats"),
        orderBy("displayName"),
        startAt(userNameQuery),
        endAt(userNameQuery + "\uf8ff")
      )
    : query(collection(firestore, "users", user.uid, "user-chats"));

  const [chats, loading, error] = useCollectionData(q);

  return (
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
          aria-label="add user"
        />
        <IconButton
          variant="ghost"
          icon={<AiOutlineMore />}
          aria-label="more"
        />
      </HStack>
      <Box w="100%">
        <InputGroup m="25px 0">
          <InputLeftElement>
            <RiSearchLine />
          </InputLeftElement>
          <Input
            type="text"
            variant="filled"
            placeholder="Search..."
            onChange={(e) => setUserNameQuery(e.target.value)}
          />
        </InputGroup>
      </Box>
      <Alert error={error} />
      <List>
        {chats?.map((chat) => {
          return (
            <ListItem key={chat.uid}>
              <Flex
                // ! SidebarItem
                w="100%"
                align="center"
                direction="row"
                p="15px 10px"
                borderRadius="2xl"
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                onClick={() => loadMessages(chat.uid)}
              >
                <Avatar name={chat.name} src={chat.photoURL} />
                <Box ml="15px" flex="1">
                  <Heading size="sm">{chat.displayName}</Heading>
                  <Text fontSize="smaller">{chat.lastMsg}</Text>
                </Box>
                <Box>
                  <Text fontSize="smaller" whiteSpace="nowrap">
                    {formateDate(chat.lastMsgTimestamp)}
                  </Text>
                  {!!chat.unreadCount && (
                    <Circle
                      ml="auto"
                      size="20px"
                      bg="tomato"
                      color="white"
                      fontSize="10px"
                    >
                      {chat.unreadCount}
                    </Circle>
                  )}
                </Box>
              </Flex>
            </ListItem>
          );
        })}
        {loading && <Loader />}
      </List>
    </Stack>
  );
}

export default Sidebar;
