// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import { chakraColors } from "./colors";
import { inputTheme } from "./inputTheme";
import { buttonTheme } from "./buttonTheme";
import { textTheme } from "./textTheme";

export const theme = extendTheme({
  colors: chakraColors,
  fonts: {
    body: "Inter, sans-serif",
  },
  components: {
    Input: inputTheme,
    Button: buttonTheme,
    Text: textTheme,
  },
});
