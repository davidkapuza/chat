import { Box, Container, Stack } from "@chakra-ui/react";
import Image from "next/image";
import RegisterPageImg from "../public/images/Register.png";
import RegisterForm from "../src/components/forms/register/RegisterForm";

function Register() {
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
        <RegisterForm />

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
