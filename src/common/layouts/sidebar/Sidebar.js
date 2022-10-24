import { updateFriendsList } from "@/app/slices/user-friends-slice";
import Alert from "@/components/elements/alert/Alert";
import Loader from "@/components/elements/loader/Loader";
import SidebarHeader from "@/components/features/sidebar-header/SidebarHeader";
import ChatItem from "@/components/features/sidebar-items/ChatItem";
import UserItem from "@/components/features/sidebar-items/UserItem";
import useDefaultChat from "@/hooks/useDefaultChat";
import Navbar from "@/layouts/navbar/Navbar";
import { setChat } from "@/modules/chat/chat-slice";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  useMediaQuery,
} from "@chakra-ui/react";
import { child, getDatabase, push, ref, set } from "firebase/database";
import {
  collection,
  doc,
  endAt,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { RiSearchLine } from "react-icons/ri";
import shallowEqual, { useDispatch, useSelector } from "react-redux";

function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const database = getDatabase();
  const firestore = getFirestore();
  const host = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const userFriends = useSelector(
    (state) => state["user-friends"],
    shallowEqual
  );
  const [isSmallerThanMD] = useMediaQuery("(max-width: 48em)");

  const [userNameQuery, setUserNameQuery] = useState("");
  const usersQuery =
    userNameQuery &&
    query(
      collection(firestore, "users"),
      orderBy("displayName"),
      startAt(userNameQuery),
      endAt(userNameQuery + "\uf8ff")
    );
  const [users, usersLoading, usersError] = useCollectionData(usersQuery);

  // TODO add search in chats

  const chatsQuery = query(
    collection(firestore, "chats"),
    where("members", "array-contains", {
      uid: host.uid,
      displayName: host.displayName,
      email: host.email,
      photoURL: host.photoURL,
    })
  );

  const [chats, chatsLoading, chatsError] = useCollectionData(chatsQuery);

  async function addToFriends(uid, displayName, photoURL, email) {
    // * update friends list in redux & firestore
    await updateDoc(doc(firestore, "users/" + host.uid), {
      friends: [...userFriends, uid],
    });
    dispatch(updateFriendsList([...userFriends, uid]));

    // * initialize "messages" in realtime database & "chats" in firestore
    const chatId = push(child(ref(database), "chats")).key;
    const chatData = {
      chatId,
      members: [
        {
          uid: host.uid,
          displayName: host.displayName,
          photoURL: host.photoURL,
          email: host.email,
        },
        { uid, displayName, photoURL, email },
      ],
      lastMsg: "",
      lastMsgTimestamp: serverTimestamp(),
      unreadCount: 0,
    };

    set(ref(database, "/messages/" + chatId), {});
    await setDoc(doc(firestore, "chats", chatId), chatData);
  }

  function openChat(id, chatDisplayName, chatPhotoUrl) {
    dispatch(setChat({ id, chatDisplayName, chatPhotoUrl }));

    if (isSmallerThanMD) {
      router.push("/chat/" + id);
    }
  }
  useDefaultChat(chats, openChat);

  return (
    <Flex
      direction="column"
      borderEnd="1px solid"
      borderColor="inherit"
      h="100vh"
      minW={["100%", "100%", "450px"]}
      p="40px 15px"
      overflowY="scroll"
    >
      <SidebarHeader user={host} />

      <Flex direction="row">
        <Navbar />
        <Box w="100%">
          <InputGroup my="7">
            <InputLeftElement>
              <RiSearchLine />
            </InputLeftElement>
            <Input
              type="text"
              variant="filled"
              placeholder="Search..."
              onChange={(e) => setUserNameQuery(e.target.value)}
            />
          </InputGroup>

          <Alert error={chatsError || usersError} />
          <List>
            {users?.length
              ? users.map((user) => {
                  return (
                    <UserItem
                      key={user.uid}
                      user={user}
                      userFriends={userFriends}
                      addToFriends={addToFriends}
                      host={host}
                    />
                  );
                })
              : chats?.map((chat) => {
                  return (
                    <ChatItem
                      key={chat.chatId}
                      chat={chat}
                      openChat={openChat}
                      user={host}
                    />
                  );
                })}
            {(chatsLoading || usersLoading) && <Loader />}
          </List>
        </Box>
      </Flex>
    </Flex>
  );
}

export default memo(Sidebar);
