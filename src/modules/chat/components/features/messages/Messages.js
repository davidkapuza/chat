import { useList } from "@/common/hooks/useList";
import { VStack } from "@chakra-ui/react";
import {
  getDatabase,
  orderByValue,
  query,
  ref
} from "firebase/database";
import { memo } from "react";
import Message from "../../elements/message/Message";
import { useSelector } from "react-redux";

function Messages() {
  const chatId = useSelector((state) => state.chat.id);
  const database = getDatabase();
  const chatQuery = query(
    ref(database, "/messages/" + chatId),
    orderByValue("timestamp")
  );

  const [messages] = useList(chatQuery);

  return (
    <VStack w="100%" h="100%" p="5" overflowY="scroll" spacing="20px">
      {messages.map(({ key, message }) => {
        return <Message key={key} message={message} />;
      })}
    </VStack>
  );
}

export default memo(Messages);
