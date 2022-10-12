import { FormControl, Icon, IconButton, Input } from "@chakra-ui/react";
import {
  getDatabase,
  push,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {RiSendPlaneFill} from "react-icons/ri"

function MessageInput() {
  const database = getDatabase();
  const [message, setMessage] = useState("");
  const chatId = useSelector((state) => state.chat.id);
  const user = useSelector((state) => state.user.props);

  const sendMessage = (e) => {
    console.log("sended...")
    e.preventDefault();
    const msgData = {
      text: message,
      sender: user,
      timestamp: serverTimestamp(),
    };
    set(push(ref(database, "/messages/" + chatId)), msgData);
    setMessage("");
  };

  return (
    <FormControl
      as="form"
      display="flex"
      // @ts-ignore
      direction="row"
      position="absolute"
      bottom="0"
      alignItems="center"
      p="20px 30px 40px"
      bg="white"
      onSubmit={(e) => sendMessage(e)}
    >
      <Input
        type="text"
        placeholder="Type a messege..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton
        ml="5"
        variant="solid"
        colorScheme="brand"
        icon={<Icon color="white" as={RiSendPlaneFill} />}
        aria-label="send message"
        type="submit"
      />
    </FormControl>
  );
}

export default MessageInput;
