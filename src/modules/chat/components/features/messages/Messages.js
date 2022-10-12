import { VStack } from "@chakra-ui/react";
import { getDatabase, orderByValue, query, ref, onValue } from "firebase/database";
import React, { useState } from "react";
import { useList } from "react-firebase-hooks/database";
import { useSelector } from "react-redux";
import Message from "../../elements/message/Message";

function Messages() {
  const database = getDatabase();
  const chatId = useSelector((state) => state.chat.id);
  // const [messages, setMessages] = useState([])
  const [snapshots, loading, error] = useList(
    query(ref(database, "/messages/" + chatId), orderByValue("timestamp"))
  );

  // const starCountRef = ref(database, 'messages/' + chatId);
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   const key = snapshot.key
  //   setMessages((prevValue) => [...prevValue, {key, data}])
  // });

  return (
    <VStack
      // ! Messeges
      w="100%"
      h="100%"
      p="5"
      overflowY="scroll"
      spacing="20px"
    >
      {snapshots.map((snapshot) => {
        return <Message key={snapshot.key} message={snapshot.val()} />;
      })}
    </VStack>
  );
}

export default Messages;
