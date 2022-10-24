import { memo } from "react";
import { ListItem, Flex, Avatar, IconButton, Heading } from "@chakra-ui/react";
import { RiCheckDoubleFill } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";

function UserItem({
  user: { uid, displayName, photoURL, email },
  addToFriends,
  userFriends,
  host,
}) {
  const isFriend = userFriends.includes(uid);

  return (
    host.uid !== uid && (
      <ListItem key={uid}>
        <Flex w="100%" align="center" p="10px 10px" borderRadius="2xl">
          <Avatar mr="5" name={displayName} src={photoURL} />
          <Heading size="sm">{displayName}</Heading>
          <IconButton
            ml="auto"
            variant="ghost"
            onClick={() =>
              addToFriends(uid, displayName, photoURL, email)
            }
            disabled={isFriend}
            icon={isFriend ? <RiCheckDoubleFill /> : <AiOutlineUserAdd />}
            aria-label="user status"
          ></IconButton>
        </Flex>
      </ListItem>
    )
  );
}

export default memo(UserItem);
