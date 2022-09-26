import { Box, Container, Stack } from "@chakra-ui/react";
import Image from "next/image";
import LoginPageImg from "../public/images/Login.png";
import LoginForm from "../src/components/forms/login/LoginForm";

function Login() {
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
        <LoginForm />

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
