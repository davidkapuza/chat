import { Stack } from "@chakra-ui/react";
import React from "react";

function AppContainer({ children }) {
  return (
    <Stack
      h="100vh"
      maxW="1440px"
      spacing="0"
      margin="0 auto"
      padding={["20px 40px", "20px 40px", "60px 100px"]}
    >
      {children}
    </Stack>
  );
}

export default AppContainer;
