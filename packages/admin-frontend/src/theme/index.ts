import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#00BCD4',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#FFC107',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        sx: {
          my: 1
        }
      }
    }
  }
};

export const customTheme = createTheme(themeOptions);
