import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  VStack
} from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle
} from "react-firebase-hooks/auth";
import { BsArrow90DegLeft } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { auth } from "../../../../firebase.config";
import TextInput from "../../elements/form-elements/TextInput";

function LoginForm() {
  const router = useRouter();

  const [signInWithEmailAndPassword, authUser, authLoading, authSignInError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleAuthUser, googleAuthLoading, googleAuthError] =
    useSignInWithGoogle(auth);

  const error = authSignInError || googleAuthError;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, []);

  return (
    <VStack maxW="400px" w="100%" mb="auto">
      <NextLink href="/" passHref>
        <IconButton
          mr="auto"
          as="a"
          aria-label="Return to Home page"
          variant="unstyled"
          icon={<BsArrow90DegLeft />}
        />
      </NextLink>
      <Box p={["20px 0 40px", "50px 0 60px"]} w="100%">
        <Heading size={["xl", "2xl"]} fontWeight="bold" mb={["10px", "20px"]}>
          Let's sign you in.
        </Heading>
        <Text>
          Don't have account?{" "}
          <NextLink href="/register" passHref>
            <Link fontWeight="medium">Register!</Link>
          </NextLink>
        </Text>
      </Box>
      <Box w="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Box>
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Box>
          </Alert>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email adress")
              .required("Required"),
            password: Yup.string()
              .required("Required.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
          })}
          onSubmit={async (
            { email, password },
            { setSubmitting, resetForm }
          ) => {
            signInWithEmailAndPassword(email, password);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput type="email" name="email" placeholder="Email" />
              <TextInput
                type="password"
                name="password"
                placeholder="Password"
              />

              <Flex align="center" m="5px 0">
                <Divider />
                <Text p="2" whiteSpace="nowrap">
                  or
                </Text>
                <Divider />
              </Flex>

              <Button
                leftIcon={<FcGoogle />}
                w="100%"
                variant="outline"
                onClick={signInWithGoogle}
              >
                Continue with Google
              </Button>

              <Button
                m={["2em 0 10px", "3em 0 10px"]}
                variant="solid"
                colorScheme="brand"
                w="100%"
                isLoading={isSubmitting}
                type="submit"
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </VStack>
  );
}

export default LoginForm;
