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
    main: {
      500: "#EFF9FF",
      600: "#CFEBFC",
      Solitude: "#EFF9FF",
      LightGray: "#B4BFCF",
      Black: "#070606",
      Purple: "#070606",
      Nevada: "#646768",
      Gray: "#707888",
      Red: "#BD4736"
    }
  },
  components: {
    Button,
    Input
  },
});

export default theme;
