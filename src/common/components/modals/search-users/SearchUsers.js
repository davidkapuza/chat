import { updateUser } from "@/app/slices/user-slice";
import CustomAlert from "@/components/elements/alert/Alert";
import Loader from "@/components/elements/loader/Loader";
import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
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
} from "firebase/firestore";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiCheckDoubleFill, RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

function SearchUsersModal({ isOpen, onClose }) {
  const firestore = getFirestore();
  const dispatch = useDispatch();
  // @ts-ignore
  const host = useSelector((state) => state.user.props);
  const [userNameQuery, setUserNameQuery] = useState("");
  const q =
    userNameQuery &&
    query(
      collection(firestore, "users"),
      orderBy("displayName"),
      startAt(userNameQuery),
      endAt(userNameQuery + "\uf8ff")
    );
  const [users, loading, error] = useCollectionData(q);

  // const [snapshots, loading, error] = useList(ref(database, "user-chats/" + authUser.id));
  // function addToTheFriendsList(uid) {
  //   const newChatKey = push(child(ref(database), "chats")).key;
  //   const chatData = {
  //     members: [authUser.id, uid],
  //   };

  //   const updates = {};
  //   updates["/chats/" + newChatKey] = chatData;
  //   updates["/user-chats/" + authUser.id + "/" + newChatKey] = chatData;
  //   return update(ref(database), updates);
  // }

  /**
   * @param {string} uid
   * @param {string} displayName
   * @param {string} photoURL
   */
  async function addToTheFriendsList(uid, displayName, photoURL) {
    const friendsList = [...new Set([...host.friends, uid])];
    await updateDoc(doc(firestore, "users/" + host.uid), {
      friends: friendsList,
    });

    await setDoc(doc(firestore, "users", host.uid, "user-chats", uid), {
      uid,
      displayName,
      photoURL,
      lastMsg: "",
      lastMsgTimestamp: serverTimestamp(),
      unreadCount: 0,
    });
    dispatch(
      updateUser({
        friends: friendsList,
      })
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Find Friends</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="12">
          <InputGroup mb="10">
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
          <CustomAlert error={error} />
          <List spacing="5">
            {users?.map((user) => {
              const isFriend = host.friends.includes(user.uid);
              return (
                host.uid !== user.uid && (
                  <ListItem key={user.uid}>
                    <Flex w="100%" align="center" px="10px" borderRadius="2xl">
                      <Avatar
                        mr="5"
                        name={user.displayName}
                        src={user.photoURL}
                      />
                      <Heading size="sm">{user.displayName}</Heading>
                      <IconButton
                        ml="auto"
                        variant="ghost"
                        onClick={() =>
                          addToTheFriendsList(
                            user.uid,
                            user.displayName,
                            user.photoURL
                          )
                        }
                        disabled={isFriend}
                        icon={
                          isFriend ? (
                            <RiCheckDoubleFill />
                          ) : (
                            <AiOutlineUserAdd />
                          )
                        }
                        aria-label="user status"
                      ></IconButton>
                    </Flex>
                  </ListItem>
                )
              );
            })}
          </List>
          {loading && <Loader />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SearchUsersModal;
