import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../elements/form-elements/TextInput";
import {
  Button,
  VStack,
  Heading,
  Flex,
  Box,
  Divider,
  Text,
  IconButton,
  Link,
  Stack,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { BsArrow90DegLeft } from "react-icons/bs";
import NextLink from "next/link";

function LoginForm() {
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
      <Box p={["20px 0 30px", "20px 0 40px"]} w="100%">
        <Heading size={["xl", "2xl"]} fontWeight="bold" mb={["10px", "20px"]}>
          Create new account.
        </Heading>

        <Text>
          Already have account?{" "}
          <NextLink href="/login" passHref>
            <Link fontWeight="medium">Login!</Link>
          </NextLink>
        </Text>
      </Box>
      <Box w="100%">
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            password2: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
            .required("Required"),
            surname: Yup.string()
            .required("Required"),
            email: Yup.string()
              .email("Invalid email adress")
              .required("Required"),
            password: Yup.string()
              .required("Required.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
            password2: Yup.string()
            .required("Required.")
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack direction={["column", "row"]}>
                <TextInput type="text" name="name" placeholder="Name" m="0"/>
                <TextInput type="text" name="surname" placeholder="Surname" m="0"/>
              </Stack>
              <TextInput type="email" name="email" placeholder="Email" />
              <TextInput
                type="password"
                name="password"
                placeholder="Password"
              />
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

              <Button leftIcon={<FcGoogle />} w="100%" variant="outline">
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
      </Box>
    </VStack>
  );
}

export default LoginForm;
