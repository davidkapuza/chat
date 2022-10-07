import { useRouter } from "next/router";
import { Flex, Avatar, Text } from "@chakra-ui/react";
import { useAuthUser, withAuthUser } from "next-firebase-auth";
function Chat() {
  const router = useRouter();
  const AuthUser = useAuthUser()
  return (
    <>
      <Flex
        // ! Messege
        direction="row"
        alignSelf="flex-start"
        maxW="400px"
      >
        <Avatar
          size="sm"
          mt="auto"
          name="Jhon Doe"
          src="https://avatars.dicebear.com/api/open-peeps/JhonDoe.svg?background=%23E2E8F0"
        />
        <Text
          fontSize="small"
          borderRadius="20px 20px 20px 0"
          bg="#E6F5FE"
          p="4"
          mx="3"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Flex>
      <Flex
        // ! MyMessege
        direction="row-reverse"
        alignSelf="flex-end"
        maxW="400px"
      >
        <Avatar
          size="sm"
          mt="auto"
          name={AuthUser.displayName}
          src={AuthUser.photoURL}
        />

        <Text
          clear="both"
          fontSize="small"
          border="1px solid"
          borderColor="inherit"
          borderRadius="20px 20px 0 20px"
          p="4"
          mx="3"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Flex>
    </>
  );
}

export default withAuthUser()(Chat);
