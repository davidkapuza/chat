import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/common/theme/theme";
import initAuth from "firebase.config";
// import GlobalContext from "@/common/context/global/GlobalContext";

initAuth();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      {/* <GlobalContext> */}
        <Component {...pageProps} />
      {/* </GlobalContext> */}
    </ChakraProvider>
  );
}

export default MyApp;
