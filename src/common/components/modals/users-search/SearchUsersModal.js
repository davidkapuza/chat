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
  endAt,
  getFirestore,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";

function SearchUsersModal({ isOpen, onClose }) {
  const db = getFirestore();
  const [userNameQuery, setUserNameQuery] = useState("");
  const q =
    userNameQuery &&
    query(
      collection(db, "users"),
      orderBy("displayName"),
      startAt(userNameQuery),
      endAt(userNameQuery + "\uf8ff")
    );

  const [users] = useCollectionData(q);

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
          <List spacing="5">
            {users?.map((user) => {
              return (
                <ListItem key={user.uid}>
                  <Flex w="100%" align="center" px="10px" borderRadius="2xl">
                    <Avatar mr="5" name={user.name} src={user.photoURL} />
                    <Heading size="sm">{user.displayName}</Heading>
                    <IconButton
                      ml="auto"
                      variant="ghost"
                      icon={<AiOutlineUserAdd />}
                    ></IconButton>
                  </Flex>
                </ListItem>
              );
            })}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SearchUsersModal;
