import {
  ListItem,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Circle,
} from "@chakra-ui/react";
import { memo } from "react";
import formateDate from "@/utils/formate-date"

function ChatItem({ chat, openChat, user }) {
  // * Get other chat member
  const [{ displayName, photoURL }] = chat.members.filter(
    ({ uid }) => uid !== user.uid
  );
  return (
    <ListItem>
      <Flex
        align="center"
        p="15px 10px"
        borderRadius="2xl"
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        onClick={() => openChat(chat.chatId, displayName, photoURL)}
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
}

export default memo(ChatItem);
