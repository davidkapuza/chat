import { useChat } from "../../../hooks/useChat"
import { VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Message from "../../elements/Message";

function Messages() {
  const chatId = useSelector((state) => state.chat.id);
  const [messages] = useChat(chatId);

  return (
    <VStack w="100%" h="100%" p="5" overflowY="scroll" spacing="20px">
      {messages.map(({ key, message }) => {
        return <Message key={key} message={message} chatId={ chatId} />;
      })}
    </VStack>
  );
}


export default Messages;
