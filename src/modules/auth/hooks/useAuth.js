import { removeUser, updateUser } from "@/app/slices/user-slice";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

export default function useAuth() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const firestore = getFirestore();
  const [isAuthed, setAuthed] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const getUserFromFirestore = async () => {
      if (user) {
        const docSnap = await getDoc(doc(firestore, "users", user.uid));
        if (docSnap.exists()) {
          dispatch(updateUser(docSnap.data()));
          setAuthed(true);
        }
      } else {
        dispatch(removeUser());
        setAuthed(false);
      }
    };
    getUserFromFirestore();
  }, [user]);

  return [isAuthed, error];
}
