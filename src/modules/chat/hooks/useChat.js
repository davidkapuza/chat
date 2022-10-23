import {
  getDatabase, off, onChildAdded, orderByValue, query,
  ref
} from "firebase/database";
import { useEffect, useState } from "react";

export function useChat(chatId) {
  const [list, setList] = useState([]);
  const database = getDatabase();
  const chatQuery = query(
    ref(database, "/messages/" + chatId),
    orderByValue("timestamp")
  );
    // TODO handle loading and error state 
  useEffect(() => {
    setList([]);
      onChildAdded(chatQuery, (data) => {
        setList((prev) => [...prev, { key: data.key, message: data.val() }]);
      });
    return () => off(chatQuery, 'child_added');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);


  return [list];
}
