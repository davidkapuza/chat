import Loader from "@/components/elements/loader/Loader";
import Sidebar from "@/components/features/sidebar/Sidebar";
import Navbar from "@/components/features/navbar/Navbar";
import useAuth from "@/modules/auth/hooks/useAuth";
import { Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const SearchUsersModal = dynamic(() =>
  import("@/components/modals/search-users/SearchUsers")
);

function Dashboard() {
  const auth = getAuth();
  const AuthUser = useAuthUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallerThanMD] = useMediaQuery("(max-width: 48em)");
  useAuth(AuthUser.id);

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
          <Chat signOut={() => signOut(auth)} />
        </Suspense>
      </Flex>
    </>
  );
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(Dashboard);
