import { extendTheme, theme as base } from "@chakra-ui/react";
import { styles } from "./styles/global";
import { InputStyles as Input } from "./styles/input";
import { ButtonStyles as Button } from "./styles/button";

const theme = extendTheme({
  styles,
  fonts: {
    heading: `Raleway, ${base.fonts?.heading}`,
    body: `Raleway ${base.fonts?.heading}`,
  },
  colors: {
    brand: {
      500: "#141414",
      600: "#39393B",
    },
  },
  components: {
    Button,
    Input
  },
});

export default theme;
