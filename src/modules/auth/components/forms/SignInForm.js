import { updateUser } from "@/app/slices/user-slice";
import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import { Form, Formik } from "formik";
import React from "react";
import {
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import TextInput from "../elements/TextInput";

function SignInForm({ signInWithEmailAndPassword, signInWithGoogle }) {
  const dispatch = useDispatch();
  const firestore = getFirestore();
  const auth = getAuth();


  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Invalid email adress").required("Required"),
        password: Yup.string()
          .required("Required.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      })}
      onSubmit={({ email, password }, { setSubmitting, resetForm }) => {
        signInWithEmailAndPassword(email, password);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextInput type="email" name="email" placeholder="Email" />
          <TextInput type="password" name="password" placeholder="Password" />

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
            onClick={() => signInWithGoogle()}
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
  );
}

export default SignInForm;
