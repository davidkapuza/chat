import { updateUser } from "@/app/slices/user-slice";
import { Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import TextInput from "../elements/TextInput";

function SignUpForm({
  createUserWithEmailAndPassword,
  signInWithGoogle,
  updateProfile,
}) {
  const firestore = getFirestore();
  const dispatch = useDispatch();
  const auth = getAuth();

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        password: "",
        password2: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Required"),
        surname: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email adress").required("Required"),
        password: Yup.string()
          .required("Required.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
        password2: Yup.string()
          .required("Required.")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      })}
      onSubmit={(
        { name, surname, email, password },
        { setSubmitting, resetForm }
      ) => {
        const displayName = `${name} ${surname}`;
        const photoURL = `https://avatars.dicebear.com/api/open-peeps/${
          displayName
        }.svg?background=%23E2E8F0`;
        createUserWithEmailAndPassword(email, password).then(async () => {
          await updateProfile({
            displayName,
            photoURL,
          });
          await setDoc(doc(firestore, "users", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            email,
            displayName,
            photoURL,
            friends: [],
          });
          // dispatch(
          //   updateUser({
          //     uid: auth.currentUser.uid,
          //     email,
          //     displayName,
          //     photoURL,
          //     friends: [],
          //   })
          // );
        });
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack direction={["column", "row"]}>
            <TextInput type="text" name="name" placeholder="Name" m="0" />
            <TextInput type="text" name="surname" placeholder="Surname" m="0" />
          </Stack>
          <TextInput type="email" name="email" placeholder="Email" />
          <TextInput type="password" name="password" placeholder="Password" />
          <TextInput
            type="password"
            name="password2"
            placeholder="Repeat Password"
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
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
