import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/common/theme/theme";
import initAuth from "firebase.config";

initAuth()

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
