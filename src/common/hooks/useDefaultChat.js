import { useSelector } from "react-redux";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";

export default function useDefaultChat(chats, openChat) {
  const chat = useSelector((state) => state.chat)
  const user = useSelector((state) => state.user)
  const [isSmallerThanMD] = useMediaQuery("(max-width: 48em)");

  useEffect(() => {
    if (!chat.id && chats?.length && !isSmallerThanMD) {
      const firstChatId = chats[0].chatId;
      const [{ displayName, photoURL }] = chats[0].members.filter(
        ({ uid }) => uid !== user.uid
      );
      openChat(firstChatId, displayName, photoURL);
    }
  }, [chats]);
}
