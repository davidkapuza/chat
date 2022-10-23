import Link from "next/link";
import { IconButton, Box, Heading, Text, Button } from "@chakra-ui/react";
import { BsArrow90DegLeft } from "react-icons/bs";

function AuthHeader({setFlag, flag}) {
  return (
    <>
      <Link href="/" passHref>
        <IconButton
          mr="auto"
          as="a"
          aria-label="Return to Home page"
          variant="unstyled"
          icon={<BsArrow90DegLeft />}
        />
      </Link>
      <Box p={["20px 0 30px", "20px 0 40px"]} w="100%" mt="10%">
        <Heading size={["xl", "2xl"]} fontWeight="bold" mb={["10px", "20px"]}>
          {flag ? "Create new account." : "Let's sign you in."}
        </Heading>

        <Text>
          {flag ? "Already have account?" : "Don't have account?"}{" "}
          <Button variant="link" fontWeight="medium" onClick={setFlag.toggle}>
            {flag ? "Sign In" : "Sign Up"}
          </Button>
        </Text>
      </Box>
    </>
  );
}

export default AuthHeader;
