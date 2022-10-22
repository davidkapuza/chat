import { useList } from "@/common/hooks/useList";
import { VStack } from "@chakra-ui/react";
import { memo } from "react";
import { useSelector } from "react-redux";
import Message from "../../elements/message/Message";

function Messages() {
  const chatId = useSelector((state) => state.chat.id);
  const [messages] = useList(chatId);

  return (
    <VStack w="100%" h="100%" p="5" overflowY="scroll" spacing="20px">
      {messages.map(({ key, message }) => {
        return <Message key={key} message={message} chatId={ chatId} />;
      })}
    </VStack>
  );
}


export default Messages;
