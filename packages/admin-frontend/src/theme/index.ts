import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#9C27B0',
    },
    secondary: {
      main: '#FF4081',
    },
  },
};

export const customTheme = createTheme(themeOptions);
