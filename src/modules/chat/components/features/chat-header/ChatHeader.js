import { HStack, IconButton, Avatar, Heading, Button, useMediaQuery } from "@chakra-ui/react"
import { IoIosArrowBack, IoMdCheckmark } from "react-icons/io"
import {AiOutlineMore} from "react-icons/ai"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { getAuth, signOut } from "firebase/auth"

function ChatHeader() {
  const auth = getAuth()
  const router = useRouter()
  const [isSmallerThanMD] = useMediaQuery("(max-width: 48em)");
  const chat = useSelector(({ chat }) => chat);

  return (
    <HStack
    w="100%"
    spacing="4"
  >
    {isSmallerThanMD && (
      <IconButton variant="ghost" icon={<IoIosArrowBack onClick={() => router.push("/chat/")}/>} />
    )}
    <Avatar size="md" name={chat.chatDisplayName} src={chat.chatPhotoUrl} />

    <Heading mr="auto !important" size="sm">
      {chat.chatDisplayName}
    </Heading>
    <Button variant="solidSm" colorScheme="main" onClick={() => signOut(auth)}>
      Sign Out
    </Button>

    <Button
      variant="solidSm"
      colorScheme="main"
      leftIcon={<IoMdCheckmark />}
      onClick={() => console.log("todo")}
    >
      Friends
    </Button>
    <IconButton
      variant="ghost"
      icon={<AiOutlineMore />}
      aria-label="more"
    />
  </HStack>
  )
}

export default ChatHeader