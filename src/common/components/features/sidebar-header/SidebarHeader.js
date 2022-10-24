import { Avatar, Center, Heading, HStack, IconButton } from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";
import { IoBookmarkOutline } from "react-icons/io5";

function SidebarHeader({ user }) {
  return (
    <HStack>
      <Center minW="100px" justify="center">
        <Avatar name={user.displayName} src={user.photoURL} />
      </Center>
      <Heading size="lg" mr="auto !important">
        Chat
      </Heading>
      <IconButton
        variant="ghost"
        icon={<IoBookmarkOutline />}
        aria-label="favourites section"
      />
      <IconButton variant="ghost" icon={<AiOutlineMore />} aria-label="more" />
    </HStack>
  );
}

export default SidebarHeader;
