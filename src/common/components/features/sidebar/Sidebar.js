import Alert from "@/components/elements/alert/Alert";
import Loader from "@/components/elements/loader/Loader";
import formateDate from "@/utils/formateDate";
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
import { collection, getFirestore, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiOutlineMore, AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../../../../modules/chat/chat-slice";

function Sidebar({ onOpen }) {
  const firestore = getFirestore();
  // @ts-ignore
  const user = useSelector((state) => state.user.props);

  const dispatch = useDispatch();

  // TODO add search in chats
  const [userNameQuery, setUserNameQuery] = useState("");

  const q = query(
    collection(firestore, "chats"),
    where("members", "array-contains", {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    })
  );
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
          // * Get other chat member
          const [{ displayName, photoURL, email }] = chat.members.filter(
            ({ uid }) => uid !== user.uid
          );
          return (
            <ListItem key={chat.chatId}>
              <Flex
                // ! SidebarItem
                w="100%"
                align="center"
                direction="row"
                p="15px 10px"
                borderRadius="2xl"
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                onClick={() => dispatch(setChat(chat.chatId))}
              >
                <Avatar name={displayName} src={photoURL} />
                <Box ml="15px" flex="1">
                  <Heading size="sm">{displayName}</Heading>
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
