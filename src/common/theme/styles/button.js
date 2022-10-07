import { theme } from "@chakra-ui/react";

export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    solid: (props) => ({
        fontSize: "13px",
        fontWeight: "medium",
        borderRadius: "15px",
    }),
    outline: (props) => ({
        fontSize: "13px",
        fontWeight: "medium",
    }),
    solidSm: (props) => ({
      ...theme.components.Button.variants.solid(props),
      borderRadius: "full",
      fontSize: "xs",
      color: "main.Black"
    })
  },
  defaultProps: {},
};
