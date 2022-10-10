import { store } from "@/app/store";
import theme from "@/common/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import initAuth from "firebase.config";
import React from "react";
import { Provider } from "react-redux";

initAuth();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
