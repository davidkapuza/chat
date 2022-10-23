import { updateFriendsList } from "@/app/slices/user-friends-slice";
import { updateUser } from "@/app/slices/user-slice";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAuth(uid) {
  const dispatch = useDispatch();
  const isAuthed = useSelector((state) => state.user.uid);

  useEffect(() => {
    const firestore = getFirestore();

    const getUserFromFirestore = async () => {
      if (uid) {
        if (isAuthed) return;
        const userSnap = await getDoc(doc(firestore, "users", uid));
        if (userSnap.exists()) {
          let { friends, ...userData } = userSnap.data();
          friends = Object.values(friends);
          dispatch(updateUser(userData));
          dispatch(updateFriendsList(friends));
        }
      } else {
        dispatch({ type: "store/reset" });
      }
    };
    getUserFromFirestore();
  }, [uid, dispatch]);
}
