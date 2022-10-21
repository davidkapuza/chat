import { persistor, store } from "@/app/store";
import theme from "@/common/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import initAuth from "firebase.config";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

initAuth();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
