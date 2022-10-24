import { Stack, IconButton, Avatar } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IoChatboxEllipsesOutline, IoBookmarkOutline } from "react-icons/io5";
import { memo } from "react";

function Navbar() {
  
  return (
    <Stack
      position={{ base: "fixed", md: "relative" }}
      bottom="0"
      zIndex="10"
      bg="white"
      direction={{ base: "row", md: "column" }}
      justify={{ base: "center", md: "start" }}
      align="center"
      h={{ base: "120px", md: "100%" }}
      minW={{ base: "100%", md: "100px" }}
      pt="40px"
    >

      <IconButton
        variant="ghost"
        icon={<IoChatboxEllipsesOutline />}
        aria-label="chat section"
      ></IconButton>
      <IconButton
        variant="ghost"
        icon={<AiOutlineUser />}
        aria-label="profile"
      />
    </Stack>
  );
}

export default memo(Navbar);
