import Loader from "@/components/elements/loader/Loader";
import Chat from "@/components/features/chat/Chat";
import Sidebar from "@/components/features/sidebar/Sidebar";
import {
  Avatar,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoBookmarkOutline, IoChatboxEllipsesOutline } from "react-icons/io5";

function Dashboard() {
  const auth = getAuth();
  const AuthUser = useAuthUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallerThanMD] = useMediaQuery("(max-width: 48em)");
  const SearchUsersModal = isOpen
    ? dynamic(() =>
        import("@/common/components/modals/search-users/SearchUsers")
      )
    : null;
  return (
    <>
      {isOpen && (
        <Suspense fallback={<Loader />}>
          <SearchUsersModal
            // @ts-ignore
            isOpen={isOpen}
            onClose={onClose}
          />
        </Suspense>
      )}

      <Flex direction="row">
        <Stack
          // ! Navbar
          position={{ base: "fixed", md: "relative" }}
          bottom="0"
          zIndex="10"
          bg="white"
          direction={{ base: "row", md: "column" }}
          justify={{ base: "center", md: "start" }}
          align="center"
          h={{ base: "120px", md: "100vh" }}
          minW={{ base: "100%", md: "100px" }}
          pt="40px"
        >
          {isSmallerThanMD ? (
            <IconButton
              variant="ghost"
              icon={<AiOutlineUser />}
              aria-label="user profile"
            />
          ) : (
            <Avatar
              name={AuthUser.displayName}
              src={AuthUser.photoURL}
              mb="8"
            />
          )}
          <IconButton
            variant="ghost"
            icon={<IoChatboxEllipsesOutline />}
            aria-label="chat section"
          ></IconButton>
          <IconButton
            variant="ghost"
            icon={<IoBookmarkOutline />}
            aria-label="favourites section"
          />
        </Stack>
        <Sidebar onOpen={onOpen} loadMessages={undefined} />
        <Chat signOut={() => signOut(auth)} />
      </Flex>
    </>
  );
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(Dashboard);
