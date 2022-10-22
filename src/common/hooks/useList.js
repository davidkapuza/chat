import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import {
  onChildAdded,
  onValue,
  query,
  ref,
  getDatabase,
  orderByValue,
  off,
  on,
} from "firebase/database";

export function useList(chatId) {
  const [list, setList] = useState([]);
  const database = getDatabase();
  const chatQuery = query(
    ref(database, "/messages/" + chatId),
    orderByValue("timestamp")
  );

  useEffect(() => {
    setList([]);
      onChildAdded(chatQuery, (data) => {
        setList((prev) => [...prev, { key: data.key, message: data.val() }]);
      });
    return () => off(chatQuery, 'child_added');
  }, [chatId]);


  return [list];
}
