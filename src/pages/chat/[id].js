import { getAuth, signOut } from 'firebase/auth'
import { useMediaQuery } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loader from "@/components/elements/loader/Loader";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";


function MobileChat() {
  const [isSmallerThanMD] = useMediaQuery("(max-width: 48em)");
  const Chat = isSmallerThanMD
  ? dynamic(() => import("@/modules/chat/Chat"))
  : () => null
  
  return (
    <Suspense fallback={<Loader />}>
      <Chat/>
    </Suspense>
  ) 
}

// ? Add chats prerender

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: '-NEupWSSPeUYgvCDxwa_' } }],
//     fallback: false, // can also be true or 'blocking'
//   }
// }

// // `getStaticPaths` requires using `getStaticProps`
// export async function getStaticProps(context) {
//   return {
//     // Passed to the page component as props
//     props: { chats: {} },
//   }
// }

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(MobileChat);