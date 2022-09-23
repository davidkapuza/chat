import { Box, Container, Stack } from "@chakra-ui/react";
import Image from "next/image";
import LoginPageImg from "../public/images/Login.png";
import LoginForm from "../src/components/forms/login/LoginForm";
import { useRouter } from "next/router";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import Loader from "../src/components/elements/loader/Loader";
import { auth } from "../firebase.config";

function Login() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleloading, googleError] =
    useSignInWithGoogle(auth);
  const userExists = user || googleUser
  if (loading || googleloading) {
    return <Loader />;
  }
  if (error || googleError) {
    return "Err...";
  }
  return (
    <Container
      maxW={"7xl"}
      p={{ base: "50px 40px", md: "60px 100px" }}
      h="100%"
    >
      <Stack
        h="100%"
        align="center"
        direction={["column", "row"]}
        justify={["start", "center", "center", "space-between"]}
      >
        <LoginForm
          userExists={userExists}
          signInWithEmailAndPassword={signInWithEmailAndPassword}
          signInWithGoogle={signInWithGoogle}
        />

        <Box w="50%" display={{ base: "none", lg: "block" }}>
          <Image
            priority
            layout="responsive"
            pos="relative"
            objectFit="contain"
            src={LoginPageImg}
            alt={"Login page image"}
          />
        </Box>
      </Stack>
    </Container>
  );
}

export default Login;
