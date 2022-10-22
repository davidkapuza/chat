import { Stack, IconButton, Avatar } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IoChatboxEllipsesOutline, IoBookmarkOutline } from "react-icons/io5";
import { memo } from "react";

function Navbar({ isSmallerThanMD }) {
  const user = useSelector((state) => state.user);
  return (
    <Stack
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
        <IconButton
          variant="ghost"
          icon={<AiOutlineUser />}
          aria-label="user profile"
        />
      ) : (
        <Avatar name={user.displayName} src={user.photoURL} mb="8" />
      )}
      <IconButton
        variant="ghost"
        icon={<IoChatboxEllipsesOutline />}
        aria-label="chat section"
      ></IconButton>
      <IconButton
        variant="ghost"
        icon={<IoBookmarkOutline />}
        aria-label="favourites section"
      />
    </Stack>
  );
}

export default memo(Navbar);
