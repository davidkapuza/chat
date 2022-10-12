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
  addDoc,
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
import { getDatabase, push, child, update, ref, set } from "firebase/database";

function SearchUsersModal({ isOpen, onClose }) {
  const firestore = getFirestore();
  const database = getDatabase();
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

  /**
   * @param {string} uid
   * @param {string} displayName
   * @param {string} photoURL
   * @param {string} email
   */
  async function addToTheFriendsList(uid, displayName, photoURL, email) {
    // * update friends list in redux & firestore
    const friendsList = [...new Set([...host.friends, uid])];
    await updateDoc(doc(firestore, "users/" + host.uid), {
      friends: friendsList,
    });
    dispatch(
      updateUser({
        friends: friendsList,
      })
    );
    // * create "messages" in real time database & "chats" in firestore

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

    set(ref(database, "/messages/" + chatId));
    await setDoc(doc(firestore, "chats", chatId), chatData);
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
            {users?.map(({ uid, displayName, photoURL, email }) => {
              const isFriend = host.friends.includes(uid);
              return (
                host.uid !== uid && (
                  <ListItem key={uid}>
                    <Flex w="100%" align="center" px="10px" borderRadius="2xl">
                      <Avatar mr="5" name={displayName} src={photoURL} />
                      <Heading size="sm">{displayName}</Heading>
                      <IconButton
                        ml="auto"
                        variant="ghost"
                        onClick={() =>
                          addToTheFriendsList(uid, displayName, photoURL, email)
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
