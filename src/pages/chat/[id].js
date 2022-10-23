import Loader from "@/components/elements/loader/Loader";
import { useMediaQuery } from '@chakra-ui/react';
import { AuthAction, withAuthUser } from "next-firebase-auth";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';


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