import { removeUser, updateUser } from "@/app/slices/user-slice";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useAuth(uid) {
  const dispatch = useDispatch();
  const firestore = getFirestore();

  useEffect(() => {
    const getUserFromFirestore = async () => {
      if (uid) {
        const docSnap = await getDoc(doc(firestore, "users", uid));
        if (docSnap.exists()) {
          dispatch(updateUser(docSnap.data()));
        }
      } else {
        dispatch(removeUser());
      }
    };
    getUserFromFirestore();
  }, [uid, dispatch, firestore]);
}
