import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#00BCD4',
    },
    secondary: {
      main: '#FFC107',
    },
  },
};

export const customTheme = createTheme(themeOptions);
