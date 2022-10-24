import Loader from "@/components/elements/loader/Loader";
import Sidebar from "@/layouts/sidebar/Sidebar";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

function DesktopChat() {
  const [isSmallerThanMD] = useMediaQuery("(max-width: 48em)");
  const Chat = isSmallerThanMD
    ? () => null
    : dynamic(() => import("@/modules/chat/Chat"));

  return (
    <>
      <Flex direction="row">
        <Sidebar />
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
