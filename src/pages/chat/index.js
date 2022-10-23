import Loader from "@/components/elements/loader/Loader";
import Navbar from "@/layouts/navbar/Navbar";
import Sidebar from "@/layouts/sidebar/Sidebar";
import useAuth from "@/modules/auth/hooks/useAuth";
import { Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const SearchUsersModal = dynamic(() =>
  import("@/components/modals/search-users/SearchUsers")
);

function DesktopChat() {
  const AuthUser = useAuthUser();
  useAuth(AuthUser.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallerThanMD] = useMediaQuery("(max-width: 48em)");
  const Chat = isSmallerThanMD
    ? () => null
    : dynamic(() => import("@/modules/chat/Chat"));

  return (
    <>
      <SearchUsersModal
        // @ts-ignore
        isOpen={isOpen}
        onClose={onClose}
      />

      <Flex direction="row">
        <Navbar isSmallerThanMD={isSmallerThanMD} />
        <Sidebar onOpen={onOpen} />
        <Suspense fallback={<Loader />}>
          <Chat />
        </Suspense>
      </Flex>
    </>
  );
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(DesktopChat);
