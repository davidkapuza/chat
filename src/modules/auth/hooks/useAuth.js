import { removeUser, updateUser } from "@/app/slices/user-slice";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteFriendsList, updateFriendsList } from "@/app/slices/user-friends-slice";

export default function useAuth(uid) {
  const dispatch = useDispatch();
  const firestore = getFirestore();

  useEffect(() => {
    const getUserFromFirestore = async () => {
      if (uid) {
        const userSnap = await getDoc(doc(firestore, "users", uid));
        if (userSnap.exists()) {
          const { friends, ...userData } = userSnap.data();
          console.log(friends, userData)
          dispatch(updateUser(userData));
          dispatch(updateFriendsList(friends));
        }
      } else {
        dispatch(deleteFriendsList());
        dispatch(removeUser());
      }
    };
    getUserFromFirestore();
  }, [uid, dispatch, firestore]);
}
