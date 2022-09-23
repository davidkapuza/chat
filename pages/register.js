import { Box, Container, Stack } from "@chakra-ui/react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import Image from "next/image";
import { auth } from "../firebase.config";
import RegisterPageImg from "../public/images/Register.png";
import Loader from "../src/components/elements/loader/Loader";
import RegisterForm from "../src/components/forms/register/RegisterForm";

function Register() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const [signInWithGoogle, googleUser, googleloading, googleError] =
    useSignInWithGoogle(auth);
  const userExists = user || googleUser
  if (loading || updating || googleloading) {
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
        <RegisterForm
          userExists={userExists}
          createUserWithEmailAndPassword={createUserWithEmailAndPassword}
          updateProfile={updateProfile}
          signInWithGoogle={signInWithGoogle}
        />

        <Box w="50%" display={{ base: "none", lg: "block" }}>
          <Image
            priority
            layout="responsive"
            pos="relative"
            objectFit="contain"
            src={RegisterPageImg}
            alt={"Register page image"}
          />
        </Box>
      </Stack>
    </Container>
  );
}

export default Register;
