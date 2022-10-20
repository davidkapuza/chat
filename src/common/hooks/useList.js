import { useEffect, useState } from "react";
import { onChildAdded } from "firebase/database";

export function useList(query) {
  const [list, setList] = useState([]);
  // TODO handle loading & error state
  useEffect(() => {
    onChildAdded(query, (data) => {
      setList((prev) => [...prev, { key: data.key, message: data.val()}]);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [list];
}
