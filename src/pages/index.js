import {
  Box,
  Button, Container,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import WelcomeImg from "../../public/images/Welcome.png";

function Home() {
  return (
    <Container
      maxW={"7xl"}
      p={{ base: "50px 40px", md: "60px 100px" }}
      h="100vh"
    >
      <Stack
        h="100%"
        direction={["column", "column", "row-reverse"]}
        justify="space-between"
        alignItems="center"
      >
         <Box w={["70%", "50%"]}>
          <Image
            priority
            layout="responsive"
            // @ts-ignore
            pos="relative"
            objectFit="contain"
            src={WelcomeImg}
            alt={"Home page image"}
          />
        </Box>
        <Box textAlign={["center", "center", "left"]} minW="60%">
          <Heading
            size={["xl", "2xl", "3xl"]}
            fontWeight="bold"
            mb={["20px", "40px"]}
          >
            Be in touch with your buddies.
          </Heading>
          <Text color="gray.500" fontSize="smaller" fontWeight="medium">
            Lorem ipsum dolor sit amet, consectetur <br />
            adipiscing elit, sed do eiusmod tempor <br />
            incididunt ut.
          </Text>

          <Link href="/auth" passHref >
              <Button as="a" size="lg" colorScheme="brand" mt="5em">
                Lets start!
              </Button>
            </Link>
        </Box>
      </Stack>
      </Container>
  );
}

export default Home;
